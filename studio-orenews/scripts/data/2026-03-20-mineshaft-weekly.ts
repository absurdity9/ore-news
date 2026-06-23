import {importArticle, type ArticleInput} from '../import-article'

const article: ArticleInput = {
  title: 'The MineShaft Weekly — Leaderboard shows top strategies',
  slug: 'the-mineshaft-weekly-leaderboard-shows-top-strategies',
  eyebrow: 'The MineShaft Weekly',
  subtitle: 'DDoS & Governance',
  publishedAt: '2026-03-20T00:00:00Z',
  xUrl: 'https://x.com/zinnresearch',
  intro: [
    'This week contained a thought provoking article on the Ore protocol, a partnership with a tax accounting service, an update of holder analysis by HHC and much more. At the time of writing, @HardhatChad asked the community whether he should drop another idea thread, meaning we have something big to look forward to next week.',
    'In addition to this, at the end of this article, I introduce a new section in the MineShaft Weekly titled \'\'How to Mine mORE\'\' using strategies from the MineMore auto miner Leaderboard to help you readers get more Ore for your Sol.',
  ],
  sections: [
    {
      heading: 'Ore gets DDOS\'d',
      body: [
        'The middle of the week saw Miners being confused as they had a hard time accessing the site to mine. It turns out the Ore website was being DDoS\'d. The team quickly got this under control and within hours had the site running smoothly. It is not the first time this has happened and the community had a meme ready for the occasion.',
      ],
    },
    {
      heading: 'Ore Holder analysis update',
      body: [
        'At the end of this week we saw HHC drop in and announce they have been working with the Jupiter team to properly show the top 10 holder analysis. It now excludes the famous HawG account and will soon exclude the stORE account with an estimation that top 10 holders have around ~22% of supply.',
      ],
    },
    {
      heading: 'Ore x Awaken Tax',
      body: [
        '@big_duca posted earlier this week that a lot of Miners were customers of his Tax service. Within the same week, the Ore team reached out and one of the awaken developers shipped an automation that now lets miners deal easier with their Ore transactions. Great work from both teams on this quick development!',
      ],
    },
    {
      heading: 'Madhatt3r article provokes governance questions.',
      body: [
        '@pokerchessman wrote an excellent article that poses the question of what happens after a protocol has established revenue.',
        'As correctly pointed out by him later in the week, Ore is the final frontier of money, property rights and sovereignty. As Ore\'s design has fully established itself as a healthy revenue system for the protocol, the next step becomes governance and it wouldn\'t be true sovereignty without the miners holding a heavy hand in governance. In comes the Ore foundation that is being set up by Regolith labs for the protocol to be lead by the people, for the people. Albeit concerns from some community members that this would detach HHC/Regolith from ORE, HHC has stated that he would be available to help the foundation be a success in both guidance and development assistance.',
        'Now the question that is left with you as a reader, with the novel design behind Ore, how do you see governance being done right? One suggestion that seemed to resonate is the use of refined/unrefined Ore being a foundational part of this as it gives those who spend day in day out in the mines a centre piece of the governance. Make sure to participate in the Foundation Governance thread inside the Discord to ensure your voice is heard.',
      ],
    },
    {
      heading: 'Minemore introduces Open source CLI tool',
      body: [
        'On top of bringing back the mining PnL charts that allows you to see how your mining strategy is performing in real time, the team built an open source tool that allows you to retrieve all your funds from subaccounts associated with MineMore.',
        'All that will be required by you is to run this tool and to have your Privy private key ready. Then you can transfer out your Ore & SOL in case the infrastructure behind MineMore ever goes down. It is great to see auto miners thinking of these kind of scenarios putting their users first!',
      ],
    },
    {
      heading: 'Ore by the numbers',
      body: [
        'This week saw the biggest Ore claim in a singular day within the last month with 4147 Ore claimed on the 15th March.',
        'Naturally this meant that the overall Unrefined ORE held by the miners dropped off from 60,532 to 59,957 from the start to the end of the week. Nearly rebounding to the uORE held before the claim shows that whilst one whale may have claimed, many miners were ready to step up and keep accumulating. As a consequence of this big claim, refined Ore holding shot up from 11,920 to 12,803.',
        'As the market quietens down and world tensions increase, Ore\'s userbase has remained strong with it retaining ~450 users and ~$65k revenue per 24hr period. The protocol accomplished a massive milestone in crossing a quarter of a billion dollars in Lifetime Protocol Volume!',
        'This week also saw @CompoundORE hit 19.9% of all ORE held in Vaults showing the competition they are running with MineMore is yielding great results. At this pace, they will become the #1 vault for ORE within the next few weeks!',
      ],
    },
    {
      heading: 'The Miner community keeps expanding',
      body: [
        'With news that future initiatives such as sharing admin fees with frontends that promote mining (including already established autominers), it was shared that the team is already in talks with highly anticipated wallet provider, Umbra to bring mining inside of the wallet. It is yet to be seen what is fully agreed between the teams but this brings much excitement as it exposes many new faces to the mines.',
        'Lead of the Degen Dojo @FiLnice8 posted early in the week that 50% of royalties and fees will be used to mine ORE and that all uORE, rORE and stORE will be owned by the holders of Degen Dojo. We welcome the whole Dojo to the mines!',
      ],
    },
    {
      heading: 'How to Mine More',
      body: [
        'Beginning in the mines can be daunting sometimes. For some who commit a lot of Solana before figuring out there are strategies can lead to a loss of sol without much reward. This section aims to help you out by highlighting the best Ore mining strategies each week by analyzing the top miners in the @minemoreapp leaderboard.',
        'By looking at the top account here (3a3k1) their most profitable subaccount has a strategy of deploying 0.005 Solana playing all 25 tiles per round. Now they also have a Min EV filter that you don\'t have in the official Ore miner but you can manually check this by looking at cost of production here and making sure mining costs are lower than market price by at least 2%.',
        'The 2nd, 3rd & 5th ranked on the Leaderboard have a simple strategy of playing 0.01 sol on a singular tile without any other parameters, this is easily repeatable on the official Ore miner and would be my recommendation of the week if looking to recreate their success.',
        'If you are a user of the MineMore auto miner, you can easily click on the box of the desired position on the leaderboard and a box pops up that allows you to copy it over to your sub account.',
        'I hope you enjoyed this weeks MineShaft Weekly and make sure to share it with your miner and non-miner friends!',
        'I\'m excited to see what HHC\'s next idea thread will bring and what advancements to the Ore Foundation Governance talks occur over the next week.',
        'Until then, the hard hat stays on and I will see you in the Mines.',
      ],
    },
  ],
}

importArticle(article)
