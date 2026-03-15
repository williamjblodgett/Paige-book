export default {
  id: "happy-place",
  title: "Happy Place",
  author: "Emily Henry",
  genres: ["contemporary-romance", "romantic-comedy"],
  themes: ["second-chance", "fake-dating", "forced-proximity", "friends-to-lovers"],
  spiceLevel: 4,
  coverGradient: ["#a8dadc", "#457b9d"],
  accentColor: "#c45b84",
  synopsis: `They broke up six months ago. Nobody knows.

Harriet and Wyn were the golden couple — college sweethearts, the pair everyone envied, the ones who made love look effortless. Every year, they joined their closest friends for a week at a cottage in Knott's Harbor, Maine. It was tradition. It was sacred. It was the happiest place on earth.

But this year, their friends have news: the cottage is being sold. This is the last trip. And Harriet and Wyn would rather fake an entire relationship for a week than ruin their friends' farewell.

What follows is an exquisitely painful charade. Sharing a bedroom. Holding hands at dinner. Performing the intimate choreography of a couple who once knew each other better than anyone — while nursing the broken hearts they're hiding from everyone, including maybe themselves.

But a week of pretending has a way of dredging up everything they've been avoiding. The memories. The inside jokes. The reasons they fell in love in the first place — and the reasons they fell apart. As the line between performance and feeling blurs with every passing day, one devastating question rises to the surface:

Did they actually fall out of love? Or did they just lose their way?`,
  characters: [
    { name: "Harriet Kilpatrick", role: "Protagonist, surgical resident who follows the plan" },
    { name: "Wyn Connor", role: "Love interest, laid-back carpenter and Harriet's ex" },
    { name: "Sabrina", role: "Friend in the group, Harriet's closest confidante" },
    { name: "Cleo", role: "Friend in the group, free-spirited and warm" },
    { name: "Parth", role: "Friend in the group, Sabrina's partner" },
    { name: "Kimmy", role: "Friend in the group, Cleo's partner" }
  ],
  terms: [
    { term: "Fake Dating", category: "Romance Trope", definition: "When two people pretend to be in a romantic relationship, often leading to real feelings developing or resurfacing." },
    { term: "Forced Proximity", category: "Romance Trope", definition: "A situation where characters are stuck in close quarters, intensifying emotional tension and unresolved feelings." },
    { term: "Second-Chance Romance", category: "Romance Trope", definition: "A love story where former partners reunite and get another opportunity to make their relationship work." },
    { term: "Found Family", category: "Theme", definition: "A close friend group that functions as a chosen family, providing love and support outside biological ties." },
    { term: "Identity Crisis", category: "Character Theme", definition: "A period where a character questions their life choices and whether they've been living authentically." }
  ],
  quiz: [
    {
      id: 1,
      question: "Why do Harriet and Wyn pretend to still be together?",
      options: ["To win a couples' contest", "To avoid ruining their friends' last vacation at the cottage", "To make their exes jealous", "Their parents arranged the trip"],
      correctIndex: 1,
      explanation: "Since the cottage is being sold and this is the last trip, Harriet and Wyn don't want to ruin the farewell by revealing their breakup."
    },
    {
      id: 2,
      question: "How long ago did Harriet and Wyn actually break up?",
      options: ["Two weeks", "Three months", "Six months", "One year"],
      correctIndex: 2,
      explanation: "They broke up six months before the vacation but kept it secret from everyone in their friend group."
    },
    {
      id: 3,
      question: "Where is the annual vacation cottage located?",
      options: ["Cape Cod, Massachusetts", "Knott's Harbor, Maine", "Montauk, New York", "Outer Banks, North Carolina"],
      correctIndex: 1,
      explanation: "The friend group's annual vacation takes place at a cottage in Knott's Harbor, Maine."
    },
    {
      id: 4,
      question: "What is Harriet's profession?",
      options: ["Lawyer", "Teacher", "Surgical resident", "Architect"],
      correctIndex: 2,
      explanation: "Harriet is a surgical resident who has spent her life following a carefully laid plan for her career and future."
    },
    {
      id: 5,
      question: "What does Wyn do for a living?",
      options: ["He's a doctor", "He's a carpenter", "He's a professor", "He's a chef"],
      correctIndex: 1,
      explanation: "Wyn is a laid-back carpenter, having stepped away from more traditional career ambitions."
    },
    {
      id: 6,
      question: "Why is this particular vacation significant?",
      options: ["It's their tenth anniversary trip", "Someone is getting married", "The cottage is being sold", "They're celebrating a graduation"],
      correctIndex: 2,
      explanation: "The cottage is being sold, making this the final vacation at the beloved location—which is why Harriet and Wyn feel they can't reveal their breakup."
    },
    {
      id: 7,
      question: "What awkward situation does the fake dating create?",
      options: ["They have to plan a fake wedding", "They have to share a bedroom", "They have to meet each other's new partners", "They have to write love letters"],
      correctIndex: 1,
      explanation: "As a 'couple,' Harriet and Wyn must share a bedroom and maintain the physical intimacy expected of partners in front of their friends."
    }
  ]
};
