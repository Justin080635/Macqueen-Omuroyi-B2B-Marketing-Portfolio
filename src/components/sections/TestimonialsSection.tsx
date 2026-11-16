import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS_DATA } from '../../data/portfolioData';
import { TestimonialItem } from '../../types';
import { 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  TrendingUp, 
  Sparkles, 
  Star,
  MessageSquareQuote,
  ShieldCheck,
  Building2,
  Users,
  Play,
  Pause
} from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials?: TestimonialItem[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoScrollActive, setIsAutoScrollActive] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);
  const interactionTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Active items strictly capped at 5 visible
  const activeTestimonials = (testimonials || TESTIMONIALS_DATA)
    .filter((t) => t.isVisible !== false)
    .slice(0, 5);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);

    const cardWidth = scrollContainerRef.current.querySelector('.testimonial-card')?.clientWidth || 340;
    const index = Math.round(scrollLeft / (cardWidth + 24));
    setActiveIndex(Math.min(Math.max(index, 0), activeTestimonials.length - 1));
  };

  const pauseAutoScrollTemporarily = () => {
    setIsInteracting(true);
    if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);
    interactionTimerRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 5000);
  };

  // Automatic seamless scroll cycle
  useEffect(() => {
    if (!isAutoScrollActive || isHovered || isInteracting) return;

    const interval = setInterval(() => {
      if (!scrollContainerRef.current) return;
      const container = scrollContainerRef.current;
      const { scrollLeft, scrollWidth, clientWidth } = container;

      // When reaching near end, smoothly rewind to index 0
      if (scrollLeft >= scrollWidth - clientWidth - 25) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        const cardWidth = container.querySelector('.testimonial-card')?.clientWidth || 340;
        container.scrollBy({ left: cardWidth + 24, behavior: 'smooth' });
      }
    }, 3800);

    return () => clearInterval(interval);
  }, [isAutoScrollActive, isHovered, isInteracting]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
      if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);
    };
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    pauseAutoScrollTemporarily();
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = container.querySelector('.testimonial-card')?.clientWidth || 340;
    const scrollAmount = direction === 'left' ? -cardWidth - 24 : cardWidth + 24;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const scrollToIndex = (index: number) => {
    pauseAutoScrollTemporarily();
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cards = container.querySelectorAll('.testimonial-card');
    if (cards[index]) {
      const card = cards[index] as HTMLElement;
      container.scrollTo({ left: card.offsetLeft - container.offsetLeft, behavior: 'smooth' });
    }
  };

  // Metric pills for quick social proof highlights at the top
  const aggregateProofs = [
    { label: "Client Satisfaction", value: "100%", sub: "5.0 Rating across all engagements", icon: <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> },
    { label: "Average Reply Rate", value: "18% – 24%", sub: "Targeted executive outreach", icon: <TrendingUp className="w-4 h-4 text-emerald-400" /> },
    { label: "Email Deliverability", value: "98%+", sub: "Primary inbox placement", icon: <ShieldCheck className="w-4 h-4 text-blue-400" /> }
  ];

  return (
    <section id="testimonials" className="relative py-28 sm:py-36 bg-[#07090e] border-t border-slate-800/80 overflow-hidden">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-cyan-600/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-800/50 text-blue-300 text-xs font-mono mb-4 shadow-sm"
            >
              <MessageSquareQuote className="w-3.5 h-3.5 text-blue-400" />
              <span>09 // CLIENT SUCCESS STORIES</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4"
            >
              What Founders & Sales Leaders Say
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal"
            >
              Real stories from B2B companies who fixed their email spam issues, saved dozens of manual hours, and built predictable sales pipelines.
            </motion.p>
          </div>

          {/* Navigation & Autoplay Controls */}
          <div className="flex items-center gap-2.5 self-end lg:self-auto shrink-0">
            {/* Auto-scroll Toggle */}
            <button
              id="testimonial-autoplay-toggle-btn"
              onClick={() => setIsAutoScrollActive(!isAutoScrollActive)}
              className={`h-11 px-3.5 rounded-xl border flex items-center gap-2 text-xs font-mono transition-all cursor-pointer select-none ${
                isAutoScrollActive
                  ? 'bg-blue-950/60 border-blue-800/60 text-blue-300 hover:bg-blue-900/60 shadow-sm'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
              }`}
              title={isAutoScrollActive ? "Pause automatic scrolling" : "Enable automatic scrolling"}
            >
              {isAutoScrollActive ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <Pause className="w-3.5 h-3.5 text-blue-400" />
                  <span className="hidden sm:inline">Auto</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Play</span>
                </>
              )}
            </button>

            <button
              id="testimonial-section-prev-btn"
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                canScrollLeft
                  ? 'bg-slate-900/90 border-slate-700/90 text-white hover:bg-slate-800 hover:border-blue-500/60 shadow-lg active:scale-95'
                  : 'bg-slate-950/40 border-slate-900 text-slate-600 cursor-not-allowed'
              }`}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              id="testimonial-section-next-btn"
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                canScrollRight
                  ? 'bg-slate-900/90 border-slate-700/90 text-white hover:bg-slate-800 hover:border-blue-500/60 shadow-lg active:scale-95'
                  : 'bg-slate-950/40 border-slate-900 text-slate-600 cursor-not-allowed'
              }`}
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Aggregate Proof Quick Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {aggregateProofs.map((proof, pIdx) => (
            <div
              key={pIdx}
              className="p-4 rounded-xl bg-[#0b0f1d]/80 border border-slate-800/80 flex items-center gap-3.5 shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                {proof.icon}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg font-extrabold text-white">{proof.value}</span>
                  <span className="text-xs font-semibold text-slate-300 truncate">{proof.label}</span>
                </div>
                <div className="text-[11px] text-slate-400 truncate">{proof.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Horizontal Testimonials Carousel Cards */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => {
            setIsHovered(false);
            pauseAutoScrollTemporarily();
          }}
          className="flex gap-5 sm:gap-6 md:gap-7 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {activeTestimonials.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.6,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="testimonial-card flex-none w-[calc(100vw-2.5rem)] max-w-[500px] sm:w-[450px] md:w-[480px] lg:w-[520px] snap-center sm:snap-start rounded-3xl bg-gradient-to-b from-[#0e1324] via-[#090d1a] to-[#070a14] border border-slate-800/90 hover:border-blue-500/50 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-xl shadow-black/40 group hover:shadow-[0_15px_35px_rgba(37,99,235,0.18)] relative overflow-hidden"
            >
              {/* Subtle top card glow accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/40 via-cyan-400/40 to-indigo-500/40 opacity-70 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Top Row: Verified Result Chip, Category Tag & Star Rating */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-xs font-mono text-blue-300 font-semibold shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>{item.verifiedTag}</span>
                    </span>

                    {item.companyCategory && (
                      <span className="text-[11px] font-mono text-slate-300 bg-slate-900/90 border border-slate-800 px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-slate-400" />
                        <span>{item.companyCategory}</span>
                      </span>
                    )}
                  </div>

                  {/* 5 Filled Stars */}
                  <div className="flex items-center gap-1 text-amber-400 bg-amber-950/30 px-2.5 py-1 rounded-full border border-amber-900/40 shrink-0">
                    {[...Array(5)].map((_, sIdx) => (
                      <Star key={sIdx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Main Quote Text */}
                <div className="relative mb-6">
                  <Quote className="w-9 h-9 text-blue-500/15 absolute -top-4 -left-2 rotate-180 pointer-events-none" />
                  <p className="text-sm sm:text-base text-slate-100 leading-relaxed relative z-10 font-normal">
                    "{item.quote}"
                  </p>
                </div>

                {/* Key Result Highlight Box */}
                {item.highlightedResult && (
                  <div className="mb-6 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3 shadow-inner">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                      <span className="text-xs text-slate-200 truncate font-medium">{item.highlightedResult}</span>
                    </div>
                    <div className="text-emerald-400 font-mono text-xs font-bold flex items-center gap-1 shrink-0 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-900/40">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>{item.impactMetric}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Author & Company Profile Footer */}
              <div className="pt-5 border-t border-slate-800/90 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Photo Avatar */}
                  {item.avatarUrl ? (
                    <div className="relative shrink-0">
                      <img
                        src={item.avatarUrl}
                        alt={item.author}
                        className="w-12 h-12 rounded-2xl object-cover border-2 border-blue-500/40 shadow-md group-hover:border-blue-400 transition-colors"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-600 rounded-full border-2 border-[#090d1a] flex items-center justify-center text-[8px] text-white">
                        ✓
                      </span>
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-900/80 to-slate-900 border-2 border-blue-500/40 flex items-center justify-center font-bold text-sm text-blue-300 shadow-inner shrink-0">
                      {item.author
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                  )}

                  <div className="min-w-0">
                    <div className="text-sm sm:text-base font-bold text-white tracking-tight truncate flex items-center gap-1.5">
                      <span>{item.author}</span>
                    </div>
                    <div className="text-xs text-slate-400 font-normal truncate">
                      {item.role} • <span className="text-slate-200 font-medium">{item.company}</span>
                    </div>
                  </div>
                </div>

                {/* Stat Callout on the right */}
                <div className="hidden xs:flex flex-col items-end text-right shrink-0 bg-blue-950/40 px-3 py-1.5 rounded-xl border border-blue-900/40">
                  <div className="text-xs sm:text-sm font-mono font-bold text-blue-300">
                    {item.impactMetric}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    {item.metricLabel}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Navigation Dots & Helper Prompt */}
        <div className="flex items-center justify-between mt-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            {activeTestimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === i 
                    ? 'w-8 bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_0_10px_rgba(59,130,246,0.8)]' 
                    : 'w-2.5 bg-slate-800 hover:bg-slate-700'
                }`}
                aria-label={`Go to story ${i + 1}`}
              />
            ))}
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-2 bg-slate-900/70 px-3 py-1 rounded-full border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="hidden sm:inline">Auto-scrolling • Hover or swipe to pause and explore</span>
            <span className="sm:hidden">Auto-scrolling • Swipe to pause</span>
          </div>
        </div>
      </div>
    </section>
  );
};
