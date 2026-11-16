import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { RESULTS_DATA } from '../../data/portfolioData';
import { ResultStat } from '../../types';
import { Award, ShieldCheck, Flame, BarChart3, TrendingUp, Sparkles } from 'lucide-react';

interface AnimatedCounterProps {
  stat: ResultStat;
  isInView: boolean;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ stat, isInView }) => {
  const [displayValue, setDisplayValue] = useState<number | string>(
    stat.displayOverride ? 0 : 0
  );

  useEffect(() => {
    if (!isInView) return;

    if (stat.displayOverride) {
      // For display overrides like "87% → <5%" or "6-7 Figure", ease in nicely
      const timer = setTimeout(() => {
        setDisplayValue(stat.displayOverride!);
      }, 400);
      return () => clearTimeout(timer);
    }

    const duration = 1800; // ms
    const startTime = performance.now();
    const target = stat.value;

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Eased curve: fast start, slow settle (cubic bezier approx 1 - Math.pow(1 - progress, 3))
      const easeProgress = 1 - Math.pow(1 - progress, 3.5);
      const currentCount = Math.floor(easeProgress * target);

      setDisplayValue(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setDisplayValue(target);
      }
    };

    const animId = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animId);
  }, [isInView, stat]);

  if (stat.displayOverride) {
    return (
      <span className="tabular-nums font-mono">
        {displayValue === 0 ? '0%' : stat.displayOverride}
      </span>
    );
  }

  return (
    <span className="tabular-nums font-mono">
      {stat.prefix || ''}
      {displayValue}
      {stat.suffix || ''}
    </span>
  );
};

export const ResultsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  const statIcons = [
    <Award className="w-5 h-5 text-blue-400" />,
    <TrendingUp className="w-5 h-5 text-indigo-400" />,
    <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    <Flame className="w-5 h-5 text-amber-400" />,
    <BarChart3 className="w-5 h-5 text-cyan-400" />,
    <Sparkles className="w-5 h-5 text-blue-300" />
  ];

  return (
    <section id="results" className="relative py-32 sm:py-44 bg-[#05070c] border-t border-slate-800/90 overflow-hidden">
      {/* Grand center glow: Biggest visual moment */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-blue-600/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-indigo-600/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={containerRef}>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-800/60 text-blue-300 text-xs font-mono mb-4 shadow-[0_0_20px_rgba(59,130,246,0.2)]"
          >
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
            <span>05 // VERIFIED TRACK RECORD & OUTCOMES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-5"
          >
            Engineered Numbers. Zero Fluff.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto"
          >
            Outbound performance is binary: the email lands in the primary inbox or it doesn't. Prospects respond or they don't. Here is what we deliver.
          </motion.p>
        </div>

        {/* 6 Stat Blocks with Scale-In and Counter Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {RESULTS_DATA.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="relative p-7 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0e1424] to-[#080c16] border border-blue-900/40 hover:border-blue-500/60 shadow-2xl hover:shadow-[0_12px_45px_rgba(37,99,235,0.2)] transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Top Row with icon & badge */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {statIcons[index]}
                  </div>
                  <span className="text-[11px] font-mono text-blue-300 bg-blue-950/80 px-2.5 py-1 rounded-md border border-blue-800/50">
                    {stat.changeRate}
                  </span>
                </div>

                {/* Big Visual Metric Number */}
                <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-blue-200 group-hover:to-blue-400 transition-colors">
                  <AnimatedCounter stat={stat} isInView={isInView} />
                </div>

                <h3 className="text-base font-semibold text-slate-200 mb-2">
                  {stat.label}
                </h3>
              </div>

              {/* Subtext description */}
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-4 border-t border-slate-800/80">
                {stat.subtext}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Small Required Disclaimer Below */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center text-xs text-slate-400 max-w-xl mx-auto italic font-mono"
        >
          * Results vary by client, market, offer, targeting, and campaign conditions.
        </motion.div>
      </div>
    </section>
  );
};
