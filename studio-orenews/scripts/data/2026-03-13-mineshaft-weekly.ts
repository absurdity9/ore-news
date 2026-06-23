import {importArticle, type ArticleInput} from '../import-article'

const article: ArticleInput = {
  title: 'The MineShaft Weekly — 100M Satoshis = 1 BTC, 1 ORE = 100B [?]',
  slug: 'the-mineshaft-weekly-100m-satoshis-1-btc-1-ore-100b',
  eyebrow: 'The MineShaft Weekly',
  subtitle: 'Grams / smallest unit of ORE',
  publishedAt: '2026-03-13T00:00:00Z',
  xUrl: 'https://x.com/zinnresearch',
  intro: [
    'Well known community member @Fyvieloon posed the question this week: There is 100M Satoshi\'s in a single bitcoin, how many Chads are there in Ore? This triggered a discussion on Discord within the Holder chat of what the decimal unit of ORE is called. @Starship_Fronk then asked for suggestions from holders, which got a huge range of answers. But did you know this has previously been decided. Keep reading to find out what it is!',
  ],
  sections: [
    {
      heading: 'The @CompoundORE x @minemoreapp competition',
      body: [
        'This week saw the start of a collaboration between two of the biggest teams inside the Ore ecosystem.',
        'The heart of this competition features Minemore now allowing you to deposit your ore inside CompoundORE to get a cash advance on more Solana to mine even more. The goal is to mine as much ORE as possible with the lowest SOL cost basis and the winner earns 5 ORE (originally 1 ORE). To be eligible for this competition you need to vault at least 10 ORE inside CompoundORE.',
        'For more information on this competition, go into either Minemore\'s discord or view their post here.',
      ],
    },
    {
      heading: 'The Weekly Snapshot Series',
      body: [
        'This week the @OREsupply team started with a new weekly snapshot series that will highlight key metrics from the ecosystem. The inaugural snapshot began with supply and quickly followed with a second snapshot inside of the same week.',
        'At the same time as highlighting key metrics, this will serve as an easy way to look back at metrics in the months to come which will in turn highlight the mathematical genius behind Ore\'s design.',
      ],
    },
    {
      heading: 'MineMore continues to refine itself',
      body: [
        'After holding another episode in their Insider chat series with guest @cragglebear that talked all about their CompoundORE competition as well as Craggle\'s performance in mining, the team introduced PNL cards so users can show off their great results.',
        'The cards show the strategy used, rounds and ORE mined as well as motherlodes hit. Hats off to the designer as it perfectly captures the mining & minemore brands inside of 1 card.',
        'The idea behind PnL cards are seen in many other parts of the ecosystem and its great to see them come to mining as they are an easy to share and feel good marketing tool.',
      ],
    },
    {
      heading: 'Ore by the numbers',
      body: [
        'As community philosopher @pokerchessman continues to spread Ore\'s design genius by highlighting that it is the people\'s money, he also showed off that Ore has now officially climbed into the 5th spot for 1Y Holders Revenue.',
        'When comparing the market cap of the projects in this list, Ore stands out as an outlier with its ~25m market cap compared to the others which are all above or near the billion dollar mark.',
        'Looking at other statistics around ORE, it has retained above 60k revenue per 24hr period as well as above ~460 users per day. The average bet size remains above ~$1.2 and it is super close to crossing the ~$250m mark when it comes to lifetime protocol volume.',
        'Unrefined Ore holdings took a slight hit this week with a big withdrawal that boosted refined ore holdings by 9% in a singular week. In addition to this Ore holders accumulated every single day with net inflows to their wallets this week.',
      ],
    },
    {
      heading: 'What is the smallest unit of ORE called?',
      body: [
        'I bet you\'ve been wondering this whole time what the smallest unit of Ore is called after that introduction. The discord proposed suggestions ranging from Nuggets, Geodes, Pebbles to Fragments. However, the correct answer is Grams and there is 100 Billion Grams in 1 Ore.',
        'Turns out the lore of this question goes all the way back to mid 2025 and even before that it was asked and became a discussion in the first edition of ORE back in 2024 where ORE was the reason the Solana chain halted.',
        'That wraps it up for this weeks\' MineShaft Weekly, but not without reminding you that the goal is to mine 1 unrefined Ore for future generations.',
        'As always I hope you enjoyed the read and if you did, make sure to share it with a fellow miner and non miner to spread the word.',
        'The hardhat stays on and I will see you in the Mines.',
      ],
    },
  ],
}

importArticle(article)
