import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import BookCard from '../components/BookCard'
import BookCover from '../components/BookCover'
import SpiceRating from '../components/SpiceRating'
import { allBooks } from '../data/books'
import { GENRE_THEMES } from '../data/constants'

const QUESTIONS = [
  {
    id: 'mood',
    question: 'What mood are you in?',
    options: [
      { label: 'Dark & Dangerous', value: 'dark', icon: '\u2620\ufe0f' },
      { label: 'Sweet & Swoony', value: 'sweet', icon: '\u2764\ufe0f' },
      { label: 'Steamy & Intense', value: 'steamy', icon: '\ud83d\udd25' },
      { label: 'Epic & Fantastical', value: 'fantasy', icon: '\u2728' },
    ],
  },
  {
    id: 'spice',
    question: 'How spicy do you want it?',
    options: [
      { label: 'Hot (Level 3)', value: '3', icon: '\ud83c\udf36\ufe0f' },
      { label: 'Very Spicy (Level 4)', value: '4', icon: '\ud83c\udf36\ufe0f\ud83c\udf36\ufe0f' },
      { label: 'Inferno (Level 5)', value: '5', icon: '\ud83c\udf36\ufe0f\ud83c\udf36\ufe0f\ud83c\udf36\ufe0f' },
      { label: 'Surprise Me', value: 'any', icon: '\ud83c\udfb2' },
    ],
  },
  {
    id: 'trope',
    question: 'Pick your favorite trope:',
    options: [
      { label: 'Enemies to Lovers', value: 'enemies-to-lovers', icon: '\u2694\ufe0f' },
      { label: 'Forced Proximity', value: 'forced-proximity', icon: '\ud83d\udecf\ufe0f' },
      { label: 'Forbidden Love', value: 'forbidden-love', icon: '\ud83d\udeab' },
      { label: 'Grumpy / Sunshine', value: 'grumpy-sunshine', icon: '\u2600\ufe0f' },
    ],
  },
  {
    id: 'vibe',
    question: 'What kind of hero?',
    options: [
      { label: 'Morally Grey', value: 'morally-grey', icon: '\ud83d\udd78\ufe0f' },
      { label: 'Possessive Alpha', value: 'possessive-hero', icon: '\ud83d\udc3a' },
      { label: 'Secret Softie', value: 'he-falls-first', icon: '\ud83e\udee0' },
      { label: 'No Preference', value: 'any', icon: '\ud83e\udd37' },
    ],
  },
  {
    id: 'setting',
    question: 'Preferred setting?',
    options: [
      { label: 'Fantasy World', value: 'romantasy', icon: '\ud83c\udff0' },
      { label: 'Sports & Athletics', value: 'sports', icon: '\ud83c\udfc6' },
      { label: 'Dark Underworld', value: 'dark', icon: '\ud83c\udf03' },
      { label: 'Modern / Real World', value: 'contemporary', icon: '\ud83c\udfd9\ufe0f' },
    ],
  },
]

function scoreBook(book, answers) {
  let score = 0

  // Mood matching
  const mood = answers.mood
  if (mood === 'dark') {
    if (book.genres.some(g => ['dark-romance', 'mafia-romance'].includes(g))) score += 3
    if (book.themes?.some(t => ['morally-grey', 'possessive-hero', 'stalker', 'taboo'].includes(t))) score += 1
  } else if (mood === 'sweet') {
    if (book.genres.some(g => ['contemporary-romance', 'sports-romance'].includes(g))) score += 3
    if (book.themes?.some(t => ['slow-burn', 'friends-to-lovers', 'grumpy-sunshine', 'fake-dating'].includes(t))) score += 1
  } else if (mood === 'steamy') {
    if (book.genres.some(g => ['erotic-romance'].includes(g))) score += 3
    if (book.spiceLevel >= 4) score += 2
  } else if (mood === 'fantasy') {
    if (book.genres.some(g => ['romantasy', 'paranormal-romance'].includes(g))) score += 3
    if (book.themes?.some(t => ['fated-mates'].includes(t))) score += 1
  }

  // Spice matching
  const spice = answers.spice
  if (spice !== 'any') {
    const target = parseInt(spice)
    if (book.spiceLevel === target) score += 3
    else if (Math.abs(book.spiceLevel - target) === 1) score += 1
  }

  // Trope matching
  const trope = answers.trope
  if (book.themes?.includes(trope)) score += 4

  // Hero vibe matching
  const vibe = answers.vibe
  if (vibe !== 'any' && book.themes?.includes(vibe)) score += 3

  // Setting matching
  const setting = answers.setting
  if (setting === 'romantasy') {
    if (book.genres.some(g => ['romantasy', 'paranormal-romance'].includes(g))) score += 3
  } else if (setting === 'sports') {
    if (book.genres.includes('sports-romance')) score += 3
  } else if (setting === 'dark') {
    if (book.genres.some(g => ['dark-romance', 'mafia-romance'].includes(g))) score += 3
  } else if (setting === 'contemporary') {
    if (book.genres.some(g => ['contemporary-romance', 'erotic-romance'].includes(g))) score += 3
  }

  return score
}

function QuestionCard({ question, onAnswer, questionNum, total }) {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="font-heading text-xs tracking-widest uppercase text-muted">
            Question {questionNum} of {total}
          </span>
        </div>
        <div className="w-full h-1 bg-surface rounded-full overflow-hidden">
          <div
            className="h-full bg-gold transition-all duration-500 rounded-full"
            style={{ width: `${(questionNum / total) * 100}%` }}
          />
        </div>
      </div>

      <h2 className="font-heading text-text text-2xl md:text-3xl tracking-wider mb-8 text-center">
        {question.question}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {question.options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onAnswer(question.id, opt.value)}
            className="group bg-surface rounded-lg p-6 border border-muted/10 hover:border-gold/40 transition-all duration-300 cursor-pointer text-left"
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 20px rgba(201, 168, 76, 0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <span className="text-2xl mb-2 block">{opt.icon}</span>
            <span className="font-heading text-sm tracking-wider text-text group-hover:text-gold transition-colors">
              {opt.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

function RecommendationResults({ results, onRetry }) {
  const topBook = results[0]
  const theme = GENRE_THEMES[topBook?.genres?.[0]]

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="font-heading text-gold text-3xl md:text-4xl tracking-wider mb-2 text-center">
        Your Perfect Match
      </h2>
      <div className="divider-ornament mb-10">&#10022;</div>

      {/* Top pick */}
      <div className="mb-12">
        <p className="font-heading text-xs tracking-widest uppercase text-gold/80 mb-4 text-center">
          #1 Recommendation
        </p>
        <div className="bg-surface rounded-lg border border-gold/20 overflow-hidden">
          <div className="md:flex">
            {/* Book cover area */}
            <div className="md:w-1/3">
              <Link to={`/book/${topBook.id}`} className="block">
                <div className="aspect-[3/4]">
                  <BookCover book={topBook} />
                </div>
              </Link>
            </div>

            {/* Details */}
            <div className="md:w-2/3 p-6 md:p-8">
              <div className="mb-4">
                <SpiceRating level={topBook.spiceLevel} size="md" />
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {topBook.genres.map(g => {
                  const gt = GENRE_THEMES[g]
                  return (
                    <span
                      key={g}
                      className="font-heading text-xs tracking-widest uppercase px-3 py-1 rounded-full border"
                      style={{ borderColor: `${gt?.accent || '#c9a84c'}40`, color: gt?.accent || '#c9a84c' }}
                    >
                      {gt?.label || g}
                    </span>
                  )
                })}
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {topBook.themes?.slice(0, 5).map(t => (
                  <span key={t} className="font-body text-xs text-muted bg-bg px-2 py-1 rounded">
                    {t.replace(/-/g, ' ')}
                  </span>
                ))}
              </div>
              <p className="font-body text-text/80 text-sm leading-relaxed line-clamp-4 mb-6">
                {topBook.synopsis?.slice(0, 300)}...
              </p>
              <Link
                to={`/book/${topBook.id}`}
                className="font-heading text-sm tracking-widest uppercase px-6 py-2 rounded border border-gold text-gold hover:bg-gold/10 transition-all inline-block"
              >
                View Book
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* More picks */}
      {results.length > 1 && (
        <div className="mb-12">
          <p className="font-heading text-xs tracking-widest uppercase text-muted mb-6 text-center">
            You might also love
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {results.slice(1, 5).map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      )}

      {/* Retry */}
      <div className="text-center">
        <button
          onClick={onRetry}
          className="font-heading text-sm tracking-widest uppercase px-10 py-3 rounded border-2 border-gold text-gold hover:bg-gold/10 transition-all cursor-pointer"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}

export default function FindABook() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)

  const activeBooks = useMemo(() => allBooks.filter(b => !b.comingSoon), [])

  const handleAnswer = (questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value }
    setAnswers(newAnswers)

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowResults(true)
    }
  }

  const recommendations = useMemo(() => {
    if (!showResults) return []

    const scored = activeBooks.map(book => ({
      book,
      score: scoreBook(book, answers),
    }))

    // Sort by score, then shuffle ties for variety
    scored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      return Math.random() - 0.5
    })

    return scored.slice(0, 5).map(s => s.book)
  }, [showResults, answers, activeBooks])

  const handleRetry = () => {
    setCurrentStep(0)
    setAnswers({})
    setShowResults(false)
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="fog-layer absolute inset-0 pointer-events-none opacity-50" />
        <div className="fog-layer-2 absolute inset-0 pointer-events-none opacity-50" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-heading text-gold text-3xl md:text-5xl tracking-wider mb-3">
            Find Your Next Read
          </h1>
          <p className="font-body text-muted text-lg italic">
            Answer a few questions and we'll match you with your perfect book
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-4 py-8 pb-20">
        {!showResults ? (
          <QuestionCard
            question={QUESTIONS[currentStep]}
            onAnswer={handleAnswer}
            questionNum={currentStep + 1}
            total={QUESTIONS.length}
          />
        ) : (
          <RecommendationResults results={recommendations} onRetry={handleRetry} />
        )}
      </section>
    </div>
  )
}
