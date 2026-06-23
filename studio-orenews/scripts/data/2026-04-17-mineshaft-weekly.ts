import {importArticle, type ArticleInput} from '../import-article'

const article: ArticleInput = {
  title: 'The MineShaft Weekly — mORE platforms integrate Ore',
  slug: 'the-mineshaft-weekly-more-platforms-integrate-ore',
  eyebrow: 'The MineShaft Weekly',
  subtitle: 'Platform Integrations / Omnipair',
  publishedAt: '2026-04-17T00:00:00Z',
  xUrl: 'https://x.com/zinnresearch',
  intro: [
    'Ore continues to make strides with two further platform integrations this week alongside a mini movie that is in the works.',
    'In addition to this, there is a Motherlode prediction market being worked on by one of the community members and Ore is dominating the numbers, being #1 ranked in Holders Earnings rate (%) amongst all platforms according to @DefiLlama statistics.',
  ],
  sections: [
    {
      heading: 'mORE platforms for the Miners',
      body: [
        'The first platform that announced an Ore integration this week is @omnipair, an unified liquidity pool platform with no intermediaries.',
        'Omnipair announced 3 pools that included Ore & stORE with the first being announced on the 11th with a stORE / USDC pool. The second pool launched was stORE / Ore, with a final and third pool in OMFG / stORE. The demand for these pools are resounding with the OMFG / stORE pool rising to 3rd highest pool by TVL and #1 by 24 hour volume within just 3 days after launch.',
        'The Ore team held a Minerside chat with the Omnipair team yesterday to celebrate this integration and if you wish to listen back to it, you can do so here.',
        'The second platform that integrated Ore is @voblefun, a word game that tests your vocabulary. In this game, players are rewarded with USDC through leaderboard placements and activity points for every game completed. With this new integration, instead of swapping activity points for their own native token in VOBLE, the players can now swap activity points for Ore.',
        'Currently 1 activity point can be redeemed for 0.001 Ore, however the reward rate is configurable onchain and may change over time.',
      ],
    },
    {
      heading: 'A movie in the making',
      body: [
        'The team behind @Wisemenmentors dropped a teaser this week that they are creating a mini movie focused on ORE. This comes one day after dropping their movie on Truth Terminal named \'Already Alive: The Story Crypto told First\' that gained over 60,000 views on X.',
        'What lore pieces do you think are a must to be included in this mini movie? Make sure to let the team know in the comments of either this article or their post!',
      ],
    },
    {
      heading: 'The Minemaster Competition heats up',
      body: [
        'It is another week into April\'s MineMaster competition ran by @minemoreapp, sponsored by @Lothaen, @pokerchessman and @Zedge_ORE and the competition is heating up.',
        'This week has seen Strike move up to third place and the top 3 competitors mining over 130 ore and over 60,000 rounds between them. Do you think next week will see Plaudd keep the lead they have been holding from week 1?',
      ],
    },
    {
      heading: 'The Miner community keeps refining',
      body: [
        'It\'s been another whirlwind of a week in the mines with the following updates:',
        'Popular auto miner @minemoreapp hopped on a degen lounge spaces to spread the word about Ore and their auto miner.',
        '@DERUGGEDDOJO posted an update after directing their royalties to the mines with now over 1.3 Ore in their treasury.',
        '@JussCubs posted a teaser inside the Discord of him working on a Motherlode prediction market.',
        'There have been rumors of a possible Blockworks Token report for Q1 for Ore after one of their analysts asked the Solana community who they would like to see covered.',
        'And lastly, there are some rumbles coming from within the Mines.',
      ],
    },
    {
      heading: 'Ore by the Numbers',
      body: [
        'It has been a great week for the Mines with revenue per 24hrs rebounding by ~50% back to an average of ~60k. Lifetime Users also expanded by roughly 1%, showing fresh interest in the mining ecosystem.',
        'Inside the same week, the total amount of Solana deployed in the mines doubled from ~260 Sol to ~550 Sol.',
        'With recent migrations of the staking contract, MineShaft Weekly is awaiting for analytics pages to catch up with the change to report on these numbers and looks forward to seeing how Miner Domination and other related statistics have improved.',
      ],
    },
    {
      heading: 'How to Mine More',
      body: [
        'In the last two editions of the MineShaft Weekly, the lottery mining strategy of playing all 25 blocks with a little amount of Solana had been seen to the highest PnL strategy with @AviiD_ll holding the #1 position using this.',
        'However this week, a miner with the name of Dickcoin has taken the lead with a whopping ~$4,200 PnL.',
        'With 24 subaccounts, most being in profit, the top two profitable subaccounts feature the famous lottery strategy as well as a Motherlode hunter strategy that deploys 0.075 SOL over 23 tiles. This is combined with a Motherlode minimum of 305 Ore yielding Mr Dickcoin over 203 Ore and a PnL of $1,406. This Motherlode hunting strategy can be easily copied on Minemore and replicated on the official Ore supply frontend by manually waiting for the Motherlode to exceed 305 ore and deploying the same strategy.',
        'If you have used a similar strategy, let me know how its performed for you in the comments!',
      ],
    },
    {
      heading: 'Closing thoughts',
      body: [
        'Closing out this weeks edition of the MineShaft Weekly, I urge you to make sure to regularly read the Discord if you are interested in Ore as a lot of the discussions occur in there and it is a place full of bright minds. One of them being the Mines philosopher @pokerchessman who continues to evangelize what is to be a believORE with his posts that make us all covet Ore.',
        'I hope you enjoyed reading and if you did, make sure to share it with your friends and I look forward to the next week of developments within the Mines. Until then, the Hardhat stays on and I will see you in the Mines.',
      ],
    },
  ],
}

importArticle(article)
