import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import QuizRunner from '../components/QuizRunner'
import ResultsScreen from '../components/ResultsScreen'
import SpiceRating from '../components/SpiceRating'
import { allBooks } from '../data/books'
import SmartBookCover from '../components/SmartBookCover'

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
        <div className="app-panel p-6 md:p-8 mb-8">
          <h2 className="section-title text-3xl md:text-4xl mb-2">
            Book Club Quizzes
          </h2>
          <p className="font-body text-zinc-400 text-lg mb-6">
            Choose a book to test your knowledge. Each quiz contains spoilers.
          </p>

          <div className="relative w-full max-w-md">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="booktok-input w-full pl-10 pr-4 py-3"
            />
          </div>
        </div>

        <p className="font-body text-zinc-500 text-sm mb-4">
          {filteredBooks.length} quizzes available
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredBooks.map((book) => (
            <button
              key={book.id}
              onClick={() => { setSelectedBookId(book.id); setResults(null) }}
              className="book-card text-left cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <SmartBookCover book={book} />
                <div className="overlay">
                  <h3 className="font-heading text-base leading-tight text-white mb-1">{book.title}</h3>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-400 mb-2">{book.author}</p>
                  <div className="flex items-center justify-between gap-2">
                    <SpiceRating level={book.spiceLevel} />
                    <span className="text-[11px] text-white/75">{book.quiz.length} Q&apos;s</span>
                  </div>
                </div>
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

      <div className="text-center mb-8 app-panel p-6 md:p-8">
        <h2
          className="section-title text-3xl md:text-4xl mb-2"
          style={{ color: selectedBook.accentColor || '#c9a84c' }}
        >
          {selectedBook.title}
        </h2>
        <p className="font-body text-zinc-400">
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
