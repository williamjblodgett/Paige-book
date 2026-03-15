import { POV_TYPES } from '../data/constants'

export default function BookMetadata({ book, accentColor }) {
  const { pov, pageCount, publicationYear, standalone } = book

  const items = []

  if (pov) {
    const povData = POV_TYPES.find(p => p.id === pov)
    items.push({ icon: 'eye', label: 'POV', value: povData?.label || pov })
  }

  if (pageCount) {
    items.push({ icon: 'book', label: 'Pages', value: `${pageCount} pages` })
  }

  if (publicationYear) {
    items.push({ icon: 'calendar', label: 'Published', value: String(publicationYear) })
  }

  if (standalone !== undefined) {
    items.push({
      icon: 'layers',
      label: 'Type',
      value: standalone ? 'Standalone' : (book.series || 'Series'),
    })
  }

  if (items.length === 0) return null

  const icons = {
    eye: <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />,
    book: <><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>,
    layers: <><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></>,
  }

  return (
    <div className="flex flex-wrap gap-4">
      {items.map(item => (
        <div key={item.label} className="flex items-center gap-2 text-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
            {icons[item.icon]}
          </svg>
          <span className="font-body text-muted">{item.label}:</span>
          <span className="font-body text-text/80">{item.value}</span>
        </div>
      ))}
    </div>
  )
}
