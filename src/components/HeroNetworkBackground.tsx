import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { LiveNetworkCanvas } from './LiveNetworkCanvas';
import { Activity, Radio, Sparkles } from 'lucide-react';

export const HeroNetworkBackground: React.FC = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Reliable high-tech network / plexus video URLs with high-quality compression
  const videoSources = [
    "https://assets.mixkit.co/videos/preview/mixkit-digital-network-connections-and-nodes-31835-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-plexus-connections-in-a-network-31834-large.mp4"
  ];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75; // Slower, more cinematic ambient flow
    }
  }, [videoLoaded]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* 1. Deep Base Contrast Layer */}
      <div className="absolute inset-0 bg-[#07090e]" />

      {/* 2. Real High-Tech Network Video Layer */}
      {!videoError && (
        <div className="absolute inset-0 opacity-25 lg:opacity-35 mix-blend-screen overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
            className={`w-full h-full object-cover object-center filter contrast-125 brightness-90 hue-rotate-15 transition-opacity duration-1000 ${
              videoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source src={videoSources[0]} type="video/mp4" />
            <source src={videoSources[1]} type="video/mp4" />
          </video>
        </div>
      )}

      {/* 3. Live Interactive Generative Network Canvas Mesh */}
      <LiveNetworkCanvas
        density={50}
        speed={0.35}
        opacity={0.7}
        interactive={true}
        className="z-10"
      />

      {/* 4. Ambient Cyber Conduit Beams & Sweeping Pulse Lines */}
      <div className="absolute inset-0 z-10">
        <svg className="w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="heroConduit1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0" />
              <stop offset="50%" stopColor="#93c5fd" stopOpacity="1" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Diagonal high-speed conduit path */}
          <path
            d="M -100 200 L 400 450 L 900 350 L 1600 650"
            fill="none"
            stroke="url(#heroConduit1)"
            strokeWidth="1.2"
            strokeDasharray="6 12"
          />

          <path
            d="M 200 -50 L 600 300 L 1200 200 L 1800 500"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="0.8"
            strokeOpacity="0.3"
            strokeDasharray="4 8"
          />
        </svg>

        {/* Sweeping radar scanner beam */}
        <motion.div
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-0 bottom-0 w-48 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent skew-x-12 pointer-events-none"
        />
      </div>

      {/* 5. Fine Scanline Cyber Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '100% 4px'
        }}
      />

      {/* 6. Multi-Directional Gradient Vignette to seamlessly blend into content */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#07090e]/60 via-transparent to-[#07090e] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#07090e]/90 via-transparent to-[#07090e]/90 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#07090e_90%)] pointer-events-none" />
    </div>
  );
};
