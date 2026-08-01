import { useCallback, useState } from 'react'

const STORAGE_KEY = 'smutbook_shelf_metadata_v1'

function loadMetadata() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function saveMetadata(metadata) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(metadata))
  } catch {
    // Device storage may be unavailable.
  }
}

export default function useShelfMetadata() {
  const [metadata, setMetadataState] = useState(loadMetadata)

  const updateBook = useCallback((bookId, patch) => {
    setMetadataState(current => {
      const next = {
        ...current,
        [bookId]: {
          status: 'want-to-read',
          note: '',
          rating: 0,
          ...current[bookId],
          ...patch,
        },
      }
      saveMetadata(next)
      return next
    })
  }, [])

  const replaceAll = useCallback(nextMetadata => {
    const safe = nextMetadata && typeof nextMetadata === 'object' ? nextMetadata : {}
    setMetadataState(safe)
    saveMetadata(safe)
  }, [])

  const clearAllMetadata = useCallback(() => {
    setMetadataState({})
    saveMetadata({})
  }, [])

  return { metadata, updateBook, replaceAll, clearAllMetadata }
}
