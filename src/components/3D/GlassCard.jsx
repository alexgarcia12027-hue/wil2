import React, { useState, useRef, useEffect } from 'react';
import './GlassCard.css';

const GlassCard = ({ 
  children, 
  className = '', 
  glowColor = '#667eea',
  enableTilt = true,
  enableGlow = true,
  enableParticles = false
}) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || !enableTilt) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      setMousePosition({ x: rotateX, y: rotateY });
      
      card.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        translateZ(10px)
      `;
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setMousePosition({ x: 0, y: 0 });
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enableTilt]);

  return (
    <div 
      ref={cardRef}
      className={`glass-card ${className} ${isHovered ? 'hovered' : ''}`}
      style={{
        '--glow-color': glowColor,
        '--mouse-x': `${mousePosition.x}deg`,
        '--mouse-y': `${mousePosition.y}deg`
      }}
    >
      {enableGlow && (
        <div className="glass-card-glow" style={{ backgroundColor: glowColor }} />
      )}
      
      <div className="glass-card-content">
        {children}
      </div>

      {enableParticles && isHovered && (
        <div className="glass-card-particles">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="particle" style={{ 
              animationDelay: `${i * 0.1}s`,
              backgroundColor: glowColor 
            }} />
          ))}
        </div>
      )}

      <div className="glass-card-reflection" />
    </div>
  );
};

export default GlassCard;
