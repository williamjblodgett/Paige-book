import { GENRES, THEMES, SPICE_LEVELS, GENRE_THEMES } from '../data/constants'

export default function FilterSidebar({
  filters,
  onFilterChange,
  bookCounts,
  isOpen,
  onClose,
}) {
  const { genre, theme, spice, author, search } = filters

  function toggleGenre(genreId) {
    const current = genre || []
    const next = current.includes(genreId)
      ? current.filter(g => g !== genreId)
      : [...current, genreId]
    onFilterChange({ ...filters, genre: next.length ? next : null })
  }

  function toggleTheme(themeId) {
    const current = theme || []
    const next = current.includes(themeId)
      ? current.filter(t => t !== themeId)
      : [...current, themeId]
    onFilterChange({ ...filters, theme: next.length ? next : null })
  }

  function setSpice(level) {
    onFilterChange({ ...filters, spice: spice === level ? null : level })
  }

  function clearAll() {
    onFilterChange({ genre: null, theme: null, spice: null, author: null, search: '' })
  }

  const hasFilters = genre?.length || theme?.length || spice || author

  const content = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-text text-lg tracking-wider">Filters</h3>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="font-body text-xs text-muted hover:text-gold transition-colors cursor-pointer"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Genres */}
      <div>
        <h4 className="font-heading text-xs tracking-widest uppercase text-muted mb-3">Genres</h4>
        <div className="flex flex-wrap gap-1.5">
          {GENRES.map(({ id, label }) => {
            const isActive = genre?.includes(id)
            const genreTheme = GENRE_THEMES[id]
            return (
              <button
                key={id}
                onClick={() => toggleGenre(id)}
                aria-pressed={Boolean(isActive)}
                className="font-heading text-[0.6rem] tracking-widest uppercase px-2.5 py-1.5 rounded-full border transition-all cursor-pointer"
                style={{
                  borderColor: isActive ? `${genreTheme?.accent || '#c9a84c'}` : 'rgba(154,144,128,0.15)',
                  color: isActive ? genreTheme?.accent || '#c9a84c' : '#9a9080',
                  backgroundColor: isActive ? `${genreTheme?.accent || '#c9a84c'}15` : 'transparent',
                }}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Spice Level */}
      <div>
        <h4 className="font-heading text-xs tracking-widest uppercase text-muted mb-3">Spice Level</h4>
        <div className="flex gap-2">
          {SPICE_LEVELS.map(({ level: lvl, label }) => (
            <button
              key={lvl}
              onClick={() => setSpice(lvl)}
              aria-pressed={spice === lvl}
              className={`flex-1 text-center py-2 rounded border transition-all cursor-pointer ${
                spice === lvl
                  ? 'border-orange-500/50 bg-orange-900/20 text-orange-300'
                  : 'border-muted/10 text-muted hover:border-muted/30'
              }`}
              title={label}
            >
              <span className="text-xs">{lvl}</span>
              <span className="block text-[0.5rem] mt-0.5">🌶️</span>
            </button>
          ))}
        </div>
      </div>

      {/* Themes/Tropes */}
      <div>
        <h4 className="font-heading text-xs tracking-widest uppercase text-muted mb-3">Tropes</h4>
        <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto">
          {THEMES.slice(0, 20).map(({ id, label }) => {
            const isActive = theme?.includes(id)
            return (
              <button
                key={id}
                onClick={() => toggleTheme(id)}
                aria-pressed={Boolean(isActive)}
                className={`font-heading text-[0.6rem] tracking-widest uppercase px-2.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                  isActive
                    ? 'border-gold/60 text-gold bg-gold/10'
                    : 'border-muted/10 text-muted/60 hover:border-muted/30 hover:text-muted'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 sticky top-20 self-start">
        {content}
      </aside>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={onClose} />
          <div role="dialog" aria-modal="true" aria-label="Book filters" className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-surface border-r border-gold/10 p-6 overflow-y-auto">
            <button
              onClick={onClose}
              aria-label="Close filters"
              className="absolute top-4 right-4 text-muted hover:text-text cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            {content}
          </div>
        </div>
      )}
    </>
  )
}
