export default {
  id: "book-lovers",
  title: "Book Lovers",
  author: "Emily Henry",
  genres: ["contemporary-romance", "romantic-comedy"],
  themes: ["enemies-to-lovers", "workplace", "small-town", "slow-burn"],
  spiceLevel: 3,
  coverGradient: ["#d4a5a5", "#9b2335"],
  accentColor: "#c45b84",
  synopsis: `In every romance novel Nora Stephens has ever read, the ambitious career woman is the villain. She loses the guy to the sweet small-town girl every single time. Nora should know — as a cutthroat New York literary agent, she's practically the template.

So when her sister Libby drags her to Sunshine Falls, North Carolina, for the ultimate Hallmark-movie vacation, Nora knows exactly how this story goes. She does not expect to keep running into Charlie Lastra, a grumpy book editor she's clashed with for years. He's blunt, infuriating, and has zero patience for pleasantries. And yet, between the bookshops and the summer rainstorms and the small-town festivals, something shifts. Their sparring starts to feel less like combat and more like foreplay.

But Nora has spent her whole life playing the supporting role — the reliable sister, the tireless agent, the woman who puts everyone else first. She's never been the one who gets the happy ending.

What if the driven, ambitious woman isn't the villain after all? What if she's been the heroine of her own story all along — and just needs someone grumpy enough to see it?`,
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
