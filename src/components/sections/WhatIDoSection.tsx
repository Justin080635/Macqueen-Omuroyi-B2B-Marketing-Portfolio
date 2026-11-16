import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WHAT_I_DO_DATA } from '../../data/portfolioData';
import { 
  Compass, 
  Target, 
  Server, 
  TrendingUp, 
  Zap, 
  Cpu, 
  ChevronLeft,
  ChevronRight, 
  CheckCircle2, 
  Layers,
  Sparkles,
  MousePointerClick,
  Play,
  Pause
} from 'lucide-react';

export const WhatIDoSection: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoScrollActive, setIsAutoScrollActive] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);
  const interactionTimerRef = useRef<NodeJS.Timeout | null>(null);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);

    const cardWidth = scrollContainerRef.current.querySelector('.capability-card')?.clientWidth || 360;
    const index = Math.round(scrollLeft / (cardWidth + 24));
    setActiveIndex(Math.min(Math.max(index, 0), WHAT_I_DO_DATA.length - 1));
  };

  const pauseAutoScrollTemporarily = () => {
    setIsInteracting(true);
    if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);
    interactionTimerRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 5500);
  };

  // Automatic seamless scroll cycle
  useEffect(() => {
    if (!isAutoScrollActive || isHovered || isInteracting || expandedCard !== null) return;

    const interval = setInterval(() => {
      if (!scrollContainerRef.current) return;
      const container = scrollContainerRef.current;
      const { scrollLeft, scrollWidth, clientWidth } = container;

      // When reaching near end, smoothly rewind to index 0
      if (scrollLeft >= scrollWidth - clientWidth - 25) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        const cardWidth = container.querySelector('.capability-card')?.clientWidth || 360;
        container.scrollBy({ left: cardWidth + 24, behavior: 'smooth' });
      }
    }, 4200);

    return () => clearInterval(interval);
  }, [isAutoScrollActive, isHovered, isInteracting, expandedCard]);

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
    const cardWidth = container.querySelector('.capability-card')?.clientWidth || 360;
    const scrollAmount = direction === 'left' ? -cardWidth - 24 : cardWidth + 24;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const scrollToIndex = (index: number) => {
    pauseAutoScrollTemporarily();
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cards = container.querySelectorAll('.capability-card');
    if (cards[index]) {
      const card = cards[index] as HTMLElement;
      container.scrollTo({ left: card.offsetLeft - container.offsetLeft, behavior: 'smooth' });
    }
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'Target': return <Target className="w-5 h-5" />;
      case 'Server': return <Server className="w-5 h-5" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      default: return <Layers className="w-5 h-5" />;
    }
  };

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    pauseAutoScrollTemporarily();
    setExpandedCard(prev => (prev === id ? null : id));
  };

  return (
    <section id="what-i-do" className="relative py-28 sm:py-36 bg-[#07090e] overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-300 text-xs font-mono mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span>03 // CORE CAPABILITIES</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4"
            >
              Engineered Outbound Solutions
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-slate-400 leading-relaxed"
            >
              I architect resilient outbound systems that eliminate deliverability bottlenecks, pinpoint high-intent decision-makers, and scale repeatable pipeline.
            </motion.p>
          </div>

          {/* Navigation & Auto-scroll Controls */}
          <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0">
            {/* Auto-scroll Toggle */}
            <button
              id="capability-autoplay-toggle-btn"
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
              id="capability-prev-btn"
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                canScrollLeft
                  ? 'bg-slate-900 border-slate-700 text-white hover:bg-slate-800 hover:border-blue-500/50 shadow-md'
                  : 'bg-slate-950/40 border-slate-900 text-slate-600 cursor-not-allowed'
              }`}
              aria-label="Previous capability"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              id="capability-next-btn"
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                canScrollRight
                  ? 'bg-slate-900 border-slate-700 text-white hover:bg-slate-800 hover:border-blue-500/50 shadow-md'
                  : 'bg-slate-950/40 border-slate-900 text-slate-600 cursor-not-allowed'
              }`}
              aria-label="Next capability"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontally Scrollable Cards Track */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => {
            setIsHovered(false);
            pauseAutoScrollTemporarily();
          }}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {WHAT_I_DO_DATA.map((service, index) => {
            const isExpanded = expandedCard === service.id;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className={`capability-card flex-none w-[300px] sm:w-[360px] md:w-[390px] snap-start group relative rounded-2xl border p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between select-none ${
                  isExpanded
                    ? 'bg-[#0f1526] border-blue-500/80 shadow-[0_12px_40px_rgba(37,99,235,0.25)]'
                    : 'bg-[#0a0d17]/90 hover:bg-[#0e1322] border-slate-800/90 hover:border-blue-500/40 shadow-xl hover:shadow-[0_12px_30px_rgba(0,0,0,0.5)]'
                }`}
              >
                {/* Top Card Bar */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:text-blue-300 group-hover:border-blue-400 group-hover:bg-blue-600/20 transition-all shadow-sm">
                      {getIcon(service.iconName)}
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                      {service.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed mb-4 font-normal">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Expandable Sub-Bullets (visible on click/expanded) */}
                <div>
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden pt-3 border-t border-slate-800/80 mt-2 space-y-2.5"
                      >
                        <div className="text-[11px] font-mono uppercase text-blue-400 font-semibold tracking-wider mb-2">
                          Operational Deliverables:
                        </div>
                        {service.subBullets.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Card Bottom Expansion Trigger */}
                  <div className="pt-4 mt-3 border-t border-slate-800/60 flex items-center justify-between">
                    <button
                      onClick={(e) => toggleExpand(service.id, e)}
                      className="text-xs font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1.5 cursor-pointer py-1 font-medium transition-colors"
                    >
                      <MousePointerClick className="w-3.5 h-3.5 text-blue-400" />
                      <span>{isExpanded ? 'Collapse specs' : 'Expand full specs'}</span>
                    </button>
                    <span className="text-[10px] font-mono text-slate-500">0{index + 1} / 06</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Scroll Progress Indicator Dots */}
        <div className="flex items-center justify-between mt-6 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            {WHAT_I_DO_DATA.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === i ? 'w-8 bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]' : 'w-2 bg-slate-800 hover:bg-slate-700'
                }`}
                aria-label={`Go to capability ${i + 1}`}
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
