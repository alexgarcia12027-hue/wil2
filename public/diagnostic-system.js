/**
 * Sistema de Diagnóstico y Recuperación Avanzado
 * Monitorea errores, rendimiento y funcionalidad del sistema
 */

(function() {
  console.log('[DiagnosticSystem] Inicializando sistema de diagnóstico avanzado...');
  
  // Estado global del sistema de diagnóstico
  window.__DIAGNOSTIC_STATE__ = {
    initialized: false,
    errors: [],
    warnings: [],
    performance: {},
    modules: {},
    routes: {},
    lastCheck: null
  };
  
  if (window.__DIAGNOSTIC_STATE__.initialized) {
    console.log('[DiagnosticSystem] Sistema ya inicializado');
    return;
  }
  
  window.__DIAGNOSTIC_STATE__.initialized = true;
  
  // Interceptor de errores global
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;
  
  console.error = function(...args) {
    // Registrar error en el sistema de diagnóstico
    window.__DIAGNOSTIC_STATE__.errors.push({
      timestamp: new Date().toISOString(),
      type: 'error',
      message: args.join(' '),
      stack: new Error().stack
    });
    
    // Intentar recuperación automática para errores conocidos
    const errorMessage = args.join(' ');
    if (errorMessage.includes('exports is not defined')) {
      console.log('[DiagnosticSystem] Detectado error de exports, aplicando fix...');
      fixExportsError();
    } else if (errorMessage.includes('Cannot read properties of undefined')) {
      console.log('[DiagnosticSystem] Detectado error de propiedades undefined, aplicando fix...');
      fixUndefinedPropertiesError(errorMessage);
    }
    
    originalConsoleError.apply(console, args);
  };
  
  console.warn = function(...args) {
    const warningMessage = args.join(' ');
    
    // Filtrar warnings conocidos y no críticos
    if (warningMessage.includes('Heroicons') && warningMessage.includes('Path no encontrado')) {
      return; // Silenciar completamente
    }
    if (warningMessage.includes('[FallbackLoader]') || 
        warningMessage.includes('[UnifiedFix]') || 
        warningMessage.includes('[ModuleFix]') || 
        warningMessage.includes('[ViteFix]') ||
        warningMessage.includes('[CloudflareProduction]') || 
        warningMessage.includes('[OfflineBundle]')) {
      return; // Reducir logs de sistemas internos
    }
    
    // Registrar warning importante
    window.__DIAGNOSTIC_STATE__.warnings.push({
      timestamp: new Date().toISOString(),
      type: 'warning',
      message: warningMessage
    });
    
    originalConsoleWarn.apply(console, args);
  };
  
  // Sistema de recuperación de errores
  function fixExportsError() {
    // Crear un objeto exports global si no existe
    if (typeof window !== 'undefined' && typeof exports === 'undefined') {
      window.exports = {};
      console.log('[DiagnosticSystem] Objeto exports creado globalmente');
    }
  }
  
  function fixUndefinedPropertiesError(errorMessage) {
    // Intentar recuperar propiedades undefined comunes
    if (errorMessage.includes('getSession')) {
      console.log('[DiagnosticSystem] Aplicando fix para getSession undefined');
      // El fix ya está aplicado en supabaseService.js
    }
  }
  
  // Monitor de rendimiento
  function startPerformanceMonitoring() {
    if (typeof performance !== 'undefined') {
      // Monitorear tiempo de carga inicial
      window.addEventListener('load', () => {
        const loadTime = performance.now();
        window.__DIAGNOSTIC_STATE__.performance.loadTime = loadTime;
        console.log(`[DiagnosticSystem] Tiempo de carga: ${loadTime.toFixed(2)}ms`);
      });
      
      // Monitorear navegación
      if ('navigation' in performance) {
        const navTiming = performance.navigation;
        window.__DIAGNOSTIC_STATE__.performance.navigation = {
          type: navTiming.type,
          redirectCount: navTiming.redirectCount
        };
      }
    }
  }
  
  // Monitor de módulos
  function monitorModules() {
    const modules = [
      'React',
      'ReactDOM', 
      'ReactRouterDOM',
      'axios',
      'toast'
    ];
    
    modules.forEach(moduleName => {
      const isAvailable = window[moduleName] !== undefined;
      window.__DIAGNOSTIC_STATE__.modules[moduleName] = {
        available: isAvailable,
        timestamp: new Date().toISOString()
      };
      
      if (!isAvailable) {
        console.warn(`[DiagnosticSystem] Módulo ${moduleName} no disponible`);
      }
    });
  }
  
  // Monitor de rutas
  function monitorRoutes() {
    // Interceptar cambios de ruta
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;
    
    history.pushState = function(state, title, url) {
      window.__DIAGNOSTIC_STATE__.routes[url] = {
        timestamp: new Date().toISOString(),
        method: 'pushState',
        state: state
      };
      console.log(`[DiagnosticSystem] Navegación a: ${url}`);
      return originalPushState.apply(history, arguments);
    };
    
    history.replaceState = function(state, title, url) {
      window.__DIAGNOSTIC_STATE__.routes[url] = {
        timestamp: new Date().toISOString(),
        method: 'replaceState',
        state: state
      };
      console.log(`[DiagnosticSystem] Reemplazo de ruta: ${url}`);
      return originalReplaceState.apply(history, arguments);
    };
    
    // Monitorear eventos popstate
    window.addEventListener('popstate', (event) => {
      const url = window.location.pathname;
      window.__DIAGNOSTIC_STATE__.routes[url] = {
        timestamp: new Date().toISOString(),
        method: 'popstate',
        state: event.state
      };
      console.log(`[DiagnosticSystem] Popstate a: ${url}`);
    });
  }
  
  // Sistema de auto-diagnóstico
  function runDiagnostics() {
    console.log('[DiagnosticSystem] Ejecutando diagnósticos...');
    
    const diagnostics = {
      timestamp: new Date().toISOString(),
      errors: window.__DIAGNOSTIC_STATE__.errors.length,
      warnings: window.__DIAGNOSTIC_STATE__.warnings.length,
      modules: Object.keys(window.__DIAGNOSTIC_STATE__.modules).length,
      routes: Object.keys(window.__DIAGNOSTIC_STATE__.routes).length,
      performance: window.__DIAGNOSTIC_STATE__.performance
    };
    
    console.log('[DiagnosticSystem] Resultados:', diagnostics);
    window.__DIAGNOSTIC_STATE__.lastCheck = diagnostics;
    
    return diagnostics;
  }
  
  // API pública del sistema de diagnóstico
  window.DiagnosticSystem = {
    getState: () => window.__DIAGNOSTIC_STATE__,
    runDiagnostics: runDiagnostics,
    clearErrors: () => {
      window.__DIAGNOSTIC_STATE__.errors = [];
      console.log('[DiagnosticSystem] Errores limpiados');
    },
    clearWarnings: () => {
      window.__DIAGNOSTIC_STATE__.warnings = [];
      console.log('[DiagnosticSystem] Warnings limpiados');
    },
    getReport: () => {
      return {
        summary: window.__DIAGNOSTIC_STATE__.lastCheck,
        errors: window.__DIAGNOSTIC_STATE__.errors.slice(-10), // Últimos 10 errores
        warnings: window.__DIAGNOSTIC_STATE__.warnings.slice(-10), // Últimos 10 warnings
        modules: window.__DIAGNOSTIC_STATE__.modules,
        routes: window.__DIAGNOSTIC_STATE__.routes
      };
    }
  };
  
  // Inicializar todos los monitores
  startPerformanceMonitoring();
  monitorModules();
  monitorRoutes();
  
  // Ejecutar diagnósticos cada 30 segundos
  setInterval(runDiagnostics, 30000);
  
  // Diagnóstico inicial
  setTimeout(runDiagnostics, 2000);
  
  console.log('[DiagnosticSystem] Sistema de diagnóstico inicializado correctamente');
})();
