import React from 'react';

interface ToolLogoProps {
  name: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const ToolLogo: React.FC<ToolLogoProps> = ({ name, className = '', size = 'md' }) => {
  const normalizedName = name.toLowerCase();

  const sizeClasses = {
    sm: 'w-5 h-5 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
    xl: 'w-12 h-12 text-lg'
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  // Clay Logo
  if (normalizedName.includes('clay')) {
    return (
      <div className={`rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-600/30 border border-indigo-500/30 flex items-center justify-center text-indigo-300 shadow-sm ${currentSize} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4/6 h-4/6 text-indigo-400">
          <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v2A2.5 2.5 0 0 1 17.5 11h-11A2.5 2.5 0 0 1 4 8.5v-2zm0 9A2.5 2.5 0 0 1 6.5 13h11a2.5 2.5 0 0 1 2.5 2.5v2a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-2z" />
        </svg>
      </div>
    );
  }

  // Apollo.io Logo
  if (normalizedName.includes('apollo')) {
    return (
      <div className={`rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-600/30 border border-amber-500/30 flex items-center justify-center text-amber-300 shadow-sm ${currentSize} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4/6 h-4/6 text-amber-400">
          <path d="M12 2.5c0 0-5.5 4.5-5.5 11.5 0 3.5 2.5 6.5 5.5 7.5 3-1 5.5-4 5.5-7.5 0-7-5.5-11.5-5.5-11.5zm0 13a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
          <path d="M5.5 14c-.8 0-1.5.7-1.5 1.5s1 3.5 3 4.5c-.8-1.8-1.5-4.2-1.5-6zm13 0c-.2 1.8-.7 4.2-1.5 6 2-1 3-3.7 3-4.5s-.7-1.5-1.5-1.5z" />
        </svg>
      </div>
    );
  }

  // Instantly.ai Logo
  if (normalizedName.includes('instantly')) {
    return (
      <div className={`rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/30 flex items-center justify-center text-cyan-300 shadow-sm ${currentSize} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4/6 h-4/6 text-cyan-400">
          <path d="M13 2.5L3.5 14h6.5L8.5 22.5 20.5 10H14l1.5-7.5h-2.5z" />
        </svg>
      </div>
    );
  }

  // Smartlead.io Logo
  if (normalizedName.includes('smartlead')) {
    return (
      <div className={`rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-600/30 border border-blue-500/30 flex items-center justify-center text-blue-300 shadow-sm ${currentSize} ${className}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4/6 h-4/6 text-blue-400">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      </div>
    );
  }

  // HubSpot Logo
  if (normalizedName.includes('hubspot')) {
    return (
      <div className={`rounded-xl bg-gradient-to-br from-[#ff7a59]/20 to-orange-700/30 border border-[#ff7a59]/40 flex items-center justify-center shadow-sm ${currentSize} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4/6 h-4/6 text-[#ff7a59]">
          <path d="M17.5 8.5V6a2.5 2.5 0 0 0-2.5-2.5h-.5A2.5 2.5 0 0 0 12 1a2.5 2.5 0 0 0-2.5 2.5h-.5A2.5 2.5 0 0 0 6.5 6v2.5A4.5 4.5 0 0 0 3 13a4.5 4.5 0 0 0 4.5 4.5h.5a2.5 2.5 0 0 0 2.5 2.5v.5a2.5 2.5 0 0 0 5 0v-.5a2.5 2.5 0 0 0 2.5-2.5h.5A4.5 4.5 0 0 0 23 13a4.5 4.5 0 0 0-5.5-4.5zM12 15a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
        </svg>
      </div>
    );
  }

  // Salesforce Logo
  if (normalizedName.includes('salesforce')) {
    return (
      <div className={`rounded-xl bg-gradient-to-br from-[#00a1e0]/20 to-sky-700/30 border border-[#00a1e0]/40 flex items-center justify-center shadow-sm ${currentSize} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4/6 h-4/6 text-[#00a1e0]">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
        </svg>
      </div>
    );
  }

  // Make.com Logo
  if (normalizedName.includes('make')) {
    return (
      <div className={`rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/30 border border-purple-500/40 flex items-center justify-center shadow-sm ${currentSize} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4/6 h-4/6 text-purple-400">
          <path d="M4 6a2 2 0 0 1 2-2h4l4 5 4-5h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4l-4-5-4 5H6a2 2 0 0 1-2-2V6z" />
        </svg>
      </div>
    );
  }

  // Zapier Logo
  if (normalizedName.includes('zapier')) {
    return (
      <div className={`rounded-xl bg-gradient-to-br from-[#ff4a00]/20 to-amber-600/30 border border-[#ff4a00]/40 flex items-center justify-center shadow-sm ${currentSize} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4/6 h-4/6 text-[#ff4a00]">
          <path d="M12 2a2 2 0 0 1 2 2v5.586l4.243-4.243a2 2 0 1 1 2.828 2.828L16.828 12l4.243 4.243a2 2 0 1 1-2.828 2.828L14 14.828V20a2 2 0 1 1-4 0v-5.172l-4.243 4.243a2 2 0 1 1-2.828-2.828L7.172 12 2.929 7.757a2 2 0 0 1 2.828-2.828L10 9.172V4a2 2 0 0 1 2-2z" />
        </svg>
      </div>
    );
  }

  // Google Workspace Logo
  if (normalizedName.includes('google')) {
    return (
      <div className={`rounded-xl bg-gradient-to-br from-blue-500/20 via-red-500/10 to-amber-500/20 border border-blue-500/30 flex items-center justify-center shadow-sm ${currentSize} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4/6 h-4/6 text-blue-400">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
        </svg>
      </div>
    );
  }

  // Microsoft 365 Logo
  if (normalizedName.includes('microsoft') || normalizedName.includes('o365')) {
    return (
      <div className={`rounded-xl bg-gradient-to-br from-blue-600/20 to-sky-500/20 border border-blue-500/30 flex items-center justify-center shadow-sm ${currentSize} ${className}`}>
        <div className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5">
          <div className="bg-[#f25022] rounded-[1px]" />
          <div className="bg-[#7fba00] rounded-[1px]" />
          <div className="bg-[#00a4ef] rounded-[1px]" />
          <div className="bg-[#ffb900] rounded-[1px]" />
        </div>
      </div>
    );
  }

  // Airtable Logo
  if (normalizedName.includes('airtable')) {
    return (
      <div className={`rounded-xl bg-gradient-to-br from-yellow-500/20 to-red-500/20 border border-yellow-500/30 flex items-center justify-center shadow-sm ${currentSize} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4/6 h-4/6 text-yellow-400">
          <path d="M11.5 2.5L2 6.5v11l9.5 4 9.5-4v-11l-9.5-4zm0 2.4l6.5 2.7-6.5 2.7-6.5-2.7 6.5-2.7zm-7.5 4.3l6.5 2.7v7.2l-6.5-2.7V9.2zm8.5 9.9v-7.2l6.5-2.7v7.2l-6.5 2.7z" />
        </svg>
      </div>
    );
  }

  // LinkedIn / HeyReach Logo
  if (normalizedName.includes('linkedin') || normalizedName.includes('heyreach') || normalizedName.includes('expandi')) {
    return (
      <div className={`rounded-xl bg-gradient-to-br from-[#0a66c2]/20 to-blue-700/30 border border-[#0a66c2]/40 flex items-center justify-center shadow-sm ${currentSize} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4/6 h-4/6 text-[#0a66c2]">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      </div>
    );
  }

  // OpenAI / Claude / AI Logo
  if (normalizedName.includes('openai') || normalizedName.includes('claude') || normalizedName.includes('llm') || normalizedName.includes('ai')) {
    return (
      <div className={`rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-600/30 border border-emerald-500/30 flex items-center justify-center shadow-sm ${currentSize} ${className}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4/6 h-4/6 text-emerald-400">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </div>
    );
  }

  // Slack / Teams Logo
  if (normalizedName.includes('slack') || normalizedName.includes('teams')) {
    return (
      <div className={`rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center shadow-sm ${currentSize} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4/6 h-4/6 text-purple-300">
          <path d="M6 15a2 2 0 1 1-2-2h2v2zm1 0a2 2 0 0 1 2-2 2 2 0 0 1 2 2v5a2 2 0 1 1-4 0v-5zm2-8a2 2 0 1 1 2-2v2H9zm0 1a2 2 0 0 1 2 2 2 2 0 0 1-2 2H4a2 2 0 1 1 0-4h5zm8 2a2 2 0 1 1 2 2h-2v-2zm-1 0a2 2 0 0 1-2 2 2 2 0 0 1-2-2V5a2 2 0 1 1 4 0v5zm-2 8a2 2 0 1 1-2 2v-2h2zm0-1a2 2 0 0 1-2-2 2 2 0 0 1 2-2h5a2 2 0 1 1 0 4h-5z" />
        </svg>
      </div>
    );
  }

  // SPF / DKIM / DMARC Security Logo
  if (normalizedName.includes('spf') || normalizedName.includes('dkim') || normalizedName.includes('dmarc') || normalizedName.includes('dns')) {
    return (
      <div className={`rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-600/30 border border-emerald-500/40 flex items-center justify-center shadow-sm ${currentSize} ${className}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4/6 h-4/6 text-emerald-400">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      </div>
    );
  }

  // Ocean.io / Prospeo / Scrape Logo
  if (normalizedName.includes('ocean') || normalizedName.includes('prospeo')) {
    return (
      <div className={`rounded-xl bg-gradient-to-br from-cyan-500/20 to-sky-600/30 border border-cyan-500/30 flex items-center justify-center shadow-sm ${currentSize} ${className}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4/6 h-4/6 text-cyan-400">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3v18" />
          <path d="M12 12 18.5 5.5" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </div>
    );
  }

  // Default Tech Node Logo
  return (
    <div className={`rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-600/30 border border-blue-500/30 flex items-center justify-center text-blue-300 shadow-sm ${currentSize} ${className}`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4/6 h-4/6 text-blue-400">
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    </div>
  );
};
