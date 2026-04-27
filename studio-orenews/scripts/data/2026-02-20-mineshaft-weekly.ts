import {importArticle, type ArticleInput, type MagazineInput} from '../import-article'

const article: ArticleInput = {
  title: 'The MineShaft Weekly — Data shows conviction',
  slug: 'the-mineshaft-weekly-data-shows-conviction',
  eyebrow: 'The MineShaft Weekly',
  subtitle: 'Conviction, Minerside Chat with Trey & Valentine\'s Day Accumulation',
  publishedAt: '2026-02-20T00:00:00Z',
  intro: [
    'Another week has gone by in the mines and whilst the ecosystem\'s builders have been quiet, the data speaks loudly of the conviction miners are showing.',
    'Another Minerside chat was held by @Starship_Fronk & @Lothaen this time with @treybuckingham as guest and community member Orillions introduced an end of day report inside the discord.',
  ],
  sections: [
    {
      heading: 'Minerside Chat with Trey',
      body: [
        'Yesterday the community leaders in ORE held another Minerside chat this time with Trey as guest in which they discussed several things including current market sentiment and Ore\'s performance, key upgrades in the Solana ecosystem, the predicament of traditional crypto mining and ORE\'s core value positioning.',
        'If you want to watch it again you can do so on the discord, and if you want to read a summary in Chinese I highly recommend the write up by @OREsupply_ZHKR.',
      ],
    },
    {
      heading: 'The community keeps shipping',
      body: [
        'This week saw three main developments inside of the community. The first being the establishment of an end of day report by Orillion that shows a range of data points including Diamond hand activity, total claims, treasury totals and other wallet activity.',
        'Secondly, popular Auto Miner @minemoreapp introduced multiple languages inside of its app to widen its reach as well as embracing all of the common languages that use the seeker mobile.',
        'Another analytics page in the form of myOre has dropped that allows users to see their refined and unrefined Ore (with multi wallet support coming) without having to actually connect your wallet. This is perfect for tracking your performance when away from your mining devices and created by community member Jody!',
        'The team lead Zedge over at @CompoundORE dropped a guide to \'free mining\' that uses their cash advance services to allow continuous mining without the worries of getting liquidated. A great use case that allows you to refill those pickaxes.',
        'I would also like to welcome @MMTheSamurai back from his holidays and I am delighted to see the JUST MINE IT series back in full swing with not just 1 but 2 art pieces dropped this week.',
      ],
    },
    {
      heading: 'Ore by the numbers',
      body: [
        'Even though market sentiment overall is still in a state of turmoil, Ore holder\'s conviction is staying strong. When looking at user numbers, Ore\'s remain strong at ~500 users per 24 hours, revenue nearing ~100k every single day and miner dominance is gaining strength day on day.',
        'Unrefined and Refined Ore are steadily gaining ~2.5-3% a week showing that miners are convicted in their holdings and at this point actually hold nearly as much Ore as that in liquidity.',
        'Ore saw accumulation by holders in 7 out 7 days with Valentines day showing the highest amount of net buying, I guess you could say that miners love their Ore.',
        'A special shoutout to @cunmap7218 for building the analytics site that I grabbed the above two screenshots from, if you haven\'t checked it out, I highly recommend doing so!',
        'That is all for this week Miners! I hope you enjoyed mining in these great accumulation conditions and reading this weekly recap.',
        'As always, The Hardhat stays on and I will see you in the Mines.',
      ],
    },
  ],
}

const magazine: MagazineInput = {
  title: 'Mineshaft Weekly — 20 February',
  week: '20 February',
  publishedAt: '2026-02-20',
  url: 'https://x.com/zinnresearch',
}

importArticle(article, magazine)
