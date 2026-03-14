import { useState } from 'react'
import BookGate from '../components/BookGate'
import QuizRunner from '../components/QuizRunner'
import ResultsScreen from '../components/ResultsScreen'
import { quizzes } from '../data/quizzes'

export default function Quizzes() {
  const [selectedBook, setSelectedBook] = useState(null)
  const [results, setResults] = useState(null)

  if (!selectedBook) {
    return (
      <BookGate
        selectionMode="single"
        onConfirm={(bookId) => {
          setSelectedBook(bookId)
          setResults(null)
        }}
        title="Quizzes"
        description="Select a book to test your knowledge. Each quiz contains spoilers for that book only."
      />
    )
  }

  const quiz = quizzes.find((q) => q.book === selectedBook)

  if (!quiz) {
    return (
      <div className="text-center py-20">
        <p className="font-body text-muted text-lg">Quiz not found.</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <button
        onClick={() => {
          setSelectedBook(null)
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
        <h2 className="font-heading text-gold text-3xl md:text-4xl tracking-wider mb-2">
          {selectedBook}
        </h2>
        <p className="font-body text-muted italic">
          {quiz.questions.length} Questions
        </p>
      </div>

      <div className="divider-ornament mb-10">&#10022;</div>

      {results ? (
        <ResultsScreen
          results={results}
          questions={quiz.questions}
          onRetry={() => setResults(null)}
        />
      ) : (
        <QuizRunner
          key={selectedBook + Date.now()}
          questions={quiz.questions}
          onComplete={setResults}
        />
      )}
    </div>
  )
}
