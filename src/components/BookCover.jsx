import { useMemo } from 'react'
import { GENRE_THEMES } from '../data/constants'

/**
 * Procedural SVG book cover generator.
 * Creates unique, genre-themed covers using the book's metadata
 * to seed decorative patterns, symbols, and color palettes.
 */

// Simple hash for deterministic randomness from a string
function hash(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

function seededRandom(seed) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

// Genre-specific decorative elements
const GENRE_SYMBOLS = {
  'dark-romance': ['M12 2C8 2 4 6 4 10c0 6 8 12 8 12s8-6 8-12c0-4-4-8-8-8z', 'M6 3l6 6 6-6M6 21l6-6 6 6', 'M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z'],
  'contemporary-romance': ['M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'],
  'romantasy': ['M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z', 'M12 3L4 9l8 6-8 6h16l-8-6 8-6z'],
  'sports-romance': ['M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z'],
  'mafia-romance': ['M12 2L2 12l10 10 10-10L12 2zM12 6l6 6-6 6-6-6 6-6z'],
  'erotic-romance': ['M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'],
  'paranormal-romance': ['M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7z', 'M3 12h4l3-9 4 18 3-9h4'],
}

// Decorative border patterns per genre
function GenreBorder({ genre, accent, rand, width, height }) {
  const corners = genre === 'romantasy' || genre === 'dark-romance' || genre === 'mafia-romance'
  const ornate = genre === 'erotic-romance' || genre === 'romantasy'

  const m = 12 // margin
  const elements = []

  if (corners) {
    const s = 25
    // Corner ornaments
    elements.push(
      <g key="tl" stroke={accent} strokeWidth="1" fill="none" opacity="0.5">
        <path d={`M${m},${m + s} L${m},${m} L${m + s},${m}`} />
        <path d={`M${m + 4},${m + s - 6} L${m + 4},${m + 4} L${m + s - 6},${m + 4}`} />
      </g>,
      <g key="tr" stroke={accent} strokeWidth="1" fill="none" opacity="0.5">
        <path d={`M${width - m - s},${m} L${width - m},${m} L${width - m},${m + s}`} />
        <path d={`M${width - m - s + 6},${m + 4} L${width - m - 4},${m + 4} L${width - m - 4},${m + s - 6}`} />
      </g>,
      <g key="bl" stroke={accent} strokeWidth="1" fill="none" opacity="0.5">
        <path d={`M${m},${height - m - s} L${m},${height - m} L${m + s},${height - m}`} />
        <path d={`M${m + 4},${height - m - s + 6} L${m + 4},${height - m - 4} L${m + s - 6},${height - m - 4}`} />
      </g>,
      <g key="br" stroke={accent} strokeWidth="1" fill="none" opacity="0.5">
        <path d={`M${width - m - s},${height - m} L${width - m},${height - m} L${width - m},${height - m - s}`} />
        <path d={`M${width - m - s + 6},${height - m - 4} L${width - m - 4},${height - m - 4} L${width - m - 4},${height - m - s + 6}`} />
      </g>
    )
  }

  if (ornate) {
    // Horizontal line accents top and bottom
    const y1 = 45
    const y2 = height - 45
    elements.push(
      <line key="lt" x1={m + 30} y1={y1} x2={width - m - 30} y2={y1} stroke={accent} strokeWidth="0.5" opacity="0.3" />,
      <line key="lb" x1={m + 30} y1={y2} x2={width - m - 30} y2={y2} stroke={accent} strokeWidth="0.5" opacity="0.3" />,
    )
    // Small diamond at center of top line
    const cx = width / 2
    elements.push(
      <path key="dt" d={`M${cx},${y1 - 4} l4,4 -4,4 -4,-4z`} fill={accent} opacity="0.3" />,
      <path key="db" d={`M${cx},${y2 - 4} l4,4 -4,4 -4,-4z`} fill={accent} opacity="0.3" />,
    )
  }

  return <>{elements}</>
}

// Generate scattered decorative shapes
function BackgroundPattern({ genre, accent, rand, width, height }) {
  const elements = []
  const count = 4 + Math.floor(rand() * 6)

  for (let i = 0; i < count; i++) {
    const x = 20 + rand() * (width - 40)
    const y = 20 + rand() * (height - 40)
    const size = 2 + rand() * 6
    const opacity = 0.03 + rand() * 0.08
    const rotation = rand() * 360

    if (genre === 'romantasy' || genre === 'paranormal-romance') {
      // Stars
      elements.push(
        <g key={`bg${i}`} transform={`translate(${x},${y}) rotate(${rotation}) scale(${size / 12})`} opacity={opacity}>
          <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" fill={accent} />
        </g>
      )
    } else if (genre === 'dark-romance' || genre === 'mafia-romance') {
      // Diamonds
      elements.push(
        <rect key={`bg${i}`} x={x} y={y} width={size} height={size}
          transform={`rotate(45, ${x + size / 2}, ${y + size / 2})`}
          fill={accent} opacity={opacity} />
      )
    } else {
      // Circles
      elements.push(
        <circle key={`bg${i}`} cx={x} cy={y} r={size / 2} fill={accent} opacity={opacity} />
      )
    }
  }

  return <>{elements}</>
}

// Spice level indicator as subtle bottom decoration
function SpiceDecor({ level, accent, width, height }) {
  const y = height - 28
  const gap = 10
  const totalW = (level * gap)
  const startX = (width - totalW) / 2

  return (
    <g opacity="0.4">
      {Array.from({ length: level }, (_, i) => (
        <circle key={i} cx={startX + i * gap + gap / 2} cy={y} r="2" fill={accent} />
      ))}
    </g>
  )
}

export default function BookCover({ book, className = '', size = 'full' }) {
  const { id, title, author, genres, spiceLevel, coverGradient, accentColor } = book

  const genreTheme = GENRE_THEMES[genres?.[0]] || GENRE_THEMES['dark-romance']
  const accent = accentColor || genreTheme.accent
  const grad1 = coverGradient?.[0] || genreTheme.gradient[0]
  const grad2 = coverGradient?.[1] || genreTheme.gradient[1]
  const genre = genres?.[0] || 'dark-romance'

  // Deterministic random based on book id
  const seed = hash(id)
  const rand = useMemo(() => seededRandom(seed), [seed])

  // Dimensions
  const width = 240
  const height = 360

  // Split title for multi-line display
  const titleWords = title.split(' ')
  const titleLines = useMemo(() => {
    if (size === 'sm') {
      // For small size, allow longer lines
      const lines = []
      let currentLine = ''
      for (const word of titleWords) {
        if ((currentLine + ' ' + word).length > 18 && currentLine) {
          lines.push(currentLine)
          currentLine = word
        } else {
          currentLine = currentLine ? currentLine + ' ' + word : word
        }
      }
      if (currentLine) lines.push(currentLine)
      return lines
    }
    const lines = []
    let currentLine = ''
    for (const word of titleWords) {
      if ((currentLine + ' ' + word).length > 14 && currentLine) {
        lines.push(currentLine)
        currentLine = word
      } else {
        currentLine = currentLine ? currentLine + ' ' + word : word
      }
    }
    if (currentLine) lines.push(currentLine)
    return lines
  }, [title, size])

  const titleFontSize = titleLines.length > 3 ? 16 : titleLines.length > 2 ? 18 : 22
  const titleY = height / 2 - (titleLines.length * (titleFontSize + 4)) / 2

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}
    >
      <defs>
        <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={grad1} />
          <stop offset="100%" stopColor={grad2} />
        </linearGradient>
        <radialGradient id={`glow-${id}`} cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.12" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <filter id={`shadow-${id}`}>
          <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor={accent} floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Background */}
      <rect width={width} height={height} fill={`url(#bg-${id})`} rx="4" />

      {/* Ambient glow */}
      <rect width={width} height={height} fill={`url(#glow-${id})`} rx="4" />

      {/* Background pattern */}
      <BackgroundPattern genre={genre} accent={accent} rand={rand} width={width} height={height} />

      {/* Border decoration */}
      <GenreBorder genre={genre} accent={accent} rand={rand} width={width} height={height} />

      {/* Title */}
      <text
        x={width / 2}
        y={titleY}
        textAnchor="middle"
        fontFamily="'Cinzel', serif"
        fontSize={titleFontSize}
        fontWeight="600"
        fill={accent}
        filter={`url(#shadow-${id})`}
      >
        {titleLines.map((line, i) => (
          <tspan key={i} x={width / 2} dy={i === 0 ? 0 : titleFontSize + 4}>
            {line}
          </tspan>
        ))}
      </text>

      {/* Author */}
      <text
        x={width / 2}
        y={titleY + titleLines.length * (titleFontSize + 4) + 16}
        textAnchor="middle"
        fontFamily="'EB Garamond', serif"
        fontSize="12"
        fill="#9a9080"
        letterSpacing="0.5"
      >
        {author}
      </text>

      {/* Genre-specific centerpiece symbol */}
      {(() => {
        const symbols = GENRE_SYMBOLS[genre] || GENRE_SYMBOLS['contemporary-romance']
        const symbolIdx = seed % symbols.length
        const symbolY = titleY + titleLines.length * (titleFontSize + 4) + 36
        return (
          <g transform={`translate(${width / 2 - 12}, ${symbolY})`} opacity="0.2">
            <path d={symbols[symbolIdx]} fill={accent} />
          </g>
        )
      })()}

      {/* Spice level dots */}
      <SpiceDecor level={spiceLevel} accent={accent} width={width} height={height} />
    </svg>
  )
}
