export function getAmazonSearchUrl(title, author) {
  const query = encodeURIComponent(`${title} ${author}`)
  return `https://www.amazon.com/s?k=${query}&i=stripbooks`
}

export function getGoodreadsSearchUrl(title, author) {
  const query = encodeURIComponent(`${title} ${author}`)
  return `https://www.goodreads.com/search?q=${query}`
}

// Prefer a verified direct link stored on the book; fall back to a search URL.
export function getAmazonUrl(book) {
  return book?.amazonUrl || getAmazonSearchUrl(book.title, book.author)
}

export function getGoodreadsUrl(book) {
  return book?.goodreadsUrl || getGoodreadsSearchUrl(book.title, book.author)
}
