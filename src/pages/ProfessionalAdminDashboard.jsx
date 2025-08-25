import React, { useState, useEffect } from 'react';
import { 
  FaChartLine, FaUsers, FaShoppingCart, FaCalendarAlt, FaFileAlt, 
  FaCog, FaMoneyBillWave, FaBell, FaSearch, FaPlus, FaEdit, FaTrash,
  FaEye, FaDownload, FaUpload, FaFilter, FaSort, FaGraduationCap,
  FaRobot, FaGlobe, FaStore, FaBox, FaServicestack, FaUserMd,
  FaComments, FaEnvelope, FaClipboardList, FaPaintBrush
} from 'react-icons/fa';

// Import management components
import ProductManager from '../components/ProductManagement/ProductManager';
import ConsultationManager from '../components/ConsultationManagement/ConsultationManager';
import FinanceManager from '../components/FinanceManagement/FinanceManager';

const ProfessionalAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 1247,
    totalRevenue: 89750,
    activeProjects: 23,
    pendingOrders: 15
  });

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: <FaChartLine />, color: 'blue' },
    { id: 'users', name: 'Usuarios', icon: <FaUsers />, color: 'green' },
    { id: 'products', name: 'Productos', icon: <FaBox />, color: 'purple' },
    { id: 'services', name: 'Servicios', icon: <FaServicestack />, color: 'indigo' },
    { id: 'consultations', name: 'Consultas', icon: <FaUserMd />, color: 'pink' },
    { id: 'orders', name: 'Pedidos', icon: <FaShoppingCart />, color: 'orange' },
    { id: 'courses', name: 'Cursos', icon: <FaGraduationCap />, color: 'teal' },
    { id: 'content', name: 'Contenido', icon: <FaFileAlt />, color: 'red' },
    { id: 'website', name: 'Sitio Web', icon: <FaGlobe />, color: 'cyan' },
    { id: 'automation', name: 'Automatización', icon: <FaRobot />, color: 'yellow' },
    { id: 'finances', name: 'Finanzas', icon: <FaMoneyBillWave />, color: 'emerald' },
    { id: 'settings', name: 'Configuración', icon: <FaCog />, color: 'gray' }
  ];

  // Glassmorphism card component
  const GlassCard = ({ children, className = '', hover = false }) => (
    <div className={`
      backdrop-blur-lg bg-white/20 border border-white/20 rounded-2xl shadow-xl
      ${hover ? 'hover:bg-white/30 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1' : ''}
      ${className}
    `}>
      {children}
    </div>
  );

  // Dashboard Overview
  const DashboardTab = () => (
    <div className="space-y-6 animate-fadeIn">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Usuarios Totales', value: stats.totalUsers.toLocaleString(), icon: <FaUsers />, color: 'blue' },
          { title: 'Ingresos Totales', value: `$${stats.totalRevenue.toLocaleString()}`, icon: <FaMoneyBillWave />, color: 'green' },
          { title: 'Proyectos Activos', value: stats.activeProjects, icon: <FaChartLine />, color: 'purple' },
          { title: 'Pedidos Pendientes', value: stats.pendingOrders, icon: <FaShoppingCart />, color: 'orange' }
        ].map((stat, index) => (
          <GlassCard key={index} hover className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                <p className={`text-3xl font-bold text-${stat.color}-600 mt-2`}>{stat.value}</p>
              </div>
              <div className={`text-4xl text-${stat.color}-600 opacity-80`}>
                {stat.icon}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Actividad Reciente</h3>
          <div className="space-y-4">
            {[
              { action: 'Nuevo usuario registrado', user: 'Ana García', time: 'Hace 5 min' },
              { action: 'Pedido completado', user: 'Carlos López', time: 'Hace 15 min' },
              { action: 'Consulta programada', user: 'María Silva', time: 'Hace 1 hora' },
              { action: 'Curso finalizado', user: 'Juan Pérez', time: 'Hace 2 horas' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.user}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Resumen de Ventas</h3>
          <div className="space-y-4">
            <div className="h-40 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-lg flex items-center justify-center">
              <p className="text-gray-600">Gráfico de Ventas</p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600">$15.2K</p>
                <p className="text-sm text-gray-600">Hoy</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">$89.7K</p>
                <p className="text-sm text-gray-600">Este Mes</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">$245K</p>
                <p className="text-sm text-gray-600">Este Año</p>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );

  // Products Management
  const ProductsTab = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Productos</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <FaPlus /> Nuevo Producto
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <GlassCard className="p-4" hover>
          <h3 className="font-semibold text-gray-800 mb-2">Productos Digitales</h3>
          <p className="text-sm text-gray-600 mb-4">Ebooks, cursos, software</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Total:</span>
              <span className="font-medium">47 productos</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Activos:</span>
              <span className="font-medium text-green-600">42</span>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-4" hover>
          <h3 className="font-semibold text-gray-800 mb-2">Productos Físicos</h3>
          <p className="text-sm text-gray-600 mb-4">Libros, material legal</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Total:</span>
              <span className="font-medium">23 productos</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>En Stock:</span>
              <span className="font-medium text-blue-600">19</span>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-4" hover>
          <h3 className="font-semibold text-gray-800 mb-2">Más Vendidos</h3>
          <p className="text-sm text-gray-600 mb-4">Top productos</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Curso Derecho Laboral</span>
              <span className="font-medium">$299</span>
            </div>
            <div className="flex justify-between">
              <span>Ebook Civil</span>
              <span className="font-medium">$49</span>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );

  // Services Management
  const ServicesTab = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Servicios</h2>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
          <FaPlus /> Nuevo Servicio
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Servicios Digitales</h3>
          <div className="space-y-4">
            {[
              { name: 'Consulta Virtual', price: '$150/hora', status: 'Activo' },
              { name: 'Revisión de Documentos Online', price: '$100', status: 'Activo' },
              { name: 'Asesoría por Chat', price: '$75/sesión', status: 'Activo' }
            ].map((service, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{service.name}</p>
                  <p className="text-sm text-gray-600">{service.price}</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                  {service.status}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Servicios Presenciales</h3>
          <div className="space-y-4">
            {[
              { name: 'Consulta en Oficina', price: '$200/hora', status: 'Activo' },
              { name: 'Representación Legal', price: '$500+', status: 'Activo' },
              { name: 'Trámites Presenciales', price: '$300', status: 'Activo' }
            ].map((service, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{service.name}</p>
                  <p className="text-sm text-gray-600">{service.price}</p>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                  {service.status}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );

  // Website Builder Tab
  const WebsiteTab = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Constructor de Sitio Web</h2>
        <button 
          onClick={() => window.open('/website-builder', '_blank')}
          className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center gap-2"
        >
          <FaPaintBrush /> Abrir Constructor
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <GlassCard className="p-6" hover>
          <h3 className="font-semibold text-gray-800 mb-4">Páginas Activas</h3>
          <div className="space-y-3">
            {[
              { name: 'Página Principal', status: 'Publicada' },
              { name: 'Servicios', status: 'Borrador' },
              { name: 'Blog', status: 'Publicada' },
              { name: 'Contacto', status: 'Publicada' }
            ].map((page, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-gray-700">{page.name}</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  page.status === 'Publicada' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {page.status}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6" hover>
          <h3 className="font-semibold text-gray-800 mb-4">Plantillas</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
              <p className="font-medium">Legal Pro</p>
              <p className="text-sm text-gray-600">Plantilla profesional</p>
            </button>
            <button className="w-full text-left p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
              <p className="font-medium">Corporate Clean</p>
              <p className="text-sm text-gray-600">Diseño corporativo</p>
            </button>
          </div>
        </GlassCard>

        <GlassCard className="p-6" hover>
          <h3 className="font-semibold text-gray-800 mb-4">Estadísticas Web</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Visitantes hoy:</span>
              <span className="font-medium">1,247</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Páginas vistas:</span>
              <span className="font-medium">3,891</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Tiempo promedio:</span>
              <span className="font-medium">3:45</span>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );

  // Users Management Tab
  const UsersTab = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Usuarios</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <FaPlus /> Nuevo Usuario
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Usuarios</p>
              <p className="text-2xl font-bold text-blue-600">1,247</p>
            </div>
            <FaUsers className="text-3xl text-blue-600 opacity-80" />
          </div>
        </GlassCard>
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Activos Hoy</p>
              <p className="text-2xl font-bold text-green-600">324</p>
            </div>
            <FaEye className="text-3xl text-green-600 opacity-80" />
          </div>
        </GlassCard>
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Nuevos Este Mes</p>
              <p className="text-2xl font-bold text-purple-600">89</p>
            </div>
            <FaPlus className="text-3xl text-purple-600 opacity-80" />
          </div>
        </GlassCard>
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Premium</p>
              <p className="text-2xl font-bold text-orange-600">156</p>
            </div>
            <FaShoppingCart className="text-3xl text-orange-600 opacity-80" />
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Usuarios Recientes</h3>
        <div className="space-y-4">
          {[
            { name: 'María García', email: 'maria@email.com', role: 'Cliente', status: 'Activo', joined: '2024-01-15' },
            { name: 'Carlos López', email: 'carlos@email.com', role: 'Cliente Premium', status: 'Activo', joined: '2024-01-14' },
            { name: 'Ana Silva', email: 'ana@email.com', role: 'Cliente', status: 'Inactivo', joined: '2024-01-13' }
          ].map((user, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-800">{user.role}</p>
                <span className={`px-2 py-1 rounded text-xs ${
                  user.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {user.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );

  // Content Management Tab
  const ContentTab = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Contenido</h2>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
          <FaPlus /> Nuevo Contenido
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6" hover>
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaFileAlt className="text-blue-600" />
            Blog Posts
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Publicados:</span>
              <span className="font-medium">45</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Borradores:</span>
              <span className="font-medium">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Programados:</span>
              <span className="font-medium">3</span>
            </div>
          </div>
          <button className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Gestionar Blog
          </button>
        </GlassCard>

        <GlassCard className="p-6" hover>
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaGraduationCap className="text-green-600" />
            Cursos
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Activos:</span>
              <span className="font-medium">8</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">En desarrollo:</span>
              <span className="font-medium">4</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estudiantes:</span>
              <span className="font-medium">892</span>
            </div>
          </div>
          <button className="w-full mt-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Gestionar Cursos
          </button>
        </GlassCard>

        <GlassCard className="p-6" hover>
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaEnvelope className="text-purple-600" />
            Newsletter
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Suscriptores:</span>
              <span className="font-medium">2,156</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Campañas:</span>
              <span className="font-medium">24</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tasa apertura:</span>
              <span className="font-medium">68%</span>
            </div>
          </div>
          <button className="w-full mt-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            Gestionar Newsletter
          </button>
        </GlassCard>
      </div>
    </div>
  );

  // Automation Tab
  const AutomationTab = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Sistema de Automatización</h2>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
          <FaRobot /> Nueva Automatización
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: 'Email de Bienvenida',
            description: 'Envío automático a nuevos usuarios',
            status: 'active',
            triggers: 156,
            color: 'blue'
          },
          {
            title: 'Seguimiento de Consultas',
            description: 'Recordatorios automáticos de citas',
            status: 'active',
            triggers: 89,
            color: 'green'
          },
          {
            title: 'Facturas Vencidas',
            description: 'Notificaciones de pagos pendientes',
            status: 'active',
            triggers: 23,
            color: 'red'
          },
          {
            title: 'Newsletter Semanal',
            description: 'Envío automático los domingos',
            status: 'paused',
            triggers: 0,
            color: 'purple'
          },
          {
            title: 'Backup de Datos',
            description: 'Respaldo diario automático',
            status: 'active',
            triggers: 30,
            color: 'orange'
          },
          {
            title: 'Reportes Mensuales',
            description: 'Generación automática de informes',
            status: 'active',
            triggers: 12,
            color: 'indigo'
          }
        ].map((automation, index) => (
          <GlassCard key={index} hover className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 bg-${automation.color}-100 text-${automation.color}-600 rounded-lg flex items-center justify-center`}>
                <FaRobot />
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                automation.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {automation.status === 'active' ? 'Activo' : 'Pausado'}
              </span>
            </div>
            
            <h3 className="font-semibold text-gray-800 mb-2">{automation.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{automation.description}</p>
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-600">Ejecutado:</span>
              <span className="font-medium text-gray-800">{automation.triggers} veces</span>
            </div>
            
            <div className="flex gap-2">
              <button className="flex-1 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                Configurar
              </button>
              <button className={`px-3 py-2 rounded-lg transition-colors ${
                automation.status === 'active' 
                  ? 'bg-yellow-600 text-white hover:bg-yellow-700' 
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}>
                {automation.status === 'active' ? 'Pausar' : 'Activar'}
              </button>
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Estadísticas de Automatización</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">6</p>
            <p className="text-sm text-gray-600">Automatizaciones Activas</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">310</p>
            <p className="text-sm text-gray-600">Ejecutadas Este Mes</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-600">98.5%</p>
            <p className="text-sm text-gray-600">Tasa de Éxito</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-orange-600">45h</p>
            <p className="text-sm text-gray-600">Tiempo Ahorrado</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardTab />;
      case 'products': return <ProductManager />;
      case 'services': return <ServicesTab />;
      case 'consultations': return <ConsultationManager />;
      case 'website': return <WebsiteTab />;
      case 'finances': return <FinanceManager />;
      case 'users': return <UsersTab />;
      case 'content': return <ContentTab />;
      case 'automation': return <AutomationTab />;
      default: return (
        <div className="text-center py-20 animate-fadeIn">
          <div className="text-6xl text-gray-400 mb-4">🚧</div>
          <p className="text-xl text-gray-600">Sección en desarrollo</p>
          <p className="text-gray-500 mt-2">Esta funcionalidad estará disponible pronto</p>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="backdrop-blur-lg bg-white/30 border-b border-white/20 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-sm"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-800 transition-colors">
                <FaBell className="text-xl" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 backdrop-blur-lg bg-white/20 border-r border-white/20 min-h-screen">
          <nav className="p-4 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? `bg-${tab.color}-100/50 text-${tab.color}-700 shadow-lg transform scale-105`
                    : 'text-gray-600 hover:bg-white/30 hover:text-gray-800'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderTabContent()}
        </main>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProfessionalAdminDashboard;
