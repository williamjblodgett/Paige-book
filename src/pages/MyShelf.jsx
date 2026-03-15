import { Link } from 'react-router-dom'
import { allBooks } from '../data/books'
import BookCard from '../components/BookCard'
import useFavorites from '../hooks/useFavorites'

export default function MyShelf() {
  const { favorites, clearAll } = useFavorites()

  const favoriteBooks = favorites
    .map(id => allBooks.find(b => b.id === id))
    .filter(Boolean)

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl md:text-5xl tracking-wider text-gold mb-3">
          My Shelf
        </h1>
        <p className="font-body text-muted max-w-lg mx-auto">
          Your personal collection of saved books. Tap the bookmark icon on any book to add it here.
        </p>
      </div>

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
          <div className="flex items-center justify-between mb-6">
            <p className="font-body text-muted text-sm">
              {favoriteBooks.length} book{favoriteBooks.length !== 1 ? 's' : ''} saved
            </p>
            <button
              onClick={clearAll}
              className="font-body text-xs text-muted/50 hover:text-red-400 transition-colors cursor-pointer"
            >
              Clear all
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {favoriteBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
