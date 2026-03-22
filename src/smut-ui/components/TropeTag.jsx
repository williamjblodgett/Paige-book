export function TropeTag({ trope }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap transition-colors duration-700 border"
      style={{
        backgroundColor: 'var(--theme-blur1)',
        color: 'var(--theme-text)',
        borderColor: 'var(--theme-border)',
      }}
    >
      {trope}
    </span>
  )
}
