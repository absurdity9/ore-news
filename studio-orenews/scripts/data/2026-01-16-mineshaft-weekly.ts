import {importArticle, type ArticleInput, type MagazineInput} from '../import-article'

const article: ArticleInput = {
  title: 'The MineShaft Weekly II — Ore\'s Chat is back',
  slug: 'the-mineshaft-weekly-ii-ores-chat-is-back',
  eyebrow: 'The MineShaft Weekly',
  subtitle: 'Ore\'s Chat is back',
  publishedAt: '2026-01-16T00:00:00Z',
  intro: [
    'Another strong week of 6 figure revenue days and building by the community occurred in the mines.',
    'This week I\'m introducing a new section of the weekly update called Miner of the Week, to pay respect to those who are helping the team and others in the mines. If you are active in the Discord, this first week\'s winner is no surprise to you!',
  ],
  sections: [
    {
      heading: 'The mines get more social',
      body: [
        'Early in the week, HHC made some QOL updates to the Shield feature that added withdraw fee details, an account section, the ORE conversation rate in shielded stORE balance details, and placed the \'Powered by Privacy Cash\' label under the sign in button.',
        'In addition to this, you can now view your personal mining history in the Mining section of the Explore page when having a wallet connected. This is still being backfilled so may only display up until a certain point in history until this is complete.',
        'Coming to the main news for those who are enjoyORE\'s of the chat feature on the main Ore website, chat replies are now live on Desktop as well as emoji reactions. On top of this, Rounds and Motherlode tables will now show social data (usernames and pfp\'s) of the top miner if available.',
        'Lastly, the latest update to the mining user experience is the drag-to-select feature going live meaning that you can select squares by pressing and dragging your mouse/thumb to another square to select them, and it will select all squares you drag over.',
      ],
    },
    {
      heading: 'Miner of the Week',
      body: [
        'The inaugural Miner of the week award goes to @0xKriptikz.',
        'If you haven\'t heard of this insanely talented Developer, he is responsible for helping the community with many things, one of them being his ore stats service which other services such as autominers use to gather their data as the source of truth. In addition to this, Kriptikz has helped to crank the autominer on the official Ore page making it permissionless and deploy on the same round if enough time is left.',
        'On behalf of the ORE community I want to thank you Kriptikz for providing such crucial infrastructure!',
      ],
    },
    {
      heading: 'stORE becomes the top pool on @theprivacycash',
      body: [
        'After a huge reception from the ORE community with the privacy integration, ORE\'s native LST stORE has become the fastest growing and biggest pool of Privacy Cash.',
      ],
    },
    {
      heading: 'Miners keep diving deeper into the Mines',
      body: [
        'The community of builders inside ORE has no stop button. From new analytics sites to improving features that allow miners to get the best bang for their buck, there is always a ton being shipped by the community.',
        'First up we have a new analytics site by @cunmap7218 that combines a lot of the information we see on dune dashboards as well as interesting breakdowns of where ORE is held.',
        '@minemoreapp completed its first ORE giveaway and held the first ever stORE giveaway in addition to implementing a new multi-miner features that features sub accounts which have led it users to find a lot of success through a lottery miner strategy.',
        '@Ore_Miner_io is growing from strength to strength having recently surpassed 750 users for their auto Miner.',
        'A fact to celebrate is that both of the above Autominers also were recipients of the SKR dev allocations which are more than deserved after all the value and users they\'ve brought to the ORE ecosystem!',
        'RefinORE has integrated stORE swaps inside of its autominer.',
        'And @orematic_com has released a testing playground for miners allowing them to test strategies without having to use real Solana.',
        'Cash Advance platform @CompoundORE has gone into BETA announcing several collaborations and incentives such as Art Drops and ORE drops that depend on your IndieSOL holdings as part of their partnership.',
        'The continuous building and refinement by the community shows how resilient ORE really is and nothing represents this better than @MMTheSamurai\'s Just Mine It series. No matter the price action or macro environment, keep your head down and just mine it.',
      ],
    },
    {
      heading: 'Ore\'s Weekly Data Review',
      body: [
        'Ore\'s revenue has remained strong with a consistent above 100k performance per 24 hours with one day even hitting 300k revenue in a single day. This has resulted in ORE remaining a top 5 protocol on Solana for Revenue.',
        'Holders and Users have remained steady at the 26k and 500 mark respectively and the protocol has crossed just over $18m in total lifetime revenue.',
        'In addition to this, Average Bet Size is $4.20, and total Autominer Bets have crossed the 30 million mark. We have seen positive inflows for current ORE holders in 6 out of 7 days, with net inflows for the week.',
        'As another week finishes, another one starts and there is much to look forward to.',
        'A rumoured launch of NavORE (or maybe even NavStORE) by @nirvana_fi is said to be coming soon and there is no doubt there\'ll be further innovations and improvements by the wider ORE community in the next few days.',
        'An important reminder is the saying by @pokerchessman \'Buy Ore, Mine Ore, Covet Ore\' and is highlighted by his tweets which are a highly recommended read if you are curious about the philosophy behind ORE that so many have come to embrace.',
        'But that is all for this week, I will see you in the mines and the hardhat stays on.',
      ],
    },
  ],
}

const magazine: MagazineInput = {
  title: 'Mineshaft Weekly — 16 January',
  week: '16 January',
  publishedAt: '2026-01-16',
  url: 'https://x.com/zinnresearch',
}

importArticle(article, magazine)
