import { useState, useCallback } from 'react'

const STORAGE_KEY = 'smutpages_quiz_scores'

function loadScores() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveScores(scores) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores))
  } catch {
    // localStorage full or unavailable
  }
}

export default function useQuizScores() {
  const [scores, setScores] = useState(loadScores)

  const recordResult = useCallback((bookId, correct, total) => {
    setScores(prev => {
      const existing = prev[bookId]
      const next = {
        ...prev,
        [bookId]: {
          best: existing ? Math.max(existing.best, correct) : correct,
          total,
          attempts: (existing?.attempts || 0) + 1,
          lastPlayed: Date.now(),
        },
      }
      saveScores(next)
      return next
    })
  }, [])

  const getScore = useCallback((bookId) => scores[bookId] || null, [scores])

  return { scores, recordResult, getScore }
}
