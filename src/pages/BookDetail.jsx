import { useParams, Link, useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import { allBooks } from '../data/books'
import { GENRE_THEMES, THEMES } from '../data/constants'
import SpiceRating from '../components/SpiceRating'
import GenreBadge from '../components/GenreBadge'
import ThemeBadge from '../components/ThemeBadge'
import SpoilerGate from '../components/SpoilerGate'
import QuizRunner from '../components/QuizRunner'
import ResultsScreen from '../components/ResultsScreen'
import GlossaryCard from '../components/GlossaryCard'
import { useState } from 'react'
import BookCover from '../components/BookCover'
import ExternalBookLinks from '../components/ExternalBookLinks'

export default function BookDetail() {
  const { bookId } = useParams()
  const navigate = useNavigate()
  const [quizResults, setQuizResults] = useState(null)
  const [showQuiz, setShowQuiz] = useState(false)

  const book = allBooks.find(b => b.id === bookId)

  const relatedBooks = useMemo(() => {
    if (!book) return []
    return allBooks
      .filter(b => b.id !== book.id && !b.comingSoon)
      .filter(b =>
        b.author === book.author ||
        b.genres.some(g => book.genres.includes(g)) ||
        b.themes?.some(t => book.themes?.includes(t))
      )
      .sort((a, b) => {
        // Prioritize same author, then genre overlap, then theme overlap
        const aScore = (a.author === book.author ? 10 : 0) +
          a.genres.filter(g => book.genres.includes(g)).length * 3 +
          (a.themes?.filter(t => book.themes?.includes(t)).length || 0)
        const bScore = (b.author === book.author ? 10 : 0) +
          b.genres.filter(g => book.genres.includes(g)).length * 3 +
          (b.themes?.filter(t => book.themes?.includes(t)).length || 0)
        return bScore - aScore
      })
      .slice(0, 6)
  }, [book])

  if (!book) {
    return (
      <div className="text-center py-20">
        <p className="font-body text-muted text-lg mb-4">Book not found.</p>
        <Link to="/browse" className="font-heading text-sm text-gold hover:underline">
          Browse all books
        </Link>
      </div>
    )
  }

  const genreTheme = GENRE_THEMES[book.genres[0]] || GENRE_THEMES['dark-romance']
  const accent = book.accentColor || genreTheme.accent

  return (
    <div className="min-h-screen">
      {/* Hero header */}
      <div
        className="relative py-16 md:py-24"
        style={{
          background: `linear-gradient(180deg, ${book.coverGradient?.[0] || genreTheme.gradient[0]} 0%, ${book.coverGradient?.[1] || genreTheme.gradient[1]} 60%, #0a0808 100%)`,
        }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 font-body text-muted text-sm hover:text-gold transition-colors mb-8 cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div className="text-center">
            <h1
              className="font-heading text-4xl md:text-6xl tracking-wider mb-3"
              style={{ color: accent }}
            >
              {book.title}
            </h1>
            <p className="font-body text-text text-xl mb-4">by {book.author}</p>

            <div className="flex items-center justify-center gap-4 mb-6">
              <SpiceRating level={book.spiceLevel} size="lg" />
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {book.genres.map(g => (
                <GenreBadge key={g} genreId={g} />
              ))}
            </div>

            {book.themes && (
              <div className="flex flex-wrap justify-center gap-1.5">
                {book.themes.map(t => {
                  const themeData = THEMES.find(th => th.id === t)
                  return (
                    <ThemeBadge key={t} themeId={t} label={themeData?.label || t} />
                  )
                })}
              </div>
            )}

            <ExternalBookLinks title={book.title} author={book.author} accentColor={accent} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        {/* Table of Contents */}
        <nav className="bg-surface rounded-lg border border-gold/10 p-6">
          <h2 className="font-heading text-sm tracking-widest uppercase text-muted mb-4">Contents</h2>
          <div className="flex flex-wrap gap-3">
            {book.synopsis && (
              <a href="#synopsis" className="font-body text-sm text-gold hover:underline">Synopsis</a>
            )}
            {book.characters?.length > 0 && (
              <a href="#characters" className="font-body text-sm text-gold hover:underline">Characters</a>
            )}
            {book.terms?.length > 0 && (
              <a href="#terms" className="font-body text-sm text-gold hover:underline">Key Terms</a>
            )}
            {book.quiz?.length > 0 && (
              <a href="#quiz" className="font-body text-sm text-gold hover:underline">Book Club Quiz</a>
            )}
            {relatedBooks.length > 0 && (
              <a href="#related" className="font-body text-sm text-gold hover:underline">Related Books</a>
            )}
          </div>
        </nav>

        {/* Synopsis */}
        {book.synopsis && (
          <section id="synopsis" className="scroll-mt-20">
            <h2
              className="font-heading text-2xl tracking-wider mb-6"
              style={{ color: accent }}
            >
              Synopsis
            </h2>
            <SpoilerGate
              title="Spoiler Warning"
              warning="This synopsis reveals major plot details including twists and endings."
              accentColor={accent}
            >
              <div className="bg-surface rounded-lg border border-gold/10 p-6 md:p-8">
                <p className="font-body text-text/80 leading-relaxed whitespace-pre-line">
                  {book.synopsis}
                </p>
              </div>
            </SpoilerGate>
          </section>
        )}

        {/* Characters */}
        {book.characters?.length > 0 && (
          <section id="characters" className="scroll-mt-20">
            <h2
              className="font-heading text-2xl tracking-wider mb-6"
              style={{ color: accent }}
            >
              Characters
            </h2>
            <SpoilerGate
              title="Spoiler Warning"
              warning="Character descriptions may contain spoilers."
              accentColor={accent}
            >
              <div className="bg-surface rounded-lg border border-gold/10 p-6 md:p-8">
                <div className="space-y-4">
                  {book.characters.map((char, i) => (
                    <div key={i} className="border-l-2 pl-4" style={{ borderColor: `${accent}50` }}>
                      <h4 className="font-heading text-base tracking-wide mb-1" style={{ color: accent }}>
                        {char.name}
                      </h4>
                      <p className="font-body text-text/70 leading-relaxed">
                        {char.role}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </SpoilerGate>
          </section>
        )}

        {/* Key Terms */}
        {book.terms?.length > 0 && (
          <section id="terms" className="scroll-mt-20">
            <h2
              className="font-heading text-2xl tracking-wider mb-6"
              style={{ color: accent }}
            >
              Key Terms & Glossary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {book.terms.map((term, i) => (
                <GlossaryCard
                  key={i}
                  term={term.term}
                  definition={term.definition}
                  book={book.title}
                  category={term.category}
                  accentColor={accent}
                />
              ))}
            </div>
          </section>
        )}

        {/* Quiz */}
        {book.quiz?.length > 0 && (
          <section id="quiz" className="scroll-mt-20">
            <h2
              className="font-heading text-2xl tracking-wider mb-6"
              style={{ color: accent }}
            >
              Book Club Quiz
            </h2>
            <SpoilerGate
              title="Spoiler Warning"
              warning="This quiz contains spoilers about the book's plot and characters."
              accentColor={accent}
            >
              {!showQuiz ? (
                <div className="bg-surface rounded-lg border border-gold/10 p-8 text-center">
                  <p className="font-body text-muted mb-4">
                    Test your knowledge with {book.quiz.length} questions about {book.title}.
                  </p>
                  <button
                    onClick={() => { setShowQuiz(true); setQuizResults(null) }}
                    className="font-heading text-sm tracking-widest uppercase px-8 py-3 rounded border-2 transition-all cursor-pointer hover:opacity-80"
                    style={{ borderColor: accent, color: accent }}
                  >
                    Start Quiz
                  </button>
                </div>
              ) : quizResults ? (
                <ResultsScreen
                  results={quizResults}
                  questions={book.quiz}
                  onRetry={() => { setQuizResults(null); setShowQuiz(true) }}
                />
              ) : (
                <QuizRunner
                  key={book.id + Date.now()}
                  questions={book.quiz}
                  onComplete={setQuizResults}
                />
              )}
            </SpoilerGate>
          </section>
        )}

        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <section id="related" className="scroll-mt-20">
            <h2
              className="font-heading text-2xl tracking-wider mb-6"
              style={{ color: accent }}
            >
              Related Books
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {relatedBooks.map(b => (
                <Link
                  key={b.id}
                  to={`/book/${b.id}`}
                  className="bg-surface rounded-lg overflow-hidden border border-transparent hover:border-gold/30 transition-all group"
                >
                  <div className="aspect-[3/4]">
                    <BookCover book={b} size="sm" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
