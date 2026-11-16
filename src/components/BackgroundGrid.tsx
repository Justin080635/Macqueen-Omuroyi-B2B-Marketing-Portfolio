import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { LiveNetworkCanvas } from './LiveNetworkCanvas';

export const BackgroundGrid: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const opacityParallax = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 0.5, 0.75]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Deep dark base canvas */}
      <div className="absolute inset-0 bg-[#07090e]" />

      {/* Global Live Ambient Network Canvas Particle System */}
      <LiveNetworkCanvas
        density={28}
        speed={0.25}
        opacity={0.45}
        interactive={true}
        className="opacity-70"
      />

      {/* Subtle pulsing radial ambient blue glows reflecting tech infrastructure */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.12, 0.18, 0.12]
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[850px] h-[650px] rounded-full bg-blue-600/15 blur-[150px]"
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.08, 0.14, 0.08]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3
        }}
        className="absolute top-[40%] -left-[10%] w-[650px] h-[550px] rounded-full bg-indigo-600/12 blur-[160px]"
      />

      <motion.div
        animate={{
          scale: [1, 1.18, 1],
          opacity: [0.1, 0.16, 0.1]
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 6
        }}
        className="absolute top-[75%] -right-[10%] w-[750px] h-[650px] rounded-full bg-blue-500/12 blur-[170px]"
      />

      {/* Interactive Grid Pattern with Parallax */}
      <motion.div 
        style={{ y: yParallax, opacity: opacityParallax }}
        className="absolute inset-0 bg-grid-pattern opacity-35"
      />

      {/* Floating Network Conduits with Animated Data Pulses */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="globalGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="globalGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#1e40af" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Node lines across viewport */}
          <line x1="8%" y1="18%" x2="38%" y2="22%" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 8" className="animate-pulse" />
          <line x1="65%" y1="12%" x2="88%" y2="30%" stroke="#60a5fa" strokeWidth="1" strokeDasharray="3 6" />
          <line x1="25%" y1="55%" x2="68%" y2="62%" stroke="#3b82f6" strokeWidth="1" strokeDasharray="5 10" />
          <line x1="15%" y1="85%" x2="82%" y2="88%" stroke="#3b82f6" strokeWidth="0.8" strokeDasharray="6 12" />

          {/* Glowing Static Anchors */}
          <circle cx="8%" cy="18%" r="3" fill="#3b82f6" />
          <circle cx="38%" cy="22%" r="2" fill="#60a5fa" />
          <circle cx="65%" cy="12%" r="2.5" fill="#3b82f6" />
          <circle cx="88%" cy="30%" r="3" fill="#60a5fa" />
          <circle cx="25%" cy="55%" r="2.5" fill="#3b82f6" />
          <circle cx="68%" cy="62%" r="3" fill="#60a5fa" />
          <circle cx="15%" cy="85%" r="2.5" fill="#3b82f6" />
          <circle cx="82%" cy="88%" r="3" fill="#3b82f6" />
        </svg>

        {/* Vertical subtle data beam traveling down */}
        <motion.div
          animate={{
            y: ['-100%', '300%']
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute left-[18%] w-[1px] h-96 bg-gradient-to-b from-transparent via-blue-400/30 to-transparent pointer-events-none"
        />

        <motion.div
          animate={{
            y: ['-100%', '300%']
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'linear',
            delay: 7
          }}
          className="absolute right-[22%] w-[1px] h-96 bg-gradient-to-b from-transparent via-cyan-400/25 to-transparent pointer-events-none"
        />
      </div>

      {/* Top vignette & Edge fades */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,#07090e_85%)]" />
    </div>
  );
};
