import SearchBar from './SearchBar'
import { allBooks } from '../data/books'

export default function Hero() {
  return (
    <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden px-4 py-16">
      <div className="glow-blob glow-blob-pink w-[28rem] h-[28rem] -top-32 -left-24" />
      <div className="glow-blob glow-blob-purple w-[26rem] h-[26rem] -bottom-32 -right-20" />

      <div className="relative z-10 w-full max-w-4xl text-center">
        <h1 className="font-heading gradient-text font-bold text-5xl md:text-7xl lg:text-8xl tracking-[0.08em] mb-4 pb-2">
          SMUTBOOK
        </h1>
        <p className="font-body text-zinc-400 text-lg md:text-xl italic mb-10">
          Every trope. Every twist. Every spicy detail.
        </p>

        <div className="flex justify-center mb-10">
          <SearchBar books={allBooks} placeholder="Search books, authors, tropes..." />
        </div>

        <p className="font-body text-white/60 text-sm">
          {allBooks.filter(b => !b.comingSoon).length} books &middot;{' '}
          {allBooks.reduce((sum, b) => sum + (b.terms?.length || 0), 0)} terms &middot;{' '}
          {allBooks.reduce((sum, b) => sum + (b.quiz?.length || 0), 0)} quiz questions
        </p>
      </div>
    </section>
  )
}
