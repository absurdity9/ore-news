import {importArticle, type ArticleInput} from '../import-article'

const article: ArticleInput = {
  title: 'The MineShaft Weekly — Wisemen debut Ore Documentary',
  slug: 'the-mineshaft-weekly-wisemen-debut-ore-documentary',
  eyebrow: 'The MineShaft Weekly',
  subtitle: 'Ore Documentary / MineMore closure',
  publishedAt: '2026-05-08T00:00:00Z',
  xUrl: 'https://x.com/zinnresearch',
  intro: [
    'It has been a cinematic week for the Mines with @Wisemenmentors releasing their Ore documentary that explored the history of Ore\'s earlier versions as well as the idea that originated it coming to life in the first place.',
    'This was followed by Ore\'s newest team member @Theptilla starting an initiative that got users to add the ⛏️ emoji to their usernames to show their conviction and solidarity in Ore\'s culture.',
    'The Market responded very well to this, with Solana deployed in the Mines skyrocketing and much more which we\'ll explore in this week\'s edition of The MineShaft Weekly ⬇️',
  ],
  sections: [
    {
      heading: 'The Ore Documentary is Live',
      body: [
        'After weeks of research and editing, the mini movie / documentary for Ore has gone live and is the highlight of the week. From the beginnings of Ore to explaining the core values that drives miners to participate, this ~30 minute watch really covers it all.',
        'In only 3 days after publishing, it has already gathered over 50,000 views and is set to hit over 100k views in the first week at current rates. If you have not watched it yet, I highly recommend it as it serves as the perfect resource to explain the question of why someone should participate in mining Ore.',
      ],
    },
    {
      heading: 'The Miners Rally accelerates',
      body: [
        'After the Ore mini movie had dropped, enthusiasts of the Mines started appearing all over the timeline. A return of the famous \'Just Mine it\', the resurfacing of @toly\'s vision, an article by the Mines\' philosopher and much more flooded the time with this momentum and this was capitalized upon by Ore\'s newest hire @Theptilla.',
        'In this brilliant move, Thep united the Miners and showed off the strength of the community with 100\'s of people adding the emoji to their name. To see it for yourself, just search the emoji on Twitter and you will easily find dozens upon dozens of people with this added to their name. The enthusiasm spread over to Discord where the community started chanting that Ore is a movement.',
        'With this, a new feature was added to the discord that allows people to type out commands which prompt a response such as showing the official and 3rd party Miners and analytics sites. It\'s important to highlight here that if you are new to the Ore ecosystem, a ton of the discussion goes down in the Discord and its highly recommended to join and participate as you may help shape the future of Ore.',
        'Another highlight of this week contained the added functionality introduced by Twitter allowing users to see the chart assets such as $ORE simply by typing it out with the $ symbol in front of it. Whilst on the topic of charts, the head of research for Delphi, @ceterispar1bus dropped a post showing YoY returns for assets with Ore being listed second boasting a +259% return.',
      ],
    },
    {
      heading: 'MineMore begins shut down process',
      body: [
        'One piece of sad news delivered this week was the announcement that @minemoreapp will be shutting its doors on the 15th May.',
        'As you can see from the screenshot, this is not something that founder @SpuddyA7X wanted to announce but is doing so for their own wellbeing and for the care of their users. Redemptions and a dedicated sunset page will stay up until mid May next year allowing users to connect and retrieve their assets. The MineMore CLI tool and Solana\'s CLI itself can also be used for this purpose. For any further questions, users are advised to go to the MineMore discord.',
        'Personally, as a fan of Minemore, I wanted to take this moment to thank Spuddy for everything he has built and helped make possible for Miners. Something not many may know is that he was actually the person who came up with the name \'\'The MineShaft Weekly\'\' and without him who knows what this weekly write-up would\'ve been called. It will be sad to see Minemore shut its doors but I wish Spuddy the best and hope to see him remain around the community when he has time. The mines and the MineShaft Weekly send all their love.',
        'For those in the community looking to transition, co-founder @willdxyz has teased a new place to stack Ore soon!',
      ],
    },
    {
      heading: 'Ore by the Numbers',
      body: [
        'With the momentum in the Mines accelerating, so have the numbers! Ore has increased its 24hr revenue by nearly 40% compared to the last week averaging just over 70k.',
        'With this, the Solana deployed per hour has also increased by roughly ~50% rising from the high 200\'s to the mid to high 300\'s spiking to a peak of 981 SOL deployed on the 3rd of May. As per @Blockworks, this averaged to a peak of 840$ worth of Sol deployed per round at the time and Ore went deflationary burying over 100 Ore during the 3rd of May.',
        'Ore holders accumulated on 5 out of 7 days this past week and active miners increased from ~400 in the previous week to over 600 on average this week, with each day seeing around 18-30 new miners.',
      ],
    },
    {
      heading: 'How to Mine More',
      body: [
        'With the increase of Ore\'s market price we have got a shake up in the Leaderboard on @minemoreapp. This week has an old familiar name in Dickcoin as the #1 ranked Miner using 24 accounts and a whopping PnL of $14,087.',
        'His most profitable account stands at a PnL of +4,376$ and uses a strategy that we have covered several times deploying 0.005 SOL over 25 tiles but with a Min EV filter of 2%. This is easily replicable on the official Ore miner by mining when Motherlode\'s are low as EV of mining tends to be higher at those times. If you want to get very precise you can also check the cost of production on Ore-stats or Blockworks analytics site and mine when the cost of mining is low.',
        'Keep an eye out for next weeks How to Mine More section with community member @cragglebear having performed an experiment that will be beneficial to all miners, new and old alike!',
        'As this week\'s edition comes to a close, I want to leave you with one teaser with something new coming to mines 👀',
        'I hope you enjoyed reading another week of the MineShaft Weekly! Make sure to share it with your friends and as always, the Hardhat stays on and I will see you in the Mines 👷⛏️',
      ],
    },
  ],
}

importArticle(article)
