import { Link } from 'react-router-dom'
import { GENRE_THEMES } from '../data/constants'

export default function GenreBadge({ genreId, label, clickable = true }) {
  const theme = GENRE_THEMES[genreId]
  const displayLabel = label || theme?.label || genreId

  const style = {
    borderColor: theme ? `${theme.accent}40` : 'rgba(154,144,128,0.3)',
    color: theme?.accent || '#9a9080',
    backgroundColor: theme ? `${theme.accent}15` : 'rgba(154,144,128,0.1)',
  }

  const className = 'inline-block font-heading text-[0.65rem] tracking-widest uppercase px-2.5 py-1 rounded-full border transition-all'

  if (clickable) {
    return (
      <Link
        to={`/browse?genre=${genreId}`}
        className={`${className} hover:opacity-80`}
        style={style}
      >
        {displayLabel}
      </Link>
    )
  }

  return (
    <span className={className} style={style}>
      {displayLabel}
    </span>
  )
}
