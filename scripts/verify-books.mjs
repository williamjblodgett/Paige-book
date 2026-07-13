// Cross-references book data files against research/verification-db.json.
// Every field recorded in the DB must exactly match the shipped book file.
// Usage: node scripts/verify-books.mjs

import { readFileSync } from 'fs'
import { allBooks } from '../src/data/books/index.js'

const db = JSON.parse(readFileSync(new URL('../research/verification-db.json', import.meta.url), 'utf8'))

const CHECKED_FIELDS = ['title', 'author', 'series', 'publicationYear', 'pageCount', 'isbn', 'goodreadsUrl', 'amazonUrl']

let errors = []
let checked = 0

// 1. Every DB entry must exist in the catalog and match field-for-field
for (const entry of db.books) {
  const book = allBooks.find(b => b.id === entry.id)
  if (!book) {
    errors.push(`DB entry '${entry.id}' has no matching book file in the catalog`)
    continue
  }
  checked++
  for (const field of CHECKED_FIELDS) {
    if (entry[field] === undefined) continue // not recorded in DB -> not enforced
    if (book[field] !== entry[field]) {
      errors.push(`'${entry.id}'.${field}: file has ${JSON.stringify(book[field])}, DB says ${JSON.stringify(entry[field])}`)
    }
  }
  if (!entry.sources || entry.sources.length === 0) {
    errors.push(`DB entry '${entry.id}' has no verification sources recorded`)
  }
}

// 2. Whole-catalog sanity checks
const ids = new Set()
for (const b of allBooks) {
  if (ids.has(b.id)) errors.push(`duplicate book id: ${b.id}`)
  ids.add(b.id)
  if (!b.title || !b.author) errors.push(`${b.id}: missing title/author`)
  for (const q of b.quiz || []) {
    if (!Array.isArray(q.options) || q.options.length !== 4) errors.push(`${b.id} quiz q${q.id}: needs exactly 4 options`)
    if (typeof q.correctIndex !== 'number' || q.correctIndex < 0 || q.correctIndex > 3) errors.push(`${b.id} quiz q${q.id}: bad correctIndex`)
  }
}

console.log(`Catalog size: ${allBooks.length}`)
console.log(`DB entries cross-referenced: ${checked}/${db.books.length}`)
if (errors.length) {
  console.error(`\n${errors.length} MISMATCH(ES):`)
  for (const e of errors) console.error('  ✗ ' + e)
  process.exit(1)
}
console.log('✓ All verified books match the verification DB. All quizzes well-formed.')
