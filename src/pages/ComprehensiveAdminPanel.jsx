import React, { useState, useEffect } from 'react';
import { 
  FaUsers, FaFileAlt, FaShoppingCart, FaCalendarAlt, FaCog, FaChartLine, 
  FaGraduationCap, FaEnvelope, FaBell, FaPhone, FaWhatsapp, FaPlus, FaEdit, 
  FaTrash, FaSearch, FaFilter, FaDownload, FaUpload, FaEye, FaSave, FaDatabase,
  FaGlobe, FaCreditCard, FaUserTie, FaBuilding, FaClipboardList, FaTags,
  FaComments, FaNewspaper, FaVideo, FaBook, FaMicrophone, FaImage, FaCode,
  FaRobot, FaMailBulk, FaBullhorn, FaChartBar, FaMoneyBillWave, FaReceipt
} from 'react-icons/fa';

const ComprehensiveAdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [content, setContent] = useState([]);
  const [orders, setOrders] = useState([]);
  const [appointments, setBookings] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    // Load mock data - in real app, this would come from APIs
    setUsers([
      { id: 1, name: 'Juan Pérez', email: 'juan@email.com', role: 'client', status: 'active', created: '2024-01-15' },
      { id: 2, name: 'María García', email: 'maria@email.com', role: 'client', status: 'active', created: '2024-01-10' },
      { id: 3, name: 'Carlos López', email: 'carlos@email.com', role: 'admin', status: 'active', created: '2024-01-05' }
    ]);

    setContent([
      { id: 1, title: 'Reforma Laboral 2024', type: 'blog', status: 'published', author: 'Admin', created: '2024-01-20' },
      { id: 2, title: 'Guía Derecho Civil', type: 'ebook', status: 'draft', author: 'Admin', created: '2024-01-18' },
      { id: 3, title: 'Curso Derecho Penal', type: 'course', status: 'published', author: 'Admin', created: '2024-01-15' }
    ]);

    setOrders([
      { id: 1, customer: 'Juan Pérez', total: 150, status: 'completed', date: '2024-01-20', items: 2 },
      { id: 2, customer: 'María García', total: 300, status: 'pending', date: '2024-01-19', items: 1 },
      { id: 3, customer: 'Carlos López', total: 75, status: 'completed', date: '2024-01-18', items: 3 }
    ]);

    setBookings([
      { id: 1, client: 'Juan Pérez', service: 'Consulta Penal', date: '2024-01-25', time: '10:00', status: 'confirmed' },
      { id: 2, client: 'María García', service: 'Consulta Civil', date: '2024-01-24', time: '14:00', status: 'pending' }
    ]);

    setAnalytics({
      totalUsers: 1250,
      totalRevenue: 45000,
      totalOrders: 320,
      totalBookings: 85,
      monthlyGrowth: 15.5,
      conversionRate: 3.2
    });
  };

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: <FaChartLine /> },
    { id: 'users', name: 'Usuarios', icon: <FaUsers /> },
    { id: 'content', name: 'Contenido', icon: <FaFileAlt /> },
    { id: 'orders', name: 'Ventas', icon: <FaShoppingCart /> },
    { id: 'bookings', name: 'Citas', icon: <FaCalendarAlt /> },
    { id: 'courses', name: 'Cursos', icon: <FaGraduationCap /> },
    { id: 'communications', name: 'Comunicaciones', icon: <FaEnvelope /> },
    { id: 'marketing', name: 'Marketing', icon: <FaBullhorn /> },
    { id: 'finances', name: 'Finanzas', icon: <FaMoneyBillWave /> },
    { id: 'website', name: 'Sitio Web', icon: <FaGlobe /> },
    { id: 'automation', name: 'Automatización', icon: <FaRobot /> },
    { id: 'settings', name: 'Configuración', icon: <FaCog /> }
  ];

  const DashboardTab = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Usuarios</p>
              <p className="text-3xl font-bold text-blue-600">{analytics.totalUsers?.toLocaleString()}</p>
            </div>
            <FaUsers className="text-4xl text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Ingresos Totales</p>
              <p className="text-3xl font-bold text-green-600">${analytics.totalRevenue?.toLocaleString()}</p>
            </div>
            <FaMoneyBillWave className="text-4xl text-green-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Órdenes</p>
              <p className="text-3xl font-bold text-purple-600">{analytics.totalOrders}</p>
            </div>
            <FaShoppingCart className="text-4xl text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Citas</p>
              <p className="text-3xl font-bold text-orange-600">{analytics.totalBookings}</p>
            </div>
            <FaCalendarAlt className="text-4xl text-orange-600" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <FaPlus className="text-2xl text-blue-600 mb-2" />
            <span className="text-sm font-medium">Nuevo Usuario</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <FaFileAlt className="text-2xl text-green-600 mb-2" />
            <span className="text-sm font-medium">Crear Contenido</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <FaEnvelope className="text-2xl text-purple-600 mb-2" />
            <span className="text-sm font-medium">Enviar Email</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
            <FaChartBar className="text-2xl text-orange-600 mb-2" />
            <span className="text-sm font-medium">Ver Reportes</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Actividad Reciente</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Nueva orden recibida</p>
                <p className="text-xs text-gray-500">hace 5 minutos</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Usuario registrado</p>
                <p className="text-xs text-gray-500">hace 15 minutos</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Cita agendada</p>
                <p className="text-xs text-gray-500">hace 30 minutos</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Próximas Citas</h3>
          <div className="space-y-3">
            {appointments.slice(0, 3).map(booking => (
              <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{booking.client}</p>
                  <p className="text-sm text-gray-600">{booking.service}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{booking.date}</p>
                  <p className="text-xs text-gray-500">{booking.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const UsersTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold">Gestión de Usuarios</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <FaPlus className="mr-2" /> Nuevo Usuario
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input 
                type="text" 
                placeholder="Buscar usuarios..." 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select className="p-3 border border-gray-300 rounded-lg">
              <option>Todos los roles</option>
              <option>Cliente</option>
              <option>Admin</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rol</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.created}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800"><FaEye /></button>
                      <button className="text-green-600 hover:text-green-800"><FaEdit /></button>
                      <button className="text-red-600 hover:text-red-800"><FaTrash /></button>
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

  const ContentTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold">Gestión de Contenido</h3>
        <div className="flex space-x-2">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center">
            <FaPlus className="mr-2" /> Nuevo Post
          </button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center">
            <FaBook className="mr-2" /> Nuevo Curso
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <FaNewspaper className="mx-auto text-4xl text-blue-600 mb-4" />
          <h4 className="font-semibold mb-2">Blog Posts</h4>
          <p className="text-3xl font-bold text-blue-600">24</p>
          <p className="text-sm text-gray-500">Publicados</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <FaBook className="mx-auto text-4xl text-green-600 mb-4" />
          <h4 className="font-semibold mb-2">E-Books</h4>
          <p className="text-3xl font-bold text-green-600">12</p>
          <p className="text-sm text-gray-500">Disponibles</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <FaVideo className="mx-auto text-4xl text-purple-600 mb-4" />
          <h4 className="font-semibold mb-2">Cursos</h4>
          <p className="text-3xl font-bold text-purple-600">8</p>
          <p className="text-sm text-gray-500">Activos</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <FaMicrophone className="mx-auto text-4xl text-orange-600 mb-4" />
          <h4 className="font-semibold mb-2">Podcasts</h4>
          <p className="text-3xl font-bold text-orange-600">15</p>
          <p className="text-sm text-gray-500">Episodios</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              type="text" 
              placeholder="Buscar contenido..." 
              className="flex-1 p-3 border border-gray-300 rounded-lg"
            />
            <select className="p-3 border border-gray-300 rounded-lg">
              <option>Todos los tipos</option>
              <option>Blog</option>
              <option>E-book</option>
              <option>Curso</option>
              <option>Video</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Título</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Autor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {content.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{item.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.type === 'blog' ? 'bg-blue-100 text-blue-800' : 
                      item.type === 'ebook' ? 'bg-green-100 text-green-800' : 
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.author}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.created}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800"><FaEye /></button>
                      <button className="text-green-600 hover:text-green-800"><FaEdit /></button>
                      <button className="text-red-600 hover:text-red-800"><FaTrash /></button>
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

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardTab />;
      case 'users': return <UsersTab />;
      case 'content': return <ContentTab />;
      case 'orders': return <div className="text-center py-12"><p className="text-gray-500">Módulo de Ventas - En desarrollo</p></div>;
      case 'bookings': return <div className="text-center py-12"><p className="text-gray-500">Módulo de Citas - En desarrollo</p></div>;
      case 'courses': return <div className="text-center py-12"><p className="text-gray-500">Módulo de Cursos - En desarrollo</p></div>;
      case 'communications': return <div className="text-center py-12"><p className="text-gray-500">Módulo de Comunicaciones - En desarrollo</p></div>;
      case 'marketing': return <div className="text-center py-12"><p className="text-gray-500">Módulo de Marketing - En desarrollo</p></div>;
      case 'finances': return <div className="text-center py-12"><p className="text-gray-500">Módulo de Finanzas - En desarrollo</p></div>;
      case 'website': return <div className="text-center py-12"><p className="text-gray-500">Constructor de Sitio Web - En desarrollo</p></div>;
      case 'automation': return <div className="text-center py-12"><p className="text-gray-500">Módulo de Automatización - En desarrollo</p></div>;
      case 'settings': return <div className="text-center py-12"><p className="text-gray-500">Configuración del Sistema - En desarrollo</p></div>;
      default: return <DashboardTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
          <p className="text-gray-600">Sistema integral de gestión legal profesional</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <div className="bg-white rounded-xl shadow-lg p-4">
              <nav className="space-y-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {tab.icon}
                    <span className="font-medium">{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderActiveTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveAdminPanel;
