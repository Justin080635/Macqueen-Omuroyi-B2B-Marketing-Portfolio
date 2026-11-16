import React from 'react';
import { motion } from 'motion/react';
import { APPROACH_PRINCIPLES } from '../../data/portfolioData';
import { Crosshair, Cpu, CheckSquare, LineChart, X, Check } from 'lucide-react';

export const ApproachSection: React.FC = () => {
  const principleIcons = [
    <Crosshair className="w-5 h-5 text-blue-400" />,
    <Cpu className="w-5 h-5 text-cyan-400" />,
    <CheckSquare className="w-5 h-5 text-indigo-400" />,
    <LineChart className="w-5 h-5 text-emerald-400" />
  ];

  return (
    <section id="approach" className="relative py-28 sm:py-36 bg-[#080b12] border-t border-slate-800/80 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 right-10 w-[600px] h-[300px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-300 text-xs font-mono mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span>09 // CORE PHILOSOPHY</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4"
          >
            The 4-Principle Architecture
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-slate-400 leading-relaxed"
          >
            How we contrast against broken conventional outbound playbooks to build resilient pipeline systems.
          </motion.p>
        </div>

        {/* 4-Principle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {APPROACH_PRINCIPLES.map((principle, idx) => (
            <motion.div
              key={principle.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.7,
                delay: idx * 0.12,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="p-7 sm:p-8 rounded-2xl bg-[#0b0e1a]/90 border border-slate-800/90 hover:border-blue-500/40 transition-all duration-300 shadow-xl flex flex-col justify-between"
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
    </section>
  );
};
