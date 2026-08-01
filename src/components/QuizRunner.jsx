import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function shuffled(array) {
  const next = [...array]
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[next[i], next[j]] = [next[j], next[i]]
  }
  return next
}

export default function QuizRunner({ questions, onComplete, showExplanations = true }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [answers, setAnswers] = useState([])

  // Per-attempt shuffled display order for each question's options
  const optionOrders = useMemo(
    () => questions.map(q => shuffled(q.options.map((_, i) => i))),
    [questions]
  )

  const question = questions[currentIndex]
  const order = optionOrders[currentIndex]
  const total = questions.length
  const isLast = currentIndex === total - 1

  function handleSelect(originalIndex) {
    if (showFeedback) return
    setSelectedOption(originalIndex)
    setShowFeedback(true)
    setAnswers(prev => [
      ...prev,
      {
        questionIndex: currentIndex,
        selectedIndex: originalIndex,
        correctIndex: question.correctIndex,
        isCorrect: originalIndex === question.correctIndex,
      }
    ])
  }

  function handleNext() {
    if (isLast) {
      onComplete(answers)
    } else {
      setCurrentIndex(prev => prev + 1)
      setSelectedOption(null)
      setShowFeedback(false)
    }
  }

  // Keyboard play: A-D / 1-4 to answer, Enter to advance
  useEffect(() => {
    function onKeyDown(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if (showFeedback && e.key === 'Enter') {
        e.preventDefault()
        handleNext()
        return
      }
      if (!showFeedback) {
        let displayIndex = -1
        const upper = e.key.toUpperCase()
        if (upper >= 'A' && upper <= 'D') displayIndex = upper.charCodeAt(0) - 65
        else if (e.key >= '1' && e.key <= '4') displayIndex = Number(e.key) - 1
        if (displayIndex >= 0 && displayIndex < order.length) {
          e.preventDefault()
          handleSelect(order[displayIndex])
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })

  const progress = ((currentIndex + 1) / total) * 100

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="font-heading text-zinc-500 text-sm tracking-[0.22em] uppercase">
            Question {currentIndex + 1} of {total}
          </span>
          <span className="font-heading text-white text-sm tracking-[0.18em]">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full h-1.5 bg-[rgba(255,255,255,0.08)] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
            }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25 }}
        >
          <div className="app-panel p-6 md:p-8 mb-6">
            {question.sourceTitle && (
              <p className="font-heading text-[var(--primary)] text-xs tracking-[0.2em] uppercase mb-3">
                {question.sourceTitle}
              </p>
            )}
            <p className="font-body text-white text-xl leading-relaxed">
              {question.question}
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {order.map((originalIndex, displayIndex) => {
              const option = question.options[originalIndex]
              let optionStyle = 'border-white/8 hover:border-white/20 bg-[rgba(20,20,26,0.92)]'
              if (showFeedback) {
                if (originalIndex === question.correctIndex) {
                  optionStyle = 'border-emerald-500/60 bg-emerald-500/10'
                } else if (originalIndex === selectedOption) {
                  optionStyle = 'border-[var(--primary)] bg-[rgba(255,46,136,0.12)]'
                } else {
                  optionStyle = 'border-white/6 opacity-50'
                }
              } else if (selectedOption === originalIndex) {
                optionStyle = 'border-[var(--primary)] bg-[rgba(255,46,136,0.08)]'
              }

              const letter = String.fromCharCode(65 + displayIndex)

              return (
                <button
                  key={originalIndex}
                  onClick={() => handleSelect(originalIndex)}
                  disabled={showFeedback}
                  className={`
                    w-full text-left rounded-2xl border p-4 transition-all duration-200
                    ${showFeedback ? 'cursor-default' : 'cursor-pointer'}
                    ${optionStyle}
                  `}
                >
                  <span className="font-heading text-[var(--primary)] text-sm mr-3">{letter}.</span>
                  <span className="font-body text-white">{option}</span>
                </button>
              )
            })}
          </div>

          {showFeedback && (
            <motion.div
              className="space-y-4"
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {showExplanations && question.explanation && (
                <div className="app-panel p-4">
                  <p className="font-body text-zinc-400 text-sm italic">
                    {question.explanation}
                  </p>
                </div>
              )}
              <div className="flex items-center gap-4">
                <button
                  onClick={handleNext}
                  className="booktok-button font-heading text-sm tracking-[0.22em] uppercase px-8 py-3 transition-all cursor-pointer"
                >
                  {isLast ? 'See Results' : 'Next Question'}
                </button>
                <span className="font-body text-zinc-600 text-xs hidden sm:inline">
                  press Enter ↵
                </span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {!showFeedback && (
        <p className="font-body text-zinc-600 text-xs text-center hidden sm:block">
          Tip: answer with the A–D keys
        </p>
      )}
    </div>
  )
}
