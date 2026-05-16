import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useMousePosition } from '../hooks/useMousePosition';

export const CustomCursor: React.FC = () => {
  const { x, y } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);

  // Smooth out the movement
  const springX = useSpring(x, { stiffness: 500, damping: 28 });
  const springY = useSpring(y, { stiffness: 500, damping: 28 });

  useEffect(() => {
    // Update spring targets when mouse moves
    springX.set(x);
    springY.set(y);
  }, [x, y, springX, springY]);

  useEffect(() => {
    // Determine if the user is hovering over something interactive
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = window.getComputedStyle(target).cursor === 'pointer' || 
                            target.tagName.toLowerCase() === 'a' ||
                            target.tagName.toLowerCase() === 'button';
      setIsHovering(isInteractive);
    };

    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-2 border-gold rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0 : 1
        }}
        transition={{ duration: 0.2 }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-gold rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{
          x: x, // Instant follow for the dot
          y: y,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          scale: isHovering ? 4 : 1,
          opacity: isHovering ? 0.5 : 1
        }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
};
