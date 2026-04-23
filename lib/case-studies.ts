export type Metric = { value: string; label: string };
export type Chapter = { heading: string; body: string };

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
  chapters: Chapter[];
  stack: string[];
  shipped: string[];
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
    chapters: [
      {
        heading: "the brief (read: the curveball)",
        body: "Reliance Retail wanted Swadesh — an India-rooted premium label — to land in the US, fully compliant, fully localised, in six weeks. The brief arrived with more footnotes than runway. My first week was spent mapping what 'launch-ready' actually meant: tax nexus in every target state, payments that didn't trip US fraud models, shipping SLAs customers would accept, copy that didn't read as Indian-English, and a legal posture that wouldn't get us yanked off the App Store.",
      },
      {
        heading: "ruthless scoping",
        body: "Everyone had a dream feature. A recommender. A loyalty program. A TikTok integration. I made a wall of sticky notes, one per ask, and drew a hard line: anything that doesn't make the US launch legal, purchasable, or shippable gets bumped to v1.1. Saying no 40 times in a week is a skill I now claim on my resume.",
      },
      {
        heading: "the AI layer (actually useful this time)",
        body: "The interesting bit: we layered in demand forecasting and trend prediction so the US inventory didn't bleed capital while we learned the market. Distribution optimisation routed SKUs to the right coast. It's the GenAI work that doesn't go in a press release — it just makes the P&L not cry.",
      },
      {
        heading: "what moved the needle",
        body: "Funnel surgery on the PDP and checkout was the single biggest conversion unlock — +32% after three weeks of iteration. The learning: US shoppers bounce at any checkout surprise (tax, shipping, 'international fee'), so we surfaced the total early and killed the bounce.",
      },
    ],
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
    chapters: [
      {
        heading: "walk-in audit: what was actually broken",
        body: "Classic early-stage product: three half-working features, no north-star, onboarding with six screens that nobody finished. I killed two features in week one and spent week two with twenty users on calls. By the end of the month I had a single page titled 'what we are' — and, more importantly, a list of things we're not.",
      },
      {
        heading: "finding PMF in 4 months",
        body: "PMF is a vibe until the retention curve flattens. We were chasing the wrong retention cohort — broad consumers. Narrowing to 'creators who want brand deals' plus 'brands that want measurable reach' collapsed the feature list by half and clarified pricing. Four months later the Sean Ellis score was where it needed to be and we had repeatable channels.",
      },
      {
        heading: "growth loops that compound",
        body: "Referral loops with product-shaped incentives (not rupee bribes) plus an onboarding that front-loaded value in under 60 seconds. The combo is what took 100K to 1.6M. The single biggest DAU unlock was a daily 'brief' notification that gave creators a reason to open — DAU went up 750% in two quarters.",
      },
      {
        heading: "monetisation without killing the golden goose",
        body: "Ad platforms die when monetisation and user experience diverge. We built monetisation funnels off in-app behaviour — relevance > frequency — and hit ₹12Cr in revenue without the retention curve bending the wrong way. 97% roadmap completion across three quarters because we ruthlessly scoped and we shipped what we said we would.",
      },
    ],
    stack: ["Mixpanel", "CleverTap", "AppsFlyer", "Figma", "Jira", "Meta Ads", "WhatsApp Business API"],
    shipped: [
      "AdTech platform, 0 → 1.6M users",
      "Referral + onboarding loops",
      "In-app monetisation engine → ₹12Cr",
      "97% roadmap completion, 3 quarters running",
    ],
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
    chapters: [
      {
        heading: "why GenAI in a sale, not a beta",
        body: "The whole point of Labs is to push novel tech at real traffic. Sale events are where India's shopping habit actually lives, so if GenAI can move the needle, it'll show up here first. I scoped NME to do one thing really well — help customers discover products they wouldn't have searched for — not be a chatbot for everything.",
      },
      {
        heading: "the uncomfortable tradeoff: latency vs. delight",
        body: "LLMs are slow. Flipkart shoppers are not patient. We spent more time on prompt architecture, caching, and fallbacks than on the model choice itself. If the AI didn't respond in under a beat, we degraded gracefully to a curated experience. No one likes a spinner on the home page during BBD.",
      },
      {
        heading: "the people part",
        body: "25+ folks across PM, eng, design, ML. My job was less 'have the best idea' and more 'make sure everyone's best idea compounds instead of colliding'. Daily 15-min standups, a shared doc for tradeoffs, and one clear rule: anything that could break revenue goes through me before merging.",
      },
      {
        heading: "what shipped and what we learned",
        body: "NME drove record customer engagement during BBD '23. The bigger lesson: GenAI in consumer retail isn't about impressing people with intelligence, it's about reducing the moment of 'what now?'. The best outcome was invisible — people found stuff faster, bought more, and nobody said 'wow, AI'.",
      },
    ],
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
    chapters: [
      {
        heading: "my first real PM job",
        body: "Three years at Under 25 taught me what frameworks won't: Indian Gen Z will tell you exactly what they want if you stop running surveys and just sit in the group chat. I moved the product team off quarterly roadmaps and onto a two-week 'what did students say this week' rhythm. Retention started moving the next month.",
      },
      {
        heading: "engagement loops that weren't gross",
        body: "Everyone pitched streaks and push-notifs. I pushed back. The thing students actually engaged with was rewards — tangible, local, sometimes goofy — tied to real behaviour. Delivered 12,000+ rewards in two years through a vendor network we stitched together. The product was half app, half logistics operation.",
      },
      {
        heading: "operating at the age of your users",
        body: "Running a 5,000-fellow cohort taught me P&L realism in a way a spreadsheet never will. Budget got tight, events got smaller, events got better. The constraint made the product sharper. 100+ events, 40% MoM retention uplift, and a team that started asking 'what would we cut?' instead of 'what would we add?'.",
      },
    ],
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
