/**
 * Sistema de verificación completa de rutas
 * Verifica que todas las páginas y rutas funcionen correctamente
 */

(function() {
  console.log('[RouteVerification] Inicializando sistema de verificación de rutas...');
  
  // Rutas principales del sistema
  const MAIN_ROUTES = [
    '/',
    '/about',
    '/services',
    '/blog',
    '/contact',
    '/login',
    '/register',
    '/dashboard',
    '/admin',
    '/shop',
    '/cart',
    '/checkout',
    '/courses',
    '/ebooks',
    '/affiliates',
    '/forum',
    '/consultation',
    '/appointments',
    '/privacy',
    '/terms',
    '/security'
  ];
  
  // Rutas de servicios específicos
  const SERVICE_ROUTES = [
    '/services/civil',
    '/services/penal',
    '/services/transito',
    '/services/laboral',
    '/services/comercial',
    '/services/familia'
  ];
  
  // Rutas de dashboard
  const DASHBOARD_ROUTES = [
    '/dashboard/profile',
    '/dashboard/appointments',
    '/dashboard/consultations',
    '/dashboard/payments',
    '/dashboard/history'
  ];
  
  // Rutas de admin
  const ADMIN_ROUTES = [
    '/admin/users',
    '/admin/products',
    '/admin/courses',
    '/admin/blog',
    '/admin/appointments',
    '/admin/settings',
    '/admin/site-builder'
  ];
  
  // Estado de verificación
  window.__ROUTE_VERIFICATION_STATE__ = {
    verified: new Set(),
    failed: new Set(),
    pending: new Set(),
    results: new Map(),
    isRunning: false
  };
  
  // Verificar una ruta específica
  async function verifyRoute(route) {
    return new Promise((resolve) => {
      const startTime = Date.now();
      
      // Simular navegación a la ruta
      const originalPath = window.location.pathname;
      
      try {
        // Intentar cambiar la ruta
        history.pushState(null, '', route);
        
        // Esperar a que se cargue el contenido
        setTimeout(() => {
          const content = document.querySelector('#root, main, .app-content');
          const hasContent = content && content.children.length > 0;
          const loadTime = Date.now() - startTime;
          
          const result = {
            route,
            success: hasContent,
            loadTime,
            timestamp: new Date().toISOString(),
            error: hasContent ? null : 'No content found'
          };
          
          window.__ROUTE_VERIFICATION_STATE__.results.set(route, result);
          
          if (hasContent) {
            window.__ROUTE_VERIFICATION_STATE__.verified.add(route);
            console.log(`[RouteVerification] ✅ ${route} - ${loadTime}ms`);
          } else {
            window.__ROUTE_VERIFICATION_STATE__.failed.add(route);
            console.warn(`[RouteVerification] ❌ ${route} - No content`);
          }
          
          // Restaurar ruta original
          history.pushState(null, '', originalPath);
          
          resolve(result);
        }, 1000);
        
      } catch (error) {
        const result = {
          route,
          success: false,
          loadTime: Date.now() - startTime,
          timestamp: new Date().toISOString(),
          error: error.message
        };
        
        window.__ROUTE_VERIFICATION_STATE__.results.set(route, result);
        window.__ROUTE_VERIFICATION_STATE__.failed.add(route);
        
        console.error(`[RouteVerification] ❌ ${route} - Error:`, error.message);
        
        // Restaurar ruta original
        try {
          history.pushState(null, '', originalPath);
        } catch (e) {
          // Ignorar errores de restauración
        }
        
        resolve(result);
      }
    });
  }
  
  // Verificar todas las rutas
  async function verifyAllRoutes() {
    if (window.__ROUTE_VERIFICATION_STATE__.isRunning) {
      console.log('[RouteVerification] Verificación ya en progreso...');
      return;
    }
    
    window.__ROUTE_VERIFICATION_STATE__.isRunning = true;
    console.log('[RouteVerification] Iniciando verificación completa de rutas...');
    
    const allRoutes = [
      ...MAIN_ROUTES,
      ...SERVICE_ROUTES,
      ...DASHBOARD_ROUTES,
      ...ADMIN_ROUTES
    ];
    
    let verified = 0;
    let failed = 0;
    
    for (const route of allRoutes) {
      window.__ROUTE_VERIFICATION_STATE__.pending.add(route);
      
      const result = await verifyRoute(route);
      
      window.__ROUTE_VERIFICATION_STATE__.pending.delete(route);
      
      if (result.success) {
        verified++;
      } else {
        failed++;
      }
      
      // Pausa entre verificaciones para evitar sobrecarga
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    window.__ROUTE_VERIFICATION_STATE__.isRunning = false;
    
    console.log(`[RouteVerification] Verificación completada: ${verified} exitosas, ${failed} fallidas`);
    
    return {
      total: allRoutes.length,
      verified,
      failed,
      results: Array.from(window.__ROUTE_VERIFICATION_STATE__.results.values())
    };
  }
  
  // Verificar rutas críticas solamente
  async function verifyCore() {
    const coreRoutes = ['/', '/dashboard', '/admin', '/services', '/blog'];
    
    console.log('[RouteVerification] Verificando rutas críticas...');
    
    for (const route of coreRoutes) {
      await verifyRoute(route);
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    const verified = coreRoutes.filter(route => 
      window.__ROUTE_VERIFICATION_STATE__.verified.has(route)
    ).length;
    
    console.log(`[RouteVerification] Rutas críticas: ${verified}/${coreRoutes.length} funcionando`);
    
    return verified === coreRoutes.length;
  }
  
  // Generar reporte de rutas
  function generateReport() {
    const results = Array.from(window.__ROUTE_VERIFICATION_STATE__.results.values());
    
    const report = {
      timestamp: new Date().toISOString(),
      total: results.length,
      verified: window.__ROUTE_VERIFICATION_STATE__.verified.size,
      failed: window.__ROUTE_VERIFICATION_STATE__.failed.size,
      averageLoadTime: results.reduce((sum, r) => sum + r.loadTime, 0) / results.length,
      routes: {
        working: Array.from(window.__ROUTE_VERIFICATION_STATE__.verified),
        failed: Array.from(window.__ROUTE_VERIFICATION_STATE__.failed),
        pending: Array.from(window.__ROUTE_VERIFICATION_STATE__.pending)
      },
      details: results
    };
    
    console.table(results);
    return report;
  }
  
  // API pública
  window.RouteVerification = {
    verifyAll: verifyAllRoutes,
    verifyCore: verifyCore,
    verifyRoute: verifyRoute,
    getReport: generateReport,
    getState: () => window.__ROUTE_VERIFICATION_STATE__,
    reset: () => {
      window.__ROUTE_VERIFICATION_STATE__.verified.clear();
      window.__ROUTE_VERIFICATION_STATE__.failed.clear();
      window.__ROUTE_VERIFICATION_STATE__.pending.clear();
      window.__ROUTE_VERIFICATION_STATE__.results.clear();
      window.__ROUTE_VERIFICATION_STATE__.isRunning = false;
    }
  };
  
  // Verificación automática al cargar
  setTimeout(() => {
    verifyCore();
  }, 3000);
  
  console.log('[RouteVerification] Sistema de verificación inicializado');
})();
