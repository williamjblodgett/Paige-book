import { Link } from 'react-router-dom'
import SpiceRating from './SpiceRating'
import GenreBadge from './GenreBadge'

export default function BookCard({ book }) {
  const { id, title, author, genres, spiceLevel, coverGradient, accentColor, comingSoon } = book

  const gradientStyle = {
    background: `linear-gradient(160deg, ${coverGradient?.[0] || '#111318'} 0%, ${coverGradient?.[1] || '#0a0808'} 100%)`,
  }

  if (comingSoon) {
    return (
      <div className="bg-surface rounded-lg overflow-hidden border border-muted/10 opacity-70">
        <div className="aspect-[3/4] flex flex-col items-center justify-center relative p-6" style={gradientStyle}>
          <span className="font-heading text-xs tracking-[0.2em] uppercase text-muted/60 mb-2">
            Coming Soon
          </span>
          <h3 className="font-heading text-lg tracking-wider text-center mb-1" style={{ color: accentColor || '#c9a84c' }}>
            {title}
          </h3>
          <p className="font-body text-muted text-sm text-center">{author}</p>
          <div className="mt-3">
            <SpiceRating level={spiceLevel} />
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
      <div className="aspect-[3/4] flex flex-col items-center justify-center relative p-6" style={gradientStyle}>
        {/* Corner accents */}
        <div className="absolute top-3 left-3 w-5 h-5 border-t border-l" style={{ borderColor: `${accentColor}40` }} />
        <div className="absolute top-3 right-3 w-5 h-5 border-t border-r" style={{ borderColor: `${accentColor}40` }} />
        <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l" style={{ borderColor: `${accentColor}40` }} />
        <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r" style={{ borderColor: `${accentColor}40` }} />

        <div className="text-center">
          <h3
            className="font-heading text-2xl md:text-3xl tracking-wider mb-2 group-hover:scale-105 transition-transform"
            style={{ color: accentColor || '#c9a84c' }}
          >
            {title}
          </h3>
          <p className="font-body text-muted text-sm">{author}</p>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">
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
