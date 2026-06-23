import {importArticle, type ArticleInput} from '../import-article'

const article: ArticleInput = {
  title: 'The MineShaft Weekly — Yields GalORE',
  slug: 'the-mineshaft-weekly-yields-galore',
  eyebrow: 'The MineShaft Weekly',
  subtitle: 'Yields GalORE',
  publishedAt: '2026-01-23T00:00:00Z',
  xUrl: 'https://x.com/zinnresearch',
  intro: [
    'This week its been yields galore in the mines. From the integration of @ExponentFinance allowing you to get more yields (and points) from your stORE, to being a top performing pool on @kamino giving over 190% APY.',
    'Miners are speculating that more partner integrations are going to be rolled out as the official brand page has been released. In addition to this, a miner sets out on a long term journey, purchasing Ore daily as well as a community made analytics site getting further improvements.',
  ],
  sections: [
    {
      heading: 'All about exponential yields',
      body: [
        'DeFi platform Exponent has now listed stORE (Ore\'s native LST) allowing users to split it into two parts, principle (PT-stORE) and yield (YT-stORE).',
        'This allows users to exchange stORE\'s variable yield for a fixed return at maturity, swap the principal for leveraged long exposure to its yield or simply provide it to earn swap fees on trades on Exponent on top of stORE\'s yield.',
        'Additionally, miners yielded great results in the @kamino ORE-SOL vault with it providing 196.84% APY currently with a 2.1% ROI for the week with 320k in fees since its creation. This pool keeps being a top performer for the platform showing there is always gold to be struck, you just need to seek it!',
      ],
    },
    {
      heading: 'Seek ORE and you shall find mORE',
      body: [
        'Another big release from the team this week has been the publishing of its official brand page that allows easy access to brand materials for media and partners. Miners are speculating that the defi integrations are starting to roll in mORE and mORE with this move. Will we see Solana\'s native SoV be used all across the chain\'s DeFi ecosystem?',
        'With this, there was an announcement that was celebrated by many. The SKR launch by @solanamobile, which had a developer allocation of 750,000 tokens, which ORE and some of its Auto Miners were eligible for. At the time of writing, this allocation is worth over ~$23k! Congratulations for those who received this and I hope it pays for plenty of ramen to continue digging deep for the weeks and months to come.',
      ],
    },
    {
      heading: 'Auto Miners keep expanding',
      body: [
        'On the topic of SKR, the Auto miner Refinore has integrated the possibility of mining ORE with the SKR token. This was greatly received by getting a retweet from Solana Mobile as well as a response from Toly who has been encouraging developers to build apps that gets users to spend the SKR.',
        '@minemoreapp celebrated making up over 30% of the active current miners just yesterday and also celebrated receiving the developers allocation from SKR.',
        '@Ore_Miner_io also received the developers 750k SKR allocation and dropped a celebratory post.',
        'A new Auto miner debuted in @omm_protocol featuring a Lottery mode, an auto miner mode as well as allowing the redemption of its NFTs. Users can level up, collect badges and rise up the ranks for gloating rights.',
        'Lastly, the analytics page by @cunmap7218 got some upgrades such as showing the refined apy curve, Miner power and domination progress.',
      ],
    },
    {
      heading: 'Ore is our Money',
      body: [
        'This week saw community wordsmith @pokerchessman publish an article titled \'Ore is our Money\' that really highlighted the belief system behind ORE for many. If you have not read it yet, I highly encourage it as not only is it a high quality piece of writing, it is something that provokes thought beyond what we normally see on the timeline.',
        'A community member in @cryptoyormansol has embarked on an adventure that features a daily buy on ORE akin to those you see on the timeline where people previously DCA\'d bitcoin in the years prior. This shows the conviction the community has in believing that ORE is the next generation SoV that the ecosystem needs.',
        'This week also saw an inquiry by a member of the Adrena Protocol asking the community if there is demand for perpetuals on Ore, if you are interested in this please see the ecosystem section of the discord.',
        'And it wouldn\'t be a week in the mines without @MMTheSamurai\'s Just Mine It art, this has caught on so heavily that there is now a second page in @mtradesuk has started a \'dig it\' series.',
        'If you are in the discord, you will have seen @Moosey_Sol\'s new HaWG memes which are always top notch! Make sure to show him some appreciation whenever you next pass by the mines.',
      ],
    },
    {
      heading: 'The Data screams highORE',
      body: [
        'After witnessing an impressively high Motherlode of 500+ Ore, it was no surprise to see ORE doing nearly 10% of all Solana\'s App revenue. This came with the protocol crossing $200m in lifetime volume as well as seeing an average user increase of 20%.',
        'The current refined APY stands at an average of 69.9% and miners are accumulating stORE, refined, and unrefined Ore with stORE supply increasing by 10%, unrefined ORE up 12% and refined ore up 4.5% from last week.',
        'Overall, all the data is showing signs of strength and continued growth signalling that recent price action is not deterring users from further accumulation and in fact that miners are using this opportunity to mine more! Of course this does not serve as mining or financial advise and you should always make sure to wear a hardhat before entering.',
        'With another week coming to a close, its always a joy for me to look back at the previous week of what\'s happened in ORE. It\'s mind blowing to see the rate of progress that community built projects on top of the protocol as well as the protocol itself accelerate.',
        'If you have enjoyed this weekly news report write up, make sure to drop a like and share it with a friend to get them involved in the mines!',
        'I will see you in the Mines and remember, the hardhat stays on!',
      ],
    },
  ],
}

importArticle(article)
