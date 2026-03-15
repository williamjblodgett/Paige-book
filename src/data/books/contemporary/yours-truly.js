export default {
  id: "yours-truly",
  title: "Yours Truly",
  author: "Abby Jimenez",
  genres: ["contemporary-romance", "medical-romance"],
  themes: ["fake-dating", "grumpy-sunshine", "slow-burn", "he-falls-first"],
  spiceLevel: 3,
  coverGradient: ["#ffd6a5", "#ff8fab"],
  accentColor: "#c45b84",
  synopsis: `Dr. Briana Ortiz is having the worst year of her life. Brutal divorce. Lost the promotion she'd been working toward for years. And the new doctor who got the job instead — Dr. Jacob Maddox — is about to become her daily reminder of everything that went wrong. She's determined to hate him on principle.

But Jacob isn't what she expected. He's quiet, awkward, and clearly uncomfortable in social situations. He communicates best through handwritten letters — a quirk Briana initially finds bizarre but gradually comes to treasure. When they discover they each need a favor only the other can provide, they strike a deal: fake relationship, mutual benefit, no real feelings.

Their arrangement is supposed to be clinical. Simple. But the letters keep coming — thoughtful, vulnerable, and increasingly personal. Jacob pours himself onto the page in ways he can't manage face-to-face, and Briana finds herself falling for the man behind the pen long before she's ready to admit it. She's not sure she can trust again after her marriage. He's not sure he'll ever be enough for someone as vibrant as her. But sometimes the quietest love is the most powerful — if you're brave enough to let it in.`,
  characters: [
    { name: "Briana Ortiz", role: "Protagonist, ER doctor going through a difficult divorce" },
    { name: "Jacob Maddox", role: "Love interest, quiet new doctor who communicates through letters" },
    { name: "Nick", role: "Briana's ex-husband" },
    { name: "Benny", role: "Jacob's brother who needs a kidney transplant" },
    { name: "Alexis Montgomery", role: "Briana's colleague and friend (from Part of Your World)" }
  ],
  terms: [
    { term: "Fake Dating", category: "Romance Trope", definition: "When two characters agree to pretend to be in a relationship for mutual benefit, leading to real romantic feelings." },
    { term: "Epistolary Romance", category: "Narrative Device", definition: "A love story that develops partly through written correspondence, allowing deeper emotional expression." },
    { term: "Grumpy-Sunshine", category: "Romance Trope", definition: "A dynamic where one partner is outgoing and warm while the other is reserved and quiet, creating complementary chemistry." },
    { term: "Social Anxiety", category: "Character Trait", definition: "A condition where a character experiences significant discomfort in social situations, affecting how they express themselves." },
    { term: "He Falls First", category: "Romance Trope", definition: "When the male love interest recognizes and acts on his feelings before the female protagonist realizes her own." }
  ],
  quiz: [
    {
      id: 1,
      question: "Why does Briana initially dislike Jacob?",
      options: ["He was rude to her", "He got the promotion she wanted", "He's her ex-husband's friend", "He transferred from a rival hospital"],
      correctIndex: 1,
      explanation: "Briana resents Jacob because he received the promotion she had been working toward, becoming a daily reminder of her disappointment."
    },
    {
      id: 2,
      question: "How does Jacob prefer to communicate?",
      options: ["Phone calls", "Text messages", "Handwritten letters", "Social media"],
      correctIndex: 2,
      explanation: "Jacob communicates best through handwritten letters, expressing vulnerability and depth he can't manage in face-to-face conversation."
    },
    {
      id: 3,
      question: "What does Jacob need from the fake dating arrangement?",
      options: ["To make his ex jealous", "To convince his family he's stable so his brother will accept a kidney", "To get a promotion", "To avoid an arranged marriage"],
      correctIndex: 1,
      explanation: "Jacob needs his family to believe he's in a happy relationship so his brother Benny will agree to accept a kidney donation from him."
    },
    {
      id: 4,
      question: "What is Briana going through personally?",
      options: ["A career change", "A brutal divorce", "Moving to a new city", "Recovering from an illness"],
      correctIndex: 1,
      explanation: "Briana is enduring a painful divorce on top of losing the promotion, making it the worst year of her life."
    },
    {
      id: 5,
      question: "What does Jacob struggle with socially?",
      options: ["A language barrier", "Social anxiety", "Hearing loss", "Trust issues from a past relationship"],
      correctIndex: 1,
      explanation: "Jacob has social anxiety that makes face-to-face interactions difficult, which is why he expresses himself better through writing."
    },
    {
      id: 6,
      question: "What profession do both main characters share?",
      options: ["Lawyers", "Teachers", "Doctors", "Engineers"],
      correctIndex: 2,
      explanation: "Both Briana and Jacob are doctors working at the same hospital, which creates the forced proximity of their daily interactions."
    },
    {
      id: 7,
      question: "Who is Benny?",
      options: ["Briana's brother", "Jacob's brother who needs a kidney transplant", "Their hospital administrator", "Briana's divorce lawyer"],
      correctIndex: 1,
      explanation: "Benny is Jacob's brother who needs a kidney transplant, which is the driving motivation behind Jacob's participation in the fake dating arrangement."
    }
  ]
};
