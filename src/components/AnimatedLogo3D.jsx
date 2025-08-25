import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AnimatedLogo3D = ({ size = 'large' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32'
  };

  const textClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  return (
    <motion.div 
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Efecto de brillo que sigue el mouse */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none rounded-full"
        style={{
          background: `radial-gradient(100px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.6), transparent 40%)`,
        }}
      />
      
      <motion.div 
        className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center shadow-xl relative overflow-hidden border-4 border-white`}
        animate={{
          rotateY: isHovered ? [0, 10, -10, 0] : 0,
          rotateX: isHovered ? [0, -5, 5, 0] : 0
        }}
        transition={{ 
          duration: 0.8,
          repeat: isHovered ? Infinity : 0,
          repeatType: "reverse"
        }}
        style={{
          transformStyle: 'preserve-3d',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 5px 10px -5px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Efecto de brillo interno */}
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute w-1/2 h-1/2 bg-white rounded-full blur-lg"
            style={{
              top: '10%',
              left: '10%',
            }}
          />
        </div>
        
        {/* Icono de balanza legal estilizado */}
        <div className="relative z-10 text-white">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className={`${size === 'small' ? 'w-8 h-8' : size === 'medium' ? 'w-12 h-12' : 'w-16 h-16'}`}
          >
            <path 
              fillRule="evenodd" 
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM9 7.5A.75.75 0 009 7.5zm4.5 0a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V8.25A.75.75 0 0113.5 7.5zm-.75 6a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75H12.75zm4.5 0a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75H17.25z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
      </motion.div>
      
      {/* Texto con efecto 3D */}
      <motion.div 
        className={`mt-2 text-center font-bold text-secondary-900 ${textClasses[size]}`}
        animate={{
          textShadow: isHovered ? ['0 0 0px rgba(0,0,0,0)', '0 0 10px rgba(59, 130, 246, 0.5)', '0 0 0px rgba(0,0,0,0)'] : 'none'
        }}
        transition={{ 
          duration: 1,
          repeat: isHovered ? Infinity : 0
        }}
      >
        Abogado Wilson
      </motion.div>
    </motion.div>
  );
};

export default AnimatedLogo3D;