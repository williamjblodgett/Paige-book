import { writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs'
import { join } from 'path'

const BASE = 'src/data/books'

// Existing book IDs to skip
const existing = new Set()
for (const folder of readdirSync(BASE)) {
  const fp = join(BASE, folder)
  try {
    const files = readdirSync(fp)
    for (const f of files) {
      if (f !== 'index.js' && f.endsWith('.js')) {
        existing.add(f.replace('.js', ''))
      }
    }
  } catch {}
}

function toId(title) {
  return title.toLowerCase().replace(/[''&:!?,.\-()]/g, '').replace(/\s+/g, '-').replace(/^-|-$/g, '').replace(/-+/g, '-')
}

const gradients = {
  'contemporary': [['#1a1520','#2a2035'],['#1c1825','#261d30'],['#201a28','#2d2238'],['#18131f','#241e2e']],
  'dark-romance': [['#1a0a15','#2a1020'],['#150812','#25101e'],['#1c0b18','#2c1225'],['#180a14','#280f1f']],
  'romantasy': [['#0a1520','#152535'],['#0c1825','#18283a'],['#0e1a28','#1a2a3d'],['#08121c','#142232']],
  'sports-romance': [['#0a1510','#152820'],['#0c1812','#182a1e'],['#0e1a15','#1a2c22'],['#08120e','#14221a']],
  'mafia': [['#151010','#252020'],['#181212','#282222'],['#1a1414','#2a2424'],['#120e0e','#221e1e']],
  'erotic': [['#1a1015','#2a2025'],['#1c1218','#2c2228'],['#1e141a','#2e242a'],['#180e13','#281e23']],
  'paranormal': [['#100a1a','#201528'],['#120c1c','#22172a'],['#140e1e','#24192c'],['#0e0818','#1e1326']],
}

const accents = {
  'contemporary': ['#d4a574','#c9a84c','#b89466','#d4b896','#c4956a','#deb887'],
  'dark-romance': ['#8b1a4a','#9b2050','#7a1545','#a52555','#6b1040','#8b2252'],
  'romantasy': ['#7eb8da','#6aa8cc','#8ec4e4','#5c98bc','#7ab4d6','#68a4c8'],
  'sports-romance': ['#5a9e6f','#4d8e62','#68ac7d','#3e7e52','#5c9f70','#508f64'],
  'mafia': ['#c0392b','#a83226','#d44234','#962b20','#b53528','#a43024'],
  'erotic': ['#c97b84','#b56d76','#d78890','#a36068','#cb7d86','#b76f78'],
  'paranormal': ['#9b6dcc','#8a5ebc','#ac7edc','#7a4fac','#9d6fce','#8c60be'],
}

let idx = 0
function writeBook(b) {
  let id = b.id || toId(b.title)
  // Avoid collision with existing books
  if (existing.has(id)) {
    id = id + '-2'
  }
  if (existing.has(id)) return // skip if still collides

  const folder = b._folder
  const gi = idx % gradients[folder].length
  const ai = idx % accents[folder].length
  idx++

  const obj = {
    id,
    title: b.title,
    author: b.author,
    ...(b.series ? { series: b.series } : {}),
    genres: b.genres,
    themes: b.themes,
    spiceLevel: b.spice,
    coverGradient: gradients[folder][gi],
    accentColor: accents[folder][ai],
    pov: b.pov || 'dual-pov',
    pageCount: b.pages,
    publicationYear: b.year,
    standalone: !b.series,
    contentWarnings: b.cw || [],
    synopsis: b.synopsis,
    characters: b.characters,
    terms: b.terms || [],
    quiz: b.quiz.map((q, i) => ({
      id: i + 1,
      question: q[0],
      options: q[1],
      correctIndex: q[2],
      explanation: q[3]
    }))
  }

  const dir = join(BASE, folder)
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, `${id}.js`), `export default ${JSON.stringify(obj, null, 2)};\n`)
  return { id, folder, varName: 'book_' + id.replace(/-/g, '_') }
}

// Load book data from batch files
const batchFiles = process.argv.slice(2)
if (batchFiles.length === 0) {
  console.log('Usage: node gen.mjs batch1.mjs batch2.mjs ...')
  console.log('Or: node gen.mjs --all')
  process.exit(1)
}

let allNewBooks = []

if (batchFiles[0] === '--all') {
  // Find all batch files
  const batches = readdirSync('.').filter(f => f.startsWith('batch-') && f.endsWith('.mjs')).sort()
  for (const batch of batches) {
    const mod = await import('./' + batch)
    const booksData = mod.default
    for (const b of booksData) {
      const result = writeBook(b)
      if (result) allNewBooks.push(result)
    }
  }
} else {
  for (const batch of batchFiles) {
    const mod = await import('./' + batch)
    const booksData = mod.default
    for (const b of booksData) {
      const result = writeBook(b)
      if (result) allNewBooks.push(result)
    }
  }
}

console.log(`Wrote ${allNewBooks.length} new book files`)

// Output import lines and array entries for index.js
const importLines = allNewBooks.map(b => `import ${b.varName} from './${b.folder}/${b.id}.js'`).join('\n')
const arrayEntries = allNewBooks.map(b => `  ${b.varName},`).join('\n')

writeFileSync('/tmp/new_imports.txt', importLines)
writeFileSync('/tmp/new_entries.txt', arrayEntries)
console.log('Import/entry data written to /tmp/new_imports.txt and /tmp/new_entries.txt')
