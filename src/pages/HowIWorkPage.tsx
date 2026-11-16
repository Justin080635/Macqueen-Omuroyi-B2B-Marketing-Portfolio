import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { PROCESS_STEPS, APPROACH_PRINCIPLES } from '../data/portfolioData';
import { 
  Check, 
  Search, 
  Wrench, 
  Rocket, 
  RefreshCw, 
  Eye, 
  Clock, 
  Layers, 
  Target,
  ArrowLeft,
  ArrowUpRight,
  Server,
  Zap,
  Terminal,
  Crosshair,
  Cpu,
  CheckSquare,
  LineChart,
  X
} from 'lucide-react';

interface HowIWorkPageProps {
  onNavigateHome: () => void;
  onOpenBooking: (mode?: 'strategy' | 'work') => void;
}

export const HowIWorkPage: React.FC<HowIWorkPageProps> = ({
  onNavigateHome,
  onOpenBooking
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 65%', 'end 75%']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  const lineHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  const stepIcons = [
    <Eye className="w-5 h-5 text-blue-400" key="0" />,
    <Search className="w-5 h-5 text-cyan-400" key="1" />,
    <Wrench className="w-5 h-5 text-indigo-400" key="2" />,
    <Rocket className="w-5 h-5 text-blue-300" key="3" />,
    <RefreshCw className="w-5 h-5 text-emerald-400" key="4" />
  ];

  const principleIcons = [
    <Crosshair className="w-5 h-5 text-blue-400" key="p0" />,
    <Cpu className="w-5 h-5 text-cyan-400" key="p1" />,
    <CheckSquare className="w-5 h-5 text-indigo-400" key="p2" />,
    <LineChart className="w-5 h-5 text-emerald-400" key="p3" />
  ];

  const phaseGlowColors = [
    'from-blue-500/30 to-transparent',
    'from-cyan-500/30 to-transparent',
    'from-indigo-500/30 to-transparent',
    'from-blue-400/30 to-transparent',
    'from-emerald-500/30 to-transparent'
  ];

  const deliverablesMatrix = [
    {
      title: "Deliverability & DNS Authentication",
      desc: "Complete SPF, DKIM, DMARC, and custom return-path records configured across 10–20 isolated secondary domains.",
      icon: <Server className="w-5 h-5 text-blue-400" />
    },
    {
      title: "Multi-Source Clay Waterfalls",
      desc: "Custom waterfall enrichment pipelines pulling verified work emails, phone numbers, and real-time buying signals.",
      icon: <Cpu className="w-5 h-5 text-cyan-400" />
    },
    {
      title: "Multi-Inbox Rotational Senders",
      desc: "Automated mailbox warmup, volume throttles (max 35 emails/day/inbox), and rotation across Instantly & Smartlead.",
      icon: <Zap className="w-5 h-5 text-indigo-400" />
    },
    {
      title: "Make.com Real-Time CRM Webhooks",
      desc: "Instant lead synchronization into HubSpot or Salesforce, with AI sentiment tagging and private Slack hot-lead alerts.",
      icon: <Terminal className="w-5 h-5 text-emerald-400" />
    }
  ];

  return (
    <div className="relative min-h-screen pt-28 pb-20 bg-[#07090e] text-[#e2e8f0]">
      {/* Ambient background lighting */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none -z-10" />
      <div className="absolute top-[60%] right-10 w-[550px] h-[550px] bg-indigo-600/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Navigation Breadcrumb & Back Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800/80">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800/90 hover:border-slate-700 transition-all text-xs font-mono cursor-pointer shadow-sm group"
          >
            <ArrowLeft className="w-4 h-4 text-blue-400 group-hover:-translate-x-1 transition-transform" />
            <span>BACK TO MAIN PORTFOLIO</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="text-slate-500">HOME</span>
            <span className="text-slate-600">/</span>
            <span className="text-blue-400 font-semibold">METHODOLOGY & LIFECYCLE</span>
          </div>
        </div>

        {/* Page Hero Header */}
        <div className="max-w-4xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-800/50 text-blue-300 text-xs font-mono mb-4"
          >
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span>ENGINEERED OUTBOUND BLUEPRINT</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6"
          >
            How I Build, Protect, and Scale Your Outbound Revenue Engine
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-300 leading-relaxed font-normal"
          >
            A battle-tested engineering blueprint that takes you from broken domain reputation and stale databases to a high-converting, automated outbound engine that consistently books qualified executive discovery calls.
          </motion.p>
        </div>

        {/* Deliverables Overview Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
          {deliverablesMatrix.map((item, dIdx) => (
            <div
              key={dIdx}
              className="p-5 rounded-2xl bg-[#0b0e1a] border border-slate-800/90 shadow-lg shadow-black/30 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-3.5 shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-sm font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">{item.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-900 text-[10px] font-mono text-blue-400 flex items-center gap-1">
                <Check className="w-3 h-3" />
                <span>INCLUDED AS STANDARD</span>
              </div>
            </div>
          ))}
        </div>

        {/* The 4 Core Principles Architecture Section */}
        <div className="mb-28 pt-8 border-t border-slate-800/80">
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-300 text-xs font-mono mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span>THE 4 FOUNDATIONAL PRINCIPLES</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Core Principles of Outbound Engineering
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              How our infrastructure-first approach contrasts against broken conventional outbound playbooks to build resilient pipeline systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {APPROACH_PRINCIPLES.map((principle, idx) => (
              <motion.div
                key={principle.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-7 sm:p-8 rounded-2xl bg-[#0b0e1a]/95 border border-slate-800/90 hover:border-blue-500/40 transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center">
                      {principleIcons[idx]}
                    </div>
                    <span className="text-xs font-mono text-blue-400 font-bold">
                      PRINCIPLE {principle.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1">
                    {principle.title}
                  </h3>
                  <div className="text-xs font-mono text-slate-400 mb-4">
                    {principle.subtitle}
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {principle.description}
                  </p>
                </div>

                {/* Contrast Comparison Block */}
                <div className="pt-4 border-t border-slate-800/80 space-y-2.5">
                  <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-900/30 flex items-start gap-2.5 text-xs text-rose-300">
                    <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-rose-400">Conventional: </span>
                      {principle.contrast.conventional}
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-blue-950/30 border border-blue-800/40 flex items-start gap-2.5 text-xs text-blue-200">
                    <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-blue-300">System-Fixer: </span>
                      {principle.contrast.systemFixer}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scattered / Alternating Staggered Roadmap Section */}
        <div ref={containerRef} className="relative mb-24 pt-8 border-t border-slate-800/80">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-300 text-xs font-mono mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span>THE 5-STAGE LIFECYCLE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3 tracking-tight">
              Step-by-Step Implementation Timeline
            </h2>
            <p className="text-sm text-slate-400">
              Scroll down to follow the active pipeline illumination from Day 1 audit to ongoing growth sprints.
            </p>
          </div>

          {/* Central Connecting Spine for Desktop (lg+) */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-28 bottom-20 w-0.5 bg-slate-800/80 z-0">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-blue-500 via-cyan-400 to-indigo-500 shadow-[0_0_15px_rgba(59,130,246,0.9)]"
            />
          </div>

          {/* Mobile & Tablet Left Rail Line */}
          <div className="lg:hidden absolute left-5 sm:left-7 top-28 bottom-20 w-0.5 bg-slate-800/80 z-0">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-blue-500 via-cyan-400 to-indigo-500 shadow-[0_0_12px_rgba(59,130,246,0.9)]"
            />
          </div>

          {/* Process Step Cards */}
          <div className="space-y-14 sm:space-y-18 lg:space-y-24">
            {PROCESS_STEPS.map((step, idx) => {
              const isEven = idx % 2 === 0; // idx 0, 2, 4 are Left on desktop; idx 1, 3 are Right on desktop

              return (
                <div
                  key={step.number}
                  className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
                >
                  {/* Central Node Milestone for Desktop (lg+) */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center justify-center z-10">
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.5, delay: 0.15 }}
                      className="relative flex items-center justify-center"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-[#070a14] border-2 border-blue-500/60 shadow-[0_0_20px_rgba(59,130,246,0.3)] flex items-center justify-center transition-all hover:scale-110 hover:border-blue-400">
                        {stepIcons[idx]}
                      </div>
                      <span className="absolute -bottom-6 text-[10px] font-mono text-blue-300 font-bold tracking-wider">
                        0{idx + 1}
                      </span>
                    </motion.div>
                  </div>

                  {/* Left Column (Desktop cols 1-5, cols 1 on mobile when isEven) */}
                  <div className={`lg:col-span-5 ${isEven ? 'pl-12 sm:pl-16 lg:pl-0' : 'hidden lg:block'}`}>
                    {isEven ? (
                      <motion.div
                        initial={{ opacity: 0, x: -35 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="relative group"
                      >
                        <div className="relative p-6 sm:p-8 rounded-3xl bg-[#0c101d]/90 border border-slate-800/90 group-hover:border-blue-500/40 transition-all duration-300 shadow-xl shadow-black/40 text-left overflow-hidden">
                          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${phaseGlowColors[idx]} blur-2xl opacity-40`} />

                          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                            <span className="text-xs font-mono px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 font-bold">
                              STAGE {step.number}
                            </span>
                            {step.timeframe && (
                              <span className="text-xs font-mono text-cyan-400 flex items-center gap-1.5 bg-cyan-950/40 px-2.5 py-1 rounded-md border border-cyan-800/40">
                                <Clock className="w-3.5 h-3.5" />
                                {step.timeframe}
                              </span>
                            )}
                          </div>

                          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1">
                            {step.title}
                          </h3>
                          <div className="text-xs font-mono text-blue-400 mb-4">{step.tagline}</div>

                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mb-6">
                            {step.description}
                          </p>

                          <div className="pt-4 border-t border-slate-800/80 space-y-2.5">
                            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                              STAGE DELIVERABLES:
                            </div>
                            <ul className="space-y-1.5 text-xs text-slate-300">
                              {step.deliverables.map((item, dIdx) => (
                                <li key={dIdx} className="flex items-start gap-2">
                                  <Check className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {step.keyOutcome && (
                            <div className="mt-5 p-3 rounded-xl bg-blue-950/30 border border-blue-800/40 text-[11px] font-mono text-blue-200">
                              <span className="text-blue-400 font-bold">KEY OUTCOME: </span>
                              {step.keyOutcome}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ) : (
                      /* Milestone Info Anchor for Desktop (Stage 2 & 4 Left side) */
                      <div className="hidden lg:flex flex-col items-end pr-8">
                        <div className="text-right space-y-2">
                          <span className="text-xs font-mono text-cyan-400 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/40">
                            {step.timeframe}
                          </span>
                          <h4 className="text-lg font-bold text-slate-200">{step.tagline}</h4>
                          <p className="text-xs text-slate-400 max-w-xs">{step.keyOutcome}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Spacer Col (Desktop cols 6-7) */}
                  <div className="hidden lg:block lg:col-span-2" />

                  {/* Right Column (Desktop cols 8-12, cols 1 on mobile when !isEven) */}
                  <div className={`lg:col-span-5 ${!isEven ? 'pl-12 sm:pl-16 lg:pl-0' : 'hidden lg:block'}`}>
                    {!isEven ? (
                      <motion.div
                        initial={{ opacity: 0, x: 35 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="relative group"
                      >
                        <div className="relative p-6 sm:p-8 rounded-3xl bg-[#0c101d]/90 border border-slate-800/90 group-hover:border-cyan-500/40 transition-all duration-300 shadow-xl shadow-black/40 text-left overflow-hidden">
                          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${phaseGlowColors[idx]} blur-2xl opacity-40`} />

                          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                            <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 font-bold">
                              STAGE {step.number}
                            </span>
                            {step.timeframe && (
                              <span className="text-xs font-mono text-cyan-400 flex items-center gap-1.5 bg-cyan-950/40 px-2.5 py-1 rounded-md border border-cyan-800/40">
                                <Clock className="w-3.5 h-3.5" />
                                {step.timeframe}
                              </span>
                            )}
                          </div>

                          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1">
                            {step.title}
                          </h3>
                          <div className="text-xs font-mono text-cyan-400 mb-4">{step.tagline}</div>

                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mb-6">
                            {step.description}
                          </p>

                          <div className="pt-4 border-t border-slate-800/80 space-y-2.5">
                            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                              STAGE DELIVERABLES:
                            </div>
                            <ul className="space-y-1.5 text-xs text-slate-300">
                              {step.deliverables.map((item, dIdx) => (
                                <li key={dIdx} className="flex items-start gap-2">
                                  <Check className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {step.keyOutcome && (
                            <div className="mt-5 p-3 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-[11px] font-mono text-cyan-200">
                              <span className="text-cyan-400 font-bold">KEY OUTCOME: </span>
                              {step.keyOutcome}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ) : (
                      /* Milestone Info Anchor for Desktop (Stage 1, 3, 5 Right side) */
                      <div className="hidden lg:flex flex-col items-start pl-8">
                        <div className="text-left space-y-2">
                          <span className="text-xs font-mono text-blue-400 px-3 py-1 rounded-full bg-blue-950/40 border border-blue-800/40">
                            {step.timeframe}
                          </span>
                          <h4 className="text-lg font-bold text-slate-200">{step.tagline}</h4>
                          <p className="text-xs text-slate-400 max-w-xs">{step.keyOutcome}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-900/90 to-blue-950/40 border border-blue-500/30 text-center relative overflow-hidden">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
          
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Ready to Launch Your 5-Stage Outbound Engine?
          </h3>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base mb-8">
            Book an introductory strategy session with MacQueen. We'll map your ICP, inspect existing domain setups, and draft your custom sprint timeline.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenBooking('strategy')}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm border border-blue-400/50 shadow-xl shadow-blue-900/40 transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
            >
              <span>Book Strategy & Lifecycle Call</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={onNavigateHome}
              className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-all text-sm font-medium cursor-pointer"
            >
              Back to Home Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
