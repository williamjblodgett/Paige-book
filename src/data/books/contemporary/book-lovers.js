export default {
  id: "book-lovers",
  title: "Book Lovers",
  author: "Emily Henry",
  genres: ["contemporary-romance", "romantic-comedy"],
  themes: ["enemies-to-lovers", "workplace", "small-town", "slow-burn"],
  spiceLevel: 3,
  coverGradient: ["#d4a5a5", "#9b2335"],
  accentColor: "#c45b84",
  synopsis: `Nora Stephens is a cutthroat literary agent in New York City. She's the woman other people love to hate—ambitious, sharp, and unapologetically devoted to her career. In the romance novels she represents, she'd be the villain: the big-city workaholic who loses the guy to the charming small-town girl. And she's made her peace with that.

When Nora's beloved younger sister Libby begs her to take a sisters' trip to Sunshine Falls, North Carolina, Nora reluctantly agrees. Libby has planned a full itinerary designed to give them a Hallmark-movie-worthy small-town experience, complete with quaint bookshops, cozy diners, and friendly locals. Nora expects to be thoroughly bored.

What she doesn't expect is to keep running into Charlie Lastra, a grumpy, sharp-tongued book editor she's clashed with professionally for years. Charlie is everything Nora finds infuriating—blunt, uncompromising, and allergic to small talk. Yet somehow, in the laid-back setting of Sunshine Falls, their combative dynamic begins to shift into something unexpected.

As Nora and Charlie are thrown together again and again—in a bookshop, at a local festival, during a rainstorm—they start to see past each other's prickly exteriors. Nora discovers that Charlie's gruffness masks a deep passion for books and a painful personal history. Charlie realizes that Nora's tough exterior protects a woman who has spent her entire life putting everyone else first, especially her sister.

But Nora has always been the supporting character in other people's stories, never the heroine. Learning to put herself first—to believe she deserves her own happy ending—might be the hardest thing she's ever done. Book Lovers is a smart, swoony love letter to the women who are usually cast as the villains, proving that the driven career woman absolutely deserves to be the star of her own love story.`,
  characters: [
    { name: "Nora Stephens", role: "Protagonist, ambitious literary agent from New York" },
    { name: "Charlie Lastra", role: "Love interest, grumpy book editor" },
    { name: "Libby Stephens", role: "Nora's younger sister who plans the trip" },
    { name: "Brendan", role: "Libby's husband" },
    { name: "Sally Goode", role: "Sunshine Falls local and bookshop owner" }
  ],
  terms: [
    { term: "Grumpy-Sunshine", category: "Romance Trope", definition: "A pairing where one character is cheerful and optimistic while the other is brooding or irritable, creating a compelling contrast." },
    { term: "Fish Out of Water", category: "Plot Device", definition: "A character placed in an unfamiliar environment, leading to humorous or transformative experiences." },
    { term: "Small-Town Romance", category: "Romance Subgenre", definition: "A love story set in a close-knit community where the setting itself plays a significant role in bringing characters together." },
    { term: "Career Woman Heroine", category: "Character Archetype", definition: "A female protagonist defined by her professional ambition, challenging the trope that career-driven women can't find love." },
    { term: "Forced Proximity", category: "Romance Trope", definition: "A scenario where characters are repeatedly thrown together by circumstances, accelerating their romantic tension." }
  ],
  quiz: [
    {
      id: 1,
      question: "What is Nora's profession?",
      options: ["Book editor", "Novelist", "Literary agent", "Bookshop owner"],
      correctIndex: 2,
      explanation: "Nora is a literary agent in New York City, known for being ambitious and fiercely dedicated to her authors."
    },
    {
      id: 2,
      question: "Where do Nora and Libby take their sisters' trip?",
      options: ["Savannah, Georgia", "Sunshine Falls, North Carolina", "Bar Harbor, Maine", "Asheville, North Carolina"],
      correctIndex: 1,
      explanation: "Libby plans their trip to Sunshine Falls, North Carolina, hoping for a picture-perfect small-town experience."
    },
    {
      id: 3,
      question: "What is Charlie Lastra's job?",
      options: ["Local farmer", "Book editor", "Town mayor", "Bookshop owner"],
      correctIndex: 1,
      explanation: "Charlie is a book editor who has clashed with Nora professionally, making their unexpected encounters in Sunshine Falls all the more charged."
    },
    {
      id: 4,
      question: "In romance novel terms, what role does Nora typically identify with?",
      options: ["The heroine", "The best friend", "The villain", "The matchmaker"],
      correctIndex: 2,
      explanation: "Nora sees herself as the character who'd be the villain in a romance novel—the big-city career woman who loses the guy to the small-town girl."
    },
    {
      id: 5,
      question: "Who is Libby to Nora?",
      options: ["Her best friend", "Her younger sister", "Her colleague", "Her roommate"],
      correctIndex: 1,
      explanation: "Libby is Nora's beloved younger sister, and their relationship is central to the emotional core of the novel."
    },
    {
      id: 6,
      question: "What kind of experience did Libby plan for the trip?",
      options: ["A luxury spa retreat", "A Hallmark-movie small-town experience", "A literary conference tour", "A camping adventure"],
      correctIndex: 1,
      explanation: "Libby designed their itinerary to be a Hallmark-movie-worthy small-town experience with bookshops, diners, and local charm."
    },
    {
      id: 7,
      question: "How would you describe Charlie's personality?",
      options: ["Outgoing and charming", "Grumpy and blunt", "Shy and quiet", "Laid-back and funny"],
      correctIndex: 1,
      explanation: "Charlie is described as grumpy, blunt, and uncompromising, though Nora discovers there's much more beneath his prickly exterior."
    }
  ]
};
