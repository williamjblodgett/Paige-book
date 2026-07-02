import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { BookCard } from './BookCard'

const PAGE_SIZE = 24

function formatCategoryLabel(category) {
  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function BookGrid({ books, categories, activeCategory, setActiveCategory }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const sentinelRef = useRef(null)

  const filteredBooks = useMemo(() => {
    if (activeCategory === 'All') return books
    return books.filter(book => (book.genres || []).includes(activeCategory))
  }, [books, activeCategory])

  // Reset pagination when the underlying list changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [filteredBooks])

  const visibleBooks = filteredBooks.slice(0, visibleCount)
  const hasMore = visibleCount < filteredBooks.length

  useEffect(() => {
    if (!hasMore || !sentinelRef.current) return
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount(count => Math.min(count + PAGE_SIZE, filteredBooks.length))
        }
      },
      { rootMargin: '600px' }
    )
    observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [hasMore, filteredBooks.length])

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
                    className="px-5 py-2 rounded-full font-body text-sm transition-all duration-500 border cursor-pointer"
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {visibleBooks.map((book, i) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: Math.min((i % PAGE_SIZE) * 0.02, 0.4) }}
          >
            <BookCard book={book} />
          </motion.div>
        ))}
      </div>

      {hasMore && (
        <div ref={sentinelRef} className="flex justify-center py-10">
          <button
            onClick={() => setVisibleCount(count => Math.min(count + PAGE_SIZE, filteredBooks.length))}
            className="font-heading text-xs tracking-widest uppercase px-8 py-3 rounded-full border transition-all cursor-pointer"
            style={{ borderColor: 'var(--theme-border)', color: 'var(--theme-text-muted)' }}
          >
            Show more ({filteredBooks.length - visibleCount} remaining)
          </button>
        </div>
      )}

      {filteredBooks.length === 0 && (
        <div className="text-center py-20">
          <p className="font-body text-lg mb-6 transition-colors duration-700" style={{ color: 'var(--theme-text-muted)' }}>
            No books match your filters.
          </p>
          <button
            onClick={() => setActiveCategory('All')}
            className="font-heading text-xs tracking-widest uppercase px-8 py-3 rounded-full border transition-all cursor-pointer"
            style={{ borderColor: 'var(--theme-accent)', color: 'var(--theme-accent)' }}
          >
            Show All Books
          </button>
        </div>
      )}
    </section>
  )
}
