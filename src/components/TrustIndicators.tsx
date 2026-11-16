import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

interface BrandBadge {
  name: string;
  category: string;
  symbol: React.ReactNode;
}

export const TrustIndicators: React.FC = () => {
  // Clear, simplified category names that any founder or sales executive immediately understands
  const brandLogos: BrandBadge[] = [
    {
      name: "Clay",
      category: "Lead Research & Data",
      symbol: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
        </svg>
      )
    },
    {
      name: "Smartlead",
      category: "Email Campaigns",
      symbol: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      )
    },
    {
      name: "Instantly",
      category: "Cold Outreach",
      symbol: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      )
    },
    {
      name: "HubSpot",
      category: "CRM Integration",
      symbol: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3v6" />
          <path d="M12 15v6" />
          <path d="M21 12h-6" />
          <path d="M9 12H3" />
          <circle cx="12" cy="3" r="1.5" />
          <circle cx="21" cy="12" r="1.5" />
        </svg>
      )
    },
    {
      name: "Apollo.io",
      category: "B2B Contact Database",
      symbol: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        </svg>
      )
    },
    {
      name: "Google Workspace",
      category: "Business Email",
      symbol: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      )
    },
    {
      name: "Microsoft 365",
      category: "Outlook & Office Mail",
      symbol: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="8" height="8" />
          <rect x="13" y="3" width="8" height="8" />
          <rect x="3" y="13" width="8" height="8" />
          <rect x="13" y="13" width="8" height="8" />
        </svg>
      )
    },
    {
      name: "Salesforce",
      category: "Salesforce CRM",
      symbol: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>
      )
    },
    {
      name: "Make.com",
      category: "Workflow Automation",
      symbol: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6" cy="6" r="3" />
          <circle cx="18" cy="18" r="3" />
          <circle cx="18" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <line x1="6" y1="9" x2="6" y2="15" />
          <line x1="18" y1="9" x2="18" y2="15" />
          <line x1="9" y1="6" x2="15" y2="6" />
          <line x1="9" y1="18" x2="15" y2="18" />
        </svg>
      )
    },
    {
      name: "Airtable",
      category: "Custom Lead Tracker",
      symbol: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      )
    },
    {
      name: "HeyReach",
      category: "LinkedIn Outreach",
      symbol: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )
    },
    {
      name: "Slack",
      category: "Instant Lead Alerts",
      symbol: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z" />
          <path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
          <path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z" />
          <path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z" />
        </svg>
      )
    }
  ];

  // Duplicate for seamless infinite loop marquee
  const marqueeItems = [...brandLogos, ...brandLogos];

  return (
    <div className="relative w-full bg-[#06080e]/95 border-y border-slate-800/70 py-5 sm:py-6 overflow-hidden z-20">
      {/* Top subtle border highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-blue-500/25 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          
          {/* Eyebrow badge in plain, clear English */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] sm:text-xs tracking-wider uppercase text-slate-300 font-semibold font-mono">
              COMPATIBLE WITH YOUR EXISTING SALES STACK
            </span>
          </div>

          {/* Clean Credibility Guarantees */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[11px] font-mono text-slate-400">
            <div className="inline-flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              <span>50+ Outbound Systems Built</span>
            </div>
            <span className="text-slate-700 hidden xs:inline">•</span>
            <div className="inline-flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Inbox Deliverability Standards</span>
            </div>
            <span className="text-slate-700 hidden md:inline">•</span>
            <div className="inline-flex items-center gap-1.5 text-slate-300 hidden md:flex">
              <Lock className="w-3.5 h-3.5 text-indigo-400" />
              <span>Zero Risk to Primary Domain</span>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Track Container with Gentle Side Fade Masks */}
      <div className="relative w-full overflow-hidden">
        {/* Left Gradient Fade Mask */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-r from-[#06080e] via-[#06080e]/90 to-transparent z-10 pointer-events-none" />

        {/* Right Gradient Fade Mask */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-l from-[#06080e] via-[#06080e]/90 to-transparent z-10 pointer-events-none" />

        {/* Animated Marquee Strip */}
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 38
          }}
          className="flex items-center gap-3.5 sm:gap-4 w-max py-1 hover:[animation-play-state:paused]"
        >
          {marqueeItems.map((brand, idx) => (
            <div
              key={`${brand.name}-${idx}`}
              className="group flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-xl bg-[#0a0e1a]/70 border border-slate-800/70 hover:border-blue-500/40 hover:bg-[#0f1424] transition-all duration-200 cursor-default shrink-0 select-none"
            >
              {/* Minimal Monochrome Brand Icon with soft hover tint */}
              <div className="w-7 h-7 rounded-lg bg-slate-900/90 border border-slate-800/80 flex items-center justify-center text-slate-400 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-colors duration-200 shrink-0">
                {brand.symbol}
              </div>

              {/* Brand Name & Simplified Role Description */}
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white transition-colors duration-200 whitespace-nowrap">
                  {brand.name}
                </span>
                <span className="text-slate-600 text-xs font-mono">•</span>
                <span className="text-[11px] text-slate-400 group-hover:text-slate-300 transition-colors duration-200 whitespace-nowrap font-normal">
                  {brand.category}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
