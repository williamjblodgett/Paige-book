export default {
  id: "iron-flame",
  title: "Iron Flame",
  author: "Rebecca Yarros",
  genres: ["romantasy"],
  themes: ["enemies-to-lovers", "forbidden-love", "secrets-and-lies"],
  spiceLevel: 4,
  coverGradient: ["#1a0a15", "#0d0f1a"],
  accentColor: "#c42a2a",
  synopsis: `Violet Sorrengail returns to Basgiath War College knowing the truth that Navarre's leadership has killed to keep hidden: the wards are failing, the venin are real, and the war they are training for is nothing like what they have been told. She also knows that her brother Brennan — long believed dead — is alive, fighting in a secret rebellion alongside the man she loves.

But trust is a fragile thing, and Xaden's secrets have left cracks that run deep. As a second-year rider, Violet must navigate a dangerous new authority figure determined to break her, a transfer student with ties to Xaden's past, and forbidden research that could be the key to saving the kingdom — or getting her executed for treason.

Then there is Andarna. Violet's second dragon is changing, and the truth about what she really is will rewrite everything the riders thought they knew about dragonkind. Meanwhile, the venin threat is not just growing — it is evolving, and the enemy may already be inside the walls of Basgiath.

With the kingdom's protective wardstone at stake and dark forces converging, Violet faces impossible choices on every front. The cost of defending Navarre will be staggering, and some prices, once paid, can never be undone.

In a world where the truth itself is a weapon, the girl with lightning in her veins must decide how far she is willing to go — and how much she is willing to lose.`,
  characters: [
    { name: "Violet Sorrengail", role: "Now a second-year rider at Basgiath, Violet balances her academic training with secretly aiding the rebellion. Her discovery of the truth about Navarre's wards and her determination to protect those she loves drive her into increasingly dangerous situations." },
    { name: "Xaden Riorson", role: "Violet's love interest and leader of the rebellion against Navarre's lies. His decision to channel from the earth to save Violet turns him venin — a corruption of the soul that threatens to destroy everything he is." },
    { name: "General Lilith Sorrengail", role: "Violet's formidable mother and the commander of Navarre's armies. Despite a complicated relationship with her daughter, she makes the ultimate sacrifice, dying to restore Basgiath's wardstone and save her children." },
    { name: "Vice Commandant Varrish", role: "The new and sadistic authority figure at Basgiath, installed to root out rebel sympathizers. He uses torture and manipulation to try to break Violet and force her to betray Xaden." },
    { name: "Brennan Sorrengail", role: "Violet's brother, long believed killed in the rebellion. He is revealed to be alive, serving as a lieutenant colonel in the secret resistance and possessing a powerful mending signet." }
  ],
  terms: [
    { term: "Venin", category: "creature", definition: "Wielders who have drawn power directly from the earth, corrupting both themselves and the land. They hunger for more power endlessly and command wyvern — dark counterparts to dragons." },
    { term: "Wardstone", category: "magic", definition: "A powerful magical stone that maintains Navarre's protective wards. The wardstone at Basgiath is central to the kingdom's defense, and its destruction would leave Navarre completely vulnerable to venin attack." },
    { term: "Riorson House", category: "location", definition: "Xaden's ancestral fortress and the secret headquarters of the rebellion. It serves as a base of operations for those who know the truth about the venin threat." },
    { term: "Aretia", category: "location", definition: "A fortified outpost being rebuilt by the rebellion as a defensive position against the venin. It becomes a symbol of hope and resistance against Navarre's willful blindness." },
    { term: "The Seventh Breed", category: "creature", definition: "A secret breed of dragon to which Andarna belongs. She is not a feathertail as previously believed, but a member of an ancient breed that waited 650 years to hatch for the right rider." },
    { term: "Wyvern", category: "creature", definition: "Dark, corrupted creatures ridden by venin in battle. They are the twisted counterparts to dragons and serve as the primary aerial threat in the venin army." },
    { term: "Mending Signet", category: "magic", definition: "Brennan Sorrengail's rare signet power that allows him to heal and repair both people and objects. He faked his death and used this ability to aid the rebellion." },
    { term: "The Gauntlet", category: "concept", definition: "A challenging obstacle course at Basgiath that tests riders' physical abilities. Violet famously completed it by finding creative workarounds that exploited the exact wording of the rules." }
  ],
  quiz: [
    { id: 1, question: "What shocking truth does Violet learn about her brother Brennan?", options: ["He betrayed Navarre", "He is alive and serving in the rebellion", "He became venin", "He bonded with a wyvern"], correctIndex: 1, explanation: "Violet discovers that Brennan, believed dead for years, is actually alive and serving as a lieutenant colonel in the secret rebellion." },
    { id: 2, question: "Who is the antagonistic new authority figure at Basgiath?", options: ["General Melgren", "Jack Barlowe", "Vice Commandant Varrish", "Cat"], correctIndex: 2, explanation: "Vice Commandant Varrish is installed at Basgiath with a personal mission to break Violet and root out rebel sympathizers." },
    { id: 3, question: "What is Andarna revealed to actually be?", options: ["A baby dragon", "A feathertail", "A member of a secret seventh breed of dragon", "A shapeshifter"], correctIndex: 2, explanation: "Andarna is not a feathertail at all but belongs to a secret seventh breed of dragon that waited 650 years to hatch specifically for Violet." },
    { id: 4, question: "Who shatters the wardstone at Basgiath?", options: ["Varrish", "Xaden", "Jack Barlowe, revealed as venin", "A venin general"], correctIndex: 2, explanation: "Jack Barlowe, who has secretly become venin, shatters Basgiath's wardstone, allowing venin and wyvern to attack the college." },
    { id: 5, question: "How does General Sorrengail die?", options: ["In battle with the venin general", "Sacrificing herself to restore the wardstone", "Xaden kills her", "She falls from her dragon"], correctIndex: 1, explanation: "Lilith Sorrengail sacrifices herself and her dragon to pour power into the wardstone, restoring Basgiath's wards and saving her children." },
    { id: 6, question: "Why does Xaden turn venin?", options: ["He is cursed", "He channels power from the earth to save Violet", "He is bitten by a venin", "He touches the wardstone"], correctIndex: 1, explanation: "When Xaden feels Violet dying through their bond, he channels power directly from the earth — the act that turns any wielder into venin." },
    { id: 7, question: "How many types of dragons are needed to activate the ward?", options: ["Three", "Five", "Six", "Seven"], correctIndex: 3, explanation: "Jesinia's research reveals that seven types of dragons are required to properly activate the wardstone, including Andarna's secret seventh breed." },
    { id: 8, question: "Where is the real target of the major venin attack?", options: ["Samara", "Aretia", "Basgiath", "Riorson House"], correctIndex: 2, explanation: "Violet figures out that despite General Melgren's prediction of an attack on Samara, the real target is Basgiath where the wardstone is kept." },
    { id: 9, question: "What is the significance of Xaden's red-tinged eyes at the end?", options: ["He gained a new signet", "They indicate venin corruption", "He is exhausted", "They are a side effect of the battle"], correctIndex: 1, explanation: "The red glow in Xaden's eyes is the telltale sign of venin corruption, confirming that channeling from the earth has begun transforming him." },
    { id: 10, question: "What does Jack Barlowe tell Xaden about a cure for being venin?", options: ["A cure exists in the archives", "Dragons can heal venin", "There is no cure", "The wardstone can reverse it"], correctIndex: 2, explanation: "In the chilling final scene, Jack tells Xaden there is no cure for being venin — he will only hunger for more power." }
  ]
};
