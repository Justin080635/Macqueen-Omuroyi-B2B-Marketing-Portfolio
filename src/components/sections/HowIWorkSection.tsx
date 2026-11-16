import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { PROCESS_STEPS } from '../../data/portfolioData';
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
  ArrowRight,
  Sparkles,
  GitBranch,
  FileCheck
} from 'lucide-react';

interface HowIWorkSectionProps {
  onOpenHowIWorkPage?: () => void;
}

export const HowIWorkSection: React.FC<HowIWorkSectionProps> = ({
  onOpenHowIWorkPage
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Bind scroll progress directly to the lifecycle section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 75%']
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

  const phaseGlowColors = [
    'from-blue-500/30 to-transparent',
    'from-cyan-500/30 to-transparent',
    'from-indigo-500/30 to-transparent',
    'from-blue-400/30 to-transparent',
    'from-emerald-500/30 to-transparent'
  ];

  return (
    <section
      id="how-i-work"
      ref={containerRef}
      className="relative py-24 sm:py-32 bg-[#080b12] border-t border-slate-800/80 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-blue-600/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[400px] bg-indigo-600/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16 lg:mb-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-800/50 text-blue-300 text-xs font-mono mb-4 shadow-sm"
            >
              <GitBranch className="w-3.5 h-3.5 text-blue-400" />
              <span>07 // SYSTEM METHODOLOGY</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4"
            >
              How I Work: The 5-Stage Lifecycle
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal"
            >
              A disciplined, step-by-step roadmap that transforms ad-hoc cold outreach into a reliable, automated pipeline engine.
            </motion.p>
          </div>

          {/* Interesting & Compelling Top CTA Button */}
          {onOpenHowIWorkPage && (
            <motion.button
              id="header-explore-process-cta"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={onOpenHowIWorkPage}
              className="group px-5 sm:px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600/20 via-cyan-600/25 to-blue-600/20 hover:from-blue-600/35 hover:to-cyan-600/35 border border-blue-500/50 hover:border-cyan-400 text-white transition-all text-xs sm:text-sm font-semibold flex items-center justify-center gap-2.5 cursor-pointer shrink-0 shadow-lg shadow-blue-950/40 hover:shadow-cyan-900/60 active:scale-[0.98] self-start lg:self-end"
            >
              <Sparkles className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
              <span>Explore Detailed Execution Blueprint</span>
              <ArrowRight className="w-4 h-4 text-cyan-300 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          )}
        </div>

        {/* Alternating Staggered Roadmap (Optimized for Mobile Density) */}
        <div className="relative">
          {/* Central Connecting Spine for Desktop (lg+) */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-8 bottom-16 w-0.5 bg-slate-800/80 z-0">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-blue-500 via-cyan-400 to-indigo-500 shadow-[0_0_15px_rgba(59,130,246,0.9)]"
            />
          </div>

          {/* Mobile & Tablet Slim Left Rail Line */}
          <div className="lg:hidden absolute left-3.5 sm:left-6 top-6 bottom-10 w-0.5 bg-slate-800/80 z-0">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-blue-500 via-cyan-400 to-indigo-500 shadow-[0_0_10px_rgba(59,130,246,0.9)]"
            />
          </div>

          {/* Process Step Cards - Dense on Mobile to show at least 2 cards in one scroll */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-24">
            {PROCESS_STEPS.map((step, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={step.number}
                  id={`process-step-${step.number}`}
                  className="relative grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-center"
                >
                  {/* Mobile Milestone Node on Left Rail */}
                  <div className="lg:hidden absolute left-3.5 sm:left-6 -translate-x-1/2 top-4 z-10">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#070a14] border border-blue-500/60 flex items-center justify-center text-[10px] font-mono font-bold text-blue-300 shadow-md">
                      0{idx + 1}
                    </div>
                  </div>

                  {/* Desktop Center Node Milestone (lg+) */}
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

                  {/* Left Column (Desktop cols 1-5, mobile when isEven) */}
                  <div className={`lg:col-span-5 ${isEven ? 'pl-8 sm:pl-12 lg:pl-0' : 'hidden lg:block'}`}>
                    {isEven ? (
                      <motion.div
                        initial={{ opacity: 0, x: -25 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="relative group"
                      >
                        <div className="relative p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-[#0c101d]/90 border border-slate-800/90 group-hover:border-blue-500/40 transition-all duration-300 shadow-lg shadow-black/40 text-left overflow-hidden">
                          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${phaseGlowColors[idx]} blur-2xl opacity-40`} />

                          {/* Top Tag & Timeframe Row */}
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2 sm:mb-3">
                            <span className="text-[10px] sm:text-xs font-mono px-2.5 py-0.5 sm:py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 font-bold">
                              STAGE {step.number}
                            </span>
                            {step.timeframe && (
                              <span className="text-[10px] sm:text-xs font-mono text-cyan-400 flex items-center gap-1 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
                                <Clock className="w-3 h-3" />
                                {step.timeframe}
                              </span>
                            )}
                          </div>

                          <h3 className="text-base sm:text-xl lg:text-2xl font-bold text-white tracking-tight mb-0.5 sm:mb-1">
                            {step.title}
                          </h3>
                          <div className="text-[11px] sm:text-xs font-mono text-blue-400 mb-2 sm:mb-3">{step.tagline}</div>

                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mb-3 sm:mb-5">
                            {step.description}
                          </p>

                          {/* Deliverables: Compact on mobile, expanded on desktop */}
                          <div className="pt-2.5 sm:pt-3 border-t border-slate-800/80 space-y-1.5 sm:space-y-2">
                            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                              STAGE DELIVERABLES:
                            </div>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1 sm:gap-1.5 text-xs text-slate-300">
                              {step.deliverables.slice(0, 3).map((item, dIdx) => (
                                <li key={dIdx} className="flex items-start gap-1.5 truncate sm:whitespace-normal">
                                  <Check className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                                  <span className="truncate">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {step.keyOutcome && (
                            <div className="mt-3 sm:mt-4 p-2 sm:p-2.5 rounded-xl bg-blue-950/30 border border-blue-800/40 text-[10px] sm:text-[11px] font-mono text-blue-200">
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

                  {/* Right Column (Desktop cols 8-12, mobile when !isEven) */}
                  <div className={`lg:col-span-5 ${!isEven ? 'pl-8 sm:pl-12 lg:pl-0' : 'hidden lg:block'}`}>
                    {!isEven ? (
                      <motion.div
                        initial={{ opacity: 0, x: 25 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="relative group"
                      >
                        <div className="relative p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-[#0c101d]/90 border border-slate-800/90 group-hover:border-cyan-500/40 transition-all duration-300 shadow-lg shadow-black/40 text-left overflow-hidden">
                          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${phaseGlowColors[idx]} blur-2xl opacity-40`} />

                          {/* Top Tag & Timeframe Row */}
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2 sm:mb-3">
                            <span className="text-[10px] sm:text-xs font-mono px-2.5 py-0.5 sm:py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 font-bold">
                              STAGE {step.number}
                            </span>
                            {step.timeframe && (
                              <span className="text-[10px] sm:text-xs font-mono text-cyan-400 flex items-center gap-1 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
                                <Clock className="w-3 h-3" />
                                {step.timeframe}
                              </span>
                            )}
                          </div>

                          <h3 className="text-base sm:text-xl lg:text-2xl font-bold text-white tracking-tight mb-0.5 sm:mb-1">
                            {step.title}
                          </h3>
                          <div className="text-[11px] sm:text-xs font-mono text-cyan-400 mb-2 sm:mb-3">{step.tagline}</div>

                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mb-3 sm:mb-5">
                            {step.description}
                          </p>

                          {/* Deliverables: Compact on mobile, expanded on desktop */}
                          <div className="pt-2.5 sm:pt-3 border-t border-slate-800/80 space-y-1.5 sm:space-y-2">
                            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                              STAGE DELIVERABLES:
                            </div>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1 sm:gap-1.5 text-xs text-slate-300">
                              {step.deliverables.slice(0, 3).map((item, dIdx) => (
                                <li key={dIdx} className="flex items-start gap-1.5 truncate sm:whitespace-normal">
                                  <Check className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                                  <span className="truncate">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {step.keyOutcome && (
                            <div className="mt-3 sm:mt-4 p-2 sm:p-2.5 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-[10px] sm:text-[11px] font-mono text-cyan-200">
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

        {/* Bottom Attractive Conversion Card / Execution Blueprint CTA */}
        {onOpenHowIWorkPage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0c1122] via-[#0f172e] to-[#0a0e1c] border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left shadow-xl"
          >
            <div className="space-y-1.5 max-w-xl">
              <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center justify-center md:justify-start gap-2">
                <FileCheck className="w-3.5 h-3.5" />
                <span>Complete Implementation Roadmap</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Want to see the exact sprint schedule & technical checklists?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Explore day-by-day deployment phases, deliverability SLAs, and automated CRM handoff architecture.
              </p>
            </div>

            <button
              id="bottom-explore-process-cta"
              onClick={onOpenHowIWorkPage}
              className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-cyan-900/40 hover:shadow-cyan-700/60 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 group shrink-0"
            >
              <span>Explore The Full Execution Blueprint</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};
