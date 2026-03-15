export default {
  id: "just-last-night",
  title: "Just Last Night",
  author: "Mhairi McFarlane",
  genres: ["contemporary-romance", "women's-fiction"],
  themes: ["friends-to-lovers", "forbidden-love", "found-family", "slow-burn"],
  spiceLevel: 3,
  coverGradient: ["#2d3561", "#c05c7e"],
  accentColor: "#c45b84",
  synopsis: `Four friends. One secret that could destroy everything. And a single night that changes all of it.

Eve has been in love with Ed for years. The problem? He belongs to Susie — and Susie is one of her closest friends. So Eve does what she's always done: she buries the feeling, plays her part, and holds the group together. She's the steady one, the reliable one, the friend everyone counts on. Nobody suspects a thing.

Then, on an ordinary night that should have ended like every other, tragedy shatters their world. A sudden, devastating loss cracks the group wide open, and the careful pretenses that held everything in place begin to crumble.

In the raw, disorienting aftermath, secrets start surfacing — and not just Eve's. The people she thought she knew best begin revealing sides she never imagined. Loyalties shift. Comfortable truths turn out to be comfortable lies. And the tidy narrative Eve built her life around starts to look like a story she told herself to avoid the harder one underneath.

Grief has a way of stripping everything bare. Now Eve must face the question she's been running from: how long can you keep the truth locked away before it costs you everyone you love?`,
  characters: [
    { name: "Eve", role: "Protagonist, the steady heart of the friend group hiding a secret love" },
    { name: "Ed", role: "Love interest, warm and kind, Eve's longtime secret crush" },
    { name: "Justin", role: "Member of the friend group, Ed's best mate" },
    { name: "Susie", role: "Ed's long-term girlfriend, part of the friend group" },
    { name: "Hester", role: "Eve's sharp-tongued colleague who becomes an unlikely confidante" }
  ],
  terms: [
    { term: "Forbidden Love", category: "Romance Trope", definition: "Romantic feelings for someone who is off-limits, often because they're in a relationship with someone close to the protagonist." },
    { term: "Found Family", category: "Theme", definition: "A close group of friends who function as a chosen family, with bonds as deep and complex as blood ties." },
    { term: "Unrequited Love", category: "Romance Element", definition: "When one person harbors deep romantic feelings that they believe are not reciprocated by the other." },
    { term: "Grief and Loss", category: "Theme", definition: "The emotional process of dealing with a devastating loss that reshapes relationships and forces confrontation with truth." },
    { term: "Friends-to-Lovers", category: "Romance Trope", definition: "A romantic arc that develops from an existing deep friendship, complicated by the fear of losing what already exists." }
  ],
  quiz: [
    {
      id: 1,
      question: "What secret has Eve been carrying for years?",
      options: ["She wants to move abroad", "She's in love with Ed", "She's been offered a job in another city", "She has a secret family"],
      correctIndex: 1,
      explanation: "Eve has been secretly in love with Ed for years while he's been in a relationship with their friend Susie."
    },
    {
      id: 2,
      question: "How long have the four friends been close?",
      options: ["Since childhood", "Since university", "Since they became neighbors", "Since starting their careers"],
      correctIndex: 1,
      explanation: "Eve, Ed, Justin, and Susie have been an inseparable group since their university days."
    },
    {
      id: 3,
      question: "What event disrupts the friend group's dynamic?",
      options: ["A wedding", "A sudden tragedy and loss", "Someone moving away", "A betrayal at work"],
      correctIndex: 1,
      explanation: "A sudden, devastating loss shatters the group and forces long-buried secrets to the surface."
    },
    {
      id: 4,
      question: "Who is Ed in a relationship with?",
      options: ["Eve", "A woman outside the friend group", "Susie", "He's single"],
      correctIndex: 2,
      explanation: "Ed has been with Susie for as long as anyone can remember, which is why Eve has kept her feelings secret."
    },
    {
      id: 5,
      question: "What does Eve discover about her friends after the tragedy?",
      options: ["They've all been keeping secrets and aren't who she thought", "They want to end the friendship", "They're all moving away", "They've been planning a surprise for her"],
      correctIndex: 0,
      explanation: "In the aftermath of loss, Eve realizes that the versions of her friends she held in her heart don't match reality, as hidden truths emerge."
    },
    {
      id: 6,
      question: "What role does Eve typically play in the friend group?",
      options: ["The wild one", "The steady, reliable one who holds them together", "The distant one", "The peacemaker who avoids conflict"],
      correctIndex: 1,
      explanation: "Eve is the steady, reliable heart of the group—always holding things together while privately burying her own needs."
    }
  ]
};
