import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { STACK_DATA } from '../../data/portfolioData';
import { ToolLogo } from '../ToolLogo';
import { 
  Database, 
  ShieldCheck, 
  Send, 
  Workflow, 
  ArrowRight, 
  ChevronLeft,
  ChevronRight,
  Activity, 
  CheckCircle2, 
  Sparkles,
  Play,
  Pause,
  Layers,
  Zap,
  Gauge,
  Cpu
} from 'lucide-react';

interface DetailedTool {
  name: string;
  role: string;
  status: string;
  desc: string;
  features: string[];
  integratesWith: string[];
  deliverable: string;
  highlight?: boolean;
}

interface StageDetail {
  id: string;
  stageNum: string;
  title: string;
  subtitle: string;
  strategicGoal: string;
  slaMetric: string;
  slaLabel: string;
  dataIn: string;
  dataOut: string;
  tools: DetailedTool[];
}

const STAGE_DETAILS: Record<string, StageDetail> = {
  data: {
    id: 'data',
    stageNum: '01',
    title: 'Lead Intelligence & Data Research',
    subtitle: 'Sourcing, filtering, and enriching high-intent B2B accounts with zero contact decay.',
    strategicGoal: 'Pinpoint verified decision-makers exhibiting live buying signals (funding, hiring, new tech).',
    slaMetric: '< 2%',
    slaLabel: 'Max Decay Rate',
    dataIn: 'Target ICP Parameters & Criteria',
    dataOut: 'Enriched, Verified Decision-Maker Profiles',
    tools: [
      {
        name: 'Clay',
        role: 'Waterfall Data Enrichment & Logic',
        status: 'Primary Engine',
        highlight: true,
        desc: 'Combines 50+ data providers into sequenced waterfall enrichment logic with custom AI attribute scoring.',
        features: [
          'Multi-provider waterfall lookup (50+ sources)',
          'AI custom attribute & intent scoring',
          'Automated webhook sync to sending engines'
        ],
        integratesWith: ['Instantly.ai', 'HubSpot', 'Make.com'],
        deliverable: 'Verified ICP Contacts + AI Enrichment'
      },
      {
        name: 'Apollo.io',
        role: 'B2B Company & Contact Database',
        status: 'Verified Data',
        highlight: false,
        desc: 'High-volume B2B contact intelligence with deep firmographic, headcount, and hiring growth filters.',
        features: [
          '275M+ verified global B2B profiles',
          'Granular technology stack tracking',
          'Direct dial & validated corporate emails'
        ],
        integratesWith: ['Clay', 'Salesforce', 'CSV Exports'],
        deliverable: 'Raw Targeted ICP Account Lists'
      },
      {
        name: 'Airtable',
        role: 'Target Account & Prospect Hub',
        status: 'Data Hub',
        highlight: false,
        desc: 'Centralized relational database tracking target account tiers, deduplication, and lead lifecycle stages.',
        features: [
          'Custom relational account schemas',
          'Multi-source lead deduplication logic',
          'Real-time pipeline stage status triggers'
        ],
        integratesWith: ['Make.com', 'Zapier', 'HubSpot'],
        deliverable: 'Clean, Deduplicated Master Database'
      },
      {
        name: 'Ocean.io / Prospeo',
        role: 'Lookalike Search & SMTP Verification',
        status: 'Validation',
        highlight: false,
        desc: 'Precision lookalike modeling paired with real-time SMTP ping verification to eliminate bounce risk.',
        features: [
          'High-affinity ICP lookalike search algorithm',
          'Catch-all email server validation',
          'Zero-decay data hygiene protocols'
        ],
        integratesWith: ['Clay', 'Instantly', 'Smartlead'],
        deliverable: 'Bounce-Proof Validated Contacts'
      }
    ]
  },
  infra: {
    id: 'infra',
    stageNum: '02',
    title: 'Inbox Setup & Deliverability Guard',
    subtitle: 'Protecting your primary domain with authenticated, warmed secondary mailboxes.',
    strategicGoal: 'Ensure 100% compliance with Google/Yahoo sender mandates and maintain 98%+ primary inbox placement.',
    slaMetric: '99.2%',
    slaLabel: 'Primary Inbox Rate',
    dataIn: 'Secondary Sending Domains',
    dataOut: 'Fully Warmed, Authenticated Inboxes',
    tools: [
      {
        name: 'SPF / DKIM / DMARC',
        role: 'Complete Email Security & Auth',
        status: 'Fully Verified',
        highlight: true,
        desc: 'Rigorous cryptographic DNS authentication setup ensuring 100% compliance with Google & Yahoo mandates.',
        features: [
          'Strict DMARC policy enforcement (p=quarantine)',
          'Custom Return-Path & DKIM 2048-bit keys',
          'BIMI alignment & MX record integrity'
        ],
        integratesWith: ['Cloudflare', 'Namecheap', 'AWS Route 53'],
        deliverable: '100% DNS Sender Authentication'
      },
      {
        name: 'Google Workspace',
        role: 'Dedicated Business Sending Mailboxes',
        status: 'Warmed Up',
        highlight: false,
        desc: 'Isolated secondary domain mailboxes configured with conservative daily volume caps to protect brand reputation.',
        features: [
          'Isolated secondary sending domains',
          'Conservative 30-40 emails/day cap per inbox',
          'Humanized sending interval patterns'
        ],
        integratesWith: ['Smartlead', 'Instantly', 'Admin Console'],
        deliverable: 'Safe, Isolated Sending Mailboxes'
      },
      {
        name: 'Microsoft 365',
        role: 'Enterprise Outlook Mailboxes',
        status: 'Warmed Up',
        highlight: false,
        desc: 'Enterprise Exchange mailboxes creating provider diversity to land consistently in corporate Microsoft inboxes.',
        features: [
          'Provider diversity distribution',
          'Enterprise tenant warming ramp',
          'Corporate spam filter bypass'
        ],
        integratesWith: ['Instantly', 'Smartlead', 'Exchange Admin'],
        deliverable: 'Enterprise-Ready Outlook Inboxes'
      },
      {
        name: 'DNS & Deliverability Watch',
        role: 'Real-Time Inbox Health Monitoring',
        status: 'Active Guard',
        highlight: false,
        desc: 'Automated daily monitoring auditing blacklist status, domain reputation, and spam score drift.',
        features: [
          '24/7 automated blacklist audits',
          'DNS drift & MX health alerts',
          'Instant sequence auto-pause switch'
        ],
        integratesWith: ['GlockApps', 'Mail-Tester', 'Slack'],
        deliverable: 'Continuous 99%+ Inbox Placement'
      }
    ]
  },
  outbound: {
    id: 'outbound',
    stageNum: '03',
    title: 'Outbound Senders & Orchestration',
    subtitle: 'Distributing email volume across inboxes and syncing every reply with your CRM.',
    strategicGoal: 'Scale outreach volume reliably without burning domains, managing multi-step personalized sequences.',
    slaMetric: '< 3%',
    slaLabel: 'Global Bounce Rate',
    dataIn: 'Enriched Leads + Personalized Copy',
    dataOut: 'Qualified Discovery Calls Booked',
    tools: [
      {
        name: 'Instantly.ai',
        role: 'Multi-Inbox Sending & Smart Rotation',
        status: 'Sender Hub',
        highlight: true,
        desc: 'Algorithmic email distribution rotating sends across dozens of authenticated mailboxes automatically.',
        features: [
          'Unlimited automated warmup pool',
          'Smart inbox rotation & pacing algorithms',
          'Custom tracking domain isolation'
        ],
        integratesWith: ['HubSpot', 'Make.com', 'Google Sheets'],
        deliverable: 'High-Volume Deliverable Outreach'
      },
      {
        name: 'Smartlead.io',
        role: 'Enterprise Sequence Orchestration',
        status: 'Sender Hub',
        highlight: true,
        desc: 'Scalable multi-channel outbound platform with intelligent ESP matching and centralized master inbox management.',
        features: [
          'ESP matching (Gmail-to-Gmail, Outlook-to-Outlook)',
          'Unified multi-account master inbox',
          'Dynamic contextual personalization variables'
        ],
        integratesWith: ['Clay', 'HubSpot', 'Zapier'],
        deliverable: 'Personalized Multi-Sequence Campaigns'
      },
      {
        name: 'LinkedIn (HeyReach)',
        role: 'Multi-Account Social Outreach',
        status: 'Social Channel',
        highlight: false,
        desc: 'Automated multi-sender LinkedIn sequences combining profile visits, connection invites, and InMail messages safely.',
        features: [
          'Multi-sender profile rotation',
          'Cloud-based safe rate limits',
          'Unified social conversation inbox'
        ],
        integratesWith: ['Sales Navigator', 'HubSpot', 'Clay'],
        deliverable: 'Omnichannel Social Conversations'
      },
      {
        name: 'HubSpot / Salesforce',
        role: 'Automatic CRM Sync & Pipeline Tracking',
        status: 'Direct Sync',
        highlight: false,
        desc: 'Two-way integration ensuring all outbound replies, booked discovery calls, and contact updates sync in real time.',
        features: [
          'Bi-directional field synchronization',
          'Automatic deal stage creation',
          'Full attribution & activity logging'
        ],
        integratesWith: ['Smartlead', 'Instantly', 'Calendly'],
        deliverable: 'Real-Time Sales Pipeline Visibility'
      }
    ]
  },
  automation: {
    id: 'automation',
    stageNum: '04',
    title: 'Automation, AI & Workflows',
    subtitle: 'Instant lead notifications, smart reply categorization, and hands-free handoffs.',
    strategicGoal: 'Cut sales rep reaction time under 5 minutes with automated reply triage and CRM lead routing.',
    slaMetric: '< 5 min',
    slaLabel: 'Lead Notification Speed',
    dataIn: 'Incoming Prospect Replies & Bookings',
    dataOut: 'Instant Slack Alert & CRM Deal Record',
    tools: [
      {
        name: 'Make.com',
        role: 'Automated Lead Routing & Webhooks',
        status: 'Workflow Engine',
        highlight: true,
        desc: 'Visual automation scenarios linking prospecting data, sending tools, CRM, and notification alerts seamlessly.',
        features: [
          'Multi-step webhook orchestration',
          'JSON payload transformations',
          'Automated error recovery & retry logic'
        ],
        integratesWith: ['Clay', 'Instantly', 'HubSpot', 'Slack'],
        deliverable: 'Zero-Latency End-to-End Automation'
      },
      {
        name: 'Zapier',
        role: 'App Connections & Instant Triggers',
        status: 'Live Connect',
        highlight: false,
        desc: 'Low-latency trigger workflows connecting calendar booking tools, meeting links, and instant rep assignment.',
        features: [
          'Real-time calendar meeting triggers',
          'Instant notification routing',
          'Multi-app event listening'
        ],
        integratesWith: ['Calendly', 'Cal.com', 'Slack', 'CRM'],
        deliverable: 'Instant Hand-Off for Booked Meetings'
      },
      {
        name: 'OpenAI / Claude AI',
        role: 'Smart Reply Analysis & Personalization',
        status: 'AI Assistant',
        highlight: false,
        desc: 'Intelligent response categorization identifying positive leads, objections, and meeting availability in seconds.',
        features: [
          'Sentiment & intent classification',
          'Contextual research summarizing',
          'Draft reply auto-generation'
        ],
        integratesWith: ['Make.com', 'Slack', 'Smartlead'],
        deliverable: 'Instant Lead Sentiment Triage'
      },
      {
        name: 'Slack / Teams Alerts',
        role: 'Instant Real-Time Hot Lead Notifications',
        status: 'Instant Ping',
        highlight: false,
        desc: 'High-priority alert cards dispatched to reps with prospect background details the instant an email reply lands.',
        features: [
          'Rich lead card notifications',
          'One-click CRM & LinkedIn access',
          'Mobile push notifications'
        ],
        integratesWith: ['Make.com', 'Zapier', 'HubSpot'],
        deliverable: '< 5-Minute Lead Response Velocity'
      }
    ]
  }
};

export const TheStackSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoScrollActive, setIsAutoScrollActive] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);
  const interactionTimerRef = useRef<NodeJS.Timeout | null>(null);

  const clusterIcons: Record<string, React.ReactNode> = {
    data: <Database className="w-5 h-5 text-blue-400" />,
    infra: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    outbound: <Send className="w-5 h-5 text-indigo-400" />,
    automation: <Workflow className="w-5 h-5 text-purple-400" />
  };

  const filterTabs = [
    { id: 'all', label: 'Complete Ecosystem' },
    { id: 'data', label: '1. Lead Intelligence', icon: <Database className="w-3.5 h-3.5" /> },
    { id: 'infra', label: '2. Inbox & Deliverability', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
    { id: 'outbound', label: '3. Outbound Engines', icon: <Send className="w-3.5 h-3.5" /> },
    { id: 'automation', label: '4. Automation & CRM', icon: <Workflow className="w-3.5 h-3.5" /> },
  ];

  // Calculate total items in current view for dots and scroll tracking
  const currentItemCount = activeFilter === 'all' 
    ? STACK_DATA.length 
    : (STAGE_DETAILS[activeFilter]?.tools.length + 1 || 1);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);

    const card = scrollContainerRef.current.querySelector('.stack-scroll-item');
    const cardWidth = card?.clientWidth || 360;
    const index = Math.round(scrollLeft / (cardWidth + 24));
    setActiveIndex(Math.min(Math.max(index, 0), currentItemCount - 1));
  };

  const pauseAutoScrollTemporarily = () => {
    setIsInteracting(true);
    if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);
    interactionTimerRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 5500);
  };

  // Automatic seamless scroll cycle
  useEffect(() => {
    if (!isAutoScrollActive || isHovered || isInteracting || currentItemCount <= 1) return;

    const interval = setInterval(() => {
      if (!scrollContainerRef.current) return;
      const container = scrollContainerRef.current;
      const { scrollLeft, scrollWidth, clientWidth } = container;

      // When reaching near end, smoothly rewind to index 0
      if (scrollLeft >= scrollWidth - clientWidth - 25) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        const card = container.querySelector('.stack-scroll-item');
        const cardWidth = card?.clientWidth || 360;
        container.scrollBy({ left: cardWidth + 24, behavior: 'smooth' });
      }
    }, 4200);

    return () => clearInterval(interval);
  }, [isAutoScrollActive, isHovered, isInteracting, activeFilter, currentItemCount]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
      if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);
    };
  }, [activeFilter, currentItemCount]);

  const handleScroll = (direction: 'left' | 'right') => {
    pauseAutoScrollTemporarily();
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const card = container.querySelector('.stack-scroll-item');
    const cardWidth = card?.clientWidth || 340;
    const scrollAmount = direction === 'left' ? -cardWidth - 24 : cardWidth + 24;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const scrollToIndex = (index: number) => {
    pauseAutoScrollTemporarily();
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cards = container.querySelectorAll('.stack-scroll-item');
    if (cards[index]) {
      const card = cards[index] as HTMLElement;
      container.scrollTo({ left: card.offsetLeft - container.offsetLeft, behavior: 'smooth' });
    }
  };

  const activeStage = activeFilter !== 'all' ? STAGE_DETAILS[activeFilter] : null;

  return (
    <section id="stack" className="relative py-28 sm:py-36 bg-[#080b12] border-t border-slate-800/80 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-blue-600/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-300 text-xs font-mono mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span>04 // TOOLS & ARCHITECTURE</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4"
            >
              Modern Tools. Built for Reliability.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-slate-300 leading-relaxed"
            >
              I configure and connect top-tier B2B sales technologies into a single seamless pipeline that runs reliably without breaking.
            </motion.p>
          </div>

          {/* Left/Right & Auto-Scroll Controls */}
          <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0">
            {/* Auto-scroll Toggle */}
            <button
              id="stack-autoplay-toggle-btn"
              onClick={() => setIsAutoScrollActive(!isAutoScrollActive)}
              className={`h-11 px-3.5 rounded-xl border flex items-center gap-2 text-xs font-mono transition-all cursor-pointer select-none ${
                isAutoScrollActive
                  ? 'bg-blue-950/60 border-blue-800/60 text-blue-300 hover:bg-blue-900/60 shadow-sm'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
              }`}
              title={isAutoScrollActive ? "Pause automatic scrolling" : "Enable automatic scrolling"}
            >
              {isAutoScrollActive ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <Pause className="w-3.5 h-3.5 text-blue-400" />
                  <span className="hidden sm:inline">Auto</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Play</span>
                </>
              )}
            </button>

            <button
              id="stack-prev-btn"
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                canScrollLeft
                  ? 'bg-slate-900 border-slate-700 text-white hover:bg-slate-800 hover:border-blue-500/50 shadow-md'
                  : 'bg-slate-950/40 border-slate-900 text-slate-600 cursor-not-allowed'
              }`}
              aria-label="Previous tools cluster"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              id="stack-next-btn"
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                canScrollRight
                  ? 'bg-slate-900 border-slate-700 text-white hover:bg-slate-800 hover:border-blue-500/50 shadow-md'
                  : 'bg-slate-950/40 border-slate-900 text-slate-600 cursor-not-allowed'
              }`}
              aria-label="Next tools cluster"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-wrap items-center gap-2 mb-8 p-1.5 bg-[#0b0f1c]/80 border border-slate-800/80 rounded-2xl w-fit backdrop-blur-md"
        >
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  pauseAutoScrollTemporarily();
                  setActiveFilter(tab.id);
                  if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                  }
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.35)] font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Pipeline Progression Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden lg:flex items-center justify-between mb-8 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs font-mono shadow-inner"
        >
          <div className="flex items-center gap-2 text-blue-400 font-semibold">
            <Activity className="w-4 h-4" />
            <span>HOW DATA FLOWS THROUGH YOUR PIPELINE</span>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <span className={`flex items-center gap-1.5 ${activeFilter === 'data' || activeFilter === 'all' ? 'text-blue-400 font-semibold' : 'text-slate-400'}`}>
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              1. Enrich Leads
            </span>
            <ArrowRight className="w-3 h-3 text-slate-600" />
            <span className={`flex items-center gap-1.5 ${activeFilter === 'infra' || activeFilter === 'all' ? 'text-emerald-400 font-semibold' : 'text-slate-400'}`}>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              2. Protect Inboxes
            </span>
            <ArrowRight className="w-3 h-3 text-slate-600" />
            <span className={`flex items-center gap-1.5 ${activeFilter === 'outbound' || activeFilter === 'all' ? 'text-indigo-400 font-semibold' : 'text-slate-400'}`}>
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              3. Send Outreach
            </span>
            <ArrowRight className="w-3 h-3 text-slate-600" />
            <span className={`flex items-center gap-1.5 ${activeFilter === 'automation' || activeFilter === 'all' ? 'text-purple-400 font-semibold' : 'text-slate-400'}`}>
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              4. Sync with CRM
            </span>
          </div>
        </motion.div>

        {/* Horizontally Scrollable Track in BOTH Views */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => {
            setIsHovered(false);
            pauseAutoScrollTemporarily();
          }}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* VIEW 1: COMPLETE ECOSYSTEM (All 4 Stage Clusters) */}
          {activeFilter === 'all' && (
            STACK_DATA.map((cluster, cIdx) => (
              <motion.div
                key={cluster.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.6,
                  delay: cIdx * 0.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="stack-scroll-item flex-none w-[320px] sm:w-[380px] md:w-[410px] snap-start relative p-6 sm:p-8 rounded-3xl bg-[#0a0d18]/95 border border-slate-800/90 hover:border-slate-700/90 transition-all duration-300 flex flex-col justify-between shadow-2xl select-none"
              >
                {/* Cluster Header */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-center shadow-inner">
                      {clusterIcons[cluster.id]}
                    </div>
                    <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-blue-950/70 text-blue-300 border border-blue-800/50 font-medium">
                      STAGE 0{STACK_DATA.findIndex(s => s.id === cluster.id) + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                    {cluster.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {cluster.desc}
                  </p>

                  {/* Clean, Un-Clustered Modern Tools List */}
                  <div className="divide-y divide-slate-800/60 pt-1">
                    {cluster.tools.map((tool) => {
                      return (
                        <div
                          key={tool.name}
                          onMouseEnter={() => setHoveredTool(tool.name)}
                          onMouseLeave={() => setHoveredTool(null)}
                          className="group relative py-3.5 px-3 -mx-3 rounded-2xl transition-all duration-200 hover:bg-slate-800/40 cursor-pointer"
                        >
                          <div className="flex items-center gap-3.5">
                            {/* Tool Premium Icon */}
                            <ToolLogo name={tool.name} size="md" className="shrink-0 transition-transform group-hover:scale-105" />

                            {/* Tool Name & Role */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <span className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors truncate">
                                  {tool.name}
                                </span>
                                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-400 group-hover:text-blue-200 transition-colors shrink-0">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/90 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                                  {tool.status}
                                </span>
                              </div>
                              <div className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors leading-snug truncate">
                                {tool.role}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Node Assurance */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="text-slate-400">PIPELINE READY</span>
                  <span className="text-emerald-400 flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Fully Verified
                  </span>
                </div>
              </motion.div>
            ))
          )}

          {/* VIEW 2: SPECIFIC CATEGORY DEEP-DIVE (e.g. Lead Intelligence, Deliverability, Outbound, Automation) */}
          {activeFilter !== 'all' && activeStage && (
            <>
              {/* Card 1: Stage Architecture Blueprint Card */}
              <motion.div
                key={`${activeStage.id}-blueprint`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="stack-scroll-item flex-none w-[320px] sm:w-[380px] md:w-[410px] snap-start relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0e1629] to-[#0a0d18] border border-blue-800/50 hover:border-blue-700/80 transition-all duration-300 flex flex-col justify-between shadow-2xl select-none"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-blue-950/80 border border-blue-800/60 flex items-center justify-center shadow-inner">
                      {clusterIcons[activeStage.id]}
                    </div>
                    <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-blue-900/60 text-blue-200 border border-blue-700/60 font-semibold">
                      STAGE {activeStage.stageNum} BLUEPRINT
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                    {activeStage.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    {activeStage.subtitle}
                  </p>

                  <div className="space-y-3.5 bg-slate-900/80 p-4 rounded-2xl border border-slate-800/80 text-xs">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                        <Zap className="w-3 h-3 text-blue-400" /> Strategic Objective
                      </div>
                      <div className="text-slate-200 font-medium leading-snug">
                        {activeStage.strategicGoal}
                      </div>
                    </div>

                    <div className="pt-2.5 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-slate-400 font-mono text-[11px]">SLA Target</span>
                      <span className="text-blue-300 font-mono font-bold bg-blue-950/80 px-2.5 py-0.5 rounded-lg border border-blue-800/50">
                        {activeStage.slaMetric} ({activeStage.slaLabel})
                      </span>
                    </div>

                    <div className="pt-2.5 border-t border-slate-800">
                      <div className="text-[10px] font-mono uppercase text-slate-400 mb-1">Data Flow</div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-300">
                        <span className="truncate">{activeStage.dataIn}</span>
                        <ArrowRight className="w-3 h-3 text-blue-400 shrink-0" />
                        <span className="text-blue-300 font-semibold truncate">{activeStage.dataOut}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 text-blue-300 font-medium">
                    <Layers className="w-3.5 h-3.5 text-blue-400" /> {activeStage.tools.length} Integrated Tools
                  </span>
                  <span className="text-emerald-400 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Certified Pipeline
                  </span>
                </div>
              </motion.div>

              {/* Cards 2..N: Dedicated Rich Tool Cards for this category */}
              {activeStage.tools.map((tool, tIdx) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.6,
                    delay: (tIdx + 1) * 0.08,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className={`stack-scroll-item flex-none w-[320px] sm:w-[380px] md:w-[410px] snap-start relative p-6 sm:p-8 rounded-3xl bg-[#0a0d18]/95 border transition-all duration-300 flex flex-col justify-between shadow-xl select-none ${
                    tool.highlight 
                      ? 'border-blue-800/70 hover:border-blue-500/80 bg-gradient-to-b from-[#0b1022] to-[#0a0d18]' 
                      : 'border-slate-800/90 hover:border-slate-700'
                  }`}
                >
                  <div>
                    {/* Tool Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <ToolLogo name={tool.name} size="lg" className="shrink-0" />
                        <div>
                          <h4 className="text-lg font-bold text-white tracking-tight">
                            {tool.name}
                          </h4>
                          <span className="text-xs text-blue-400 font-medium">
                            {tool.role}
                          </span>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-300 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/90 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                        {tool.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-5">
                      {tool.desc}
                    </p>

                    {/* Key Capabilities */}
                    <div className="space-y-2.5 mb-5">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                        Key Capabilities
                      </div>
                      {tool.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Integration Tags */}
                    <div className="pt-3.5 border-t border-slate-800/80">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                        Connected Endpoints
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {tool.integratesWith.map((endpoint) => (
                          <span
                            key={endpoint}
                            className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-slate-300"
                          >
                            {endpoint}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Deliverable Output */}
                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-400 truncate max-w-[210px]">
                      {tool.deliverable}
                    </span>
                    <span className="text-emerald-400 flex items-center gap-1.5 font-medium shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Active
                    </span>
                  </div>
                </motion.div>
              ))}
            </>
          )}
        </div>

        {/* Scroll Progress Dots & Status */}
        <div className="flex items-center justify-between mt-6 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            {Array.from({ length: currentItemCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === i ? 'w-8 bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]' : 'w-2 bg-slate-800 hover:bg-slate-700'
                }`}
                aria-label={`Go to item ${i + 1}`}
              />
            ))}
          </div>
          <div className="text-xs text-slate-400 flex items-center gap-2 bg-slate-900/70 px-3 py-1 rounded-full border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="hidden sm:inline">Auto-scrolling • Hover or swipe to pause and explore</span>
            <span className="sm:hidden">Auto-scrolling • Swipe to pause</span>
          </div>
        </div>
      </div>
    </section>
  );
};

