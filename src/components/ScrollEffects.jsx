import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollEffects = ({ children }) => {
  const { scrollYProgress } = useScroll();
  const [scrollY, setScrollY] = useState(0);

  // Transform values for parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '200%']);

  useEffect(() => {
    const updateScrollY = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', updateScrollY);
    return () => window.removeEventListener('scroll', updateScrollY);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Animated background particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Floating elements that move with scroll */}
      <motion.div
        className="fixed top-20 right-10 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-xl pointer-events-none z-10"
        style={{ y: backgroundY }}
      />

      <motion.div
        className="fixed bottom-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-xl pointer-events-none z-10"
        style={{ y: textY }}
      />

      {/* 3D tilt effect on scroll */}
      <motion.div
        style={{
          rotateX: useTransform(scrollYProgress, [0, 0.5, 1], [0, 5, 0]),
          rotateY: useTransform(scrollYProgress, [0, 0.5, 1], [0, -5, 0]),
        }}
        className="relative z-20"
      >
        {children}
      </motion.div>

      {/* Glassmorphism overlay */}
      <div className="fixed inset-0 pointer-events-none z-5">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-blue-500/5 backdrop-blur-[0.5px]" />
      </div>
    </div>
  );
};

export default ScrollEffects;
