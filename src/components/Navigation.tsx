import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Terminal, Sparkles, CheckCircle2, ArrowLeft } from 'lucide-react';
import { PageView } from '../types';

interface NavigationProps {
  currentView: PageView;
  onNavigate: (view: PageView, sectionId?: string) => void;
  onOpenBooking: (mode?: 'strategy' | 'work') => void;
  onTriggerAdmin?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentView,
  onNavigate,
  onOpenBooking,
  onTriggerAdmin
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [clickCount, setClickCount] = useState(0);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleLogoClick = (e: React.MouseEvent) => {
    // Standard navigation
    if (currentView !== 'home') {
      onNavigate('home', 'hero');
    }

    // 5-click Admin trigger tracking
    setClickCount((prev) => {
      const newCount = prev + 1;
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      
      clickTimeoutRef.current = setTimeout(() => {
        setClickCount(0);
      }, 3000);

      if (newCount >= 5) {
        setClickCount(0);
        if (onTriggerAdmin) {
          onTriggerAdmin();
        }
      }
      return newCount;
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      if (currentView !== 'home') return;

      // Detect active section on home page
      const sections = ['what-i-do', 'stack', 'results', 'about', 'faq', 'approach'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const navLinks = [
    { label: 'Services', view: 'home' as PageView, sectionId: 'what-i-do' },
    { label: 'The Stack', view: 'home' as PageView, sectionId: 'stack' },
    { label: 'Results', view: 'home' as PageView, sectionId: 'results' },
    { label: 'Case Studies', view: 'case-studies' as PageView, isSubPage: true },
    { label: 'How I Work', view: 'how-i-work' as PageView, isSubPage: true },
    { label: 'About', view: 'home' as PageView, sectionId: 'about' },
    { label: 'FAQ', view: 'home' as PageView, sectionId: 'faq' }
  ];

  const handleLinkClick = (link: typeof navLinks[0]) => {
    setMobileMenuOpen(false);
    if (link.isSubPage) {
      onNavigate(link.view);
    } else {
      onNavigate('home', link.sectionId);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled || currentView !== 'home'
          ? 'bg-[#07090e]/95 backdrop-blur-xl border-b border-slate-800/80 py-3 shadow-2xl shadow-black/40'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left: Brand Identity / Back to Home if on subpage */}
        <button
          onClick={handleLogoClick}
          className="group flex items-center gap-3 no-underline cursor-pointer shrink-0 text-left relative"
          title="MacQueen Omoruyi // Outbound Specialist"
        >
          <div className={`w-8 h-8 rounded-lg bg-blue-600/15 border flex items-center justify-center text-blue-400 group-hover:border-blue-400 group-hover:bg-blue-600/25 transition-all shadow-[0_0_12px_rgba(59,130,246,0.15)] ${
            clickCount > 0 ? 'border-blue-400 scale-105 bg-blue-600/30 ring-2 ring-blue-500/40' : 'border-blue-500/30'
          }`}>
            <Terminal className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <div className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              <span>MacQueen Omoruyi</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" title="Available for Advisory" />
              {clickCount > 1 && (
                <span className="text-[9px] font-mono text-blue-400 opacity-60">
                  [{clickCount}/5]
                </span>
              )}
            </div>
            <div className="text-[10px] font-mono text-slate-400 group-hover:text-blue-300 transition-colors">
              B2B Outbound Systems
            </div>
          </div>
        </button>

        {/* Center: Streamlined Desktop Navigation Pill */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#0b0e1a]/85 border border-slate-800/90 px-2 py-1 rounded-full backdrop-blur-md shadow-lg shadow-black/30">
          {navLinks.map((link) => {
            const isSubPageActive = link.isSubPage && currentView === link.view;
            const isSectionActive = currentView === 'home' && !link.isSubPage && activeSection === link.sectionId;
            const isActive = isSubPageActive || isSectionActive;

            return (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link)}
                className={`relative text-xs font-medium px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-white bg-blue-600/20 border border-blue-500/50 shadow-sm'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                {link.label}
                {link.isSubPage && (
                  <span className="ml-1.5 px-1.5 py-0.2 rounded text-[9px] font-mono bg-blue-950 text-blue-300 border border-blue-800/60">
                    PAGE
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Clean & Focused CTA */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {currentView !== 'home' && (
            <button
              onClick={() => onNavigate('home')}
              className="text-xs font-mono text-slate-400 hover:text-white px-3 py-2 rounded-lg border border-slate-800 hover:bg-slate-900 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back Home</span>
            </button>
          )}

          <button
            onClick={() => onOpenBooking('strategy')}
            className="min-h-[40px] px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white border border-blue-500/60 shadow-[0_0_20px_rgba(37,99,235,0.35)] transition-all cursor-pointer flex items-center gap-1.5 hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] active:scale-95"
          >
            <span>Book Strategy Call</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile / Tablet Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer border border-slate-800"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-[#07090e]/98 border-b border-slate-800 px-4 pt-3 pb-6 mt-2 backdrop-blur-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-1.5 max-w-lg mx-auto">
              <div className="px-3 py-1.5 text-[10px] font-mono text-slate-500 uppercase tracking-wider flex items-center justify-between">
                <span>NAVIGATION</span>
                {currentView !== 'home' && (
                  <span className="text-blue-400 font-semibold uppercase">VIEWING: {currentView}</span>
                )}
              </div>

              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link)}
                  className="text-sm font-medium text-slate-300 hover:text-white py-2.5 px-3 rounded-lg hover:bg-slate-800/70 transition-colors flex items-center justify-between text-left cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    {link.label}
                    {link.isSubPage && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-blue-950 text-blue-300 border border-blue-800/60">
                        SUB-PAGE
                      </span>
                    )}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
              ))}

              <div className="pt-4 mt-2 border-t border-slate-800/80 flex flex-col gap-2.5">
                {currentView !== 'home' && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigate('home');
                    }}
                    className="w-full min-h-[44px] py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Return to Main Home Portfolio</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking('work');
                  }}
                  className="w-full min-h-[44px] py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Work With Me
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking('strategy');
                  }}
                  className="w-full min-h-[44px] py-2.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/30 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Book a Strategy Call</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
