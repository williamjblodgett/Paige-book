# The Eating Woods -- Companion Guide

A gothic dark fantasy companion site for Keri Lake's *The Eating Woods* trilogy (Anathema, Eldritch, Vasmora). Built with React, Vite, and Tailwind CSS.

## Features

- **Glossary** with spoiler protection -- select which books you've read before viewing terms
- **Book Summaries** with per-book spoiler gates
- **Quizzes** with immediate feedback and score tracking
- Immersive gothic aesthetic with fog animations and themed typography

## Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:5173/Paige-book/ in your browser.

## Editing Content

All content lives in plain JavaScript files under `src/data/`. Look for `[ PLACEHOLDER ]` markers to find content that needs to be filled in.

### Glossary Terms

Edit `src/data/glossary.js`. Each term follows this structure:

```js
{
  id: 1,                    // Unique number
  term: "Term Name",        // The glossary term
  book: "Anathema",         // Which book: "Anathema", "Eldritch", or "Vasmora"
  definition: "Definition"  // The term's definition
}
```

### Book Summaries

Edit `src/data/summaries.js`. Each book has a title, tagline, summary text, and key characters list.

### Quiz Questions

Edit `src/data/quizzes.js`. Each question has:

```js
{
  id: 1,
  question: "Question text?",
  options: ["A", "B", "C", "D"],  // Exactly 4 options
  correctIndex: 0,                 // 0-3, index of correct option
  explanation: "Why this is correct"
}
```

## Deploy to GitHub Pages

The site deploys automatically when you push to the `main` branch via the GitHub Actions workflow in `.github/workflows/deploy.yml`.

To set up GitHub Pages:

1. Go to your repo Settings > Pages
2. Under "Build and deployment", select "GitHub Actions" as the source
3. Push to `main` and the workflow will build and deploy automatically

The site will be available at `https://williamjblodgett.github.io/Paige-book/`

## Tech Stack

- React 19
- Vite 6
- Tailwind CSS 4
- React Router 7 (HashRouter)
