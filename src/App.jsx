import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useMemo } from 'react'
import Nav from './components/Nav'
import Home from './pages/Home'
import Browse from './pages/Browse'
import BookDetail from './pages/BookDetail'
import Quizzes from './pages/Quizzes'
import FindABook from './pages/FindABook'
import MyShelf from './pages/MyShelf'
import ReadingLists from './pages/ReadingLists'
import { allBooks } from './data/books'
import { SmutBooksPage } from './smut-ui/pages/SmutBooksPage'

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

function AppShell() {
  const location = useLocation()
  const topicClass = useMemo(() => getTopicClassname(location), [location])

  return (
    <div className={`topic-scene topic-${topicClass} grain-overlay min-h-screen text-text font-body`}>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/book/:bookId" element={<BookDetail />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/find-a-book" element={<FindABook />} />
          <Route path="/my-shelf" element={<MyShelf />} />
          <Route path="/lists" element={<ReadingLists />} />
          <Route path="/smutbook" element={<SmutBooksPage />} />
          <Route path="/summaries" element={<Navigate to="/browse" replace />} />
        </Routes>
      </main>
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
