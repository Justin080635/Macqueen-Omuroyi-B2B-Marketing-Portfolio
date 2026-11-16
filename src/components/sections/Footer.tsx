import React from 'react';
import { Linkedin, Mail, Calendar, ArrowUp, Terminal } from 'lucide-react';

interface FooterProps {
  onOpenBooking: (mode?: 'strategy' | 'work') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#04060a] border-t border-slate-900 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-slate-900">
          {/* Identity */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">MacQueen Omoruyi</div>
              <div className="font-mono text-slate-500">B2B Growth & Outbound Systems Specialist</div>
            </div>
          </div>

          {/* Social & Contact Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 hover:text-white transition-all cursor-pointer"
            >
              <Linkedin className="w-4 h-4 text-blue-400" />
              <span>LinkedIn</span>
            </a>

            <button
              onClick={() => onOpenBooking('strategy')}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 hover:text-white transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>Calendly</span>
            </button>

            <button
              onClick={() => onOpenBooking('work')}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 hover:text-white transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4 text-indigo-400" />
              <span>Email</span>
            </button>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-blue-400" />
          </button>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 font-mono text-[11px]">
          <div>
            © {new Date().getFullYear()} MacQueen Omoruyi. All systems engineered for scale.
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Infrastructure Status: 100% Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
