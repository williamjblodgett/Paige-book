import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import BookCard from '../components/BookCard'
import FilterSidebar from '../components/FilterSidebar'
import { allBooks } from '../data/books'

const SORT_OPTIONS = [
  { id: 'title', label: 'Title A-Z' },
  { id: 'author', label: 'Author A-Z' },
  { id: 'spice-asc', label: 'Spice: Low to High' },
  { id: 'spice-desc', label: 'Spice: High to Low' },
]

export default function Browse() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [sort, setSort] = useState('title')
  const [searchQuery, setSearchQuery] = useState('')

  // Parse filters from URL
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

  const filteredBooks = useMemo(() => {
    let books = [...allBooks]

    // Apply search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      books = books.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q)
      )
    }

    // Apply genre filter
    if (filters.genre?.length) {
      books = books.filter(b => b.genres.some(g => filters.genre.includes(g)))
    }

    // Apply theme filter
    if (filters.theme?.length) {
      books = books.filter(b => b.themes?.some(t => filters.theme.includes(t)))
    }

    // Apply spice filter
    if (filters.spice) {
      books = books.filter(b => b.spiceLevel === filters.spice)
    }

    // Apply author filter
    if (filters.author) {
      books = books.filter(b => b.author === filters.author)
    }

    // Sort
    switch (sort) {
      case 'title':
        books.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'author':
        books.sort((a, b) => a.author.localeCompare(b.author))
        break
      case 'spice-asc':
        books.sort((a, b) => a.spiceLevel - b.spiceLevel)
        break
      case 'spice-desc':
        books.sort((a, b) => b.spiceLevel - a.spiceLevel)
        break
    }

    return books
  }, [allBooks, filters.genre, filters.theme, filters.spice, filters.author, searchQuery, sort])

  const activeBooks = filteredBooks.filter(b => !b.comingSoon)
  const comingSoonBooks = filteredBooks.filter(b => b.comingSoon)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-gold text-3xl md:text-4xl tracking-wider mb-2">
          Browse Books
        </h1>
        <p className="font-body text-muted">
          {allBooks.length} books across {new Set(allBooks.flatMap(b => b.genres)).size} genres
        </p>
      </div>

      {/* Search + Sort bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface border border-gold/10 rounded-lg pl-10 pr-4 py-2.5 font-body text-text placeholder-muted/50 focus:outline-none focus:border-gold/40 transition-colors"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden font-heading text-xs tracking-widest uppercase px-4 py-2.5 rounded border border-gold/20 text-muted hover:text-gold hover:border-gold/40 transition-all cursor-pointer"
          >
            Filters
          </button>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-surface border border-gold/10 rounded-lg px-3 py-2.5 font-body text-sm text-text focus:outline-none focus:border-gold/40 cursor-pointer"
          >
            {SORT_OPTIONS.map(({ id, label }) => (
              <option key={id} value={id}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="font-body text-muted text-sm mb-6">
        Showing {activeBooks.length} of {allBooks.filter(b => !b.comingSoon).length} books
        {comingSoonBooks.length > 0 && ` (+${comingSoonBooks.length} coming soon)`}
      </p>

      <div className="flex gap-8">
        <FilterSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          isOpen={mobileFilterOpen}
          onClose={() => setMobileFilterOpen(false)}
        />

        <div className="flex-1">
          {activeBooks.length === 0 && comingSoonBooks.length === 0 ? (
            <p className="font-body text-muted text-center py-16 text-lg italic">
              No books match your filters.
            </p>
          ) : (
            <>
              {/* Active books grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
                {activeBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>

              {/* Coming Soon */}
              {comingSoonBooks.length > 0 && (
                <div>
                  <div className="divider-ornament mb-6">&#10022;</div>
                  <h2 className="font-heading text-muted text-xl tracking-wider mb-6 text-center">
                    Coming Soon
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {comingSoonBooks.map((book) => (
                      <BookCard key={book.id} book={book} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
