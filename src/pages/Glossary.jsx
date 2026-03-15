import { useState, useMemo } from 'react'
import GlossaryCard from '../components/GlossaryCard'
import { allBooks } from '../data/books'
import { TERM_CATEGORIES } from '../data/constants'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const categoryIcons = {
  character: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  ),
  location: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
  magic: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  creature: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="12" r="1" /><circle cx="15" cy="12" r="1" />
      <path d="M12 2a8 8 0 0 0-8 8c0 3.5 2 6.5 4 8.5V22h8v-3.5c2-2 4-5 4-8.5a8 8 0 0 0-8-8z" />
    </svg>
  ),
  artifact: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="6 3 18 3 22 9 12 22 2 9" />
    </svg>
  ),
  organization: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  concept: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
    </svg>
  ),
  slang: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  worldbuilding: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
}

export default function Glossary() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeBookFilter, setActiveBookFilter] = useState(null)
  const [activeCategoryFilter, setActiveCategoryFilter] = useState(null)

  // Collect all terms from all books
  const allTerms = useMemo(() => {
    const terms = []
    for (const book of allBooks) {
      if (book.comingSoon || !book.terms) continue
      for (const term of book.terms) {
        terms.push({
          ...term,
          book: book.title,
          bookId: book.id,
          accentColor: book.accentColor,
        })
      }
    }
    return terms
  }, [])

  // Get unique book names for filter pills
  const bookNames = useMemo(() => {
    const names = new Set()
    for (const term of allTerms) {
      names.add(term.book)
    }
    return Array.from(names).sort()
  }, [allTerms])

  const filteredTerms = useMemo(() => {
    return allTerms
      .filter(t => !activeBookFilter || t.book === activeBookFilter)
      .filter(t => !activeCategoryFilter || t.category === activeCategoryFilter)
      .filter(t => {
        if (!searchQuery.trim()) return true
        const q = searchQuery.toLowerCase()
        return (
          t.term.toLowerCase().includes(q) ||
          t.definition.toLowerCase().includes(q)
        )
      })
      .sort((a, b) => a.term.localeCompare(b.term))
  }, [allTerms, activeBookFilter, activeCategoryFilter, searchQuery])

  const grouped = useMemo(() => {
    const groups = {}
    for (const term of filteredTerms) {
      const letter = term.term[0].toUpperCase()
      if (!groups[letter]) groups[letter] = []
      groups[letter].push(term)
    }
    return groups
  }, [filteredTerms])

  const availableLetters = new Set(Object.keys(grouped))

  const categoryCounts = useMemo(() => {
    const baseTerms = allTerms
      .filter(t => !activeBookFilter || t.book === activeBookFilter)
    const counts = {}
    for (const t of baseTerms) {
      counts[t.category] = (counts[t.category] || 0) + 1
    }
    return counts
  }, [allTerms, activeBookFilter])

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-heading text-gold text-3xl tracking-wider">
            Glossary
          </h2>
          <p className="font-body text-muted text-sm mt-1">
            {allTerms.length} terms across {bookNames.length} books
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search terms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface border border-gold/10 rounded-lg pl-10 pr-4 py-2.5 font-body text-text placeholder-muted/50 focus:outline-none focus:border-gold/40 transition-colors"
          />
        </div>
      </div>

      {/* Book filter pills */}
      <div className="flex flex-wrap gap-2 mb-3">
        <button
          onClick={() => setActiveBookFilter(null)}
          className={`font-heading text-xs tracking-widest uppercase px-4 py-1.5 rounded-full border transition-all cursor-pointer ${
            !activeBookFilter
              ? 'border-gold text-gold bg-gold/10'
              : 'border-gold/10 text-muted hover:border-gold/30'
          }`}
        >
          All Books
        </button>
        {bookNames.map((book) => (
          <button
            key={book}
            onClick={() => setActiveBookFilter(activeBookFilter === book ? null : book)}
            className={`font-heading text-xs tracking-widest uppercase px-4 py-1.5 rounded-full border transition-all cursor-pointer ${
              activeBookFilter === book
                ? 'border-gold text-gold bg-gold/10'
                : 'border-gold/10 text-muted hover:border-gold/30'
            }`}
          >
            {book}
          </button>
        ))}
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveCategoryFilter(null)}
          className={`flex items-center gap-1.5 font-heading text-xs tracking-widest uppercase px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
            !activeCategoryFilter
              ? 'border-muted/40 text-text bg-muted/10'
              : 'border-muted/10 text-muted/50 hover:border-muted/30'
          }`}
        >
          All Types
        </button>
        {TERM_CATEGORIES.map(({ id, label }) => {
          const count = categoryCounts[id] || 0
          if (count === 0) return null
          return (
            <button
              key={id}
              onClick={() => setActiveCategoryFilter(activeCategoryFilter === id ? null : id)}
              className={`flex items-center gap-1.5 font-heading text-xs tracking-widest uppercase px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                activeCategoryFilter === id
                  ? 'border-muted/40 text-text bg-muted/10'
                  : 'border-muted/10 text-muted/50 hover:border-muted/30'
              }`}
            >
              {categoryIcons[id]}
              {label}
              <span className="text-muted/40 ml-0.5">{count}</span>
            </button>
          )
        })}
      </div>

      {/* A-Z nav */}
      <div className="flex flex-wrap gap-1 mb-8">
        {ALPHABET.map((letter) => (
          <button
            key={letter}
            onClick={() => {
              if (availableLetters.has(letter)) {
                document.getElementById(`letter-${letter}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            }}
            disabled={!availableLetters.has(letter)}
            className={`font-heading text-xs w-8 h-8 rounded flex items-center justify-center transition-colors ${
              availableLetters.has(letter)
                ? 'text-gold hover:bg-gold/10 cursor-pointer'
                : 'text-muted/20 cursor-default'
            }`}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Terms grid grouped by letter */}
      {filteredTerms.length === 0 ? (
        <p className="font-body text-muted text-center py-16 text-lg italic">
          No terms found.
        </p>
      ) : (
        Object.keys(grouped).sort().map((letter) => (
          <div key={letter} id={`letter-${letter}`} className="mb-8 scroll-mt-20">
            <h3 className="font-heading text-gold/50 text-2xl tracking-wider mb-4 border-b border-gold/10 pb-2">
              {letter}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {grouped[letter].map((term, i) => (
                <GlossaryCard
                  key={`${term.book}-${term.term}-${i}`}
                  term={term.term}
                  definition={term.definition}
                  book={term.book}
                  category={term.category}
                  accentColor={term.accentColor}
                />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
