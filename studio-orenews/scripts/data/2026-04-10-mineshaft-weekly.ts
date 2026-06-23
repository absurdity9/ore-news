import {importArticle, type ArticleInput} from '../import-article'

const article: ArticleInput = {
  title: 'The MineShaft Weekly — Ore v4 Inbound?',
  slug: 'the-mineshaft-weekly-ore-v4-inbound',
  eyebrow: 'The MineShaft Weekly',
  subtitle: 'Ore v4 Inbound',
  publishedAt: '2026-04-10T00:00:00Z',
  xUrl: 'https://x.com/zinnresearch',
  intro: [
    'This week has seen @HardhatChad move the ore staking program in anticipation of its freeze and tease his new idea in which he claims that mining is about to become more fun.',
    'With the tease of Ore v4, HHC posted a comment that read \'PoW -> RNG -> ???\' that has got miners wondering what it could be that he has come up with now.',
    'In addition to this, we saw @minemoreapp hold another Insider Chat with community philosopher @pokerchessman and much more!',
    'Keep reading this week\'s edition of The MineShaft Weekly to catch you up on all things Ore.',
  ],
  sections: [
    {
      heading: 'Ore retains leading Revenue position',
      body: [
        'As per @DefiLlama, Ore has held a strong position within the top 10 of the revenue leaderboard for apps on Solana. In the 30d timeframe, Ore stands in 8th whilst in the 24hr and 7d timeframe it holds the 10th position.',
        'This shows that whilst the market has slowed down and mining cost is mostly below market price, Ore protocol\'s revenue loop is working very efficiently.',
      ],
    },
    {
      heading: 'PoW -> RNG -> ???',
      body: [
        'It all started this week when HHC stated he had another idea. Now if you have been a member of the Ore community for a while, you know this means that HHC is about to release something ground breaking.',
        'Before he explained his idea, some important admin work had to be completed such as moving the ore staking program and identifying the ideal lockup time so that this program could be frozen. HHC ran a poll in the Discord to ask what people would prefer and a 24hr period won, however this needs to be confirmed with the DeFi integrations to ensure all keeps running smoothly with them if the lockup period is introduced.',
        'Then yesterday HHC dropped these teasers. This suggests that the way mining is conducted is about to change from the previous versions and miners from all over the community have been trying to guess what this will be. Will HHC introduce a completely novel way to mine Ore? Let me know what you think it will be in the comments!',
      ],
    },
    {
      heading: 'The MineMaster Competition',
      body: [
        'As announced in last weeks MineShaft Weekly, the Minemaster competition is back for April and it is heating up. The competition is seeing increased participation and improved SOL/ORE ratios and its only been over a week into the competition.',
        'The #1 place has already improved on March\'s winner score by a factor of 50% by having a 0.2296 Sol per ORE score compared to 0.4484 Sol per ORE. Two familiar faces in @Fyvieloon and Dickcoin are in the top 5 again and already approaching similar levels of Ore mined in the first 10 days of the competition compared to their previous months performance.',
        'It will be exciting to see how this month\'s competition turns out!',
      ],
    },
    {
      heading: 'The Auto Miners keep refining',
      body: [
        'This week has seen @minemoreapp hold another Insider Chat episode this time with @pokerchessman covering problems surrounding BTC and why ORE is the modern solution and more.',
        'New entrant Dopamine by Impify redesigned their UI for mining and introduced a spinning wheel that allows users to pick a number that represents a block to mine Ore.',
        '@MoistToken introduced a Ore themed character into their Moist Surge sidescroller game.',
      ],
    },
    {
      heading: 'Ore by the Numbers',
      body: [
        'This week saw weekly Unrefined Ore growth exceed the previous four weeks by nearly 2x growing from 62,292 uORE to 63,781 uORE. In addition to this refined Ore grew by ~800 from 14,349 to 15,132.',
        'Refined APY has remained in the high 70% area whilst staking APY has stayed above 15% most of this week. Revenue for Ore has steadied around ~40k per 24hr period with around 360-400 users per 24hrs.',
      ],
    },
    {
      heading: 'How to Mine More',
      body: [
        'This weeks top PnL miner on the @minemoreapp leaderboard is the same as last week with a whopping $1096 PnL and 139 Ore mined.',
        '3 of Avii\'s subaccounts run a strategy playing 0.01 sol over 25 tiles every single round whereas the Big Motherlode Seeker plays 0.02 sol over 13 tiles.',
        'This strategy takes the lotto miner strategy but with boosted capital to profit of the fact that mining production cost is mostly below market price. It is easy to replicate it both in MineMore and the official Ore miner if you want to follow Avii\'s winning strategy.',
        'Both #2 and #3 rank take similar strategies with playing all 25 tiles, where #3 Kalmurbati plays with 0.1 sol per round whereas ArD2Q plays with 0.005 sol per round but with a 2% EV filter.',
      ],
    },
    {
      heading: 'Ore\'s story is not written yet',
      body: [
        'As written by Ore\'s very own philosopher @pokerchessman, "Ore\'s story is not written yet but the community remains strong." From community members voicing their conviction, consistent discussions within the Discord, to the loudest of voices showing support, Ore is building strong even in the depths of this slow market.',
        'If you\'ve enjoyed this read make sure to share it with your friends and introduce them to the mines if they are not already mining! I\'m excited to see what the next week brings especially with HHC\'s teasers, and if you haven\'t seen it yet, Brian has turned into David (IYKYK).',
        'As always, the Hardhat stays on and I will see you in the Mines.',
      ],
    },
  ],
}

importArticle(article)
