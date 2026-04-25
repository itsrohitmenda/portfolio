export type Metric = { value: string; label: string };

export type Scene = {
  heading: string;
  body: string;
  beat?: string;
};

export type Story = {
  context: Scene;
  problem: Scene;
  bet: Scene;
  outcome: Scene;
};

export type CaseStudy = {
  slug: string;
  order: number;
  title: string;
  tagline: string;
  company: string;
  role: string;
  year: string;
  duration: string;
  domain: string[];
  accent: "lime" | "hot" | "electric" | "peach" | "butter";
  emoji: string;
  hook: string;
  tldr: string;
  metrics: Metric[];
  story: Story;
  stack: string[];
  shipped: string[];
  /**
   * Optional editorial cover photo — slotted between hero and stats on the
   * detail page when present. Use a wide team/situational shot, not a logo.
   */
  cover?: { src: string; caption: string; alt: string };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "swadesh",
    order: 1,
    title: "Swadesh hits America",
    tagline: "Taking a Reliance Retail brand cross-Pacific in 45 days.",
    company: "Nagarro × Reliance Retail",
    role: "Product Owner",
    year: "2025–now",
    duration: "Dec '25 → present",
    domain: ["E-commerce", "Global launch", "AI/ML"],
    accent: "electric",
    emoji: "🇺🇸",
    hook: "Picture this: a giant Indian retail conglomerate wants to plant a flag in the US, and the clock is 45 days. No pressure.",
    tldr: "Led the US launch of Swadesh — payments, tax, logistics, localisation, legal, inventory, all of it. Landed on time with a 32% conversion uplift and AI demand-forecasting baked into the storefront.",
    metrics: [
      { value: "45d", label: "to launch-ready" },
      { value: "+32%", label: "storefront conversion" },
      { value: "6", label: "workstreams wrangled" },
    ],
    story: {
      context: {
        heading: "A $120B market, and a 45-day clock.",
        body: "Reliance Retail wanted Swadesh — an India-rooted premium label — to plant a US flag. Fully compliant, fully localised, six weeks end-to-end. The brief arrived with more footnotes than runway.",
        beat: "45 days to launch-ready",
      },
      problem: {
        heading: "'Launch-ready' is six products in a trench coat.",
        body: "Tax nexus in every target state. Payments that didn't trip US fraud models. Shipping SLAs US shoppers would actually accept. Copy that didn't read as Indian-English. Legal posture that wouldn't yank us off the App Store. Every one of these was a launch blocker on its own.",
      },
      bet: {
        heading: "Ruthless scoping + AI where it earns its keep.",
        body: "I put every ask on a sticky wall and drew one line: if it doesn't make the launch legal, purchasable, or shippable, it bumps to v1.1. Said no 40 times in a week. Then layered in demand forecasting and trend prediction so US inventory didn't bleed capital while we learned the market.",
        beat: "40 noes in one week",
      },
      outcome: {
        heading: "Shipped on day 45. Checkout did the rest.",
        body: "Storefront launched on schedule. The single biggest unlock was funnel surgery on PDP and checkout — US shoppers bounce at any surprise (tax, shipping, 'international fee'), so we surfaced the total early. Three weeks of iteration → +32% conversion. AI forecasting kept the P&L from crying.",
        beat: "+32% storefront conversion",
      },
    },
    stack: ["Jira", "Linear", "Figma", "Mixpanel", "Shopify Plus-ish setup", "Salesforce"],
    shipped: [
      "US storefront, launched day-45 on schedule",
      "Compliance pack across 5 states",
      "AI demand-forecast loop feeding merchandising",
      "Checkout v2 → +32% conversion",
    ],
  },
  {
    slug: "collective-artists-network",
    order: 2,
    title: "CAN: 100K → 1.6M, no growth hack theatre",
    tagline: "Zero-to-PMF AdTech for the creator economy.",
    company: "Collective Artists Network",
    role: "Head of Product",
    year: "2025",
    duration: "Jan '25 → Dec '25",
    domain: ["AdTech", "Growth", "Consumer"],
    accent: "hot",
    emoji: "📣",
    hook: "I walked in on day one and the product was half a PRD and a lot of vibes. Walked out with 1.6M users, ₹12Cr revenue, and a team that actually knew what 'DAU' meant.",
    tldr: "Built and launched an AdTech platform for a top Indian creator agency. Hit PMF in four months, scaled to 1.6M users (15×), and shipped monetisation funnels that generated ₹12Cr+ from in-app behaviour alone.",
    metrics: [
      { value: "15×", label: "user growth" },
      { value: "+750%", label: "DAU" },
      { value: "₹12Cr+", label: "revenue" },
      { value: "1B+", label: "ad impressions" },
    ],
    story: {
      context: {
        heading: "Half a PRD and a lot of vibes.",
        body: "Early-stage AdTech inside a top Indian creator agency. Three half-working features, no north-star, 100K users with a retention curve that wouldn't flatten. Month one was twenty user calls and a single page titled 'what we are' — and, more importantly, what we're not.",
        beat: "100K users, zero PMF",
      },
      problem: {
        heading: "Wrong cohort, wrong pricing, wrong onboarding.",
        body: "We were chasing broad consumers. Retention refused to move because the product wasn't actually for them. Six-screen onboarding nobody finished. Feature list longer than the roadmap could carry. PMF is a vibe until the retention curve tells you you're lying to yourself.",
      },
      bet: {
        heading: "Narrow to two sides, compound the loops.",
        body: "Cut to 'creators who want brand deals' and 'brands who want measurable reach'. Killed two features in week one. Rebuilt onboarding to front-load value in under 60 seconds. Shipped a daily creator 'brief' notification — not a streak, a reason to open. Referral loops with product-shaped incentives, not rupee bribes.",
        beat: "Feature list cut in half",
      },
      outcome: {
        heading: "15× users, ₹12Cr revenue, no curve bending.",
        body: "100K to 1.6M users. DAU up 750% in two quarters. Monetisation funnels built off in-app behaviour — relevance over frequency — hit ₹12Cr without the retention curve breaking. 97% roadmap completion, three quarters running, because we scoped ruthlessly and shipped what we said.",
        beat: "97% roadmap completion, 3 quarters",
      },
    },
    stack: ["Mixpanel", "CleverTap", "AppsFlyer", "Figma", "Jira", "Meta Ads", "WhatsApp Business API"],
    shipped: [
      "AdTech platform, 0 → 1.6M users",
      "Referral + onboarding loops",
      "In-app monetisation engine → ₹12Cr",
      "97% roadmap completion, 3 quarters running",
    ],
    cover: {
      src: "/photos/collective-team.jpg",
      caption: "the team that turned a deck into a brand · CAN HQ, '25",
      alt: "Collective Artists Network product team group photo",
    },
  },
  {
    slug: "flipkart-nme",
    order: 3,
    title: "NME: Generative AI on Big Billion Day",
    tagline: "The highest-stakes sale in India, and we shipped GenAI into it.",
    company: "War Room × Flipkart Labs",
    role: "Product Manager",
    year: "2023",
    duration: "BBD 2023",
    domain: ["GenAI", "E-commerce", "Consumer"],
    accent: "lime",
    emoji: "🤖",
    hook: "Big Billion Day is Flipkart's Super Bowl. No one reasonable ships experimental GenAI into it. We did anyway.",
    tldr: "Built and shipped NME, a Generative AI experience for Flipkart Labs, on the company's highest-traffic sale event. Record engagement, record sales, zero incidents.",
    metrics: [
      { value: "BBD '23", label: "ship window" },
      { value: "25+", label: "x-functional team" },
      { value: "3×", label: "faster dev cycles" },
    ],
    story: {
      context: {
        heading: "Labs wanted GenAI inside the Super Bowl.",
        body: "Big Billion Day is Flipkart's highest-traffic, highest-revenue event of the year. The entire point of Labs is to push novel tech at real traffic — if GenAI moves the needle, it'll show up here first. Sale event, not a beta.",
        beat: "Highest-traffic event in Indian e-commerce",
      },
      problem: {
        heading: "LLMs are slow. BBD shoppers are not patient.",
        body: "One visible spinner on the home page during BBD is an incident. Flipkart's infra was built for sub-second responses; LLM latency lives on a different planet. And scope creep was the other enemy — everyone wanted NME to be a chatbot for everything.",
      },
      bet: {
        heading: "One job, and over-invest in the fallback.",
        body: "Scoped NME to one thing: help customers discover products they wouldn't have searched for. Not a chatbot. Spent more time on prompt architecture, caching, and graceful degradation than on model choice. If AI didn't respond in under a beat, we fell back to a curated experience — invisibly.",
        beat: "One job, done well",
      },
      outcome: {
        heading: "Record engagement. Zero incidents. A playbook.",
        body: "NME drove record customer engagement during BBD '23. Bigger lesson: GenAI in consumer retail isn't about impressing people with intelligence — it's about reducing the 'what now?' moment. The best outcome was invisible: people found stuff faster, bought more, nobody said 'wow, AI'. Playbook got reused across later Labs experiments.",
        beat: "0 incidents across the sale window",
      },
    },
    stack: ["Firebase", "Postman", "Figma", "Mixpanel", "Jira", "Custom LLM stack"],
    shipped: [
      "NME GenAI discovery surface",
      "Shipped inside Big Billion Day '23",
      "Fallback architecture for degraded states",
      "Playbook reused for later Labs experiments",
    ],
  },
  {
    slug: "under-25",
    order: 4,
    title: "Under 25: the internet's coolest student corner",
    tagline: "A community app for Indian Gen Z, built with Indian Gen Z.",
    company: "Under 25",
    role: "Product Manager",
    year: "2020–23",
    duration: "Feb '20 → Mar '23",
    domain: ["Consumer", "Community", "0→1"],
    accent: "butter",
    emoji: "🎓",
    hook: "Before I was writing PRDs, I was running a student program with 5,000 fellows and finding out the hard way that community products are mostly operations wearing a PM costume.",
    tldr: "Defined vision, roadmap, and ops for Under 25's student platform. 20K users in 3 months, 1.5K DAU, 40% MoM retention. Also: 12K rewards delivered, 100+ events run, one team learned how to ship.",
    metrics: [
      { value: "20K", label: "users in 3 mo" },
      { value: "1.5K", label: "DAU" },
      { value: "+40%", label: "MoM retention" },
      { value: "5K+", label: "student fellows" },
    ],
    story: {
      context: {
        heading: "My first real PM seat, 5,000 fellows deep.",
        body: "Community product for Indian Gen Z, with a 5,000-student fellow cohort running IRL alongside it. Half app, half logistics operation. My first actual PM job — which is another way of saying: no framework survives contact with a group chat of sixteen-year-olds.",
        beat: "5,000 student fellows IRL",
      },
      problem: {
        heading: "Quarterly roadmaps don't match Gen Z attention spans.",
        body: "Retention was flat. Every feature pitch was a streak or a push-notif — the engagement-loop greatest hits, all slightly gross. The team was running quarterly roadmaps against an audience that re-decides what's cool every Tuesday. The frameworks were the problem.",
      },
      bet: {
        heading: "Ship on a student rhythm, treat ops as product.",
        body: "Moved the team off quarterly roadmaps onto a two-week 'what did students say this week' cadence. Tied engagement to real rewards — tangible, local, sometimes goofy — delivered via a vendor network we stitched together. Treated events and rewards as product surface, not marketing spend.",
        beat: "12K+ rewards delivered",
      },
      outcome: {
        heading: "20K users, +40% retention, a team that cuts.",
        body: "20K users in 90 days. 1.5K DAU. 40% MoM retention uplift. 100+ on-ground events. Budget got tight, events got smaller, events got better — the constraint sharpened the product. By year two the team was asking 'what would we cut?' instead of 'what would we add?'.",
        beat: "+40% MoM retention",
      },
    },
    stack: ["Firebase", "Mailchimp", "Figma", "Spreadsheets", "WhatsApp", "Canva"],
    shipped: [
      "Student platform, 0 → 20K users in 90d",
      "Rewards engine, 12K+ delivered",
      "100+ on-ground events",
      "5,000-fellow operating model",
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
