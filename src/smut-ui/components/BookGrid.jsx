import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookCard } from './BookCard'

function formatCategoryLabel(category) {
  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function BookGrid({ books, categories, activeCategory, setActiveCategory }) {
  const filteredBooks = useMemo(() => {
    if (activeCategory === 'All') return books
    return books.filter(book => (book.genres || []).includes(activeCategory))
  }, [activeCategory])

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.2 },
    },
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col items-center mb-12">
        <h2
          className="font-heading text-3xl md:text-4xl font-bold mb-8 text-center transition-colors duration-700"
          style={{ color: 'var(--theme-text)' }}
        >
          Curated Collections
        </h2>

        <nav className="w-full overflow-x-auto pb-4 scrollbar-hide" aria-label="Book categories">
          <ul className="flex space-x-3 md:justify-center min-w-max px-2">
            {categories.map(category => {
              const isActive = activeCategory === category

              return (
                <li key={category}>
                  <button
                    onClick={() => setActiveCategory(category)}
                    className="px-5 py-2 rounded-full font-body text-sm transition-all duration-500 border"
                    style={{
                      backgroundColor: isActive ? 'var(--theme-accent)' : 'var(--theme-surface)',
                      color: isActive ? '#FFF8F0' : 'var(--theme-text-muted)',
                      borderColor: isActive ? 'var(--theme-accent)' : 'var(--theme-border)',
                      boxShadow: isActive ? '0 4px 14px 0 var(--theme-blur1)' : 'none',
                    }}
                    aria-pressed={isActive}
                  >
                    {category === 'All' ? 'All' : formatCategoryLabel(category)}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="show"
        key={activeCategory}
      >
        <AnimatePresence mode="popLayout">
          {filteredBooks.map(book => (
            <motion.div key={book.id} variants={itemVariants} layout>
              <BookCard book={book} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-20">
          <p className="font-body text-lg transition-colors duration-700" style={{ color: 'var(--theme-text-muted)' }}>
            No books found for this category. Check back soon!
          </p>
        </div>
      )}
    </section>
  )
}
