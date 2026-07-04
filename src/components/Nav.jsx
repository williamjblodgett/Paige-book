import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/browse', label: 'Browse' },
  { to: '/lists', label: 'Lists' },
  { to: '/find-a-book', label: 'Find a Book' },
  { to: '/my-shelf', label: 'My Shelf' },
  { to: '/quizzes', label: 'Book Club' },
]

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-white/8 bg-[rgba(11,11,15,0.82)] backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <NavLink to="/" className="font-heading text-lg tracking-[0.28em] uppercase font-bold gradient-text">
          SMUTBOOK
        </NavLink>

        <div className="hidden md:flex items-center gap-3 rounded-full border border-white/8 bg-white/4 px-3 py-2">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 font-heading text-xs tracking-[0.22em] uppercase transition-all duration-200 ${
                  isActive
                    ? 'bg-[linear-gradient(135deg,rgba(255,46,136,0.18),rgba(155,92,255,0.18))] text-white border border-white/12'
                    : 'text-zinc-400 hover:text-white'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-zinc-400 hover:text-white transition-colors p-2"
          aria-label="Toggle navigation menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[rgba(11,11,15,0.96)] border-t border-white/8 px-4 pb-4 backdrop-blur-xl">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block py-3 font-heading text-sm tracking-[0.22em] uppercase border-b border-white/6 transition-colors ${
                  isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  )
}
