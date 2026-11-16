import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Copy, Calendar, Mail, Send, ArrowRight, ShieldCheck, Clock, Zap } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'strategy' | 'work';
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  defaultMode = 'strategy'
}) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string>('Tomorrow, 2:00 PM EST');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    currentVolume: '10k - 50k emails/mo',
    primaryIssue: 'Deliverability & High Bounce Rates',
    notes: ''
  });

  const directEmail = "macqueen.omoruyi@growthsystems.io";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(directEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const resetForm = () => {
    setFormSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#0c101a] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl z-10 my-8 overflow-hidden"
          >
            {/* Top blue light beam */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-600" />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!formSubmitted ? (
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-blue-400 mb-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  {defaultMode === 'strategy' ? 'B2B OUTBOUND AUDIT & STRATEGY CALL' : 'DIRECT CLIENT ENGAGEMENT'}
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                  Fix Your Outbound Infrastructure
                </h3>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                  Direct consultation with MacQueen Omoruyi. Technical pipeline diagnosis, sender reputation recovery, or high-intent outbound engine build.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className="w-full bg-slate-900/90 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full bg-slate-900/90 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        Company & Website *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Acme Technologies (acme.io)"
                        className="w-full bg-slate-900/90 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        Primary Bottleneck
                      </label>
                      <select
                        value={formData.primaryIssue}
                        onChange={(e) => setFormData({ ...formData, primaryIssue: e.target.value })}
                        className="w-full bg-slate-900/90 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer"
                      >
                        <option>Deliverability & High Bounce Rates (&gt;5%)</option>
                        <option>Poor Lead Quality & Stale Scrapes</option>
                        <option>Need New Multi-Domain Outbound Setup</option>
                        <option>Low Reply Rates & Broken Copy Angles</option>
                        <option>Automation & CRM Telemetry Disconnect</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Current Monthly Sending Volume
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['< 5k / mo', '5k - 20k / mo', '20k - 100k / mo', '100k+ / mo'].map((vol) => (
                        <button
                          type="button"
                          key={vol}
                          onClick={() => setFormData({ ...formData, currentVolume: vol })}
                          className={`text-xs py-2 px-3 rounded-lg border transition-all cursor-pointer ${
                            formData.currentVolume === vol
                              ? 'bg-blue-600/20 border-blue-500 text-blue-300 font-medium'
                              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          {vol}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Additional Context (Tools, Domain Issues, or Timelines)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="e.g. Currently using Instantly and Clay, but our secondary domains are landing in spam..."
                      className="w-full bg-slate-900/90 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 justify-between">
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 text-xs font-mono text-slate-400 hover:text-white py-2.5 px-3 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900/40 transition-colors cursor-pointer"
                    >
                      {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedEmail ? 'Email Copied!' : 'Copy Direct Email'}</span>
                    </button>

                    <button
                      type="submit"
                      className="w-full sm:w-auto min-h-[48px] px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] cursor-pointer"
                    >
                      <span>Request Systems Strategy Call</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>

                <div className="mt-5 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                    100% Confidential NDA Standard
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    Response within 12 Business Hours
                  </span>
                </div>
              </div>
            ) : (
              /* Submission Success State */
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-blue-600/20 border border-blue-500/50 flex items-center justify-center mx-auto mb-4 text-blue-400">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Diagnostic Request Received
                </h3>
                <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
                  Thanks <span className="text-white font-medium">{formData.name || 'there'}</span>. MacQueen will review your infrastructure details and respond directly to <span className="text-blue-400 font-mono">{formData.email || 'your email'}</span> with diagnostic notes.
                </p>

                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 max-w-md mx-auto mb-6 text-left text-xs font-mono space-y-2 text-slate-300">
                  <div className="text-blue-400 font-semibold mb-1">PROPOSED NEXT STEPS:</div>
                  <div>1. 15-minute technical infrastructure triage</div>
                  <div>2. DNS & domain reputation checkup</div>
                  <div>3. Tailored fix plan & deployment scope</div>
                </div>

                <button
                  onClick={resetForm}
                  className="px-6 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
