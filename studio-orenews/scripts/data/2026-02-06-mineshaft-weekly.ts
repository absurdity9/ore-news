import {importArticle, type ArticleInput, type MagazineInput} from '../import-article'

const article: ArticleInput = {
  title: 'The MineShaft Weekly — mORE composability',
  slug: 'the-mineshaft-weekly-more-composability',
  eyebrow: 'The MineShaft Weekly',
  subtitle: 'mORE Composability, Minerside Chat & Prediction Markets',
  publishedAt: '2026-02-06T00:00:00Z',
  intro: [
    'In a week that troubled the market with horrific price action, miners did what they do best - keep on building and mining.',
    'From @HardhatChad teasing some new complex defi integrations empowered by Claude and team of clawds, to new community apps being shipped by builders within the Ore community. Read all about it below.',
  ],
  sections: [
    {
      heading: 'mORE composability for the mines',
      body: [
        'The week began with a tweet from the Chad with the Hardhat posting that he\'s \'assembling a team\' with a screenshot of a group chat called the Fellowship that contained characters named after the hobbits from Lord of the Rings.',
        'Then he tweeted that he\'s testing Claude on a new contract and followed up with a screenshot that teased both @kamino and @perena in an onchain transaction making the mines speculate that more DeFi integrations are on the way soon.',
      ],
    },
    {
      heading: 'Minerside chat explores @minemoreapp',
      body: [
        'This week saw the @OREsupply team come together on a Thursday night to sit down with the developers behind popular Auto Miner tool MineMore to explore what led to their success and how they approach building.',
        'With over 50+ miners in attendance, it is safe to say that people are excited to hear about the community builders and what they have to say! If you missed it, don\'t worry as @Lothaen will be posting the recording of this event early next week for you to enjoy. Would you like to see this interview style event become a regular occurrence with the abundance of builders present in the community?',
      ],
    },
    {
      heading: 'Miners get mORE mining options',
      body: [
        'This week already saw established Auto Miners make more updates as well as a new debut in the form of prediction markets in the ORE ecosystem.',
        '@CompoundORE\'s partnership with Layer33\'s validator program doubled their ORE rewards.',
        '@Smeltedxyz added more analytics for the token metrics as well as percentile ranking of you vs other miners on the platform.',
        '@minemoreapp introduced automatic account rotation allowing you to automate changing of subaccounts once your ORE target has been hit.',
        'We also witnessed the introduction of prediction markets entering the ORE ecosystem with @symbiotic_ore and @WhenMarkets.',
        'Symbiotic\'s prediction market works on whether the Motherlode will strike within 500 mining rounds (~8.3 hours) allowing users to buy yes or no options.',
        'WhenMarkets on the other hand are range based predictions.',
        'If these prediction markets interest you, it is highly encouraged to go into the discord and read the ecosystem section for both of these products to get a full understanding of how they operate including fees.',
        'Lastly, the agents (especially molt/clawd/openclaw) have been taking over the timelines and @JussCubs took the opportunity to make mining available for them with RefinOre.',
      ],
    },
    {
      heading: 'Bad markets show importance of ORE',
      body: [
        'This week saw markets dive down across the board from physical minerals to digital ones. However with this comes the reminder of why we participate and believe in ORE and there is no better philosopher than @pokerchessman to remind us of this with his tweets.',
        'We also saw a twist on the Just Mine It saga by @MMTheSamurai.',
        'The data reinforces the conviction of the community too with Refined and Unrefined ore being up +3.5% WoW as well as Ore in Defi Vaults being up over 25%. Ore has steadily remained a top 15 app for revenue with most weeks breaking into the top 5 aside from the past week.',
        'Ore also crossed 18k Lifetime users and is steadily remaining at about 500 daily users despite market conditions. Looking at the chart of daily users & transactions it is safe to say that even in bad conditions, miners are using the protocol and drop offs are minimal.',
        'As another week comes to a close, it is good to see that the Store of Value concept applied to ORE is remaining strong both in data but also community conviction. As one miner put it, Ore is the bitcoin for Zoomers.',
        'I am excited to see it continue to grow each week and what new things are built by the community as it grows more and more into the modern day SoV we all believe it to be.',
        'That is all for this week and as always, the Hardhat stays on and I will see you in the mines.',
      ],
    },
  ],
}

const magazine: MagazineInput = {
  title: 'Mineshaft Weekly — 6 February',
  week: '6 February',
  publishedAt: '2026-02-06',
  url: 'https://x.com/zinnresearch',
}

importArticle(article, magazine)
