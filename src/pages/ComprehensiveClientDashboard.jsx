import React, { useState, useEffect } from 'react';
import { FaUser, FaShoppingCart, FaCalendarAlt, FaBook, FaCreditCard, FaChartLine, FaBell, FaCog, FaDownload, FaEye, FaStar } from 'react-icons/fa';

const ComprehensiveClientDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [courses, setCourses] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Load user data
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    setUser(userData);

    // Load orders
    const ordersData = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(ordersData);

    // Load bookings
    const bookingsData = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(bookingsData);

    // Load mock courses
    setCourses([
      {
        id: 1,
        title: 'Fundamentos del Derecho Ecuatoriano',
        progress: 75,
        lastAccessed: '2024-01-20',
        certificate: true
      },
      {
        id: 2,
        title: 'Derecho Comercial Avanzado',
        progress: 45,
        lastAccessed: '2024-01-18',
        certificate: false
      }
    ]);

    // Load mock notifications
    setNotifications([
      {
        id: 1,
        title: 'Nueva actualización legal',
        message: 'Se han actualizado las reformas laborales 2024',
        date: '2024-01-21',
        read: false,
        type: 'info'
      },
      {
        id: 2,
        title: 'Cita confirmada',
        message: 'Su cita del 25 de enero ha sido confirmada',
        date: '2024-01-20',
        read: true,
        type: 'success'
      }
    ]);
  }, []);

  const tabs = [
    { id: 'overview', name: 'Resumen', icon: <FaChartLine /> },
    { id: 'orders', name: 'Mis Compras', icon: <FaShoppingCart /> },
    { id: 'bookings', name: 'Mis Citas', icon: <FaCalendarAlt /> },
    { id: 'courses', name: 'Mis Cursos', icon: <FaBook /> },
    { id: 'profile', name: 'Mi Perfil', icon: <FaUser /> },
    { id: 'notifications', name: 'Notificaciones', icon: <FaBell /> }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const OverviewTab = () => (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Stats Cards */}
      <div className="lg:col-span-2 grid md:grid-cols-2 gap-4">
        <div className="bg-blue-50 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 font-medium">Total Gastado</p>
              <p className="text-2xl font-bold text-blue-900">
                {formatPrice(orders.reduce((sum, order) => sum + order.total, 0))}
              </p>
            </div>
            <FaCreditCard className="text-3xl text-blue-600" />
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 font-medium">Cursos Completados</p>
              <p className="text-2xl font-bold text-green-900">
                {courses.filter(c => c.progress === 100).length}
              </p>
            </div>
            <FaBook className="text-3xl text-green-600" />
          </div>
        </div>

        <div className="bg-purple-50 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 font-medium">Citas Agendadas</p>
              <p className="text-2xl font-bold text-purple-900">{bookings.length}</p>
            </div>
            <FaCalendarAlt className="text-3xl text-purple-600" />
          </div>
        </div>

        <div className="bg-orange-50 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 font-medium">Compras Realizadas</p>
              <p className="text-2xl font-bold text-orange-900">{orders.length}</p>
            </div>
            <FaShoppingCart className="text-3xl text-orange-600" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Actividad Reciente</h3>
        <div className="space-y-4">
          {orders.slice(0, 3).map(order => (
            <div key={order.id} className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Compra realizada</p>
                <p className="text-xs text-gray-500">{formatDate(order.createdAt)}</p>
              </div>
              <span className="text-sm font-semibold">{formatPrice(order.total)}</span>
            </div>
          ))}
          {bookings.slice(0, 2).map(booking => (
            <div key={booking.id} className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Cita agendada</p>
                <p className="text-xs text-gray-500">{formatDate(booking.date)}</p>
              </div>
              <span className="text-sm text-gray-600">{booking.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const OrdersTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Historial de Compras</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <FaDownload className="mr-2" />
          Exportar
        </button>
      </div>

      <div className="grid gap-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-semibold text-lg">Pedido #{order.id}</h4>
                <p className="text-gray-600">{formatDate(order.createdAt)}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{formatPrice(order.total)}</p>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getOrderStatusColor(order.status)}`}>
                  {order.status === 'confirmed' ? 'Confirmado' : order.status}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              {order.items?.map(item => (
                <div key={`${item.id}-${item.type}`} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <img src={item.image || '/images/placeholder.jpg'} alt={item.title} className="w-12 h-12 object-cover rounded" />
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatPrice(item.price)}</p>
                    {item.quantity && <p className="text-sm text-gray-600">Qty: {item.quantity}</p>}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-4 space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <FaEye className="mr-2" />
                Ver Detalles
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <FaDownload className="mr-2" />
                Factura
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const BookingsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Mis Citas</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <FaCalendarAlt className="mr-2" />
          Nueva Cita
        </button>
      </div>

      <div className="grid gap-4">
        {bookings.map(booking => (
          <div key={booking.id} className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-lg">
                  {booking.service === 'consultation' ? 'Consulta Legal' : booking.service}
                </h4>
                <div className="mt-2 space-y-1">
                  <p className="text-gray-600">
                    <FaCalendarAlt className="inline mr-2" />
                    {formatDate(booking.date)} a las {booking.time}
                  </p>
                  <p className="text-gray-600">
                    Tipo: {booking.type === 'presencial' ? 'Presencial' : 'Virtual'}
                  </p>
                  <p className="text-gray-600">Cliente: {booking.client?.name}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  booking.status === 'confirmed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {booking.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
                </span>
              </div>
            </div>

            {booking.client?.description && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">{booking.client.description}</p>
              </div>
            )}

            <div className="flex justify-end mt-4 space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Reprogramar
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                Cancelar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const CoursesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Mis Cursos</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Explorar Cursos
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-semibold text-lg">{course.title}</h4>
              {course.certificate && course.progress === 100 && (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-600 text-xs rounded-full">
                  Certificado Disponible
                </span>
              )}
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Progreso</span>
                <span>{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Último acceso: {formatDate(course.lastAccessed)}
            </p>

            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                Continuar
              </button>
              {course.certificate && course.progress === 100 && (
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <FaDownload />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ProfileTab = () => (
    <div className="max-w-2xl space-y-6">
      <h3 className="text-xl font-semibold">Mi Perfil</h3>
      
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center space-x-4 mb-6">
          <img 
            src={user?.avatar || '/images/default-avatar.jpg'} 
            alt="Avatar" 
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h4 className="text-xl font-semibold">{user?.name || 'Usuario'}</h4>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-sm text-gray-500">Cliente desde enero 2024</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Nombre</label>
            <input 
              type="text" 
              value={user?.name || ''} 
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input 
              type="email" 
              value={user?.email || ''} 
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Teléfono</label>
            <input 
              type="tel" 
              placeholder="+593 123 456 789"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Ciudad</label>
            <input 
              type="text" 
              placeholder="Ibarra"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div className="mt-6">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );

  const NotificationsTab = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Notificaciones</h3>
      
      {notifications.map(notification => (
        <div key={notification.id} className={`p-4 rounded-xl border-l-4 ${
          notification.type === 'success' ? 'border-green-500 bg-green-50' :
          notification.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
          'border-blue-500 bg-blue-50'
        } ${!notification.read ? 'bg-opacity-100' : 'bg-opacity-50'}`}>
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold">{notification.title}</h4>
              <p className="text-gray-600 mt-1">{notification.message}</p>
              <p className="text-sm text-gray-500 mt-2">{formatDate(notification.date)}</p>
            </div>
            {!notification.read && (
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mi Dashboard</h1>
          <p className="text-gray-600">Gestiona tu cuenta, compras y servicios legales</p>
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
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'orders' && <OrdersTab />}
            {activeTab === 'bookings' && <BookingsTab />}
            {activeTab === 'courses' && <CoursesTab />}
            {activeTab === 'profile' && <ProfileTab />}
            {activeTab === 'notifications' && <NotificationsTab />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveClientDashboard;
