export function getAmazonSearchUrl(title, author) {
  const query = encodeURIComponent(`${title} ${author}`)
  return `https://www.amazon.com/s?k=${query}&i=stripbooks`
}

export function getGoodreadsSearchUrl(title, author) {
  const query = encodeURIComponent(`${title} ${author}`)
  return `https://www.goodreads.com/search?q=${query}`
}
