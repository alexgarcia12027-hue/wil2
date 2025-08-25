import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner3D = ({ size = 'medium', color = 'blue' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    red: 'text-red-600',
    purple: 'text-purple-600',
    yellow: 'text-yellow-600'
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`${sizeClasses[size]} ${colorClasses[color]} relative`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Outer ring with 3D effect */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-current opacity-30"></div>
        
        {/* Main spinning ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-current"></div>
        
        {/* Inner ring for depth */}
        <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-current opacity-50"></div>
        
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-current"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner3D;