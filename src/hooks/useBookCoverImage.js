import { useState, useEffect } from 'react'

const CACHE_KEY = 'bookCoverCache'
const CACHE_VERSION = 1

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
    const query = encodeURIComponent(`intitle:${title} inauthor:${author}`)
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=1`

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (cancelled) return
        const imageLinks = data.items?.[0]?.volumeInfo?.imageLinks
        let cover = imageLinks?.thumbnail || imageLinks?.smallThumbnail || null
        if (cover) {
          // Upgrade to larger image and use HTTPS
          cover = cover.replace('http://', 'https://')
          cover = cover.replace('zoom=1', 'zoom=2')
          cover = cover.replace('&edge=curl', '')
        }
        setCoverUrl(cover)
        setLoading(false)
        const c = getCache()
        c[cacheKey] = cover || ''
        setCache(c)
      })
      .catch(() => {
        if (!cancelled) {
          setCoverUrl(null)
          setLoading(false)
        }
      })

    return () => { cancelled = true }
  }, [title, author])

  return { coverUrl, loading }
}
