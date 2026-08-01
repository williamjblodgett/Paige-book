import { Link } from 'react-router-dom'
import { CATALOG_STATS } from '../data/catalogStats'

const footerLinks = [
  { to: '/browse', label: 'Browse' },
  { to: '/lists', label: 'Lists' },
  { to: '/find-a-book', label: 'Match' },
  { to: '/my-shelf', label: 'My Shelf' },
  { to: '/quizzes', label: 'Quizzes' },
]

export default function Footer() {
  return (
    <footer className="mt-16 border-t-2 border-[var(--primary)]/40 bg-surface/60">
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <p className="font-heading text-xl tracking-[0.25em] mb-2 font-bold gradient-text inline-block">SMUTBOOK</p>
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
          {CATALOG_STATS.books} books &middot; {CATALOG_STATS.quizQuestions} quiz questions &middot; Updated for {CATALOG_STATS.updatedYear}
        </p>
      </div>
    </footer>
  )
}
