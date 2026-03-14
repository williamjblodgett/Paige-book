import Hero from '../components/Hero'

const books = [
  {
    title: 'Anathema',
    number: 1,
    subtitle: 'Only the banished know what lies beyond the woods.',
    coverClass: 'book-cover-anathema',
    accentColor: '#c9a84c',
    accentRgb: '201, 168, 76',
    ornamentColor: 'rgba(201, 168, 76, 0.3)',
  },
  {
    title: 'Eldritch',
    number: 2,
    subtitle: 'The longer he stays, the deeper the madness.',
    coverClass: 'book-cover-eldritch',
    accentColor: '#c42a2a',
    accentRgb: '196, 42, 42',
    ornamentColor: 'rgba(196, 42, 42, 0.3)',
  },
  {
    title: 'Vasmora',
    number: 3,
    subtitle: 'Every end is forged in fire and blood.',
    coverClass: 'book-cover-vasmora',
    accentColor: '#2d6b4f',
    accentRgb: '45, 107, 79',
    ornamentColor: 'rgba(45, 107, 79, 0.3)',
  },
]

export default function Home() {
  return (
    <div>
      <Hero />

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="font-heading text-center text-text text-2xl md:text-3xl tracking-wider mb-10">
          The Trilogy
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book.title}
              className={`bg-surface rounded-lg overflow-hidden group transition-all duration-300 border border-transparent hover:border-current`}
              style={{
                '--hover-color': book.accentColor,
                color: book.accentColor,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 20px rgba(${book.accentRgb}, 0.25), 0 0 40px rgba(${book.accentRgb}, 0.1)`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Styled book cover */}
              <div className={`aspect-[2/3] ${book.coverClass} flex items-center justify-center relative border-b`} style={{ borderColor: book.ornamentColor }}>
                {/* Gothic arch frame */}
                <svg className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)]" viewBox="0 0 200 300" fill="none" preserveAspectRatio="none">
                  {/* Outer frame */}
                  <path
                    d="M20 300 L20 80 Q20 20 100 20 Q180 20 180 80 L180 300"
                    stroke={book.ornamentColor}
                    strokeWidth="1"
                    fill="none"
                  />
                  {/* Inner decorative line */}
                  <path
                    d="M30 290 L30 85 Q30 30 100 30 Q170 30 170 85 L170 290"
                    stroke={book.ornamentColor}
                    strokeWidth="0.5"
                    fill="none"
                  />
                  {/* Top ornament */}
                  <circle cx="100" cy="20" r="3" fill={book.ornamentColor} />
                  {/* Bottom decorative elements */}
                  <line x1="50" y1="250" x2="150" y2="250" stroke={book.ornamentColor} strokeWidth="0.5" />
                  <line x1="60" y1="260" x2="140" y2="260" stroke={book.ornamentColor} strokeWidth="0.5" />
                </svg>

                {/* Center content */}
                <div className="text-center relative z-10 px-8">
                  <span className="font-heading text-muted text-xs tracking-[0.3em] uppercase block mb-1">
                    The Eating Woods
                  </span>
                  <div className="divider-ornament my-3" style={{ color: book.accentColor }}>&#10022;</div>
                  <span className="font-heading text-xs tracking-[0.25em] uppercase block mb-4 text-muted">
                    Book {book.number}
                  </span>
                  <h3 className="font-heading text-4xl md:text-5xl tracking-wider mb-4" style={{ color: book.accentColor }}>
                    {book.title}
                  </h3>
                  <div className="divider-ornament my-3" style={{ color: book.accentColor }}>&#10022;</div>
                  <span className="font-heading text-muted text-[0.6rem] tracking-[0.2em] uppercase block mt-2">
                    Keri Lake
                  </span>
                </div>

                {/* Corner accents */}
                <div className="absolute top-3 left-3 w-6 h-6 border-t border-l" style={{ borderColor: book.ornamentColor }} />
                <div className="absolute top-3 right-3 w-6 h-6 border-t border-r" style={{ borderColor: book.ornamentColor }} />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l" style={{ borderColor: book.ornamentColor }} />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r" style={{ borderColor: book.ornamentColor }} />
              </div>

              <div className="p-5">
                <p className="font-body italic text-center" style={{ color: '#9a9080' }}>
                  {book.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Series description */}
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <div className="divider-ornament mb-6">&#10022;</div>
          <p className="font-body text-muted text-base leading-relaxed italic">
            "A deliciously spellbinding trilogy where monsters lurk in the forest,
            ravens watch from the shadows, and every kiss is a curse you can't escape."
          </p>
        </div>
      </section>
    </div>
  )
}
