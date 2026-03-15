export default {
  id: "sorcery-of-thorns",
  title: "Sorcery of Thorns",
  author: "Margaret Rogerson",
  genres: ["romantasy"],
  themes: ["enemies-to-lovers", "slow-burn", "found-family", "morally-grey", "forbidden-love"],
  spiceLevel: 3,
  coverGradient: ["#0a1a15", "#0f0a30"],
  accentColor: "#7c5cbf",
  synopsis: `Elisabeth Scrivener has spent her life among books that can kill you. In the Great Libraries of Austermeer, grimoires are alive — sentient, magical, and dangerous. Damage one, and it transforms into a monstrous Malefict. Elisabeth was raised to be their guardian, and she knows two things with absolute certainty: protect the books, and never trust a sorcerer.

Then her library is attacked, its most dangerous grimoire unleashed as a monster, and Elisabeth is blamed. Arrested and facing trial, she realizes the truth — someone is deliberately destroying the Great Libraries, one by one. And the only person who can help her stop it is Nathaniel Thorn: a sorcerer with a sharp tongue, devastating charm, and a demon servant who should be terrifying but is oddly... protective.

Everything Elisabeth believes tells her Nathaniel is the enemy. Sorcerers bargain with demons. They are corrupt, dangerous, irredeemable. But Nathaniel is haunted by the dark legacy of his family's bargains, and the guilt he carries does not match the monster she expected. As they investigate the conspiracy together, Elisabeth begins to question whether the line between good and evil is as clear as her training taught her.

With the Great Libraries falling and the conspiracy reaching into the highest levels of power, Elisabeth must make an impossible choice: cling to the beliefs that have defined her, or trust the sorcerer and the demon to help her save everything she loves. In a world where books have teeth, the most dangerous story might be the one she has been telling herself.`,
  characters: [
    { name: "Elisabeth Scrivener", role: "A fierce young librarian raised in the Great Libraries to protect magical grimoires. She is brave, stubborn, and must overcome her deep prejudice against sorcerers to save the libraries she loves." },
    { name: "Nathaniel Thorn", role: "A young sorcerer haunted by his family's dark legacy of demonic bargains. Despite his sarcastic exterior and devastating charm, he carries deep guilt and pain from the costs of his inherited power." },
    { name: "Silas", role: "Nathaniel's demon servant, an ancient and powerful being bound to the Thorn family through generations of bargains. He displays loyalty and care that challenge Elisabeth's understanding of demons." },
    { name: "Director Ashcroft", role: "A powerful and respected figure in Austermeer's magical establishment whose involvement in the conspiracy against the Great Libraries reveals the corruption at the heart of the system." }
  ],
  terms: [
    { term: "Grimoire", category: "object", definition: "A magical book that is alive and sentient. Grimoires contain real magic and must be carefully maintained by librarian wardens, as damaged or corrupted grimoires can transform into dangerous Maleficts." },
    { term: "Malefict", category: "creature", definition: "A monstrous creature that a grimoire transforms into when damaged or corrupted. They range from minor threats to world-ending Class Ten entities." },
    { term: "Great Libraries", category: "location", definition: "Fortified institutions across Austermeer that house and protect the world's grimoires. They are part library, part fortress, staffed by wardens trained to handle dangerous magical books." },
    { term: "Sorcerer", category: "concept", definition: "A human who has made a bargain with a demon to gain magical power. They are feared and distrusted by most people, especially librarians who see them as threats." },
    { term: "Warden", category: "concept", definition: "A librarian-warrior trained to protect and maintain the grimoires in the Great Libraries. Elisabeth was raised and trained to be one." },
    { term: "Demonic Bargain", category: "concept", definition: "An agreement between a human and a demon that grants the human magical power in exchange for a price — often something precious like years of life, memories, or worse." }
  ],
  quiz: [
    { id: 1, question: "What are grimoires in this world?", options: ["Ordinary spell books", "Living, sentient magical books that can become dangerous", "Historical texts", "Demon contracts"], correctIndex: 1, explanation: "Grimoires are alive and sentient magical books that contain real magic and can transform into monstrous Maleficts if damaged or corrupted." },
    { id: 2, question: "Why does Elisabeth initially distrust Nathaniel?", options: ["He is a criminal", "He is a sorcerer, and she was raised to believe all sorcerers are evil", "He attacked her library", "He is a demon"], correctIndex: 1, explanation: "Elisabeth was raised in the Great Libraries to view sorcerers — humans who bargain with demons — as the greatest threat to the libraries and the world." },
    { id: 3, question: "What is a Malefict?", options: ["A type of spell", "A monstrous creature that grimoires transform into when damaged", "A demon servant", "A magical weapon"], correctIndex: 1, explanation: "Maleficts are monstrous creatures that grimoires become when damaged or corrupted, ranging from minor threats to world-ending Class Ten entities." },
    { id: 4, question: "What is Nathaniel haunted by?", options: ["A curse", "His family's dark legacy of demonic bargains", "A lost love", "A prophecy"], correctIndex: 1, explanation: "Nathaniel is haunted by his family's dark legacy — his ancestors made terrible bargains with demons, and the price of their power weighs heavily on him." },
    { id: 5, question: "What conspiracy does Elisabeth uncover?", options: ["A plot to create more sorcerers", "Someone is deliberately unleashing Maleficts to destroy the Great Libraries", "A plan to free all demons", "An invasion from another kingdom"], correctIndex: 1, explanation: "Elisabeth discovers that the attack on her library was orchestrated by someone deliberately unleashing Maleficts to destroy the Great Libraries one by one." }
  ]
};
