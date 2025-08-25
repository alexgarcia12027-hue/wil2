/**
 * Corrección para duplicación de navbar
 * Previene renderizado múltiple de componentes de navegación
 */

(function() {
  console.log('[NavbarFix] Inicializando corrección para navbar duplicado...');
  
  // Estado global para prevenir duplicación
  window.__NAVBAR_STATE__ = {
    rendered: false,
    instances: new Set(),
    mountCount: 0
  };
  
  // Interceptar creación de elementos navbar
  const originalCreateElement = document.createElement;
  document.createElement = function(tagName) {
    const element = originalCreateElement.call(document, tagName);
    
    if (tagName.toLowerCase() === 'nav' || 
        (element.className && element.className.includes('navbar'))) {
      
      // Marcar elemento como navbar
      element.setAttribute('data-navbar-instance', Date.now());
      window.__NAVBAR_STATE__.instances.add(element);
      
      console.log('[NavbarFix] Navbar detectado, instancias totales:', window.__NAVBAR_STATE__.instances.size);
    }
    
    return element;
  };
  
  // Limpiar navbars duplicados
  function cleanupDuplicateNavbars() {
    const navbars = document.querySelectorAll('nav, [class*="navbar"]');
    
    if (navbars.length > 1) {
      console.log('[NavbarFix] Detectados', navbars.length, 'navbars, limpiando duplicados...');
      
      // Mantener solo el primer navbar válido
      for (let i = 1; i < navbars.length; i++) {
        const navbar = navbars[i];
        if (navbar.parentNode) {
          navbar.parentNode.removeChild(navbar);
          console.log('[NavbarFix] Navbar duplicado removido');
        }
      }
    }
  }
  
  // Observer para detectar cambios en el DOM
  const observer = new MutationObserver(function(mutations) {
    let navbarAdded = false;
    
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(node) {
        if (node.nodeType === 1) { // Element node
          // Verificar si es un navbar
          if (node.tagName === 'NAV' || 
              (node.className && node.className.includes('navbar'))) {
            navbarAdded = true;
          }
          
          // Verificar elementos hijos
          const childNavbars = node.querySelectorAll && node.querySelectorAll('nav, [class*="navbar"]');
          if (childNavbars && childNavbars.length > 0) {
            navbarAdded = true;
          }
        }
      });
    });
    
    if (navbarAdded) {
      // Esperar un momento para que se complete el renderizado
      setTimeout(cleanupDuplicateNavbars, 100);
    }
  });
  
  // Iniciar observación cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
      
      // Limpieza inicial
      setTimeout(cleanupDuplicateNavbars, 500);
    });
  } else {
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // Limpieza inicial
    setTimeout(cleanupDuplicateNavbars, 500);
  }
  
  // Interceptar React render para prevenir duplicación
  if (window.React && window.React.createElement) {
    const originalCreateElement = window.React.createElement;
    
    window.React.createElement = function(type, props, ...children) {
      // Verificar si es un componente de navegación
      if (typeof type === 'string' && type === 'nav') {
        window.__NAVBAR_STATE__.mountCount++;
        
        if (window.__NAVBAR_STATE__.mountCount > 1) {
          console.log('[NavbarFix] Previniendo renderizado duplicado de navbar');
          return null;
        }
      }
      
      if (typeof type === 'function' && 
          (type.name === 'Navbar' || type.displayName === 'Navbar')) {
        window.__NAVBAR_STATE__.mountCount++;
        
        if (window.__NAVBAR_STATE__.mountCount > 1) {
          console.log('[NavbarFix] Previniendo renderizado duplicado de componente Navbar');
          return null;
        }
      }
      
      return originalCreateElement.call(this, type, props, ...children);
    };
  }
  
  // API pública
  window.NavbarFix = {
    cleanup: cleanupDuplicateNavbars,
    getState: () => window.__NAVBAR_STATE__,
    reset: () => {
      window.__NAVBAR_STATE__.rendered = false;
      window.__NAVBAR_STATE__.instances.clear();
      window.__NAVBAR_STATE__.mountCount = 0;
    }
  };
  
  console.log('[NavbarFix] Sistema de corrección de navbar inicializado');
})();
