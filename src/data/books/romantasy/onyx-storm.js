export default {
  id: "onyx-storm",
  title: "Onyx Storm",
  author: "Rebecca Yarros",
  genres: ["romantasy"],
  themes: ["fated-mates", "war", "sacrifice"],
  spiceLevel: 4,
  coverGradient: ["#1a0a15", "#0d0f1a"],
  accentColor: "#1a1a3a",
  pov: "single-fmc",
  pageCount: 576,
  publicationYear: 2025,
  standalone: false,
  contentWarnings: ["violence", "death", "war"],
  synopsis: `Xaden Riorson is turning venin. The red rings in his eyes are proof of what he sacrificed to save Violet, and every day, the hunger for dark power grows stronger. He is fighting to hold on — to his humanity, to his love, to himself — but the corruption is patient, and it does not lose.

Violet refuses to accept that there is no cure. While forging unprecedented alliances between Navarre and its longtime enemy Poromiel, she secretly hunts for answers in forbidden places — ancient texts, goddess mythology, and rumors of a seventh breed of dragon that has not been seen in centuries. What she finds could change everything. Or it could already be too late.

A new enemy has emerged: a venin maven of terrifying power who wields lightning like Violet and wants to recruit her to the dark side. The venin threat is no longer at the borders — it is inside the walls, wearing familiar faces, and the war is escalating faster than anyone anticipated.

As Violet pushes further into dangerous territory, she discovers a second signet and uncovers shattering truths about her own past. But the greatest battle may be the one she cannot win with lightning or strategy — the fight to save the man she loves from becoming the very thing they are fighting against.

Some wars are won on the battlefield. This one may be won — or lost — in the space between two heartbeats.`,
  characters: [
    { name: "Violet Sorrengail", role: "Now a powerful rider with two signets — lightning and dream walking — Violet fights on every front: military alliances, forbidden research, and a desperate quest to save Xaden from venin corruption. Her choices shape the fate of nations." },
    { name: "Xaden Riorson", role: "The Duke of Tyrrendor, struggling against venin corruption after channeling from the earth. His love for Violet drives him to fight his transformation, but the hunger for power grows until he turns fully venin in the final battle." },
    { name: "Theophanie", role: "A silver-haired venin maven and former high priestess of the goddess Dunne who abandoned her calling for dark power. She wields lightning like Violet and serves as the book's primary antagonist, seeking to recruit Violet to the venin." },
    { name: "Andarna", role: "Violet's second dragon, revealed as a member of the ancient irid breed. She is convinced by the other irids to break her bond with Violet and return to their homeland to learn their ways, leaving Violet with only Tairn." },
    { name: "Aaric", role: "A rider whose signet of precognition is revealed during the final battle. His ability to see moments into the future provides Violet with the critical opportunity to kill Theophanie and turn the tide of the battle." }
  ],
  terms: [
    { term: "Irids", category: "creature", definition: "The seventh breed of dragons, ancient creatures of peace who live on the southern isles. They disdain war and decline to help Navarre, but one arrives to power the wardstone at Aretia during the final battle." },
    { term: "Dream Walking", category: "magic", definition: "Violet's second signet ability, allowing her to enter and interact with other people's dreams. This rare power gives her unique ways to communicate and gather information." },
    { term: "The Senarium", category: "concept", definition: "A governing body where representatives of Navarre's territories convene. It serves as the venue for the unprecedented peace negotiations between Navarre and Poromiel." },
    { term: "Theophanie", category: "character", definition: "A venin maven with silver-streaked hair, formerly a high priestess of the goddess Dunne. She abandoned her sacred role to pursue dark power and now seeks to recruit other lightning wielders to the venin cause." },
    { term: "Goddess Dunne", category: "worldbuilding", definition: "An ancient goddess whose priestesses are marked with silver hair. Violet's father tried to dedicate her to Dunne as an infant, which partially explains her silver-streaked appearance and may hold the key to understanding venin." },
    { term: "Maven", category: "concept", definition: "A high-ranking venin leader with exceptional power. Mavens are far more dangerous than ordinary venin and command forces of dark wielders and wyvern in battle." },
    { term: "Duke of Tyrrendor", category: "concept", definition: "The title restored to Xaden during the Senarium negotiations, giving him a seat of political power. The title belonged to the Riorson family before the rebellion." },
    { term: "Memory Erasure", category: "magic", definition: "The ability to wipe specific memories, used on Violet at her own request after the final battle. This protects critical information — including details of her marriage to Xaden — from enemy memory readers." }
  ],
  quiz: [
    { id: 1, question: "What condition is Xaden in at the start of Onyx Storm?", options: ["Fully healthy", "Partially turned venin with red-ringed eyes", "Missing and presumed dead", "Imprisoned by Navarre"], correctIndex: 1, explanation: "Xaden has partially turned venin after channeling from the earth in Iron Flame, and his eyes bear the telltale red rings of corruption." },
    { id: 2, question: "What is Violet's second signet?", options: ["Fire wielding", "Mind reading", "Dream walking", "Healing"], correctIndex: 2, explanation: "Violet discovers she is a dream walker, able to enter and interact with other people's dreams — a rare and powerful second signet." },
    { id: 3, question: "What treasonous act does Violet commit regarding the wardstone?", options: ["She destroys it", "She alters it so Poromiel's fliers can use signets within the wards", "She steals it", "She gives it to the venin"], correctIndex: 1, explanation: "Violet alters the Basgiath wardstone to allow gryphon fliers to wield their signets within Navarre's wards, which is technically treason but secures Poromiel's alliance." },
    { id: 4, question: "Who is Theophanie?", options: ["A Poromiel general", "A venin maven and former priestess of Dunne", "Xaden's mother", "An irid dragon in human form"], correctIndex: 1, explanation: "Theophanie is a silver-haired venin maven who was once a high priestess of the goddess Dunne before abandoning her calling for dark power." },
    { id: 5, question: "What are the irids?", options: ["A venin army", "A seventh breed of peaceful dragons", "Enchanted weapons", "Navarre's elite soldiers"], correctIndex: 1, explanation: "The irids are the ancient seventh breed of dragons, creatures of peace living on the southern isles who disdain war." },
    { id: 6, question: "What does Andarna do at the end of the battle?", options: ["She dies protecting Violet", "She turns venin", "She breaks her bond with Violet and leaves with the irids", "She becomes the new wardstone guardian"], correctIndex: 2, explanation: "Andarna is convinced by the irids to break her bond with Violet and return to their homeland to learn the ways of her true breed." },
    { id: 7, question: "What does Violet discover on her finger after waking from the battle?", options: ["A signet ring", "A wedding ring from the Riorson family", "A venin mark", "A new rebellion relic"], correctIndex: 1, explanation: "Violet finds a Riorson family wedding ring and legal documents confirming she married Xaden, though her memories of the event were erased." },
    { id: 8, question: "Why did Violet have her own memories erased?", options: ["To forget Xaden", "To protect information from enemy memory readers", "She was cursed", "She was too traumatized"], correctIndex: 1, explanation: "Violet requested the memory erasure to protect critical information — including details about Xaden and their marriage — from interrogation and memory readers." },
    { id: 9, question: "What is Aaric's revealed signet ability?", options: ["Telekinesis", "Precognition", "Shapeshifting", "Invisibility"], correctIndex: 1, explanation: "Aaric's signet of precognition allows him to see moments into the future, providing Violet with the opening she needs to kill Theophanie." },
    { id: 10, question: "What happens to Xaden in the final battle?", options: ["He is cured of venin corruption", "He dies", "He turns fully venin and disappears", "He is imprisoned by Navarre"], correctIndex: 2, explanation: "Xaden channels deeply to fight the venin, turning fully venin in the process. After the battle he disappears, leaving Violet with only a wedding ring and erased memories." }
  ]
};
