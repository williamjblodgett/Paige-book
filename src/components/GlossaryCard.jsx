const categoryIcons = {
  character: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  location: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  magic: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  creature: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="12" r="1" /><circle cx="15" cy="12" r="1" />
      <path d="M8 16s1.5 2 4 2 4-2 4-2" />
      <path d="M12 2a8 8 0 0 0-8 8c0 3.5 2 6.5 4 8.5V22h8v-3.5c2-2 4-5 4-8.5a8 8 0 0 0-8-8z" />
    </svg>
  ),
  artifact: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="6 3 18 3 22 9 12 22 2 9" />
    </svg>
  ),
  organization: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  concept: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
    </svg>
  ),
  slang: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  worldbuilding: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
}

const categoryLabels = {
  character: 'Character',
  location: 'Location',
  magic: 'Magic',
  creature: 'Race / Creature',
  artifact: 'Artifact',
  organization: 'Organization',
  concept: 'Concept',
  slang: 'Slang / Term',
  worldbuilding: 'Worldbuilding',
}

export default function GlossaryCard({ term, definition, book, category, accentColor }) {
  const accent = accentColor || '#c9a84c'

  return (
    <div className="card-glow bg-surface rounded-lg p-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-heading text-lg tracking-wide" style={{ color: accent }}>
          {term}
        </h3>
        <span
          className="shrink-0 font-heading text-xs tracking-widest uppercase px-2.5 py-1 rounded-full"
          style={{
            backgroundColor: `${accent}15`,
            color: accent,
          }}
        >
          {book}
        </span>
      </div>

      {category && (
        <div className="flex items-center gap-1.5 mb-3 text-muted/70">
          {categoryIcons[category]}
          <span className="font-body text-xs tracking-wide">
            {categoryLabels[category] || category}
          </span>
        </div>
      )}

      <p className="font-body text-text/80 leading-relaxed">
        {definition}
      </p>
    </div>
  )
}
