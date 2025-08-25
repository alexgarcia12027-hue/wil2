// Fallback system for Legal Services App
(function() {
  'use strict';
  
  window.APP_FALLBACK = {
    initialized: false,
    modules: {},
    
    init() {
      if (this.initialized) return;
      this.initialized = true;
      
      // Polyfills for older browsers
      if (!window.Promise) {
        window.Promise = function(executor) {
          this.then = function() { return this; };
          this.catch = function() { return this; };
          executor(
            function() {},
            function() {}
          );
        };
      }
      
      // Console safety
      ['log', 'error', 'warn', 'info', 'debug'].forEach(method => {
        if (!window.console[method]) {
          window.console[method] = function() {};
        }
      });
      
      console.log('✅ Fallback system initialized');
    },
    
    loadModule(name, fallbackUrl) {
      if (this.modules[name]) return Promise.resolve();
      
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = fallbackUrl;
        script.onload = () => {
          this.modules[name] = true;
          resolve();
        };
        script.onerror = () => {
          console.warn(`Failed to load ${name}, continuing...`);
          resolve();
        };
        document.head.appendChild(script);
      });
    }
  };
  
  window.APP_FALLBACK.init();
})();
