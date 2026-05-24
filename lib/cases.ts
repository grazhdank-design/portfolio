export interface CaseMeta {
  slug: string;
  index: number;
  company: string;
  title: string;
  subtitle: string;
  tag: string;
  accentFrom: string;
  accentTo: string;
  metrics: { value: string; label: string }[];
  // homepage summary
  problem: string;
  signal: string;
  solution: string;
  result: string;
  lesson: string;
  // full page narrative (paragraphs separated by \n\n)
  context: string;
  problemFull: string;
  signalFull: string;
  solutionFull: string;
  implementationFull: string;
  resultsFull: string;
  lessonFull: string;
  keyTakeaways: string[];
  prevSlug?: string;
  nextSlug?: string;
}

export const cases: CaseMeta[] = [
  {
    slug: "crypto-card",
    index: 0,
    company: "EMCD",
    title: "Crypto Card Launch",
    subtitle: "From mining rewards to real-world spending",
    tag: "Payments · KYC · Growth",
    accentFrom: "from-indigo-500",
    accentTo: "to-violet-600",
    metrics: [
      { value: "10K+", label: "Active users" },
      { value: "$MM+", label: "Transaction volume" },
      { value: "5mo", label: "Time to scale" },
      { value: "60%", label: "Payback period" },
    ],
    problem:
      "Mining users accumulated crypto but had no way to spend it in real life. Tens of millions in monthly fiat outflow leaving the platform.",
    signal:
      "A 'coming soon' landing generated 4,000 signups from existing users and 1,700 new — strong demand signal before writing a line of product code.",
    solution:
      "Full KYC flow. Rejected paid channels (CAC $110+). CRM-driven activation (21%) and referral program (LTV/CAC 2.8:1).",
    result:
      "10,000+ active users in 5 months, $MM+ in transaction volume, 60% payback period.",
    lesson:
      "Outsourcing compliance means outsourcing control over your activation funnel.",

    context:
      "EMCD runs one of the largest mining pool ecosystems in the region. Users — primarily Bitcoin and Ethereum miners — receive regular crypto payouts directly to their EMCD wallets. By the time I joined, hundreds of thousands of active miners held significant balances on the platform.\n\nBut there was a structural gap. The platform was designed to earn. It wasn't designed to spend. There was no way to use accumulated crypto in daily life without going to an external service first — which meant leaving the platform entirely.",

    problemFull:
      "Every month, tens of millions of dollars flowed off the platform. Not because users were dissatisfied — but because life happens in fiat. Rent, groceries, transport: none of it accepts a mining wallet.\n\nFor each user who cashed out externally, we lost: the transaction volume, the potential product engagement, and the data on how they used their funds. Fiat outflow was a proxy for user attention leaving the ecosystem. The product needed a way to close that loop.",

    signalFull:
      "Before committing to development, we ran a demand validation: a 'coming soon' landing page with a sign-up form and a brief description of what the card would offer. No product, no integrations — just a hypothesis made visible.\n\nResult: 4,000 sign-ups from existing EMCD users, and 1,700 from new users who discovered us through referrals and organic search. At our user base size, these numbers told us the demand was already there. We weren't creating a market. We were unlocking one that had been asking for this for years.",

    solutionFull:
      "The first strategic decision: build or partner? Building card infrastructure from scratch meant banking relationships, licensing, and compliance frameworks — an 18-month minimum timeline. We partnered with an established card issuer to own the infrastructure layer. This let us focus on product and growth.\n\nThe second decision: paid acquisition vs. owned channels. Initial CAC projections for paid came in above $110 per activated user. At our LTV models, the economics didn't close. We chose to go CRM-first.",

    implementationFull:
      "We mapped the full activation funnel: sign-up → KYC submission → KYC approval → card delivery → first transaction. Each step had a dropout rate, a CRM trigger, and a set of messaging sequences.\n\nThe KYC step became the critical bottleneck. Outsourcing compliance meant our partner controlled the approval flow — and their UX directly determined our activation rate. We hit 21% activation from initial sign-ups, which was workable. But every percentage point improvement depended on our partner, not us. That trade-off would come back later.\n\nFor acquisition, we built a referral program structured around verified activation (first transaction), not just sign-ups. This prevented gaming while keeping LTV/CAC at 2.8:1 — sustainable at scale.",

    resultsFull:
      "10,000+ active cardholders reached in 5 months. $MM+ in cumulative transaction volume. 60% payback period achieved.\n\nThe card became EMCD's highest-retention product — users with cards showed measurably higher engagement across every other platform product. It also became a template for how we thought about monetizing the wallet base through cross-activation.",

    lessonFull:
      "The outsourcing decision had a hidden cost we only fully saw in retrospect: every time our compliance partner updated their KYC flow, our activation rate moved — without our input, without notice, and without a fix path.\n\nIn financial products, compliance is not a back-office function. It sits directly in the product critical path. Outsourcing it means outsourcing control over the single highest-leverage step in your funnel.\n\nIf I were doing this again, I'd build toward owning the compliance layer starting from month three — not month twelve.",

    keyTakeaways: [
      "Validate demand with a landing page before any development commitment.",
      "At CAC > $100, paid acquisition almost never closes at early-stage LTV — CRM and referrals are the lever.",
      "Outsourcing compliance = outsourcing the activation funnel. Plan the path to ownership from day one.",
    ],

    nextSlug: "fiat-ramp",
  },

  {
    slug: "fiat-ramp",
    index: 1,
    company: "SimpleSwap",
    title: "Fiat On/Off-Ramp",
    subtitle: "Revenue diversification via third-party widget",
    tag: "Fiat · Integration · Speed",
    accentFrom: "from-emerald-500",
    accentTo: "to-teal-600",
    metrics: [
      { value: "$4.2M+", label: "Monthly volume" },
      { value: "3mo", label: "ROI achieved" },
      { value: "34%", label: "Users using P2P already" },
      { value: "0", label: "KYC licenses needed" },
    ],
    problem:
      "Single revenue stream while all top competitors offered fiat on/off-ramp. Without fiat access, we were losing users at the top of the funnel.",
    signal:
      "34% of users were already using external P2P services discovered from our platform — they wanted fiat and were finding it elsewhere.",
    solution:
      "Integrated Mercuryo as a white-label widget. No KYC, no licenses, launched in weeks.",
    result:
      "$4.2M+ monthly volume. ROI achieved in 3 months.",
    lesson:
      "Speed of validation beats control over UX at early stage.",

    context:
      "SimpleSwap was a non-custodial crypto exchange — fast, clean, no account required. The product worked well for users who already held crypto and wanted to swap it. By 2021, we had strong retention among active crypto users and growing transaction volume.\n\nBut there was a structural ceiling. Every major competitor — Changelly, ChangeNow, StealthEX — had added fiat on/off-ramps. We hadn't. And it showed in our funnel: users who arrived with fiat had nowhere to go.",

    problemFull:
      "100% of SimpleSwap's revenue came from crypto-to-crypto swaps. The core flow was clean: user arrives with BTC, swaps to ETH, leaves. But this flow required users to already hold crypto — which meant we were invisible to the largest growing segment: users who were new to crypto and wanted to enter with their bank card or local currency.\n\nCompetitors with fiat ramps were acquiring that user. We weren't. The absence of fiat access was both a revenue ceiling and an acquisition blocker.",

    signalFull:
      "Before committing to any fiat infrastructure, we analyzed existing user behavior. One data point changed the framing: 34% of our users were already navigating to external P2P services — typically found through our support documentation or community links.\n\nThey were using us as a discovery tool for what we weren't offering. That 34% was simultaneously a validation signal (strong proven demand) and a quantified revenue leak. We were warm-handing users to competitors on a measurable and repeatable basis.",

    solutionFull:
      "The obvious path: build fiat infrastructure. Acquire banking partners, obtain e-money licenses, implement KYC. Estimated timeline: 12–18 months minimum. Regulatory risk: high.\n\nThe alternative: integrate Mercuryo's white-label widget. No banking license required on our end. No KYC liability. Four-week integration. The trade-off: we wouldn't control the UX.\n\nWe chose Mercuryo. The reasoning was explicit: at this stage, we needed to validate whether our users would convert on fiat-to-crypto, not optimize the experience for users we hadn't yet proven would show up. Control over UX is valuable — but only after you've proven the demand.",

    implementationFull:
      "The integration itself was technically straightforward — a white-label iframe with SimpleSwap branding. The product challenge was routing logic: how to surface the ramp to the right users (fiat-first, not crypto-first) without disrupting the core swap flow that was already working.\n\nWe embedded it at the entry point of the funnel for users with no existing crypto balance, A/B tested the entry prompt copy, and iterated on placement over the first month.",

    resultsFull:
      "$4.2M+ in monthly volume within 3 months of launch. ROI achieved in month 3.\n\nThe ramp opened the acquisition funnel to a segment we'd previously been invisible to: crypto-curious users who had euros or dollars but no existing crypto holdings. It also validated a hypothesis for future product strategy: fiat-native users had higher long-term retention than pure crypto-to-crypto swappers.",

    lessonFull:
      "This case confirmed something I've come to treat as a default operating principle: the cost of being 6 months slower to validate is almost always higher than the cost of an imperfect v1 integration.\n\nWe gave up UX control. The Mercuryo widget had its own styling, its own error states, its own edge cases. Users noticed. Some complained. But the data from real usage — on real volume, at real scale — was worth orders of magnitude more than a polished experience we spent a year building before finding out if anyone wanted it.\n\nOwning the full stack is a destination, not a starting point.",

    keyTakeaways: [
      "User behavior analytics (34% P2P usage) was more compelling than any survey for proving demand.",
      "White-label integrations are a valid v1 strategy — the goal is validation, not perfection.",
      "A second revenue stream from an existing user base has near-zero acquisition cost if the product fits the existing flow.",
    ],

    prevSlug: "crypto-card",
    nextSlug: "wallet-growth",
  },

  {
    slug: "wallet-growth",
    index: 2,
    company: "EMCD",
    title: "Custodial Wallet Growth",
    subtitle: "Cross-activation and retention at scale",
    tag: "Retention · CRM · Growth",
    accentFrom: "from-orange-500",
    accentTo: "to-rose-600",
    metrics: [
      { value: "42K", label: "MAU (from 30K)" },
      { value: "400K", label: "Total users" },
      { value: "+11%", label: "LTV growth" },
      { value: "+40%", label: "MAU growth" },
    ],
    problem:
      "Active base was growing but users held crypto without converting to monetized products. Churn left without revenue conversion.",
    signal:
      "1,400 new active users/month were arriving through phone and email transfers — an organic channel we weren't leveraging.",
    solution:
      "CRM cross-activation into card, on/off-ramp, and Coinhold earn. Referral program with $ payout per activation.",
    result:
      "MAU 30K→42K (+40%), 400K total users, LTV +11%, 3-month retention +4%.",
    lesson:
      "Retention without monetization is just cost. Cross-product CRM activation outperformed every paid channel.",

    context:
      "EMCD's custodial wallet was the core of the product ecosystem — users held mined crypto here, managed balances, and accessed the platform's other products. By the time I took ownership of wallet growth, the user base was large but monetization was uneven.\n\nMAU was growing, but the rate lagged behind what total registrations would predict. Something was losing users before they could reach the platform's paid products.",

    problemFull:
      "A significant portion of registered users had wallets, deposited occasionally, and never engaged with the card, the fiat ramp, or Coinhold — the three products that generated platform revenue. They were using us as a storage layer, not as a financial platform.\n\nChurn analysis showed these users didn't leave in anger. They left by drift — no particular reason to stay active once the immediate deposit or withdrawal need was met. The problem wasn't satisfaction; it was relevance. We hadn't given them a reason to engage beyond their entry use case.",

    signalFull:
      "One cohort analysis changed how we approached the problem. Users who arrived through phone or email contact imports — essentially, users who discovered EMCD through someone they already knew — showed materially higher activation rates on paid products than users from any paid acquisition channel.\n\nThe volume was 1,400 new active users per month arriving through this channel. We weren't marketing it, weren't surfacing it prominently, and weren't measuring it consistently. It was a social proof acquisition engine running quietly in the background.",

    solutionFull:
      "I built a cross-activation strategy with CRM as the primary distribution mechanism. The core logic: segment wallet users by their engagement state, then route each segment to the most likely next paid interaction.\n\nA user with crypto in their wallet but no card was a card prospect. A user with card activity but no earn product was a Coinhold prospect. A user with fiat ramp activity but low wallet engagement needed a reason to deepen. Each segment got a distinct activation sequence, not a generic platform email.",

    implementationFull:
      "We built CRM sequences for three cross-activation paths: wallet → card, wallet → ramp, and wallet/card → Coinhold. Each path included: a behavioral trigger (inactivity threshold or balance milestone), a 3–5 message sequence over 10–14 days, and a success metric (first transaction in the target product).\n\nIn parallel, we launched a referral program with a dollar-denominated payout per new activated user. Payout triggered on verified activation (first transaction), not sign-up — this prevented incentive gaming while keeping the economics defensible.\n\nWe also expanded the ramp product: added new coin and trading pairs, improved routing logic, and worked with the liquidity team to tighten spreads on high-volume pairs.",

    resultsFull:
      "MAU grew from 30,000 to 42,000 — a 40% increase over twelve months. Total platform users reached 400,000. LTV increased 11%. Three-month retention improved 4 percentage points.\n\nThe cross-activation CRM sequences outperformed every paid channel tested during the same period on a cost-per-activated-user basis. The transfer/contact referral channel was formalized, promoted, and became a consistent input to new user acquisition.",

    lessonFull:
      "This case made a principle concrete for me that had previously been abstract: a user who sits in your product without paying for anything is not a neutral presence. They're infrastructure cost with an activation opportunity attached.\n\nThe instinct with retention problems is to ask 'how do we keep this user?' But the more productive question is: 'what is the first paid interaction this user is most likely to take, and what's blocking them from taking it?' CRM-led cross-activation lets you answer that question at scale — for tens of thousands of users, simultaneously, with measurable outcomes.\n\nRetention is downstream of activation. Fix activation first.",

    keyTakeaways: [
      "Organic social-proof acquisition (contact imports) consistently outperforms paid on activation quality — formalize it early.",
      "Segment-specific CRM cross-activation outperforms generic retention campaigns on every metric.",
      "LTV growth through cross-product activation is faster and cheaper than new user acquisition.",
    ],

    prevSlug: "fiat-ramp",
  },
];

export function getCaseBySlug(slug: string): CaseMeta | undefined {
  return cases.find((c) => c.slug === slug);
}
