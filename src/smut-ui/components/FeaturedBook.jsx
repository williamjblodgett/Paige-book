import { motion } from 'framer-motion'
import { FlameIcon, ArrowRightIcon } from 'lucide-react'
import { TropeTag } from './TropeTag'
import SmartBookCover from '../../components/SmartBookCover'

function toTitleCase(value) {
  return value
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function FeaturedBook({ book }) {
  const tropes = (book.themes || []).slice(0, 5)

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-[1px] flex-grow transition-colors duration-700" style={{ backgroundColor: 'var(--theme-border)' }}></div>
        <h2
          className="font-heading text-sm uppercase tracking-[0.2em] font-bold transition-colors duration-700"
          style={{ color: 'var(--theme-accent)' }}
        >
          Editor&apos;s Pick
        </h2>
        <div className="h-[1px] flex-grow transition-colors duration-700" style={{ backgroundColor: 'var(--theme-border)' }}></div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-center">
        <motion.div
          className="w-full md:w-2/5 lg:w-1/3 flex-shrink-0"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          key={`cover-${book.id}`}
        >
          <div className="relative w-full max-w-sm mx-auto aspect-[2/3] rounded-r-xl rounded-l-md shadow-2xl overflow-hidden ring-1 ring-white/10">
            <SmartBookCover book={book} />
            <div className="absolute left-0 top-0 bottom-0 w-4 bg-black/40 border-r border-white/10 z-10"></div>
            <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-white/20 z-10"></div>

            <div className="absolute inset-0 p-8 flex flex-col justify-between z-10 pointer-events-none">
              <div className="text-white/80 text-sm uppercase tracking-widest font-body">{book.author}</div>
              <h3 className="text-white font-heading text-4xl lg:text-5xl font-bold leading-tight">{book.title}</h3>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-white/10 mix-blend-overlay pointer-events-none"></div>
          </div>
        </motion.div>

        <motion.div
          className="w-full md:w-3/5 lg:w-2/3 flex flex-col justify-center"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          key={`details-${book.id}`}
        >
          <h3
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 transition-colors duration-700"
            style={{ color: 'var(--theme-text)' }}
          >
            {book.title}
          </h3>
          <p className="text-xl font-body italic mb-6 transition-colors duration-700" style={{ color: 'var(--theme-text-muted)' }}>
            by {book.author}
          </p>

          <div className="flex items-center space-x-1 mb-6" aria-label={`Heat rating: ${book.spiceLevel} out of 5`}>
            {[...Array(5)].map((_, i) => (
              <FlameIcon
                key={i}
                className={`w-6 h-6 transition-colors duration-700 ${i < Math.round(book.spiceLevel || 0) ? '' : 'text-gray-600'}`}
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

          <div className="flex flex-wrap gap-2 mb-8">
            {tropes.map(trope => (
              <TropeTag key={trope} trope={toTitleCase(trope)} />
            ))}
          </div>

          {book.synopsis && (
            <p
              className="text-lg leading-relaxed font-body mb-8 border-l-2 pl-6 transition-colors duration-700"
              style={{ color: 'var(--theme-text-muted)', borderColor: 'var(--theme-accent)' }}
            >
              &quot;{book.synopsis.slice(0, 380)}...&quot;
            </p>
          )}

          <motion.button
            className="group inline-flex items-center justify-center self-start px-8 py-4 font-heading text-lg tracking-wide rounded-sm transition-colors duration-700"
            style={{ backgroundColor: 'var(--theme-accent)', color: '#FFF8F0' }}
            whileHover={{ scale: 1.02, backgroundColor: 'var(--theme-accent-hover)' }}
            whileTap={{ scale: 0.98 }}
          >
            Read Excerpt
            <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
