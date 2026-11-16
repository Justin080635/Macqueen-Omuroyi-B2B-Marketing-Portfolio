import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TESTIMONIALS_DATA } from '../data/portfolioData';
import { 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  TrendingUp, 
  Sparkles, 
  Star
} from 'lucide-react';

export const TestimonialsScroll: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);

    const cardWidth = scrollContainerRef.current.querySelector('.testimonial-card')?.clientWidth || 320;
    const index = Math.round(scrollLeft / (cardWidth + 16));
    setActiveIndex(Math.min(Math.max(index, 0), TESTIMONIALS_DATA.length - 1));
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = container.querySelector('.testimonial-card')?.clientWidth || 320;
    const scrollAmount = direction === 'left' ? -cardWidth - 20 : cardWidth + 20;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cards = container.querySelectorAll('.testimonial-card');
    if (cards[index]) {
      const card = cards[index] as HTMLElement;
      container.scrollTo({ left: card.offsetLeft - container.offsetLeft, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative mt-20 sm:mt-24 pt-12 sm:pt-16 border-t border-slate-800/80">
      {/* Header bar with title and navigation controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 sm:mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-300 text-xs font-mono mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span>EXECUTIVE TESTIMONIALS</span>
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Verified Outcomes from B2B Leaders
          </h3>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Real feedback from VPs of Sales, Founders, and RevOps leaders who scaled their pipeline with engineered outbound systems.
          </p>
        </div>

        {/* Scroll Nav Buttons */}
        <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
          <button
            id="testimonial-prev-btn"
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
              canScrollLeft
                ? 'bg-slate-900 border-slate-700 text-white hover:bg-slate-800 hover:border-blue-500/50 shadow-md'
                : 'bg-slate-950/40 border-slate-900 text-slate-600 cursor-not-allowed'
            }`}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            id="testimonial-next-btn"
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
              canScrollRight
                ? 'bg-slate-900 border-slate-700 text-white hover:bg-slate-800 hover:border-blue-500/50 shadow-md'
                : 'bg-slate-950/40 border-slate-900 text-slate-600 cursor-not-allowed'
            }`}
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Track - Ultra responsive on mobile */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 sm:gap-6 md:gap-8 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {TESTIMONIALS_DATA.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.6,
              delay: idx * 0.08,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="testimonial-card flex-none w-[calc(100vw-2.5rem)] max-w-[500px] sm:w-[440px] md:w-[480px] lg:w-[520px] snap-center sm:snap-start rounded-2xl bg-gradient-to-b from-[#0c1020] to-[#070a14] border border-slate-800/90 hover:border-blue-500/50 p-5 sm:p-7 md:p-8 flex flex-col justify-between transition-all duration-300 shadow-2xl group hover:shadow-[0_10px_30px_rgba(37,99,235,0.15)]"
          >
            {/* Top Bar: Verification Badge, Star Rating, and Company Category */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4 sm:mb-6">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-[11px] sm:text-xs font-mono text-blue-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{item.verifiedTag}</span>
                  </div>
                  {item.companyCategory && (
                    <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 bg-slate-900/80 border border-slate-800 px-2 py-0.5 rounded-full">
                      {item.companyCategory}
                    </span>
                  )}
                </div>

                {/* 5 Star Rating */}
                <div className="flex items-center gap-0.5 sm:gap-1 text-amber-400 shrink-0">
                  {[...Array(5)].map((_, sIdx) => (
                    <Star key={sIdx} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              {/* Quote Content with comfortable typography */}
              <div className="relative mb-5 sm:mb-6">
                <Quote className="w-7 h-7 sm:w-8 sm:h-8 text-blue-500/15 absolute -top-3 -left-1 sm:-top-4 sm:-left-2 rotate-180 pointer-events-none" />
                <p className="text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed relative z-10 font-normal">
                  "{item.quote}"
                </p>
              </div>

              {/* Key Highlighted Result Callout */}
              {item.highlightedResult && (
                <div className="mb-5 sm:mb-6 p-3 sm:p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between text-xs font-mono gap-2">
                  <span className="text-slate-300 truncate text-[11px] sm:text-xs">{item.highlightedResult}</span>
                  <div className="text-emerald-400 font-bold flex items-center gap-1 shrink-0">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{item.impactMetric}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Author Profile Footer */}
            <div className="pt-4 sm:pt-5 border-t border-slate-800/90 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                {/* Executive Headshot Avatar */}
                {item.avatarUrl ? (
                  <img
                    src={item.avatarUrl}
                    alt={item.author}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover border border-blue-500/40 shadow-md shrink-0"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-900/60 to-slate-900 border border-blue-500/40 flex items-center justify-center font-bold text-xs sm:text-sm text-blue-300 shadow-inner shrink-0">
                    {item.author
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                )}

                <div className="min-w-0">
                  <div className="text-xs sm:text-sm md:text-base font-bold text-white tracking-tight truncate">
                    {item.author}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-400 font-normal truncate">
                    {item.role} • <span className="text-slate-300 font-medium">{item.company}</span>
                  </div>
                </div>
              </div>

              <div className="hidden xs:flex sm:flex flex-col items-end text-right shrink-0">
                <div className="text-xs sm:text-sm font-mono font-bold text-blue-300">
                  {item.impactMetric}
                </div>
                <div className="text-[9px] sm:text-[10px] font-mono text-slate-500">
                  {item.metricLabel}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Slide dots and subtle swipe guide */}
      <div className="flex items-center justify-between mt-5 sm:mt-6 text-xs font-mono text-slate-500">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {TESTIMONIALS_DATA.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === i ? 'w-6 sm:w-8 bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]' : 'w-2 bg-slate-800 hover:bg-slate-700'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
        <div className="text-[11px] sm:text-xs text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span className="hidden sm:inline">Drag or use arrows to view client testimonials</span>
          <span className="sm:hidden">Swipe to view testimonials</span>
        </div>
      </div>
    </div>
  );
};
