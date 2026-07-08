import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import BookCard from '../components/BookCard'
import SmartBookCover from '../components/SmartBookCover'
import SpiceRating from '../components/SpiceRating'
import { allBooks } from '../data/books'
import { GENRE_THEMES } from '../data/constants'

const QUESTIONS = [
  {
    id: 'mood',
    question: 'What mood are you in?',
    options: [
      { label: 'Dark & Dangerous', value: 'dark', icon: '☠️' },
      { label: 'Sweet & Swoony', value: 'sweet', icon: '❤️' },
      { label: 'Steamy & Intense', value: 'steamy', icon: '🔥' },
      { label: 'Epic & Fantastical', value: 'fantasy', icon: '✨' },
    ],
  },
  {
    id: 'spice',
    question: 'How much spice can you handle?',
    options: [
      { label: 'Sweet / Closed Door', value: 'sweet', icon: '🌸' },
      { label: 'Hot (Level 3)', value: '3', icon: '🌶️' },
      { label: 'Very Spicy (Level 4)', value: '4', icon: '🌶️🌶️' },
      { label: 'Inferno (Level 5)', value: '5', icon: '🌶️🌶️🌶️' },
      { label: 'Surprise Me', value: 'any', icon: '🎲' },
    ],
  },
  {
    id: 'trope',
    question: 'Pick your favorite trope:',
    options: [
      { label: 'Enemies to Lovers', value: 'enemies-to-lovers', icon: '⚔️' },
      { label: 'Forced Proximity', value: 'forced-proximity', icon: '🛖' },
      { label: 'Forbidden Love', value: 'forbidden-love', icon: '🚫' },
      { label: 'Grumpy / Sunshine', value: 'grumpy-sunshine', icon: '☀️' },
      { label: 'Second Chance', value: 'second-chance', icon: '🔄' },
      { label: 'Fake Dating', value: 'fake-dating', icon: '💍' },
    ],
  },
  {
    id: 'vibe',
    question: 'What kind of hero?',
    options: [
      { label: 'Morally Grey', value: 'morally-grey', icon: '🕸️' },
      { label: 'Possessive Alpha', value: 'possessive-hero', icon: '🐺' },
      { label: 'Secret Softie', value: 'he-falls-first', icon: '🫠' },
      { label: 'No Preference', value: 'any', icon: '🤷' },
    ],
  },
  {
    id: 'setting',
    question: 'Preferred world?',
    options: [
      { label: 'Fantasy Realm', value: 'romantasy', icon: '🏰' },
      { label: 'Sports & Athletics', value: 'sports', icon: '🏆' },
      { label: 'Dark Underworld', value: 'dark', icon: '🌃' },
      { label: 'Modern / Real World', value: 'contemporary', icon: '🏙️' },
      { label: 'Supernatural', value: 'paranormal', icon: '🌙' },
    ],
  },
  {
    id: 'pov',
    question: 'Whose head do you want to be in?',
    options: [
      { label: 'Both Leads (Dual POV)', value: 'dual-pov', icon: '🔀' },
      { label: 'Just Her (FMC)', value: 'single-fmc', icon: '👩' },
      { label: 'Just Him (MMC)', value: 'single-mmc', icon: '👨' },
      { label: 'No Preference', value: 'any', icon: '🤷' },
    ],
  },
  {
    id: 'length',
    question: 'How big a commitment?',
    options: [
      { label: 'Quick Read (under 350 pg)', value: 'quick', icon: '⚡' },
      { label: 'Standard (350–480 pg)', value: 'standard', icon: '📖' },
      { label: 'Epic Tome (480+ pg)', value: 'epic', icon: '📚' },
      { label: 'Any Length', value: 'any', icon: '🤷' },
    ],
  },
  {
    id: 'avoid',
    question: 'Anything you want to avoid?',
    subtitle: 'Select all that apply — we’ll filter these out. Pick none to skip.',
    multiSelect: true,
    options: [
      { label: 'Cheating', value: 'cheating', cw: ['cheating'], icon: '💔' },
      { label: 'Dubious / Non-Consent', value: 'noncon', cw: ['dubcon', 'noncon', 'sexual-assault'], icon: '🚷' },
      { label: 'Abuse / Toxic Relationship', value: 'toxic', cw: ['abuse', 'toxic-relationship'], icon: '⚠️' },
      { label: 'Major Character Death', value: 'death', cw: ['death'], icon: '⚰️' },
    ],
  },
]

const REASON_LABELS = {
  mood: { dark: 'Dark & dangerous', sweet: 'Sweet & swoony', steamy: 'Steamy & intense', fantasy: 'Epic & fantastical' },
}

function scoreBook(book, answers) {
  let score = 0
  const reasons = []

  // Mood
  const mood = answers.mood
  if (mood === 'dark') {
    if (book.genres.some(g => ['dark-romance', 'mafia-romance'].includes(g))) { score += 3; reasons.push('Dark & dangerous') }
    if (book.themes?.some(t => ['morally-grey', 'possessive-hero', 'stalker', 'taboo'].includes(t))) score += 1
  } else if (mood === 'sweet') {
    if (book.genres.some(g => ['contemporary-romance', 'sports-romance'].includes(g))) { score += 3; reasons.push('Sweet & swoony') }
    if (book.themes?.some(t => ['slow-burn', 'friends-to-lovers', 'grumpy-sunshine', 'fake-dating'].includes(t))) score += 1
  } else if (mood === 'steamy') {
    if (book.genres.includes('erotic-romance')) { score += 3; reasons.push('Steamy & intense') }
    if (book.spiceLevel >= 4) score += 2
  } else if (mood === 'fantasy') {
    if (book.genres.some(g => ['romantasy', 'paranormal-romance'].includes(g))) { score += 3; reasons.push('Epic & fantastical') }
    if (book.themes?.includes('fated-mates')) score += 1
  }

  // Spice
  const spice = answers.spice
  if (spice === 'sweet') {
    if (book.spiceLevel <= 2) { score += 3; reasons.push('Low spice') }
  } else if (spice && spice !== 'any') {
    const target = parseInt(spice)
    if (book.spiceLevel === target) { score += 3; reasons.push(`Spice level ${target}`) }
    else if (Math.abs(book.spiceLevel - target) === 1) score += 1
  }

  // Trope
  if (answers.trope && book.themes?.includes(answers.trope)) {
    score += 4
    reasons.push(answers.trope.replace(/-/g, ' '))
  }

  // Hero
  const vibe = answers.vibe
  if (vibe && vibe !== 'any' && book.themes?.includes(vibe)) {
    score += 3
    reasons.push(vibe === 'he-falls-first' ? 'He falls first' : vibe.replace(/-/g, ' '))
  }

  // Setting
  const setting = answers.setting
  const settingMap = {
    romantasy: ['romantasy'],
    sports: ['sports-romance'],
    dark: ['dark-romance', 'mafia-romance'],
    contemporary: ['contemporary-romance', 'erotic-romance'],
    paranormal: ['paranormal-romance'],
  }
  if (setting && settingMap[setting] && book.genres.some(g => settingMap[setting].includes(g))) {
    score += 3
    const gt = GENRE_THEMES[book.genres.find(g => settingMap[setting].includes(g))]
    reasons.push(gt?.label || setting)
  }

  // POV
  if (answers.pov && answers.pov !== 'any' && book.pov === answers.pov) {
    score += 2
    reasons.push(answers.pov === 'dual-pov' ? 'Dual POV' : answers.pov === 'single-fmc' ? 'FMC POV' : 'MMC POV')
  }

  // Length
  const length = answers.length
  if (length && length !== 'any' && book.pageCount) {
    if (length === 'quick' && book.pageCount < 350) { score += 2; reasons.push('Quick read') }
    else if (length === 'standard' && book.pageCount >= 350 && book.pageCount <= 480) { score += 2; reasons.push('Standard length') }
    else if (length === 'epic' && book.pageCount > 480) { score += 2; reasons.push('Epic length') }
  }

  return { score, reasons }
}

function maxPossibleScore(answers) {
  let max = 0
  max += 4 // mood always contributes (3 + up to 1)
  if (answers.spice) max += 3
  if (answers.trope) max += 4
  if (answers.vibe && answers.vibe !== 'any') max += 3
  if (answers.setting) max += 3
  if (answers.pov && answers.pov !== 'any') max += 2
  if (answers.length && answers.length !== 'any') max += 2
  return max || 1
}

function avoidedWarnings(answers) {
  const avoidOpt = QUESTIONS.find(q => q.id === 'avoid')
  const selected = answers.avoid || []
  const set = new Set()
  for (const val of selected) {
    const opt = avoidOpt.options.find(o => o.value === val)
    opt?.cw.forEach(c => set.add(c))
  }
  return set
}

function QuestionCard({ question, onAnswer, onBack, questionNum, total, initialSelection }) {
  const [multi, setMulti] = useState(initialSelection || [])

  const toggleMulti = (value) => {
    setMulti(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value])
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="font-heading text-xs tracking-[0.22em] uppercase text-zinc-500">
            Question {questionNum} of {total}
          </span>
          {questionNum > 1 && (
            <button
              onClick={onBack}
              className="font-heading text-xs tracking-[0.18em] uppercase text-zinc-500 hover:text-[var(--primary)] transition-colors cursor-pointer"
            >
              ← Back
            </button>
          )}
        </div>
        <div className="w-full h-1.5 bg-[rgba(255,255,255,0.08)] rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-500 rounded-full"
            style={{
              width: `${(questionNum / total) * 100}%`,
              background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
            }}
          />
        </div>
      </div>

      <h2 className="section-title text-2xl md:text-3xl mb-2 text-center">
        {question.question}
      </h2>
      {question.subtitle && (
        <p className="font-body text-zinc-400 text-sm text-center mb-8">{question.subtitle}</p>
      )}
      {!question.subtitle && <div className="mb-8" />}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {question.options.map((opt) => {
          const selected = question.multiSelect && multi.includes(opt.value)
          return (
            <button
              key={opt.value}
              onClick={() => question.multiSelect ? toggleMulti(opt.value) : onAnswer(question.id, opt.value)}
              className={`group app-panel rounded-2xl p-6 border transition-all duration-300 cursor-pointer text-left ${
                selected ? 'border-[var(--primary)]' : 'border-white/8 hover:border-white/20'
              }`}
              style={selected ? { boxShadow: '0 0 24px rgba(255, 46, 136, 0.25)' } : undefined}
            >
              <span className="text-2xl mb-2 block">{opt.icon}</span>
              <span className={`font-heading text-sm tracking-[0.18em] uppercase transition-colors ${
                selected ? 'text-[var(--primary)]' : 'text-white group-hover:text-[var(--primary)]'
              }`}>
                {opt.label}
              </span>
            </button>
          )
        })}
      </div>

      {question.multiSelect && (
        <div className="mt-8 text-center">
          <button
            onClick={() => onAnswer(question.id, multi)}
            className="booktok-button font-heading text-sm tracking-[0.22em] uppercase px-10 py-3 inline-block cursor-pointer"
          >
            {multi.length > 0 ? `See My Matches (avoiding ${multi.length})` : 'See My Matches'}
          </button>
        </div>
      )}
    </div>
  )
}

function MatchRing({ pct }) {
  const radius = 26
  const circ = 2 * Math.PI * radius
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" className="shrink-0">
      <circle cx="32" cy="32" r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="5" />
      <circle
        cx="32" cy="32" r={radius} fill="none" stroke="url(#matchGrad)" strokeWidth="5" strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={circ * (1 - pct / 100)} transform="rotate(-90 32 32)"
      />
      <defs>
        <linearGradient id="matchGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--secondary)" />
        </linearGradient>
      </defs>
      <text x="32" y="36" textAnchor="middle" className="fill-white font-heading" fontSize="15">{pct}%</text>
    </svg>
  )
}

function RecommendationResults({ results, onRetry }) {
  if (results.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <p className="text-4xl mb-4">🔍</p>
        <h2 className="section-title text-2xl md:text-3xl mb-3">No perfect match — yet</h2>
        <p className="font-body text-zinc-400 mb-8">
          Your filters ruled everything out. Try again and loosen up what you want to avoid.
        </p>
        <button onClick={onRetry} className="booktok-button font-heading text-sm tracking-[0.22em] uppercase px-10 py-3 cursor-pointer">
          Start Over
        </button>
      </div>
    )
  }

  const top = results[0]

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="section-title text-3xl md:text-4xl mb-2 text-center">
        Your Perfect Match
      </h2>
      <div className="divider-ornament mb-10">&#10022;</div>

      <div className="mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <p className="font-heading text-xs tracking-[0.24em] uppercase text-[var(--primary)]">
            #1 Recommendation
          </p>
        </div>
        <div className="app-panel overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <Link to={`/book/${top.book.id}`} className="block">
                <div className="aspect-[3/4]">
                  <SmartBookCover book={top.book} />
                </div>
              </Link>
            </div>

            <div className="md:w-2/3 p-6 md:p-8">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <Link to={`/book/${top.book.id}`}>
                    <h3 className="font-heading text-2xl text-white leading-tight hover:text-[var(--primary)] transition-colors">{top.book.title}</h3>
                  </Link>
                  <p className="font-body text-zinc-400 text-sm mt-1">by {top.book.author}</p>
                </div>
                <MatchRing pct={top.pct} />
              </div>

              <div className="mb-4">
                <SpiceRating level={top.book.spiceLevel} size="md" />
              </div>

              {top.reasons.length > 0 && (
                <div className="mb-5">
                  <p className="font-heading text-[0.65rem] tracking-[0.22em] uppercase text-zinc-500 mb-2">Why we picked this</p>
                  <div className="flex flex-wrap gap-2">
                    {top.reasons.map((r, i) => (
                      <span key={i} className="font-body text-xs text-white bg-[var(--primary)]/15 border border-[var(--primary)]/40 px-2.5 py-1 rounded-full capitalize">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <p className="font-body text-zinc-400 text-sm leading-relaxed line-clamp-3 mb-6">
                {top.book.synopsis?.slice(0, 260)}…
              </p>
              <Link
                to={`/book/${top.book.id}`}
                className="booktok-button font-heading text-sm tracking-[0.22em] uppercase px-6 py-2 inline-block"
              >
                View Book
              </Link>
            </div>
          </div>
        </div>
      </div>

      {results.length > 1 && (
        <div className="mb-12">
          <p className="font-heading text-xs tracking-[0.24em] uppercase text-zinc-500 mb-6 text-center">
            You might also love
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {results.slice(1, 5).map(({ book, pct }) => (
              <div key={book.id} className="relative">
                <span className="absolute top-2 right-2 z-10 font-heading text-[11px] tracking-wide px-2 py-0.5 rounded-full bg-black/60 border border-white/20 text-white backdrop-blur-sm">
                  {pct}%
                </span>
                <BookCard book={book} />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-center">
        <button
          onClick={onRetry}
          className="booktok-button font-heading text-sm tracking-[0.22em] uppercase px-10 py-3 transition-all cursor-pointer"
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

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  const recommendations = useMemo(() => {
    if (!showResults) return []

    const avoid = avoidedWarnings(answers)
    const max = maxPossibleScore(answers)

    const scored = activeBooks
      .filter(book => !book.contentWarnings?.some(cw => avoid.has(cw)))
      .map(book => {
        const { score, reasons } = scoreBook(book, answers)
        return { book, score, reasons, pct: Math.max(0, Math.min(100, Math.round((score / max) * 100))) }
      })
      .filter(s => s.score > 0)

    scored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      return Math.random() - 0.5
    })

    return scored.slice(0, 5)
  }, [showResults, answers, activeBooks])

  const handleRetry = () => {
    setCurrentStep(0)
    setAnswers({})
    setShowResults(false)
  }

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="glow-blob glow-blob-pink w-72 h-72 -top-20 -left-16" />
        <div className="glow-blob glow-blob-purple w-72 h-72 -bottom-24 -right-10" />
        <div className="relative z-10 text-center px-4">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.38em] text-[var(--primary)]">
            Personalized Matchmaker
          </p>
          <h1 className="font-heading gradient-text font-bold text-3xl md:text-5xl tracking-[0.12em] mb-3 pb-1">
            Find Your Next Read
          </h1>
          <p className="font-body text-zinc-400 text-lg italic">
            {showResults ? 'Here’s what we matched you with' : `${QUESTIONS.length} quick questions for your perfect book`}
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-8 pb-20">
        {!showResults ? (
          <QuestionCard
            key={currentStep}
            question={QUESTIONS[currentStep]}
            onAnswer={handleAnswer}
            onBack={handleBack}
            questionNum={currentStep + 1}
            total={QUESTIONS.length}
            initialSelection={answers[QUESTIONS[currentStep].id]}
          />
        ) : (
          <RecommendationResults results={recommendations} onRetry={handleRetry} />
        )}
      </section>
    </div>
  )
}
