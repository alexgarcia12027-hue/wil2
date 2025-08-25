import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaCalendarAlt, FaFileAlt, FaChartBar, FaCog, FaUsers, FaShoppingCart, FaGraduationCap, FaBlog, FaEnvelope, FaPhone, FaWhatsapp, FaDownload, FaCheckCircle, FaBook, FaCreditCard } from 'react-icons/fa';

const ProfessionalDashboard = ({ userRole = 'client' }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userData, setUserData] = useState({
    name: 'Usuario',
    email: 'usuario@email.com',
    credits: 150,
    nextAppointment: null,
    recentActivity: [],
    courses: [],
    purchases: []
  });

  useEffect(() => {
    // Load user data from localStorage or API
    const savedUserData = JSON.parse(localStorage.getItem('userData') || '{}');
    setUserData(prev => ({ ...prev, ...savedUserData }));
  }, []);

  const clientSections = [
    { id: 'overview', name: 'Resumen', icon: <FaChartBar /> },
    { id: 'appointments', name: 'Citas', icon: <FaCalendarAlt /> },
    { id: 'documents', name: 'Documentos', icon: <FaFileAlt /> },
    { id: 'courses', name: 'Mis Cursos', icon: <FaGraduationCap /> },
    { id: 'purchases', name: 'Compras', icon: <FaShoppingCart /> },
    { id: 'profile', name: 'Perfil', icon: <FaUser /> },
    { id: 'settings', name: 'Configuración', icon: <FaCog /> },
  ];

  const adminSections = [
    { id: 'overview', name: 'Dashboard', icon: <FaChartBar /> },
    { id: 'users', name: 'Usuarios', icon: <FaUsers /> },
    { id: 'appointments', name: 'Citas', icon: <FaCalendarAlt /> },
    { id: 'content', name: 'Contenido', icon: <FaBlog /> },
    { id: 'products', name: 'Productos', icon: <FaShoppingCart /> },
    { id: 'analytics', name: 'Analíticas', icon: <FaChartBar /> },
    { id: 'settings', name: 'Configuración', icon: <FaCog /> },
  ];

  const sections = userRole === 'admin' ? adminSections : clientSections;

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-500 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Créditos</h3>
              <p className="text-3xl font-bold">{userData.credits}</p>
            </div>
            <FaCreditCard className="text-4xl opacity-80" />
          </div>
        </div>
        
        <div className="bg-green-500 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Citas Este Mes</h3>
              <p className="text-3xl font-bold">8</p>
            </div>
            <FaCalendarAlt className="text-4xl opacity-80" />
          </div>
        </div>
        
        <div className="bg-yellow-500 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Documentos</h3>
              <p className="text-3xl font-bold">24</p>
            </div>
            <FaFileAlt className="text-4xl opacity-80" />
          </div>
        </div>
        
        <div className="bg-purple-500 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Cursos</h3>
              <p className="text-3xl font-bold">3</p>
            </div>
            <FaGraduationCap className="text-4xl opacity-80" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <FaCalendarAlt className="mr-2 text-blue-600" />
            Próximas Citas
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-semibold">Consulta Legal</h4>
                <p className="text-sm text-gray-600">Derecho Civil</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">Mañana</p>
                <p className="text-sm text-gray-600">10:00 AM</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-semibold">Revisión de Documentos</h4>
                <p className="text-sm text-gray-600">Derecho Comercial</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">Viernes</p>
                <p className="text-sm text-gray-600">2:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <FaCheckCircle className="mr-2 text-green-600" />
            Actividad Reciente
          </h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm">Documento "Contrato de Arrendamiento" revisado</p>
                <p className="text-xs text-gray-500">Hace 2 horas</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm">Cita confirmada para mañana</p>
                <p className="text-xs text-gray-500">Hace 4 horas</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm">Curso "Derecho Digital" completado al 75%</p>
                <p className="text-xs text-gray-500">Ayer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gestión de Citas</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Nueva Cita
        </button>
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">Consulta Legal #{item}</h3>
                <p className="text-gray-600">Cliente: Juan Pérez</p>
                <p className="text-sm text-gray-500">Fecha: 25 de Agosto, 2024 - 10:00 AM</p>
              </div>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                Pendiente
              </span>
            </div>
            <div className="mt-3 flex space-x-2">
              <button className="text-blue-600 hover:underline text-sm">Confirmar</button>
              <button className="text-green-600 hover:underline text-sm">Reagendar</button>
              <button className="text-red-600 hover:underline text-sm">Cancelar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'appointments':
        return renderAppointments();
      case 'documents':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Mis Documentos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <FaFileAlt className="text-blue-600 text-xl" />
                    <FaDownload className="text-gray-400 hover:text-blue-600 cursor-pointer" />
                  </div>
                  <h3 className="font-semibold">Documento {item}</h3>
                  <p className="text-sm text-gray-600">Contrato de servicios</p>
                  <p className="text-xs text-gray-500 mt-2">Actualizado: 20/08/2024</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'courses':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Mis Cursos</h2>
            <div className="space-y-4">
              {[
                { name: 'Introducción al Derecho Digital', progress: 75 },
                { name: 'Derecho Penal Avanzado', progress: 45 },
                { name: 'Contratos Comerciales', progress: 90 }
              ].map((course, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{course.name}</h3>
                    <span className="text-sm text-gray-600">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <button className="mt-3 text-blue-600 hover:underline text-sm">
                    Continuar Curso
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">Mi Perfil</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input 
                  type="text" 
                  value={userData.name}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  value={userData.email}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input 
                  type="tel" 
                  placeholder="+593 999 999 999"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                Actualizar Perfil
              </button>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Sección en Desarrollo</h2>
            <p className="text-gray-600">Esta sección estará disponible próximamente.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {userRole === 'admin' ? 'Panel Admin' : 'Mi Portal'}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Bienvenido, {userData.name}
            </p>
          </div>
          <nav className="mt-6">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-blue-50 transition-colors ${
                  activeTab === section.id ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
                }`}
              >
                <span className="mr-3">{section.icon}</span>
                {section.name}
              </button>
            ))}
          </nav>

          {/* Quick Contact */}
          <div className="p-6 mt-8 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Contacto Rápido
            </h3>
            <div className="space-y-2">
              <a 
                href="tel:+593988835269" 
                className="flex items-center text-sm text-gray-600 hover:text-green-600"
              >
                <FaPhone className="mr-2" /> +593 98 883 5269
              </a>
              <a 
                href="https://wa.me/593988835269" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-sm text-gray-600 hover:text-green-600"
              >
                <FaWhatsapp className="mr-2" /> WhatsApp
              </a>
              <a 
                href="mailto:info@abogadowilson.com"
                className="flex items-center text-sm text-gray-600 hover:text-blue-600"
              >
                <FaEnvelope className="mr-2" /> Email
              </a>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDashboard;
