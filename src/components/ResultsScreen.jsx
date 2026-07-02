import { useEffect, useMemo, useState } from 'react'

const CONFETTI_COLORS = ['#ff2e88', '#9b5cff', '#c9a84c', '#34d399', '#f0c4d4']

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
        duration: 2.2 + Math.random() * 1.6,
        size: 6 + Math.random() * 6,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        rotate: Math.random() * 360,
      })),
    []
  )

  return (
    <div className="confetti-container" aria-hidden="true">
      {pieces.map(p => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.45,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
    </div>
  )
}

function ScoreRing({ pct }) {
  const [offset, setOffset] = useState(1)
  const radius = 84
  const circumference = 2 * Math.PI * radius

  useEffect(() => {
    const t = requestAnimationFrame(() => setOffset(1 - pct / 100))
    return () => cancelAnimationFrame(t)
  }, [pct])

  return (
    <svg width="200" height="200" viewBox="0 0 200 200" className="mx-auto block" role="img" aria-label={`Score ${pct}%`}>
      <circle cx="100" cy="100" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
      <circle
        cx="100"
        cy="100"
        r={radius}
        fill="none"
        stroke="url(#scoreGradient)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * offset}
        transform="rotate(-90 100 100)"
        style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1)' }}
      />
      <defs>
        <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--secondary)" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function ResultsScreen({ results, questions, bookTitle, onRetry, onRetryMissed }) {
  const correct = results.filter(r => r.isCorrect).length
  const total = results.length
  const pct = Math.round((correct / total) * 100)
  const missedCount = total - correct
  const [copied, setCopied] = useState(false)

  let message
  if (pct === 100) message = 'Absolute book boyfriend material.'
  else if (pct >= 80) message = 'You clearly dog-eared the good pages.'
  else if (pct >= 60) message = 'Not bad — you were paying attention between the spicy scenes.'
  else if (pct >= 40) message = 'Maybe a re-read is in order... for research purposes.'
  else message = 'Were you even reading or just skipping to the smut?'

  async function handleShare() {
    const text = `I scored ${correct}/${total} on the ${bookTitle} quiz on SMUTBOOK 🌶️`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard unavailable (e.g. insecure context) — show the text instead
      window.prompt('Copy your score:', text)
    }
  }

  return (
    <div className="max-w-2xl mx-auto text-center relative">
      {pct >= 80 && <Confetti />}

      <h2 className="section-title text-3xl md:text-4xl mb-2">
        Results
      </h2>
      <div className="divider-ornament mb-8">&#10022;</div>

      <div className="app-panel p-8 mb-6 relative">
        <div className="relative w-[200px] h-[200px] mx-auto mb-4">
          <ScoreRing pct={pct} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="font-heading text-[var(--primary)] text-5xl leading-none">
              {correct}<span className="text-zinc-500 text-2xl">/{total}</span>
            </p>
            <p className="font-heading text-zinc-500 text-sm tracking-[0.18em] mt-1 uppercase">
              {pct}%
            </p>
          </div>
        </div>
        <p className="font-body text-white italic text-lg">
          {message}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <button
          onClick={onRetry}
          className="booktok-button font-heading text-sm tracking-[0.22em] uppercase px-8 py-3 transition-all cursor-pointer"
        >
          Try Again
        </button>
        {missedCount > 0 && onRetryMissed && (
          <button
            onClick={onRetryMissed}
            className="font-heading text-sm tracking-[0.22em] uppercase px-8 py-3 rounded-full border border-white/20 text-white hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all cursor-pointer"
          >
            Retake {missedCount} Missed
          </button>
        )}
        <button
          onClick={handleShare}
          className="font-heading text-sm tracking-[0.22em] uppercase px-8 py-3 rounded-full border border-white/20 text-white hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all cursor-pointer"
        >
          {copied ? 'Copied! ✓' : 'Share Score'}
        </button>
      </div>

      <div className="app-panel p-6 mb-8 text-left">
        <h3 className="font-heading text-white text-lg tracking-[0.2em] uppercase mb-4">
          Question Breakdown
        </h3>
        <div className="space-y-3">
          {results.map((result, i) => {
            const q = questions[result.questionIndex]
            return (
              <div
                key={i}
                className={`border-l-2 pl-4 py-2 ${
                  result.isCorrect ? 'border-emerald-500/60 bg-emerald-500/5' : 'border-[var(--primary)] bg-[rgba(255,46,136,0.06)]'
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className={`shrink-0 text-sm mt-0.5 ${result.isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                    {result.isCorrect ? '✓' : '✗'}
                  </span>
                  <div>
                    <p className="font-body text-white text-sm mb-1">
                      {q.question}
                    </p>
                    {!result.isCorrect && (
                      <p className="font-body text-zinc-400 text-xs">
                        Your answer: {q.options[result.selectedIndex]}
                        <span className="mx-2">|</span>
                        Correct: <span className="text-emerald-400">{q.options[result.correctIndex]}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
