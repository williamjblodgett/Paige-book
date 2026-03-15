import { useState } from 'react'
import { CONTENT_WARNINGS } from '../data/constants'

const SEVERITY_COLORS = {
  high: { bg: 'bg-red-900/30', border: 'border-red-500/40', text: 'text-red-300' },
  medium: { bg: 'bg-amber-900/20', border: 'border-amber-500/30', text: 'text-amber-300' },
  low: { bg: 'bg-slate-700/20', border: 'border-slate-500/20', text: 'text-slate-300' },
}

export default function ContentWarnings({ warnings, accentColor }) {
  const [expanded, setExpanded] = useState(false)

  if (!warnings || warnings.length === 0) return null

  const warningData = warnings.map(wId => {
    const found = CONTENT_WARNINGS.find(cw => cw.id === wId)
    return found || { id: wId, label: wId, severity: 'low' }
  })

  const highCount = warningData.filter(w => w.severity === 'high').length

  return (
    <div className="bg-surface rounded-lg border border-gold/10 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-gold/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-400 flex-shrink-0">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <span className="font-heading text-sm tracking-widest uppercase text-muted">
            Content Warnings
          </span>
          {highCount > 0 && (
            <span className="text-xs bg-red-900/40 text-red-300 px-2 py-0.5 rounded-full border border-red-500/30">
              {highCount} sensitive
            </span>
          )}
        </div>
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          className={`text-muted transition-transform ${expanded ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-gold/10 pt-3">
          <p className="font-body text-muted text-xs mb-3">
            This book contains the following content that some readers may find triggering.
          </p>
          <div className="flex flex-wrap gap-2">
            {warningData.map(w => {
              const colors = SEVERITY_COLORS[w.severity]
              return (
                <span
                  key={w.id}
                  className={`inline-flex items-center gap-1.5 text-xs font-body px-2.5 py-1 rounded-full border ${colors.bg} ${colors.border} ${colors.text}`}
                >
                  {w.severity === 'high' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  )}
                  {w.label}
                </span>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
