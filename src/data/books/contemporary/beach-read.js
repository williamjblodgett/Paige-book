export default {
  id: "beach-read",
  title: "Beach Read",
  author: "Emily Henry",
  genres: ["contemporary-romance", "literary-fiction"],
  themes: ["enemies-to-lovers", "opposites-attract", "slow-burn"],
  spiceLevel: 3,
  coverGradient: ["#f4a261", "#e76f51"],
  accentColor: "#c45b84",
  synopsis: `January Andrews is a literary fiction writer who has just discovered that her recently deceased father led a secret double life, complete with another woman and a beach house in a small Michigan town. Reeling from the betrayal, she finds herself unable to write the happy endings she's known for.

Augustus Everett, her college rival and now a bestselling literary fiction author, happens to live right next door for the summer. He's brooding, sharp-tongued, and writes dark, depressing novels that couldn't be more different from January's bright, hopeful romances.

When both writers find themselves stuck with debilitating writer's block, they strike an unlikely deal: they'll swap genres for the summer. January will write Augustus's brand of literary fiction, and he'll try his hand at a romance novel. They'll even help each other research by exploring each other's worlds—she'll visit the dark, haunted places that inspire him, and he'll experience the sunny, joyful side of life that fuels her stories.

As their research dates blur the lines between fiction and reality, January and Augustus begin to see each other—and themselves—in an entirely new light. But January is still grappling with the devastating truths about her father, and Augustus carries his own painful secrets that have shaped the darkness in his writing.

What starts as a competitive bet between two very different writers transforms into something far more profound. They must each confront their deepest fears about love, loss, and whether it's possible to find a happy ending when real life is so much messier than fiction. Beach Read is a witty, emotionally rich story about two people who challenge each other to look beyond their carefully constructed narratives and embrace the complicated, beautiful truth of falling in love.`,
  characters: [
    { name: "January Andrews", role: "Protagonist, romance novelist facing writer's block" },
    { name: "Augustus Everett", role: "Love interest, literary fiction author and college rival" },
    { name: "Shadi", role: "January's best friend and confidante" },
    { name: "Pete", role: "January's late father whose secrets upend her world" },
    { name: "Sonya", role: "The other woman in January's father's double life" }
  ],
  terms: [
    { term: "Genre Swap", category: "Plot Device", definition: "When two characters exchange their usual roles or approaches, leading to personal growth and unexpected connections." },
    { term: "Writer's Block", category: "Literary Theme", definition: "A creative condition where an author is unable to produce new work, often triggered by emotional turmoil or self-doubt." },
    { term: "Enemies-to-Lovers", category: "Romance Trope", definition: "A relationship arc where two characters who initially dislike each other gradually develop romantic feelings." },
    { term: "Beach Setting", category: "Setting", definition: "A coastal location that serves as the backdrop for emotional transformation and summer romance." },
    { term: "Dual POV", category: "Narrative Technique", definition: "A storytelling approach that alternates between two characters' perspectives to build tension and intimacy." }
  ],
  quiz: [
    {
      id: 1,
      question: "What deal do January and Augustus make for the summer?",
      options: ["To co-write a novel together", "To swap genres and write each other's type of fiction", "To compete for a publishing deal", "To ghostwrite for each other"],
      correctIndex: 1,
      explanation: "January and Augustus agree to swap genres—she'll write literary fiction while he attempts a romance novel, using research 'dates' to explore each other's worlds."
    },
    {
      id: 2,
      question: "What devastating secret does January discover about her father?",
      options: ["He was a failed novelist", "He led a double life with another woman", "He had gambling debts", "He faked his own death"],
      correctIndex: 1,
      explanation: "January learns that her father had a secret relationship and a beach house, shattering her belief in the perfect love story her parents represented."
    },
    {
      id: 3,
      question: "What genre does January typically write?",
      options: ["Thriller", "Literary fiction", "Romance", "Mystery"],
      correctIndex: 2,
      explanation: "January is known as a romance novelist who writes happy endings, which makes her father's betrayal and the genre swap especially challenging."
    },
    {
      id: 4,
      question: "Where does the story primarily take place?",
      options: ["New York City", "A small Michigan beach town", "Los Angeles", "A writers' retreat in Vermont"],
      correctIndex: 1,
      explanation: "The story is set in a small town on the shores of Lake Michigan, where January and Augustus end up as next-door neighbors for the summer."
    },
    {
      id: 5,
      question: "How do January and Augustus know each other before the summer?",
      options: ["They're ex-lovers", "They were rivals in college", "They share the same publisher", "They met at a book signing"],
      correctIndex: 1,
      explanation: "January and Augustus were rivals during their college years, establishing the competitive dynamic that carries into their adult relationship."
    },
    {
      id: 6,
      question: "What type of fiction does Augustus write?",
      options: ["Romance novels", "Children's books", "Dark literary fiction", "Science fiction"],
      correctIndex: 2,
      explanation: "Augustus is known for writing dark, depressing literary fiction—the opposite of January's hopeful romance novels."
    },
    {
      id: 7,
      question: "Who is Shadi in the story?",
      options: ["January's sister", "Augustus's ex-girlfriend", "January's best friend", "A local bookshop owner"],
      correctIndex: 2,
      explanation: "Shadi is January's best friend who provides emotional support and a sounding board throughout the story."
    }
  ]
};
