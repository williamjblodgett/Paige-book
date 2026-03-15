export default function SpiceRating({ level, size = 'sm' }) {
  const sizeClass = size === 'lg' ? 'text-xl' : size === 'md' ? 'text-base' : 'text-sm'

  return (
    <span className={`inline-flex gap-0.5 ${sizeClass}`} title={`Spice level: ${level}/5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < level ? 'opacity-100' : 'opacity-20'}>
          🌶️
        </span>
      ))}
    </span>
  )
}
