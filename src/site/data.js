// Drop a clip at public/hero.mp4 (e.g. a free Pexels/Mixkit "creative team working" video).
// If it's missing, the hero falls back to the animated gradient.
export const HERO_VIDEO = "/hero.mp4";
// Tall video strip beside the approach statement; falls back to hero.mp4 if this one is missing.
export const APPROACH_VIDEO = "/approach.mp4";

export const services = [
  {
    id: "01",
    name: "DESIGN",
    illustration: "design",
    headline: "Visual systems that look sharp everywhere they show up.",
    body: "From the first logo sketch to the last pixel on your website, we design identities, interfaces and campaigns that feel unmistakably yours and scale without losing their edge.",
    deliverables: ["Visual identity systems", "Website & UI/UX design", "Packaging & print", "Campaign art direction"],
    timeline: "4–8 weeks",
  },
  {
    id: "02",
    name: "BUSINESS CONSULTING",
    illustration: "consulting",
    headline: "Clear strategy for the decisions that move the business.",
    body: "We sit with founders and leadership teams to untangle growth problems, sharpen the offer and build a practical roadmap your team can actually execute.",
    deliverables: ["Growth audits", "Go-to-market planning", "Offer & pricing design", "90-day roadmaps"],
    timeline: "2–6 weeks",
  },
  {
    id: "03",
    name: "BRAND STRATEGY",
    illustration: "strategy",
    headline: "Know exactly who you are, and why it matters to your customer.",
    body: "Positioning, messaging and brand architecture grounded in real audience research, so every touchpoint says the same compelling thing.",
    deliverables: ["Positioning & messaging", "Audience research", "Brand architecture", "Naming & tone of voice"],
    timeline: "3–6 weeks",
  },
  {
    id: "04",
    name: "DIGITAL MARKETING",
    illustration: "digital",
    headline: "Performance marketing with a brand-builder's taste.",
    body: "Paid social, search, content and email campaigns that don't just convert this quarter. They compound into a brand people seek out.",
    deliverables: ["Paid social & search", "SEO & content", "Email & automation", "Analytics & reporting"],
    timeline: "Ongoing",
  },
  {
    id: "05",
    name: "STRATEGIC MARKETING",
    illustration: "marketing",
    headline: "The right message, in the right channel, at the right moment.",
    body: "We map your market, pick the channels that matter and plan campaigns around real commercial targets, then measure what works and double down.",
    deliverables: ["Annual marketing plans", "Campaign strategy", "Channel mix & budgets", "Partnerships"],
    timeline: "3–5 weeks",
  },
  {
    id: "06",
    name: "COMMUNICATIONS",
    illustration: "comms",
    headline: "Stories that earn attention, and keep it.",
    body: "Press, editorial and internal communications that build trust with every audience you care about, from customers to investors to your own team.",
    deliverables: ["PR & media relations", "Editorial & content", "Crisis communications", "Internal comms"],
    timeline: "Ongoing",
  },
];

export const effectItems = [
  {
    id: "01",
    title: "BRAND IDENTITY",
    desc: "A bold, distinctive visual language that turns heads and builds instant recognition across every touchpoint.",
    stat: "+340%",
    statLabel: "Brand recall lift",
    video: "/effect-1.mp4",
  },
  {
    id: "02",
    title: "MARKET POSITIONING",
    desc: "Carve out the category you own. We find the white space and plant your flag before competitors know it exists.",
    stat: "2.4×",
    statLabel: "Faster market penetration",
    video: "/effect-2.mp4",
  },
  {
    id: "03",
    title: "AUDIENCE GROWTH",
    desc: "Community-first strategies that compound, turning customers into advocates who do the marketing for you.",
    stat: "+180%",
    statLabel: "Organic audience growth",
    video: "/effect-3.mp4",
  },
  {
    id: "04",
    title: "REVENUE ACCELERATION",
    desc: "Every creative decision ties back to a commercial outcome. Strategy and execution aligned to your growth targets.",
    stat: "3.1×",
    statLabel: "Average ROI on campaigns",
    video: "/effect-4.mp4",
  },
];

export const budgets = ["< $5k", "$5k – $15k", "$15k – $50k", "$50k +"];
