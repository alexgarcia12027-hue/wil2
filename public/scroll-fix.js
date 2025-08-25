/**
 * Corrección avanzada para problemas de scroll y recargas
 * Previene recargas innecesarias durante el scroll
 */

(function() {
  console.log('[ScrollFix] Inicializando corrección avanzada de scroll...');
  
  // Estado global del scroll
  window.__SCROLL_STATE__ = {
    isScrolling: false,
    lastScrollTop: 0,
    scrollTimeout: null,
    preventReload: false,
    positions: new Map()
  };
  
  // Prevenir recargas durante el scroll
  function preventScrollReload() {
    const originalReload = window.location.reload;
    
    window.location.reload = function(forcedReload) {
      if (window.__SCROLL_STATE__.isScrolling) {
        console.log('[ScrollFix] Recarga prevenida durante scroll');
        return;
      }
      
      return originalReload.call(this, forcedReload);
    };
  }
  
  // Interceptar eventos de scroll
  function handleScroll() {
    window.__SCROLL_STATE__.isScrolling = true;
    window.__SCROLL_STATE__.preventReload = true;
    
    // Limpiar timeout anterior
    if (window.__SCROLL_STATE__.scrollTimeout) {
      clearTimeout(window.__SCROLL_STATE__.scrollTimeout);
    }
    
    // Establecer timeout para finalizar scroll
    window.__SCROLL_STATE__.scrollTimeout = setTimeout(() => {
      window.__SCROLL_STATE__.isScrolling = false;
      window.__SCROLL_STATE__.preventReload = false;
    }, 150);
    
    // Guardar posición actual
    const currentPath = window.location.pathname;
    window.__SCROLL_STATE__.positions.set(currentPath, {
      top: window.pageYOffset || document.documentElement.scrollTop,
      left: window.pageXOffset || document.documentElement.scrollLeft,
      timestamp: Date.now()
    });
  }
  
  // Interceptar navegación durante scroll
  function interceptNavigation() {
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;
    
    history.pushState = function(state, title, url) {
      if (window.__SCROLL_STATE__.isScrolling) {
        console.log('[ScrollFix] Navegación diferida durante scroll');
        setTimeout(() => {
          originalPushState.call(this, state, title, url);
        }, 200);
        return;
      }
      
      return originalPushState.call(this, state, title, url);
    };
    
    history.replaceState = function(state, title, url) {
      if (window.__SCROLL_STATE__.isScrolling) {
        console.log('[ScrollFix] ReplaceState diferido durante scroll');
        setTimeout(() => {
          originalReplaceState.call(this, state, title, url);
        }, 200);
        return;
      }
      
      return originalReplaceState.call(this, state, title, url);
    };
  }
  
  // Restaurar posición de scroll
  function restoreScrollPosition(path) {
    const position = window.__SCROLL_STATE__.positions.get(path);
    if (position) {
      // Restaurar después de que el contenido se haya cargado
      setTimeout(() => {
        window.scrollTo(position.left, position.top);
        console.log('[ScrollFix] Posición de scroll restaurada para:', path);
      }, 100);
    }
  }
  
  // Interceptar eventos de carga de página
  window.addEventListener('beforeunload', function() {
    // Guardar posición antes de salir
    const currentPath = window.location.pathname;
    const position = {
      top: window.pageYOffset || document.documentElement.scrollTop,
      left: window.pageXOffset || document.documentElement.scrollLeft,
      timestamp: Date.now()
    };
    
    try {
      sessionStorage.setItem(`scroll_${currentPath}`, JSON.stringify(position));
    } catch (e) {
      console.warn('[ScrollFix] No se pudo guardar posición en sessionStorage');
    }
  });
  
  // Restaurar posición al cargar
  window.addEventListener('load', function() {
    const currentPath = window.location.pathname;
    
    try {
      const savedPosition = sessionStorage.getItem(`scroll_${currentPath}`);
      if (savedPosition) {
        const position = JSON.parse(savedPosition);
        setTimeout(() => {
          window.scrollTo(position.left, position.top);
          console.log('[ScrollFix] Posición restaurada desde sessionStorage');
        }, 100);
      }
    } catch (e) {
      console.warn('[ScrollFix] Error al restaurar posición desde sessionStorage');
    }
  });
  
  // Interceptar eventos de popstate
  window.addEventListener('popstate', function(event) {
    if (window.__SCROLL_STATE__.isScrolling) {
      console.log('[ScrollFix] Popstate diferido durante scroll');
      setTimeout(() => {
        restoreScrollPosition(window.location.pathname);
      }, 200);
      return;
    }
    
    restoreScrollPosition(window.location.pathname);
  });
  
  // Throttled scroll handler
  let scrollThrottle = null;
  function throttledScrollHandler() {
    if (scrollThrottle) return;
    
    scrollThrottle = setTimeout(() => {
      handleScroll();
      scrollThrottle = null;
    }, 16); // ~60fps
  }
  
  // Inicializar listeners
  function initializeScrollFix() {
    // Prevenir recargas
    preventScrollReload();
    
    // Interceptar navegación
    interceptNavigation();
    
    // Listener de scroll optimizado
    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    
    // Listener para wheel events (scroll con rueda)
    window.addEventListener('wheel', function() {
      window.__SCROLL_STATE__.isScrolling = true;
      window.__SCROLL_STATE__.preventReload = true;
      
      clearTimeout(window.__SCROLL_STATE__.scrollTimeout);
      window.__SCROLL_STATE__.scrollTimeout = setTimeout(() => {
        window.__SCROLL_STATE__.isScrolling = false;
        window.__SCROLL_STATE__.preventReload = false;
      }, 150);
    }, { passive: true });
    
    // Listener para touch events (scroll táctil)
    window.addEventListener('touchmove', function() {
      window.__SCROLL_STATE__.isScrolling = true;
      window.__SCROLL_STATE__.preventReload = true;
      
      clearTimeout(window.__SCROLL_STATE__.scrollTimeout);
      window.__SCROLL_STATE__.scrollTimeout = setTimeout(() => {
        window.__SCROLL_STATE__.isScrolling = false;
        window.__SCROLL_STATE__.preventReload = false;
      }, 150);
    }, { passive: true });
  }
  
  // API pública
  window.ScrollFix = {
    getState: () => window.__SCROLL_STATE__,
    savePosition: (path) => {
      const position = {
        top: window.pageYOffset || document.documentElement.scrollTop,
        left: window.pageXOffset || document.documentElement.scrollLeft,
        timestamp: Date.now()
      };
      window.__SCROLL_STATE__.positions.set(path, position);
    },
    restorePosition: restoreScrollPosition,
    reset: () => {
      window.__SCROLL_STATE__.positions.clear();
      window.__SCROLL_STATE__.isScrolling = false;
      window.__SCROLL_STATE__.preventReload = false;
    }
  };
  
  // Inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScrollFix);
  } else {
    initializeScrollFix();
  }
  
  console.log('[ScrollFix] Sistema de corrección de scroll inicializado');
})();
