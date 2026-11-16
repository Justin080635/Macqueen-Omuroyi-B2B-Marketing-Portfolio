import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'motion/react';
import { PageView } from '../types';

interface SectionItem {
  id: string;
  label: string;
}

const SECTIONS: SectionItem[] = [
  { id: 'hero', label: '01 Hero' },
  { id: 'problem', label: '02 Problem' },
  { id: 'what-i-do', label: '03 What I Do' },
  { id: 'stack', label: '04 The Stack' },
  { id: 'results', label: '05 Results' },
  { id: 'work', label: '06 Selected Work' },
  { id: 'how-i-work', label: '07 How I Work' },
  { id: 'about', label: '08 About' },
  { id: 'testimonials', label: '09 Testimonials' },
  { id: 'faq', label: '10 FAQ' },
  { id: 'contact', label: '11 Contact' }
];

interface ScrollProgressProps {
  currentView?: PageView;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({ currentView = 'home' }) => {
  const { scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    if (currentView !== 'home') return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Slim Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-400 origin-left z-50 shadow-[0_0_10px_rgba(59,130,246,0.6)]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Right Side Indicator Dots (Desktop) - Only on home page */}
      {currentView === 'home' && (
        <nav 
          aria-label="Section Navigation" 
          className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-3 pointer-events-auto"
        >
          <div className="bg-slate-950/70 backdrop-blur-md border border-slate-800/80 rounded-full px-2 py-3 flex flex-col items-center gap-3 shadow-xl">
            {SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollTo(sec.id)}
                  className="group relative flex items-center justify-center p-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-full transition-all"
                  aria-label={`Jump to ${sec.label}`}
                >
                  {/* Dot */}
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      isActive
                        ? 'w-2.5 h-2.5 bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.9)] scale-110'
                        : 'w-1.5 h-1.5 bg-slate-600 group-hover:bg-slate-300 group-hover:scale-125'
                    }`}
                  />

                  {/* Floating Tooltip on Hover */}
                  <span className="absolute right-7 px-2.5 py-1 text-xs font-mono text-slate-200 bg-slate-900/95 border border-slate-700/80 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-lg">
                    {sec.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </>
  );
};
