import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { allBooks } from '../data/books'
import BookCard from '../components/BookCard'
import useFavorites from '../hooks/useFavorites'
import useQuizScores from '../hooks/useQuizScores'
import useShelfMetadata from '../hooks/useShelfMetadata'

const STATUS_OPTIONS = [
  { id: 'want-to-read', label: 'Want to read' },
  { id: 'reading', label: 'Reading now' },
  { id: 'finished', label: 'Finished' },
]

export default function MyShelf() {
  const { favorites, clearAll, replaceAll: replaceFavorites } = useFavorites()
  const { scores } = useQuizScores()
  const { metadata, updateBook, replaceAll, clearAllMetadata } = useShelfMetadata()
  const [activeStatus, setActiveStatus] = useState('all')
  const [editingId, setEditingId] = useState(null)
  const importRef = useRef(null)

  const quizEntries = Object.entries(scores)
  const quizzesTaken = quizEntries.length
  const perfectScores = quizEntries.filter(([, s]) => s.best === s.total).length
  const averagePct = quizzesTaken
    ? Math.round(quizEntries.reduce((sum, [, s]) => sum + (s.best / s.total) * 100, 0) / quizzesTaken)
    : 0

  const favoriteBooks = favorites
    .map(id => allBooks.find(b => b.id === id))
    .filter(Boolean)

  const visibleBooks = useMemo(() => {
    if (activeStatus === 'all') return favoriteBooks
    return favoriteBooks.filter(book => (metadata[book.id]?.status || 'want-to-read') === activeStatus)
  }, [activeStatus, favoriteBooks, metadata])

  function handleClearAll() {
    clearAll()
    clearAllMetadata()
  }

  function exportShelf() {
    const payload = JSON.stringify({ version: 1, favorites, metadata }, null, 2)
    const blob = new Blob([payload], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'smutbook-shelf.json'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  async function importShelf(event) {
    const file = event.target.files?.[0]
    if (!file) return
    try {
      const parsed = JSON.parse(await file.text())
      if (parsed.favorites) replaceFavorites(parsed.favorites)
      if (parsed.metadata) replaceAll(parsed.metadata)
    } catch {
      window.alert('That shelf file could not be read.')
    } finally {
      event.target.value = ''
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl md:text-5xl tracking-wider text-gold mb-3">
          My Shelf
        </h1>
        <p className="font-body text-muted max-w-lg mx-auto">
          Save books, track what you are reading, rate finished stories, and keep private notes on this device.
        </p>
      </div>

      {quizzesTaken > 0 && (
        <div className="max-w-2xl mx-auto mb-12 grid grid-cols-3 gap-3 text-center">
          {[
            { value: quizzesTaken, label: quizzesTaken === 1 ? 'Quiz Taken' : 'Quizzes Taken' },
            { value: `${averagePct}%`, label: 'Average Best' },
            { value: perfectScores, label: 'Perfect Scores' },
          ].map(({ value, label }) => (
            <div key={label} className="bg-surface rounded-lg border border-gold/15 py-5 px-3">
              <p className="font-heading text-gold text-2xl md:text-3xl mb-1">{value}</p>
              <p className="font-body text-muted text-xs tracking-wider uppercase">{label}</p>
            </div>
          ))}
        </div>
      )}

      {favoriteBooks.length === 0 ? (
        <div className="text-center py-20">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto text-muted/30 mb-6">
            <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
          </svg>
          <p className="font-body text-muted text-lg mb-2">Your shelf is empty</p>
          <p className="font-body text-muted/60 text-sm mb-6">
            Browse books and tap the bookmark icon to save them here.
          </p>
          <Link
            to="/browse"
            className="inline-block font-heading text-sm tracking-widest uppercase px-6 py-3 rounded border-2 border-gold/50 text-gold hover:bg-gold/10 transition-colors"
          >
            Browse Books
          </Link>
        </div>
      ) : (
        <>
          <div className="shelf-toolbar mb-6">
            <p className="font-body text-muted text-sm">
              {favoriteBooks.length} book{favoriteBooks.length !== 1 ? 's' : ''} saved
            </p>
            <div className="shelf-actions">
              <button type="button" onClick={exportShelf}>Export shelf</button>
              <button type="button" onClick={() => importRef.current?.click()}>Import notes</button>
              <input ref={importRef} type="file" accept="application/json" className="sr-only" onChange={importShelf} />
              <button type="button" onClick={handleClearAll} className="danger">Clear all</button>
            </div>
          </div>

          <nav className="shelf-status-tabs mb-7" aria-label="Filter shelf by reading status">
            {[{ id: 'all', label: 'All saved' }, ...STATUS_OPTIONS].map(option => (
              <button key={option.id} type="button" aria-pressed={activeStatus === option.id} onClick={() => setActiveStatus(option.id)}>
                {option.label}
              </button>
            ))}
          </nav>

          {visibleBooks.length === 0 ? (
            <p className="app-panel p-8 text-center text-muted">No books are in this shelf section yet.</p>
          ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {visibleBooks.map(book => {
              const shelf = { status: 'want-to-read', note: '', rating: 0, ...metadata[book.id] }
              return (
                <div key={book.id} className="shelf-book-card">
                  <BookCard book={book} />
                  <div className="shelf-book-controls">
                    <label>
                      <span className="sr-only">Reading status for {book.title}</span>
                      <select value={shelf.status} onChange={event => updateBook(book.id, { status: event.target.value })}>
                        {STATUS_OPTIONS.map(option => <option key={option.id} value={option.id}>{option.label}</option>)}
                      </select>
                    </label>
                    <button type="button" onClick={() => setEditingId(editingId === book.id ? null : book.id)}>
                      {shelf.note || shelf.rating ? 'Edit notes' : 'Add note'}
                    </button>
                  </div>
                  {editingId === book.id && (
                    <div className="shelf-note-editor">
                      <label>
                        Your rating
                        <select value={shelf.rating} onChange={event => updateBook(book.id, { rating: Number(event.target.value) })}>
                          <option value="0">Not rated</option>
                          {[1, 2, 3, 4, 5].map(value => <option key={value} value={value}>{value} / 5</option>)}
                        </select>
                      </label>
                      <label>
                        Private note
                        <textarea value={shelf.note} maxLength="500" onChange={event => updateBook(book.id, { note: event.target.value })} placeholder="Favorite moments, discussion notes, reread thoughts…" />
                      </label>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          )}
          <p className="mt-8 text-center font-body text-xs text-muted/60">Shelf status, ratings, and notes stay private in this browser unless you export them.</p>
        </>
      )}
    </div>
  )
}
