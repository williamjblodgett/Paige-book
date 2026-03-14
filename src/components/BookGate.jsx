import { useState } from 'react'
import { bookTheme } from '../data/bookTheme'

const BOOKS = [
  { id: 'Anathema', number: 1 },
  { id: 'Eldritch', number: 2 },
  { id: 'Vasmora', number: 3 },
]

export default function BookGate({ selectionMode, onConfirm, title, description }) {
  const [selected, setSelected] = useState(new Set())
  const [confirmingBook, setConfirmingBook] = useState(null)

  const isMulti = selectionMode === 'multi'

  function handleToggle(bookId) {
    if (isMulti) {
      setSelected(prev => {
        const next = new Set(prev)
        if (next.has(bookId)) {
          next.delete(bookId)
        } else {
          next.add(bookId)
        }
        return next
      })
    } else {
      setConfirmingBook(bookId)
    }
  }

  function handleConfirmMulti() {
    if (selected.size > 0) {
      onConfirm(Array.from(selected))
    }
  }

  function handleConfirmSingle() {
    if (confirmingBook) {
      onConfirm(confirmingBook)
      setConfirmingBook(null)
    }
  }

  function getBookStyles(bookId, isSelected) {
    const theme = bookTheme[bookId]
    if (isSelected) {
      return {
        borderColor: theme.accent,
        boxShadow: theme.glow,
      }
    }
    return {}
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <h2 className="font-heading text-gold text-3xl md:text-4xl mb-4 tracking-wide">
          {title}
        </h2>
        <p className="font-body text-muted text-lg mb-10 max-w-lg mx-auto">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          {BOOKS.map(({ id, number }) => {
            const theme = bookTheme[id]
            const isSelected = selected.has(id)

            return (
              <button
                key={id}
                onClick={() => handleToggle(id)}
                className="w-full sm:w-48 bg-surface rounded-lg p-6 transition-all duration-300 cursor-pointer border-2 flex flex-col items-center gap-3 border-gold/10 hover:border-gold/40"
                style={getBookStyles(id, isSelected)}
              >
                {/* Lock / Unlock icon */}
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="transition-colors"
                  style={{ color: isSelected ? theme.accent : undefined }}
                >
                  {isSelected ? (
                    <>
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0" />
                    </>
                  ) : (
                    <>
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </>
                  )}
                </svg>

                <span className="font-heading text-sm tracking-widest uppercase text-muted">
                  Book {number}
                </span>
                <span
                  className="font-heading text-lg tracking-wider"
                  style={{ color: isSelected ? theme.accent : undefined }}
                >
                  {id}
                </span>
              </button>
            )
          })}
        </div>

        {isMulti && (
          <button
            onClick={handleConfirmMulti}
            disabled={selected.size === 0}
            className={`
              font-heading text-sm tracking-widest uppercase px-10 py-3 rounded border-2 transition-all duration-300
              ${selected.size > 0
                ? 'border-gold text-gold hover:bg-gold/10 cursor-pointer'
                : 'border-gold/20 text-gold/20 cursor-not-allowed'
              }
            `}
          >
            Continue
          </button>
        )}
      </div>

      {/* Single-select confirmation modal */}
      {!isMulti && confirmingBook && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center px-4">
          <div
            className="bg-surface rounded-lg p-8 max-w-md w-full text-center border"
            style={{ borderColor: bookTheme[confirmingBook]?.accent + '33' }}
          >
            <h3
              className="font-heading text-xl mb-4 tracking-wide"
              style={{ color: bookTheme[confirmingBook]?.accent }}
            >
              Spoiler Warning
            </h3>
            <p className="font-body text-text mb-8 text-lg">
              You are about to view content for{' '}
              <span className="italic" style={{ color: bookTheme[confirmingBook]?.accent }}>
                {confirmingBook}
              </span>.
              This contains spoilers for this book only. Continue?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setConfirmingBook(null)}
                className="font-heading text-sm tracking-widest uppercase px-6 py-2 rounded border border-muted/30 text-muted hover:text-text hover:border-muted transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSingle}
                className="font-heading text-sm tracking-widest uppercase px-6 py-2 rounded border-2 transition-all cursor-pointer hover:opacity-80"
                style={{
                  borderColor: bookTheme[confirmingBook]?.accent,
                  color: bookTheme[confirmingBook]?.accent,
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
