import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import BookCard from '../components/BookCard'
import SpiceRating from '../components/SpiceRating'
import { allBooks } from '../data/books'
import { GENRES, GENRE_THEMES, THEMES } from '../data/constants'
import { useMemo } from 'react'

export default function Home() {
  const activeBooks = allBooks.filter(b => !b.comingSoon)
  const comingSoonBooks = allBooks.filter(b => b.comingSoon)

  // Featured books — pick a diverse selection
  const featured = useMemo(() => {
    const picks = []
    const usedAuthors = new Set()
    const usedGenres = new Set()

    // Prioritize books with quiz + terms for a richer experience
    const sorted = [...activeBooks]
      .filter(b => b.quiz?.length >= 5 && b.synopsis)
      .sort(() => Math.random() - 0.5)

    for (const book of sorted) {
      if (picks.length >= 8) break
      const primaryGenre = book.genres[0]
      if (!usedGenres.has(primaryGenre) || picks.length >= 4) {
        picks.push(book)
        usedAuthors.add(book.author)
        usedGenres.add(primaryGenre)
      }
    }

    // Fill if needed
    if (picks.length < 8) {
      for (const book of activeBooks) {
        if (picks.length >= 8) break
        if (!picks.find(p => p.id === book.id)) {
          picks.push(book)
        }
      }
    }

    return picks.slice(0, 8)
  }, [activeBooks])

  // Get genres that have books
  const activeGenres = useMemo(() => {
    const genreCounts = {}
    for (const book of allBooks) {
      for (const g of book.genres) {
        genreCounts[g] = (genreCounts[g] || 0) + 1
      }
    }
    return GENRES
      .filter(g => genreCounts[g.id])
      .map(g => ({ ...g, count: genreCounts[g.id] }))
      .sort((a, b) => b.count - a.count)
  }, [allBooks])

  return (
    <div>
      <Hero />

      {/* Browse by Genre */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="font-heading text-text text-2xl md:text-3xl tracking-wider mb-8 text-center">
          Browse by Genre
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {activeGenres.map(({ id, label, count }) => {
            const theme = GENRE_THEMES[id]
            return (
              <Link
                key={id}
                to={`/browse?genre=${id}`}
                className="group bg-surface rounded-lg p-5 border border-transparent transition-all duration-300 hover:border-current text-center"
                style={{ color: theme?.accent || '#c9a84c' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 15px ${theme?.accent || '#c9a84c'}30`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <h3 className="font-heading text-sm tracking-wider mb-1" style={{ color: theme?.accent }}>
                  {label}
                </h3>
                <p className="font-body text-muted text-xs">{count} books</p>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Featured Books */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading text-text text-2xl md:text-3xl tracking-wider">
            Featured Books
          </h2>
          <Link
            to="/browse"
            className="font-heading text-xs tracking-widest uppercase text-gold hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {featured.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Find a Book CTA */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-surface rounded-lg border border-gold/20 p-8 md:p-12 text-center relative overflow-hidden">
          <div className="fog-layer absolute inset-0 pointer-events-none opacity-30" />
          <div className="relative z-10">
            <h2 className="font-heading text-gold text-2xl md:text-3xl tracking-wider mb-3">
              Not Sure What to Read Next?
            </h2>
            <p className="font-body text-muted text-lg italic mb-6">
              Take our quick quiz and get a personalized recommendation
            </p>
            <Link
              to="/find-a-book"
              className="font-heading text-sm tracking-widest uppercase px-10 py-3 rounded border-2 border-gold text-gold hover:bg-gold/10 transition-all inline-block"
            >
              Find Your Match
            </Link>
          </div>
        </div>
      </section>

      {/* Browse by Trope */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="font-heading text-text text-2xl md:text-3xl tracking-wider mb-8 text-center">
          Popular Tropes
        </h2>

        <div className="flex flex-wrap justify-center gap-2">
          {THEMES.slice(0, 18).map(({ id, label }) => (
            <Link
              key={id}
              to={`/browse?theme=${id}`}
              className="font-heading text-xs tracking-widest uppercase px-4 py-2 rounded-full border border-muted/15 text-muted hover:border-gold/40 hover:text-gold transition-all"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      {/* Spice Spectrum */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="font-heading text-text text-2xl md:text-3xl tracking-wider mb-8 text-center">
          The Spice Spectrum
        </h2>

        <div className="flex justify-center gap-4 md:gap-6">
          {[1, 2, 3, 4, 5].map((level) => {
            const count = allBooks.filter(b => b.spiceLevel === level).length
            const labels = ['Mild', 'Warm', 'Hot', 'Spicy', 'Inferno']
            return (
              <Link
                key={level}
                to={`/browse?spice=${level}`}
                className="text-center group cursor-pointer"
              >
                <div className="mb-2">
                  <SpiceRating level={level} size="md" />
                </div>
                <p className="font-heading text-xs tracking-wider text-muted group-hover:text-gold transition-colors">
                  {labels[level - 1]}
                </p>
                <p className="font-body text-xs text-muted/60">{count} books</p>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Coming Soon */}
      {comingSoonBooks.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="divider-ornament mb-8">&#10022;</div>
          <h2 className="font-heading text-muted text-2xl md:text-3xl tracking-wider mb-8 text-center">
            Coming Soon
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {comingSoonBooks.slice(0, 10).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          {comingSoonBooks.length > 10 && (
            <p className="font-body text-muted text-sm text-center mt-4">
              +{comingSoonBooks.length - 10} more coming soon
            </p>
          )}
        </section>
      )}

      {/* Footer stats */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="divider-ornament mb-8">&#10022;</div>
        <p className="font-body text-muted italic text-lg">
          "Every great love story deserves its own encyclopedia."
        </p>
      </section>
    </div>
  )
}
