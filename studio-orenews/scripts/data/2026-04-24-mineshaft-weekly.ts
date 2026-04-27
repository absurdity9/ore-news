import {importArticle, type ArticleInput, type MagazineInput} from '../import-article'

const article: ArticleInput = {
  title: 'The MineShaft Weekly — The Mines are Revenue specialists',
  slug: 'the-mineshaft-weekly-the-mines-are-revenue-specialists',
  eyebrow: 'The MineShaft Weekly',
  subtitle: 'Q2 Update / MineMore anniversary',
  publishedAt: '2026-04-24T00:00:00Z',
  intro: [
    'With summer approaching and Q2 in full swing, the markets have seen some relief in terms of price action and with this reports on Q1 performance have started being published all over the platform.',
    'One analysis showed that Ore continues to perform with it being ranked 8th in the revenue category out of all Solana Apps showing that whilst the hype may have calmed down, the mines are in full swing.',
    'Not only has Ore performed in revenue but also Daily holder revenue and in its new listing on Omnipair where the stORE-USDC pool became the top traded pool within the same week of launch.',
    'This and much more has occurred throughout this week, make sure to carry on reading to find out tips and tricks on Omnipair, an autominer celebrating 6 months in existence and much more.',
  ],
  sections: [
    {
      heading: 'The Weekly Snapshots',
      body: [
        'The snapshots are showing consistent retention in Daily Active Miners and Yields. Net emissions have reduced slightly since the last snapshot primarily due to the high Motherlode at the end of last week.',
      ],
    },
    {
      heading: 'A Miners Rally',
      body: [
        'Whilst community builders have been busy down in their shafts, the miners around them have rallied from posting reasons for holding Ore to the 26 Ore thesis.',
        '@DiggyMonke kicked off the rally with an ODE to ORE that highlighted how refreshing human written poetry can be!',
        'This was continued with a post by @FiLnice8 dropping 10 reasons (that ended up being 13 reasons in reality) to mine Ore. It explained that mining is easy and shows that there is a whole community of people building and preaching ORE.',
        'Then came the cavalry from @Lothaen posting the Ore\'s quick thesis featuring a bunch of David\'s with Hardhats and @MMTheSamurai showing exactly why you should never stop mining, especially before a big ML.',
        'Next came the 26 Ore thesis by @Wisemenmentors who dropped math that whilst 26 Ore cost $1,500 today, if it becomes 1% of Solana\'s Market cap at its all time high, that same 26 Ore would be $100,000. That is some good Miners\' Math.',
        'To finish this week\'s rally, the big guns in @mattytay came in with a clean but powerful graphic portraying Ore\'s core tokenomic values. Whilst the post stated a simple \'gm\', it caused some excitement as it is perceived as a teaser that something is brewing underground (will we see v4 coming soon?).',
      ],
    },
    {
      heading: 'MineMore Turns 6 Months Old',
      body: [
        'In addition to dropping a Buy vs Mine Chart at the beginning of this week, @minemoreapp dropped an article celebrating 6 Months of powering Miners. It covered everything they have accomplished over this time from building the foundation in November to going multi product with yield possibilities and launching competitions. With over 3,000 commits shipped, 7 languages supported and 3 competitions seasons, The MineShaft Weekly wishes a happy 6 Month Anniversary to MineMore!',
        'Their week finished with a gem of an Insider Chat episode featuring @DiggyMonke who dropped some knowledge on how to get the best out of looping the StORE and ORE pools on @omnipair. If you are looking for ways to get more yield with your Ore, this is a highly recommended listen.',
      ],
    },
    {
      heading: 'Ore by the Numbers',
      body: [
        'It has been another good week for the Mines as Ore retains an average of ~$65k in revenue per 24hr period whilst having an average daily user count of ~350. The number that stands out comes from some research that @defnotnothing conducted which showed Avg Daily Holder revenue increasing by 55% in a 7d rolling basis. Does this show that 2 weeks ago marked the bottom of Avg Daily Revenue?',
        'Both Unrefined Ore and Refined Ore showed steady growth with them growing ~1,200 and ~800 respectively. Combined the number stored within the mines stands at just over ~83,000 meaning growth has been steady despite some bigger claims over the previous few weeks.',
        'The amount of Solana deployed has reduced since the big Motherlode of last week after peaking at ~800 sol per hour but still has grown ~15% WoW to be around ~250-280 per hour compared to last week. There were also some spikes throughout the week that went about ~400 Sol per hour showing there is plenty of demand by Miners for Ore.',
      ],
    },
    {
      heading: 'How to Mine More',
      body: [
        'This weeks leaderboard is topped by a familiar face in @AviiD_ll who currently has a PnL of over ~$3,500 with 170 Ore mined.',
        'All 5 of his subaccounts are in profit with 3 of them running a simple Lottery Miner strategy of playing 0.01 Sol across 25 blocks whilst the Sniper and Motherlode wallets are running different strategies with only the ML hunter strategy being visible using 0.02 Sol across 13 blocks and a ML filter of 150 minimum.',
        'The Lottery strategy once again is a clear winner with this time being a higher amount of Sol deployed with the low cost of mining to secure some easy Ore.',
      ],
    },
    {
      heading: 'A rumbling emerges from the Mines',
      body: [
        'I hope you enjoyed the read of this week\'s edition of the MineShaft Weekly as it has been another exciting week in the mines. Make sure to share this with your friends, miner and non-miners alike! I wonder if next week we will see the El Dorado go live that has been much anticipated.',
        'Until then, the Hardhat stays on and I will see you in the Mines.',
      ],
    },
  ],
}

const magazine: MagazineInput = {
  title: 'Mineshaft Weekly — 24 April',
  week: '24 April',
  publishedAt: '2026-04-24',
  url: 'https://x.com/zinnresearch',
}

importArticle(article, magazine)
