import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import BookCard from '../components/BookCard'
import SpiceRating from '../components/SpiceRating'
import { allBooks } from '../data/books'
import { GENRES, GENRE_THEMES, THEMES, SPICE_LEVELS } from '../data/constants'
import { useMemo } from 'react'

export default function Home() {
  const activeBooks = allBooks.filter(b => !b.comingSoon)
  const comingSoonBooks = allBooks.filter(b => b.comingSoon)

  // Trending books — pick a diverse selection
  const trending = useMemo(() => {
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

  // Books with quizzes for Book Club section
  const bookClubPicks = useMemo(() => {
    const withQuiz = activeBooks
      .filter(b => b.quiz?.length >= 5)
      .sort(() => Math.random() - 0.5)
    return withQuiz.slice(0, 6)
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

      {/* The Spice Spectrum */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="font-heading text-text text-2xl md:text-3xl tracking-wider mb-10 text-center">
          The Spice Spectrum
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {SPICE_LEVELS.map(({ level, label, emoji, description }) => {
            const count = allBooks.filter(b => b.spiceLevel === level).length
            return (
              <Link
                key={level}
                to={`/browse?spice=${level}`}
                className="group bg-surface rounded-lg p-5 border border-transparent hover:border-gold/30 transition-all text-center"
              >
                <div className="text-2xl mb-2">{emoji}</div>
                <p className="font-heading text-sm tracking-wider text-text group-hover:text-gold transition-colors mb-1">
                  {label}
                </p>
                <p className="font-body text-xs text-muted/70 mb-2 leading-relaxed">
                  {description}
                </p>
                <p className="font-body text-xs text-muted/50">{count} books</p>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Popular Tropes */}
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

      {/* Find Your Next Read CTA */}
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

      {/* Trending Now */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading text-text text-2xl md:text-3xl tracking-wider">
            Trending Now
          </h2>
          <Link
            to="/browse"
            className="font-heading text-xs tracking-widest uppercase text-gold hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {trending.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Book Club */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="divider-ornament mb-8">&#10022;</div>
        <div className="text-center mb-10">
          <h2 className="font-heading text-gold text-2xl md:text-3xl tracking-wider mb-3">
            Book Club
          </h2>
          <p className="font-body text-muted text-lg italic">
            Test your knowledge with our book quizzes — perfect for reading groups
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          {bookClubPicks.map((book) => (
            <Link
              key={book.id}
              to={`/quizzes?book=${book.id}`}
              className="group bg-surface rounded-lg overflow-hidden border border-transparent hover:border-current transition-all duration-300"
              style={{ color: book.accentColor || '#c9a84c' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 15px ${book.accentColor}30`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div
                className="aspect-[3/2] flex items-center justify-center p-4"
                style={{
                  background: `linear-gradient(160deg, ${book.coverGradient?.[0] || '#111'} 0%, ${book.coverGradient?.[1] || '#000'} 100%)`,
                }}
              >
                <div className="text-center">
                  <h3
                    className="font-heading text-sm tracking-wider mb-1"
                    style={{ color: book.accentColor }}
                  >
                    {book.title}
                  </h3>
                  <p className="font-body text-muted text-xs">{book.author}</p>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between">
                <SpiceRating level={book.spiceLevel} />
                <span className="font-body text-muted text-xs group-hover:text-gold transition-colors">
                  {book.quiz.length} Questions
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/quizzes"
            className="font-heading text-sm tracking-widest uppercase px-10 py-3 rounded border-2 border-gold text-gold hover:bg-gold/10 transition-all inline-block"
          >
            Browse All Quizzes
          </Link>
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
