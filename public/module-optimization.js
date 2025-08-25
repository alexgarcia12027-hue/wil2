/**
 * Sistema de Optimización de Carga de Módulos
 * Reduce llamadas excesivas al sistema de fallback
 */

(function() {
  console.log('[ModuleOptimization] Inicializando optimización de módulos...');
  
  // Estado global de optimización
  window.__MODULE_OPTIMIZATION_STATE__ = {
    initialized: false,
    loadedModules: new Set(),
    pendingModules: new Map(),
    failedModules: new Set(),
    loadAttempts: new Map()
  };
  
  if (window.__MODULE_OPTIMIZATION_STATE__.initialized) {
    console.log('[ModuleOptimization] Sistema ya inicializado');
    return;
  }
  
  window.__MODULE_OPTIMIZATION_STATE__.initialized = true;
  
  // Interceptar y optimizar carga de scripts
  const originalCreateElement = document.createElement;
  document.createElement = function(tagName) {
    const element = originalCreateElement.call(document, tagName);
    
    if (tagName.toLowerCase() === 'script') {
      const originalSetSrc = Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, 'src').set;
      
      Object.defineProperty(element, 'src', {
        set: function(value) {
          // Verificar si ya está cargado o fallando
          if (window.__MODULE_OPTIMIZATION_STATE__.loadedModules.has(value)) {
            console.log(`[ModuleOptimization] Módulo ya cargado, omitiendo: ${value}`);
            // Simular carga exitosa
            setTimeout(() => {
              if (element.onload) element.onload();
            }, 10);
            return;
          }
          
          if (window.__MODULE_OPTIMIZATION_STATE__.failedModules.has(value)) {
            const attempts = window.__MODULE_OPTIMIZATION_STATE__.loadAttempts.get(value) || 0;
            if (attempts >= 3) {
              console.log(`[ModuleOptimization] Módulo falló múltiples veces, omitiendo: ${value}`);
              setTimeout(() => {
                if (element.onerror) element.onerror(new Error('Module failed multiple times'));
              }, 10);
              return;
            }
          }
          
          // Verificar si ya está pendiente
          if (window.__MODULE_OPTIMIZATION_STATE__.pendingModules.has(value)) {
            console.log(`[ModuleOptimization] Módulo ya pendiente, agregando callback: ${value}`);
            const callbacks = window.__MODULE_OPTIMIZATION_STATE__.pendingModules.get(value);
            callbacks.push({
              onload: element.onload,
              onerror: element.onerror
            });
            return;
          }
          
          // Marcar como pendiente
          window.__MODULE_OPTIMIZATION_STATE__.pendingModules.set(value, [{
            onload: element.onload,
            onerror: element.onerror
          }]);
          
          // Interceptar eventos de carga
          const originalOnLoad = element.onload;
          const originalOnError = element.onerror;
          
          element.onload = function(event) {
            console.log(`[ModuleOptimization] Módulo cargado exitosamente: ${value}`);
            window.__MODULE_OPTIMIZATION_STATE__.loadedModules.add(value);
            window.__MODULE_OPTIMIZATION_STATE__.failedModules.delete(value);
            
            // Ejecutar todos los callbacks pendientes
            const callbacks = window.__MODULE_OPTIMIZATION_STATE__.pendingModules.get(value) || [];
            callbacks.forEach(cb => {
              if (cb.onload) cb.onload.call(this, event);
            });
            
            window.__MODULE_OPTIMIZATION_STATE__.pendingModules.delete(value);
          };
          
          element.onerror = function(event) {
            console.warn(`[ModuleOptimization] Error al cargar módulo: ${value}`);
            window.__MODULE_OPTIMIZATION_STATE__.failedModules.add(value);
            
            // Incrementar contador de intentos
            const attempts = (window.__MODULE_OPTIMIZATION_STATE__.loadAttempts.get(value) || 0) + 1;
            window.__MODULE_OPTIMIZATION_STATE__.loadAttempts.set(value, attempts);
            
            // Ejecutar todos los callbacks de error pendientes
            const callbacks = window.__MODULE_OPTIMIZATION_STATE__.pendingModules.get(value) || [];
            callbacks.forEach(cb => {
              if (cb.onerror) cb.onerror.call(this, event);
            });
            
            window.__MODULE_OPTIMIZATION_STATE__.pendingModules.delete(value);
          };
          
          // Aplicar la URL original
          originalSetSrc.call(this, value);
        },
        get: function() {
          return Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, 'src').get.call(this);
        }
      });
    }
    
    return element;
  };
  
  // Optimizar console.log para sistemas de fallback
  const originalConsoleLog = console.log;
  console.log = function(...args) {
    const message = args.join(' ');
    
    // Filtrar mensajes repetitivos de sistemas de fallback
    if (message.includes('[FallbackSystem]') || 
        message.includes('[FallbackLoader]') ||
        message.includes('[UnifiedFix]') ||
        message.includes('[ModuleFix]') ||
        message.includes('[OfflineBundle]')) {
      
      // Solo mostrar mensajes únicos o importantes
      if (message.includes('inicializado') || 
          message.includes('cargado correctamente') ||
          message.includes('error') ||
          message.includes('Error')) {
        originalConsoleLog.apply(console, args);
      }
      return;
    }
    
    originalConsoleLog.apply(console, args);
  };
  
  // Sistema de limpieza periódica
  function cleanupModuleState() {
    const now = Date.now();
    const maxAge = 10 * 60 * 1000; // 10 minutos
    
    // Limpiar módulos fallidos antiguos para permitir reintentos
    window.__MODULE_OPTIMIZATION_STATE__.failedModules.forEach(url => {
      const attempts = window.__MODULE_OPTIMIZATION_STATE__.loadAttempts.get(url);
      if (attempts && attempts >= 3) {
        // Mantener en lista de fallidos permanentemente
        return;
      }
      
      // Permitir reintento después de 10 minutos
      setTimeout(() => {
        window.__MODULE_OPTIMIZATION_STATE__.failedModules.delete(url);
        window.__MODULE_OPTIMIZATION_STATE__.loadAttempts.delete(url);
        console.log(`[ModuleOptimization] Reintento permitido para: ${url}`);
      }, maxAge);
    });
  }
  
  // Limpiar cada 5 minutos
  setInterval(cleanupModuleState, 5 * 60 * 1000);
  
  // Detectar y optimizar módulos ya cargados
  function detectLoadedModules() {
    const commonModules = [
      'React',
      'ReactDOM',
      'ReactRouterDOM',
      'axios',
      'toast'
    ];
    
    commonModules.forEach(moduleName => {
      if (window[moduleName]) {
        console.log(`[ModuleOptimization] Módulo detectado como ya cargado: ${moduleName}`);
        // Marcar URLs comunes como cargadas
        const commonUrls = [
          `/fallback/${moduleName.toLowerCase()}.js`,
          `/fallback/${moduleName.toLowerCase()}.min.js`,
          `https://unpkg.com/${moduleName.toLowerCase()}`,
          `https://cdn.jsdelivr.net/npm/${moduleName.toLowerCase()}`
        ];
        
        commonUrls.forEach(url => {
          window.__MODULE_OPTIMIZATION_STATE__.loadedModules.add(url);
        });
      }
    });
  }
  
  // Ejecutar detección inicial
  setTimeout(detectLoadedModules, 1000);
  
  // API pública
  window.ModuleOptimization = {
    getState: () => window.__MODULE_OPTIMIZATION_STATE__,
    clearFailed: () => {
      window.__MODULE_OPTIMIZATION_STATE__.failedModules.clear();
      window.__MODULE_OPTIMIZATION_STATE__.loadAttempts.clear();
      console.log('[ModuleOptimization] Módulos fallidos limpiados');
    },
    markAsLoaded: (url) => {
      window.__MODULE_OPTIMIZATION_STATE__.loadedModules.add(url);
      console.log(`[ModuleOptimization] Módulo marcado como cargado: ${url}`);
    },
    getStats: () => {
      return {
        loaded: window.__MODULE_OPTIMIZATION_STATE__.loadedModules.size,
        pending: window.__MODULE_OPTIMIZATION_STATE__.pendingModules.size,
        failed: window.__MODULE_OPTIMIZATION_STATE__.failedModules.size
      };
    }
  };
  
  console.log('[ModuleOptimization] Sistema de optimización inicializado correctamente');
})();
