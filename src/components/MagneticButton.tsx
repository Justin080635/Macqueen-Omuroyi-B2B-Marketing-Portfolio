import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

interface MagneticButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  onClick?: () => void;
  className?: string;
  id?: string;
  href?: string;
  icon?: React.ReactNode;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
  className = '',
  id,
  href,
  icon
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    
    // Calculate distance from center
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = (clientX - centerX) * 0.28;
    const deltaY = (clientY - centerY) * 0.28;
    
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variantStyles = {
    primary:
      'bg-blue-600 hover:bg-blue-500 text-white font-medium border border-blue-500/60 shadow-[0_0_20px_rgba(37,99,235,0.35)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]',
    secondary:
      'bg-slate-900/90 hover:bg-slate-800 text-slate-100 font-medium border border-slate-700/80 hover:border-blue-500/50 shadow-md hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]',
    outline:
      'bg-transparent hover:bg-blue-950/40 text-blue-300 hover:text-white font-medium border border-blue-500/40 hover:border-blue-400 shadow-sm',
    ghost:
      'bg-transparent hover:bg-slate-800/60 text-slate-300 hover:text-white font-medium border border-transparent'
  };

  const content = (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <motion.button
        id={id}
        onClick={onClick}
        animate={{ x: position.x, y: position.y }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 350, damping: 20, mass: 0.5 }}
        className={`group relative overflow-hidden rounded-lg px-6 py-3 min-h-[48px] min-w-[48px] flex items-center justify-center gap-2.5 text-sm tracking-wide transition-all duration-300 cursor-pointer ${variantStyles[variant]} ${className}`}
      >
        {/* Subtle background shine sweep on hover */}
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
        
        {/* Button Content */}
        <span className="relative z-10 flex items-center gap-2">
          {children}
          {icon && <span className="transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>}
        </span>
      </motion.button>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block no-underline">
        {content}
      </a>
    );
  }

  return content;
};
