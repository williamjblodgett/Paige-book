import { getAmazonSearchUrl, getGoodreadsSearchUrl } from '../utils/bookLinks'

export default function ExternalBookLinks({ title, author, accentColor }) {
  const amazonUrl = getAmazonSearchUrl(title, author)
  const goodreadsUrl = getGoodreadsSearchUrl(title, author)

  const linkClass = 'inline-flex items-center gap-2 font-heading text-[0.65rem] tracking-widest uppercase px-4 py-2 rounded-full border transition-all hover:opacity-80'

  const style = {
    borderColor: `${accentColor}40`,
    color: accentColor,
    backgroundColor: `${accentColor}15`,
  }

  return (
    <div className="flex items-center justify-center gap-3 mt-5">
      <a
        href={amazonUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        style={style}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
        Buy on Amazon
      </a>
      <a
        href={goodreadsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        style={style}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
        Goodreads
      </a>
    </div>
  )
}
