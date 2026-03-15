export default {
  id: "just-last-night",
  title: "Just Last Night",
  author: "Mhairi McFarlane",
  genres: ["contemporary-romance", "women's-fiction"],
  themes: ["friends-to-lovers", "forbidden-love", "found-family", "slow-burn"],
  spiceLevel: 3,
  coverGradient: ["#2d3561", "#c05c7e"],
  accentColor: "#c45b84",
  synopsis: `Eve, Ed, Justin, and Susie have been an inseparable group of friends since university. They share everything—Friday nights at the pub, inside jokes, holidays, and the unshakeable bond of people who grew up together. Eve has always been the steady one, the reliable friend who holds the group together while privately nursing a secret she's carried for years: she's in love with Ed.

Ed, warm and funny and impossibly kind, has been with Susie for as long as anyone can remember. Eve has made her peace with it—or at least she thought she had. She's buried her feelings so deep that they've become part of the architecture of her life, something she's built around rather than confronted.

Then, on an ordinary evening that should have ended like any other night out, tragedy strikes. A sudden, devastating loss shatters their group and forces every carefully maintained pretense to crumble. In the aftermath, long-buried secrets begin to surface—not just Eve's feelings for Ed, but truths about the people she thought she knew best.

As Eve navigates grief, guilt, and the terrifying upheaval of her closest relationships, she discovers that the versions of her friends she'd held in her heart don't quite match reality. People she trusted reveal unexpected sides of themselves. Alliances shift. And the comfortable, familiar world Eve built around her friendships begins to look very different in the harsh light of loss.

Forced to rebuild her life from the foundations up, Eve must finally reckon with the choices she's made—the things she said, the things she didn't, and the love she was too afraid to claim. Just Last Night is a poignant, sharply observed story about the complexity of long friendships, the secrets we keep from the people closest to us, and the courage it takes to be honest about what you really want before it's too late.`,
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
