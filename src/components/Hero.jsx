import SearchBar from './SearchBar'
import { allBooks } from '../data/books'

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Fog layers */}
      <div className="fog-layer absolute inset-0 pointer-events-none" />
      <div className="fog-layer-2 absolute inset-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <h1 className="font-heading text-gold text-5xl md:text-7xl lg:text-8xl tracking-wider mb-4">
          SmutPages
        </h1>

        <p className="font-body text-text text-xl md:text-2xl mb-3 tracking-wide">
          Your Encyclopedia for Romance & Spice
        </p>

        <p className="font-body text-muted text-lg md:text-xl italic mb-10">
          Every trope. Every twist. Every spicy detail.
        </p>

        <div className="flex justify-center mb-10">
          <SearchBar books={allBooks} placeholder="Search books, authors, tropes..." />
        </div>

        <div className="divider-ornament mb-8">&#10022;</div>

        <p className="font-body text-text/60 text-sm">
          {allBooks.filter(b => !b.comingSoon).length} books &middot;{' '}
          {allBooks.reduce((sum, b) => sum + (b.terms?.length || 0), 0)} terms &middot;{' '}
          {allBooks.reduce((sum, b) => sum + (b.quiz?.length || 0), 0)} quiz questions
        </p>
      </div>
    </section>
  )
}
