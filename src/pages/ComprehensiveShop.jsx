import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  FaBook, FaGraduationCap, FaVideo, FaHeadphones, FaAward, FaRocket,
  FaShoppingCart, FaHeart, FaStar, FaFilter, FaSearch, FaSort,
  FaPlay, FaDownload, FaCertificate, FaUsers, FaClock, FaTag,
  FaCheckCircle, FaEye, FaShare, FaBookmark, FaGift
} from 'react-icons/fa';

const ComprehensiveShop = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'Todo', icon: <FaShoppingCart />, count: 24 },
    { id: 'ebooks', name: 'E-Books', icon: <FaBook />, count: 8 },
    { id: 'courses', name: 'Cursos', icon: <FaGraduationCap />, count: 6 },
    { id: 'masterclass', name: 'Masterclass', icon: <FaVideo />, count: 4 },
    { id: 'podcasts', name: 'Podcasts', icon: <FaHeadphones />, count: 3 },
    { id: 'certificates', name: 'Certificados', icon: <FaAward />, count: 2 },
    { id: 'plans', name: 'Planes Premium', icon: <FaRocket />, count: 1 }
  ];

  const products = [
    // E-Books
    {
      id: 1,
      title: 'Guía Completa de Derecho Penal Ecuatoriano',
      category: 'ebooks',
      price: 29.99,
      originalPrice: 39.99,
      rating: 4.8,
      reviews: 156,
      image: '/api/placeholder/300/400',
      author: 'Abg. Wilson Ipiales',
      pages: 280,
      format: 'PDF + EPUB',
      bestseller: true,
      description: 'Manual completo sobre derecho penal con casos prácticos y jurisprudencia actualizada.',
      features: ['280 páginas', 'Casos prácticos', 'Jurisprudencia actualizada', 'Formato digital'],
      level: 'Intermedio',
      duration: '15 horas de lectura'
    },
    {
      id: 2,
      title: 'Contratos Comerciales: Teoría y Práctica',
      category: 'ebooks',
      price: 24.99,
      originalPrice: 34.99,
      rating: 4.7,
      reviews: 89,
      image: '/api/placeholder/300/400',
      author: 'Abg. Wilson Ipiales',
      pages: 220,
      format: 'PDF',
      description: 'Todo sobre contratos comerciales con modelos y casos reales.',
      features: ['220 páginas', 'Modelos de contratos', 'Casos reales', 'Actualizaciones gratuitas'],
      level: 'Avanzado',
      duration: '12 horas de lectura'
    },
    // Courses
    {
      id: 3,
      title: 'Curso Completo de Derecho Civil',
      category: 'courses',
      price: 149.99,
      originalPrice: 199.99,
      rating: 4.9,
      reviews: 234,
      image: '/api/placeholder/300/400',
      instructor: 'Abg. Wilson Ipiales',
      lessons: 45,
      duration: '20 horas',
      students: 1250,
      certificate: true,
      bestseller: true,
      description: 'Curso integral de derecho civil con casos prácticos y ejercicios.',
      features: ['45 lecciones', '20 horas de video', 'Certificado incluido', 'Acceso de por vida'],
      level: 'Principiante a Avanzado'
    },
    {
      id: 4,
      title: 'Derecho Digital y Nuevas Tecnologías',
      category: 'courses',
      price: 99.99,
      originalPrice: 129.99,
      rating: 4.6,
      reviews: 78,
      image: '/api/placeholder/300/400',
      instructor: 'Abg. Wilson Ipiales',
      lessons: 30,
      duration: '15 horas',
      students: 456,
      certificate: true,
      description: 'Aprende sobre derecho digital, criptomonedas y protección de datos.',
      features: ['30 lecciones', '15 horas de video', 'Casos actuales', 'Certificado digital'],
      level: 'Intermedio'
    },
    // Masterclass
    {
      id: 5,
      title: 'Masterclass: Litigación Oral Efectiva',
      category: 'masterclass',
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.9,
      reviews: 145,
      image: '/api/placeholder/300/400',
      instructor: 'Abg. Wilson Ipiales',
      duration: '4 horas',
      sessions: 8,
      live: true,
      description: 'Técnicas avanzadas para litigación oral y persuasión en el tribunal.',
      features: ['8 sesiones en vivo', '4 horas de contenido', 'Práctica interactiva', 'Grabaciones incluidas'],
      level: 'Avanzado'
    },
    // Podcasts
    {
      id: 6,
      title: 'Podcast: Derecho al Día',
      category: 'podcasts',
      price: 19.99,
      rating: 4.5,
      reviews: 67,
      image: '/api/placeholder/300/400',
      episodes: 24,
      duration: '12 horas',
      description: 'Análisis semanal de casos legales y actualidad jurídica.',
      features: ['24 episodios', '12 horas de audio', 'Descarga offline', 'Actualizaciones semanales'],
      level: 'Todos los niveles'
    },
    // Plans
    {
      id: 7,
      title: 'Plan Premium Anual',
      category: 'plans',
      price: 299.99,
      originalPrice: 499.99,
      rating: 4.8,
      reviews: 89,
      image: '/api/placeholder/300/400',
      description: 'Acceso completo a todo el contenido premium por un año.',
      features: [
        'Acceso a todos los cursos',
        'E-books ilimitados',
        'Masterclass exclusivas',
        'Consultas mensuales',
        'Certificados premium',
        'Soporte prioritario'
      ],
      level: 'Todos los niveles',
      popular: true
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesCategory && matchesSearch && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'newest': return b.id - a.id;
      default: return (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0);
    }
  });

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const toggleWishlist = (productId) => {
    const newWishlist = wishlist.includes(productId)
      ? wishlist.filter(id => id !== productId)
      : [...wishlist, productId];
    setWishlist(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
  };

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setCart(savedCart);
    setWishlist(savedWishlist);
  }, []);

  const ProductCard = ({ product }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300"
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.bestseller && (
            <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              BESTSELLER
            </span>
          )}
          {product.popular && (
            <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              POPULAR
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
        >
          <FaHeart className={`h-4 w-4 ${wishlist.includes(product.id) ? 'text-red-500' : 'text-gray-400'}`} />
        </button>
      </div>

      <div className="p-6">
        {/* Category & Level */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            {categories.find(cat => cat.id === product.category)?.name}
          </span>
          {product.level && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {product.level}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {product.title}
        </h3>

        {/* Author/Instructor */}
        {(product.author || product.instructor) && (
          <p className="text-sm text-gray-600 mb-2">
            por {product.author || product.instructor}
          </p>
        )}

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-400" />
            <span className="font-medium">{product.rating}</span>
            <span>({product.reviews})</span>
          </div>
          {product.students && (
            <div className="flex items-center gap-1">
              <FaUsers className="text-gray-400" />
              <span>{product.students.toLocaleString()}</span>
            </div>
          )}
          {product.duration && (
            <div className="flex items-center gap-1">
              <FaClock className="text-gray-400" />
              <span>{product.duration}</span>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {product.features?.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          {product.certificate && (
            <div className="flex items-center gap-1 text-green-600">
              <FaCertificate className="h-4 w-4" />
              <span className="text-xs">Certificado</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <button
            onClick={() => addToCart(product)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <FaShoppingCart />
            Agregar al Carrito
          </button>
          
          <div className="grid grid-cols-3 gap-2">
            <Link
              to={`/shop/${product.category}/${product.id}`}
              className="text-center bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded text-sm font-medium transition-colors"
            >
              <FaEye className="mx-auto mb-1" />
              Ver
            </Link>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded text-sm font-medium transition-colors">
              <FaShare className="mx-auto mb-1" />
              Compartir
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded text-sm font-medium transition-colors">
              <FaBookmark className="mx-auto mb-1" />
              Guardar
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <Helmet>
        <title>Tienda Legal Profesional | E-books, Cursos y Más</title>
        <meta name="description" content="Tienda completa de productos legales: e-books, cursos, masterclass, podcasts y planes premium. Educación legal de calidad." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tienda Legal Profesional
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Descubre nuestra colección completa de recursos legales: e-books, cursos, masterclass y más
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold">24+</div>
                <div className="text-blue-200 text-sm">Productos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">5000+</div>
                <div className="text-blue-200 text-sm">Estudiantes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">4.8</div>
                <div className="text-blue-200 text-sm">Rating Promedio</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-blue-200 text-sm">Garantía</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white shadow-sm sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.icon}
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <FaSort className="text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="popular">Más Popular</option>
                <option value="newest">Más Reciente</option>
                <option value="price-low">Precio: Menor a Mayor</option>
                <option value="price-high">Precio: Mayor a Menor</option>
                <option value="rating">Mejor Calificado</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence>
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          </AnimatePresence>

          {sortedProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <FaSearch className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No se encontraron productos
              </h3>
              <p className="text-gray-500">
                Intenta cambiar los filtros o términos de búsqueda
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FaGift className="mx-auto h-12 w-12 mb-4 text-yellow-400" />
            <h2 className="text-3xl font-bold mb-4">
              ¿Necesitas Ayuda Personalizada?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Agenda una consulta gratuita y recibe recomendaciones personalizadas
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-8 py-4 rounded-lg transition-colors duration-200"
            >
              <FaGift className="mr-2" />
              Consulta Gratuita
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ComprehensiveShop;
