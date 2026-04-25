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

/**
 * Cards display in array order on the homepage and the order field drives
 * the "01 / 06" badge. Both kept in reverse-chronological order so the
 * grid reads newest → oldest top-to-bottom.
 */
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
    slug: "buthey",
    order: 3,
    title: "Buthey: depth was the only strategy",
    tagline: "An MBA, a sewing machine, a D2C site I built myself, and zero returns to date.",
    company: "Buthey",
    role: "Co-Founder / COO",
    year: "2024",
    duration: "Apr '24 → Oct '24",
    domain: ["D2C", "Retail", "Ops", "0 → 1"],
    accent: "hot",
    emoji: "👗",
    hook: "Walked out of business school with a deck habit. Walked into an industry that grades you on stitch-count, dye lots, and how fast a vendor returns your call.",
    tldr: "Co-founded Buthey, a premium women's wear D2C brand. Learned manufacturing, D2C tooling, performance marketing and supply chain from scratch. Hit ₹25L in six months with zero product returns to date.",
    metrics: [
      { value: "0", label: "returns to date" },
      { value: "₹25L", label: "rev in 6 mo" },
      { value: "100%", label: "hand-QC'd" },
    ],
    story: {
      context: {
        heading: "An MBA grade, and a sewing machine.",
        body: "Just out of business school. Co-founded Buthey — premium women's wear, India-first, sold direct. The MBA gave me decks, frameworks, a comfort with strategy. The industry asked for stitch-counts, dye-lot consistency, and a vendor who'd actually pick up the phone on a Tuesday. Day one was a sewing-machine demo and a Notion doc I rewrote three times that week.",
        beat: "0 industry experience",
      },
      problem: {
        heading: "Six different jobs disguised as one company.",
        body: "Manufacturing — find a karkhana, get sample-to-prod right, learn what GSM means. D2C — build a Shopify-tier site, run checkout, returns, COD, the whole funnel. Performance marketing — Meta + WhatsApp, every rupee accountable to a number. Supply chain — fabric sourcing, QC, dispatch, last-mile reverse logistics. Brand — the part the MBA actually trained me for. Each blocked launch. None outsourceable at our cheque size.",
      },
      bet: {
        heading: "Go deep, not wide. Learn one floor at a time.",
        body: "Refused to scale before unit economics + quality were locked. Spent the first two months sitting on factory floors learning which weave returns to a steam press without distorting. Built the website myself on a no-code stack because nobody else would care more about the cart abandonment flow. Ran the first ₹3L of ads myself on Meta, learning what a creative refresh actually means. Hand-checked every single garment before pack-out — that's where the zero-returns number was earned.",
        beat: "Hand-QC every single order",
      },
      outcome: {
        heading: "₹25L in six months, zero returns ever.",
        body: "₹25L in revenue across the first six months. Performance marketing ROAS held above 3.5×. Most importantly: zero product returns to date. That stat isn't an accident — it's the receipt for showing up to factory inspections and saying no to dye lots that didn't match. Walked out of Buthey with industry depth I couldn't have read about, and a healthy respect for anyone who builds physical product. Founder mode is a personality trait now.",
        beat: "0 product returns",
      },
    },
    stack: ["Shopify", "Meta Ads", "WhatsApp Business", "Razorpay", "Notion", "Excel (a lot)"],
    shipped: [
      "Premium women's wear D2C brand, 0 → ₹25L in 6 months",
      "Manufacturing pipeline with vetted vendor stack",
      "D2C site + checkout + returns flow, built in-house",
      "Performance marketing engine, ROAS 3.5×+",
      "Hand-QC operating model → zero product returns to date",
    ],
  },
  {
    slug: "flipkart-nme",
    order: 4,
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
    order: 5,
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
  {
    slug: "iesa-vr-rover",
    order: 6,
    title: "VR Rover: world's first, at 21",
    tagline: "World's first VR-controlled rover, built in 48 hours at IESA Vision Summit '17.",
    company: "IESA Vision Summit · Makeathon",
    role: "Team Lead · Build",
    year: "2017",
    duration: "Feb 21–22, 2017",
    domain: ["AR/VR", "Hardware", "Hackathon"],
    accent: "electric",
    emoji: "🤖",
    hook: "21, in college, no PRDs, no production constraints. Just two days, a VR headset, a rover chassis, and a stubborn idea: drive it from your eyes.",
    tldr: "Built the world's first VR-controlled rover at IESA Vision Summit Makeathon 2017. AR/VR theme, 2nd place out of 100+ teams, ₹50K prize. Two days, four-person team, one stubborn idea.",
    metrics: [
      { value: "2nd", label: "of 100+ teams" },
      { value: "48h", label: "to live demo" },
      { value: "₹50K", label: "prize money" },
    ],
    story: {
      context: {
        heading: "Two days. AR/VR theme. Bring something built.",
        body: "IESA Vision Summit Makeathon, Bangalore, February 2017. India's largest electronics body, 100+ teams across IoT / AR-VR / embedded, 48 hours to ship a working prototype that judges could actually pick up and use. We were a four-person student team. The brief was open. We wanted to drive a rover — from inside a headset.",
        beat: "100+ teams, 48 hours",
      },
      problem: {
        heading: "VR latency, radio control, and a camera stream — all on a student budget.",
        body: "VR demands sub-50ms head-tracking response or your stomach files a complaint. Radio rovers have wobbly latency. Streaming a camera over consumer WiFi in 2017 meant frame drops + stutter at every demo table. Parts had to ship in a one-week order window. Every component had to do double duty or it didn't make the build.",
      },
      bet: {
        heading: "Strip the stack. Stream + tilt + drive, nothing else.",
        body: "Cut every feature that wasn't 'see what the rover sees, tilt your head to steer.' Used a smartphone as both the rover's onboard camera and a Cardboard-style headset on the driver side. WiFi-direct between the two phones to skip the venue's router (and its 200ms of grief). Custom Arduino code for the chassis. The whole rig fit on a kitchen table for the build week.",
        beat: "One feature, done well",
      },
      outcome: {
        heading: "2nd of 100+ teams. Cheque, photos, claim.",
        body: "Demoed live on the IESA stage. Judges drove the rover from their seats while wearing the headset. Took 2nd place across 100+ teams in the AR/VR theme — walked off with a ₹50,000 cheque and the 'world's first VR rover' claim, defensible because no one had shipped one as a single integrated demo at scale yet. The bigger win was the lesson nobody told me at 21: ruthless scoping wins hackathons. Same lesson applied to every product I shipped after.",
        beat: "₹50K + 'world's first'",
      },
    },
    stack: ["Arduino", "Unity", "Android (Cardboard SDK)", "WiFi Direct", "Soldering iron", "Hot glue"],
    shipped: [
      "World's first VR-controlled rover, working demo",
      "Live judges-on-stage drive",
      "2nd of 100+ teams · AR/VR theme · IESA '17",
      "₹50,000 prize money",
    ],
    cover: {
      src: "/photos/iesa-vr-rover.jpg",
      caption: "team VR ROOVER · 2nd winner · IESA Vision Summit, blr · feb '17",
      alt: "Rohit and team accepting the ₹50,000 second-prize cheque at IESA Vision Summit 2017 Makeathon for the VR Rover project",
    },
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
