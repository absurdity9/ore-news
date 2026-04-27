import {importArticle, type ArticleInput, type MagazineInput} from '../import-article'

const article: ArticleInput = {
  title: 'The MineShaft Weekly — Building a strong Foundation.',
  slug: 'the-mineshaft-weekly-building-a-strong-foundation',
  eyebrow: 'The MineShaft Weekly',
  subtitle: 'Building a Strong Foundation',
  publishedAt: '2026-03-06T00:00:00Z',
  intro: [
    'This week saw ORE\'s leader @HardhatChad drop into the Minerside chat with some very interesting information regarding the establishment of an Ore Foundation and some possible technological innovation for the Mines.',
    'In the same Minerside chat we saw JussCubs demo his popular auto miner RefinOre and how to set up agentic mining.',
    'Additionally other ecosystem projects such as Smelted shipped further improvements as you can read below.',
  ],
  sections: [
    {
      heading: 'A foundation made of ORE.',
      body: [
        'In this week\'s Minerside Chat, HHC revealed what has been going on behind the scenes at Regolith Labs. This included the plan for establishing a foundation for ORE to allow the creation of grant mechanisms and possible employment of positions such as Social media managers and marketers to further spread the philosophy of ORE.',
        'He noted that in the agentic age software development is becoming easier and thus the difficult thing for brands becomes distribution of their product and vision. This is what the foundation is meant to help with in addition to avoiding any legal repercussions from having Regolith labs be the employer on record due to the confusing legal landscape that still exists in crypto today.',
        'Before he handed the mic to JussCubs, he mentioned that his table is stacked with books and academic papers. He is working on some technological innovation that could be a game changer for the space; but that is not ready to be announced yet as he has to make sure it will work as intended. Miners\' interests were peaked at the sound of this and are eagerly awaiting further information.',
        'If you have not watched the Minerside Chat episode 3, clicking on the underlined words will take you there. It is worth noting that it cuts off around twenty minutes early due to a technical difficulty which missed JussCubs explaining how to set up agentic mining on RefinOre and that clip will become available at a later stage.',
      ],
    },
    {
      heading: 'Refinements from ecosystem projects.',
      body: [
        'This week saw ecosystem members announce further developments in their projects.',
        'First up is Minemore\'s DLMM feature that is out in beta to OG members currently as teased by community member @cragglebear. This will allow users to DLMM the ORE and Solana pools directly from the Auto Miner and when asking the project for comments on this, they noted that there is \'much more yet to come\'. The possibilities of this are exciting as it may change Miners behavior in the future. Amongst their community members sharing wins and providing server boosts for the discord server, one also created a server banner for their discord that is exceptional!',
        '@Smeltedxyz dropped a backtesting feature that allows miners to test out their strategies. They also recently dropped their docs that you can check out here.',
        'Project @coalonsolana that aims to be an ORE treasury project is now holding 200 ORE inside of their Treasury.',
        'Ore native Defi project @CompoundORE hit a new milestone by having over 100 users and 1000 Ore deposited on their platform. This means they have more ORE deposited than defi giant Project0! Congratulations to the team on this success.',
        'Not a week goes by without @pokerchessman consistently reminding us of the mission that ORE is on. From highlighting the genius refined ore mechanism to the fair distribution mechanism, there is no better way of showing the intricacy and effects of Ore\'s inherent design.',
        'And the same goes for @MMTheSamurai\'s Just Mine It series, each week it gets mORE and mORE refined. Hardhats off to you sir!',
      ],
    },
    {
      heading: 'Ore by the numbers.',
      body: [
        'The numbers continue to add up for ORE with Lifetime Protocol Volume nearing on quarter of a billion dollars and lifetime revenue just climbing above $23 million.',
        'Users per 24hr period have remained around the ~510 area and show no sign of decline with average bet size staying steady around ~$1.50. This results in revenue remaining on average 1,000 Sol per 24 hour period. At current pace the protocol is in a net 0.67% supply change that is mostly being eaten up by Ore holders who are accumulating.',
        'Thanks to @cunmap7218, we can see that all 7 days in the last week have been net accumulation days for current Ore holders. Ore liquidity saw a 8% rise and the rate of unrefined and refined ore accumulating stayed on course with previous weeks. Whilst staked ORE saw a slight reduction in holdings, Miner dominance saw an increase of 0.4% over the past week.',
        'If you would like to see these analytics for yourself, click here.',
        'That wraps it up for this week\'s Ore updates and I hope you enjoyed this read! If you have find any information to be added please hit me up in the Dm\'s including any questions you may have.',
        'I look forward to what the next week brings and until then, the Hardhat stays on and I will see you in the Mines.',
      ],
    },
  ],
}

const magazine: MagazineInput = {
  title: 'Mineshaft Weekly — 6 March',
  week: '6 March',
  publishedAt: '2026-03-06',
  url: 'https://x.com/zinnresearch',
}

importArticle(article, magazine)
