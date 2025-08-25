import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaChartLine, FaUsers, FaShoppingCart, FaCalendarAlt, FaFileAlt, 
  FaCog, FaMoneyBillWave, FaEnvelope, FaComments, FaAward,
  FaEye, FaEdit, FaTrash, FaPlus, FaDownload, FaUpload,
  FaSearch, FaFilter, FaBell, FaUserTie, FaGraduationCap,
  FaBook, FaNewspaper, FaPhone, FaWhatsapp, FaGlobe,
  FaTags, FaImage, FaVideo, FaDatabase, FaLock, FaRocket
} from 'react-icons/fa';

const ComprehensiveAdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [stats, setStats] = useState({
    totalUsers: 1250,
    activeUsers: 890,
    totalSales: 45600,
    monthlyRevenue: 12800,
    totalCourses: 24,
    totalPosts: 156,
    pendingConsultations: 12,
    completedConsultations: 89
  });

  const adminSections = [
    { id: 'overview', name: 'Resumen General', icon: <FaChartLine />, color: 'bg-blue-500' },
    { id: 'users', name: 'Gestión de Usuarios', icon: <FaUsers />, color: 'bg-green-500' },
    { id: 'content', name: 'Gestión de Contenido', icon: <FaFileAlt />, color: 'bg-purple-500' },
    { id: 'ecommerce', name: 'E-commerce', icon: <FaShoppingCart />, color: 'bg-yellow-500' },
    { id: 'consultations', name: 'Consultas', icon: <FaComments />, color: 'bg-indigo-500' },
    { id: 'calendar', name: 'Calendario', icon: <FaCalendarAlt />, color: 'bg-red-500' },
    { id: 'finances', name: 'Finanzas', icon: <FaMoneyBillWave />, color: 'bg-green-600' },
    { id: 'marketing', name: 'Marketing', icon: <FaRocket />, color: 'bg-pink-500' },
    { id: 'settings', name: 'Configuración', icon: <FaCog />, color: 'bg-gray-500' }
  ];

  const recentUsers = [
    { id: 1, name: 'María González', email: 'maria@email.com', role: 'Cliente', status: 'Activo', joinDate: '2024-08-20' },
    { id: 2, name: 'Carlos Mendoza', email: 'carlos@email.com', role: 'Premium', status: 'Activo', joinDate: '2024-08-19' },
    { id: 3, name: 'Ana Rodríguez', email: 'ana@email.com', role: 'Cliente', status: 'Pendiente', joinDate: '2024-08-18' }
  ];

  const recentSales = [
    { id: 1, product: 'Curso de Derecho Civil', customer: 'Juan Pérez', amount: 149.99, date: '2024-08-24' },
    { id: 2, product: 'E-book Derecho Penal', customer: 'María López', amount: 29.99, date: '2024-08-23' },
    { id: 3, product: 'Plan Premium Anual', customer: 'Carlos Silva', amount: 299.99, date: '2024-08-22' }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold opacity-90">Usuarios Totales</h3>
              <p className="text-3xl font-bold">{stats.totalUsers.toLocaleString()}</p>
              <p className="text-sm opacity-75">+12% este mes</p>
            </div>
            <FaUsers className="text-4xl opacity-80" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold opacity-90">Ingresos Mensuales</h3>
              <p className="text-3xl font-bold">${stats.monthlyRevenue.toLocaleString()}</p>
              <p className="text-sm opacity-75">+8% vs mes anterior</p>
            </div>
            <FaMoneyBillWave className="text-4xl opacity-80" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold opacity-90">Cursos Activos</h3>
              <p className="text-3xl font-bold">{stats.totalCourses}</p>
              <p className="text-sm opacity-75">3 nuevos este mes</p>
            </div>
            <FaGraduationCap className="text-4xl opacity-80" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold opacity-90">Consultas Pendientes</h3>
              <p className="text-3xl font-bold">{stats.pendingConsultations}</p>
              <p className="text-sm opacity-75">Requieren atención</p>
            </div>
            <FaComments className="text-4xl opacity-80" />
          </div>
        </motion.div>
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Ingresos por Mes</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {[8500, 9200, 10100, 11800, 12800].map((value, index) => (
              <div key={index} className="flex flex-col items-center">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(value / 12800) * 100}%` }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t w-12"
                />
                <span className="text-xs text-gray-600 mt-2">
                  {['Abr', 'May', 'Jun', 'Jul', 'Ago'][index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Usuarios Recientes</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Ver todos
            </button>
          </div>
          <div className="space-y-3">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaUser className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{user.name}</h4>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    user.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{user.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Sales */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Ventas Recientes</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Ver todas
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Producto</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Cliente</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Monto</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Fecha</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {recentSales.map((sale) => (
                <tr key={sale.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{sale.product}</td>
                  <td className="py-3 px-4">{sale.customer}</td>
                  <td className="py-3 px-4 font-semibold text-green-600">${sale.amount}</td>
                  <td className="py-3 px-4 text-gray-600">{sale.date}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-700">
                        <FaEye />
                      </button>
                      <button className="text-green-600 hover:text-green-700">
                        <FaDownload />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <FaPlus />
          Nuevo Usuario
        </button>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-blue-600">1,250</div>
          <div className="text-gray-600">Total Usuarios</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-green-600">890</div>
          <div className="text-gray-600">Usuarios Activos</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-yellow-600">156</div>
          <div className="text-gray-600">Usuarios Premium</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-red-600">23</div>
          <div className="text-gray-600">Usuarios Bloqueados</div>
        </div>
      </div>

      {/* User Management Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Lista de Usuarios</h3>
            <div className="flex gap-2">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar usuarios..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <FaFilter />
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Usuario</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Email</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Rol</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Estado</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Registro</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <FaUser className="text-blue-600" />
                      </div>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{user.email}</td>
                  <td className="py-4 px-6">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded text-sm ${
                      user.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{user.joinDate}</td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-700 p-1">
                        <FaEye />
                      </button>
                      <button className="text-green-600 hover:text-green-700 p-1">
                        <FaEdit />
                      </button>
                      <button className="text-red-600 hover:text-red-700 p-1">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContentManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Gestión de Contenido</h2>
        <div className="flex gap-2">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <FaPlus />
            Nuevo Artículo
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <FaPlus />
            Nuevo Curso
          </button>
        </div>
      </div>

      {/* Content Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <FaNewspaper className="text-3xl text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold">156</div>
          <div className="text-gray-600 text-sm">Artículos</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <FaGraduationCap className="text-3xl text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold">24</div>
          <div className="text-gray-600 text-sm">Cursos</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <FaBook className="text-3xl text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold">18</div>
          <div className="text-gray-600 text-sm">E-Books</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <FaVideo className="text-3xl text-red-600 mx-auto mb-2" />
          <div className="text-2xl font-bold">12</div>
          <div className="text-gray-600 text-sm">Videos</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <FaComments className="text-3xl text-yellow-600 mx-auto mb-2" />
          <div className="text-2xl font-bold">89</div>
          <div className="text-gray-600 text-sm">Foro Posts</div>
        </div>
      </div>

      {/* Content Management Tabs */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {['Artículos', 'Cursos', 'E-Books', 'Videos', 'Foro'].map((tab) => (
              <button
                key={tab}
                className="py-4 px-2 border-b-2 border-transparent hover:border-blue-500 text-gray-600 hover:text-blue-600 font-medium"
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Artículos del Blog</h3>
            <div className="flex gap-2">
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <FaUpload />
              </button>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <FaDownload />
              </button>
            </div>
          </div>
          
          <div className="space-y-3">
            {[
              { title: 'Nuevas Reformas al Código Penal', status: 'Publicado', date: '2024-08-20', views: 1250 },
              { title: 'Guía de Contratos Comerciales', status: 'Borrador', date: '2024-08-19', views: 0 },
              { title: 'Derechos del Consumidor Online', status: 'Publicado', date: '2024-08-18', views: 890 }
            ].map((article, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <FaNewspaper className="text-blue-600" />
                  <div>
                    <h4 className="font-medium">{article.title}</h4>
                    <p className="text-sm text-gray-600">{article.date} • {article.views} vistas</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded text-sm ${
                    article.status === 'Publicado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {article.status}
                  </span>
                  <div className="flex gap-1">
                    <button className="text-blue-600 hover:text-blue-700 p-1">
                      <FaEye />
                    </button>
                    <button className="text-green-600 hover:text-green-700 p-1">
                      <FaEdit />
                    </button>
                    <button className="text-red-600 hover:text-red-700 p-1">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'overview': return renderOverview();
      case 'users': return renderUserManagement();
      case 'content': return renderContentManagement();
      case 'ecommerce': return <div className="text-center py-12 text-gray-500">Gestión de E-commerce en desarrollo...</div>;
      case 'consultations': return <div className="text-center py-12 text-gray-500">Gestión de Consultas en desarrollo...</div>;
      case 'calendar': return <div className="text-center py-12 text-gray-500">Sistema de Calendario en desarrollo...</div>;
      case 'finances': return <div className="text-center py-12 text-gray-500">Gestión Financiera en desarrollo...</div>;
      case 'marketing': return <div className="text-center py-12 text-gray-500">Herramientas de Marketing en desarrollo...</div>;
      case 'settings': return <div className="text-center py-12 text-gray-500">Configuración del Sistema en desarrollo...</div>;
      default: return renderOverview();
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Panel Admin</h1>
            <p className="text-sm text-gray-600 mt-1">Sistema de Gestión Integral</p>
          </div>
          
          <nav className="mt-6">
            {adminSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-blue-50 transition-colors ${
                  activeSection === section.id ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
                }`}
              >
                <span className="mr-3">{section.icon}</span>
                <span className="font-medium">{section.name}</span>
              </button>
            ))}
          </nav>

          {/* Quick Actions */}
          <div className="p-6 mt-8 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Acciones Rápidas
            </h3>
            <div className="space-y-2">
              <button className="w-full text-left text-sm text-gray-600 hover:text-blue-600 py-1">
                <FaPlus className="inline mr-2" />
                Nuevo Usuario
              </button>
              <button className="w-full text-left text-sm text-gray-600 hover:text-blue-600 py-1">
                <FaNewspaper className="inline mr-2" />
                Nuevo Artículo
              </button>
              <button className="w-full text-left text-sm text-gray-600 hover:text-blue-600 py-1">
                <FaEnvelope className="inline mr-2" />
                Enviar Newsletter
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderSection()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveAdminDashboard;
