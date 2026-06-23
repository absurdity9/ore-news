import {importArticle, type ArticleInput} from '../import-article'

const article: ArticleInput = {
  title: 'The MineShaft Weekly — mORE frontends for miners.',
  slug: 'the-mineshaft-weekly-more-frontends-for-miners',
  eyebrow: 'The MineShaft Weekly',
  subtitle: 'Run Rate / mining rounds',
  publishedAt: '2026-03-27T00:00:00Z',
  xUrl: 'https://x.com/zinnresearch',
  intro: [
    'From revealing the annual run rate being over $20m to multiple new frontends from community builders, this week has been action packed for @OREsupply.',
    'Did you know that there\'s more shielded Ore than currently held in vaults or on CEXs? Sounds a lot like Ore is cementing its place as Solana\'s private store of value.',
  ],
  sections: [
    {
      heading: 'The Weekly Ore Snapshots',
      body: [
        'The Ore team continues their weekly snapshot saga showing great yields and a steady retention of miners in a weak macro market. This is a great example showing that whether we are going up or down, miners stay in the mines.',
        'What other snapshots would you like to see posted regularly?',
      ],
    },
    {
      heading: 'Last chance for Minemaster Competition',
      body: [
        'This week is the final week of the Minemaster competition run by @minemoreapp x @CompoundORE. If you have not participated, you still have a chance of winning, the current #1 rank on the leaderboard has a strategy of deploying 0.005 SOL on 25 Tiles per round with a 2% EV filter.',
        'You never know, the mines may be in your favor and grant you that #1 spot and remember you have to deposit 10 ORE on CompoundORE to be eligible!',
      ],
    },
    {
      heading: 'Auto Miners Accelerate',
      body: [
        'The ore builder community were full steam ahead this past week, with multiple updates being posted from a range of auto miners.',
        'First up was RefinOre by @JussCubs who launched Roberto, an ai agent that answers questions about ORE. You can ask it questions ranging from EV to facts about Ore and whilst you wait for a response, you can even watch some brainrot clips to keep you entertained.',
        '@Smeltedxyz launched their auto-reload and auto claim for their auto miner allowing you to keep mining for longer on a smaller budget.',
        '@minemoreapp has brought the world of Ore and their insider chats to Spotify and conducted another episode this week with @RHBcrypto who has been mining ORE since v1. They have shipped Cloudflare protection to their app this week to help protect users. And lastly they posted HHC\'s response to community concerns that can be read here.',
        'The community got to witness two new entrants to the Ore builder community with @0rdlibrary publishing mining on SolanaOS and @impifylabs launching Dopamine that brings a Candy crush like UI to Ore mining.',
      ],
    },
    {
      heading: 'Ore Foundation Governance',
      body: [
        'This week saw the continuation of discussions around the Ore Foundation and how its governance will play out. To aid in this, @pokerchessman posted a poll asking what governance structure actually works at global scale.',
        'The results showed that a dominant amount of people believe that a small executive leadership with strong accountability works best at global scale.',
        'With this in mind, how should this small executive team be voted in? How long would their terms be, and what restrictions would they carry? What should reporting to the rest of the community standards be? These are some of the questions that arise with this style of leadership. If you have some thoughts on this you are encouraged to comment them below or in the ORE Foundation Governance thread in the discord.',
      ],
    },
    {
      heading: 'Ore by the Numbers',
      body: [
        'This week saw Ore surpass the 200,000th round of mining! At the time of writing ORE is on its 206,000th round and it is amazing to see how far its come since its reintroduction in October. Additionally, Ore has surpassed 80 million Lifetime transactions as per the @counterpartytv Dune Dashboard.',
        'Ore has managed to retain ~400 Miners and averaged ~$55k in revenue per 24hr period and saw holders accumulate ORE 6 out 7 days this week. Average mining cost saw similar statistics being below market price for 6 out of 7 days with staked, shielded, refined and unrefined Ore showing steady growth this week of about ~1k Ore per metric.',
        'Miner dominance grew from 16.51% to 16.9% and the number of Belivores holder wallets grew from ~7.9k to ~8.1k.',
      ],
    },
    {
      heading: 'How to Mine More',
      body: [
        'This week\'s leaderboard saw a miner by the name of Pop hold the #1 rank on Minemore. The strategy for his top performing subaccount might surprise you.',
        'He managed to mine 2.7 Ore this week with this strategy!! Now you may think he was being lucky but looking at the #2 rank on the leaderboard they followed with the same strategy but with 0.01 SOL on a singular tile per round mining over 6.7 ORE.',
        'This shows that \'lottery mining\' is in full swing and yielding results, which is great if you are new to Ore as you do not need a lot of Solana for this strategy. If you try this strategy over the next week and hit the 1 Ore jackpot, let me know!',
        'This brings us to the end of another MineShaft Weekly, if you have enjoyed reading this make sure to share it with your friends and leave a like!',
        'If you would like to see additional sections cover a specific part of ORE whether its lore, technical or community related, don\'t be afraid to drop me a DM or let me know in the comments.',
        'I look forward to what the next week brings and until then, the hardhat stays on and I will see you in the mines.',
      ],
    },
  ],
}

importArticle(article)
