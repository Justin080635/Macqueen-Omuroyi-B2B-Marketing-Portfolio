import React from 'react';
import { motion } from 'motion/react';
import { PROBLEM_DATA } from '../../data/portfolioData';
import { AlertTriangle, DatabaseZap, Unplug, MessageSquareOff, ArrowDown } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const headlineWords = PROBLEM_DATA.headline.split(' ');

  const icons = [
    <AlertTriangle className="w-5 h-5 text-amber-400" />,
    <DatabaseZap className="w-5 h-5 text-rose-400" />,
    <Unplug className="w-5 h-5 text-blue-400" />,
    <MessageSquareOff className="w-5 h-5 text-violet-400" />
  ];

  return (
    <section
      id="problem"
      className="relative py-28 sm:py-36 lg:py-44 border-y border-slate-800/80 bg-[#07090e]/90 overflow-hidden"
    >
      {/* Ambient center spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Diagnostic Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-mono text-slate-400 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span>THE OUTBOUND REALITY CHECK</span>
        </motion.div>

        {/* Big Differentiator Headline — Word by Word deliberate scroll reveal */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.18] mb-8 max-w-4xl mx-auto">
          {headlineWords.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1]
              }}
              className={`inline-block mr-[0.3em] ${
                word.toLowerCase().includes('more') || word.toLowerCase().includes('messages.')
                  ? 'text-blue-400 underline decoration-blue-500/30 decoration-wavy underline-offset-8'
                  : 'text-slate-100'
              }`}
            >
              {word}
            </motion.span>
          ))}
        </h2>

        {/* Lead subhead with slow fade */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-16 leading-relaxed font-normal"
        >
          {PROBLEM_DATA.lead}
        </motion.p>

        {/* Diagnostic breakdown cards: 4 Structural Breakpoints */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-left">
          {PROBLEM_DATA.breakdowns.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.7,
                delay: 0.6 + idx * 0.12,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="group p-5 sm:p-6 rounded-xl bg-slate-950/70 border border-slate-800/90 hover:border-blue-500/40 transition-all duration-300 shadow-lg hover:shadow-[0_8px_30px_rgba(59,130,246,0.12)] flex gap-4"
            >
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 h-fit shrink-0 group-hover:scale-105 transition-transform">
                {icons[idx]}
              </div>
              <div>
                <h3 className="text-base font-semibold text-white mb-1.5 group-hover:text-blue-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Downward transition anchor */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-14 flex items-center justify-center gap-2 text-xs font-mono text-slate-400"
        >
          <span>HOW WE FIX THE SYSTEM</span>
          <ArrowDown className="w-3.5 h-3.5 text-blue-400 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
};
