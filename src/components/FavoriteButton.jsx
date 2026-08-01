export default function FavoriteButton({ isFavorite, onToggle, size = 'md', accentColor }) {
  const sizes = {
    sm: { svg: 16, cls: 'p-1.5' },
    md: { svg: 20, cls: 'p-2' },
    lg: { svg: 24, cls: 'p-2.5' },
  }
  const s = sizes[size] || sizes.md

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onToggle()
      }}
      className={`${s.cls} rounded-full transition-all cursor-pointer hover:scale-110 active:scale-95`}
      style={{
        backgroundColor: isFavorite ? `${accentColor || '#c9a84c'}20` : 'rgba(255,255,255,0.05)',
        border: `1px solid ${isFavorite ? `${accentColor || '#c9a84c'}50` : 'rgba(255,255,255,0.1)'}`,
      }}
      title={isFavorite ? 'Remove from My Shelf' : 'Add to My Shelf'}
      aria-label={isFavorite ? 'Remove from My Shelf' : 'Add to My Shelf'}
      aria-pressed={isFavorite}
    >
      <svg
        width={s.svg}
        height={s.svg}
        viewBox="0 0 24 24"
        fill={isFavorite ? (accentColor || '#c9a84c') : 'none'}
        stroke={accentColor || '#c9a84c'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
      </svg>
    </button>
  )
}
