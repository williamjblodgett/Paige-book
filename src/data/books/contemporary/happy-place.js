export default {
  id: "happy-place",
  title: "Happy Place",
  author: "Emily Henry",
  genres: ["contemporary-romance", "romantic-comedy"],
  themes: ["second-chance", "fake-dating", "forced-proximity", "friends-to-lovers"],
  spiceLevel: 4,
  coverGradient: ["#a8dadc", "#457b9d"],
  accentColor: "#c45b84",
  synopsis: `Harriet Kilpatrick and Wyn Connor were the perfect couple. College sweethearts who fit together seamlessly, they were the golden pair in their tight-knit friend group. Their annual week-long vacation to a cottage in Knott's Harbor, Maine, was the highlight of everyone's year—a sacred tradition that bonded six friends together through the chaos of adult life.

But Harriet and Wyn broke up six months ago, and they haven't told anyone. Not their friends, not their families—nobody. The split was quiet and devastating, and neither of them has been able to face the fallout of announcing it to the people who loved them as a unit.

Now it's vacation week again, and their friends have a special announcement: this is the last trip to the cottage, which is being sold. It's supposed to be a meaningful goodbye, a celebration of their years of friendship and tradition. The last thing Harriet and Wyn want to do is ruin it with their breakup news. So they make a desperate decision: they'll pretend they're still together for one final week.

What follows is an exquisitely awkward exercise in forced proximity. Sharing a bedroom, holding hands in front of friends, and performing the choreography of a couple who knows each other intimately—all while nursing broken hearts. As the days pass and old memories resurface, Harriet and Wyn are forced to confront why they really fell apart.

Harriet, a surgical resident who has spent her life following the plan she thought would make her happy, begins to question whether she's been living for herself or for everyone else's expectations. Wyn, a laid-back carpenter who walked away from his own ambitions, must reckon with the walls he built around his heart. Happy Place is an aching, tender exploration of what happens when the life you planned and the life you want turn out to be two very different things.`,
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
