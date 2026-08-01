import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FeaturedBook } from '../components/FeaturedBook'
import { BookCard } from '../components/BookCard'
import { BookGrid } from '../components/BookGrid'
import FilterSidebar from '../../components/FilterSidebar'
import { allBooks } from '../../data/books'
import { GENRES } from '../../data/constants'
import { genreThemes } from '../data/genreThemes'

const SORT_OPTIONS = [
  { id: 'title', label: 'Title A-Z' },
  { id: 'author', label: 'Author A-Z' },
  { id: 'newest', label: 'Newest First' },
  { id: 'spice-asc', label: 'Spice: Low to High' },
  { id: 'spice-desc', label: 'Spice: High to Low' },
]

export function SmutBooksPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sort, setSort] = useState('title')
  const [reviewedOnly, setReviewedOnly] = useState(false)

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
      const qSlug = q.replace(/\s+/g, '-')
      next = next.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.themes?.some(t => t.includes(qSlug))
      )
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

    if (reviewedOnly) {
      next = next.filter(b => b.editorialStatus !== 'needs-review')
    }

    switch (sort) {
      case 'title':
        next.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'author':
        next.sort((a, b) => a.author.localeCompare(b.author))
        break
      case 'newest':
        next.sort((a, b) => (b.publicationYear || 0) - (a.publicationYear || 0))
        break
      case 'spice-asc':
        next.sort((a, b) => (a.spiceLevel ?? 99) - (b.spiceLevel ?? 99))
        break
      case 'spice-desc':
        next.sort((a, b) => (b.spiceLevel ?? -1) - (a.spiceLevel ?? -1))
        break
    }

    return next
  }, [books, filters.genre, filters.theme, filters.spice, filters.author, searchQuery, sort, reviewedOnly])

  const trendingBooks = useMemo(() => {
    return [...filteredBooks]
      .sort((a, b) => (b.spiceLevel || 0) - (a.spiceLevel || 0))
      .slice(0, 12)
  }, [filteredBooks])

  const activeTheme = genreThemes[activeCategory] || genreThemes.All

  const featuredBook =
    activeCategory === 'All'
      ? books[0]
      : books.find(book => (book.genres || []).includes(activeCategory)) || books[0]
  const showFeatured = !searchQuery.trim() && !filters.genre?.length && !filters.theme?.length && !filters.spice && !filters.author

  return (
    <div
      className="min-h-screen pb-24 md:pb-0 transition-colors duration-700 ease-in-out selection:bg-[var(--theme-accent)] selection:text-[var(--theme-bg)]"
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
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <p className="font-heading text-xs tracking-[0.28em] uppercase mb-2" style={{ color: 'var(--theme-accent)' }}>
          The catalog
        </p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="font-heading text-4xl md:text-5xl font-semibold" style={{ color: 'var(--theme-text)' }}>
              Browse romance your way.
            </h1>
            <p className="font-body mt-2 max-w-2xl" style={{ color: 'var(--theme-text-muted)' }}>
              Search {books.length} real books, then narrow by genre, trope, heat, or reading mood.
            </p>
          </div>
          <Link to="/find-a-book" className="booktok-button inline-flex min-h-11 items-center justify-center px-5 py-3 font-heading text-xs tracking-widest uppercase">
            Build your reading signal
          </Link>
        </div>
      </header>

      <div className="relative">

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <label htmlFor="catalog-search" className="sr-only">Search books by title, author, or trope</label>
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
                id="catalog-search"
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

              <div>
                <label htmlFor="catalog-sort" className="sr-only">Sort books</label>
                <select
                  id="catalog-sort"
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
          </div>

          <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <p className="font-body text-sm" style={{ color: 'var(--theme-text-muted)' }}>
                Showing {filteredBooks.length} of {books.length} books
              </p>
              <button
                type="button"
                aria-pressed={reviewedOnly}
                onClick={() => setReviewedOnly(value => !value)}
                className="min-h-10 rounded-full border px-3 font-heading text-[10px] tracking-widest uppercase transition-colors"
                style={{
                  borderColor: reviewedOnly ? 'var(--theme-accent)' : 'var(--theme-border)',
                  color: reviewedOnly ? 'var(--theme-text)' : 'var(--theme-text-muted)',
                  backgroundColor: reviewedOnly ? 'color-mix(in srgb, var(--theme-accent) 12%, transparent)' : 'transparent',
                }}
              >
                Reviewed details only
              </button>
            </div>
            <div className="flex gap-2">
              <Link
                to="/find-a-book"
                className="font-heading text-xs tracking-widest uppercase px-3 py-2 rounded border"
                style={{ borderColor: 'var(--theme-border)', color: 'var(--theme-text)' }}
              >
                Match me
              </Link>
              <Link
                to="/quizzes"
                className="font-heading text-xs tracking-widest uppercase px-3 py-2 rounded border"
                style={{ borderColor: 'var(--theme-border)', color: 'var(--theme-text)' }}
              >
                Custom quizzes
              </Link>
            </div>
          </div>
        </section>

        {showFeatured && <FeaturedBook book={featuredBook} />}

        <section className="trending max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <h2 className="font-heading text-2xl tracking-wide mb-4" style={{ color: 'var(--theme-text)' }}>
            🔥 Trending Right Now
          </h2>
          <div className="scroll-row">
            {trendingBooks.map(book => (
              <div key={`trending-${book.id}`} className="min-w-[170px] max-w-[210px]">
                <BookCard book={book} />
              </div>
            ))}
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
      </div>

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
