import React from 'react';
import { motion } from 'motion/react';
import { MagneticButton } from '../MagneticButton';
import { ArrowRight, Calendar, Mail, Linkedin, Terminal, Shield, CheckCircle2 } from 'lucide-react';

interface CtaContactSectionProps {
  onOpenBooking: (mode?: 'strategy' | 'work') => void;
}

export const CtaContactSection: React.FC<CtaContactSectionProps> = ({ onOpenBooking }) => {
  return (
    <section
      id="contact"
      className="relative py-32 sm:py-40 bg-gradient-to-b from-[#07090e] via-[#0b101f] to-[#05070c] border-t border-slate-800/80 overflow-hidden"
    >
      {/* Large radial backdrop spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-blue-600/15 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-mono mb-6 shadow-lg shadow-blue-950/40"
        >
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span>11 // ENGAGEMENT & PIPELINE AUDIT</span>
        </motion.div>

        {/* Closing Statement */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.12] mb-6 max-w-4xl mx-auto"
        >
          Ready to Fix Your Outbound Infrastructure?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
        >
          Stop burning sender domains and wasting SDR hours on stale data. Let’s diagnose the bottlenecks and engineer a repeatable outbound revenue engine.
        </motion.p>

        {/* Two Interactive CTA Buttons with Magnetic Hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <MagneticButton
            id="cta-work-with-me"
            variant="primary"
            onClick={() => onOpenBooking('work')}
            icon={<ArrowRight className="w-4 h-4" />}
            className="px-9 py-4 text-base font-semibold shadow-[0_0_35px_rgba(37,99,235,0.45)]"
          >
            Work With Me
          </MagneticButton>

          <MagneticButton
            id="cta-book-strategy"
            variant="secondary"
            onClick={() => onOpenBooking('strategy')}
            icon={<Calendar className="w-4 h-4 text-blue-400" />}
            className="px-8 py-4 text-base"
          >
            Book a Strategy Call
          </MagneticButton>
        </motion.div>

        {/* Diagnostic Commitments / Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-8 border-t border-slate-800/80 text-xs font-mono text-slate-400"
        >
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Strict Sub-5% Bounce SLA</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Shield className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Isolated Secondary Domains</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Terminal className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>Automated CRM & Lead Sync</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
