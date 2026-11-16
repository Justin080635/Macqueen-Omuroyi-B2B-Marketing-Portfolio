import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CASE_STUDIES_DATA, TESTIMONIALS_DATA } from '../data/portfolioData';
import { 
  FileText, 
  ArrowUpRight, 
  CheckCircle, 
  AlertOctagon, 
  Cpu, 
  TrendingUp, 
  ChevronDown, 
  Clock,
  ShieldCheck,
  ArrowLeft,
  Filter,
  Sparkles,
  Layers,
  BarChart3,
  Terminal
} from 'lucide-react';
import { TestimonialsScroll } from '../components/TestimonialsScroll';

interface CaseStudiesPageProps {
  onNavigateHome: () => void;
  onOpenBooking: (mode?: 'strategy' | 'work') => void;
}

export const CaseStudiesPage: React.FC<CaseStudiesPageProps> = ({
  onNavigateHome,
  onOpenBooking
}) => {
  const [expandedCase, setExpandedCase] = useState<string>(CASE_STUDIES_DATA[0].id);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const filterOptions = [
    { id: 'all', label: 'All Case Studies' },
    { id: 'deliverability', label: 'Deliverability & Recovery' },
    { id: 'executive', label: 'Executive Outbound' }
  ];

  const filteredStudies = activeFilter === 'all'
    ? CASE_STUDIES_DATA
    : activeFilter === 'deliverability'
    ? CASE_STUDIES_DATA.filter(s => s.id.includes('deliverability'))
    : CASE_STUDIES_DATA.filter(s => s.id.includes('referral'));

  return (
    <div className="relative min-h-screen pt-28 pb-20 bg-[#07090e] text-[#e2e8f0]">
      {/* Background Glows */}
      <div className="absolute top-20 left-1/3 w-[700px] h-[500px] bg-blue-600/10 rounded-full blur-[170px] pointer-events-none -z-10" />
      <div className="absolute top-[60%] right-10 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[150px] pointer-events-none -z-10" />

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
            <span className="text-blue-400 font-semibold">CASE STUDIES & ARCHITECTURE</span>
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
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <span>DEEP-DIVE TECHNICAL BREAKDOWNS</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6"
          >
            Proven Outbound Architecture & Recovery Turnarounds
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-300 leading-relaxed font-normal"
          >
            A forensic look into real B2B engagements — isolating root-cause technical breakdowns, rebuilding sender infrastructure, deploying custom Clay waterfall pipelines, and generating compounding revenue outcomes.
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
          {filterOptions.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer whitespace-nowrap min-h-[38px] ${
                activeFilter === f.id
                  ? 'bg-blue-600 text-white border border-blue-500 shadow-lg shadow-blue-900/30'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:bg-slate-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Detailed Case Studies */}
        <div className="space-y-10 mb-24">
          {filteredStudies.map((study, idx) => {
            const isExpanded = expandedCase === study.id;

            return (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? 'bg-[#0b0f1d] border-blue-500/60 shadow-[0_20px_60px_rgba(37,99,235,0.18)]'
                    : 'bg-[#090c15] border-slate-800/90 hover:border-slate-700'
                }`}
              >
                {/* Header Row / Clickable Accordion Bar */}
                <div
                  onClick={() => setExpandedCase(isExpanded ? '' : study.id)}
                  className="p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 cursor-pointer select-none"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xs font-mono px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300">
                        {study.tag}
                      </span>
                      <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {study.timeframe}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
                      {study.title}
                    </h2>
                  </div>

                  {/* Right side Key Metrics preview */}
                  <div className="flex items-center gap-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
                      {study.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="bg-slate-900/90 border border-slate-800 rounded-lg px-3.5 py-2">
                          <div className="text-[10px] font-mono text-slate-400">{m.label}</div>
                          <div className="text-sm sm:text-base font-bold text-blue-300">{m.value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="w-10 h-10 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0">
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-300 ${
                          isExpanded ? 'rotate-180 text-blue-400' : ''
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Expanded Detailed Breakdown */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="border-t border-slate-800/80 px-6 pb-8 pt-6 sm:px-8 bg-slate-950/40"
                    >
                      {/* Challenge Lead */}
                      <div className="mb-8">
                        <h3 className="text-xs font-mono uppercase text-amber-400 mb-2 flex items-center gap-2">
                          <AlertOctagon className="w-4 h-4" />
                          The Initial Challenge
                        </h3>
                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed bg-amber-950/10 border border-amber-900/30 rounded-xl p-4 sm:p-5">
                          {study.challenge}
                        </p>
                      </div>

                      {/* 2 Columns: Diagnosis vs Architecture */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
                        {/* Diagnosis */}
                        <div className="bg-red-950/10 border border-red-900/30 rounded-xl p-5 sm:p-6">
                          <h4 className="text-xs font-mono uppercase text-red-400 mb-4 flex items-center gap-2">
                            <AlertOctagon className="w-4 h-4" />
                            Forensic Diagnosis (What Broke)
                          </h4>
                          <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                            {study.diagnosis.map((item, dIdx) => (
                              <li key={dIdx} className="flex items-start gap-2.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* System Fix Architecture */}
                        <div className="bg-blue-950/15 border border-blue-800/40 rounded-xl p-5 sm:p-6">
                          <h4 className="text-xs font-mono uppercase text-blue-300 mb-4 flex items-center gap-2">
                            <Cpu className="w-4 h-4" />
                            Engineered System Architecture
                          </h4>
                          <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                            {study.architecture.map((item, aIdx) => (
                              <li key={aIdx} className="flex items-start gap-2.5">
                                <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Measurable Results Box */}
                      <div className="bg-gradient-to-r from-blue-950/30 to-emerald-950/20 border border-blue-800/40 rounded-xl p-5 sm:p-6 mb-6">
                        <h4 className="text-xs font-mono uppercase text-emerald-400 mb-4 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          Validated Outcome & ROI
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                          {study.metrics.map((m, mIdx) => (
                            <div key={mIdx} className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-lg">
                              <div className="text-xs text-slate-400">{m.label}</div>
                              <div className="text-lg font-bold text-white my-0.5">{m.value}</div>
                              <div className="text-[11px] text-slate-400">{m.detail}</div>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-300 italic">
                          "{study.resultSummary}"
                        </p>
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={() => onOpenBooking('strategy')}
                          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold border border-blue-400/40 shadow-md shadow-blue-900/30 transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>Build a Similar Outbound Engine</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Executive Testimonials Section on Sub-Page */}
        <div className="mb-20">
          <TestimonialsScroll />
        </div>

        {/* Bottom CTA Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-900/90 to-blue-950/40 border border-blue-500/30 text-center relative overflow-hidden">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
          
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Ready to Fix Your Deliverability & Scale Executive Meetings?
          </h3>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base mb-8">
            Book a 15-minute technical audit. We'll inspect your SPF/DKIM/DMARC records, review your ICP data waterfall, and outline a tailored outbound roadmap.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenBooking('strategy')}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm border border-blue-400/50 shadow-xl shadow-blue-900/40 transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
            >
              <span>Book Technical Strategy Call</span>
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
