import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useAnimationFrame } from 'framer-motion';
import { useMousePosition } from '../hooks/useMousePosition';
import { useDeviceOrientation } from '../hooks/useDeviceOrientation';
import { useMediaQuery } from '../hooks/useMediaQuery';

interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export const PremiumCard: React.FC<PremiumCardProps> = ({ 
  children, 
  className = "", 
  glowColor = "rgba(239, 191, 4, 0.15)" // Default gold glow
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMousePosition();
  const orientation = useDeviceOrientation();
  const isDesktop = useMediaQuery('(min-width: 768px)');
  
  // Motion values for smooth transition
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  
  const smoothX = useSpring(glowX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(glowY, { stiffness: 50, damping: 20 });

  useAnimationFrame(() => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    if (isDesktop) {
      // Desktop: Follow Mouse
      const x = mousePosition.x - rect.left;
      const y = mousePosition.y - rect.top;
      
      // Calculate percentage
      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;
      
      glowX.set(percentX);
      glowY.set(percentY);
    } else if (orientation.hasPermission) {
      // Mobile with Gyroscope: Map tilt to coordinates
      // orientation.x and orientation.y are roughly -1 to 1
      const percentX = ((orientation.x + 1) / 2) * 100;
      const percentY = ((orientation.y + 1) / 2) * 100;
      
      glowX.set(Math.min(Math.max(percentX, 0), 100));
      glowY.set(Math.min(Math.max(percentY, 0), 100));
    }
  });

  const isFallbackPulse = !isDesktop && !orientation.hasPermission;

  return (
    <div 
      ref={cardRef} 
      className={`relative overflow-hidden group ${className}`}
    >
      {/* The Glow Layer */}
      <motion.div 
        className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-500 ease-in-out ${isFallbackPulse ? 'animate-pulse opacity-50' : 'opacity-0 group-hover:opacity-100'}`}
        style={{
          background: isFallbackPulse ? `radial-gradient(circle at 50% 50%, ${glowColor}, transparent 70%)` : undefined,
          ...(isFallbackPulse ? {} : {
            backgroundImage: `radial-gradient(circle at center, ${glowColor}, transparent 60%)`,
            // We use standard CSS mask or background-position to move the glow
            backgroundPosition: smoothX.get() + '% ' + smoothY.get() + '%',
            // Update the inline styles imperatively via framer
          })
        }}
        // Framer motion style prop for dynamic updates
        {...(!isFallbackPulse && {
          style: {
            background: `radial-gradient(circle at ${smoothX.get()}% ${smoothY.get()}%, ${glowColor}, transparent 70%)`
          } as any // cast to any because we need reactive styles
        })} 
      />
      
      {/* Content wrapper */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};
