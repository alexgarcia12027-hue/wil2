import React, { useEffect, useRef, useState } from 'react';
import ThreeJSScene from '../3D/ThreeJSScene';
import GlassCard from '../3D/GlassCard';
import LottieAnimation, { ProfessionalAnimations } from '../3D/LottieAnimation';
import '../3D/GlassCard.css';
import '../../styles/ProfessionalTheme.css';

const EnhancedHero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 floating">
          <ThreeJSScene width={120} height={120} />
        </div>
        <div className="absolute top-40 right-20 floating-delayed">
          <ThreeJSScene width={80} height={80} />
        </div>
        <div className="absolute bottom-32 left-1/4 floating">
          <ThreeJSScene width={100} height={100} />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'slide-in-up' : 'opacity-0'}`}>
          {/* Logo Animation */}
          <div className="mb-8 flex justify-center">
            <LottieAnimation 
              animationData={ProfessionalAnimations.star}
              width={80}
              height={80}
              trigger="load"
              autoplay={true}
            />
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
            <span className="block">Abogado</span>
            <span className="block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Wilson
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Servicios Legales Profesionales con Tecnología Avanzada
            <br />
            <span className="text-lg opacity-90">IA • MCP • Automatización • Excelencia</span>
          </p>

          {/* Glass Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <GlassCard 
              className="fade-in" 
              glowColor="#667eea"
              enableTilt={true}
              enableGlow={true}
              enableParticles={true}
            >
              <div className="text-center p-4">
                <LottieAnimation 
                  animationData={ProfessionalAnimations.success}
                  width={40}
                  height={40}
                  trigger="hover"
                  className="mx-auto mb-4"
                />
                <h3 className="text-white font-semibold mb-2">IA Legal</h3>
                <p className="text-blue-100 text-sm">
                  Análisis inteligente con Google Gemini
                </p>
              </div>
            </GlassCard>

            <GlassCard 
              className="fade-in" 
              glowColor="#764ba2"
              enableTilt={true}
              enableGlow={true}
              enableParticles={true}
            >
              <div className="text-center p-4">
                <LottieAnimation 
                  animationData={ProfessionalAnimations.arrow}
                  width={40}
                  height={40}
                  trigger="hover"
                  className="mx-auto mb-4"
                />
                <h3 className="text-white font-semibold mb-2">MCP Integrado</h3>
                <p className="text-blue-100 text-sm">
                  Protocolos profesionales avanzados
                </p>
              </div>
            </GlassCard>

            <GlassCard 
              className="fade-in" 
              glowColor="#4CAF50"
              enableTilt={true}
              enableGlow={true}
              enableParticles={true}
            >
              <div className="text-center p-4">
                <LottieAnimation 
                  animationData={ProfessionalAnimations.heart}
                  width={40}
                  height={40}
                  trigger="hover"
                  className="mx-auto mb-4"
                />
                <h3 className="text-white font-semibold mb-2">24/7 Disponible</h3>
                <p className="text-blue-100 text-sm">
                  Atención profesional continua
                </p>
              </div>
            </GlassCard>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="btn-3d glass-primary px-8 py-4 rounded-xl text-white font-semibold text-lg hover:scale-105 transition-all duration-300 glow">
              <span className="flex items-center gap-2">
                <LottieAnimation 
                  animationData={ProfessionalAnimations.arrow}
                  width={20}
                  height={20}
                  trigger="hover"
                />
                Consulta Gratuita
              </span>
            </button>

            <button className="btn-3d glass border-2 border-white/30 px-8 py-4 rounded-xl text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300">
              <span className="flex items-center gap-2">
                <LottieAnimation 
                  animationData={ProfessionalAnimations.info}
                  width={20}
                  height={20}
                  trigger="hover"
                />
                Conocer Más
              </span>
            </button>
          </div>

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '500+', label: 'Casos Exitosos', icon: ProfessionalAnimations.success },
              { number: '15+', label: 'Años Experiencia', icon: ProfessionalAnimations.star },
              { number: '24/7', label: 'Disponibilidad', icon: ProfessionalAnimations.info },
              { number: '100%', label: 'Satisfacción', icon: ProfessionalAnimations.heart }
            ].map((stat, index) => (
              <GlassCard 
                key={index}
                className={`text-center p-4 ${isVisible ? 'scale-in' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                glowColor="#667eea"
                enableTilt={false}
                enableGlow={true}
              >
                <LottieAnimation 
                  animationData={stat.icon}
                  width={30}
                  height={30}
                  trigger="scroll"
                  className="mx-auto mb-2"
                />
                <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-blue-100 text-sm">{stat.label}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <LottieAnimation 
            animationData={ProfessionalAnimations.arrow}
            width={30}
            height={30}
            trigger="load"
            autoplay={true}
            className="rotate-90 text-white"
          />
        </div>
      </div>
    </section>
  );
};

export default EnhancedHero;
