# Abogado Wilson - Sistema Legal Profesional

## 🏛️ Descripción

Sistema completo de gestión legal profesional desarrollado con React, Vite y tecnologías modernas. Incluye gestión de casos, clientes, servicios legales, e-commerce, cursos, blog y panel administrativo completo.

## ✨ Características Principales

### 🎯 Funcionalidades Core
- **Gestión de Casos Legales**: Sistema completo para seguimiento de casos penales, civiles, tránsito, etc.
- **Gestión de Clientes**: Base de datos de clientes con historial completo
- **Servicios Legales**: Catálogo de servicios con precios y descripciones
- **E-commerce Integrado**: Tienda de productos digitales y físicos
- **Sistema de Cursos**: Plataforma de aprendizaje con ebooks y masterclasses
- **Blog Profesional**: Sistema de gestión de contenido legal
- **Panel Administrativo**: Dashboard completo para administradores

### 🛠️ Tecnologías Utilizadas
- **Frontend**: React 18, TypeScript, Vite
- **UI/UX**: Tailwind CSS, Headless UI, Heroicons
- **Estado**: React Context, React Query
- **Rutas**: React Router DOM
- **Base de Datos**: Supabase (PostgreSQL)
- **Autenticación**: Supabase Auth
- **Pagos**: Stripe, PayPal, Mercado Pago
- **Notificaciones**: React Hot Toast
- **Animaciones**: Framer Motion

### 📱 Características Avanzadas
- **Responsive Design**: Optimizado para todos los dispositivos
- **Modo Oscuro**: Tema claro/oscuro automático
- **PWA Ready**: Aplicación web progresiva
- **SEO Optimizado**: Meta tags y estructura semántica
- **Accesibilidad**: Cumple estándares WCAG
- **Performance**: Lazy loading y optimización de bundles

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Git

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/alexgarcia12027-hue/wil2.git
cd wil2
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp env.local.example env.local
```
Editar `env.local` con tus credenciales de Supabase y otras APIs.

4. **Ejecutar en desarrollo**
```bash
npm run dev
```

5. **Construir para producción**
```bash
npm run build
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── 3D/             # Componentes con efectos 3D
│   ├── Auth/           # Sistema de autenticación
│   ├── Dashboard/      # Componentes del panel
│   ├── Navigation/     # Navegación y menús
│   ├── Payment/        # Sistema de pagos
│   └── Services/       # Componentes de servicios
├── pages/              # Páginas principales
├── context/            # Contextos de React
├── hooks/              # Custom hooks
├── services/           # Servicios y APIs
├── types/              # Tipos TypeScript
├── utils/              # Utilidades y helpers
└── assets/             # Recursos estáticos
```

## 🎨 Servicios Legales Incluidos

- **Derecho Penal**: Defensa penal y asesoría
- **Derecho Civil**: Contratos y responsabilidad civil
- **Derecho de Tránsito**: Infracciones y accidentes
- **Derecho Laboral**: Conflictos laborales
- **Derecho Comercial**: Empresas y comercio
- **Derecho de Familia**: Divorcios y custodia
- **Derecho Aduanero**: Importación y exportación
- **Seguridad Jurídica**: Protección legal integral

## 💳 Sistema de Pagos

- **Stripe**: Pagos con tarjeta internacional
- **PayPal**: Pagos digitales seguros
- **Mercado Pago**: Pagos locales (Latinoamérica)
- **Suscripciones**: Planes mensuales y anuales
- **Facturación**: Sistema automático de facturas

## 📊 Panel Administrativo

### Funcionalidades del Admin
- Dashboard con métricas en tiempo real
- Gestión completa de usuarios y clientes
- Sistema de casos y documentos
- Análisis de ventas y finanzas
- Gestión de contenido del blog
- Configuración del sistema

### Funcionalidades del Cliente
- Dashboard personal con casos activos
- Historial de consultas y pagos
- Acceso a cursos y productos comprados
- Sistema de citas y calendario
- Perfil personalizable

## 🔧 Configuración de APIs

### Supabase
```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anonima
```

### Stripe
```env
VITE_STRIPE_PUBLIC_KEY=tu_clave_publica_stripe
```

### PayPal
```env
VITE_PAYPAL_CLIENT_ID=tu_client_id_paypal
```

## 📱 Características Móviles

- **Responsive Design**: Adaptado a todos los tamaños
- **Touch Friendly**: Optimizado para dispositivos táctiles
- **PWA**: Instalable como aplicación nativa
- **Offline Mode**: Funcionalidad básica sin conexión

## 🔒 Seguridad

- **Autenticación JWT**: Tokens seguros
- **Autorización**: Roles y permisos granulares
- **HTTPS**: Conexiones encriptadas
- **Validación**: Sanitización de datos
- **Rate Limiting**: Protección contra ataques

## 🚀 Despliegue

### Vercel (Recomendado)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Cloudflare Pages
```bash
npm run build
wrangler pages publish dist
```

## 📈 Monitoreo y Analytics

- **Google Analytics**: Seguimiento de usuarios
- **Error Tracking**: Captura de errores en producción
- **Performance Monitoring**: Métricas de rendimiento
- **User Analytics**: Comportamiento de usuarios

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💼 Contacto

**Abogado Wilson Alexander Ipiales Guerron**
- Email: contacto@abogadowilson.com
- Teléfono: +593 99 123 4567
- Ubicación: Ibarra, Ecuador

## 🙏 Agradecimientos

- React Team por el framework
- Vite por el bundler rápido
- Tailwind CSS por los estilos
- Supabase por la infraestructura
- Todos los contribuidores del proyecto

---

**Desarrollado con ❤️ para la comunidad legal** 
