import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import QuizRunner from '../components/QuizRunner'
import ResultsScreen from '../components/ResultsScreen'
import SpiceRating from '../components/SpiceRating'
import { allBooks } from '../data/books'

export default function Quizzes() {
  const [searchParams] = useSearchParams()
  const preselectedBook = searchParams.get('book')

  const [selectedBookId, setSelectedBookId] = useState(preselectedBook)
  const [results, setResults] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const booksWithQuiz = useMemo(() => {
    return allBooks
      .filter(b => !b.comingSoon && b.quiz?.length > 0)
      .sort((a, b) => a.title.localeCompare(b.title))
  }, [])

  const filteredBooks = useMemo(() => {
    if (!searchQuery.trim()) return booksWithQuiz
    const q = searchQuery.toLowerCase()
    return booksWithQuiz.filter(b =>
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q)
    )
  }, [booksWithQuiz, searchQuery])

  const selectedBook = selectedBookId ? allBooks.find(b => b.id === selectedBookId) : null

  if (!selectedBook) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="font-heading text-gold text-3xl md:text-4xl tracking-wider mb-2">
          Book Club Quizzes
        </h2>
        <p className="font-body text-muted text-lg mb-8">
          Choose a book to test your knowledge. Each quiz contains spoilers.
        </p>

        {/* Search */}
        <div className="relative w-full max-w-md mb-8">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface border border-gold/10 rounded-lg pl-10 pr-4 py-2.5 font-body text-text placeholder-muted/50 focus:outline-none focus:border-gold/40 transition-colors"
          />
        </div>

        <p className="font-body text-muted text-sm mb-4">
          {filteredBooks.length} quizzes available
        </p>

        {/* Book grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredBooks.map((book) => (
            <button
              key={book.id}
              onClick={() => { setSelectedBookId(book.id); setResults(null) }}
              className="bg-surface rounded-lg overflow-hidden border border-transparent hover:border-current transition-all duration-300 text-left cursor-pointer"
              style={{ color: book.accentColor || '#c9a84c' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 15px ${book.accentColor}30`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div
                className="aspect-[3/2] flex items-center justify-center p-4"
                style={{
                  background: `linear-gradient(160deg, ${book.coverGradient?.[0] || '#111'} 0%, ${book.coverGradient?.[1] || '#000'} 100%)`,
                }}
              >
                <div className="text-center">
                  <h3
                    className="font-heading text-sm tracking-wider mb-1"
                    style={{ color: book.accentColor }}
                  >
                    {book.title}
                  </h3>
                  <p className="font-body text-muted text-xs">{book.author}</p>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between">
                <SpiceRating level={book.spiceLevel} />
                <span className="font-body text-muted text-xs">
                  {book.quiz.length} Q's
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <button
        onClick={() => {
          setSelectedBookId(null)
          setResults(null)
        }}
        className="flex items-center gap-2 font-body text-muted text-sm hover:text-gold transition-colors mb-8 cursor-pointer"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Choose a different quiz
      </button>

      <div className="text-center mb-8">
        <h2
          className="font-heading text-3xl md:text-4xl tracking-wider mb-2"
          style={{ color: selectedBook.accentColor || '#c9a84c' }}
        >
          {selectedBook.title}
        </h2>
        <p className="font-body text-muted">
          by {selectedBook.author} &middot; {selectedBook.quiz.length} Questions
        </p>
      </div>

      <div className="divider-ornament mb-10">&#10022;</div>

      {results ? (
        <ResultsScreen
          results={results}
          questions={selectedBook.quiz}
          onRetry={() => setResults(null)}
        />
      ) : (
        <QuizRunner
          key={selectedBookId + Date.now()}
          questions={selectedBook.quiz}
          onComplete={setResults}
        />
      )}
    </div>
  )
}
