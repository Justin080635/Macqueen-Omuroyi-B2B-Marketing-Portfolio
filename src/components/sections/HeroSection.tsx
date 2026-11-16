import React from 'react';
import { motion } from 'motion/react';
import { HERO_DATA } from '../../data/portfolioData';
import { MagneticButton } from '../MagneticButton';
import { HeroNetworkBackground } from '../HeroNetworkBackground';
import { ArrowRight, Calendar, CheckCircle2, TrendingUp, ShieldAlert, DollarSign } from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: (mode?: 'strategy' | 'work') => void;
  heroPhotoUrl?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking, heroPhotoUrl }) => {
  // Fallback to default asset if not provided
  const activeHeroPhoto = heroPhotoUrl || '/src/assets/images/macqueen_hero_1787794359584.jpg';
  // Animation timing
  const headlineWords1 = HERO_DATA.headlineLine1.split(' ');
  const headlineWords2 = HERO_DATA.headlineLine2.split(' ');

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] lg:min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center overflow-hidden"
    >
      {/* Live Video & Network Background */}
      <HeroNetworkBackground />

      {/* Background glow in hero */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy, CTAs, Tags (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center z-10">
            {/* Positioning Pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/60 border border-blue-800/50 text-blue-300 text-xs font-mono mb-6 w-fit shadow-[0_0_15px_rgba(59,130,246,0.15)]"
            >
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>B2B OUTBOUND & REVENUE SYSTEMS</span>
            </motion.div>

            {/* Headline Line-by-Line / Word-by-Word Reveal */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="block text-slate-100"
                >
                  {HERO_DATA.headlineLine1}
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-indigo-300"
                >
                  {HERO_DATA.headlineLine2}
                </motion.span>
              </div>
            </h1>

            {/* Subhead with Fade-In */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
              className="text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed mb-8"
            >
              {HERO_DATA.subhead}
            </motion.p>

            {/* Interactive CTAs with Magnetic Effect & Micro-Interactions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <MagneticButton
                id="hero-cta-work"
                variant="primary"
                onClick={() => onOpenBooking('work')}
                icon={<ArrowRight className="w-4 h-4" />}
                className="px-8 py-3.5 text-base font-semibold"
              >
                Work With Me
              </MagneticButton>

              <MagneticButton
                id="hero-cta-strategy"
                variant="secondary"
                onClick={() => onOpenBooking('strategy')}
                icon={<Calendar className="w-4 h-4 text-blue-400" />}
                className="px-7 py-3.5 text-base"
              >
                Book a Strategy Call
              </MagneticButton>
            </motion.div>

            {/* Tag Row: Slow Staggered Fade-In */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="pt-6 border-t border-slate-800/80"
            >
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                Core Specializations & Capabilities
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {HERO_DATA.tags.map((tag, idx) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 1.1 + idx * 0.08,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900/80 border border-slate-800 text-xs font-medium text-slate-300 hover:border-blue-500/40 hover:text-blue-200 transition-colors"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-500" />
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Full-Body Photo Composition & Depth Layering (5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center pt-8 lg:pt-0">
            {/* Background Data Matrix behind photo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* Back Grid Lines (behind photo) */}
              <svg className="w-full h-[520px] max-w-[480px] opacity-35" viewBox="0 0 400 500">
                <defs>
                  <linearGradient id="gridGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                <pattern id="heroGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#heroGrid)" />
                <path d="M 50 100 L 200 250 L 350 180" fill="none" stroke="url(#gridGrad)" strokeWidth="1.5" strokeDasharray="4 6" />
                <circle cx="200" cy="250" r="4" fill="#60a5fa" />
                <circle cx="350" cy="180" r="3" fill="#3b82f6" />
              </svg>
            </div>

              {/* Photo Container with soft landing & radial floor shadow */}
              <div className="relative w-full max-w-[340px] sm:max-w-[390px] md:max-w-[420px] mx-auto">
                {/* Radial Ground Glow / Shadow beneath feet */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[340px] h-[70px] bg-gradient-to-t from-blue-600/25 via-blue-900/40 to-transparent rounded-[100%] blur-[24px] pointer-events-none" />
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[260px] h-[30px] bg-black/80 rounded-[100%] blur-[12px] pointer-events-none" />

                {/* Main Photo Cutout */}
                <motion.div
                  initial={{ opacity: 0, y: 35, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 1.1,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.75
                  }}
                  className="relative rounded-2xl overflow-hidden border border-slate-800/90 bg-gradient-to-b from-slate-900/60 via-[#0a0f1d]/90 to-[#07090e] shadow-[0_20px_50px_rgba(0,0,0,0.6)] z-10"
                >
                  {/* Tech Frame Header - Completely Unobstructed */}
                  <div className="px-3.5 sm:px-4 py-2.5 bg-slate-950/95 border-b border-slate-800/90 flex items-center justify-between relative z-20">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shrink-0" />
                      <span className="text-[10px] sm:text-[11px] font-mono text-slate-200 font-semibold tracking-wider">
                        MACQUEEN OMORUYI // SPECIALIST
                      </span>
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700/50 font-bold shrink-0">
                      ONLINE
                    </span>
                  </div>

                  {/* Portrait Image */}
                  <div className="relative aspect-[3/4] w-full flex items-end justify-center bg-[#0a0d16]">
                    <img
                      src={activeHeroPhoto}
                      alt="MacQueen Omoruyi — B2B Growth & Outbound Specialist in tailored suit with clasped hands"
                      className="w-full h-full object-cover object-top filter contrast-[1.04]"
                      referrerPolicy="no-referrer"
                    />

                    {/* Inner ambient bottom gradient to ground the portrait */}
                    <div className="absolute inset-x-0 bottom-0 h-24 sm:h-28 bg-gradient-to-t from-[#07090e] via-[#07090e]/70 to-transparent pointer-events-none" />
                  </div>

                  {/* Sub-label under portrait - Completely Unobstructed */}
                  <div className="px-3.5 sm:px-4 py-2.5 sm:py-3 bg-slate-950/95 border-t border-slate-800/90 flex items-center justify-between text-[11px] sm:text-xs font-mono relative z-20">
                    <span className="text-slate-300 font-medium">OUTBOUND ARCHITECTURE</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>100% OPERATIONAL</span>
                    </span>
                  </div>
                </motion.div>

                {/* Foreground Depth Grid Lines */}
                <svg className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] pointer-events-none z-20 opacity-25 hidden sm:block" viewBox="0 0 440 540">
                  <line x1="20" y1="380" x2="420" y2="340" stroke="#60a5fa" strokeWidth="1" strokeDasharray="8 6" />
                  <circle cx="380" cy="345" r="3" fill="#60a5fa" />
                </svg>

                {/* DESKTOP & TABLET FLOATING STAT CARDS (Positioned safely on flanks, well below top bar and well above bottom bar) */}
                
                {/* Floating Stat Card 1: 50+ Clients (Upper Left Flank - Below Header) */}
                <motion.div
                  initial={{ opacity: 0, x: -20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
                  className="hidden sm:block absolute top-16 sm:top-20 -left-6 md:-left-10 lg:-left-12 z-30 pointer-events-auto"
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="bg-[#0e1424]/95 backdrop-blur-md border border-blue-500/35 rounded-xl p-2.5 sm:p-3 shadow-xl shadow-black/50 flex items-center gap-2.5 sm:gap-3 hover:border-blue-400/60 transition-colors"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-600/20 border border-blue-400/40 flex items-center justify-center text-blue-400 shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-slate-400">TRACK RECORD</div>
                      <div className="text-xs sm:text-sm font-bold text-white tracking-tight whitespace-nowrap">50+ B2B Clients</div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Floating Stat Card 2: < 5% Bounce Rate (Mid Right Flank) */}
                <motion.div
                  initial={{ opacity: 0, x: 20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
                  className="hidden sm:block absolute top-48 sm:top-52 -right-6 md:-right-10 lg:-right-12 z-30 pointer-events-auto"
                >
                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    className="bg-[#0e1424]/95 backdrop-blur-md border border-emerald-500/35 rounded-xl p-2.5 sm:p-3 shadow-xl shadow-black/50 flex items-center gap-2.5 sm:gap-3 hover:border-emerald-400/60 transition-colors"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-600/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shrink-0">
                      <ShieldAlert className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-slate-400">INBOX HEALTH</div>
                      <div className="text-xs sm:text-sm font-bold text-emerald-300 tracking-tight whitespace-nowrap">&lt;5% Bounce SLA</div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Floating Stat Card 3: $6M+ Revenue (Lower Left Flank - Above Bottom Bar) */}
                <motion.div
                  initial={{ opacity: 0, x: -20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
                  className="hidden sm:block absolute bottom-16 sm:bottom-20 -left-6 md:-left-8 lg:-left-10 z-30 pointer-events-auto whitespace-nowrap"
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    className="bg-[#0e1424]/95 backdrop-blur-md border border-blue-400/40 rounded-xl p-2.5 sm:p-3 shadow-2xl shadow-blue-950/60 flex items-center gap-2.5 sm:gap-3 hover:border-blue-300/60 transition-colors"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-600/20 border border-blue-400/40 flex items-center justify-center text-blue-300 shrink-0">
                      <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-slate-400 uppercase">Revenue Impact</div>
                      <div className="text-xs sm:text-sm font-bold text-white">$6M+ Pipeline Created</div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* MOBILE DEDICATED STAT CARDS (Clean grid below the portrait, ensuring 100% visibility of all photo titles with zero obstruction) */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="sm:hidden mt-3.5 grid grid-cols-3 gap-2 w-full"
                >
                  <div className="bg-[#0e1424]/90 border border-blue-500/30 rounded-xl p-2 text-center shadow-md">
                    <div className="text-[9px] font-mono text-slate-400 truncate">CLIENTS</div>
                    <div className="text-xs font-bold text-white mt-0.5">50+</div>
                  </div>
                  <div className="bg-[#0e1424]/90 border border-emerald-500/30 rounded-xl p-2 text-center shadow-md">
                    <div className="text-[9px] font-mono text-slate-400 truncate">BOUNCE</div>
                    <div className="text-xs font-bold text-emerald-300 mt-0.5">&lt;5% SLA</div>
                  </div>
                  <div className="bg-[#0e1424]/90 border border-blue-400/40 rounded-xl p-2 text-center shadow-md">
                    <div className="text-[9px] font-mono text-slate-400 truncate">PIPELINE</div>
                    <div className="text-xs font-bold text-blue-300 mt-0.5">$6M+</div>
                  </div>
                </motion.div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};
