import { ServiceItem, StackCluster, ResultStat, CaseStudy, ProcessStep, ApproachPrinciple, TestimonialItem, FaqItem } from '../types';

export const HERO_DATA = {
  name: "MacQueen Omoruyi",
  role: "B2B Outbound & Revenue Systems Specialist",
  tagline: "Building reliable outbound engines for modern B2B teams",
  headlineLine1: "Pipeline isn't luck.",
  headlineLine2: "It's a system.",
  subhead: "I help B2B companies find their highest-value prospects, start genuine executive conversations, and build predictable revenue pipelines.",
  tags: [
    "GTM Strategy",
    "Lead Generation",
    "Outbound Systems",
    "Email Deliverability",
    "Sales Development",
    "Workflow Automation"
  ],
  floatingStats: [
    { label: "Client Track Record", value: "50+ B2B Companies", pos: "top-left" },
    { label: "Inbox Health Standard", value: "<5% Bounce Rate SLA", pos: "top-right" },
    { label: "Attributed Impact", value: "$6M+ Pipeline Created", pos: "bottom-center" }
  ]
};

export const PROBLEM_DATA = {
  headline: "Growth is more than sending more messages.",
  lead: "Most B2B outbound campaigns stall not from lack of effort, but from preventable breakdowns in targeting, data quality, and domain health.",
  breakdowns: [
    {
      title: "Wrong Audience & Broad Filters",
      description: "Reaching out to broad company lists instead of zeroing in on decision-makers with active buying triggers and urgent business need."
    },
    {
      title: "Outdated & Unverified Contact Data",
      description: "Relying on stale databases that bounce, hit spam traps, and damage sender reputation before emails ever reach the prospect."
    },
    {
      title: "Disconnected Tools & Manual Data Entry",
      description: "Juggling isolated tools without automated handoffs, leading to dropped leads, missed follow-ups, and incomplete CRM records."
    },
    {
      title: "Generic, Robotic Outreach Copy",
      description: "Sending mass templates that sound like automated pitches rather than thoughtful, peer-to-peer business observations."
    }
  ]
};

export const WHAT_I_DO_DATA: ServiceItem[] = [
  {
    id: "gtm-strategy",
    title: "GTM Strategy & Market Positioning",
    category: "Strategic Direction",
    iconName: "Compass",
    shortDesc: "Translating revenue targets into clear buyer targeting, high-converting messaging, and predictable outbound models.",
    subBullets: [
      "Ideal Customer Profile (ICP) tiering based on company size, tech stack, and growth signals",
      "Compelling offer positioning focused on executive pain points and measurable outcomes",
      "Customer acquisition modeling to align outreach volume with revenue targets",
      "Multi-touch sequence architecture combining email, LinkedIn, and targeted phone outreach"
    ]
  },
  {
    id: "lead-generation",
    title: "Precision Lead Sourcing & Data",
    category: "Lead Intelligence",
    iconName: "Target",
    shortDesc: "Custom data pipelines that source verified decision-makers with active buying signals and zero contact decay.",
    subBullets: [
      "Multi-source contact enrichment using Clay, Apollo, and specialized data providers",
      "Real-time intent triggers including new leadership hires, tech migrations, and funding rounds",
      "Rigorous email verification to filter out catch-alls and ensure near-zero bounce rates",
      "Segmented prospect lists tailored to specific roles, industries, and business priorities"
    ]
  },
  {
    id: "outbound-infrastructure",
    title: "Email Deliverability & Domain Setup",
    category: "Domain & Inbox Health",
    iconName: "Server",
    shortDesc: "Dedicated sender infrastructure and inbox warming that guarantee your messages land safely in the primary inbox.",
    subBullets: [
      "Dedicated secondary domains configured to completely protect your primary company domain",
      "Full DNS authentication setup including SPF, DKIM, DMARC, and custom tracking domains",
      "Automated inbox warm-up and gradual sending ramp-up via Instantly and Smartlead",
      "Proactive blacklist monitoring and continuous inbox health checks"
    ]
  },
  {
    id: "sales-development",
    title: "Sales Outreach & Meeting Booking",
    category: "Conversation Engineering",
    iconName: "TrendingUp",
    shortDesc: "Transforming cold prospects into qualified, calendar-ready meetings through relevant and respectful messaging.",
    subBullets: [
      "Personalized, context-rich messaging angles that resonate with senior executives",
      "Multi-step, problem-focused follow-up sequences designed to start discussions",
      "Clear qualification criteria and meeting handoff frameworks for sales teams",
      "Seamless integration with calendar scheduling tools and CRM activity tracking"
    ]
  },
  {
    id: "demand-generation",
    title: "Multi-Channel Outbound & Referrals",
    category: "Pipeline Expansion",
    iconName: "Zap",
    shortDesc: "Coordinated touchpoints across email and LinkedIn that establish trust and expand your brand reach.",
    subBullets: [
      "Unified outreach combining personalized email touches with LinkedIn social interactions",
      "Value-first content angles sharing industry insights, case studies, and actionable data",
      "Referral frameworks that systematically turn positive responses into warm introductions",
      "Audience retargeting synchronization to nurture warm accounts across channels"
    ]
  },
  {
    id: "automation-growth-ops",
    title: "Workflow Automation & CRM Sync",
    category: "Operations & Integration",
    iconName: "Cpu",
    shortDesc: "Connecting your outbound ecosystem with your CRM to automate lead routing, alerts, and reporting.",
    subBullets: [
      "Automated webhook integrations linking outreach tools directly to HubSpot and Salesforce",
      "Smart reply sorting to instantly tag responses as hot leads, questions, or opt-outs",
      "Real-time Slack and Teams alerts so your team can respond to interested leads in minutes",
      "Automated pipeline dashboards tracking meetings booked, reply rates, and campaign ROI"
    ]
  }
];

export const STACK_DATA: StackCluster[] = [
  {
    id: "data",
    title: "Lead Data & Research",
    desc: "Finding verified contact details and real-time buying signals across top data sources.",
    tools: [
      { name: "Clay", role: "Waterfall Data Enrichment & Logic", category: "data", highlight: true, status: "Primary Engine" },
      { name: "Apollo.io", role: "B2B Company & Contact Database", category: "data", highlight: false, status: "Verified Data" },
      { name: "Airtable", role: "Target Account & Prospect Database", category: "data", highlight: false, status: "Data Hub" },
      { name: "Ocean.io / Prospeo", role: "Lookalike Search & Verification", category: "data", highlight: false, status: "Validation" }
    ]
  },
  {
    id: "infra",
    title: "Inbox Setup & Deliverability",
    desc: "Protecting your primary domain with authenticated, warmed secondary mailboxes.",
    tools: [
      { name: "SPF / DKIM / DMARC", role: "Complete Email Security & Auth", category: "infra", highlight: true, status: "Fully Verified" },
      { name: "Google Workspace", role: "Dedicated Business Sending Mailboxes", category: "infra", highlight: false, status: "Warmed Up" },
      { name: "Microsoft 365", role: "Enterprise Outlook Mailboxes", category: "infra", highlight: false, status: "Warmed Up" },
      { name: "DNS & Deliverability Watch", role: "Real-Time Inbox Health Monitoring", category: "infra", highlight: false, status: "Active Guard" }
    ]
  },
  {
    id: "outbound",
    title: "Outbound Senders & CRM",
    desc: "Distributing email volume across inboxes and syncing every reply with your CRM.",
    tools: [
      { name: "Instantly.ai", role: "Multi-Inbox Sending & Smart Rotation", category: "outbound", highlight: true, status: "Sender Hub" },
      { name: "Smartlead.io", role: "Enterprise Sequence Orchestration", category: "outbound", highlight: true, status: "Sender Hub" },
      { name: "LinkedIn (HeyReach)", role: "Multi-Account Social Outreach", category: "outbound", highlight: false, status: "Social Channel" },
      { name: "HubSpot / Salesforce", role: "Automatic CRM Sync & Pipeline Tracking", category: "outbound", highlight: false, status: "Direct Sync" }
    ]
  },
  {
    id: "automation",
    title: "Automation & Workflows",
    desc: "Instant lead notifications, smart reply categorization, and hands-free handoffs.",
    tools: [
      { name: "Make.com", role: "Automated Lead Routing & Webhooks", category: "automation", highlight: true, status: "Workflow Engine" },
      { name: "Zapier", role: "App Connections & Instant Triggers", category: "automation", highlight: false, status: "Live Connect" },
      { name: "OpenAI / Claude AI", role: "Smart Reply Analysis & Personalization", category: "automation", highlight: false, status: "AI Assistant" },
      { name: "Slack / Teams Alerts", role: "Instant Real-Time Hot Lead Notifications", category: "automation", highlight: false, status: "Instant Ping" }
    ]
  }
];

export const RESULTS_DATA: ResultStat[] = [
  {
    id: "exp",
    value: 5,
    suffix: "+",
    label: "5+ Years",
    subtext: "Focused experience engineering B2B outbound and revenue systems.",
    changeRate: "Specialist Expertise"
  },
  {
    id: "clients",
    value: 50,
    suffix: "+",
    label: "50+ Clients",
    subtext: "B2B SaaS companies, consulting practices, and agencies scaled.",
    changeRate: "Proven Track Record"
  },
  {
    id: "bounce",
    value: 5,
    displayOverride: "< 5%",
    label: "< 5%",
    subtext: "Strict bounce rate threshold maintained across all client campaigns.",
    changeRate: "Inbox Deliverability"
  },
  {
    id: "open-rate",
    value: 50,
    suffix: "%+",
    label: "50%+",
    subtext: "Average qualified open rate achieved across dedicated sending domains.",
    changeRate: "Primary Inbox Placement"
  },
  {
    id: "growth",
    value: 35,
    suffix: "%+",
    label: "35%+",
    subtext: "Average month-over-month qualified pipeline growth for active clients.",
    changeRate: "Predictable Velocity"
  },
  {
    id: "revenue",
    value: 7,
    displayOverride: "$6M+",
    label: "$6M+",
    subtext: "Attributed qualified pipeline and closed contract value generated.",
    changeRate: "Measurable ROI"
  }
];

export const CASE_STUDIES_DATA: CaseStudy[] = [
  {
    id: "case-deliverability",
    tag: "Deliverability Recovery & Pipeline Rebuild",
    title: "Rescuing Deliverability for a Fast-Growing B2B SaaS",
    timeframe: "3-Week Turnaround",
    challenge: "A B2B software company saw their outbound performance collapse after their primary corporate domain was flagged with an 87% bounce rate. Their 12-person sales development team was stalled and scheduled meetings dropped to zero.",
    diagnosis: [
      "High sending volume blasted directly from their main company domain",
      "Missing email authentication records (SPF, DKIM, and DMARC)",
      "Unverified lead lists with over 40% invalid and catch-all addresses",
      "Damaged domain reputation causing emails to land directly in spam folders"
    ],
    architecture: [
      "Set up 15 dedicated secondary domains on Google Workspace and Microsoft 365",
      "Configured strict SPF, DKIM, and DMARC authentication policies across all domains",
      "Created a multi-step Clay verification workflow to filter out invalid and risky emails",
      "Implemented gradual inbox warm-up and automated rotation across Instantly"
    ],
    metrics: [
      { label: "Bounce Rate", value: "87% → 3.2%", detail: "Restored in under 3 weeks" },
      { label: "Open Rate", value: "11% → 64%", detail: "Returned to primary inboxes" },
      { label: "Qualified Demos", value: "38 / month", detail: "Exceeded pre-crash records" }
    ],
    resultSummary: "Within 21 days, deliverability was fully restored with an average bounce rate below 4%, protecting the main corporate domain and creating a repeatable engine that booked 38 enterprise demos per month."
  },
  {
    id: "case-referral",
    tag: "Executive Referral & Partnership Engine",
    title: "Building an Executive Referral System for an Enterprise Consultancy",
    timeframe: "60-Day Implementation",
    challenge: "A boutique enterprise advisory firm relied on ad-hoc founder referrals. They needed a structured outbound system to start warm conversations with Fortune 1000 CTOs and VPs of Engineering without damaging brand prestige.",
    diagnosis: [
      "No systematic tracking of existing client networks or alumni relationships",
      "Manual prospect research taking 45+ minutes per executive target",
      "Lack of structured follow-up sequences or automated lead handoffs"
    ],
    architecture: [
      "Constructed a dedicated outbound system focused on peer-to-peer executive introductions",
      "Built automated Clay pipelines to identify mutual connections and industry alignment",
      "Created a value-first outreach sequence sharing proprietary benchmark research",
      "Connected automated Make.com workflows to route interested replies directly to senior partners"
    ],
    metrics: [
      { label: "Executive Reply Rate", value: "22.4%", detail: "Direct CTO and VP responses" },
      { label: "Qualified Pipeline", value: "$1.85M", detail: "Added in the first 60 days" },
      { label: "Cost Per Qualified Opp", value: "-62%", detail: "Compared to paid advertising" }
    ],
    resultSummary: "Turned unpredictable word-of-mouth into a reliable executive acquisition channel, generating $1.85M in qualified enterprise pipeline within 60 days."
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Discover & Diagnose",
    tagline: "Audit & Baseline Analysis",
    timeframe: "Days 1–4",
    description: "We conduct a forensic audit of your existing outbound setup, checking DNS records (SPF, DKIM, DMARC), past sender domain reputation, data accuracy, and previous messaging performance to isolate the exact technical and operational bottlenecks.",
    deliverables: [
      "Deliverability & DNS Health Audit",
      "Ideal Customer Profile (ICP) Diagnostic",
      "Historical Pipeline & Conversion Breakdown",
      "Custom Step-by-Step Action Roadmap"
    ],
    keyOutcome: "Full root-cause diagnostic report with prioritized technical fixes."
  },
  {
    number: "02",
    title: "Target & Enrich",
    tagline: "Precision Lead Intelligence",
    timeframe: "Days 5–9",
    description: "We build custom waterfall data pipelines in Clay that source validated decision-makers, verify real-time buying signals (funding, key hires, tech migrations), and scrub out catch-all emails to ensure zero-bounce delivery.",
    deliverables: [
      "Multi-Source Clay Waterfall Workflows",
      "Buying Intent Signal Triggers",
      "Zero-Bounce Email Verification Pipeline",
      "Segmented Decision-Maker Account List"
    ],
    keyOutcome: "Fresh, verified prospect database filtered for active buying interest."
  },
  {
    number: "03",
    title: "Build & Warm Infrastructure",
    tagline: "Dedicated Sender System",
    timeframe: "Days 10–18",
    description: "We acquire and configure secondary sending domains on Google Workspace and Microsoft 365, apply strict authentication protocols, and initiate automated gradual warm-up routines across Instantly and Smartlead to protect your domain reputation.",
    deliverables: [
      "10–20 Isolated Secondary Sending Domains",
      "Full SPF, DKIM, DMARC, and Tracking Setup",
      "Automated Mailbox Warm-Up Routines",
      "High-Converting, Peer-Level Copy Sequences"
    ],
    keyOutcome: "Protected sender infrastructure operating at maximum primary inbox placement."
  },
  {
    number: "04",
    title: "Launch & Route",
    tagline: "Controlled Outreach & Alerts",
    timeframe: "Days 19–24",
    description: "We launch graduated outbound campaigns across verified inboxes, track deliverability telemetry daily, and connect automated webhook pipelines to route interested replies directly to your sales team's Slack or CRM within seconds.",
    deliverables: [
      "Multi-Inbox Rotational Outreach Launch",
      "AI Reply Sentiment Categorization",
      "Instant Slack & Teams Hot Lead Pings",
      "Automated CRM Activity Sync"
    ],
    keyOutcome: "Live outbound engine booking qualified executive discovery meetings."
  },
  {
    number: "05",
    title: "Optimize & Scale",
    tagline: "Continuous Growth Engine",
    timeframe: "Ongoing Sprint",
    description: "We analyze real conversation data, run structured A/B tests on value propositions and target segments, double down on top-performing buyer personas, and transition the engine into an automated, predictable revenue asset.",
    deliverables: [
      "Weekly Conversion & Reply Analytics",
      "A/B Angle & Messaging Iterations",
      "TAM Expansion & Adjacent Markets",
      "Complete Outbound Operating Playbook"
    ],
    keyOutcome: "Predictable, compounding pipeline generation with full transparency."
  }
];

export const APPROACH_PRINCIPLES: ApproachPrinciple[] = [
  {
    number: "01",
    title: "Precision Targeting",
    subtitle: "Relevance Over Raw Volume",
    description: "Outbound fails when thousands of irrelevant contacts receive mass emails. We focus on the high-value accounts that actively have the problem you solve.",
    contrast: {
      conventional: "Blasting 10,000 unverified emails to generic job titles",
      systemFixer: "Pinpoint list building targeting verified buying triggers and validated decision-makers"
    }
  },
  {
    number: "02",
    title: "Resilient Systems",
    subtitle: "Domain Protection & Inbox Health",
    description: "Never risk your primary corporate domain. We set up isolated sending inboxes with strict authentication, automated rotation, and sub-5% bounce limits.",
    contrast: {
      conventional: "Sending mass outreach directly from your primary work domain",
      systemFixer: "Dedicated secondary domains with full SPF, DKIM, and DMARC authentication"
    }
  },
  {
    number: "03",
    title: "Real Conversations",
    subtitle: "Respectful, Value-First Messaging",
    description: "Executives ignore aggressive sales hype. We craft concise, thoughtful messages that respect their time and spark genuine business conversations.",
    contrast: {
      conventional: "Long, generic sales pitches stuffed with buzzwords",
      systemFixer: "Concise, insight-driven notes addressing specific business priorities"
    }
  },
  {
    number: "04",
    title: "Continuous Optimization",
    subtitle: "Data-Driven Iteration",
    description: "Outbound isn't a one-and-done setup. We track deliverability, reply sentiment, and meeting conversion rates to continually improve performance.",
    contrast: {
      conventional: "Launching campaigns once and ignoring domain health until emails bounce",
      systemFixer: "Ongoing performance reviews, inbox monitoring, and continuous message testing"
    }
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "testimonial-1",
    quote: "Our emails were going straight to spam and our sales reps couldn't book any meetings. MacQueen stepped in, set up fresh sending inboxes with proper authentication, and cleaned our prospect lists. In just 3 weeks, our deliverability was fully fixed and we booked 34 qualified customer demos in month one.",
    author: "Marcus Vance",
    role: "VP of Global Sales",
    company: "CloudScale Systems",
    companyCategory: "B2B Software",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    impactMetric: "34 New Demos",
    metricLabel: "Booked in Month 1",
    verifiedTag: "Fixed Inbox Reputation",
    rating: 5,
    highlightedResult: "Spam issue solved • $380K Pipeline added"
  },
  {
    id: "testimonial-2",
    quote: "We used to waste 15+ hours every week manually hunting for leads on LinkedIn. MacQueen built an automated system that finds verified decision-makers and checks every email before sending. Our positive reply rate jumped to 18.2% and we finally got our time back to focus on closing deals.",
    author: "Elena Rostova",
    role: "Co-Founder & CEO",
    company: "Lattice AI",
    companyCategory: "AI Tech Startup",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    impactMetric: "18.2% Reply Rate",
    metricLabel: "Executive Response Rate",
    verifiedTag: "Automated Lead Sourcing",
    rating: 5,
    highlightedResult: "Saved 60+ team hours/month • 0% Email Bounces"
  },
  {
    id: "testimonial-3",
    quote: "Most agencies just send generic cold email blasts that don't work. MacQueen built a real system: protected mailboxes, verified prospect lists, and instant Slack notifications the moment an executive replies. We generated $1.2M in qualified pipeline in under 60 days.",
    author: "David Chen",
    role: "Head of Revenue Operations",
    company: "Apex Logistics Tech",
    companyCategory: "Logistics SaaS",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    impactMetric: "$1.2M Pipeline",
    metricLabel: "Added in 60 Days",
    verifiedTag: "System & CRM Integration",
    rating: 5,
    highlightedResult: "Automatic CRM routing • 62 Enterprise accounts engaged"
  },
  {
    id: "testimonial-4",
    quote: "In high-end consulting, generic cold pitches ruin your credibility. MacQueen designed concise, thoughtful messages tailored directly to Fortune 1000 CTOs and VPs. We achieved a 22.4% reply rate and booked senior executive meetings faster than any other channel we tried.",
    author: "Sarah Jenkins",
    role: "Managing Director",
    company: "Horizon Advisory Partners",
    companyCategory: "Executive Consulting",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    impactMetric: "22.4% Reply Rate",
    metricLabel: "Executive Reply Rate",
    verifiedTag: "C-Level Outreach",
    rating: 5,
    highlightedResult: "Direct Fortune 1000 meetings • 62% Lower Acquisition Cost"
  }
];

export const FAQ_DATA: FaqItem[] = [
  {
    id: "faq-1",
    category: "process",
    question: "How quickly can we expect to see our first qualified meetings booked?",
    answer: "Most engagements begin generating qualified discovery conversations within 14 to 21 business days. The initial 10–14 days are dedicated to forensic ICP research, multi-source Clay waterfall data enrichment, secondary domain provisioning, and automated inbox warm-up to ensure sender reputations are pristine before live outreach begins."
  },
  {
    id: "faq-2",
    category: "deliverability",
    question: "Why do you set up secondary domains instead of sending from our primary corporate domain?",
    answer: "Sending high-volume cold outreach from your primary work domain risks landing in spam filters, which can break critical everyday communication with your current clients, investors, and team members. We configure 10 to 20 isolated secondary domains with strict SPF, DKIM, and DMARC authentication protocols, completely insulating your core corporate domain while maximizing deliverability."
  },
  {
    id: "faq-3",
    category: "data",
    question: "How do you guarantee near-zero bounce rates (<5%)?",
    answer: "We never rely on single static data vendor exports. We build multi-tiered waterfall verification pipelines using Clay, MillionVerifier, Debounce, and custom MX record scrapers. Every email address is tested against live mail exchanges and catch-all servers are segregated or verified via pattern validation, keeping client campaign bounce rates strictly below 3.5%."
  },
  {
    id: "faq-4",
    category: "process",
    question: "Do you write the outreach messaging or do we need to provide copy?",
    answer: "I handle the end-to-end messaging architecture. We craft concise, executive-level conversation starters tailored to specific buyer personas and recent trigger events (such as leadership hires, tech migrations, or funding rounds). Every draft is reviewed and approved by your team before going live to ensure it matches your brand voice."
  },
  {
    id: "faq-5",
    category: "crm",
    question: "How does the CRM and sales team handoff work?",
    answer: "All outreach activity is synchronized in real-time. Using custom Make.com and webhook workflows, every interested prospect response is categorized by sentiment, logged in your CRM (HubSpot, Salesforce, Pipedrive), and pushed instantly into your private Slack or Microsoft Teams channel with full lead context."
  },
  {
    id: "faq-6",
    category: "general",
    question: "What software licenses or tools do we need to purchase?",
    answer: "We keep tooling costs predictable. We guide you through purchasing secondary domain registrations ($10–$12/year each) and Google Workspace or Microsoft 365 seats. We utilize industry-standard sending platforms (Instantly, Smartlead) and Clay workflows that can either run within your existing accounts or be provisioned under our managed infrastructure."
  },
  {
    id: "faq-7",
    category: "deliverability",
    question: "What daily email volume do you recommend per sending inbox?",
    answer: "To ensure long-term mailbox longevity and maintain 98%+ primary inbox placement, we cap cold sending volume at 30 to 40 emails per inbox per day (including automated warm-up). Scale is achieved horizontally across multiple isolated inboxes and domains, never by dangerously blasting hundreds of messages from a single address."
  },
  {
    id: "faq-8",
    category: "general",
    question: "How is this different from hiring an internal SDR or a traditional lead generation agency?",
    answer: "Traditional agencies often blast generic templates from unverified lists, burning your market and generating junk replies. Internal SDRs cost $80K–$120K+ before factoring in software stacks, management overhead, and 3+ months ramp time. I provide a complete, engineered outbound system with dedicated deliverability infrastructure, custom data waterfalls, and automated CRM routing in weeks, not quarters."
  }
];
