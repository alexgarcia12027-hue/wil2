/**
 * Sistema de limpieza de console para reducir ruido
 * Filtra mensajes repetitivos y no críticos
 */

(function() {
  console.log('[ConsoleCleanup] Inicializando sistema de limpieza de console...');
  
  // Mensajes a filtrar (patrones)
  const FILTER_PATTERNS = [
    /\[FallbackSystem\]/,
    /\[FallbackLoader\]/,
    /\[UnifiedFix\]/,
    /\[ModuleFix\]/,
    /\[OfflineBundle\]/,
    /\[SystemBundle\]/,
    /\[DirectLoad\]/,
    /\[UIComponentsBundle\]/,
    /\[ViteModuleFix\]/,
    /\[ComponentShims\]/,
    /\[MockModules\]/,
    /\[EmergencyFix\]/,
    /\[StandaloneApp\]/,
    /ya está disponible globalmente/,
    /ya está cargado/,
    /usando la implementación existente/,
    /Sistema.*inicializado correctamente/,
    /cargado correctamente/,
    /parcheado correctamente/,
    /simulado cargado correctamente/
  ];
  
  // Mensajes importantes que NO se deben filtrar
  const IMPORTANT_PATTERNS = [
    /error/i,
    /Error/,
    /failed/i,
    /Failed/,
    /undefined/,
    /null/,
    /crash/i,
    /critical/i,
    /warning/i,
    /Warning/,
    /404/,
    /500/,
    /CORS/,
    /blocked/i
  ];
  
  // Contador de mensajes filtrados
  let filteredCount = 0;
  let lastFilteredType = null;
  
  // Interceptar console.log
  const originalLog = console.log;
  console.log = function(...args) {
    const message = args.join(' ');
    
    // Verificar si es un mensaje importante
    const isImportant = IMPORTANT_PATTERNS.some(pattern => pattern.test(message));
    if (isImportant) {
      return originalLog.apply(console, args);
    }
    
    // Verificar si debe ser filtrado
    const shouldFilter = FILTER_PATTERNS.some(pattern => pattern.test(message));
    if (shouldFilter) {
      filteredCount++;
      
      // Solo mostrar cada 10 mensajes filtrados del mismo tipo
      const messageType = message.match(/\[(\w+)\]/)?.[1] || 'Unknown';
      if (messageType !== lastFilteredType || filteredCount % 10 === 0) {
        originalLog.call(console, `[ConsoleCleanup] ${filteredCount} mensajes filtrados (último: ${messageType})`);
        lastFilteredType = messageType;
      }
      return;
    }
    
    return originalLog.apply(console, args);
  };
  
  // Interceptar console.warn con filtrado similar
  const originalWarn = console.warn;
  console.warn = function(...args) {
    const message = args.join(' ');
    
    // Verificar si es un mensaje importante
    const isImportant = IMPORTANT_PATTERNS.some(pattern => pattern.test(message));
    if (isImportant) {
      return originalWarn.apply(console, args);
    }
    
    // Filtrar warnings repetitivos
    const shouldFilter = FILTER_PATTERNS.some(pattern => pattern.test(message));
    if (shouldFilter) {
      return;
    }
    
    return originalWarn.apply(console, args);
  };
  
  // API pública
  window.ConsoleCleanup = {
    getFilteredCount: () => filteredCount,
    reset: () => {
      filteredCount = 0;
      lastFilteredType = null;
    },
    addFilter: (pattern) => {
      FILTER_PATTERNS.push(pattern);
    },
    removeFilter: (pattern) => {
      const index = FILTER_PATTERNS.findIndex(p => p.toString() === pattern.toString());
      if (index !== -1) {
        FILTER_PATTERNS.splice(index, 1);
      }
    }
  };
  
  console.log('[ConsoleCleanup] Sistema de limpieza inicializado');
})();
