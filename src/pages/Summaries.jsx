import { useState } from 'react'
import BookGate from '../components/BookGate'
import SummaryCard from '../components/SummaryCard'
import { bookSummaries } from '../data/summaries'

export default function Summaries() {
  const [selectedBook, setSelectedBook] = useState(null)

  if (!selectedBook) {
    return (
      <BookGate
        selectionMode="single"
        onConfirm={(bookId) => setSelectedBook(bookId)}
        title="Book Summaries"
        description="Select a book to view its summary. Each summary is isolated to prevent spoilers."
      />
    )
  }

  const book = bookSummaries.find((b) => b.title === selectedBook)

  if (!book) {
    return (
      <div className="text-center py-20">
        <p className="font-body text-muted text-lg">Book not found.</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <button
        onClick={() => setSelectedBook(null)}
        className="flex items-center gap-2 font-body text-muted text-sm hover:text-gold transition-colors mb-8 cursor-pointer"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Choose a different book
      </button>

      <SummaryCard book={book} />
    </div>
  )
}
