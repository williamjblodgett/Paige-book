import { useMemo, useState } from 'react'
import { HeroSection } from '../components/HeroSection'
import { FeaturedBook } from '../components/FeaturedBook'
import { BookGrid } from '../components/BookGrid'
import { allBooks } from '../../data/books'
import { genreThemes } from '../data/genreThemes'

export function SmutBooksPage() {
  const books = useMemo(() => allBooks.filter(book => !book.comingSoon), [])
  const categories = useMemo(() => {
    const genres = new Set()

    books.forEach(book => {
      ;(book.genres || []).forEach(genre => genres.add(genre))
    })

    return ['All', ...Array.from(genres).sort()]
  }, [books])

  const [activeCategory, setActiveCategory] = useState('All')

  const activeTheme = genreThemes[activeCategory] || genreThemes.All

  const featuredBook =
    activeCategory === 'All'
      ? books[0]
      : books.find(book => (book.genres || []).includes(activeCategory)) || books[0]

  return (
    <div
      className="min-h-screen transition-colors duration-700 ease-in-out selection:bg-[var(--theme-accent)] selection:text-[var(--theme-bg)]"
      style={{
        '--theme-bg': activeTheme.bg,
        '--theme-surface': activeTheme.surface,
        '--theme-accent': activeTheme.accent,
        '--theme-accent-hover': activeTheme.accentHover,
        '--theme-text': activeTheme.text,
        '--theme-text-muted': activeTheme.textMuted,
        '--theme-border': activeTheme.border,
        '--theme-blur1': activeTheme.blur1,
        '--theme-blur2': activeTheme.blur2,
        backgroundColor: 'var(--theme-bg)',
        color: 'var(--theme-text)',
      }}
    >
      <HeroSection theme={activeTheme} totalBooks={books.length} />

      <main className="relative">
        <FeaturedBook book={featuredBook} />

        <div className="w-full max-w-7xl mx-auto px-8">
          <hr className="border-[var(--theme-border)] transition-colors duration-700" />
        </div>

        <BookGrid
          books={books}
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </main>

      <footer
        className="py-16 mt-12 border-t-4 transition-colors duration-700"
        style={{
          borderColor: 'var(--theme-accent)',
          backgroundColor: 'var(--theme-surface)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <h2 className="font-heading text-3xl font-bold mb-4" style={{ color: 'var(--theme-text)' }}>
            SMUTBOOK
          </h2>
          <p className="font-body italic max-w-md mb-8 transition-colors duration-700" style={{ color: 'var(--theme-text-muted)' }}>
            Curating the finest romance, because every great love story deserves to be read.
          </p>
          <div className="flex items-center gap-4">
            <span className="h-[1px] w-8 transition-colors duration-700" style={{ backgroundColor: 'var(--theme-border)' }}></span>
            <span
              className="font-heading text-sm uppercase tracking-widest transition-colors duration-700"
              style={{ color: 'var(--theme-accent)' }}
            >
              Est. 2024
            </span>
            <span className="h-[1px] w-8 transition-colors duration-700" style={{ backgroundColor: 'var(--theme-border)' }}></span>
          </div>
        </div>
      </footer>
    </div>
  )
}
