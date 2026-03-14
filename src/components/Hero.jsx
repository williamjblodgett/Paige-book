export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Fog layers */}
      <div className="fog-layer absolute inset-0 pointer-events-none" />
      <div className="fog-layer-2 absolute inset-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <h1 className="font-heading text-gold text-5xl md:text-7xl lg:text-8xl tracking-wider mb-4">
          The Eating Woods
        </h1>

        <p className="font-body text-text text-xl md:text-2xl mb-3 tracking-wide">
          A Companion Guide to the World of Aethyria
        </p>

        <p className="font-body text-muted text-lg md:text-xl italic mb-10">
          Enter the Woods... if you dare.
        </p>

        <div className="divider-ornament mb-10">&#10022;</div>

        <p className="font-body text-text/80 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          A gothic dark fantasy trilogy by Keri Lake, following Maevyth Bronwick
          and Zevander Rydainn across the mortal realm of Mortasia and the
          magical world of Aethyria. Three books. One dark, unforgettable
          journey through cursed woods, forbidden magic, and fates worse than
          death.
        </p>
      </div>
    </section>
  )
}
