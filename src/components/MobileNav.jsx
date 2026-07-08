import { NavLink } from 'react-router-dom'

const items = [
  { to: '/', label: 'Home', icon: <path d="M3 10.5L12 3l9 7.5V21a1 1 0 01-1 1h-5v-7h-6v7H4a1 1 0 01-1-1z" /> },
  { to: '/browse', label: 'Browse', icon: <><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></> },
  { to: '/find-a-book', label: 'Match', icon: <><circle cx="12" cy="12" r="9" /><path d="M14.5 9.5l-2 5-3 1 2-5z" /></> },
  { to: '/my-shelf', label: 'Shelf', icon: <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" /> },
  { to: '/quizzes', label: 'Quiz', icon: <><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 015 .5c0 1.5-2.5 2-2.5 3.5" /><path d="M12 17h.01" /></> },
]

export default function MobileNav() {
  return (
    <nav className="mobile-nav md:hidden" aria-label="Mobile navigation">
      {items.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-2 py-1 transition-colors ${
              isActive ? 'text-[var(--primary)]' : 'text-zinc-400'
            }`
          }
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            {icon}
          </svg>
          <span className="text-[10px] tracking-wide font-body">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
