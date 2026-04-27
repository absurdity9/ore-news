import {importArticle, type ArticleInput, type MagazineInput} from '../import-article'

const article: ArticleInput = {
  title: 'The MineShaft Weekly — Ore\'s Revenue Ranking keeps Climbing',
  slug: 'the-mineshaft-weekly-ores-revenue-ranking-keeps-climbing',
  eyebrow: 'The MineShaft Weekly',
  subtitle: 'Top 10 Revenue / Strong Foundation',
  publishedAt: '2026-02-27T00:00:00Z',
  intro: [
    'The markets may slow down, but Ore does not. From ecosystem projects launching more marketing and community channels to the Mines continuing to be as busy as ever, there is no slowing down for ORE.',
    'As Ore closes in on the top 10 crypto projects by Holders Revenue for the last year (whilst it has only been ~4 months since its reintroduction), it shows that the strength is simply compounding in this time of market dismay.',
  ],
  sections: [
    {
      heading: 'MineMore starts the Insider Spaces Series',
      body: [
        'This week saw @minemoreapp debut their spaces series with their top performing miner in @Fyvieloon. Not only is he a top performing miner but he was early to BTC and also runs a medical innovation company. If you missed the spaces you can listen to them here.',
        'This week also saw the MineMore team release a FAQ article, an article on their round sniper strategy, and a community member releasing a \'how-to\' article to mining more. By reading all of these articles you will be more than well equipped to get that sweet sweet Unrefined Ore.',
        'Sources have also reported that some new functionality is in the works within the MineMore app that is to be released soon.',
      ],
    },
    {
      heading: 'The Miners heART & philosophy keep on spreading.',
      body: [
        'If you are a fan of Ore, it is almost inevitable to have missed the Mines philosopher @pokerchessman posts that allude to the philosophy behind what makes Ore so great. If you are new to Ore and reading this for the first time, I highly recommend scrolling down his feed and reading his posts as it will provoke your thinking on the current standards we see within this ecosystem.',
        'Another celebratory moment came from @Kramaramb who made it into the Coinmarketcap\'s AI deep dive about Ore!',
        'It would not be a week in the Ore ecosystem without @MMTheSamurai\'s Just Mine it graphics, which could make for epic print posters.',
      ],
    },
    {
      heading: 'Ore by the Numbers',
      body: [
        'Ore crossed over 19,000 lifetime Users and retained a strong ~525 users on average per 24hr period over this past week.',
        'In addition to this, Ore continues to be strong amongst the top 10 revenue protocols on Solana as per Solana Daily. This past week saw Ore have 2 days with above 100k revenue per 24hour period with the other 5 being in the high 70k range. Holders of Ore continued to accumulate with 6 out 7 days being net purchasing days.',
        'Whilst staking, native and shield LST\'s of ORE are down around 1% in the past 7 days, refined Ore has increased by nearly a whopping 10% going from 9,640 to 10,307.',
        '@UnrefinedOre reports a new ATH in Diamond hands at 492 holders now showing that those who hold conviction on ORE continues to increase. This is supported by the fact that uORE & rORE held by Miners (69k) now make up 81.5% vs Ore in Liquidity (85k). This means less Ore is available to buy on the market with more Ore being held tightly inside the protocol by Miners who are accumulating those juicy refined Ore rewards.',
        'That is all for this week\'s MineShaft Weekly and if you have enjoyed reading this make sure to share it with your friends and get them out of the trenches, and into the mines.',
        'I am excited to see what the next few weeks bring as the team is currently heads down cooking on the next upgrades to Ore and until then, the Hard Hat stays on and I will see you in the Mines.',
      ],
    },
  ],
}

const magazine: MagazineInput = {
  title: 'Mineshaft Weekly — 27 February',
  week: '27 February',
  publishedAt: '2026-02-27',
  url: 'https://x.com/zinnresearch',
}

importArticle(article, magazine)
