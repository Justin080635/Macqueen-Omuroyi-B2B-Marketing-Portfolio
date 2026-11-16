import React from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles, 
  Layers,
  ArrowUpRight,
  Database,
  MailCheck,
  Zap,
  Clock,
  ExternalLink,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

interface SelectedWorkSectionProps {
  onOpenCaseStudiesPage?: () => void;
  onOpenBooking?: (mode?: 'strategy' | 'work') => void;
}

export const SelectedWorkSection: React.FC<SelectedWorkSectionProps> = ({
  onOpenCaseStudiesPage,
  onOpenBooking
}) => {
  const caseTeasers = [
    {
      id: 'martech-recovery',
      tag: 'B2B MARTECH SAAS',
      timeframe: '60-DAY SPRINT',
      title: 'Spam Box Recovery & Outbound Pipeline Engine',
      summary: 'Recovered a burned sender domain from 12% inbox placement to 99.4%, generating $480K in qualified pipeline and 38 C-suite meetings in 60 days.',
      heroMetric: { value: '99.4%', label: 'Inbox Placement', sub: 'Up from 12% spam trap' },
      secondaryMetrics: [
        { label: 'Pipeline Generated', value: '+$480,000' },
        { label: 'C-Suite Demos', value: '38 Closed' }
      ],
      highlights: [
        'Complete DNS 2048-bit DKIM, SPF & DMARC alignment',
        '20 dedicated secondary mailboxes with smart rotation',
        'Multi-tiered ICP enrichment with verified work emails'
      ],
      categoryIcon: <MailCheck className="w-5 h-5 text-emerald-400" />
    },
    {
      id: 'fintech-referral',
      tag: 'FINTECH ENTERPRISE',
      timeframe: '90-DAY SPRINT',
      title: 'High-Touch Executive Outbound & Inbound Engine',
      summary: 'Engineered a multi-tier outbound architecture for enterprise finance leaders, achieving an extraordinary 31.4% positive response rate and $1.4M pipeline.',
      heroMetric: { value: '31.4%', label: 'Positive Reply Rate', sub: 'Industry avg: 1.8%' },
      secondaryMetrics: [
        { label: 'Pipeline Created', value: '+$1,420,000' },
        { label: 'Delivery Health', value: '99.8% Verified' }
      ],
      highlights: [
        'Trigger-based buying signals (funding & compliance)',
        'Contextual relevance copywriting for VP/CFO roles',
        'Automated CRM attribution & instant calendar booking'
      ],
      categoryIcon: <TrendingUp className="w-5 h-5 text-blue-400" />
    },
    {
      id: 'ai-recruiting',
      tag: 'AI TALENT PLATFORM',
      timeframe: '45-DAY SPRINT',
      title: 'Clay Waterfall Sourcing & Multichannel Sync',
      summary: 'Deployed an automated 50+ provider Clay enrichment waterfall with synchronized LinkedIn touchpoints, securing 45 enterprise demos in 45 days.',
      heroMetric: { value: '45', label: 'Enterprise Demos', sub: 'Booked in 45 days' },
      secondaryMetrics: [
        { label: 'Enrichment Depth', value: '3.8x Match Rate' },
        { label: 'Bounce Rate', value: '< 1.1% Valid' }
      ],
      highlights: [
        'Clay 50+ provider waterfall with AI intent scoring',
        'Synchronized multi-channel touchpoints (Email + LinkedIn)',
        'Zero-latency webhook alerts to sales reps in Slack'
      ],
      categoryIcon: <Database className="w-5 h-5 text-purple-400" />
    }
  ];

  return (
    <section id="work" className="relative py-24 sm:py-32 bg-[#07090e] border-t border-slate-800/80 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Direct Call to Action */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-800/50 text-blue-300 text-xs font-mono mb-4 shadow-sm"
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>06 // VERIFIED CASE STUDIES & ARCHITECTURE</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4"
            >
              Battle-Tested Turnarounds & Client Results
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal"
            >
              Every system is built on mathematical deliverability engineering and real revenue attribution. Dive into the complete technical audits, DNS rebuilds, and waterfall workflows.
            </motion.p>
          </div>

          {/* Top Header Direct Link Button */}
          {onOpenCaseStudiesPage && (
            <motion.button
              id="header-open-case-studies-cta"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={onOpenCaseStudiesPage}
              className="group px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm tracking-wide shadow-lg shadow-blue-900/40 hover:shadow-blue-700/60 transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-95 shrink-0 self-start lg:self-end"
            >
              <Sparkles className="w-4 h-4 text-blue-200 group-hover:rotate-12 transition-transform" />
              <span>Open Dedicated Case Studies Hub</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </motion.button>
          )}
        </div>

        {/* 3 High-Impact Case Study Teaser Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {caseTeasers.map((teaser, idx) => (
            <motion.div
              key={teaser.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: idx * 0.12,
                ease: [0.16, 1, 0.3, 1]
              }}
              onClick={onOpenCaseStudiesPage}
              className="group relative p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#090d19]/90 hover:bg-[#0d1427] border border-slate-800/90 hover:border-blue-500/60 transition-all duration-300 flex flex-col justify-between shadow-xl hover:shadow-[0_15px_40px_rgba(37,99,235,0.18)] cursor-pointer"
            >
              {/* Card Top Metadata */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300">
                      {teaser.tag}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {teaser.timeframe}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white tracking-tight mb-3 group-hover:text-blue-200 transition-colors">
                  {teaser.title}
                </h3>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                  {teaser.summary}
                </p>

                {/* Hero Turnaround Metric Block */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-[#0c142b] to-[#070b16] border border-blue-900/40 group-hover:border-blue-700/60 transition-colors mb-5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      {teaser.heroMetric.label}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-medium">
                      Verified
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-baseline gap-2">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-cyan-300">
                      {teaser.heroMetric.value}
                    </span>
                    <span className="text-xs font-mono font-normal text-slate-400">
                      ({teaser.heroMetric.sub})
                    </span>
                  </div>
                </div>

                {/* Secondary Metrics Grid */}
                <div className="grid grid-cols-2 gap-2.5 mb-5">
                  {teaser.secondaryMetrics.map((m, mIdx) => (
                    <div key={mIdx} className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800/80">
                      <div className="text-[10px] font-mono text-slate-400">{m.label}</div>
                      <div className="text-xs sm:text-sm font-bold text-blue-300 font-mono mt-0.5">{m.value}</div>
                    </div>
                  ))}
                </div>

                {/* Key System Highlights */}
                <div className="space-y-2 mb-6">
                  {teaser.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Action Button */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-semibold text-blue-400 group-hover:text-blue-300 flex items-center gap-1.5 transition-colors">
                  Inspect Technical Breakdown
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="w-8 h-8 rounded-lg bg-blue-950/60 border border-blue-800/60 flex items-center justify-center text-blue-300 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* The Mega Case Studies Command Center CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative p-8 sm:p-12 md:p-14 rounded-3xl bg-gradient-to-b from-[#0e162f] via-[#0a0f20] to-[#070914] border-2 border-blue-500/40 shadow-[0_20px_70px_rgba(37,99,235,0.25)] overflow-hidden"
        >
          {/* Ambient Lighting Accents */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
            
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/50 border border-blue-500/50 text-blue-200 text-xs font-mono font-semibold shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
              <span>DEDICATED CASE STUDY & ARCHITECTURE REPOSITORY</span>
            </div>

            {/* Main Headline */}
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Ready to Inspect the Full Step-by-Step Technical Architectures?
            </h3>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
              We have documented full diagnostic reports, DNS recovery logs, Clay waterfall schemas, and multi-channel sequence data in our dedicated case studies page.
            </p>

            {/* Key Deliverables Pill Grid */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2 pb-4">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-xs font-mono text-slate-200 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Forensic SPF/DKIM/DMARC Logs</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-xs font-mono text-slate-200 shadow-sm">
                <Database className="w-3.5 h-3.5 text-blue-400" />
                <span>50+ Provider Waterfall Logic</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-xs font-mono text-slate-200 shadow-sm">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Executive Copywriting Sequences</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-xs font-mono text-slate-200 shadow-sm">
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                <span>Full CRM & Webhook Workflows</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              {onOpenCaseStudiesPage && (
                <button
                  id="cta-open-full-case-studies-page-btn"
                  onClick={onOpenCaseStudiesPage}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm sm:text-base tracking-wide shadow-xl shadow-blue-900/60 hover:shadow-blue-700/80 transition-all flex items-center justify-center gap-3 cursor-pointer active:scale-95 group"
                >
                  <span>Explore All Case Studies & Results</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </button>
              )}

              {onOpenBooking && (
                <button
                  id="cta-book-audit-from-work-btn"
                  onClick={() => onOpenBooking('strategy')}
                  className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-200 hover:text-white font-semibold text-sm tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Book Technical Audit</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </button>
              )}
            </div>

            {/* Micro Guarantee Note */}
            <div className="text-[11px] font-mono text-slate-400 pt-2">
              <span>Includes complete client benchmarks • 100% verified ROI and delivery data</span>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
