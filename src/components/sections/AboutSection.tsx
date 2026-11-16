import React from 'react';
import { motion } from 'motion/react';
import { Terminal, ShieldCheck, CheckCircle2, Code2, Network, Sparkles } from 'lucide-react';

interface AboutSectionProps {
  aboutPhotoUrl?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ aboutPhotoUrl }) => {
  const activeAboutPhoto = aboutPhotoUrl || '/src/assets/images/macqueen_about_1787794380968.jpg';

  return (
    <section id="about" className="relative py-28 sm:py-36 bg-[#07090e] border-t border-slate-800/80 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Secondary Portrait / Space for Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-[380px] rounded-2xl overflow-hidden border border-slate-800 bg-[#0b0e1a] shadow-2xl shadow-black/70">
              {/* Tech Header */}
              <div className="px-4 py-2.5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-xs font-mono text-slate-300">MACQUEEN // PROFILE</span>
                </div>
                <span className="text-[10px] font-mono text-blue-400">OUTBOUND ARCHITECT</span>
              </div>

              {/* Photo */}
              <div className="relative aspect-square w-full bg-slate-900 overflow-hidden">
                <img
                  src={activeAboutPhoto}
                  alt="MacQueen Omoruyi working at the intersection of growth, sales, and technology"
                  className="w-full h-full object-cover object-center filter contrast-[1.03]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-transparent to-transparent opacity-80" />
              </div>

              {/* Quick Spec Highlights */}
              <div className="p-4 bg-slate-950/90 border-t border-slate-800/80 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between text-slate-400">
                  <span>FOCUS</span>
                  <span className="text-slate-200">Outbound Systems & Deliverability</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>DOMAIN PROTECTION</span>
                  <span className="text-emerald-400 font-medium">100% Primary Domain Safe</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>INBOX HEALTH</span>
                  <span className="text-blue-400 font-medium">&lt; 5% Average Bounce Rate</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Personal Framing & Philosophy */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-300 text-xs font-mono mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span>08 // ABOUT MACQUEEN</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6"
            >
              At the Intersection of Growth, Sales, and Technology
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 text-base text-slate-300 leading-relaxed font-normal mb-8"
            >
              <p>
                I am not a generalist marketer running high-level brand campaigns. I specialize in building, fixing, and scaling outbound sales engines when inbox deliverability, contact data, or meeting volume are falling short.
              </p>
              <p>
                Modern B2B outbound requires clean technical execution. If your email authentication is misconfigured, if your lead lists contain unverified addresses, or if your messaging sounds generic, your outreach gets filtered before your prospect ever sees it.
              </p>
              <p>
                Over the past 5+ years, I have built verified data enrichment pipelines, recovered damaged sender reputations, and created multi-inbox outbound systems that have generated millions in qualified pipeline for over 50 B2B companies.
              </p>
            </motion.div>

            {/* Credibility Pillars */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-800"
            >
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <Code2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-white">Verified Data Quality</div>
                  <div className="text-xs text-slate-400">Strict zero tolerance for invalid contacts or spam traps.</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <Network className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-white">Reliable Outbound Systems</div>
                  <div className="text-xs text-slate-400">Predictable meeting generation that scales over time.</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
