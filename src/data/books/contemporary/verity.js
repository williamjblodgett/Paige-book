export default {
  id: "verity",
  title: "Verity",
  author: "Colleen Hoover",
  genres: ["contemporary-romance", "psychological-thriller"],
  themes: ["forbidden-love", "slow-burn", "opposites-attract"],
  spiceLevel: 5,
  coverGradient: ["#1a1a2e", "#950740"],
  accentColor: "#c45b84",
  synopsis: `Lowen Ashleigh is a struggling writer on the verge of financial collapse when she receives an offer she can't refuse. Jeremy Crawford, husband of bestselling author Verity Crawford, needs someone to finish his wife's blockbuster series. Verity can't do it herself — a devastating accident has left her unresponsive, confined to a bed in the couple's Vermont home.

Lowen moves in to sort through Verity's notes and outlines. But buried among the files, she discovers something she was never meant to find: an unfinished manuscript. Verity's own autobiography.

What's written in those pages changes everything.

Page by page, Lowen descends into the mind of a woman whose confessions are so dark, so disturbing, that they shatter every assumption about this family. And as the manuscript pulls her deeper, Lowen finds herself falling for Jeremy — a grieving, devoted husband who has no idea what his wife wrote.

She's torn between the man she's growing to love and the horrifying truth she's uncovering. Should she show Jeremy the manuscript and destroy what's left of his world? Or protect him from secrets that could consume them both?

And then there's Verity. Lying motionless in her bed upstairs.

Or is she?`,
  characters: [
    { name: "Lowen Ashleigh", role: "Protagonist, struggling writer hired to finish Verity's book series" },
    { name: "Jeremy Crawford", role: "Love interest, Verity's husband and grieving father" },
    { name: "Verity Crawford", role: "Antagonist, bestselling author with a horrifying secret manuscript" },
    { name: "Crew", role: "Jeremy and Verity's surviving young son" },
    { name: "Corey", role: "Lowen's literary agent" }
  ],
  terms: [
    { term: "Unreliable Narrator", category: "Literary Device", definition: "A storytelling technique where the narrator's credibility is compromised, leaving readers unsure what to believe." },
    { term: "Manuscript Within a Manuscript", category: "Narrative Structure", definition: "A story-within-a-story device where a discovered document reveals hidden truths that reshape the main narrative." },
    { term: "Gothic Romance", category: "Genre Element", definition: "A romance subgenre featuring dark settings, psychological tension, and an atmosphere of mystery and dread." },
    { term: "Psychological Thriller", category: "Genre", definition: "A suspense-driven narrative that explores the darker aspects of human psychology, perception, and deception." },
    { term: "Moral Ambiguity", category: "Theme", definition: "A narrative quality where characters and their choices exist in ethical gray areas, denying readers simple judgments." }
  ],
  quiz: [
    {
      id: 1,
      question: "Why is Lowen hired by Jeremy Crawford?",
      options: ["To be Verity's caretaker", "To investigate the family", "To complete Verity's unfinished book series", "To write Verity's biography"],
      correctIndex: 2,
      explanation: "Lowen is hired to finish the remaining books in Verity's bestselling series after Verity is left incapacitated by a car accident."
    },
    {
      id: 2,
      question: "What does Lowen discover hidden among Verity's belongings?",
      options: ["A diary of love letters", "An unfinished autobiography with dark confessions", "Evidence of a crime", "A secret will"],
      correctIndex: 1,
      explanation: "Lowen finds a hidden manuscript—an unfinished autobiography containing bone-chilling revelations about Verity's marriage and her daughters' deaths."
    },
    {
      id: 3,
      question: "What happened to Verity?",
      options: ["She disappeared", "She's in prison", "She was injured in a car accident and is unresponsive", "She's in hiding"],
      correctIndex: 2,
      explanation: "Verity suffered catastrophic injuries in a car accident and now lies unresponsive in the family home, requiring constant care."
    },
    {
      id: 4,
      question: "What dilemma does Lowen face regarding the manuscript?",
      options: ["Whether to publish it for money", "Whether to show Jeremy and shatter his world or protect him", "Whether to give it to the police", "Whether to finish writing it"],
      correctIndex: 1,
      explanation: "Lowen must decide whether to reveal the manuscript's horrifying contents to Jeremy or protect him from the truth about his wife."
    },
    {
      id: 5,
      question: "What genre blend makes Verity unique?",
      options: ["Romance and science fiction", "Romance and psychological thriller", "Romance and fantasy", "Romance and historical fiction"],
      correctIndex: 1,
      explanation: "Verity uniquely blends dark romance with psychological thriller elements, blurring the line between love story and horror."
    },
    {
      id: 6,
      question: "Where does Lowen stay while working on the books?",
      options: ["A nearby hotel", "The Crawford mansion in Vermont", "Her own apartment", "Verity's publisher's office"],
      correctIndex: 1,
      explanation: "Lowen moves into the Crawford mansion in Vermont to sort through Verity's notes, placing her in close proximity to both Jeremy and the incapacitated Verity."
    },
    {
      id: 7,
      question: "What unsettling question does the story raise about Verity?",
      options: ["Whether she actually wrote her books", "Whether she's truly unresponsive or faking it", "Whether she has a twin sister", "Whether she's actually Lowen's mother"],
      correctIndex: 1,
      explanation: "The novel plants seeds of doubt about whether Verity is truly incapacitated, adding a layer of dread to every scene set in the house."
    },
    {
      id: 8,
      question: "Who is Crew?",
      options: ["Jeremy's brother", "Lowen's agent", "Jeremy and Verity's surviving son", "The family's lawyer"],
      correctIndex: 2,
      explanation: "Crew is the Crawfords' surviving young son, adding emotional stakes and vulnerability to the already tense household."
    }
  ]
};
