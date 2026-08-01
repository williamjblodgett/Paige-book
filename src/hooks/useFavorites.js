import { useState, useCallback } from 'react'

const STORAGE_KEY = 'smutpages_favorites'

function loadFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveFavorites(ids) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  } catch {
    // localStorage full or unavailable
  }
}

export default function useFavorites() {
  const [favorites, setFavorites] = useState(loadFavorites)

  const toggleFavorite = useCallback((bookId) => {
    setFavorites(prev => {
      const next = prev.includes(bookId)
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
      saveFavorites(next)
      return next
    })
  }, [])

  const isFavorite = useCallback((bookId) => {
    return favorites.includes(bookId)
  }, [favorites])

  const clearAll = useCallback(() => {
    setFavorites([])
    saveFavorites([])
  }, [])

  const replaceAll = useCallback((ids) => {
    const next = Array.isArray(ids) ? [...new Set(ids.filter(id => typeof id === 'string'))] : []
    setFavorites(next)
    saveFavorites(next)
  }, [])

  return { favorites, toggleFavorite, isFavorite, clearAll, replaceAll }
}
