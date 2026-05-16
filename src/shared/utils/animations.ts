export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.6, ease: [0.6, 0.05, -0.01, 0.9] }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

// Morphing path sequence for the global background
export const morphingPaths = [
  // Initial shape (calm)
  "M30,50 C40,20 80,20 100,50 C120,80 80,120 50,100 C20,80 10,80 30,50",
  // Shape 2 (expanding)
  "M40,40 C50,10 90,30 110,60 C130,90 70,110 40,90 C10,70 20,60 40,40",
  // Shape 3 (flowing)
  "M20,60 C30,30 70,10 90,40 C110,70 90,130 60,110 C30,90 10,90 20,60",
];
