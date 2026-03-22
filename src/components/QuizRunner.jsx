import { useState } from 'react'

export default function QuizRunner({ questions, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [answers, setAnswers] = useState([])

  const question = questions[currentIndex]
  const total = questions.length
  const isLast = currentIndex === total - 1

  function handleSelect(optionIndex) {
    if (showFeedback) return
    setSelectedOption(optionIndex)
    setShowFeedback(true)
    setAnswers(prev => [
      ...prev,
      {
        questionIndex: currentIndex,
        selectedIndex: optionIndex,
        correctIndex: question.correctIndex,
        isCorrect: optionIndex === question.correctIndex,
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

      <div className="app-panel p-6 md:p-8 mb-6">
        <p className="font-body text-white text-xl leading-relaxed">
          {question.question}
        </p>
      </div>

      <div className="space-y-3 mb-8">
        {question.options.map((option, i) => {
          let optionStyle = 'border-white/8 hover:border-white/20 bg-[rgba(20,20,26,0.92)]'
          if (showFeedback) {
            if (i === question.correctIndex) {
              optionStyle = 'border-emerald-500/60 bg-emerald-500/10'
            } else if (i === selectedOption && i !== question.correctIndex) {
              optionStyle = 'border-[var(--primary)] bg-[rgba(255,46,136,0.12)]'
            } else {
              optionStyle = 'border-white/6 opacity-50'
            }
          } else if (selectedOption === i) {
            optionStyle = 'border-[var(--primary)] bg-[rgba(255,46,136,0.08)]'
          }

          const letter = String.fromCharCode(65 + i)

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
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
        <div className="space-y-4">
          {question.explanation && (
            <div className="app-panel p-4">
              <p className="font-body text-zinc-400 text-sm italic">
                {question.explanation}
              </p>
            </div>
          )}
          <button
            onClick={handleNext}
            className="booktok-button font-heading text-sm tracking-[0.22em] uppercase px-8 py-3 transition-all cursor-pointer"
          >
            {isLast ? 'See Results' : 'Next Question'}
          </button>
        </div>
      )}
    </div>
  )
}
