const bookColors = {
  Anathema: 'bg-gold/15 text-gold',
  Eldritch: 'bg-blood/20 text-red-300',
  Vasmora: 'bg-forest/30 text-emerald-300',
}

export default function GlossaryCard({ term, definition, book }) {
  return (
    <div className="card-glow bg-surface rounded-lg p-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-heading text-gold text-lg tracking-wide">
          {term}
        </h3>
        <span className={`shrink-0 font-heading text-xs tracking-widest uppercase px-2.5 py-1 rounded-full ${bookColors[book] || 'bg-muted/20 text-muted'}`}>
          {book}
        </span>
      </div>
      <p className="font-body text-text/80 leading-relaxed">
        {definition}
      </p>
    </div>
  )
}
