import { motion } from 'framer-motion'
import { FlameIcon } from 'lucide-react'
import { TropeTag } from './TropeTag'
import SmartBookCover from '../../components/SmartBookCover'

function toTitleCase(value) {
  return value
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function BookCard({ book }) {
  const tropes = (book.themes || []).slice(0, 3)

  return (
    <motion.article
      className="group cursor-pointer flex flex-col h-full p-4 rounded-xl transition-colors duration-700"
      style={{
        backgroundColor: 'var(--theme-surface)',
        border: '1px solid var(--theme-border)',
      }}
      whileHover={{
        y: -8,
        boxShadow: '0 20px 25px -5px var(--theme-blur1), 0 8px 10px -6px var(--theme-blur1)',
        borderColor: 'var(--theme-accent)',
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
    >
      <div className="relative w-full aspect-[2/3] rounded-r-lg rounded-l-sm mb-5 overflow-hidden ring-1 ring-white/10 shadow-lg">
        <SmartBookCover book={book} />
        <div className="absolute left-0 top-0 bottom-0 w-3 bg-black/40 border-r border-white/10 z-10"></div>
        <div className="absolute left-3 top-0 bottom-0 w-[1px] bg-white/20 z-10"></div>

        <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between z-10 pointer-events-none">
          <div className="text-white/80 text-xs uppercase tracking-widest font-body">{book.author}</div>
          <h3 className="text-white font-heading text-xl sm:text-2xl font-bold leading-tight text-balance drop-shadow-md">
            {book.title}
          </h3>
        </div>

        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-white/10 mix-blend-overlay pointer-events-none"></div>
      </div>

      <div className="flex flex-col flex-grow px-1">
        <h4
          className="font-heading text-lg font-bold leading-tight mb-1 transition-colors duration-700 group-hover:text-[var(--theme-accent)]"
          style={{ color: 'var(--theme-text)' }}
        >
          {book.title}
        </h4>
        <p className="text-sm font-body italic mb-3 transition-colors duration-700" style={{ color: 'var(--theme-text-muted)' }}>
          by {book.author}
        </p>

        <div className="flex items-center space-x-0.5 mb-4" aria-label={`Heat rating: ${book.spiceLevel} out of 5`}>
          {[...Array(5)].map((_, i) => (
            <FlameIcon
              key={i}
              className={`w-4 h-4 transition-colors duration-700 ${i < Math.round(book.spiceLevel || 0) ? '' : 'text-gray-600'}`}
              style={
                i < Math.round(book.spiceLevel || 0)
                  ? {
                      color: 'var(--theme-accent)',
                      fill: 'var(--theme-accent)',
                    }
                  : {}
              }
              aria-hidden="true"
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {tropes.map(trope => (
            <TropeTag key={trope} trope={toTitleCase(trope)} />
          ))}
        </div>
      </div>
    </motion.article>
  )
}
