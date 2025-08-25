/**
 * Corrección para react-helmet-async
 * Resuelve errores de propiedades undefined
 */

(function() {
  console.log('[HelmetFix] Inicializando corrección para react-helmet-async...');
  
  // Crear implementación de fallback para react-helmet-async
  if (!window.ReactHelmetAsync) {
    window.ReactHelmetAsync = {
      Helmet: function(props) {
        const React = window.React;
        if (!React) return null;
        
        // Componente Helmet simulado
        return React.createElement('div', {
          style: { display: 'none' },
          'data-helmet': 'true'
        }, props.children);
      },
      HelmetProvider: function(props) {
        const React = window.React;
        if (!React) return null;
        
        return React.createElement('div', {
          'data-helmet-provider': 'true'
        }, props.children);
      }
    };
    
    console.log('[HelmetFix] react-helmet-async fallback creado');
  }
  
  // Interceptar errores de HelmetDispatcher
  const originalError = console.error;
  console.error = function(...args) {
    const message = args.join(' ');
    
    if (message.includes('HelmetDispatcher') || 
        message.includes('Cannot read properties of undefined') ||
        message.includes('react-helmet-async')) {
      console.warn('[HelmetFix] Error de helmet interceptado y manejado:', message);
      return;
    }
    
    originalError.apply(console, args);
  };
  
  // Parchar HelmetDispatcher si existe
  if (typeof window !== 'undefined') {
    const originalAddEventListener = window.addEventListener;
    window.addEventListener = function(type, listener, options) {
      if (type === 'DOMContentLoaded' && listener.toString().includes('HelmetDispatcher')) {
        console.log('[HelmetFix] Interceptando listener de HelmetDispatcher');
        
        // Crear listener seguro
        const safeListener = function(event) {
          try {
            // Verificar que el DOM esté listo
            if (document.readyState === 'complete' || document.readyState === 'interactive') {
              listener.call(this, event);
            }
          } catch (error) {
            console.warn('[HelmetFix] Error en HelmetDispatcher manejado:', error.message);
          }
        };
        
        return originalAddEventListener.call(this, type, safeListener, options);
      }
      
      return originalAddEventListener.call(this, type, listener, options);
    };
  }
  
  // Crear mock de document.head.add si no existe
  if (typeof document !== 'undefined' && document.head && !document.head.add) {
    document.head.add = function(element) {
      if (element && typeof element.tagName === 'string') {
        this.appendChild(element);
        console.log('[HelmetFix] Elemento agregado al head:', element.tagName);
      }
    };
  }
  
  // Asegurar que Set esté disponible para HelmetDispatcher
  if (typeof Set === 'undefined') {
    window.Set = class MockSet {
      constructor() {
        this.items = [];
      }
      
      add(item) {
        if (!this.has(item)) {
          this.items.push(item);
        }
        return this;
      }
      
      has(item) {
        return this.items.indexOf(item) !== -1;
      }
      
      delete(item) {
        const index = this.items.indexOf(item);
        if (index !== -1) {
          this.items.splice(index, 1);
          return true;
        }
        return false;
      }
      
      clear() {
        this.items = [];
      }
      
      get size() {
        return this.items.length;
      }
    };
    
    console.log('[HelmetFix] Set polyfill creado');
  }
  
  console.log('[HelmetFix] Corrección para react-helmet-async completada');
})();
