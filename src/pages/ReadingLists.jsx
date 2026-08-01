import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { allBooks } from '../data/books'
import SmartBookCover from '../components/SmartBookCover'

const READING_LISTS = [
  {
    id: 'fresh-romance-2026',
    title: 'Fresh Romance Discoveries',
    description: 'New librarian, publisher, and award picks added from trusted 2026 sources.',
    emoji: '✨',
    filter: (b) => b.collections?.includes('fresh-romance-2026'),
  },
  {
    id: 'reader-ranked-smut-100',
    title: 'Reader-Ranked Smut Top 100',
    description: 'The Goodreads community-ranked top 100, cross-checked against Amazon Romance Best Sellers. New discoveries are marked for Paige\'s review.',
    emoji: '🔥',
    filter: (b) => b.collections?.includes('reader-ranked-smut-100'),
    sort: (a, b) => (a.popularity?.smutRank ?? 999) - (b.popularity?.smutRank ?? 999),
  },
  {
    id: 'darkest-reads',
    title: 'The Darkest Reads',
    description: 'For when you want morally grey heroes, obsessive love, and lines that get crossed.',
    emoji: '🖤',
    filter: (b) => b.genres.includes('dark-romance') && b.spiceLevel >= 4,
    sort: (a, b) => b.spiceLevel - a.spiceLevel,
  },
  {
    id: 'enemies-to-lovers',
    title: 'Enemies to Lovers',
    description: 'They hate each other. Until they don\'t. The tension is everything.',
    emoji: '⚔️',
    filter: (b) => b.themes?.includes('enemies-to-lovers'),
  },
  {
    id: 'spice-level-max',
    title: 'Maximum Spice',
    description: 'Inferno-level heat. You\'ve been warned.',
    emoji: '🌶️',
    filter: (b) => b.spiceLevel === 5,
  },
  {
    id: 'slow-burn',
    title: 'Slow Burn Perfection',
    description: 'The anticipation is the best part. Pages of tension before they finally give in.',
    emoji: '🔥',
    filter: (b) => b.themes?.includes('slow-burn'),
  },
  {
    id: 'grumpy-sunshine',
    title: 'Grumpy Meets Sunshine',
    description: 'He scowls. She smiles. Reader melts.',
    emoji: '☀️',
    filter: (b) => b.themes?.includes('grumpy-sunshine'),
  },
  {
    id: 'possessive-alphas',
    title: 'Possessive & Protective',
    description: '"Touch her and die" energy. For when you want an unhinged hero who worships the ground she walks on.',
    emoji: '🐺',
    filter: (b) => b.themes?.some(t => ['possessive-hero', 'touch-her-and-die', 'alpha-male'].includes(t)),
  },
  {
    id: 'forbidden',
    title: 'Forbidden Love',
    description: 'They shouldn\'t. They can\'t. They absolutely will.',
    emoji: '🚫',
    filter: (b) => b.themes?.some(t => ['forbidden-love', 'taboo', 'age-gap'].includes(t)),
  },
  {
    id: 'fantasy-romance',
    title: 'Fae, Dragons & Fate',
    description: 'Romantasy at its finest — fated mates, ancient magic, and world-ending stakes.',
    emoji: '🐉',
    filter: (b) => b.genres.includes('romantasy'),
    sort: (a, b) => b.spiceLevel - a.spiceLevel,
  },
  {
    id: 'sports-hotties',
    title: 'Sports Romance',
    description: 'Hockey players, football stars, and athletes who fall hard off the field.',
    emoji: '🏒',
    filter: (b) => b.genres.includes('sports-romance'),
  },
  {
    id: 'mafia-power',
    title: 'Mafia & Power',
    description: 'Dangerous men in suits. Arranged marriages. Empires built on blood and loyalty.',
    emoji: '🔫',
    filter: (b) => b.genres.includes('mafia-romance'),
  },
  {
    id: 'closed-door-warm',
    title: 'Sweet & Steamy Lite',
    description: 'All the butterflies, less of the explicit heat. Perfect for lighter moods.',
    emoji: '🦋',
    filter: (b) => b.spiceLevel <= 2 && !b.comingSoon,
  },
  {
    id: 'fake-dating',
    title: 'Fake Dating Done Right',
    description: 'It\'s fake. Totally fake. (It was never fake.)',
    emoji: '💍',
    filter: (b) => b.themes?.includes('fake-dating'),
  },
]


function ReadingListCard({ list }) {
  const books = useMemo(() => {
    let filtered = allBooks.filter(b => !b.comingSoon).filter(list.filter)
    if (list.sort) filtered.sort(list.sort)
    return filtered
  }, [list])

  const [visibleCount, setVisibleCount] = useState(6)
  const displayBooks = books.slice(0, visibleCount)

  if (books.length === 0) return null

  return (
    <section id={`list-${list.id}`} className="scroll-mt-24 bg-surface rounded-lg border border-gold/10 overflow-hidden">
      <div className="p-6 pb-4">
        <div className="flex items-start gap-3 mb-2">
          <span className="text-2xl">{list.emoji}</span>
          <div>
            <h3 className="font-heading text-xl tracking-wider text-gold">{list.title}</h3>
            <p className="font-body text-muted text-sm mt-1">{list.description}</p>
            <p className="font-body text-muted/50 text-xs mt-1">{books.length} books</p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-4">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {displayBooks.map(book => (
            <Link
              key={book.id}
              to={`/book/${book.id}`}
              className="aspect-[2/3] rounded overflow-hidden border border-transparent hover:border-gold/30 transition-all hover:scale-105"
              title={`${book.title} by ${book.author}`}
            >
              <SmartBookCover book={book} size="sm" />
            </Link>
          ))}
        </div>
      </div>

      {books.length > 6 && (
        <button
          onClick={() => setVisibleCount(current => current >= books.length ? 6 : Math.min(books.length, current + 12))}
          className="w-full py-3 border-t border-gold/10 font-heading text-xs tracking-widest uppercase text-muted hover:text-gold transition-colors cursor-pointer"
        >
          {visibleCount >= books.length ? 'Show Less' : `Show ${Math.min(12, books.length - visibleCount)} more · ${books.length - visibleCount} remaining`}
        </button>
      )}
    </section>
  )
}

export default function ReadingLists() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl md:text-5xl tracking-wider text-gold mb-3">
          Reading Lists
        </h1>
        <p className="font-body text-muted max-w-lg mx-auto">
          Curated collections for every mood and craving. Find your next obsession.
        </p>
      </div>

      <nav aria-label="Reading list collections" className="reading-list-nav mb-8">
        {READING_LISTS.map(list => (
          <a key={list.id} href={`#list-${list.id}`}>
            <span aria-hidden="true">{list.emoji}</span>
            {list.title}
          </a>
        ))}
      </nav>

      <div className="space-y-8">
        {READING_LISTS.map(list => (
          <ReadingListCard key={list.id} list={list} />
        ))}
      </div>
    </div>
  )
}
