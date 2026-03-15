import { Link } from 'react-router-dom'

export default function ThemeBadge({ themeId, label, clickable = true }) {
  const className = 'inline-block font-heading text-[0.65rem] tracking-widest uppercase px-2.5 py-1 rounded-full border border-muted/20 text-muted hover:text-text hover:border-muted/40 transition-all'

  if (clickable) {
    return (
      <Link to={`/browse?theme=${themeId}`} className={className}>
        {label || themeId}
      </Link>
    )
  }

  return (
    <span className={`inline-block font-heading text-[0.65rem] tracking-widest uppercase px-2.5 py-1 rounded-full border border-muted/20 text-muted`}>
      {label || themeId}
    </span>
  )
}
