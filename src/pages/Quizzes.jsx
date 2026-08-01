import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import QuizRunner from '../components/QuizRunner'
import ResultsScreen from '../components/ResultsScreen'
import SpiceRating from '../components/SpiceRating'
import { allBooks } from '../data/books'
import SmartBookCover from '../components/SmartBookCover'
import useQuizScores from '../hooks/useQuizScores'

function shuffled(items) {
  const next = [...items]
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[next[index], next[swapIndex]] = [next[swapIndex], next[index]]
  }
  return next
}

const MIXED_GENRES = [
  { id: 'all', label: 'All romance' },
  { id: 'contemporary-romance', label: 'Contemporary' },
  { id: 'dark-romance', label: 'Dark romance' },
  { id: 'romantasy', label: 'Romantasy' },
  { id: 'sports-romance', label: 'Sports romance' },
  { id: 'paranormal-romance', label: 'Paranormal' },
]

export default function Quizzes() {
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedBookId = searchParams.get('book')

  const [results, setResults] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [started, setStarted] = useState(false)
  const [quizQuestions, setQuizQuestions] = useState(null)
  const [attemptKey, setAttemptKey] = useState(0)
  const [quizLength, setQuizLength] = useState('all')
  const [shuffleQuestions, setShuffleQuestions] = useState(true)
  const [showExplanations, setShowExplanations] = useState(true)
  const [mixedGenre, setMixedGenre] = useState('all')
  const [mixedLength, setMixedLength] = useState(20)
  const [mixedTitle, setMixedTitle] = useState('')
  const [visibleCount, setVisibleCount] = useState(24)
  const { recordResult, getScore } = useQuizScores()

  const booksWithQuiz = useMemo(() => {
    return allBooks
      .filter(b => !b.comingSoon && b.quiz?.length >= 5)
      .sort((a, b) => a.title.localeCompare(b.title))
  }, [])

  const filteredBooks = useMemo(() => {
    if (!searchQuery.trim()) return booksWithQuiz
    const q = searchQuery.toLowerCase()
    return booksWithQuiz.filter(b =>
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q)
    )
  }, [booksWithQuiz, searchQuery])

  const selectedBook = selectedBookId ? booksWithQuiz.find(b => b.id === selectedBookId) : null

  useEffect(() => {
    setVisibleCount(24)
  }, [searchQuery])

  // Reset quiz state whenever the selected book changes (including back/forward)
  useEffect(() => {
    setResults(null)
    setStarted(false)
    setQuizQuestions(null)
    setMixedTitle('')
    setQuizLength('all')
  }, [selectedBookId])

  function selectBook(id) {
    setSearchParams({ book: id })
  }

  function backToPicker() {
    setSearchParams({})
    setMixedTitle('')
    setStarted(false)
    setResults(null)
    setQuizQuestions(null)
  }

  function startQuiz(questions) {
    setQuizQuestions(questions)
    setResults(null)
    setStarted(true)
    setAttemptKey(k => k + 1)
  }

  function handleComplete(answers) {
    setResults(answers)
    // Only full runs count toward the saved best score
    if (selectedBook && quizQuestions?.length === selectedBook.quiz.length) {
      const correct = answers.filter(a => a.isCorrect).length
      recordResult(selectedBook.id, correct, selectedBook.quiz.length)
    }
  }

  function retryMissed() {
    const missed = results
      .filter(r => !r.isCorrect)
      .map(r => quizQuestions[r.questionIndex])
    startQuiz(missed)
  }

  function startSelectedQuiz() {
    if (!selectedBook) return
    const requestedLength = quizLength === 'all' ? selectedBook.quiz.length : Number(quizLength)
    const source = shuffleQuestions ? shuffled(selectedBook.quiz) : [...selectedBook.quiz]
    startQuiz(source.slice(0, Math.min(requestedLength, source.length)))
  }

  function startMixedQuiz() {
    const sourceBooks = mixedGenre === 'all'
      ? booksWithQuiz
      : booksWithQuiz.filter(book => book.genres?.includes(mixedGenre))
    const pool = sourceBooks.flatMap(book =>
      book.quiz.map(question => ({ ...question, sourceTitle: book.title, sourceAuthor: book.author })),
    )
    const questions = (shuffleQuestions ? shuffled(pool) : pool).slice(0, Math.min(mixedLength, pool.length))
    const genreLabel = MIXED_GENRES.find(item => item.id === mixedGenre)?.label || 'Romance'
    setMixedTitle(`${genreLabel} marathon`)
    startQuiz(questions)
  }

  if (!selectedBook && !mixedTitle) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="app-panel p-6 md:p-8 mb-8">
          <p className="font-heading text-[var(--primary)] text-xs tracking-[0.28em] uppercase mb-2">Quiz studio</p>
          <h1 className="section-title text-3xl md:text-4xl mb-2">Build your perfect book challenge.</h1>
          <p className="font-body text-zinc-400 text-lg mb-6">
            Pick one book or create a longer mixed challenge. Every quiz contains spoilers.
          </p>

          <div className="relative w-full max-w-md">
            <label htmlFor="quiz-search" className="sr-only">Search available book quizzes</label>
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              id="quiz-search"
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="booktok-input w-full pl-10 pr-4 py-3"
            />
          </div>
        </div>

        <section className="quiz-marathon-panel mb-10" aria-labelledby="marathon-heading">
          <div>
            <span className="quiz-marathon-kicker">Long-form challenge</span>
            <h2 id="marathon-heading">Mix books into a marathon quiz.</h2>
            <p>Build a 10, 20, or 30-question challenge across the full catalog or one romance world.</p>
          </div>
          <div className="quiz-marathon-controls">
            <div>
              <label htmlFor="mixed-genre">Question pool</label>
              <select id="mixed-genre" value={mixedGenre} onChange={event => setMixedGenre(event.target.value)}>
                {MIXED_GENRES.map(option => <option key={option.id} value={option.id}>{option.label}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="mixed-length">Challenge length</label>
              <select id="mixed-length" value={mixedLength} onChange={event => setMixedLength(Number(event.target.value))}>
                <option value="10">10 questions</option>
                <option value="20">20 questions</option>
                <option value="30">30 questions</option>
              </select>
            </div>
            <label className="quiz-marathon-check"><input type="checkbox" checked={shuffleQuestions} onChange={event => setShuffleQuestions(event.target.checked)} /> Shuffle questions</label>
            <label className="quiz-marathon-check"><input type="checkbox" checked={showExplanations} onChange={event => setShowExplanations(event.target.checked)} /> Show explanations</label>
            <button type="button" onClick={startMixedQuiz}>Start marathon</button>
          </div>
        </section>

        <p className="font-body text-zinc-500 text-sm mb-4">
          {filteredBooks.length} reviewed quizzes available
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredBooks.slice(0, visibleCount).map((book) => {
            const score = getScore(book.id)
            const isPerfect = score && score.best === score.total
            return (
              <button
                key={book.id}
                onClick={() => selectBook(book.id)}
                className="book-card text-left cursor-pointer relative"
              >
                {score && (
                  <span
                    className={`absolute top-2 right-2 z-10 font-heading text-[11px] tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-sm ${
                      isPerfect
                        ? 'border-emerald-400/60 bg-emerald-500/20 text-emerald-300'
                        : 'border-white/25 bg-black/50 text-white/90'
                    }`}
                  >
                    {isPerfect ? '✓ ' : ''}Best {score.best}/{score.total}
                  </span>
                )}
                <div className="relative overflow-hidden">
                  <SmartBookCover book={book} />
                  <div className="overlay">
                    <h3 className="font-heading text-base leading-tight text-white mb-1">{book.title}</h3>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-400 mb-2">{book.author}</p>
                    <div className="flex items-center justify-between gap-2">
                      <SpiceRating level={book.spiceLevel} />
                      <span className="text-[11px] text-white/75">{book.quiz.length} {book.quiz.length === 1 ? 'question' : 'questions'}</span>
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
        {visibleCount < filteredBooks.length && (
          <div className="text-center mt-8">
            <button type="button" className="booktok-button min-h-11 px-7 py-3 font-heading text-xs tracking-widest uppercase" onClick={() => setVisibleCount(count => count + 24)}>
              Show 24 more ({filteredBooks.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>
    )
  }

  const bestScore = selectedBook ? getScore(selectedBook.id) : null
  const activeTitle = selectedBook?.title || mixedTitle

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <button
        onClick={backToPicker}
        className="flex items-center gap-2 font-body text-muted text-sm hover:text-gold transition-colors mb-8 cursor-pointer"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Choose a different quiz
      </button>

      <div className="text-center mb-8 app-panel p-6 md:p-8">
        <h1
          className="section-title text-3xl md:text-4xl mb-2"
          style={{ color: selectedBook?.accentColor || '#ff2e88' }}
        >
          {activeTitle}
        </h1>
        <p className="font-body text-zinc-400">
          {selectedBook ? `by ${selectedBook.author} · ${selectedBook.quiz.length} questions available` : `${quizQuestions?.length || mixedLength} questions across multiple books`}
          {bestScore && (
            <span> &middot; Your best: {bestScore.best}/{bestScore.total}</span>
          )}
        </p>
      </div>

      <div className="divider-ornament mb-10">&#10022;</div>

      {!started ? (
        <div className="max-w-2xl mx-auto app-panel p-8">
          <p className="text-4xl mb-4" aria-hidden="true">🙈</p>
          <h3 className="font-heading text-white text-xl tracking-[0.15em] uppercase mb-3">Customize your quiz</h3>
          <p className="font-body text-zinc-400 mb-8">
            This quiz gives away major plot points of <span className="text-white italic">{activeTitle}</span> — including endings.
          </p>
          {selectedBook && (
            <fieldset className="quiz-length-options mb-6">
              <legend>Choose a length</legend>
              {[5, 10, 15].filter(length => length < selectedBook.quiz.length).map(length => (
                <label key={length}>
                  <input type="radio" name="quiz-length" value={length} checked={String(quizLength) === String(length)} onChange={event => setQuizLength(event.target.value)} />
                  <span><strong>{length}</strong><small>{length === 5 ? 'Quick' : length === 10 ? 'Standard' : 'Long'}</small></span>
                </label>
              ))}
              <label>
                <input type="radio" name="quiz-length" value="all" checked={quizLength === 'all'} onChange={() => setQuizLength('all')} />
                <span><strong>{selectedBook.quiz.length}</strong><small>Full book</small></span>
              </label>
            </fieldset>
          )}
          <div className="quiz-preferences mb-8">
            <label><input type="checkbox" checked={shuffleQuestions} onChange={event => setShuffleQuestions(event.target.checked)} /> Shuffle question order</label>
            <label><input type="checkbox" checked={showExplanations} onChange={event => setShowExplanations(event.target.checked)} /> Show explanations after each answer</label>
          </div>
          <button
            onClick={selectedBook ? startSelectedQuiz : () => startQuiz(quizQuestions)}
            className="booktok-button font-heading text-sm tracking-[0.22em] uppercase px-10 py-3 transition-all cursor-pointer"
          >
            I&apos;ve read it — start quiz
          </button>
        </div>
      ) : results ? (
        <ResultsScreen
          results={results}
          questions={quizQuestions}
          bookTitle={activeTitle}
          onRetry={() => startQuiz(quizQuestions)}
          onRetryMissed={retryMissed}
        />
      ) : (
        <QuizRunner
          key={attemptKey}
          questions={quizQuestions}
          onComplete={handleComplete}
          showExplanations={showExplanations}
        />
      )}
    </div>
  )
}
