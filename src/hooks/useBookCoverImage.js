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

function fetchGoogleBooks(queryText) {
  const query = encodeURIComponent(queryText)
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

function fetchGoogleBooksByIsbn(isbn) {
  return fetchGoogleBooks(`isbn:${isbn}`)
}

function fetchOpenLibraryByIsbn(isbn) {
  const clean = String(isbn || '').trim()
  if (!clean) return Promise.resolve(null)
  const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${encodeURIComponent(clean)}&format=json&jscmd=data`

  return fetch(url)
    .then(res => res.json())
    .then(data => {
      const key = `ISBN:${clean}`
      const cover = data?.[key]?.cover
      return cover?.large || cover?.medium || cover?.small || null
    })
    .catch(() => null)
}

export default function useBookCoverImage(book) {
  const [coverUrl, setCoverUrl] = useState(null)
  const [loading, setLoading] = useState(true)

  const title = book?.title
  const author = book?.author
  const providedCoverUrl = book?.coverUrl || null
  const isbn = book?.isbn || null

  useEffect(() => {
    if (providedCoverUrl) {
      setCoverUrl(providedCoverUrl)
      setLoading(false)
      return
    }

    if (!title || !author) {
      setLoading(false)
      return
    }

    const cacheKey = isbn ? `isbn:${isbn}` : `${title}::${author}`
    const cache = getCache()

    if (cache[cacheKey] !== undefined) {
      setCoverUrl(cache[cacheKey] || null)
      setLoading(false)
      return
    }

    let cancelled = false

    async function fetchCover() {
      let cover = null

      if (isbn) {
        cover = await fetchOpenLibraryByIsbn(isbn)
        if (!cover) {
          cover = await fetchGoogleBooksByIsbn(isbn)
        }
      }

      if (!cover) {
        cover = await fetchGoogleBooks(`intitle:${title} inauthor:${author}`)
      }

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
  }, [title, author, providedCoverUrl, isbn])

  return { coverUrl, loading }
}
