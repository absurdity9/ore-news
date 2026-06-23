import {importArticle, type ArticleInput} from '../import-article'

const article: ArticleInput = {
  title: 'The MineShaft Weekly — Ore turns 2',
  slug: 'the-mineshaft-weekly-ore-turns-2',
  eyebrow: 'The MineShaft Weekly',
  subtitle: 'Ore Turns 2',
  publishedAt: '2026-04-03T00:00:00Z',
  xUrl: 'https://x.com/zinnresearch',
  intro: [
    'On the 2nd of April 2024, Solana was introduced to a new project by the name of @OREsupply. Little did the ecosystem know how much this idea by @HardhatChad would alter the future of Solana. From halting the chain, relaunching with a v2 that instantly captured 14% of Solana\'s onchain transactions to serving a reintroduction that has cemented itself as a top 15 revenue app in all of crypto.',
    'As we celebrate the 2nd anniversary of Ore we will be exploring some moments in Ore\'s lore alongside this weeks events that include the wrapping up of the Minemaster competition, crossing a milestone of 20,000 Lifetime Users and a potential new mechanism being integrated into mining.',
  ],
  sections: [
    {
      heading: 'The Weekly Snapshots',
      body: [
        'It wouldn\'t be a week of mining without the weekly supply, miner and yield snapshots presented by the Ore team. Not much needs to be said about these numbers except for one word, highORE!',
      ],
    },
    {
      heading: 'Anniversary Lore Part 1 - Ore halts Solana.',
      body: [
        'On the 2nd of April 2024, Ore launched as a Proof of Work protocol on the Solana Blockchain that rewarded users with ORE for providing hashpower.',
        'Users were so excited about this that it caused the Solana chain to halt and created a greater peak load of mainnet network traffic than any smart contract in blockchain history.',
        'This helped Solana identify bugs in the network stack but also revealed flaws in the contract and incentive design within Ore. Miners were eagerly awaiting what the upgrades would bring, even showing off rigs full of graphic cards.',
        'One of those incentives that needed to be created after this initial test became core to the design of how Ore works today, that miners who hold their mined ORE should be rewarded, which is how the refined Ore mechanism works now. What happened next? We will explore that later on in this issue of the MineShaft Weekly.',
      ],
    },
    {
      heading: 'Minemaster Winner Announced',
      body: [
        'With the beginning of April, the Minemaster competition for March came to an end and held @mobius3_3 as the winner. Andrew even went on to write an article to explain the math behind his strategy that may come in handy for those who are entering the Minemaster competition for April.',
        'The April edition of the Minemaster competition has now started and @SpuddyA7X posted a tutorial on how to get started. The eligibility criteria for this month\'s competition are: Deposit 10 Ore into @CompoundORE and keep it there for the month. Mine over 1000 rounds and over 5 Ore.',
        'May the lowest cost basis Miner win!',
      ],
    },
    {
      heading: 'Autominers and their refinements.',
      body: [
        'This week saw @orematic_com shut down their services until a later date in May, possibly for refinements and we hope to see them back active soon!',
        '@Soladex_io asked miners for best strategies that are positive EV and noted that they have listed @Smeltedxyz in their index.',
        'RefinORE reiterated that this is the perfect time to onboard to mining Ore showing that its possible through Coinbase & more, even with DCA strategies applied.',
        'Minemore\'s latest episode of Insider chat is now on Youtube, and the team also appeared on a spaces with the Degen Lounge.',
        'A new mining service for Ore in @ZentienceAgent entered the arena offering an agentic skill that boasted great returns, further details of this have yet to be dropped in the ecosystem thread inside the discord. The community looks forward to what they will release.',
        'In addition to these mining interfaces and mechanisms, community member @UnrefinedOre made a telegram channel that allows you to get alerts regarding Motherlode, unrefined Ore claims and diamond end of the day reports. This can be found in its own thread inside the Ecosystem tab of the Ore Discord.',
      ],
    },
    {
      heading: 'Yields are high, and always have been.',
      body: [
        'Yesterday, @kamino_liq highlighted the 80% 7D APY pools that Ore has within @kamino. But what if I told you that previous versions of Ore also had very high yield rates when providing liquidity with Kamino?',
        'The screenshot above comes from a comment made by @treybuckingham when commenting on yield thread. It highlighted the fact that you could get 154% APY when pooling kSOL and ORE with Kamino. This brings us to the next piece of Anniversary Lore for ORE.',
      ],
    },
    {
      heading: 'Anniversary Lore Part 2 - Incubators and Hackathons.',
      body: [
        'Ore originated as a hackathon experimental project, and soon after it would win the grand prize at the @colosseum Renaissance Hackathon in May 2024 with a prize of $50,000!',
        'Just under a year later, Ore joined the @Helius Startup Launchpad in March 2025, showing just how much potential this idea by Hardhat Chad really had albeit having stopped mining and resuming for v2 in August 2024.',
        'You might wonder how much traction it had after halting and resuming mining almost 4 months later. It might come at a surprise to hear that just 24 hours later, Ore was making up over 14% of all onchain transactions on Solana with over 30,000 miners.',
        'One month later, Ore solidified its presence by acquiring the gold checkmark on this platform.',
      ],
    },
    {
      heading: 'El Dorado & Improved Security',
      body: [
        'As you may be aware, this week saw the sad event of Drift being drained over $200 million. Although Ore has not been affected by this, it prompted Hardhat Chad to re-audit the security setup. With this a suggestion was made to progressively freeze staking functionality. The screenshot below details what is involved in this process.',
        'With this, comes the addition of a new mechanism within the Ore incentive wheel. The internal codename for this has been El Dorado and the community has not come up with a better name for it so far (if you have any new suggestions add them to the thread inside the general tab of the Discord please). If you have not read what this mechanism would look like, you can see it in the screenshot below.',
      ],
    },
    {
      heading: 'Ore by the Numbers',
      body: [
        'Yield isn\'t the only thing where Ore ranks highly. As per @Blockworks data, Ore ranks 14th in revenue for crypto apps and chains.',
        'In addition to this, Ore crossed 20,000 Lifetime Users and 26,000 Holders this week as per the dune dashboards. The protocol retained over ~400 users per 24 hour period and maintained an average of ~$50,000 revenue per day.',
        'Refined, Unrefined and LST Ore all saw slight growth with current Ore holders accumulating 6 out of 7 days. On top of this, Believores holder count is up another ~100 this week.',
        'Miner Dominance climbed over 17% this week and continues to accelerate up and to the right, showing current miners holding strong conviction in Ore.',
      ],
    },
    {
      heading: 'Hard Hats and Ore feature everywhere',
      body: [
        'As @pokerchessman put it; "Holding one Ore in your wallet is clarion call to self-sovereignty, freedom and abudance" and when you look at the significance of the Hard Hat within the wider ecosystem you see that it gets featured in NFTs and even on sports Jerseys!',
        'The Hard Hat signifies a builders aura and can be seen on notable NFTs such as @SOLBigBrain posting his Gen2 @SolanaMBS back in 2024, to Hardhat Chad\'s famous @CHADSwtf to the Gen3 SMB and more. It has come to the point that this cosmetic is almost symbiotic between the original NFT and ORE, showing just how significant of an impact the mines have made on the wider ecosystem.',
        'The mines go even further to having been featured on @SolanaFloor\'s Magazine 001 who are a prominent platform when looking at previous Ore media coverage.',
        'With how young Ore is, it\'ll be exciting to see just how far its influence will go throughout the next few years. Who knows maybe one day we will see an Ore museum inside of a mine?!',
      ],
    },
    {
      heading: 'How to Mine More',
      body: [
        'Although this week\'s @minemoreapp leaderboard looks similar at the top, we have a new rank #1 in Avii.',
        'With 4 subaccounts in profit with over 10 Ore mined each, it is clear that their strategies are yielding great success at scale. So what strategies are they employing?',
        'The top 3 wallets follow a similar pattern of playing all 25 tiles per round, with 0.01 SOL deployed per round. With mining costs being below market price most of the week, this strategy is naturally +ev most of the time and is easily replicated in the official ore miner if you wish to do so.',
        'Following these strategies? Make sure to let me know what results you yield with them!',
        'This brings us to the end of this weeks edition of the MineShaft Weekly. I hope you enjoyed this special edition that covered some of Ore\'s lore, and if you did make sure to share it with your friends and leave a like!',
        'Let me know if I should include a fun lore fact in future editions in the comments below. As always, the hardhat stays on and I will see you in the mines.',
      ],
    },
  ],
}

importArticle(article)
