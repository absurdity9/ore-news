import {importArticle, type ArticleInput} from '../import-article'

const article: ArticleInput = {
  title: 'The MineShaft Weekly — Miners Domination',
  slug: 'the-mineshaft-weekly-miners-domination',
  eyebrow: 'The MineShaft Weekly',
  subtitle: 'Mining Dominance, Minerside Chat with Minemore & Ecosystem Refinement',
  publishedAt: '2026-02-13T00:00:00Z',
  xUrl: 'https://x.com/zinnresearch',
  intro: [
    'Miners are lining up to get that juicy ORE reward as mining costs fall below the market price. The motherlode hit 695 ORE earlier this week doubling the average amount of sol deployed compared to other motherlodes this week.',
    'The team posted the official Minerside chat recording which is summarized below and miners have increased their dominance in holdings by over 10% this week. Even on a quiet week, a ton has occurred and I\'m happy to bring you another edition of the Mineshaft Weekly to bring you up to date.',
  ],
  sections: [
    {
      heading: 'Minerside Chat - Talking with Minemore',
      body: [
        'Last week saw the @OREsupply team have a ~90 minute long stream in discord with the @minemoreapp founders preluded with a chat between @Starship_Fronk, @Lothaen and Ore lead @HardhatChad.',
        'The prelude chat consisted of looking at previous achievements such as the $337k revenue day, the launch of stORE, Ore\'s integration with privacy cash and lastly the privy integration. HHC teased that there is mORE to come with optimizations such as automatic top-ups using the Moonpay integration to allow non-crypto natives to easily get involved in mining.',
        'The chat also heard HHC talk about the early beginnings of ORE as well as ecosystem strategy, a brilliant summary of the topic was written by @OREsupply_ZHKR.',
        'The Minerside chat continued with its main guests @SpuddyA7X and @willdxyz from Minemore that included them going over the core functionality of the app as well as their strategies, analytics and teases of future flywheels that may be implemented. It was great to hear about their design philosophy aligning with being long term minded for years to come and that they build for the miner. They mentioned that it is their goal to enable miners to hold onto their sol for as long as possible through their strategies as they found this increased retention, providing a win for all parties involved.',
        'Minemore celebrated representing nearly 50% of all active miners just a few days after showing that the growth of the Autominer continues in a straight line upwards and I highly recommend giving the Minerside Chat a watch to learn more about the developers behind it as well as taking in the gems they dropped on strategies to maximize your efficiency when it comes to mining.',
      ],
    },
    {
      heading: 'The Ore ecosystem keeps on refining',
      body: [
        'From a developer reveal to the creation of fun art creations, the Ore ecosystem is always in a continuous cycle of refinement mirroring the work ethic shown by the team behind Ore itself.',
        'First up we had the main developer behind @CompoundORE being revealed in @authorofthesurf. The cash advance protocol powered through Ore stacking has recently integrated a long list of tokens through integrations with @RemoraMarkets and @photofinishgame allowing you to get cash advances on tokenized RWA\'s and Crown!',
        'Popular Autominer @minemoreapp integrated hot/cold patterns, discord usernames in their app and celebrated a collaborative moment with @cherrydotfun. After bouncing back quickly from an outage due to an infra provider losing service, they celebrated the community with minemoreart being created.',
        'Another popular autominer in Refinore by @JussCubs was highlighted for its agent integration on @SolanaFloor. I personally am excited to see what sort of activity this will yield in the following weeks as agents keep on accelerating with onchain activity.',
        'This week also saw the @FlashTrade FLP8 Ore pool yield a stunning 11.44% return compared to simply holding Ore as noted by @Kyojindoteth.',
      ],
    },
    {
      heading: 'CultORE in the mines',
      body: [
        'From the daily reminder from @K__c__G to get involved with Solana\'s native SoV to the philosophical thought provoking posts by @pokerchessman, it is safe to say that culture is abundant in the mines.',
        'After being featured in the droptv ad that Toly stated is their Superbowl ad, the highlight of the week came in the form of a @solanapoet art piece that depicted HHC in his famous typewriter art form.',
      ],
    },
    {
      heading: 'mORE numbers for the Mines',
      body: [
        'This week saw Ore cross over 60 million lifetime transactions, and keeping its performance with an average of ~82k per 24hrs in revenue meaning the HaWG keeps on eating well even in the worst of market conditions.',
        'In addition to this, the mines added over ~120 lifetime users and remained steady with around ~500 daily users. The average transactions per day remained around ~550k as per the previous week meaning that activity has remained steady.',
        'The two big statistics to focus on this week are the cost of production for ORE as well as the Miners Dominance. Miner dominance increased from 14.6% to over 15.35% showing that the conviction is ever growing.',
        'Secondly, the cost of production has fallen below the market price for the first time in a long while, providing the optimal entry for those who are seeking to accumulate ORE. You can reduce the cost of production even further by researching successful strategies through autominers such as Minemore and Refinore.',
        'That is all for this week miners, if you have enjoyed this read make sure to share the paper with your fellow friends whether they mine or not. If you have any suggestions of things you would like to see included in this weekly write up please let me know in the comments!',
        'Stay tuned for further developments and in progress research to show you as to why its more important than ever to participate in this modern Store of Value.',
        'Until then, remember that the Hardhat stays on and I will see you in the Mines.',
      ],
    },
  ],
}

importArticle(article)
