import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  alpha: number;
  pulseSpeed: number;
  pulseOffset: number;
}

interface LiveNetworkCanvasProps {
  density?: number;
  interactive?: boolean;
  opacity?: number;
  speed?: number;
  className?: string;
}

export const LiveNetworkCanvas: React.FC<LiveNetworkCanvasProps> = ({
  density = 45,
  interactive = true,
  opacity = 0.65,
  speed = 0.4,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Responsive particle count based on screen size
    const particleCount = Math.floor((width * height) / (1920 * 1080) * density);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const baseRadius = Math.random() * 1.8 + 0.8;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        radius: baseRadius,
        baseRadius,
        alpha: Math.random() * 0.5 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mousePos.current = { x: null, y: null };
    };

    window.addEventListener('resize', handleResize);
    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    let time = 0;
    const maxDistance = 140; // distance threshold for drawing connecting lines
    const mouseRadius = 180; // distance threshold for mouse interaction

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        // Mouse influence
        if (mousePos.current.x !== null && mousePos.current.y !== null) {
          const dx = mousePos.current.x - p.x;
          const dy = mousePos.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseRadius) {
            const force = (1 - dist / mouseRadius) * 0.8;
            p.x -= (dx / dist) * force * 1.5;
            p.y -= (dy / dist) * force * 1.5;
          }
        }

        // Breathing pulse effect
        const pulse = Math.sin(time * p.pulseSpeed * 60 + p.pulseOffset);
        const currentRadius = Math.max(0.5, p.baseRadius + pulse * 0.5);
        const currentAlpha = Math.max(0.1, p.alpha + pulse * 0.15);

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${currentAlpha * opacity})`;
        ctx.shadowBlur = currentRadius > 1.8 ? 8 : 0;
        ctx.shadowColor = 'rgba(59, 130, 246, 0.6)';
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.22 * opacity;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // Occasional traveling data packet on connection
            if (dist < 90 && Math.sin(time * 2 + i + j) > 0.98) {
              const progress = (Math.sin(time * 3 + i) + 1) / 2;
              const packetX = p.x + (p2.x - p.x) * progress;
              const packetY = p.y + (p2.y - p.y) * progress;
              ctx.beginPath();
              ctx.arc(packetX, packetY, 1.2, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(147, 197, 253, ${0.8 * opacity})`;
              ctx.fill();
            }
          }
        }

        // Draw lines to mouse pointer if close
        if (mousePos.current.x !== null && mousePos.current.y !== null) {
          const dx = mousePos.current.x - p.x;
          const dy = mousePos.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const mouseLineAlpha = (1 - dist / 120) * 0.35 * opacity;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mousePos.current.x, mousePos.current.y);
            ctx.strokeStyle = `rgba(96, 165, 250, ${mouseLineAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [density, interactive, opacity, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ display: 'block' }}
    />
  );
};
