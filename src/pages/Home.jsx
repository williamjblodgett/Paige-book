import Hero from '../components/Hero'

const books = [
  {
    title: 'Anathema',
    number: 1,
    subtitle: 'Only the banished know what lies beyond the woods.',
  },
  {
    title: 'Eldritch',
    number: 2,
    subtitle: '[ PLACEHOLDER — Eldritch subtitle ]',
  },
  {
    title: 'Vasmora',
    number: 3,
    subtitle: '[ PLACEHOLDER — Vasmora subtitle ]',
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
              className="card-glow bg-surface rounded-lg overflow-hidden group"
            >
              {/* Placeholder cover art */}
              <div className="aspect-[2/3] bg-gradient-to-b from-surface via-bg to-surface flex items-center justify-center relative border-b border-gold/10">
                <div className="text-center">
                  <span className="font-heading text-muted text-xs tracking-widest uppercase block mb-2">
                    Book {book.number}
                  </span>
                  <h3 className="font-heading text-gold text-3xl md:text-4xl tracking-wider">
                    {book.title}
                  </h3>
                </div>
                {/* Decorative corner accents */}
                <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-gold/30" />
                <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-gold/30" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-gold/30" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-gold/30" />
              </div>

              <div className="p-5">
                <p className="font-body text-muted italic text-center">
                  {book.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
