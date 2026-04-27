import {importArticle, type ArticleInput, type MagazineInput} from '../import-article'

const article: ArticleInput = {
  title: 'The MineShaft Weekly — A new ATH for the Motherlode',
  slug: 'the-mineshaft-weekly-a-new-ath-for-the-motherlode',
  eyebrow: 'The MineShaft Weekly',
  subtitle: 'A new ATH for the Motherlode',
  publishedAt: '2026-01-30T00:00:00Z',
  intro: [
    'Another week has ended and the miners are calm, collected and unbothered by the wider market as they celebrate a huge all time high Motherlode.',
    'The community has continued to ship features for their autominers and analytics duplicating the ethos of those in mines by showing that consistent refinement yields results.',
  ],
  sections: [
    {
      heading: 'A motherlode that signalled divine completeness',
      body: [
        'The week began with the @privy_io integration that allows miners to log in using google and mine from any browser or device.',
        'It was followed by the announcement that all solana tokens were now tradeable on Coinbase increasing exposure for ORE to the many millions of users from Coinbase.',
        'Then we had the motherlode hitting 777 ORE marking an all time high of recent times and that has been described as a 1 in 503 chance due to the probability calculations as to how the Motherlode works. As pointed out by the mine\'s native poet, @pokerchessman, this number is often seen as divine completeness intensified or in some esoteric texts as spiritual awakening. Safe to say that lady fate was with us in the mines this week.',
      ],
    },
    {
      heading: 'The community continues to refine their mining methods',
      body: [
        'One of the big developments this week in the auto miner sphere of ORE was the official chat being integrated into Refinore. ORE quote tweeted this announcement with the message that any other dev who looks to do the same should reach out in the discord under the dev channel. Moreover, Refinore is now available on the seeker Dapp store and allows the use of $SKR to mine ORE.',
        'Another auto miner in @minemoreapp has been discussing their strategies such as the lottery mining strategy and what makes it successful. In addition to this @heyitsdoobs has ensured that multiple strategies can be run on the same subaccount.',
        'The Ore team also met with the @colosseum team which has been tweeted about by both teams, no further information has been released as to what they are up to but one thing we did see out of this is @mikehale updating the Quicknode guide to mining.',
        'We\'ve also seen the launch of a new app in @Smeltedxyz by @ChrisakaSelly that provides auto miner services as well as a dashboard for ORE and mORE mineable tokens.',
        '@orematic_com has launched a new code which can be found in the discord weekly round up message that reduces service fees to a low 0.15%.',
        'In the midst of all this building, community member @Lothaen created a great video that perfectly embodies the message \'always be mining\'.',
      ],
    },
    {
      heading: 'Data shows Ore is unbothered by a messy market',
      body: [
        'The mines are producing incredible numbers in the middle of a market that is facing some downward pressure. On one of the days, Ore presented over 330k in 24hr revenue solidifying itself as a top 5 revenue protocol on Solana.',
        'Ore holders steadily accumulated most of the week with 5 out of 7 days having net inflows for current holders. In addition to this, Unrefined Ore held has gone up by 1.6k and refined ore by 600 Ore meaning a 3% and 9% increase respectively.',
        'stORE rate is now up to over 1.0118 from 1 at launch. Users have remained steady at ~540 per 24hrs and the protocol is processing over 600k txs per 24hrs.',
        'One milestone that has been crossed for ORE is over $20m in lifetime revenue which comes just a week after the protocol crossed $200m in lifetime volume.',
        'This wraps up another week in the mines, in what seems like a market in turmoil, the mines keep on accelerating forward without a stop in sight. From revenue to users to the rate of building by community builders, nothing is slowing down which shows the conviction that the current community has in this modern store of value protocol.',
        'As always, if this weekly news report leaves you wondering for mORE, I emplore you to visit the tweets of philosophy by Madhatt3r as well as spending some time in the discord to see it for yourself.',
        'I look forward to what the team announces next after their call with the Colosseum team and until then, I will be deep in the mines. Remember, the hard hat stays on.',
      ],
    },
  ],
}

const magazine: MagazineInput = {
  title: 'Mineshaft Weekly — 30 January',
  week: '30 January',
  publishedAt: '2026-01-30',
  url: 'https://x.com/zinnresearch',
}

importArticle(article, magazine)
