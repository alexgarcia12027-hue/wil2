import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AnimatedButton3D = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  onClick, 
  disabled = false,
  className = '',
  icon,
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

  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 transform";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800 focus:ring-blue-500",
    secondary: "bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800 focus:ring-gray-500",
    success: "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 focus:ring-green-500",
    danger: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 focus:ring-red-500",
    outline: "bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
    ghost: "bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-500"
  };
  
  const sizeClasses = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg"
  };
  
  const disabledClasses = "opacity-50 cursor-not-allowed";
  
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? disabledClasses : ''} ${className}`;

  return (
    <motion.button
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        y: -2,
        scale: 1.02,
        boxShadow: variant === 'primary' 
          ? '0 10px 25px -5px rgba(59, 130, 246, 0.3), 0 5px 10px -5px rgba(59, 130, 246, 0.2)'
          : '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 5px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      whileTap={{ scale: 0.98 }}
      style={{
        transformStyle: 'preserve-3d',
      }}
      {...props}
    >
      {/* Efecto de brillo que sigue el mouse */}
      {isHovered && !disabled && (
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none rounded-lg"
          style={{
            background: `radial-gradient(100px circle at ${mousePosition.x % 100}px ${mousePosition.y % 100}px, rgba(255,255,255,0.6), transparent 40%)`,
          }}
        />
      )}
      
      <span className="relative z-10 flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </span>
    </motion.button>
  );
};

export default AnimatedButton3D;