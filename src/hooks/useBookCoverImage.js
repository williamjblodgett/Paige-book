import { useState, useEffect } from 'react'

const CACHE_KEY = 'bookCoverCache'
const CACHE_VERSION = 2

function getCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    if (parsed._v !== CACHE_VERSION) return {}
    return parsed
  } catch {
    return {}
  }
}

function setCache(cache) {
  try {
    cache._v = CACHE_VERSION
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache))
  } catch {
    // localStorage full or unavailable
  }
}

function fetchGoogleBooks(title, author) {
  const query = encodeURIComponent(`intitle:${title} inauthor:${author}`)
  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=1`

  return fetch(url)
    .then(res => res.json())
    .then(data => {
      const imageLinks = data.items?.[0]?.volumeInfo?.imageLinks
      let cover = imageLinks?.thumbnail || imageLinks?.smallThumbnail || null
      if (cover) {
        cover = cover.replace('http://', 'https://')
        cover = cover.replace('zoom=1', 'zoom=2')
        cover = cover.replace('&edge=curl', '')
      }
      return cover
    })
    .catch(() => null)
}

function fetchOpenLibrary(title, author) {
  const params = new URLSearchParams({
    title,
    author,
    limit: '1',
    fields: 'cover_i',
  })
  const url = `https://openlibrary.org/search.json?${params}`

  return fetch(url)
    .then(res => res.json())
    .then(data => {
      const coverId = data.docs?.[0]?.cover_i
      if (coverId) {
        return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
      }
      return null
    })
    .catch(() => null)
}

export default function useBookCoverImage(title, author) {
  const [coverUrl, setCoverUrl] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!title || !author) {
      setLoading(false)
      return
    }

    const cacheKey = `${title}::${author}`
    const cache = getCache()

    if (cache[cacheKey] !== undefined) {
      setCoverUrl(cache[cacheKey] || null)
      setLoading(false)
      return
    }

    let cancelled = false

    async function fetchCover() {
      // Try Google Books first
      let cover = await fetchGoogleBooks(title, author)

      // Fallback to Open Library
      if (!cover) {
        cover = await fetchOpenLibrary(title, author)
      }

      if (cancelled) return

      setCoverUrl(cover)
      setLoading(false)

      const c = getCache()
      c[cacheKey] = cover || ''
      setCache(c)
    }

    fetchCover()

    return () => { cancelled = true }
  }, [title, author])

  return { coverUrl, loading }
}
