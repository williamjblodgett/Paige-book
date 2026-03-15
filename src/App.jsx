import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Browse from './pages/Browse'
import BookDetail from './pages/BookDetail'
import Glossary from './pages/Glossary'
import Quizzes from './pages/Quizzes'
import FindABook from './pages/FindABook'
import MyShelf from './pages/MyShelf'
import ReadingLists from './pages/ReadingLists'

export default function App() {
  return (
    <HashRouter>
      <div className="grain-overlay min-h-screen bg-bg text-text font-body">
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/book/:bookId" element={<BookDetail />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/find-a-book" element={<FindABook />} />
            <Route path="/my-shelf" element={<MyShelf />} />
            <Route path="/lists" element={<ReadingLists />} />
            <Route path="/summaries" element={<Navigate to="/browse" replace />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  )
}
