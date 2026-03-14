export default function SummaryCard({ book }) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <span className="font-heading text-muted text-sm tracking-widest uppercase">
          Book {book.bookNumber}
        </span>
        <h2 className="font-heading text-gold text-4xl md:text-5xl tracking-wider mt-2 mb-3">
          {book.title}
        </h2>
        <p className="font-body text-muted text-xl italic">
          {book.tagline}
        </p>
      </div>

      <div className="divider-ornament mb-8">&#10022;</div>

      <div className="bg-surface rounded-lg border border-gold/10 p-6 md:p-8 mb-8">
        <h3 className="font-heading text-text text-lg tracking-wider mb-4">
          Summary
        </h3>
        <p className="font-body text-text/80 leading-relaxed whitespace-pre-line">
          {book.summary}
        </p>
      </div>

      <div className="bg-surface rounded-lg border border-gold/10 p-6 md:p-8">
        <h3 className="font-heading text-text text-lg tracking-wider mb-6">
          Key Characters
        </h3>
        <div className="space-y-4">
          {book.keyCharacters.map((char, i) => (
            <div key={i} className="border-l-2 border-gold/30 pl-4">
              <h4 className="font-heading text-gold text-base tracking-wide mb-1">
                {char.name}
              </h4>
              <p className="font-body text-text/70 leading-relaxed">
                {char.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
