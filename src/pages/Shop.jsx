import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaFilter, FaSearch, FaStar, FaBook, FaGraduationCap, FaFileAlt, FaVideo } from 'react-icons/fa';

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [sortBy, setSortBy] = useState('name');

  const categories = [
    { id: 'all', name: 'Todos', icon: FaFileAlt },
    { id: 'ebooks', name: 'E-Books', icon: FaBook },
    { id: 'courses', name: 'Cursos', icon: FaGraduationCap },
    { id: 'documents', name: 'Documentos', icon: FaFileAlt },
    { id: 'consultations', name: 'Consultas', icon: FaVideo }
  ];

  const products = [
    {
      id: 1,
      name: 'Guía Completa de Derecho Penal',
      category: 'ebooks',
      price: 29.99,
      originalPrice: 39.99,
      rating: 4.8,
      reviews: 156,
      image: '/images/ebook-penal.jpg',
      description: 'Manual completo sobre procedimientos penales en Ecuador',
      tokens: 60,
      bestseller: true
    },
    {
      id: 2,
      name: 'Curso: Contratos Comerciales',
      category: 'courses',
      price: 149.99,
      originalPrice: 199.99,
      rating: 4.9,
      reviews: 89,
      image: '/images/curso-contratos.jpg',
      description: 'Aprende a redactar contratos comerciales efectivos',
      tokens: 300,
      featured: true
    },
    {
      id: 3,
      name: 'Plantilla de Contrato de Arrendamiento',
      category: 'documents',
      price: 9.99,
      originalPrice: 15.99,
      rating: 4.7,
      reviews: 234,
      image: '/images/template-arrendamiento.jpg',
      description: 'Plantilla legal personalizable para contratos de arrendamiento',
      tokens: 20
    },
    {
      id: 4,
      name: 'Consulta Legal Virtual - 1 Hora',
      category: 'consultations',
      price: 89.99,
      originalPrice: 120.00,
      rating: 5.0,
      reviews: 67,
      image: '/images/consulta-virtual.jpg',
      description: 'Consulta personalizada con el Dr. Wilson Ipiales',
      tokens: 180,
      popular: true
    },
    {
      id: 5,
      name: 'Manual de Derecho Laboral',
      category: 'ebooks',
      price: 24.99,
      originalPrice: 34.99,
      rating: 4.6,
      reviews: 123,
      image: '/images/ebook-laboral.jpg',
      description: 'Todo lo que necesitas saber sobre derecho laboral',
      tokens: 50
    },
    {
      id: 6,
      name: 'Curso: Defensa en Tránsito',
      category: 'courses',
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.8,
      reviews: 145,
      image: '/images/curso-transito.jpg',
      description: 'Estrategias efectivas para casos de tránsito',
      tokens: 160
    }
  ];

  const filteredProducts = products
    .filter(product => 
      (selectedCategory === 'all' || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'popular':
          return b.reviews - a.reviews;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <Helmet>
        <title>Tienda Legal | Abogado Wilson Ipiales</title>
        <meta name="description" content="Encuentra e-books, cursos, documentos legales y consultas profesionales. Todo lo que necesitas para tus asuntos legales." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Tienda Legal</h1>
            <p className="text-xl text-blue-100 mb-8">
              Recursos legales profesionales al alcance de tus manos
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <motion.div
              className="bg-white rounded-lg shadow-md p-6 sticky top-24"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FaFilter className="mr-2" />
                  Categorías
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 flex items-center ${
                          selectedCategory === category.id
                            ? 'bg-blue-100 text-blue-700'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="mr-2" />
                        {category.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Ordenar por</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="name">Nombre</option>
                  <option value="price-low">Precio: Menor a Mayor</option>
                  <option value="price-high">Precio: Mayor a Menor</option>
                  <option value="rating">Mejor Valorados</option>
                  <option value="popular">Más Populares</option>
                </select>
              </div>
            </motion.div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === 'all' ? 'Todos los Productos' : categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <span className="text-gray-600">
                {filteredProducts.length} productos encontrados
              </span>
            </div>

            <AnimatePresence>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={fadeIn}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    whileHover={{ y: -5 }}
                  >
                    {/* Product Image */}
                    <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100">
                      <div className="absolute inset-0 flex items-center justify-center">
                        {product.category === 'ebooks' && <FaBook className="text-6xl text-blue-600" />}
                        {product.category === 'courses' && <FaGraduationCap className="text-6xl text-green-600" />}
                        {product.category === 'documents' && <FaFileAlt className="text-6xl text-purple-600" />}
                        {product.category === 'consultations' && <FaVideo className="text-6xl text-red-600" />}
                      </div>
                      
                      {/* Badges */}
                      <div className="absolute top-2 left-2 flex flex-col space-y-1">
                        {product.bestseller && (
                          <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                            Bestseller
                          </span>
                        )}
                        {product.featured && (
                          <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                            Destacado
                          </span>
                        )}
                        {product.popular && (
                          <span className="bg-purple-500 text-white px-2 py-1 rounded text-xs font-semibold">
                            Popular
                          </span>
                        )}
                      </div>

                      {/* Discount Badge */}
                      {product.originalPrice > product.price && (
                        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">
                          -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center mb-3">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {product.rating} ({product.reviews} reseñas)
                        </span>
                      </div>

                      {/* Price and Tokens */}
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-blue-600">
                              ${product.price}
                            </span>
                            {product.originalPrice > product.price && (
                              <span className="text-sm text-gray-500 line-through">
                                ${product.originalPrice}
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-gray-600">
                            {product.tokens} tokens
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => addToCart(product)}
                          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                        >
                          <FaShoppingCart className="mr-2" />
                          Agregar
                        </motion.button>
                        <Link
                          to={`/shop/product/${product.id}`}
                          className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors duration-200"
                        >
                          Ver
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>

            {filteredProducts.length === 0 && (
              <motion.div
                className="text-center py-12"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
              >
                <p className="text-gray-500 text-lg">
                  No se encontraron productos que coincidan con tu búsqueda.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Cart Summary */}
      {cartItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 right-4 bg-white rounded-lg shadow-xl p-4 border-2 border-blue-500"
        >
          <div className="flex items-center space-x-2">
            <FaShoppingCart className="text-blue-600" />
            <span className="font-semibold">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)} artículos
            </span>
            <Link
              to="/cart"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Ver Carrito
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Shop;
