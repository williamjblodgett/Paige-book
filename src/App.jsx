import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect, useMemo } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import MobileNav from './components/MobileNav'

const Home = lazy(() => import('./pages/Home'))
const BookDetail = lazy(() => import('./pages/BookDetail'))
const Quizzes = lazy(() => import('./pages/Quizzes'))
const FindABook = lazy(() => import('./pages/FindABook'))
const MyShelf = lazy(() => import('./pages/MyShelf'))
const ReadingLists = lazy(() => import('./pages/ReadingLists'))
const SmutBooksPage = lazy(() =>
  import('./smut-ui/pages/SmutBooksPage').then(m => ({ default: m.SmutBooksPage }))
)

const THEME_TO_GENRE = {
  'enemies-to-lovers': 'dark-romance',
  'forced-proximity': 'contemporary-romance',
  'forbidden-love': 'mafia-romance',
  'slow-burn': 'contemporary-romance',
  'friends-to-lovers': 'contemporary-romance',
  'grumpy-sunshine': 'rom-com',
  'only-one-bed': 'contemporary-romance',
  'morally-grey': 'dark-romance',
  'possessive-hero': 'dark-romance',
  'touch-her-and-die': 'dark-romance',
  'age-gap': 'contemporary-romance',
  'fake-dating': 'rom-com',
  'second-chance': 'contemporary-romance',
  'he-falls-first': 'contemporary-romance',
  'found-family': 'romantasy',
  'fated-mates': 'paranormal-romance',
  'who-did-this-to-you': 'romantic-suspense',
  'arranged-marriage': 'mafia-romance',
  taboo: 'erotic-romance',
  stalker: 'dark-romance',
  bully: 'bully-romance',
  'alpha-male': 'mafia-romance',
  workplace: 'contemporary-romance',
  'brother-best-friend': 'sports-romance',
  'secret-identity': 'romantic-suspense',
  'opposites-attract': 'rom-com',
  'secret-relationship': 'contemporary-romance',
  'small-town': 'contemporary-romance',
}

function getTopicClassname(location) {
  const params = new URLSearchParams(location.search)
  const primaryGenre = params.getAll('genre')[0]
  if (primaryGenre) return primaryGenre

  const primaryTheme = params.getAll('theme')[0]
  if (primaryTheme && THEME_TO_GENRE[primaryTheme]) {
    return THEME_TO_GENRE[primaryTheme]
  }

  const path = location.pathname || '/'
  if (path.startsWith('/book/')) return 'library'

  if (path.startsWith('/quizzes')) return 'rom-com'
  if (path.startsWith('/find-a-book')) return 'new-adult'
  if (path.startsWith('/my-shelf')) return 'contemporary-romance'
  if (path.startsWith('/lists')) return 'romantasy'
  if (path.startsWith('/browse')) return 'library'

  return 'default'
}

function PageFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="page-spinner mx-auto mb-4" aria-hidden="true" />
        <p className="font-heading text-muted text-xs tracking-[0.3em] uppercase">Loading</p>
      </div>
    </div>
  )
}

function AppShell() {
  const location = useLocation()
  const topicClass = useMemo(() => getTopicClassname(location), [location])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    const path = location.pathname || '/'
    let title = 'SMUTBOOK — Find Your Next Romance Read'
    let description = 'Explore real romance books by trope, spice level, and mood.'
    if (path.startsWith('/book/')) return
    if (path.startsWith('/browse')) title = 'Browse Romance Books — SMUTBOOK'
    else if (path.startsWith('/find-a-book')) title = 'Find Your Next Book — SMUTBOOK'
    else if (path.startsWith('/lists')) title = 'Curated Reading Lists — SMUTBOOK'
    else if (path.startsWith('/quizzes')) title = 'Custom Book Quizzes — SMUTBOOK'
    else if (path.startsWith('/my-shelf')) title = 'My Reading Shelf — SMUTBOOK'
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
  }, [location.pathname])

  return (
    <div className={`topic-scene topic-${topicClass} grain-overlay min-h-screen text-text font-body flex flex-col pb-16 md:pb-0`}>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Nav />
      <main id="main-content" className="flex-1" tabIndex="-1">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<SmutBooksPage />} />
            <Route path="/book/:bookId" element={<BookDetail />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/find-a-book" element={<FindABook />} />
            <Route path="/my-shelf" element={<MyShelf />} />
            <Route path="/lists" element={<ReadingLists />} />
            <Route path="/smutbook" element={<Navigate to="/browse" replace />} />
            <Route path="/summaries" element={<Navigate to="/browse" replace />} />
          </Routes>
        </Suspense>
      </main>
      {location.pathname !== '/browse' && <Footer />}
      <MobileNav />
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <AppShell />
    </HashRouter>
  )
}
