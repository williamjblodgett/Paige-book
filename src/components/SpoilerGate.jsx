import { useState } from 'react'

export default function SpoilerGate({ title, warning, accentColor, children }) {
  const [revealed, setRevealed] = useState(false)

  if (revealed) {
    return <>{children}</>
  }

  return (
    <div className="relative rounded-lg border border-muted/20 overflow-hidden">
      {/* Blurred preview */}
      <div className="blur-sm opacity-30 pointer-events-none max-h-48 overflow-hidden p-6">
        {children}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
        <svg
          width="32" height="32" viewBox="0 0 24 24" fill="none"
          stroke={accentColor || '#c9a84c'} strokeWidth="1.5"
          className="mb-3 opacity-70"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>

        <h4 className="font-heading text-sm tracking-widest uppercase text-text mb-2">
          {title || 'Spoiler Warning'}
        </h4>
        <p className="font-body text-muted text-sm mb-4 max-w-md">
          {warning || 'This section contains spoilers. Click below to reveal.'}
        </p>
        <button
          onClick={() => setRevealed(true)}
          className="font-heading text-xs tracking-widest uppercase px-6 py-2 rounded border-2 transition-all cursor-pointer hover:opacity-80"
          style={{
            borderColor: accentColor || '#c9a84c',
            color: accentColor || '#c9a84c',
          }}
        >
          Reveal Spoilers
        </button>
      </div>
    </div>
  )
}
