import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { HeroSection } from '../components/HeroSection'
import { FeaturedBook } from '../components/FeaturedBook'
import { BookGrid } from '../components/BookGrid'
import FilterSidebar from '../../components/FilterSidebar'
import { allBooks } from '../../data/books'
import { GENRES } from '../../data/constants'
import { genreThemes } from '../data/genreThemes'

const SORT_OPTIONS = [
  { id: 'title', label: 'Title A-Z' },
  { id: 'author', label: 'Author A-Z' },
  { id: 'spice-asc', label: 'Spice: Low to High' },
  { id: 'spice-desc', label: 'Spice: High to Low' },
]

export function SmutBooksPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sort, setSort] = useState('title')

  const books = useMemo(() => allBooks.filter(book => !book.comingSoon), [])
  const categories = useMemo(() => ['All', ...GENRES.map(g => g.id)], [])

  const filters = {
    genre: searchParams.getAll('genre').length ? searchParams.getAll('genre') : null,
    theme: searchParams.getAll('theme').length ? searchParams.getAll('theme') : null,
    spice: searchParams.get('spice') ? Number(searchParams.get('spice')) : null,
    author: searchParams.get('author') || null,
    search: searchQuery,
  }

  function handleFilterChange(newFilters) {
    const params = new URLSearchParams()
    if (newFilters.genre) newFilters.genre.forEach(g => params.append('genre', g))
    if (newFilters.theme) newFilters.theme.forEach(t => params.append('theme', t))
    if (newFilters.spice) params.set('spice', newFilters.spice)
    if (newFilters.author) params.set('author', newFilters.author)
    setSearchParams(params)
    if (!newFilters.search && newFilters.search !== undefined) setSearchQuery('')
  }

  const activeCategory = filters.genre?.[0] || 'All'

  function setActiveCategory(category) {
    if (category === 'All') {
      handleFilterChange({ ...filters, genre: null })
      return
    }
    handleFilterChange({ ...filters, genre: [category] })
  }

  const filteredBooks = useMemo(() => {
    let next = [...books]

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      next = next.filter(b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q))
    }

    if (filters.genre?.length) {
      next = next.filter(b => b.genres.some(g => filters.genre.includes(g)))
    }

    if (filters.theme?.length) {
      next = next.filter(b => b.themes?.some(t => filters.theme.includes(t)))
    }

    if (filters.spice) {
      next = next.filter(b => Math.round(b.spiceLevel) === filters.spice)
    }

    if (filters.author) {
      next = next.filter(b => b.author === filters.author)
    }

    switch (sort) {
      case 'title':
        next.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'author':
        next.sort((a, b) => a.author.localeCompare(b.author))
        break
      case 'spice-asc':
        next.sort((a, b) => a.spiceLevel - b.spiceLevel)
        break
      case 'spice-desc':
        next.sort((a, b) => b.spiceLevel - a.spiceLevel)
        break
    }

    return next
  }, [books, filters.genre, filters.theme, filters.spice, filters.author, searchQuery, sort])

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
      <HeroSection theme={activeTheme} />

      <main className="relative">
        <FeaturedBook book={featuredBook} />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ color: 'var(--theme-text-muted)' }}
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search by title or author..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full rounded-lg pl-10 pr-4 py-2.5 font-body border transition-colors"
                style={{
                  backgroundColor: 'var(--theme-surface)',
                  borderColor: 'var(--theme-border)',
                  color: 'var(--theme-text)',
                }}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden font-heading text-xs tracking-widest uppercase px-4 py-2.5 rounded border transition-all cursor-pointer"
                style={{ borderColor: 'var(--theme-border)', color: 'var(--theme-text-muted)' }}
              >
                Filters
              </button>

              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="rounded-lg px-3 py-2.5 font-body text-sm border cursor-pointer"
                style={{
                  backgroundColor: 'var(--theme-surface)',
                  borderColor: 'var(--theme-border)',
                  color: 'var(--theme-text)',
                }}
              >
                {SORT_OPTIONS.map(({ id, label }) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
            <p className="font-body text-sm" style={{ color: 'var(--theme-text-muted)' }}>
              Showing {filteredBooks.length} of {books.length} books
            </p>
            <div className="flex gap-2">
              <Link
                to="/find-a-book"
                className="font-heading text-xs tracking-widest uppercase px-3 py-2 rounded border"
                style={{ borderColor: 'var(--theme-border)', color: 'var(--theme-text)' }}
              >
                Find A Book Quiz
              </Link>
              <Link
                to="/quizzes"
                className="font-heading text-xs tracking-widest uppercase px-3 py-2 rounded border"
                style={{ borderColor: 'var(--theme-border)', color: 'var(--theme-text)' }}
              >
                Book Club Quizzes
              </Link>
            </div>
          </div>
        </section>

        <div className="w-full max-w-7xl mx-auto px-8">
          <hr className="border-[var(--theme-border)] transition-colors duration-700" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-8">
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            isOpen={mobileFilterOpen}
            onClose={() => setMobileFilterOpen(false)}
          />

          <div className="flex-1">
            <BookGrid
              books={filteredBooks}
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          </div>
        </div>
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
