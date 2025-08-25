import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaChartBar, FaCog, FaFileAlt, FaCalendarAlt, FaShoppingCart, FaGraduationCap, FaBlog } from 'react-icons/fa';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const adminSections = [
    { id: 'dashboard', name: 'Dashboard', icon: <FaChartBar /> },
    { id: 'users', name: 'Usuarios', icon: <FaUsers /> },
    { id: 'appointments', name: 'Citas', icon: <FaCalendarAlt /> },
    { id: 'courses', name: 'Cursos', icon: <FaGraduationCap /> },
    { id: 'products', name: 'Productos', icon: <FaShoppingCart /> },
    { id: 'blog', name: 'Blog', icon: <FaBlog /> },
    { id: 'reports', name: 'Reportes', icon: <FaFileAlt /> },
    { id: 'settings', name: 'Configuración', icon: <FaCog /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-500 text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold">Total Usuarios</h3>
              <p className="text-3xl font-bold">1,234</p>
            </div>
            <div className="bg-green-500 text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold">Citas Hoy</h3>
              <p className="text-3xl font-bold">12</p>
            </div>
            <div className="bg-yellow-500 text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold">Consultas Pendientes</h3>
              <p className="text-3xl font-bold">8</p>
            </div>
            <div className="bg-purple-500 text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold">Ingresos Mes</h3>
              <p className="text-3xl font-bold">$5,678</p>
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Gestión de Usuarios</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left">Nombre</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Rol</th>
                    <th className="px-4 py-2 text-left">Estado</th>
                    <th className="px-4 py-2 text-left">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-2">Juan Pérez</td>
                    <td className="px-4 py-2">juan@email.com</td>
                    <td className="px-4 py-2">Cliente</td>
                    <td className="px-4 py-2">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Activo</span>
                    </td>
                    <td className="px-4 py-2">
                      <button className="text-blue-600 hover:underline mr-2">Editar</button>
                      <button className="text-red-600 hover:underline">Eliminar</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'appointments':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Gestión de Citas</h2>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">Consulta Legal - Juan Pérez</h3>
                    <p className="text-gray-600">Derecho Civil</p>
                    <p className="text-sm text-gray-500">Hoy, 10:00 AM</p>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">Pendiente</span>
                </div>
              </div>
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
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900">Panel Admin</h1>
          </div>
          <nav className="mt-6">
            {adminSections.map((section) => (
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

export default Admin;
