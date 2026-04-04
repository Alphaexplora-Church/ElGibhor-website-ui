import React, { useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { Link } from 'react-router-dom';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  to?: string;
  href?: string;
  strength?: number; // How far it pulls
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({ 
  children, 
  className = "", 
  onClick,
  to,
  href,
  strength = 30
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isDesktop = useMediaQuery('(min-width: 768px)');
  
  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop || !ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const x = ((clientX - centerX) / width) * strength;
    const y = ((clientY - centerY) / height) * strength;
    setPosition({ x, y });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };

  const innerContent = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: isDesktop ? position.x : 0, y: isDesktop ? position.y : 0 }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      whileTap={{ scale: 0.95 }}
      style={{
           // Framer Motion spring physics.
      }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );

  if (to) {
    return <Link to={to} className="inline-block">{innerContent}</Link>;
  }
  
  if (href) {
    return <a href={href} className="inline-block">{innerContent}</a>;
  }

  return innerContent;
};
