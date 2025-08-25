import React, { createContext, useContext, useState, useEffect } from 'react';

const Effects3DContext = createContext();

export const use3DEffects = () => {
  const context = useContext(Effects3DContext);
  if (!context) {
    throw new Error('use3DEffects must be used within a Effects3DProvider');
  }
  return context;
};

export const Effects3DProvider = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [is3DEnabled, setIs3DEnabled] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const value = {
    mousePosition,
    is3DEnabled,
    setIs3DEnabled
  };

  return (
    <Effects3DContext.Provider value={value}>
      {children}
    </Effects3DContext.Provider>
  );
};