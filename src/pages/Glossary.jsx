import { useState, useMemo } from 'react'
import BookGate from '../components/BookGate'
import GlossaryCard from '../components/GlossaryCard'
import { glossaryTerms } from '../data/glossary'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export default function Glossary() {
  const [unlockedBooks, setUnlockedBooks] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeBookFilter, setActiveBookFilter] = useState(null)

  // Filter terms by unlocked books, active filter, and search query
  const filteredTerms = useMemo(() => {
    if (!unlockedBooks) return []

    return glossaryTerms
      .filter(t => unlockedBooks.includes(t.book))
      .filter(t => !activeBookFilter || t.book === activeBookFilter)
      .filter(t => {
        if (!searchQuery.trim()) return true
        const q = searchQuery.toLowerCase()
        return (
          t.term.toLowerCase().includes(q) ||
          t.definition.toLowerCase().includes(q)
        )
      })
      .sort((a, b) => a.term.localeCompare(b.term))
  }, [unlockedBooks, activeBookFilter, searchQuery])

  // Group by first letter
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

  if (!unlockedBooks) {
    return (
      <BookGate
        selectionMode="multi"
        onConfirm={setUnlockedBooks}
        title="Glossary"
        description="Which books have you read? Select all that apply to reveal terms — no spoilers beyond your progress."
      />
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="font-heading text-gold text-3xl tracking-wider">
            Glossary
          </h2>
          <button
            onClick={() => {
              setUnlockedBooks(null)
              setActiveBookFilter(null)
              setSearchQuery('')
            }}
            className="font-body text-muted text-sm hover:text-gold transition-colors mt-1 cursor-pointer"
          >
            Change book selection
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
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
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveBookFilter(null)}
          className={`font-heading text-xs tracking-widest uppercase px-4 py-1.5 rounded-full border transition-all cursor-pointer ${
            !activeBookFilter
              ? 'border-gold text-gold bg-gold/10'
              : 'border-gold/10 text-muted hover:border-gold/30'
          }`}
        >
          All
        </button>
        {unlockedBooks.map((book) => (
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

      {/* A–Z nav */}
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
              {grouped[letter].map((term) => (
                <GlossaryCard
                  key={term.id}
                  term={term.term}
                  definition={term.definition}
                  book={term.book}
                />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
