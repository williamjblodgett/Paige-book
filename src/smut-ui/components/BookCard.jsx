import { motion } from 'framer-motion'
import { FlameIcon } from 'lucide-react'
import SmartBookCover from '../../components/SmartBookCover'
import { Link } from 'react-router-dom'

function toTitleCase(value) {
  return value
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function BookCard({ book }) {
  const genre = toTitleCase((book.genres || [])[0] || 'romance')

  return (
    <motion.article
      className="book-card h-full"
      whileHover={{
        y: -6,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
    >
      <Link to={`/book/${book.id}`} className="relative block h-full">
        <div className="relative overflow-hidden h-[260px]">
          <SmartBookCover book={book} />
          <div className="overlay">
            <h3 className="font-heading text-base leading-tight text-white">{book.title}</h3>
            <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] mt-1">{genre}</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="spice-pill" aria-label={`Spice: ${book.spiceLevel}`}>
                <FlameIcon className="w-3.5 h-3.5" />
                <span>{book.spiceLevel}</span>
              </div>
              <span className="text-[11px] text-white/80 truncate">{book.author}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
