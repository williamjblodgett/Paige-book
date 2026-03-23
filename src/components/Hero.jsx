import SearchBar from './SearchBar'
import { allBooks } from '../data/books'

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden px-4">
      <div className="fog-layer absolute inset-0 pointer-events-none" />
      <div className="fog-layer-2 absolute inset-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl app-panel px-6 py-16 md:px-12 md:py-20 text-center">
        <h1 className="font-heading text-white text-5xl md:text-7xl lg:text-8xl tracking-[0.08em] mb-10">
          SMUTBOOK
        </h1>

        <div className="flex justify-center mb-10">
          <SearchBar books={allBooks} placeholder="Search books, authors, tropes..." />
        </div>

        <div className="divider-ornament mb-8">&#10022;</div>

        <p className="font-body text-white/60 text-sm">
          {allBooks.filter(b => !b.comingSoon).length} books &middot;{' '}
          {allBooks.reduce((sum, b) => sum + (b.terms?.length || 0), 0)} terms &middot;{' '}
          {allBooks.reduce((sum, b) => sum + (b.quiz?.length || 0), 0)} quiz questions
        </p>
      </div>
    </section>
  )
}
