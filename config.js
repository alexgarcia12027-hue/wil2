// Configuration for Legal Services System
window.APP_CONFIG = {
  API_URL: window.location.hostname === 'localhost' ? 'http://localhost:8000' : '',
  APP_NAME: 'Abogado Wilson - Professional Legal Services',
  VERSION: '1.0.0',
  FEATURES: {
    ECOMMERCE: true,
    FORUM: true,
    BLOG: true,
    APPOINTMENTS: true,
    DASHBOARD: true,
    PAYMENTS: true,
    CONSULTATIONS: true
  },
  THEME: 'professional',
  LOCALE: 'es-ES'
};

// Initialize app configuration
if (typeof window !== 'undefined') {
  console.log('✅ Configuration loaded successfully');
}
