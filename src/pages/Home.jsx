import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import { BookCard as CoverCard } from '../smut-ui/components/BookCard'
import { allBooks } from '../data/books'
import { GENRES, GENRE_THEMES, THEMES, SPICE_LEVELS } from '../data/constants'
import { useMemo } from 'react'

export default function Home() {
  const activeBooks = useMemo(() => allBooks.filter(b => !b.comingSoon), [])

  // Newest releases shelf
  const newReleases = useMemo(() => {
    return [...activeBooks]
      .filter(b => b.publicationYear)
      .sort((a, b) => b.publicationYear - a.publicationYear)
      .slice(0, 12)
  }, [activeBooks])

  // Trending books — pick a diverse selection
  const trending = useMemo(() => {
    const picks = []
    const usedGenres = new Set()

    const sorted = [...activeBooks]
      .filter(b => b.quiz?.length >= 5 && b.synopsis)
      .sort(() => Math.random() - 0.5)

    for (const book of sorted) {
      if (picks.length >= 8) break
      const primaryGenre = book.genres[0]
      if (!usedGenres.has(primaryGenre) || picks.length >= 4) {
        picks.push(book)
        usedGenres.add(primaryGenre)
      }
    }

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
  }, [])

  return (
    <div>
      <Hero />

      {/* New This Year shelf */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading text-2xl md:text-3xl tracking-wide text-white">
            ✨ New Releases
          </h2>
          <Link
            to="/browse"
            className="font-heading text-xs tracking-[0.22em] uppercase text-[var(--primary)] hover:underline"
          >
            View All
          </Link>
        </div>
        <div className="scroll-row">
          {newReleases.map(book => (
            <div key={`new-${book.id}`} className="min-w-[170px] max-w-[210px]">
              <CoverCard book={book} />
            </div>
          ))}
        </div>
      </section>

      {/* Browse by Genre */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="font-heading text-white text-2xl md:text-3xl tracking-wide mb-8 text-center">
          Browse by Mood
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {activeGenres.slice(0, 8).map(({ id, label, count }) => {
            const theme = GENRE_THEMES[id]
            const [g1, g2] = theme?.gradient || ['#14141a', '#0b0b0f']
            return (
              <Link
                key={id}
                to={`/browse?genre=${id}`}
                className="genre-tile group p-5 text-center block"
                style={{
                  background: `linear-gradient(150deg, ${g1} 0%, ${g2} 100%)`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 8px 30px ${theme?.accent || '#ff2e88'}35`
                  e.currentTarget.style.borderColor = `${theme?.accent || '#ff2e88'}60`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                }}
              >
                <h3 className="font-heading text-sm tracking-wider mb-1" style={{ color: theme?.accent || '#ff2e88' }}>
                  {label}
                </h3>
                <p className="font-body text-zinc-400 text-xs">{count} books</p>
              </Link>
            )
          })}
        </div>
        <div className="text-center mt-6">
          <Link to="/browse" className="font-heading text-xs tracking-[0.2em] uppercase text-[var(--primary)] hover:underline">Explore all genres</Link>
        </div>
      </section>

      {/* The Spice Spectrum */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="font-heading text-white text-2xl md:text-3xl tracking-wide mb-8 text-center">
          The Spice Spectrum
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {SPICE_LEVELS.map(({ level, label, emoji, description }) => {
            const count = allBooks.filter(b => b.spiceLevel === level).length
            return (
              <Link
                key={level}
                to={`/browse?spice=${level}`}
                className="group app-panel p-5 text-center transition-all hover:border-[var(--primary)]/40 hover:shadow-[0_0_20px_rgba(255,46,136,0.15)]"
              >
                <div className="text-2xl mb-2">{emoji}</div>
                <p className="font-heading text-sm tracking-wider text-white group-hover:text-[var(--primary)] transition-colors mb-1">
                  {label}
                </p>
                <p className="font-body text-xs text-zinc-500 mb-2 leading-relaxed">
                  {description}
                </p>
                <p className="font-body text-xs text-zinc-600">{count} books</p>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Popular Tropes */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="font-heading text-white text-2xl md:text-3xl tracking-wide mb-8 text-center">
          Popular Tropes
        </h2>

        <div className="flex flex-wrap justify-center gap-2">
          {THEMES.slice(0, 8).map(({ id, label }) => (
            <Link
              key={id}
              to={`/browse?theme=${id}`}
              className="font-heading text-xs tracking-widest uppercase px-4 py-2 rounded-full border border-white/10 text-zinc-400 hover:border-[var(--primary)]/60 hover:text-[var(--primary)] hover:shadow-[0_0_14px_rgba(255,46,136,0.2)] transition-all"
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link to="/browse" className="font-heading text-xs tracking-[0.2em] uppercase text-[var(--primary)] hover:underline">Explore every trope</Link>
        </div>
      </section>

      {/* Trending Now */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading text-white text-2xl md:text-3xl tracking-wide">
            🔥 Trending Now
          </h2>
          <Link
            to="/browse"
            className="font-heading text-xs tracking-[0.22em] uppercase text-[var(--primary)] hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {trending.map((book) => (
            <CoverCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Book Club */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h2 className="font-heading gradient-text text-2xl md:text-3xl tracking-wide mb-3 font-bold inline-block">
            Quiz Studio
          </h2>
          <p className="font-body text-zinc-400 text-lg italic">
            Choose a full-book quiz or build a 10, 20, or 30-question romance marathon.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          {bookClubPicks.map((book) => (
            <Link
              key={book.id}
              to={`/quizzes?book=${book.id}`}
              className="group app-panel overflow-hidden transition-all duration-300 hover:border-[var(--primary)]/40"
              style={{ padding: 0 }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 20px ${book.accentColor || '#ff2e88'}30`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div
                className="aspect-[3/2] flex items-center justify-center p-4"
                style={{
                  background: `linear-gradient(160deg, ${book.coverGradient?.[0] || '#14141a'} 0%, ${book.coverGradient?.[1] || '#0b0b0f'} 100%)`,
                }}
              >
                <div className="text-center">
                  <h3
                    className="font-heading text-sm tracking-wider mb-1"
                    style={{ color: book.accentColor || '#ff2e88' }}
                  >
                    {book.title}
                  </h3>
                  <p className="font-body text-zinc-400 text-xs">{book.author}</p>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between">
                <span className="spice-pill">🌶 {book.spiceLevel}</span>
                <span className="font-body text-zinc-500 text-xs group-hover:text-[var(--primary)] transition-colors">
                  {book.quiz.length} Questions
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/quizzes"
            className="booktok-button font-heading text-sm tracking-[0.22em] uppercase px-10 py-3 inline-block"
          >
            Customize a Quiz
          </Link>
        </div>
      </section>

      {/* Footer quote */}
      <section className="max-w-6xl mx-auto px-4 py-12 text-center">
        <div className="divider-ornament mb-8">&#10022;</div>
        <p className="font-body text-zinc-400 italic text-lg">
          "Every great love story deserves its own encyclopedia."
        </p>
      </section>
    </div>
  )
}
