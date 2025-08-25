import React, { useEffect, useRef, useState } from 'react';
import './LottieAnimation.css';

const LottieAnimation = ({ 
  animationData, 
  width = 100, 
  height = 100, 
  loop = true, 
  autoplay = true,
  className = '',
  trigger = 'load', // 'load', 'hover', 'click', 'scroll'
  delay = 0
}) => {
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(autoplay && trigger === 'load');

  useEffect(() => {
    // Create CSS-based animation if no Lottie data provided
    if (!animationData) {
      setIsLoaded(true);
      return;
    }

    // For now, create CSS animations as fallback
    // In production, you would use lottie-web library
    const loadAnimation = async () => {
      try {
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, delay));
        setIsLoaded(true);
        
        if (trigger === 'load' && autoplay) {
          setShouldPlay(true);
        }
      } catch (error) {
        console.error('Animation loading error:', error);
        setIsLoaded(true);
      }
    };

    loadAnimation();
  }, [animationData, autoplay, trigger, delay]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isLoaded) return;

    const handleTrigger = () => {
      setShouldPlay(true);
    };

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (isVisible) {
        setShouldPlay(true);
      }
    };

    switch (trigger) {
      case 'hover':
        container.addEventListener('mouseenter', handleTrigger);
        break;
      case 'click':
        container.addEventListener('click', handleTrigger);
        break;
      case 'scroll':
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial position
        break;
    }

    return () => {
      container.removeEventListener('mouseenter', handleTrigger);
      container.removeEventListener('click', handleTrigger);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [trigger, isLoaded]);

  const getAnimationType = () => {
    if (animationData?.type) return animationData.type;
    return 'pulse'; // default
  };

  return (
    <div 
      ref={containerRef}
      className={`lottie-animation ${className} ${shouldPlay ? 'playing' : ''} ${getAnimationType()}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease'
      }}
    >
      {/* CSS-based animations for professional micro-interactions */}
      <div className="animation-content">
        {animationData?.icon && (
          <div className="icon-wrapper">
            {animationData.icon}
          </div>
        )}
        {!animationData && (
          <div className="default-animation">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        )}
      </div>
    </div>
  );
};

// Pre-built professional animations
export const ProfessionalAnimations = {
  loading: {
    type: 'loading',
    icon: null
  },
  success: {
    type: 'success',
    icon: '✓'
  },
  error: {
    type: 'error',
    icon: '✕'
  },
  warning: {
    type: 'warning',
    icon: '⚠'
  },
  info: {
    type: 'info',
    icon: 'ℹ'
  },
  heart: {
    type: 'heart',
    icon: '♥'
  },
  star: {
    type: 'star',
    icon: '★'
  },
  arrow: {
    type: 'arrow',
    icon: '→'
  }
};

export default LottieAnimation;
