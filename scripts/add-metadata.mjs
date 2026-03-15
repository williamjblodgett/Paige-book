import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join } from 'path'

// Known metadata for popular books
const BOOK_META = {
  'haunting-adeline': { pov: 'dual-pov', pageCount: 491, publicationYear: 2021, standalone: false, contentWarnings: ['stalking', 'dubcon', 'trafficking', 'violence', 'kidnapping', 'graphic-violence', 'manipulation'] },
  'hunting-adeline': { pov: 'dual-pov', pageCount: 588, publicationYear: 2022, standalone: false, contentWarnings: ['trafficking', 'sexual-assault', 'violence', 'graphic-violence', 'kidnapping', 'torture', 'dubcon'] },
  'icebreaker': { pov: 'dual-pov', pageCount: 432, publicationYear: 2022, standalone: false, contentWarnings: ['anxiety', 'body-image', 'manipulation'] },
  'wildfire': { pov: 'dual-pov', pageCount: 448, publicationYear: 2023, standalone: false, contentWarnings: ['grief', 'anxiety'] },
  'fourth-wing': { pov: 'single-fmc', pageCount: 498, publicationYear: 2023, standalone: false, contentWarnings: ['violence', 'death', 'war', 'graphic-violence'] },
  'iron-flame': { pov: 'single-fmc', pageCount: 623, publicationYear: 2023, standalone: false, contentWarnings: ['violence', 'death', 'war', 'graphic-violence'] },
  'onyx-storm': { pov: 'single-fmc', pageCount: 576, publicationYear: 2025, standalone: false, contentWarnings: ['violence', 'death', 'war'] },
  'acotar': { pov: 'single-fmc', pageCount: 419, publicationYear: 2015, standalone: false, contentWarnings: ['violence', 'death', 'abuse', 'manipulation'] },
  'acomaf': { pov: 'single-fmc', pageCount: 624, publicationYear: 2016, standalone: false, contentWarnings: ['violence', 'abuse', 'anxiety', 'death', 'war'] },
  'acosf': { pov: 'dual-pov', pageCount: 757, publicationYear: 2021, standalone: false, contentWarnings: ['grief', 'pregnancy', 'violence', 'death', 'addiction'] },
  'acowar': { pov: 'single-fmc', pageCount: 699, publicationYear: 2017, standalone: false, contentWarnings: ['violence', 'war', 'death', 'torture'] },
  'the-love-hypothesis': { pov: 'single-fmc', pageCount: 384, publicationYear: 2021, standalone: true, contentWarnings: ['sexual-assault', 'power-imbalance'] },
  'ugly-love': { pov: 'dual-pov', pageCount: 328, publicationYear: 2014, standalone: true, contentWarnings: ['grief', 'death', 'pregnancy'] },
  'verity': { pov: 'single-fmc', pageCount: 314, publicationYear: 2018, standalone: true, contentWarnings: ['violence', 'death', 'manipulation', 'abuse', 'graphic-violence'] },
  'november-9': { pov: 'dual-pov', pageCount: 310, publicationYear: 2015, standalone: true, contentWarnings: ['manipulation', 'stalking'] },
  'confess': { pov: 'dual-pov', pageCount: 306, publicationYear: 2015, standalone: true, contentWarnings: ['abuse', 'death', 'grief'] },
  'reminders-of-him': { pov: 'dual-pov', pageCount: 335, publicationYear: 2022, standalone: true, contentWarnings: ['grief', 'death', 'addiction'] },
  'layla': { pov: 'single-fmc', pageCount: 310, publicationYear: 2020, standalone: true, contentWarnings: ['violence', 'death', 'manipulation'] },
  'it-happened-one-summer': { pov: 'dual-pov', pageCount: 384, publicationYear: 2021, standalone: false, contentWarnings: [] },
  'hook-line-and-sinker': { pov: 'dual-pov', pageCount: 374, publicationYear: 2022, standalone: false, contentWarnings: ['anxiety'] },
  'people-we-meet-on-vacation': { pov: 'dual-pov', pageCount: 364, publicationYear: 2021, standalone: true, contentWarnings: [] },
  'beach-read': { pov: 'single-fmc', pageCount: 361, publicationYear: 2020, standalone: true, contentWarnings: ['grief', 'death'] },
  'book-lovers': { pov: 'single-fmc', pageCount: 377, publicationYear: 2022, standalone: true, contentWarnings: ['grief'] },
  'happy-place': { pov: 'dual-pov', pageCount: 400, publicationYear: 2023, standalone: true, contentWarnings: ['anxiety'] },
  'the-hating-game': { pov: 'single-fmc', pageCount: 374, publicationYear: 2016, standalone: true, contentWarnings: [] },
  'the-flatshare': { pov: 'dual-pov', pageCount: 325, publicationYear: 2019, standalone: true, contentWarnings: ['abuse', 'manipulation', 'stalking'] },
  'love-theoretically': { pov: 'single-fmc', pageCount: 391, publicationYear: 2023, standalone: true, contentWarnings: [] },
  'the-spanish-love-deception': { pov: 'single-fmc', pageCount: 448, publicationYear: 2021, standalone: true, contentWarnings: [] },
  'not-in-love': { pov: 'dual-pov', pageCount: 384, publicationYear: 2024, standalone: true, contentWarnings: [] },
  'the-deal': { pov: 'dual-pov', pageCount: 360, publicationYear: 2015, standalone: false, contentWarnings: ['sexual-assault'] },
  'the-mistake': { pov: 'dual-pov', pageCount: 340, publicationYear: 2015, standalone: false, contentWarnings: ['pregnancy'] },
  'the-score': { pov: 'dual-pov', pageCount: 374, publicationYear: 2016, standalone: false, contentWarnings: [] },
  'the-goal': { pov: 'dual-pov', pageCount: 346, publicationYear: 2016, standalone: false, contentWarnings: ['pregnancy'] },
  'twisted-love': { pov: 'dual-pov', pageCount: 372, publicationYear: 2021, standalone: false, contentWarnings: ['violence', 'stalking', 'death', 'abuse'] },
  'twisted-games': { pov: 'dual-pov', pageCount: 390, publicationYear: 2021, standalone: false, contentWarnings: ['stalking', 'violence'] },
  'twisted-hate': { pov: 'dual-pov', pageCount: 464, publicationYear: 2022, standalone: false, contentWarnings: ['sexual-assault', 'violence', 'manipulation'] },
  'twisted-lies': { pov: 'dual-pov', pageCount: 478, publicationYear: 2022, standalone: false, contentWarnings: ['stalking', 'violence', 'kidnapping'] },
  'king-of-wrath': { pov: 'dual-pov', pageCount: 403, publicationYear: 2022, standalone: false, contentWarnings: ['violence'] },
  'king-of-pride': { pov: 'dual-pov', pageCount: 384, publicationYear: 2023, standalone: false, contentWarnings: [] },
  'king-of-greed': { pov: 'dual-pov', pageCount: 384, publicationYear: 2023, standalone: false, contentWarnings: ['cheating'] },
  'king-of-sloth': { pov: 'dual-pov', pageCount: 400, publicationYear: 2024, standalone: false, contentWarnings: ['death', 'grief'] },
  'things-we-never-got-over': { pov: 'dual-pov', pageCount: 573, publicationYear: 2022, standalone: false, contentWarnings: ['abuse', 'kidnapping'] },
  'things-we-hide-from-the-light': { pov: 'dual-pov', pageCount: 566, publicationYear: 2023, standalone: false, contentWarnings: ['violence', 'anxiety', 'kidnapping'] },
  'things-we-left-behind': { pov: 'dual-pov', pageCount: 612, publicationYear: 2023, standalone: false, contentWarnings: ['abuse', 'bullying', 'violence'] },
  'corrupt': { pov: 'dual-pov', pageCount: 426, publicationYear: 2015, standalone: false, contentWarnings: ['dubcon', 'violence', 'bullying', 'manipulation', 'kidnapping'] },
  'hideaway': { pov: 'dual-pov', pageCount: 418, publicationYear: 2017, standalone: false, contentWarnings: ['violence', 'kidnapping', 'dubcon'] },
  'kill-switch': { pov: 'dual-pov', pageCount: 592, publicationYear: 2019, standalone: false, contentWarnings: ['violence', 'abuse', 'dubcon', 'stalking', 'bullying', 'torture'] },
  'nightfall': { pov: 'dual-pov', pageCount: 524, publicationYear: 2020, standalone: false, contentWarnings: ['violence', 'kidnapping', 'dubcon'] },
  'punk-57': { pov: 'dual-pov', pageCount: 357, publicationYear: 2016, standalone: true, contentWarnings: ['bullying', 'violence', 'death'] },
  'credence': { pov: 'single-fmc', pageCount: 480, publicationYear: 2020, standalone: true, contentWarnings: ['dubcon', 'taboo', 'grief', 'age-gap', 'power-imbalance'] },
  'birthday-girl': { pov: 'dual-pov', pageCount: 410, publicationYear: 2018, standalone: true, contentWarnings: ['age-gap', 'taboo', 'power-imbalance'] },
  'butcher-and-blackbird': { pov: 'dual-pov', pageCount: 331, publicationYear: 2023, standalone: false, contentWarnings: ['graphic-violence', 'death', 'blood'] },
  'leather-and-lark': { pov: 'dual-pov', pageCount: 371, publicationYear: 2023, standalone: false, contentWarnings: ['graphic-violence', 'death', 'blood', 'anxiety'] },
  'den-of-vipers': { pov: 'multi-pov', pageCount: 612, publicationYear: 2020, standalone: true, contentWarnings: ['graphic-violence', 'dubcon', 'kidnapping', 'torture', 'blood', 'death'] },
  'neon-gods': { pov: 'dual-pov', pageCount: 384, publicationYear: 2021, standalone: false, contentWarnings: ['violence', 'manipulation', 'power-imbalance'] },
  'electric-idol': { pov: 'dual-pov', pageCount: 400, publicationYear: 2022, standalone: false, contentWarnings: ['violence', 'manipulation', 'stalking'] },
  'wicked-beauty': { pov: 'dual-pov', pageCount: 416, publicationYear: 2022, standalone: false, contentWarnings: ['violence', 'dubcon'] },
  'radiant-sin': { pov: 'dual-pov', pageCount: 384, publicationYear: 2022, standalone: false, contentWarnings: ['violence'] },
  'from-blood-and-ash': { pov: 'single-fmc', pageCount: 607, publicationYear: 2020, standalone: false, contentWarnings: ['violence', 'death', 'sexual-assault', 'abuse'] },
  'a-kingdom-of-flesh-and-fire': { pov: 'single-fmc', pageCount: 617, publicationYear: 2020, standalone: false, contentWarnings: ['violence', 'death', 'dubcon'] },
  'the-crown-of-gilded-bones': { pov: 'single-fmc', pageCount: 670, publicationYear: 2021, standalone: false, contentWarnings: ['violence', 'death', 'war'] },
  'the-war-of-two-queens': { pov: 'single-fmc', pageCount: 693, publicationYear: 2022, standalone: false, contentWarnings: ['violence', 'torture', 'death', 'war', 'sexual-assault'] },
  'bride': { pov: 'single-fmc', pageCount: 416, publicationYear: 2024, standalone: true, contentWarnings: ['violence', 'blood'] },
  'the-cruel-prince': { pov: 'single-fmc', pageCount: 370, publicationYear: 2018, standalone: false, contentWarnings: ['violence', 'bullying', 'abuse', 'death'] },
  'house-of-earth-and-blood': { pov: 'multi-pov', pageCount: 803, publicationYear: 2020, standalone: false, contentWarnings: ['violence', 'death', 'grief', 'sexual-assault', 'addiction'] },
  'house-of-sky-and-breath': { pov: 'multi-pov', pageCount: 768, publicationYear: 2022, standalone: false, contentWarnings: ['violence', 'death', 'war'] },
  'house-of-flame-and-shadow': { pov: 'multi-pov', pageCount: 850, publicationYear: 2024, standalone: false, contentWarnings: ['violence', 'death', 'war', 'torture'] },
  'divine-rivals': { pov: 'dual-pov', pageCount: 369, publicationYear: 2023, standalone: false, contentWarnings: ['war', 'death', 'grief'] },
  'ruthless-vows': { pov: 'dual-pov', pageCount: 368, publicationYear: 2023, standalone: false, contentWarnings: ['war', 'death', 'grief', 'violence'] },
  'the-bridge-kingdom': { pov: 'dual-pov', pageCount: 348, publicationYear: 2019, standalone: false, contentWarnings: ['violence', 'death', 'manipulation'] },
  'the-serpent-and-the-wings-of-night': { pov: 'single-fmc', pageCount: 479, publicationYear: 2022, standalone: false, contentWarnings: ['violence', 'blood', 'death', 'abuse'] },
  'kingdom-of-the-wicked': { pov: 'single-fmc', pageCount: 369, publicationYear: 2020, standalone: false, contentWarnings: ['violence', 'death', 'blood'] },
  'kingdom-of-the-cursed': { pov: 'single-fmc', pageCount: 416, publicationYear: 2021, standalone: false, contentWarnings: ['violence', 'death', 'blood', 'dubcon'] },
  'kingdom-of-the-feared': { pov: 'single-fmc', pageCount: 352, publicationYear: 2022, standalone: false, contentWarnings: ['violence', 'death', 'blood'] },
  'priest': { pov: 'dual-pov', pageCount: 298, publicationYear: 2015, standalone: false, contentWarnings: ['taboo', 'bdsm', 'power-imbalance'] },
  'saint': { pov: 'dual-pov', pageCount: 338, publicationYear: 2020, standalone: false, contentWarnings: ['bdsm'] },
  'sinner': { pov: 'dual-pov', pageCount: 362, publicationYear: 2018, standalone: false, contentWarnings: ['bdsm', 'violence'] },
  'the-dare': { pov: 'dual-pov', pageCount: 264, publicationYear: 2021, standalone: true, contentWarnings: ['power-imbalance', 'age-gap'] },
  'praise': { pov: 'dual-pov', pageCount: 338, publicationYear: 2022, standalone: false, contentWarnings: ['bdsm'] },
  'eyes-on-me': { pov: 'dual-pov', pageCount: 356, publicationYear: 2022, standalone: false, contentWarnings: ['bdsm', 'age-gap'] },
  'give-me-more': { pov: 'multi-pov', pageCount: 410, publicationYear: 2023, standalone: false, contentWarnings: ['bdsm'] },
  'mercy': { pov: 'dual-pov', pageCount: 450, publicationYear: 2021, standalone: true, contentWarnings: ['bdsm', 'dubcon', 'kidnapping', 'violence'] },
  'run-posy-run': { pov: 'dual-pov', pageCount: 398, publicationYear: 2022, standalone: true, contentWarnings: ['violence', 'dubcon', 'kidnapping', 'graphic-violence', 'death'] },
  'the-sweetest-oblivion': { pov: 'single-fmc', pageCount: 428, publicationYear: 2019, standalone: false, contentWarnings: ['violence', 'death', 'dubcon', 'cheating'] },
  'the-maddest-obsession': { pov: 'single-fmc', pageCount: 456, publicationYear: 2020, standalone: false, contentWarnings: ['violence', 'death', 'addiction', 'abuse'] },
  'the-darkest-temptation': { pov: 'single-fmc', pageCount: 395, publicationYear: 2020, standalone: false, contentWarnings: ['violence', 'death', 'kidnapping'] },
  'brutal-prince': { pov: 'dual-pov', pageCount: 312, publicationYear: 2021, standalone: false, contentWarnings: ['violence', 'death'] },
  'stolen-heir': { pov: 'dual-pov', pageCount: 320, publicationYear: 2022, standalone: false, contentWarnings: ['violence', 'kidnapping', 'dubcon'] },
  'bound-by-honor': { pov: 'single-fmc', pageCount: 298, publicationYear: 2015, standalone: false, contentWarnings: ['violence', 'dubcon', 'arranged-marriage'] },
  'bound-by-duty': { pov: 'single-fmc', pageCount: 328, publicationYear: 2015, standalone: false, contentWarnings: ['violence', 'dubcon'] },
  'bound-by-hatred': { pov: 'single-fmc', pageCount: 342, publicationYear: 2016, standalone: false, contentWarnings: ['violence', 'sexual-assault', 'abuse'] },
  'sparrow': { pov: 'single-fmc', pageCount: 364, publicationYear: 2020, standalone: false, contentWarnings: ['violence', 'kidnapping', 'dubcon', 'abuse'] },
  'monster': { pov: 'dual-pov', pageCount: 398, publicationYear: 2021, standalone: false, contentWarnings: ['graphic-violence', 'kidnapping', 'dubcon', 'torture'] },
  'the-predator': { pov: 'dual-pov', pageCount: 387, publicationYear: 2018, standalone: false, contentWarnings: ['violence', 'death', 'stalking', 'dubcon'] },
  'fear-me': { pov: 'dual-pov', pageCount: 384, publicationYear: 2015, standalone: false, contentWarnings: ['bullying', 'violence', 'abuse', 'dubcon'] },
  'does-it-hurt': { pov: 'dual-pov', pageCount: 388, publicationYear: 2022, standalone: true, contentWarnings: ['violence', 'manipulation', 'death'] },
  'powerless': { pov: 'dual-pov', pageCount: 518, publicationYear: 2023, standalone: false, contentWarnings: ['violence', 'death', 'abuse'] },
  'reckless': { pov: 'dual-pov', pageCount: 530, publicationYear: 2023, standalone: false, contentWarnings: ['violence', 'death'] },
  'there-are-no-saints': { pov: 'dual-pov', pageCount: 422, publicationYear: 2022, standalone: false, contentWarnings: ['graphic-violence', 'dubcon', 'stalking', 'kidnapping', 'blood', 'death'] },
  'there-is-no-devil': { pov: 'dual-pov', pageCount: 450, publicationYear: 2023, standalone: false, contentWarnings: ['graphic-violence', 'dubcon', 'blood', 'death'] },
  'gothikana': { pov: 'single-fmc', pageCount: 293, publicationYear: 2021, standalone: true, contentWarnings: ['violence', 'death'] },
  'zodiac-academy-the-awakening': { pov: 'dual-pov', pageCount: 504, publicationYear: 2019, standalone: false, contentWarnings: ['bullying', 'violence', 'abuse'] },
  'behind-the-net': { pov: 'dual-pov', pageCount: 352, publicationYear: 2023, standalone: false, contentWarnings: ['anxiety'] },
  'the-graham-effect': { pov: 'dual-pov', pageCount: 471, publicationYear: 2023, standalone: false, contentWarnings: ['grief'] },
  'mile-high': { pov: 'dual-pov', pageCount: 395, publicationYear: 2022, standalone: false, contentWarnings: ['anxiety'] },
  'the-right-move': { pov: 'dual-pov', pageCount: 384, publicationYear: 2023, standalone: false, contentWarnings: ['anxiety', 'abuse'] },
  'collided': { pov: 'dual-pov', pageCount: 382, publicationYear: 2020, standalone: false, contentWarnings: ['abuse', 'toxic-relationship'] },
  'the-wall-of-winnipeg-and-me': { pov: 'single-fmc', pageCount: 510, publicationYear: 2016, standalone: true, contentWarnings: [] },
  'kulti': { pov: 'single-fmc', pageCount: 435, publicationYear: 2015, standalone: true, contentWarnings: ['age-gap'] },
  'wait-for-it': { pov: 'single-fmc', pageCount: 453, publicationYear: 2017, standalone: true, contentWarnings: [] },
  'the-cheat-sheet': { pov: 'dual-pov', pageCount: 352, publicationYear: 2021, standalone: true, contentWarnings: [] },
  'consider-me': { pov: 'dual-pov', pageCount: 336, publicationYear: 2021, standalone: false, contentWarnings: ['violence'] },
  'pucking-around': { pov: 'multi-pov', pageCount: 510, publicationYear: 2023, standalone: false, contentWarnings: [] },
  'pucking-wild': { pov: 'dual-pov', pageCount: 430, publicationYear: 2023, standalone: false, contentWarnings: [] },
  'better-than-the-movies': { pov: 'single-fmc', pageCount: 357, publicationYear: 2021, standalone: true, contentWarnings: ['grief'] },
  'the-striker': { pov: 'dual-pov', pageCount: 432, publicationYear: 2024, standalone: false, contentWarnings: [] },
  'throttled': { pov: 'dual-pov', pageCount: 394, publicationYear: 2020, standalone: false, contentWarnings: [] },
  'checked': { pov: 'dual-pov', pageCount: 370, publicationYear: 2021, standalone: false, contentWarnings: [] },
  'off-the-ice': { pov: 'dual-pov', pageCount: 334, publicationYear: 2017, standalone: false, contentWarnings: [] },
  'her-soul-to-take': { pov: 'dual-pov', pageCount: 371, publicationYear: 2022, standalone: false, contentWarnings: ['graphic-violence', 'death', 'blood', 'dubcon'] },
  'her-soul-for-revenge': { pov: 'dual-pov', pageCount: 398, publicationYear: 2022, standalone: false, contentWarnings: ['graphic-violence', 'death', 'blood', 'dubcon', 'abuse'] },
  'dark-lover': { pov: 'multi-pov', pageCount: 393, publicationYear: 2005, standalone: false, contentWarnings: ['violence', 'death', 'blood'] },
  'a-hunger-like-no-other': { pov: 'dual-pov', pageCount: 371, publicationYear: 2006, standalone: false, contentWarnings: ['violence', 'blood', 'dubcon'] },
  'lothaire': { pov: 'dual-pov', pageCount: 466, publicationYear: 2012, standalone: false, contentWarnings: ['violence', 'blood', 'kidnapping', 'dubcon'] },
  'moon-called': { pov: 'single-fmc', pageCount: 288, publicationYear: 2006, standalone: false, contentWarnings: ['violence', 'death'] },
  'the-darkest-night': { pov: 'multi-pov', pageCount: 400, publicationYear: 2008, standalone: false, contentWarnings: ['violence', 'death', 'torture'] },
  'guild-hunter': { pov: 'single-fmc', pageCount: 344, publicationYear: 2009, standalone: false, contentWarnings: ['violence', 'blood', 'death'] },
  'american-queen': { pov: 'multi-pov', pageCount: 403, publicationYear: 2016, standalone: false, contentWarnings: ['bdsm', 'power-imbalance'] },
  'american-prince': { pov: 'multi-pov', pageCount: 366, publicationYear: 2017, standalone: false, contentWarnings: ['bdsm', 'power-imbalance', 'war'] },
  'american-king': { pov: 'multi-pov', pageCount: 420, publicationYear: 2017, standalone: false, contentWarnings: ['bdsm', 'power-imbalance', 'war'] },
  'the-kiss-quotient': { pov: 'dual-pov', pageCount: 310, publicationYear: 2018, standalone: false, contentWarnings: [] },
  'the-bride-test': { pov: 'dual-pov', pageCount: 296, publicationYear: 2019, standalone: false, contentWarnings: [] },
  'get-a-life-chloe-brown': { pov: 'dual-pov', pageCount: 373, publicationYear: 2019, standalone: false, contentWarnings: ['abuse'] },
  'take-a-hint-dani-brown': { pov: 'dual-pov', pageCount: 374, publicationYear: 2020, standalone: false, contentWarnings: ['anxiety'] },
  'act-your-age-eve-brown': { pov: 'dual-pov', pageCount: 368, publicationYear: 2021, standalone: false, contentWarnings: ['anxiety'] },
  'honey-and-spice': { pov: 'single-fmc', pageCount: 368, publicationYear: 2022, standalone: true, contentWarnings: [] },
  'the-siren': { pov: 'dual-pov', pageCount: 302, publicationYear: 2016, standalone: true, contentWarnings: ['bdsm', 'power-imbalance'] },
  'beg-for-it': { pov: 'dual-pov', pageCount: 322, publicationYear: 2014, standalone: true, contentWarnings: ['bdsm', 'dubcon'] },
  'sweetest-kill': { pov: 'dual-pov', pageCount: 340, publicationYear: 2022, standalone: true, contentWarnings: ['violence', 'bdsm'] },
  'headliners': { pov: 'dual-pov', pageCount: 362, publicationYear: 2023, standalone: false, contentWarnings: [] },
  'these-hollow-vows': { pov: 'single-fmc', pageCount: 404, publicationYear: 2021, standalone: false, contentWarnings: ['violence', 'manipulation', 'death'] },
  'sorcery-of-thorns': { pov: 'single-fmc', pageCount: 456, publicationYear: 2019, standalone: true, contentWarnings: ['violence', 'death'] },
  'a-promise-of-fire': { pov: 'single-fmc', pageCount: 441, publicationYear: 2016, standalone: false, contentWarnings: ['violence', 'death', 'kidnapping'] },
  'an-enchantment-of-ravens': { pov: 'single-fmc', pageCount: 300, publicationYear: 2017, standalone: true, contentWarnings: ['violence'] },
  'daughter-of-the-moon-goddess': { pov: 'single-fmc', pageCount: 489, publicationYear: 2022, standalone: false, contentWarnings: ['violence', 'death'] },
  'heart-of-the-sun-warrior': { pov: 'single-fmc', pageCount: 400, publicationYear: 2022, standalone: false, contentWarnings: ['violence', 'death', 'war'] },
  'the-jasmine-throne': { pov: 'multi-pov', pageCount: 528, publicationYear: 2021, standalone: false, contentWarnings: ['violence', 'death', 'abuse'] },
  'the-priory-of-the-orange-tree': { pov: 'multi-pov', pageCount: 832, publicationYear: 2019, standalone: true, contentWarnings: ['violence', 'death', 'war'] },
  'fall-of-ruin-and-wrath': { pov: 'single-fmc', pageCount: 496, publicationYear: 2023, standalone: false, contentWarnings: ['violence', 'death', 'dubcon'] },
  'a-touch-of-darkness': { pov: 'single-fmc', pageCount: 305, publicationYear: 2019, standalone: false, contentWarnings: ['violence', 'death', 'dubcon', 'kidnapping'] },
  'king-of-battle-and-blood': { pov: 'dual-pov', pageCount: 496, publicationYear: 2022, standalone: false, contentWarnings: ['violence', 'blood', 'death', 'dubcon'] },
  'crave': { pov: 'single-fmc', pageCount: 583, publicationYear: 2020, standalone: false, contentWarnings: ['violence', 'death'] },
  'the-songbird-and-the-heart-of-stone': { pov: 'single-fmc', pageCount: 400, publicationYear: 2024, standalone: false, contentWarnings: ['violence', 'death'] },
  'a-fate-of-wrath-and-flame': { pov: 'single-fmc', pageCount: 544, publicationYear: 2022, standalone: false, contentWarnings: ['violence', 'death', 'blood'] },
  'daughter-of-no-worlds': { pov: 'single-fmc', pageCount: 474, publicationYear: 2021, standalone: false, contentWarnings: ['violence', 'death'] },
  'the-traitor-queen': { pov: 'dual-pov', pageCount: 496, publicationYear: 2023, standalone: false, contentWarnings: ['violence', 'death', 'war'] },
  'a-curse-of-queens': { pov: 'single-fmc', pageCount: 450, publicationYear: 2023, standalone: false, contentWarnings: ['violence', 'death'] },
}

// Walk book directories
const booksDir = new URL('../src/data/books', import.meta.url).pathname
const genres = readdirSync(booksDir).filter(f => statSync(join(booksDir, f)).isDirectory())

let updated = 0
let skipped = 0

for (const genre of genres) {
  const genreDir = join(booksDir, genre)
  const files = readdirSync(genreDir).filter(f => f.endsWith('.js'))

  for (const file of files) {
    const bookId = file.replace('.js', '')
    const meta = BOOK_META[bookId]
    if (!meta) {
      skipped++
      continue
    }

    const filePath = join(genreDir, file)
    let content = readFileSync(filePath, 'utf8')

    // Check if already has metadata
    if (content.includes('contentWarnings') || content.includes('publicationYear')) {
      skipped++
      continue
    }

    // Build metadata string to insert before synopsis
    const metaLines = []
    if (meta.pov) metaLines.push(`  pov: "${meta.pov}",`)
    if (meta.pageCount) metaLines.push(`  pageCount: ${meta.pageCount},`)
    if (meta.publicationYear) metaLines.push(`  publicationYear: ${meta.publicationYear},`)
    if (meta.standalone !== undefined) metaLines.push(`  standalone: ${meta.standalone},`)
    if (meta.contentWarnings) {
      if (meta.contentWarnings.length === 0) {
        metaLines.push(`  contentWarnings: [],`)
      } else {
        metaLines.push(`  contentWarnings: [${meta.contentWarnings.map(w => `"${w}"`).join(', ')}],`)
      }
    }

    const metaBlock = metaLines.join('\n')

    // Insert before synopsis line
    content = content.replace(
      /(\n  synopsis:)/,
      `\n${metaBlock}\n  synopsis:`
    )

    writeFileSync(filePath, content)
    updated++
  }
}

console.log(`Updated: ${updated}, Skipped: ${skipped}`)
