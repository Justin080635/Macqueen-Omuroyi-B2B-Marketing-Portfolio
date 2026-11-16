import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQ_DATA } from '../../data/portfolioData';
import { 
  ChevronDown, 
  HelpCircle, 
  MessageSquare, 
  ShieldCheck, 
  Zap, 
  Mail, 
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Search,
  SlidersHorizontal
} from 'lucide-react';

interface FaqSectionProps {
  onOpenBooking?: (mode?: 'strategy' | 'work') => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenBooking }) => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Questions', count: FAQ_DATA.length },
    { id: 'process', label: 'Timeline & Speed', count: FAQ_DATA.filter(f => f.category === 'process').length },
    { id: 'deliverability', label: 'Spam & Deliverability', count: FAQ_DATA.filter(f => f.category === 'deliverability').length },
    { id: 'data', label: 'Lead Data & Lists', count: FAQ_DATA.filter(f => f.category === 'data').length },
    { id: 'crm', label: 'CRM & Integrations', count: FAQ_DATA.filter(f => f.category === 'crm').length },
    { id: 'general', label: 'Strategy & Pricing', count: FAQ_DATA.filter(f => f.category === 'general').length }
  ];

  // Category tags for easy at-a-glance scanning
  const categoryLabels: Record<string, { label: string; color: string }> = {
    process: { label: 'Timeline & Speed', color: 'text-blue-400 bg-blue-950/60 border-blue-800/50' },
    deliverability: { label: 'Spam & Deliverability', color: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/50' },
    data: { label: 'Lead Data Quality', color: 'text-cyan-400 bg-cyan-950/60 border-cyan-800/50' },
    crm: { label: 'CRM & Automation', color: 'text-indigo-400 bg-indigo-950/60 border-indigo-800/50' },
    general: { label: 'Strategic Approach', color: 'text-purple-400 bg-purple-950/60 border-purple-800/50' }
  };

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="relative py-24 sm:py-32 bg-[#07090e] border-t border-slate-800/80 overflow-hidden">
      {/* Background Ambient Lighting */}
      <div className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-800/50 text-blue-300 text-xs font-mono mb-4 shadow-sm"
          >
            <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
            <span>10 // FREQUENTLY ASKED QUESTIONS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4"
          >
            Clear Answers to Common Questions
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal"
          >
            Everything you need to know about timeline, inbox safety, qualified lead sourcing, and outbound architecture.
          </motion.p>
        </div>

        {/* Quick Search & Category Filter Navigation Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="space-y-4 mb-8 sm:mb-10"
        >
          {/* Mobile & Desktop Horizontal Pill Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-xs font-semibold px-3.5 sm:px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2 min-h-[40px] select-none ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40 border border-blue-400/80 scale-[1.02]'
                      : 'bg-[#0a0e1c]/90 text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-800/80'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-blue-900/80 text-blue-200' : 'bg-slate-900 text-slate-400'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Search input for instant question lookup */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. deliverability, pricing, CRM)..."
              className="w-full bg-[#0a0e1c]/90 border border-slate-800 focus:border-blue-500 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </motion.div>

        {/* High-Readability Accordion FAQ List */}
        <div className="space-y-3.5">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center bg-[#0a0e1c]/80 border border-slate-800 rounded-2xl">
              <p className="text-slate-400 text-sm">No questions found matching "{searchQuery}".</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="mt-3 text-xs text-blue-400 hover:underline font-semibold"
              >
                Reset filters to view all questions
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = openId === faq.id;
              const catConfig = categoryLabels[faq.category] || { label: 'General', color: 'text-blue-400 bg-blue-950/60 border-blue-800/50' };

              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-gradient-to-b from-[#0d1428] via-[#090d1c] to-[#070a14] border-blue-500/60 shadow-lg shadow-blue-950/30'
                      : 'bg-[#090d1a]/80 border-slate-800/80 hover:border-slate-700/90 hover:bg-[#0c1122]'
                  }`}
                >
                  {/* Clickable Question Header: High contrast, large touch area (min 48px), scannable category tag */}
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full text-left p-4 sm:p-5 md:p-6 flex items-start justify-between gap-3 sm:gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-3 sm:gap-4 min-w-0 pr-1">
                      {/* Step Number Badge */}
                      <span className={`text-[11px] sm:text-xs font-mono font-bold px-2 sm:px-2.5 py-1 rounded-lg border transition-colors shrink-0 mt-0.5 ${
                        isOpen
                          ? 'bg-blue-950 text-blue-300 border-blue-600/50'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      {/* Question Content & Category Tag */}
                      <div className="space-y-1.5 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md border ${catConfig.color}`}>
                            {catConfig.label}
                          </span>
                        </div>
                        <h3 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-tight leading-snug">
                          {faq.question}
                        </h3>
                      </div>
                    </div>

                    {/* Interactive Chevron Button Indicator */}
                    <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl border flex items-center justify-center transition-all duration-300 shrink-0 mt-0.5 ${
                      isOpen
                        ? 'bg-blue-600/25 border-blue-400/50 text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                        : 'bg-slate-900/90 border-slate-800 text-slate-400'
                    }`}>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-blue-400' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {/* Accordion Expanded Answer Body */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-4 pb-5 pt-1 sm:px-6 sm:pb-6 sm:pt-2 border-t border-slate-800/80 bg-slate-950/40">
                          <p className="text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed font-normal pl-0 sm:pl-10">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Bottom Helper / Direct Strategy Call CTA Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 sm:mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/40 via-slate-900/70 to-indigo-950/40 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-xl"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">Have a specific question about your outbound setup?</h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">Book a quick 15-minute diagnostic call to review your current domain health and sales pipeline goals.</p>
            </div>
          </div>

          <button
            onClick={() => onOpenBooking?.('strategy')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs sm:text-sm font-bold border border-blue-400/40 shadow-lg shadow-blue-900/40 transition-all cursor-pointer shrink-0 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 whitespace-nowrap"
          >
            <span>Ask MacQueen Directly</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
