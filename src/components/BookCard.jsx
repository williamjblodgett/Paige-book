import { Link } from 'react-router-dom'
import SpiceRating from './SpiceRating'
import GenreBadge from './GenreBadge'
import SmartBookCover from './SmartBookCover'

export default function BookCard({ book }) {
  const { id, title, author, genres, spiceLevel, coverGradient, accentColor, comingSoon } = book

  if (comingSoon) {
    return (
      <div className="bg-surface rounded-lg overflow-hidden border border-muted/10 opacity-70">
        <div className="aspect-[3/4] relative">
          <SmartBookCover book={book} />
          <div className="absolute inset-0 flex items-start justify-center pt-4">
            <span className="font-heading text-xs tracking-[0.2em] uppercase text-muted/60 bg-bg/60 px-3 py-1 rounded">
              Coming Soon
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Link
      to={`/book/${id}`}
      className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-current block"
      style={{ color: accentColor || '#c9a84c' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 20px ${accentColor}40, 0 0 40px ${accentColor}20`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Cover */}
      <div className="aspect-[3/4] group-hover:scale-[1.02] transition-transform duration-300 overflow-hidden">
        <SmartBookCover book={book} />
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">
        <div>
          <h3 className="font-heading text-sm tracking-wide text-text leading-snug line-clamp-2">{title}</h3>
          <p className="font-body text-muted text-xs mt-0.5">{author}</p>
        </div>
        <div className="flex items-center justify-between">
          <SpiceRating level={spiceLevel} />
        </div>
        <div className="flex flex-wrap gap-1">
          {genres.slice(0, 2).map((g) => (
            <GenreBadge key={g} genreId={g} clickable={false} />
          ))}
        </div>
      </div>
    </Link>
  )
}
