export default function ResultsScreen({ results, questions, onRetry }) {
  const correct = results.filter(r => r.isCorrect).length
  const total = results.length
  const pct = Math.round((correct / total) * 100)

  let message
  if (pct === 100) message = 'Absolute book boyfriend material.'
  else if (pct >= 80) message = 'You clearly dog-eared the good pages.'
  else if (pct >= 60) message = 'Not bad — you were paying attention between the spicy scenes.'
  else if (pct >= 40) message = 'Maybe a re-read is in order... for research purposes.'
  else message = 'Were you even reading or just skipping to the smut?'

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="font-heading text-gold text-3xl md:text-4xl tracking-wider mb-2">
        Results
      </h2>
      <div className="divider-ornament mb-8">&#10022;</div>

      {/* Score */}
      <div className="bg-surface rounded-lg border border-gold/20 p-8 mb-6">
        <p className="font-heading text-gold text-6xl md:text-7xl mb-2">
          {correct}<span className="text-muted text-4xl">/{total}</span>
        </p>
        <p className="font-heading text-muted text-lg tracking-wider mb-1">
          {pct}%
        </p>
        <p className="font-body text-text italic text-lg">
          {message}
        </p>
      </div>

      {/* Breakdown */}
      <div className="bg-surface rounded-lg border border-gold/10 p-6 mb-8 text-left">
        <h3 className="font-heading text-text text-lg tracking-wider mb-4">
          Question Breakdown
        </h3>
        <div className="space-y-3">
          {results.map((result, i) => {
            const q = questions[result.questionIndex]
            return (
              <div
                key={i}
                className={`border-l-2 pl-4 py-2 ${
                  result.isCorrect ? 'border-emerald-500/60' : 'border-blood'
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className={`shrink-0 text-sm mt-0.5 ${result.isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                    {result.isCorrect ? '\u2713' : '\u2717'}
                  </span>
                  <div>
                    <p className="font-body text-text text-sm mb-1">
                      {q.question}
                    </p>
                    {!result.isCorrect && (
                      <p className="font-body text-muted text-xs">
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

      <button
        onClick={onRetry}
        className="font-heading text-sm tracking-widest uppercase px-10 py-3 rounded border-2 border-gold text-gold hover:bg-gold/10 transition-all cursor-pointer"
      >
        Try Again
      </button>
    </div>
  )
}
