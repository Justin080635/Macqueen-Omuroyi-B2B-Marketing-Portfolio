import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BackgroundGrid } from './components/BackgroundGrid';
import { Navigation } from './components/Navigation';
import { ScrollProgress } from './components/ScrollProgress';
import { CustomCursor } from './components/CustomCursor';
import { ContactModal } from './components/ContactModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { PageView, SiteContentState } from './types';
import { fetchSiteContent, DEFAULT_CONTENT_STATE } from './lib/contentStore';

// Main Home Page Sections
import { HeroSection } from './components/sections/HeroSection';
import { TrustIndicators } from './components/TrustIndicators';
import { ProblemSection } from './components/sections/ProblemSection';
import { WhatIDoSection } from './components/sections/WhatIDoSection';
import { TheStackSection } from './components/sections/TheStackSection';
import { ResultsSection } from './components/sections/ResultsSection';
import { SelectedWorkSection } from './components/sections/SelectedWorkSection';
import { HowIWorkSection } from './components/sections/HowIWorkSection';
import { AboutSection } from './components/sections/AboutSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { FaqSection } from './components/sections/FaqSection';
import { CtaContactSection } from './components/sections/CtaContactSection';
import { Footer } from './components/sections/Footer';

// Dedicated Sub-Pages
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { HowIWorkPage } from './pages/HowIWorkPage';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingMode, setBookingMode] = useState<'strategy' | 'work'>('strategy');

  // Dynamic Site Content & Global State
  const [siteContent, setSiteContent] = useState<SiteContentState>(DEFAULT_CONTENT_STATE);
  const [adminAuthOpen, setAdminAuthOpen] = useState(false);
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);

  // Fetch worldwide site content from persistent store
  useEffect(() => {
    fetchSiteContent().then((data) => {
      if (data) {
        setSiteContent(data);
      }
    });
  }, []);

  // Handle URL hash changes for deep linking / routing
  useEffect(() => {
    const handleHashSync = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'case-studies') {
        setCurrentView('case-studies');
      } else if (hash === 'how-i-work' || hash === 'process' || hash === 'methodology') {
        setCurrentView('how-i-work');
      } else if (hash === 'home' || hash === '' || hash === 'hero') {
        setCurrentView('home');
      }
    };

    handleHashSync();
    window.addEventListener('hashchange', handleHashSync);
    return () => window.removeEventListener('hashchange', handleHashSync);
  }, []);

  useEffect(() => {
    // Elegant brief intro loader sequence
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenBooking = (mode: 'strategy' | 'work' = 'strategy') => {
    setBookingMode(mode);
    setBookingModalOpen(true);
  };

  const handleNavigate = (view: PageView, sectionId?: string) => {
    if (view === currentView && view !== 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCurrentView(view);

    if (view === 'case-studies') {
      window.location.hash = 'case-studies';
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else if (view === 'how-i-work') {
      window.location.hash = 'how-i-work';
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      window.location.hash = sectionId ? `#${sectionId}` : '';
      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 80);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-[#07090e] text-[#e2e8f0] selection:bg-blue-600/30 selection:text-blue-200">
      {/* Custom Precision Follower Cursor */}
      <CustomCursor />

      {/* Intro Loading / System Initialization Curtain */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#06080d] flex flex-col items-center justify-center pointer-events-none px-4"
          >
            <div className="flex flex-col items-center text-center gap-4 max-w-sm">
              <div className="w-12 h-12 rounded-xl bg-blue-950/60 border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-[0_0_25px_rgba(59,130,246,0.3)]">
                <span className="w-4 h-4 rounded-sm bg-blue-500 animate-spin" />
              </div>
              
              <div className="space-y-1">
                <div className="text-sm sm:text-base font-bold text-white tracking-tight">
                  MacQueen Omoruyi
                </div>
                <div className="text-xs font-mono tracking-widest text-blue-400 font-medium">
                  ENGINEERED B2B OUTBOUND INFRASTRUCTURE
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  Calibrating Deliverability & Pipeline Architecture...
                </div>
              </div>

              <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden mt-1">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.55, ease: 'easeInOut' }}
                  className="h-full bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-400"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Background Grid & Ambient Data Pipelines */}
      <BackgroundGrid />

      {/* Global Scroll Progress & Side Navigation */}
      <ScrollProgress currentView={currentView} />

      {/* Top Header Navigation with 5-Click Admin Dashboard Access */}
      <Navigation
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBooking}
        onTriggerAdmin={() => setAdminAuthOpen(true)}
      />

      {/* Page Routing Views with Smooth Motion Fade */}
      <AnimatePresence mode="wait">
        {currentView === 'case-studies' ? (
          <motion.div
            key="case-studies-page"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10"
          >
            <CaseStudiesPage
              onNavigateHome={() => handleNavigate('home')}
              onOpenBooking={handleOpenBooking}
            />
          </motion.div>
        ) : currentView === 'how-i-work' ? (
          <motion.div
            key="how-i-work-page"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10"
          >
            <HowIWorkPage
              onNavigateHome={() => handleNavigate('home')}
              onOpenBooking={handleOpenBooking}
            />
          </motion.div>
        ) : (
          <motion.main
            key="home-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10"
          >
            {/* 01. HERO */}
            <HeroSection
              onOpenBooking={handleOpenBooking}
              heroPhotoUrl={siteContent.media.heroPhotoUrl}
            />

            {/* TRUST INDICATORS MARQUEE */}
            <TrustIndicators />

            {/* 02. PROBLEM STATEMENT */}
            <ProblemSection />

            {/* 03. WHAT I DO */}
            <WhatIDoSection />

            {/* 04. THE STACK */}
            <TheStackSection />

            {/* 05. RESULTS */}
            <ResultsSection />

            {/* 06. SELECTED WORK (With Sub-Page Opener) */}
            <SelectedWorkSection 
              onOpenCaseStudiesPage={() => handleNavigate('case-studies')} 
              onOpenBooking={handleOpenBooking}
            />

            {/* 07. HOW I WORK (With Sub-Page Opener) */}
            <HowIWorkSection onOpenHowIWorkPage={() => handleNavigate('how-i-work')} />

            {/* 08. ABOUT */}
            <AboutSection aboutPhotoUrl={siteContent.media.aboutPhotoUrl} />

            {/* 09. TESTIMONIALS (Positioned directly after About Me) */}
            <TestimonialsSection testimonials={siteContent.testimonials} />

            {/* 10. FAQ */}
            <FaqSection onOpenBooking={handleOpenBooking} />

            {/* 11. CTA / CONTACT */}
            <CtaContactSection onOpenBooking={handleOpenBooking} />
          </motion.main>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <Footer onOpenBooking={handleOpenBooking} />

      {/* Interactive Contact & Strategy Call Modal */}
      <ContactModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        defaultMode={bookingMode}
      />

      {/* Admin Passcode Authentication Modal (Triggered by 5 clicks on logo) */}
      <AdminAuthModal
        isOpen={adminAuthOpen}
        onClose={() => setAdminAuthOpen(false)}
        onSuccess={() => {
          setAdminAuthOpen(false);
          setAdminDashboardOpen(true);
        }}
      />

      {/* Admin Content & Media Management Dashboard */}
      <AdminDashboardModal
        isOpen={adminDashboardOpen}
        onClose={() => setAdminDashboardOpen(false)}
        contentState={siteContent}
        onUpdateContentState={(updated) => setSiteContent(updated)}
      />
    </div>
  );
}

