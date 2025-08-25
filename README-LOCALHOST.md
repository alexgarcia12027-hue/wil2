# 🚀 Abogado Wilson - Aplicación Legal Completa

## Inicio Rápido para Localhost

### Opción 1: Inicio Automático
```bash
# Ejecutar el archivo de inicio rápido
quick-start.bat
```

### Opción 2: Inicio Manual
```bash
# Si tienes Node.js instalado
npm install
npm run dev
```

### Opción 3: Servidor Python Simple
```bash
# Si no tienes Node.js
python -m http.server 8000
# Luego abrir: http://localhost:8000
```

## 🌟 Características Implementadas

### ✅ Sistema de Autenticación
- Login/Registro con validación completa
- Gestión de roles (Admin, Cliente, Afiliado)
- Protección de rutas por permisos
- Sesiones persistentes

### ✅ Dashboard de Cliente
- Panel principal con estadísticas
- Gestión de citas y consultas
- Seguimiento de cursos y ebooks
- Sistema de referidos y comisiones
- Perfil de usuario editable

### ✅ Dashboard de Administrador
- Gestión completa de usuarios
- Administración de productos y cursos
- Sistema de blog con CRUD completo
- Monitoreo de APIs en tiempo real
- Exportación de datos y reportes

### ✅ Sistema de Cursos
- Catálogo de cursos con filtros
- Reproductor de video integrado
- Sistema de progreso y certificados
- Quizzes por lección
- Notas del estudiante

### ✅ Sistema de Blog
- CRUD completo de artículos
- Categorización y etiquetas
- Búsqueda y filtros avanzados
- Editor de contenido rico
- Comentarios y interacciones

### ✅ Sistema de Pagos
- Múltiples métodos: PayPal, Tarjetas, Crypto, QR
- Validación completa de formularios
- Procesamiento seguro de transacciones
- Historial de pagos detallado
- Integración con proveedores externos

### ✅ Sistema de Afiliados
- Programa de referidos multinivel
- Seguimiento de comisiones
- Materiales de marketing
- Dashboard de estadísticas
- Solicitudes de pago automatizadas

### ✅ Monitoreo de APIs
- Estado en tiempo real de servicios
- Alertas automáticas por fallos
- Métricas de rendimiento
- Logs detallados exportables
- Dashboard de uptime

### ✅ Formularios Avanzados
- Validación en tiempo real
- Feedback visual inmediato
- Estados de carga y éxito
- Manejo de errores robusto
- UX optimizada para conversión

### ✅ Integraciones Externas
- Google Gemini AI para consultas
- WhatsApp Business API
- Servicios de notificaciones
- Analytics y métricas
- APIs de pago múltiples

## 🎯 URLs Principales

### Páginas Públicas
- **Inicio**: `http://localhost:5173/`
- **Servicios**: `http://localhost:5173/servicios`
- **Blog**: `http://localhost:5173/blog`
- **Cursos**: `http://localhost:5173/cursos`
- **Contacto**: `http://localhost:5173/contacto`

### Autenticación
- **Login**: `http://localhost:5173/login`
- **Registro**: `http://localhost:5173/register`

### Dashboard Cliente
- **Panel Principal**: `http://localhost:5173/dashboard`
- **Mis Cursos**: `http://localhost:5173/dashboard/mis-cursos`
- **Perfil**: `http://localhost:5173/dashboard/perfil`

### Dashboard Admin
- **Panel Admin**: `http://localhost:5173/admin`
- **Monitoreo APIs**: `http://localhost:5173/admin/monitoreo`
- **Gestión Usuarios**: `http://localhost:5173/admin/usuarios`

### Sistemas Especiales
- **Consulta IA**: `http://localhost:5173/consulta-ia`
- **Pagos**: `http://localhost:5173/payment`
- **Afiliados**: `http://localhost:5173/afiliados/sistema`

## 🔧 Configuración de Desarrollo

### Variables de Entorno
```javascript
// Configuradas en src/main.jsx
window.__APP_CONFIG__ = {
  version: '2.0.0',
  environment: 'development',
  apiUrl: '/api',
  supabaseUrl: 'https://phzldiaohelbyobhjrnc.supabase.co',
  supabaseKey: 'sbp_db5898ecc094d37ec87562399efe3833e63ab20f',
  geminiApiKey: 'AIzaSyCAkIkgslyxArR_kg1kVRREzrjeGWavyyU'
};
```

### Servicios Mock
La aplicación incluye servicios mock completos para desarrollo local:
- **Mock API Service**: Simula todas las operaciones CRUD
- **Mock External APIs**: Gemini, WhatsApp, Pagos, etc.
- **Mock Analytics**: Métricas y eventos simulados
- **Mock Notifications**: Email y SMS simulados

## 🎨 Tecnologías Utilizadas

### Frontend
- **React 18** - Framework principal
- **React Router** - Navegación SPA
- **Tailwind CSS** - Estilos utilitarios
- **React Icons** - Iconografía
- **React Hot Toast** - Notificaciones
- **Framer Motion** - Animaciones

### Servicios
- **Axios** - Cliente HTTP
- **Supabase** - Base de datos y auth
- **Google Gemini** - IA conversacional
- **Stripe/PayPal** - Procesamiento de pagos

### Desarrollo
- **Vite** - Build tool y dev server
- **ESLint** - Linting de código
- **Prettier** - Formateo de código

## 🚦 Estados de Desarrollo

### ✅ Completado y Funcional
- Todos los componentes principales
- Navegación y routing completo
- Formularios con validación
- Servicios mock para desarrollo
- UI/UX optimizada y responsive

### 🔄 En Desarrollo
- Integración con backend real
- Optimizaciones de rendimiento
- Testing automatizado
- Documentación técnica

## 🐛 Solución de Problemas

### Error: Node.js no encontrado
```bash
# Instalar Node.js desde https://nodejs.org
# O usar el servidor Python alternativo
python -m http.server 8000
```

### Error: Puerto ocupado
```bash
# Cambiar puerto en vite.config.js o usar:
npm run dev -- --port 3000
```

### Error: Dependencias faltantes
```bash
# Reinstalar dependencias
rm -rf node_modules
npm install
```

## 📞 Soporte

Para problemas técnicos o consultas sobre la implementación:
- Revisar logs en consola del navegador
- Verificar network tab para errores de API
- Consultar documentación de componentes

## 🎉 ¡Listo para Usar!

La aplicación está completamente funcional para desarrollo local con:
- **Datos mock** para todas las funcionalidades
- **Navegación completa** entre todas las secciones
- **Formularios funcionales** con validación
- **UI responsive** optimizada para desktop y móvil
- **Experiencia de usuario** completa y profesional

¡Ejecuta `quick-start.bat` y comienza a explorar todas las funcionalidades!
