import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Card3D = ({ 
  children, 
  className = '', 
  hoverEffect = true, 
  glassEffect = true,
  borderColor = 'blue',
  ...props 
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const borderClasses = {
    blue: 'border-blue-500/30',
    green: 'border-green-500/30',
    red: 'border-red-500/30',
    purple: 'border-purple-500/30',
    yellow: 'border-yellow-500/30'
  };

  const glassClasses = glassEffect 
    ? 'bg-white/80 backdrop-blur-lg' 
    : 'bg-white';

  const hoverClasses = hoverEffect 
    ? 'hover:shadow-xl' 
    : '';

  const combinedClasses = `rounded-xl p-6 shadow-lg border ${glassClasses} ${borderClasses[borderColor]} ${hoverClasses} ${className} relative overflow-hidden`;

  return (
    <motion.div
      className={combinedClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={hoverEffect ? { 
        y: -5,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      } : {}}
      style={{
        transformStyle: 'preserve-3d',
      }}
      {...props}
    >
      {/* Efecto de brillo que sigue el mouse */}
      {isHovered && hoverEffect && (
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none rounded-xl"
          style={{
            background: `radial-gradient(200px circle at ${mousePosition.x % 200}px ${mousePosition.y % 200}px, rgba(255,255,255,0.5), transparent 40%)`,
          }}
        />
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default Card3D;