import React, { useEffect, useRef, useState } from 'react';
import './CursorFollower.css';

const CursorFollower = ({ 
  enabled = true,
  glowColor = '#667eea',
  trailLength = 20,
  size = 20
}) => {
  const cursorRef = useRef(null);
  const trailRef = useRef([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    let animationId;
    const trail = [];

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Add current position to trail
      trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
      
      // Keep trail length manageable
      if (trail.length > trailLength) {
        trail.shift();
      }

      trailRef.current = trail;
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Animation loop for smooth trail
    const animate = () => {
      const currentTime = Date.now();
      
      // Filter out old trail points
      trailRef.current = trailRef.current.filter(point => 
        currentTime - point.time < 1000
      );

      animationId = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [enabled, trailLength]);

  if (!enabled || !isVisible) return null;

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="cursor-follower"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: size,
          height: size,
          backgroundColor: glowColor,
          boxShadow: `0 0 ${size}px ${glowColor}`,
        }}
      />

      {/* Trail particles */}
      {trailRef.current.map((point, index) => {
        const age = (Date.now() - point.time) / 1000;
        const opacity = Math.max(0, 1 - age);
        const scale = Math.max(0.1, 1 - age);
        
        return (
          <div
            key={`${point.x}-${point.y}-${point.time}`}
            className="cursor-trail"
            style={{
              left: point.x,
              top: point.y,
              width: size * scale,
              height: size * scale,
              backgroundColor: glowColor,
              opacity: opacity * 0.6,
              transform: `translate(-50%, -50%) scale(${scale})`,
              boxShadow: `0 0 ${size * scale}px ${glowColor}`,
            }}
          />
        );
      })}
    </>
  );
};

export default CursorFollower;
