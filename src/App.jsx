import { HashRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Glossary from './pages/Glossary'
import Summaries from './pages/Summaries'
import Quizzes from './pages/Quizzes'

export default function App() {
  return (
    <HashRouter>
      <div className="grain-overlay min-h-screen bg-bg text-text font-body">
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="/summaries" element={<Summaries />} />
            <Route path="/quizzes" element={<Quizzes />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  )
}
