import React, { useState, useEffect } from 'react';
import GlassCard from '../3D/GlassCard';
import LottieAnimation, { ProfessionalAnimations } from '../3D/LottieAnimation';
import { toast } from 'react-hot-toast';

const PWAInstaller = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
    
    // Check if iOS
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);
    
    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      toast.success('¡App instalada exitosamente!');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      setShowInstallPrompt(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      toast.success('Instalación iniciada...');
    } else {
      toast.info('Instalación cancelada');
    }
    
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const dismissPrompt = () => {
    setShowInstallPrompt(false);
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  // Don't show if already installed or dismissed recently
  if (isInstalled || isStandalone) return null;
  
  const dismissedTime = localStorage.getItem('pwa-install-dismissed');
  if (dismissedTime && Date.now() - parseInt(dismissedTime) < 7 * 24 * 60 * 60 * 1000) {
    return null;
  }

  if (!showInstallPrompt && !isIOS) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <GlassCard className="p-4 animate-slide-in-up" glowColor="#667eea">
        <div className="flex items-start gap-3">
          <LottieAnimation
            animationData={ProfessionalAnimations.info}
            width={40}
            height={40}
            autoplay={true}
          />
          
          <div className="flex-1">
            <h3 className="text-white font-semibold mb-1">
              Instalar App
            </h3>
            <p className="text-gray-300 text-sm mb-3">
              {isIOS 
                ? 'Agrega esta app a tu pantalla de inicio para un acceso rápido'
                : 'Instala nuestra app para una mejor experiencia'
              }
            </p>
            
            {isIOS ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <span>1.</span>
                  <span>Toca el botón compartir</span>
                  <span className="text-blue-400">⬆️</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <span>2.</span>
                  <span>Selecciona "Agregar a pantalla de inicio"</span>
                  <span className="text-blue-400">📱</span>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleInstallClick}
                  className="btn-3d glass-primary px-4 py-2 rounded-lg text-white text-sm font-medium flex items-center gap-2"
                >
                  <LottieAnimation
                    animationData={ProfessionalAnimations.success}
                    width={16}
                    height={16}
                    trigger="hover"
                  />
                  Instalar
                </button>
                <button
                  onClick={dismissPrompt}
                  className="btn-3d glass px-3 py-2 rounded-lg text-gray-300 text-sm border border-white/20"
                >
                  Después
                </button>
              </div>
            )}
          </div>
          
          <button
            onClick={dismissPrompt}
            className="text-gray-400 hover:text-white text-sm"
          >
            ✕
          </button>
        </div>
      </GlassCard>
    </div>
  );
};

export default PWAInstaller;
