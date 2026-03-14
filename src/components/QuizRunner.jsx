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
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="font-heading text-muted text-sm tracking-widest uppercase">
            Question {currentIndex + 1} of {total}
          </span>
          <span className="font-heading text-gold text-sm tracking-wider">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden">
          <div
            className="h-full bg-gold rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-surface rounded-lg border border-gold/10 p-6 md:p-8 mb-6">
        <p className="font-body text-text text-xl leading-relaxed">
          {question.question}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-8">
        {question.options.map((option, i) => {
          let optionStyle = 'border-gold/10 hover:border-gold/30'
          if (showFeedback) {
            if (i === question.correctIndex) {
              optionStyle = 'border-emerald-500/60 bg-emerald-900/20'
            } else if (i === selectedOption && i !== question.correctIndex) {
              optionStyle = 'border-blood bg-blood/15'
            } else {
              optionStyle = 'border-gold/5 opacity-50'
            }
          } else if (selectedOption === i) {
            optionStyle = 'border-gold'
          }

          const letter = String.fromCharCode(65 + i)

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={showFeedback}
              className={`
                w-full text-left bg-surface rounded-lg border-2 p-4 transition-all duration-200
                ${showFeedback ? 'cursor-default' : 'cursor-pointer'}
                ${optionStyle}
              `}
            >
              <span className="font-heading text-gold/60 text-sm mr-3">{letter}.</span>
              <span className="font-body text-text">{option}</span>
            </button>
          )
        })}
      </div>

      {/* Explanation + Next */}
      {showFeedback && (
        <div className="space-y-4">
          {question.explanation && (
            <div className="bg-surface/50 border border-gold/10 rounded-lg p-4">
              <p className="font-body text-muted text-sm italic">
                {question.explanation}
              </p>
            </div>
          )}
          <button
            onClick={handleNext}
            className="font-heading text-sm tracking-widest uppercase px-8 py-3 rounded border-2 border-gold text-gold hover:bg-gold/10 transition-all cursor-pointer"
          >
            {isLast ? 'See Results' : 'Next Question'}
          </button>
        </div>
      )}
    </div>
  )
}
