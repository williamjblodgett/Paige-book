export default function SpiceRating({ level, size = 'sm' }) {
  const sizeClass = size === 'lg' ? 'text-xl' : size === 'md' ? 'text-base' : 'text-sm'

  if (!Number.isInteger(level) || level < 1 || level > 5) {
    return (
      <span className={`font-body italic text-muted ${sizeClass}`} title="Awaiting editorial review">
        Spice not yet rated
      </span>
    )
  }

  return (
    <span className={`inline-flex gap-0.5 ${sizeClass}`} title={`Spice level: ${level}/5`} role="img" aria-label={`Spice rating: ${level} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} aria-hidden="true" className={i < level ? 'opacity-100' : 'opacity-20'}>
          🌶️
        </span>
      ))}
    </span>
  )
}
