import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BookHeart,
  Check,
  Compass,
  RotateCcw,
  Share2,
  ShieldCheck,
  Sparkles,
  WandSparkles,
} from 'lucide-react'
import SmartBookCover from '../components/SmartBookCover'
import SpiceRating from '../components/SpiceRating'
import { allBooks } from '../data/books'
import { GENRE_THEMES } from '../data/constants'

const QUESTIONS = [
  {
    id: 'mood',
    eyebrow: 'Emotional weather',
    question: 'What should this book do to you?',
    subtitle: 'Start with the feeling you want after the final page.',
    options: [
      { label: 'Make me swoon', detail: 'Tender, hopeful, heart-forward', value: 'swoon', icon: '♡' },
      { label: 'Wreck me beautifully', detail: 'Angst, ache, emotional payoff', value: 'ache', icon: '☂' },
      { label: 'Keep me up all night', detail: 'Danger, obsession, no brakes', value: 'danger', icon: '♠' },
      { label: 'Take me somewhere else', detail: 'Magic, wonder, total escape', value: 'escape', icon: '✦' },
    ],
  },
  {
    id: 'world',
    eyebrow: 'Choose your portal',
    question: 'Where should the chemistry happen?',
    options: [
      { label: 'Modern life', detail: 'Cities, careers, real-world chaos', value: 'contemporary', icon: '◫' },
      { label: 'Fantasy realm', detail: 'Fae, courts, quests, prophecy', value: 'romantasy', icon: '♜' },
      { label: 'After dark', detail: 'Mafia, secrets, dangerous power', value: 'dark', icon: '◆' },
      { label: 'Supernatural', detail: 'Witches, shifters, monsters, ghosts', value: 'paranormal', icon: '☾' },
      { label: 'Game day', detail: 'Athletes, rivals, high stakes', value: 'sports', icon: '◉' },
      { label: 'Another era', detail: 'Ballrooms, scandal, candlelight', value: 'historical', icon: '♛' },
    ],
  },
  {
    id: 'spice',
    eyebrow: 'Set the temperature',
    question: 'How hot are we reading?',
    options: [
      { label: 'Soft glow', detail: 'Closed door or mostly tender', value: 'low', icon: '○' },
      { label: 'A little heat', detail: 'A few open-door moments', value: '3', icon: '◔' },
      { label: 'Very spicy', detail: 'Frequent, explicit chemistry', value: '4', icon: '◕' },
      { label: 'No fire extinguisher', detail: 'Maximum heat, please', value: '5', icon: '●' },
      { label: 'Surprise me', detail: 'Story first, any heat level', value: 'any', icon: '✺' },
    ],
  },
  {
    id: 'tropes',
    eyebrow: 'Build the fantasy',
    question: 'Choose up to three irresistible tropes.',
    subtitle: 'Your combination matters more than any single choice.',
    multiSelect: true,
    maxSelect: 3,
    options: [
      { label: 'Enemies to lovers', value: 'enemies-to-lovers', icon: '⚔' },
      { label: 'Forced proximity', value: 'forced-proximity', icon: '⌂' },
      { label: 'Fake dating', value: 'fake-dating', icon: '◇' },
      { label: 'Second chance', value: 'second-chance', icon: '↺' },
      { label: 'Grumpy / sunshine', value: 'grumpy-sunshine', icon: '☀' },
      { label: 'Forbidden love', value: 'forbidden-love', icon: '⊘' },
      { label: 'Fated mates', value: 'fated-mates', icon: '∞' },
      { label: 'Slow burn', value: 'slow-burn', icon: '⌛' },
      { label: 'Found family', value: 'found-family', icon: '⌘' },
    ],
  },
  {
    id: 'pace',
    eyebrow: 'Reading rhythm',
    question: 'How should the story move?',
    options: [
      { label: 'Immediate sparks', detail: 'Fast chemistry and quick momentum', value: 'fast', icon: '↯' },
      { label: 'Let it simmer', detail: 'Tension that earns every glance', value: 'slow', icon: '◌' },
      { label: 'Lose me in it', detail: 'Immersive world and layered plot', value: 'immersive', icon: '◎' },
      { label: 'Balanced', detail: 'A little tension, a little payoff', value: 'balanced', icon: '≈' },
    ],
  },
  {
    id: 'chemistry',
    eyebrow: 'The main attraction',
    question: 'What kind of chemistry gets you every time?',
    options: [
      { label: 'Weaponized banter', detail: 'Flirting disguised as combat', value: 'banter', icon: '“' },
      { label: 'Devotion and safety', detail: 'Softness, trust, acts of care', value: 'devotion', icon: '♥' },
      { label: 'Unhinged obsession', detail: 'Possessive, dangerous, intense', value: 'obsession', icon: '†' },
      { label: 'Yearning and restraint', detail: 'Almosts, longing, impossible odds', value: 'yearning', icon: '…' },
    ],
  },
  {
    id: 'discovery',
    eyebrow: 'Discovery mode',
    question: 'What kind of find sounds best?',
    options: [
      { label: 'Fresh for 2026', detail: 'Librarian and publisher picks', value: 'fresh', icon: '✧' },
      { label: 'Reader-ranked favorite', detail: 'Popular, proven, widely loved', value: 'popular', icon: '★' },
      { label: 'Hidden gem', detail: 'Less obvious, still a strong match', value: 'hidden', icon: '◈' },
      { label: 'Best match wins', detail: 'Ignore hype and follow the signal', value: 'any', icon: '⌁' },
    ],
  },
  {
    id: 'pov',
    eyebrow: 'Inside the story',
    question: 'Whose perspective pulls you closest?',
    options: [
      { label: 'Both leads', detail: 'Dual POV and mutual pining', value: 'dual-pov', icon: '⇄' },
      { label: 'Her perspective', detail: 'One intimate point of view', value: 'single-fmc', icon: 'Ⅰ' },
      { label: 'His perspective', detail: 'Live inside his side of the story', value: 'single-mmc', icon: 'Ⅱ' },
      { label: 'No preference', detail: 'Let the story decide', value: 'any', icon: '∴' },
    ],
  },
  {
    id: 'length',
    eyebrow: 'Time commitment',
    question: 'How much book do you want?',
    options: [
      { label: 'One-night read', detail: 'Under 350 pages', value: 'quick', icon: 'Ⅰ' },
      { label: 'Weekend obsession', detail: '350–480 pages', value: 'standard', icon: 'Ⅱ' },
      { label: 'Epic commitment', detail: 'More than 480 pages', value: 'epic', icon: 'Ⅲ' },
      { label: 'Any length', detail: 'I will make time for the right book', value: 'any', icon: '∞' },
    ],
  },
  {
    id: 'avoid',
    eyebrow: 'Protect the experience',
    question: 'Anything you want filtered out?',
    subtitle: 'Choose any hard limits. Books without reviewed warnings will be excluded when limits are active.',
    multiSelect: true,
    options: [
      { label: 'Cheating', value: 'cheating', warnings: ['cheating'], icon: '×' },
      { label: 'Dubious / non-consent', value: 'noncon', warnings: ['dubcon', 'noncon', 'sexual-assault'], icon: '!' },
      { label: 'Abuse / toxic dynamics', value: 'toxic', warnings: ['abuse', 'toxic-relationship'], icon: '!' },
      { label: 'Major death', value: 'death', warnings: ['death'], icon: '×' },
      { label: 'Kidnapping / captivity', value: 'captivity', warnings: ['kidnapping', 'trafficking'], icon: '!' },
      { label: 'No hard limits', value: 'none', warnings: [], icon: '✓', exclusive: true },
    ],
  },
]

const WORLD_GENRES = {
  contemporary: ['contemporary-romance', 'rom-com', 'new-adult'],
  romantasy: ['romantasy'],
  dark: ['dark-romance', 'mafia-romance', 'bully-romance'],
  paranormal: ['paranormal-romance'],
  sports: ['sports-romance'],
  historical: ['historical-romance'],
}

const LABELS = Object.fromEntries(
  QUESTIONS.flatMap(question => question.options.map(option => [option.value, option.label])),
)

function pushReason(reasons, label) {
  if (label && !reasons.includes(label)) reasons.push(label)
}

function scoreBook(book, answers) {
  let score = 0
  const reasons = []
  const genres = book.genres || []
  const themes = book.themes || []
  const add = (points, reason) => {
    score += points
    pushReason(reasons, reason)
  }

  const moodRules = {
    swoon: {
      genres: ['contemporary-romance', 'rom-com', 'sports-romance', 'historical-romance'],
      themes: ['friends-to-lovers', 'fake-dating', 'he-falls-first', 'found-family'],
      reason: 'Swoon-worthy',
    },
    ache: {
      genres: ['contemporary-romance', 'new-adult', 'romantasy'],
      themes: ['second-chance', 'forbidden-love', 'slow-burn'],
      reason: 'Emotional payoff',
    },
    danger: {
      genres: ['dark-romance', 'mafia-romance', 'romantic-suspense', 'bully-romance'],
      themes: ['morally-grey', 'possessive-hero', 'stalker', 'taboo'],
      reason: 'Dangerous energy',
    },
    escape: {
      genres: ['romantasy', 'paranormal-romance', 'historical-romance'],
      themes: ['fated-mates', 'secret-identity'],
      reason: 'Full escape',
    },
  }
  const mood = moodRules[answers.mood]
  if (mood) {
    if (genres.some(genre => mood.genres.includes(genre))) add(5, mood.reason)
    if (themes.some(theme => mood.themes.includes(theme))) add(2, mood.reason)
  }

  const preferredGenres = WORLD_GENRES[answers.world] || []
  if (genres.some(genre => preferredGenres.includes(genre))) {
    const matchedGenre = genres.find(genre => preferredGenres.includes(genre))
    add(7, GENRE_THEMES[matchedGenre]?.label || LABELS[answers.world])
  }

  if (answers.spice === 'low' && Number.isInteger(book.spiceLevel) && book.spiceLevel <= 2) add(5, 'Lower heat')
  if (['3', '4', '5'].includes(answers.spice) && Number.isInteger(book.spiceLevel)) {
    const target = Number(answers.spice)
    if (book.spiceLevel === target) add(6, `Spice level ${target}`)
    else if (Math.abs(book.spiceLevel - target) === 1) add(2, 'Close heat match')
  }

  for (const trope of answers.tropes || []) {
    if (themes.includes(trope)) add(5, LABELS[trope])
  }

  if (answers.pace === 'slow' && themes.includes('slow-burn')) add(4, 'Slow-burn tension')
  if (answers.pace === 'fast' && (genres.includes('rom-com') || genres.includes('romantic-suspense'))) add(3, 'Quick momentum')
  if (answers.pace === 'immersive' && (genres.includes('romantasy') || genres.includes('paranormal-romance') || (book.pageCount || 0) > 480)) add(4, 'Immersive world')
  if (answers.pace === 'balanced') add(1, 'Balanced pace')

  const chemistryRules = {
    banter: ['enemies-to-lovers', 'grumpy-sunshine', 'opposites-attract'],
    devotion: ['he-falls-first', 'friends-to-lovers', 'found-family'],
    obsession: ['possessive-hero', 'touch-her-and-die', 'stalker', 'morally-grey'],
    yearning: ['slow-burn', 'forbidden-love', 'second-chance', 'secret-relationship'],
  }
  if (themes.some(theme => (chemistryRules[answers.chemistry] || []).includes(theme))) {
    add(5, LABELS[answers.chemistry])
  }

  if (answers.discovery === 'fresh' && book.collections?.includes('fresh-romance-2026')) add(6, 'Fresh 2026 pick')
  if (answers.discovery === 'popular' && book.collections?.includes('reader-ranked-smut-100')) add(5, 'Reader-ranked favorite')
  if (answers.discovery === 'hidden' && !book.collections?.includes('reader-ranked-smut-100')) add(3, 'Off the obvious shelf')

  if (answers.pov !== 'any' && answers.pov && book.pov === answers.pov) add(3, LABELS[answers.pov])

  if (answers.length !== 'any' && book.pageCount) {
    if (answers.length === 'quick' && book.pageCount < 350) add(3, 'One-night read')
    if (answers.length === 'standard' && book.pageCount >= 350 && book.pageCount <= 480) add(3, 'Weekend length')
    if (answers.length === 'epic' && book.pageCount > 480) add(3, 'Epic length')
  }

  return { score, reasons: reasons.slice(0, 5) }
}

function getAvoidedWarnings(answers) {
  const selected = answers.avoid || []
  if (selected.includes('none')) return new Set()
  const warningQuestion = QUESTIONS.find(question => question.id === 'avoid')
  return new Set(
    selected.flatMap(value => warningQuestion.options.find(option => option.value === value)?.warnings || []),
  )
}

function getSignalChips(answers) {
  return Object.entries(answers)
    .filter(([id, value]) => id !== 'avoid' && value && value !== 'any')
    .flatMap(([, value]) => Array.isArray(value) ? value : [value])
    .map(value => LABELS[value])
    .filter(Boolean)
    .slice(0, 6)
}

function SignalOrb({ progress, answers, complete = false }) {
  const chips = getSignalChips(answers)
  return (
    <div className="signal-orb-wrap" aria-hidden="true">
      <div className={`signal-orb ${complete ? 'signal-orb-complete' : ''}`} style={{ '--signal-progress': `${progress * 360}deg` }}>
        <div className="signal-orb-core">
          <WandSparkles size={22} />
          <strong>{complete ? 'Matched' : `${Math.round(progress * 100)}%`}</strong>
          <span>reading signal</span>
        </div>
      </div>
      <div className="signal-chip-cloud">
        {chips.length ? chips.map(chip => <span key={chip}>{chip}</span>) : <span>Waiting for your first choice</span>}
      </div>
    </div>
  )
}

function QuestionCard({ question, value, onAnswer, onBack, step, total }) {
  const [selected, setSelected] = useState(Array.isArray(value) ? value : [])
  const isMulti = question.multiSelect

  const toggle = option => {
    if (option.exclusive) {
      setSelected(selected.includes(option.value) ? [] : [option.value])
      return
    }
    const withoutExclusive = selected.filter(item => item !== 'none')
    if (withoutExclusive.includes(option.value)) {
      setSelected(withoutExclusive.filter(item => item !== option.value))
    } else if (!question.maxSelect || withoutExclusive.length < question.maxSelect) {
      setSelected([...withoutExclusive, option.value])
    }
  }

  return (
    <div className="match-question-card">
      <div className="match-question-topline">
        <span>{question.eyebrow}</span>
        <span>{String(step + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
      </div>
      <h2>{question.question}</h2>
      <p>{question.subtitle || 'Choose the answer that feels true right now.'}</p>

      <div className={`match-options ${question.options.length > 4 ? 'match-options-dense' : ''}`}>
        {question.options.map(option => {
          const active = isMulti ? selected.includes(option.value) : value === option.value
          const disabled = isMulti && question.maxSelect && selected.length >= question.maxSelect && !active
          return (
            <button
              type="button"
              key={option.value}
              className={`match-option ${active ? 'is-active' : ''}`}
              disabled={disabled}
              aria-pressed={active}
              onClick={() => isMulti ? toggle(option) : onAnswer(question.id, option.value)}
            >
              <span className="match-option-symbol">{option.icon}</span>
              <span className="match-option-copy">
                <strong>{option.label}</strong>
                {option.detail && <small>{option.detail}</small>}
              </span>
              <span className="match-option-check">{active ? <Check size={14} /> : null}</span>
            </button>
          )
        })}
      </div>

      <div className="match-question-actions">
        <button type="button" className="match-back" onClick={onBack} disabled={step === 0}>
          <ArrowLeft size={16} /> Back
        </button>
        {isMulti && (
          <button type="button" className="match-continue" onClick={() => onAnswer(question.id, selected)}>
            {step === total - 1 ? 'Reveal my matches' : 'Continue'} <ArrowRight size={16} />
          </button>
        )}
        {!isMulti && (
          <button type="button" className="match-skip" onClick={() => onAnswer(question.id, 'any')}>
            Not sure — skip
          </button>
        )}
      </div>
    </div>
  )
}

function MatchScore({ score }) {
  return (
    <div className="match-score" style={{ '--match-score': `${score * 3.6}deg` }}>
      <span>{score}%</span>
    </div>
  )
}

function RecommendationResults({ results, answers, onRetry }) {
  const [shareLabel, setShareLabel] = useState('Share this match')
  if (!results.length) {
    return (
      <div className="match-empty">
        <Compass size={42} />
        <h2>Your signal is beautifully specific.</h2>
        <p>No reviewed book clears every hard limit yet. Try again with one fewer filter.</p>
        <button type="button" className="match-continue" onClick={onRetry}><RotateCcw size={16} /> Retune</button>
      </div>
    )
  }

  const [top, ...alternates] = results
  const shareResult = async () => {
    const url = `${window.location.origin}${window.location.pathname}#/book/${top.book.id}`
    const text = `My SMUTBOOK reading signal matched me with ${top.book.title} by ${top.book.author}.`
    try {
      if (navigator.share) await navigator.share({ title: 'My SMUTBOOK match', text, url })
      else await navigator.clipboard.writeText(`${text} ${url}`)
      setShareLabel(navigator.share ? 'Shared' : 'Copied')
    } catch {
      setShareLabel('Share this match')
    }
  }
  return (
    <div className="match-results">
      <div className="match-results-heading">
        <span><Sparkles size={15} /> Signal locked</span>
        <h2>Your next-book constellation</h2>
        <p>One strongest match, four alternate paths, and the exact signals that brought them forward.</p>
      </div>

      <div className="match-hero-card">
        <Link to={`/book/${top.book.id}`} className="match-hero-cover">
          <SmartBookCover book={top.book} />
          <span>#1 signal</span>
        </Link>
        <div className="match-hero-copy">
          <div className="match-hero-meta">
            <span>{top.book.collections?.includes('fresh-romance-2026') ? 'Fresh discovery' : 'Catalog favorite'}</span>
            <MatchScore score={top.pct} />
          </div>
          <h3>{top.book.title}</h3>
          <p className="match-author">by {top.book.author}</p>
          <SpiceRating level={top.book.spiceLevel} size="md" />
          <p className="match-synopsis">{top.book.synopsis}</p>
          <div className="match-reasons">
            {top.reasons.map(reason => <span key={reason}><Check size={12} /> {reason}</span>)}
          </div>
          <div className="match-hero-actions">
            <Link to={`/book/${top.book.id}`} className="match-continue">Open this book <ArrowRight size={16} /></Link>
            <button type="button" className="match-back" onClick={shareResult}><Share2 size={15} /> {shareLabel}</button>
            <button type="button" className="match-back" onClick={onRetry}><RotateCcw size={15} /> Retune signal</button>
          </div>
        </div>
      </div>

      <div className="match-alternates-heading">
        <div><BookHeart size={18} /><span>Four alternate paths</span></div>
        <p>Same reading mood, different flavor.</p>
      </div>
      <div className="match-alternates">
        {alternates.map((result, index) => (
          <Link key={result.book.id} to={`/book/${result.book.id}`} className="match-alt-card">
            <div className="match-alt-cover"><SmartBookCover book={result.book} /></div>
            <div className="match-alt-copy">
              <span>0{index + 2}</span>
              <strong>{result.book.title}</strong>
              <small>{result.book.author}</small>
              <div>{result.reasons.slice(0, 2).map(reason => <em key={reason}>{reason}</em>)}</div>
            </div>
            <MatchScore score={result.pct} />
          </Link>
        ))}
      </div>

      <div className="match-safety-note">
        <ShieldCheck size={18} />
        <p><strong>Your limits were respected.</strong> When you select hard limits, discovery records without reviewed warnings are withheld automatically.</p>
      </div>
    </div>
  )
}

export default function FindABook() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const progress = showResults ? 1 : step / QUESTIONS.length
  const activeBooks = useMemo(() => allBooks.filter(book => !book.comingSoon), [])

  const recommendations = useMemo(() => {
    if (!showResults) return []
    const avoided = getAvoidedWarnings(answers)
    const hasLimits = avoided.size > 0
    const scored = activeBooks
      .filter(book => {
        if (hasLimits && book.editorialStatus === 'needs-review') return false
        return !(book.contentWarnings || []).some(warning => avoided.has(warning))
      })
      .map(book => ({ book, ...scoreBook(book, answers) }))
      .filter(result => result.score > 0)
      .sort((a, b) => b.score - a.score || a.book.title.localeCompare(b.book.title))

    const best = scored[0]?.score || 1
    return scored.slice(0, 5).map(result => ({
      ...result,
      pct: Math.max(64, Math.min(98, Math.round(64 + (result.score / best) * 34))),
    }))
  }, [showResults, answers, activeBooks])

  const handleAnswer = (id, value) => {
    setAnswers(current => ({ ...current, [id]: value }))
    if (step === QUESTIONS.length - 1) setShowResults(true)
    else setStep(current => current + 1)
  }

  const restart = () => {
    setAnswers({})
    setStep(0)
    setShowResults(false)
  }

  return (
    <div className="matchmaker-page">
      <div className="matchmaker-aurora matchmaker-aurora-one" />
      <div className="matchmaker-aurora matchmaker-aurora-two" />

      <section className="matchmaker-shell">
        <aside className="matchmaker-aside">
          <div className="matchmaker-brand"><WandSparkles size={17} /> Paige's book alchemy</div>
          <h1>Find the book your mood is already asking for.</h1>
          <p>Ten choices become a reading signal. The catalog answers with five books and tells you why.</p>
          <SignalOrb progress={progress} answers={answers} complete={showResults} />
          <div className="matchmaker-trust">
            <ShieldCheck size={17} />
            <span>Hard-limit aware<br /><small>{allBooks.length} real books in the signal</small></span>
          </div>
        </aside>

        <div className="matchmaker-stage">
          {!showResults ? (
            <QuestionCard
              key={QUESTIONS[step].id}
              question={QUESTIONS[step]}
              value={answers[QUESTIONS[step].id]}
              onAnswer={handleAnswer}
              onBack={() => setStep(current => Math.max(0, current - 1))}
              step={step}
              total={QUESTIONS.length}
            />
          ) : (
            <RecommendationResults results={recommendations} answers={answers} onRetry={restart} />
          )}
        </div>
      </section>
    </div>
  )
}
