import React, { useState } from 'react';
import { FaShoppingCart, FaDownload, FaStar, FaUsers, FaPlay, FaBook, FaGraduationCap } from 'react-icons/fa';
import { ebooks, masterclasses, courses, legalProducts } from '../data/productsData';

const ProductsPage = () => {
  const [activeTab, setActiveTab] = useState('ebooks');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const tabs = [
    { id: 'ebooks', name: 'eBooks', icon: <FaBook />, count: ebooks.length },
    { id: 'masterclasses', name: 'Masterclasses', icon: <FaPlay />, count: masterclasses.length },
    { id: 'courses', name: 'Cursos', icon: <FaGraduationCap />, count: courses.length },
    { id: 'products', name: 'Productos', icon: <FaShoppingCart />, count: legalProducts.length }
  ];

  const getActiveData = () => {
    switch (activeTab) {
      case 'ebooks': return ebooks;
      case 'masterclasses': return masterclasses;
      case 'courses': return courses;
      case 'products': return legalProducts;
      default: return ebooks;
    }
  };

  const filteredData = getActiveData().filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(getActiveData().map(item => item.category))];

  const ProductCard = ({ item }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img 
          src={item.image || '/images/placeholder.jpg'} 
          alt={item.title}
          className="w-full h-48 object-cover"
        />
        {item.originalPrice && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
            -{Math.round((1 - item.price / item.originalPrice) * 100)}%
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{item.title}</h3>
          {item.rating && (
            <div className="flex items-center ml-2">
              <FaStar className="text-yellow-400 mr-1" />
              <span className="text-sm text-gray-600">{item.rating}</span>
            </div>
          )}
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>
        
        {/* Metadata */}
        <div className="flex flex-wrap gap-2 mb-4 text-sm text-gray-500">
          {item.author && <span>Por: {item.author}</span>}
          {item.instructor && <span>Instructor: {item.instructor}</span>}
          {item.duration && <span>• {item.duration}</span>}
          {item.pages && <span>• {item.pages} páginas</span>}
          {item.enrolled && (
            <span className="flex items-center">
              <FaUsers className="mr-1" />
              {item.enrolled} estudiantes
            </span>
          )}
        </div>

        {/* Features */}
        {item.features && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Incluye:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {item.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  {feature}
                </li>
              ))}
              {item.features.length > 3 && (
                <li className="text-blue-600">+{item.features.length - 3} más</li>
              )}
            </ul>
          </div>
        )}

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-600">${item.price}</span>
            {item.originalPrice && (
              <span className="text-lg text-gray-400 line-through">${item.originalPrice}</span>
            )}
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center">
            <FaShoppingCart className="mr-2" />
            Comprar
          </button>
        </div>

        {/* Additional Info */}
        {activeTab === 'masterclasses' && item.nextDate && (
          <div className="mt-3 p-2 bg-green-50 rounded-lg">
            <span className="text-sm text-green-700">
              Próxima fecha: {new Date(item.nextDate).toLocaleDateString('es-ES')}
            </span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Recursos Legales Premium
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Acceda a nuestra biblioteca de recursos legales profesionales: eBooks especializados, 
              masterclasses exclusivas, cursos completos y herramientas digitales
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3 m-1 rounded-lg font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.icon}
              <span className="ml-2">{tab.name}</span>
              <span className="ml-2 bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todas las categorías</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Products Grid */}
        {filteredData.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredData.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">
              No se encontraron productos que coincidan con su búsqueda.
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">¿Necesita asesoría personalizada?</h3>
          <p className="text-blue-100 mb-6">
            Nuestros recursos digitales complementan perfectamente nuestros servicios de consultoría legal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Agendar Consulta
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Ver Planes de Suscripción
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
