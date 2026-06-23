import {importArticle, type ArticleInput} from '../import-article'

const article: ArticleInput = {
  title: 'The MineShaft Weekly — 9th Jan \'26',
  slug: 'the-mineshaft-weekly-9th-jan-26',
  eyebrow: 'The MineShaft Weekly',
  subtitle: 'stORE, Shielded Privacy & TurboORE',
  publishedAt: '2026-01-09T00:00:00Z',
  xUrl: 'https://x.com/OREsupply',
  intro: [
    'The first full week of 2026 has been full of updates for Solana native SoV @OREsupply. From launching a LST to having shielded functionality to having a liquidation protected exposure mechanism through TurboORE, HHC and team are nonstop shipping.',
    'This week\'s updates are coming to you through an article instead of a long post thanks to Elon broadening the availability of articles (which means more pictures!)',
  ],
  sections: [
    {
      heading: 'The big development of stORE — Ore\'s official liquid staking token',
      body: [
        'For users, instead of just staking the token and leaving it illiquid within the stake pool, they can wrap this and use it in Solana\'s vast defi ecosystem.',
        'One thing to note is that the conversion rate from stORE to ORE is variable and will increase over time as staking yield is auto-compounding for stORE holders and this is reflected in the conversion rate.',
        'stORE has been verified on Jupiter and other popular swap platforms such as Kamino swap.',
        'An article that is great at explaining how to convert your ORE to stORE and shielding it for privacy aka \'encrypted yield\' has been written by @DChapmanCrypto.',
      ],
    },
    {
      heading: 'Storing Value privately with @theprivacycash',
      body: [
        'After the launch of the shielded pool for ORE on the 2nd January, the pool officially had over $600k of ORE privately transferred within a single day. It also became the largest pool behind SOL on the platform showing tremendous demand of having value stored privately.',
        'This only accelerated with stORE and ORE being moved above the ZEC option on the Privacy platform as it reached over $1.8m shielded in total between stORE and ORE.',
      ],
    },
    {
      heading: 'Ore goes Turbo with @DeFiCarrot\'s latest launch',
      body: [
        'TurboORE is a way for you as a trader to get leveraged exposure to ORE with liquidation protection. Now you are probably wondering how this works? It\'s simpler than you may think!',
        'You mint TurboORE using ORE or USDC → Hold it like any other spot token → When you have hit your profit target simply sell it into ORE or USDC.',
        'Why use TurboORE? Well, spot holding only gives 1:1 exposure and leverage is scary, this way you can get a nice middle ground where you get more exposure with automatic protection due to the DeFi Carrot Smart Risk engine meaning you never have to monitor margin ratios or the position itself.',
        'The leverage applied varies with the Smart Risk engine and can be seen by clicking the leverage tab. If you have any questions as to how this works make sure to visit the ORE discord and scroll up (or search TurboORE) and there is a high likelihood that your question has been answered.',
        'I want to give a shoutout to @jsblair for being very active in the ORE discord at the time of launch and answering all the questions the community had. This is the type of thing that makes collaboration launches go so smoothly and the performance is evident by the fact that DeFi Carrot saw over 300k volume on TurboORE and the vault owns ~1321 ORE as it currently stands (all within a week!!).',
      ],
    },
    {
      heading: 'Auto Miners keep on evolving',
      body: [
        'Not only does the team ship at an incredible pace, so does the community of builders around ORE.',
        'This week saw a new open-source advanced auto miner enter the ecosystem created by @fauxfire_ that contains features such as full customizability, strategy selection and statistics tracking.',
        'RefinOre by @JussCubs & @nftimm have introduced a points and referral system as well as an onramp deposit system that allows depositing of USDC directly via Apple Pay. It is also worth noting that they recently showed off their swap fees of 0.5% that perform better than your standard Solana wallet.',
        '@Ore_Miner_io has introduced new features that simplify mining for everyone by allowing you to easily copy mine profitable miners with one click.',
        'The @minemoreapp crew have been sharing reviews of their community members\' strategies such as the cheap tile hunter and celebrated their community capturing 15% of the top miner share on the evening of 7th January.',
        '@orematic_com launched their feedback for free service fees program that allows users to provide feedback in return of waving their 0.25% service fee on their autominer.',
      ],
    },
    {
      heading: 'Art and Poetry flourishes in the Mines',
      body: [
        'From community members releasing albums in honor of ORE, to the famous Just Mine It series, art and poetry is loved by miners.',
        'One standout piece of art that has been used to educate and highlight some great stats was created by @extasy_sol that shows off the ratio of ORE that is staked/unclaimed or committed with extra steps to sell vs that could be easily transferred.',
        'If you want to understand the philosophy behind ORE and what makes it such a great store of value, there is none better than @pokerchessman to follow and read the posts which outline the why and how as to why ORE.',
        'The ecosystem also saw another NFT launch in @orellionsnft who will be injecting all of the fees into Ore and redistributing the ORE earned to holders.',
      ],
    },
    {
      heading: 'The data shouts highORE!',
      body: [
        'This week has been extremely strong with price action moving ORE higher with it flipping Solana once again. This comes with increased Solana deployed in the mines which in turn has supercharged the protocol revenue with Tuesday hitting over ~200k in 24hr revenue.',
        'Over ~1m in weekly revenue for Ore.',
        'Circulating supply has now reached over 420,000 Ore slowly increasing with this weeks\' net emissions being 1,983 ORE.',
        'The Average Bet Size has nearly doubled week on week over the past 3 weeks which shows an increased appetite for ORE. This comes with Ore crossing 16k Lifetime users and over 40 million lifetime transactions.',
        'One big milestone to celebrate is that Manual Mining Bets have crossed the 10 million mark!',
        'This brings us to a close for this week\'s MineShaft round up, and remember, it is time in the mines, not timing the mines.',
        'The Hardhat stays on.',
      ],
    },
  ],
}

importArticle(article)
