import { useState, useMemo, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBar({ books, placeholder = 'Search books, authors, terms...' }) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const results = useMemo(() => {
    if (!query.trim() || !books) return { books: [], terms: [] }
    const q = query.toLowerCase()

    const matchedBooks = books
      .filter(b => !b.comingSoon)
      .filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.genres.some(g => g.toLowerCase().includes(q)) ||
        b.themes?.some(t => t.toLowerCase().includes(q))
      )
      .slice(0, 6)

    const matchedTerms = []
    for (const book of books) {
      if (book.comingSoon || !book.terms) continue
      for (const term of book.terms) {
        if (term.term.toLowerCase().includes(q) || term.definition.toLowerCase().includes(q)) {
          matchedTerms.push({ ...term, bookTitle: book.title, bookId: book.id })
          if (matchedTerms.length >= 4) break
        }
      }
      if (matchedTerms.length >= 4) break
    }

    return { books: matchedBooks, terms: matchedTerms }
  }, [query, books])

  const hasResults = results.books.length > 0 || results.terms.length > 0

  return (
    <div ref={ref} className="relative w-full max-w-lg">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          aria-label={placeholder}
          placeholder={placeholder}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setIsOpen(true) }}
          onFocus={() => setIsOpen(true)}
          className="w-full bg-surface/80 border border-gold/20 rounded-lg pl-10 pr-4 py-3 font-body text-text placeholder-muted/50 focus:outline-none focus:border-gold/50 transition-colors backdrop-blur-sm"
        />
      </div>

      {/* Dropdown results */}
      {isOpen && query.trim() && (
        <div className="absolute top-full mt-2 w-full bg-surface border border-gold/20 rounded-lg shadow-2xl z-50 max-h-96 overflow-y-auto">
          {!hasResults ? (
            <p className="p-4 font-body text-muted text-sm text-center">No results found.</p>
          ) : (
            <>
              {results.books.length > 0 && (
                <div className="p-2">
                  <p className="font-heading text-[0.6rem] tracking-widest uppercase text-muted px-2 py-1">Books</p>
                  {results.books.map((book) => (
                    <button
                      key={book.id}
                      onClick={() => { navigate(`/book/${book.id}`); setIsOpen(false); setQuery('') }}
                      className="w-full text-left px-3 py-2 rounded hover:bg-gold/10 transition-colors flex items-center gap-3 cursor-pointer"
                    >
                      <div
                        className="w-8 h-10 rounded shrink-0"
                        style={{
                          background: `linear-gradient(160deg, ${book.coverGradient?.[0] || '#111'} 0%, ${book.coverGradient?.[1] || '#000'} 100%)`,
                          border: `1px solid ${book.accentColor}30`,
                        }}
                      />
                      <div>
                        <p className="font-heading text-sm tracking-wide text-text">{book.title}</p>
                        <p className="font-body text-xs text-muted">{book.author}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              {results.terms.length > 0 && (
                <div className="p-2 border-t border-gold/10">
                  <p className="font-heading text-[0.6rem] tracking-widest uppercase text-muted px-2 py-1">Terms</p>
                  {results.terms.map((term, i) => (
                    <button
                      key={i}
                      onClick={() => { navigate(`/book/${term.bookId}`); setIsOpen(false); setQuery('') }}
                      className="w-full text-left px-3 py-2 rounded hover:bg-gold/10 transition-colors cursor-pointer"
                    >
                      <p className="font-heading text-sm tracking-wide text-text">{term.term}</p>
                      <p className="font-body text-xs text-muted truncate">{term.bookTitle} — {term.definition.slice(0, 80)}...</p>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
