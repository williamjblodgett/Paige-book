import { Link } from 'react-router-dom'
import { allBooks } from '../data/books'

const footerLinks = [
  { to: '/browse', label: 'Browse' },
  { to: '/lists', label: 'Lists' },
  { to: '/find-a-book', label: 'Find a Book' },
  { to: '/my-shelf', label: 'My Shelf' },
  { to: '/quizzes', label: 'Book Club' },
]

export default function Footer() {
  const bookCount = allBooks.filter(b => !b.comingSoon).length
  const quizCount = allBooks.reduce((sum, b) => sum + (b.quiz?.length || 0), 0)

  return (
    <footer className="mt-16 border-t border-gold/20 bg-surface/60">
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <p className="font-heading text-gold text-xl tracking-wider mb-2">SMUTBOOK</p>
        <p className="font-body text-muted italic text-sm mb-6">
          Every great love story deserves its own encyclopedia.
        </p>

        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6">
          {footerLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="font-heading text-xs tracking-widest uppercase text-muted hover:text-gold transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="divider-ornament mb-4">&#10022;</div>
        <p className="font-body text-muted/60 text-xs">
          {bookCount} books &middot; {quizCount} quiz questions &middot; Updated for {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
