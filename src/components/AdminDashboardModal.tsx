import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Save, 
  Plus, 
  Trash2, 
  Upload, 
  Image as ImageIcon, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Sparkles, 
  User, 
  MessageSquareQuote, 
  ShieldCheck, 
  RefreshCw,
  ExternalLink,
  Layers,
  ChevronDown,
  ChevronUp,
  HelpCircle
} from 'lucide-react';
import { SiteContentState, TestimonialItem } from '../types';
import { 
  DEFAULT_HERO_PHOTO, 
  DEFAULT_ABOUT_PHOTO, 
  DEFAULT_CONTENT_STATE,
  fileToDataUrl, 
  saveSiteContent 
} from '../lib/contentStore';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentState: SiteContentState;
  onUpdateContentState: (newState: SiteContentState) => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  contentState,
  onUpdateContentState,
}) => {
  const [activeTab, setActiveTab] = useState<'testimonials' | 'personal-photos' | 'settings'>('testimonials');
  const [localState, setLocalState] = useState<SiteContentState>(JSON.parse(JSON.stringify(contentState)));
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [expandedTestimonialId, setExpandedTestimonialId] = useState<string | null>(null);

  // Hidden file input refs for personal pictures
  const heroFileInputRef = useRef<HTMLInputElement>(null);
  const aboutFileInputRef = useRef<HTMLInputElement>(null);

  // Hidden file input for testimonial avatars
  const testimonialFileInputRef = useRef<HTMLInputElement>(null);
  const [targetTestimonialForPhoto, setTargetTestimonialForPhoto] = useState<string | null>(null);

  if (!isOpen) return null;

  const visibleTestimonialsCount = localState.testimonials.filter(t => t.isVisible !== false).length;

  // Toggle Visibility with Max 5 Constraint
  const handleToggleVisibility = (id: string) => {
    setLocalState(prev => {
      const item = prev.testimonials.find(t => t.id === id);
      if (!item) return prev;

      const currentlyVisible = item.isVisible !== false;

      // If trying to enable visibility and already at 5, warn and prevent
      if (!currentlyVisible && visibleTestimonialsCount >= 5) {
        setErrorMessage('Maximum 5 testimonials can be visible at one time. Turn off another testimonial first.');
        setTimeout(() => setErrorMessage(''), 4500);
        return prev;
      }

      setErrorMessage('');
      const updated = prev.testimonials.map(t => {
        if (t.id === id) {
          return { ...t, isVisible: !currentlyVisible };
        }
        return t;
      });

      return { ...prev, testimonials: updated };
    });
  };

  // Update a single testimonial field
  const handleUpdateTestimonial = (id: string, updates: Partial<TestimonialItem>) => {
    setLocalState(prev => ({
      ...prev,
      testimonials: prev.testimonials.map(t => (t.id === id ? { ...t, ...updates } : t))
    }));
  };

  // Add a new empty testimonial
  const handleAddTestimonial = () => {
    const newId = `testimonial-${Date.now()}`;
    const willBeVisible = visibleTestimonialsCount < 5;

    const newTestimonial: TestimonialItem = {
      id: newId,
      author: 'New Client Leader',
      role: 'VP of Growth',
      company: 'Acme SaaS',
      companyCategory: 'B2B Tech',
      quote: 'MacQueen rebuilt our entire outbound pipeline, restored deliverability, and booked high-quality executive meetings in record time.',
      impactMetric: '30+ Demos',
      metricLabel: 'Monthly Growth',
      verifiedTag: 'Verified Case Study',
      rating: 5,
      highlightedResult: 'Zero bounce rates • Record pipeline growth',
      avatarUrl: '',
      isVisible: willBeVisible
    };

    setLocalState(prev => ({
      ...prev,
      testimonials: [newTestimonial, ...prev.testimonials]
    }));
    setExpandedTestimonialId(newId);
  };

  // Delete a testimonial
  const handleDeleteTestimonial = (id: string) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      setLocalState(prev => ({
        ...prev,
        testimonials: prev.testimonials.filter(t => t.id !== id)
      }));
    }
  };

  // Testimonial Avatar Upload
  const handleTestimonialPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !targetTestimonialForPhoto) return;

    try {
      const dataUrl = await fileToDataUrl(file, 400, 400, 0.9);
      handleUpdateTestimonial(targetTestimonialForPhoto, { avatarUrl: dataUrl });
      setTargetTestimonialForPhoto(null);
      if (testimonialFileInputRef.current) testimonialFileInputRef.current.value = '';
    } catch {
      setErrorMessage('Failed to process uploaded testimonial picture.');
    }
  };

  // Remove Testimonial Avatar
  const handleRemoveTestimonialPhoto = (id: string) => {
    handleUpdateTestimonial(id, { avatarUrl: '' });
  };

  // Personal Hero Photo Upload
  const handleHeroPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const dataUrl = await fileToDataUrl(file, 1200, 1600, 0.9);
      setLocalState(prev => ({
        ...prev,
        media: { ...prev.media, heroPhotoUrl: dataUrl }
      }));
      if (heroFileInputRef.current) heroFileInputRef.current.value = '';
    } catch {
      setErrorMessage('Failed to process uploaded hero portrait.');
    }
  };

  // Personal About Photo Upload
  const handleAboutPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const dataUrl = await fileToDataUrl(file, 1000, 1000, 0.9);
      setLocalState(prev => ({
        ...prev,
        media: { ...prev.media, aboutPhotoUrl: dataUrl }
      }));
      if (aboutFileInputRef.current) aboutFileInputRef.current.value = '';
    } catch {
      setErrorMessage('Failed to process uploaded about photo.');
    }
  };

  // Reset to default personal photos
  const handleResetHeroPhoto = () => {
    setLocalState(prev => ({
      ...prev,
      media: { ...prev.media, heroPhotoUrl: DEFAULT_HERO_PHOTO }
    }));
  };

  const handleResetAboutPhoto = () => {
    setLocalState(prev => ({
      ...prev,
      media: { ...prev.media, aboutPhotoUrl: DEFAULT_ABOUT_PHOTO }
    }));
  };

  // Save all changes globally to Firestore & Server
  const handleSaveAll = async () => {
    setSaving(true);
    setErrorMessage('');
    setSavedSuccess(false);

    try {
      const ok = await saveSiteContent(localState);
      if (ok) {
        onUpdateContentState(localState);
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      } else {
        setErrorMessage('Warning: Changes saved locally, but server sync reported a temporary delay.');
      }
    } catch {
      setErrorMessage('Error syncing changes.');
    } finally {
      setSaving(false);
    }
  };

  // Factory reset
  const handleFactoryReset = () => {
    if (confirm('Reset all testimonials, visibility, and personal photos to original defaults?')) {
      const reset = JSON.parse(JSON.stringify(DEFAULT_CONTENT_STATE));
      setLocalState(reset);
      saveSiteContent(reset);
      onUpdateContentState(reset);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-lg"
        />

        {/* Hidden inputs */}
        <input
          type="file"
          ref={heroFileInputRef}
          onChange={handleHeroPhotoUpload}
          accept="image/*"
          className="hidden"
        />
        <input
          type="file"
          ref={aboutFileInputRef}
          onChange={handleAboutPhotoUpload}
          accept="image/*"
          className="hidden"
        />
        <input
          type="file"
          ref={testimonialFileInputRef}
          onChange={handleTestimonialPhotoUpload}
          accept="image/*"
          className="hidden"
        />

        {/* Main Dashboard Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl max-h-[92vh] rounded-3xl bg-[#090d1a] border border-blue-500/40 shadow-[0_30px_90px_rgba(0,0,0,0.9)] flex flex-col z-10 overflow-hidden text-slate-100"
        >
          {/* Top Decorative Gradient */}
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-600" />

          {/* Header */}
          <div className="px-6 py-4.5 bg-[#0b1022] border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white tracking-tight">
                    Admin Content & Media Command Center
                  </h2>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE SYNC
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Global changes persist worldwide to all visitors in real-time.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={handleSaveAll}
                disabled={saving}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-xs tracking-wide shadow-lg shadow-blue-900/40 transition-all flex items-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
              >
                {saving ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Save className="w-3.5 h-3.5" />
                )}
                <span>{saving ? 'Publishing Worldwide...' : 'Publish Changes'}</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close dashboard"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="px-6 py-2.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveTab('testimonials')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'testimonials'
                    ? 'bg-blue-600/25 border border-blue-500/60 text-blue-200 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
                }`}
              >
                <MessageSquareQuote className="w-3.5 h-3.5" />
                <span>Testimonials Manager</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                  visibleTestimonialsCount > 5 ? 'bg-rose-950 text-rose-300' : 'bg-slate-900 text-slate-300'
                }`}>
                  {visibleTestimonialsCount}/5 Visible
                </span>
              </button>

              <button
                onClick={() => setActiveTab('personal-photos')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'personal-photos'
                    ? 'bg-blue-600/25 border border-blue-500/60 text-blue-200 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Personal Pictures (Hero & About)</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'settings'
                    ? 'bg-blue-600/25 border border-blue-500/60 text-blue-200 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Sync & Backups</span>
              </button>
            </div>

            {savedSuccess && (
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800/60">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Published Globally!</span>
              </div>
            )}
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="px-6 py-2.5 bg-rose-950/70 border-b border-rose-800/80 text-rose-200 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
              <button
                onClick={() => setErrorMessage('')}
                className="text-rose-400 hover:text-rose-100 text-xs underline cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Main Scrollable Content */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            
            {/* TAB 1: TESTIMONIALS MANAGER */}
            {activeTab === 'testimonials' && (
              <div className="space-y-6">
                {/* Header Action Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      <span>Client Testimonial Feed</span>
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-blue-950 border border-blue-800 text-blue-300">
                        Max 5 Rule Enforced
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Adjust quotes, add or remove client avatar pictures, and toggle which 5 stories appear on the live site.
                    </p>
                  </div>

                  <button
                    onClick={handleAddTestimonial}
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Testimonial</span>
                  </button>
                </div>

                {/* Testimonials List */}
                <div className="space-y-4">
                  {localState.testimonials.map((t, index) => {
                    const isVisible = t.isVisible !== false;
                    const isExpanded = expandedTestimonialId === t.id;

                    return (
                      <div
                        key={t.id}
                        className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                          isVisible 
                            ? 'bg-[#0d1222]/90 border-blue-500/40 shadow-md' 
                            : 'bg-slate-950/50 border-slate-800/80 opacity-75'
                        }`}
                      >
                        {/* Row Header */}
                        <div className="p-4 sm:p-5 flex items-center justify-between gap-4 flex-wrap">
                          <div className="flex items-center gap-3.5 min-w-0 flex-1">
                            {/* Avatar Thumbnail */}
                            {t.avatarUrl ? (
                              <img
                                src={t.avatarUrl}
                                alt={t.author}
                                className="w-11 h-11 rounded-xl object-cover border border-blue-500/50 shrink-0"
                              />
                            ) : (
                              <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-xs text-blue-300 shrink-0">
                                {t.author
                                  .split(' ')
                                  .map(n => n[0])
                                  .join('') || 'CL'}
                              </div>
                            )}

                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-white text-sm truncate">
                                  {t.author || 'Unnamed Client'}
                                </span>
                                <span className="text-xs text-slate-400 truncate">
                                  • {t.role} at {t.company}
                                </span>
                              </div>
                              <p className="text-xs text-slate-400 truncate mt-0.5 max-w-xl">
                                "{t.quote}"
                              </p>
                            </div>
                          </div>

                          {/* Controls */}
                          <div className="flex items-center gap-2.5 shrink-0">
                            {/* Visibility Switch */}
                            <button
                              onClick={() => handleToggleVisibility(t.id)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
                                isVisible
                                  ? 'bg-emerald-950/80 border border-emerald-700/60 text-emerald-300'
                                  : 'bg-slate-900 border border-slate-800 text-slate-500 hover:text-slate-300'
                              }`}
                              title={isVisible ? "Currently visible on live page" : "Hidden from live page"}
                            >
                              {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                              <span>{isVisible ? 'Visible (On Site)' : 'Hidden'}</span>
                            </button>

                            {/* Expand / Edit Toggle */}
                            <button
                              onClick={() => setExpandedTestimonialId(isExpanded ? null : t.id)}
                              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200 flex items-center gap-1 cursor-pointer"
                            >
                              <span>{isExpanded ? 'Collapse' : 'Edit Details'}</span>
                              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                            </button>

                            {/* Delete button */}
                            <button
                              onClick={() => handleDeleteTestimonial(t.id)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 transition-colors cursor-pointer"
                              title="Delete Testimonial"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Expanded Edit Form */}
                        {isExpanded && (
                          <div className="p-5 bg-slate-950/80 border-t border-slate-800/80 space-y-4">
                            
                            {/* Main Quote Textarea */}
                            <div>
                              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                                Testimonial Quote Text
                              </label>
                              <textarea
                                value={t.quote}
                                onChange={(e) => handleUpdateTestimonial(t.id, { quote: e.target.value })}
                                rows={3}
                                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                placeholder="Enter full client testimonial text..."
                              />
                            </div>

                            {/* Author & Company Meta */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div>
                                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                                  Author Name
                                </label>
                                <input
                                  type="text"
                                  value={t.author}
                                  onChange={(e) => handleUpdateTestimonial(t.id, { author: e.target.value })}
                                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
                                />
                              </div>

                              <div>
                                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                                  Role / Title
                                </label>
                                <input
                                  type="text"
                                  value={t.role}
                                  onChange={(e) => handleUpdateTestimonial(t.id, { role: e.target.value })}
                                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
                                />
                              </div>

                              <div>
                                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                                  Company Name
                                </label>
                                <input
                                  type="text"
                                  value={t.company}
                                  onChange={(e) => handleUpdateTestimonial(t.id, { company: e.target.value })}
                                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
                                />
                              </div>
                            </div>

                            {/* Metrics & Badges */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div>
                                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                                  Impact Metric (e.g. 34 New Demos)
                                </label>
                                <input
                                  type="text"
                                  value={t.impactMetric}
                                  onChange={(e) => handleUpdateTestimonial(t.id, { impactMetric: e.target.value })}
                                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
                                />
                              </div>

                              <div>
                                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                                  Metric Sub-Label
                                </label>
                                <input
                                  type="text"
                                  value={t.metricLabel}
                                  onChange={(e) => handleUpdateTestimonial(t.id, { metricLabel: e.target.value })}
                                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
                                />
                              </div>

                              <div>
                                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                                  Verified Badge Tag
                                </label>
                                <input
                                  type="text"
                                  value={t.verifiedTag}
                                  onChange={(e) => handleUpdateTestimonial(t.id, { verifiedTag: e.target.value })}
                                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
                                />
                              </div>
                            </div>

                            {/* Highlighted Result summary */}
                            <div>
                              <label className="block text-[11px] font-mono text-slate-400 mb-1">
                                Highlighted Result Pill Text
                              </label>
                              <input
                                type="text"
                                value={t.highlightedResult || ''}
                                onChange={(e) => handleUpdateTestimonial(t.id, { highlightedResult: e.target.value })}
                                className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
                                placeholder="e.g. Spam issue solved • $380K Pipeline added"
                              />
                            </div>

                            {/* Avatar Photo Controls */}
                            <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                              <div className="flex items-center gap-3">
                                <div className="text-xs font-mono text-slate-400">
                                  Client Avatar Picture:
                                </div>
                                {t.avatarUrl ? (
                                  <div className="flex items-center gap-2">
                                    <img
                                      src={t.avatarUrl}
                                      alt={t.author}
                                      className="w-8 h-8 rounded-lg object-cover border border-blue-400"
                                    />
                                    <span className="text-xs text-emerald-400 font-mono">Custom Picture Loaded</span>
                                  </div>
                                ) : (
                                  <span className="text-xs text-slate-500 font-mono">Initials Badge (No Picture)</span>
                                )}
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setTargetTestimonialForPhoto(t.id);
                                    testimonialFileInputRef.current?.click();
                                  }}
                                  className="px-3 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/50 text-blue-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                                >
                                  <Upload className="w-3.5 h-3.5" />
                                  <span>Upload New Picture</span>
                                </button>

                                {t.avatarUrl && (
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveTestimonialPhoto(t.id)}
                                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-rose-950/60 border border-slate-700 hover:border-rose-700 text-slate-300 hover:text-rose-300 text-xs transition-colors cursor-pointer"
                                  >
                                    Remove Picture
                                  </button>
                                )}
                              </div>
                            </div>

                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: PERSONAL PICTURES (HERO & ABOUT) */}
            {activeTab === 'personal-photos' && (
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-blue-400" />
                    <span>Personal Portrait & Profile Media Management</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Upload and replace the two personal portrait photos featured on the portfolio. New photos are stored and rendered worldwide for all visitors.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Photo 1: Hero Section Main Portrait */}
                  <div className="p-5 rounded-2xl bg-[#0c1020] border border-slate-800 flex flex-col justify-between shadow-lg">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono text-blue-400 font-semibold uppercase">
                          Photo 01 // Hero Main Portrait
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">Aspect: 3:4</span>
                      </div>

                      {/* Photo Preview Container */}
                      <div className="relative aspect-[3/4] w-full max-w-[280px] mx-auto rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 shadow-inner mb-4">
                        <img
                          src={localState.media.heroPhotoUrl}
                          alt="Hero Section Portrait Preview"
                          className="w-full h-full object-cover object-top"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-x-0 bottom-0 py-2 bg-slate-950/80 backdrop-blur-sm text-center text-[10px] font-mono text-slate-300">
                          Active Hero Portrait
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                        Displayed in the primary Hero Section alongside the interactive tech stats and status indicators.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-3 border-t border-slate-800/80">
                      <button
                        onClick={() => heroFileInputRef.current?.click()}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Hero Photo</span>
                      </button>

                      <button
                        onClick={handleResetHeroPhoto}
                        className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-colors cursor-pointer"
                        title="Reset to original photo"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Default</span>
                      </button>
                    </div>
                  </div>

                  {/* Photo 2: About Section Profile Photo */}
                  <div className="p-5 rounded-2xl bg-[#0c1020] border border-slate-800 flex flex-col justify-between shadow-lg">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono text-indigo-400 font-semibold uppercase">
                          Photo 02 // About Technical Portrait
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">Aspect: 1:1</span>
                      </div>

                      {/* Photo Preview Container */}
                      <div className="relative aspect-square w-full max-w-[280px] mx-auto rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 shadow-inner mb-4">
                        <img
                          src={localState.media.aboutPhotoUrl}
                          alt="About Section Technical Portrait Preview"
                          className="w-full h-full object-cover object-center"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-x-0 bottom-0 py-2 bg-slate-950/80 backdrop-blur-sm text-center text-[10px] font-mono text-slate-300">
                          Active About Portrait
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                        Displayed in Section 08 (About MacQueen) framed with the technical domain health and deliverability metrics.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-3 border-t border-slate-800/80">
                      <button
                        onClick={() => aboutFileInputRef.current?.click()}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload About Photo</span>
                      </button>

                      <button
                        onClick={handleResetAboutPhoto}
                        className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-colors cursor-pointer"
                        title="Reset to original photo"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Default</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB 3: SYSTEM & SYNC SETTINGS */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Global Synchronization Status</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-slate-400">PERSISTENCE MODE</div>
                      <div className="text-emerald-400 font-bold mt-0.5">REST + Realtime Sync</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-slate-400">VISIBLE TESTIMONIALS</div>
                      <div className="text-blue-300 font-bold mt-0.5">{visibleTestimonialsCount} of 5 Active</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-slate-400">LAST UPDATED</div>
                      <div className="text-slate-200 mt-0.5 truncate">{new Date(localState.lastUpdated).toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={handleFactoryReset}
                      className="px-4 py-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/60 text-rose-300 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Factory Reset to Defaults
                    </button>

                    <button
                      onClick={handleSaveAll}
                      className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Force Publish All
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Footer Bar */}
          <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>MACQUEEN ADMIN ENVIRONMENT • READY</span>
            </span>

            <span>Capped at 5 testimonials maximum</span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
