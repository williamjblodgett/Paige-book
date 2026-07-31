import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect, useMemo } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import MobileNav from './components/MobileNav'
import { allBooks } from './data/books'

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
  if (path.startsWith('/book/')) {
    const id = decodeURIComponent(path.replace('/book/', '').trim())
    const book = allBooks.find(b => b.id === id)
    if (book?.genres?.[0]) return book.genres[0]
  }

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

  return (
    <div className={`topic-scene topic-${topicClass} grain-overlay min-h-screen text-text font-body flex flex-col pb-16 md:pb-0`}>
      <Nav />
      <main className="flex-1">
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
