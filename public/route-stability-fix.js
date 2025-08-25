/**
 * Sistema de Estabilidad de Rutas y Navegación
 * Previene recargas innecesarias y problemas de scroll
 */

(function() {
  console.log('[RouteStabilityFix] Inicializando sistema de estabilidad de rutas...');
  
  // Estado global del sistema de rutas
  window.__ROUTE_STABILITY_STATE__ = {
    initialized: false,
    currentRoute: window.location.pathname,
    navigationInProgress: false,
    scrollPositions: {},
    routeHistory: []
  };
  
  if (window.__ROUTE_STABILITY_STATE__.initialized) {
    console.log('[RouteStabilityFix] Sistema ya inicializado');
    return;
  }
  
  window.__ROUTE_STABILITY_STATE__.initialized = true;
  
  // Interceptar navegación para prevenir recargas innecesarias
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;
  
  history.pushState = function(state, title, url) {
    console.log(`[RouteStabilityFix] Navegación interceptada: ${url}`);
    
    // Guardar posición de scroll actual
    const currentPath = window.location.pathname;
    window.__ROUTE_STABILITY_STATE__.scrollPositions[currentPath] = {
      x: window.scrollX,
      y: window.scrollY,
      timestamp: Date.now()
    };
    
    // Marcar navegación en progreso
    window.__ROUTE_STABILITY_STATE__.navigationInProgress = true;
    
    // Agregar a historial
    window.__ROUTE_STABILITY_STATE__.routeHistory.push({
      from: currentPath,
      to: url,
      timestamp: Date.now(),
      method: 'pushState'
    });
    
    // Ejecutar navegación original
    const result = originalPushState.apply(history, arguments);
    
    // Actualizar estado
    window.__ROUTE_STABILITY_STATE__.currentRoute = url;
    
    // Restaurar scroll después de un breve delay
    setTimeout(() => {
      window.__ROUTE_STABILITY_STATE__.navigationInProgress = false;
      restoreScrollPosition(url);
    }, 100);
    
    return result;
  };
  
  history.replaceState = function(state, title, url) {
    console.log(`[RouteStabilityFix] Reemplazo de ruta interceptado: ${url}`);
    
    // Actualizar estado sin guardar scroll (es un reemplazo)
    window.__ROUTE_STABILITY_STATE__.currentRoute = url;
    
    return originalReplaceState.apply(history, arguments);
  };
  
  // Manejar eventos popstate (botón atrás/adelante)
  window.addEventListener('popstate', function(event) {
    const newPath = window.location.pathname;
    console.log(`[RouteStabilityFix] Popstate detectado: ${newPath}`);
    
    // Marcar navegación en progreso
    window.__ROUTE_STABILITY_STATE__.navigationInProgress = true;
    
    // Agregar a historial
    window.__ROUTE_STABILITY_STATE__.routeHistory.push({
      from: window.__ROUTE_STABILITY_STATE__.currentRoute,
      to: newPath,
      timestamp: Date.now(),
      method: 'popstate'
    });
    
    // Actualizar estado
    window.__ROUTE_STABILITY_STATE__.currentRoute = newPath;
    
    // Restaurar scroll después de un breve delay
    setTimeout(() => {
      window.__ROUTE_STABILITY_STATE__.navigationInProgress = false;
      restoreScrollPosition(newPath);
    }, 100);
  });
  
  // Función para restaurar posición de scroll
  function restoreScrollPosition(path) {
    const savedPosition = window.__ROUTE_STABILITY_STATE__.scrollPositions[path];
    
    if (savedPosition) {
      // Restaurar posición guardada
      window.scrollTo(savedPosition.x, savedPosition.y);
      console.log(`[RouteStabilityFix] Scroll restaurado para ${path}: ${savedPosition.x}, ${savedPosition.y}`);
    } else {
      // Scroll al top para rutas nuevas
      window.scrollTo(0, 0);
      console.log(`[RouteStabilityFix] Scroll al top para ruta nueva: ${path}`);
    }
  }
  
  // Interceptar eventos de scroll para prevenir conflictos
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    // Solo guardar posición si no estamos navegando
    if (!window.__ROUTE_STABILITY_STATE__.navigationInProgress) {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const currentPath = window.location.pathname;
        window.__ROUTE_STABILITY_STATE__.scrollPositions[currentPath] = {
          x: window.scrollX,
          y: window.scrollY,
          timestamp: Date.now()
        };
      }, 150); // Debounce de 150ms
    }
  });
  
  // Interceptar clics en enlaces para manejo suave
  document.addEventListener('click', function(event) {
    const target = event.target.closest('a');
    
    if (target && target.href) {
      const url = new URL(target.href);
      
      // Solo manejar enlaces internos
      if (url.origin === window.location.origin) {
        // Verificar si es una ruta de la aplicación
        const isAppRoute = url.pathname.startsWith('/') && 
                          !url.pathname.startsWith('/api/') &&
                          !url.pathname.includes('.');
        
        if (isAppRoute) {
          console.log(`[RouteStabilityFix] Clic en enlace interno interceptado: ${url.pathname}`);
          
          // Prevenir comportamiento por defecto solo si es necesario
          if (url.pathname !== window.location.pathname) {
            event.preventDefault();
            
            // Usar React Router si está disponible
            if (window.ReactRouterDOM && window.ReactRouterDOM.useNavigate) {
              // Dejar que React Router maneje la navegación
              return;
            } else {
              // Navegación manual
              history.pushState(null, '', url.pathname + url.search + url.hash);
            }
          }
        }
      }
    }
  });
  
  // Sistema de limpieza de posiciones de scroll antiguas
  function cleanupOldScrollPositions() {
    const now = Date.now();
    const maxAge = 30 * 60 * 1000; // 30 minutos
    
    Object.keys(window.__ROUTE_STABILITY_STATE__.scrollPositions).forEach(path => {
      const position = window.__ROUTE_STABILITY_STATE__.scrollPositions[path];
      if (now - position.timestamp > maxAge) {
        delete window.__ROUTE_STABILITY_STATE__.scrollPositions[path];
      }
    });
    
    // Limpiar historial antiguo también
    window.__ROUTE_STABILITY_STATE__.routeHistory = 
      window.__ROUTE_STABILITY_STATE__.routeHistory.slice(-50); // Mantener últimas 50 navegaciones
  }
  
  // Limpiar cada 5 minutos
  setInterval(cleanupOldScrollPositions, 5 * 60 * 1000);
  
  // API pública
  window.RouteStabilityFix = {
    getState: () => window.__ROUTE_STABILITY_STATE__,
    clearScrollPositions: () => {
      window.__ROUTE_STABILITY_STATE__.scrollPositions = {};
      console.log('[RouteStabilityFix] Posiciones de scroll limpiadas');
    },
    getRouteHistory: () => window.__ROUTE_STABILITY_STATE__.routeHistory,
    isNavigating: () => window.__ROUTE_STABILITY_STATE__.navigationInProgress
  };
  
  console.log('[RouteStabilityFix] Sistema de estabilidad de rutas inicializado correctamente');
})();
