import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaCalendarAlt, FaUser, FaEye, FaHeart, FaShare, FaSearch, FaTag, FaArrowRight, FaClock } from 'react-icons/fa';

const ProfessionalBlog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [featuredPost, setFeaturedPost] = useState(null);

  const blogPosts = [
    {
      id: 1,
      title: 'Nuevas Reformas al Código Penal Ecuatoriano 2024',
      excerpt: 'Análisis completo de las últimas modificaciones al código penal y su impacto en la práctica jurídica actual.',
      content: 'Las recientes reformas al Código Penal Ecuatoriano han introducido cambios significativos...',
      category: 'derecho-penal',
      author: 'Abg. Wilson Ipiales',
      date: '2024-08-20',
      readTime: '8 min',
      views: 1250,
      likes: 89,
      featured: true,
      image: '/api/placeholder/600/400',
      tags: ['reforma legal', 'código penal', 'legislación']
    },
    {
      id: 2,
      title: 'Guía Completa para Constituir una Empresa en Ecuador',
      excerpt: 'Paso a paso para la constitución legal de empresas, requisitos, costos y tiempos del proceso.',
      content: 'La constitución de una empresa en Ecuador requiere seguir varios pasos legales...',
      category: 'derecho-comercial',
      author: 'Abg. Wilson Ipiales',
      date: '2024-08-18',
      readTime: '12 min',
      views: 2100,
      likes: 156,
      featured: false,
      image: '/api/placeholder/600/400',
      tags: ['empresas', 'constitución', 'trámites']
    },
    {
      id: 3,
      title: 'Derechos del Consumidor en Compras Online',
      excerpt: 'Todo lo que necesitas saber sobre tus derechos como consumidor en el comercio electrónico.',
      content: 'El comercio electrónico ha crecido exponencialmente y con él la necesidad de conocer...',
      category: 'derecho-civil',
      author: 'Abg. Wilson Ipiales',
      date: '2024-08-15',
      readTime: '6 min',
      views: 890,
      likes: 67,
      featured: true,
      image: '/api/placeholder/600/400',
      tags: ['consumidor', 'e-commerce', 'derechos']
    },
    {
      id: 4,
      title: 'Cambios en la Ley de Tránsito: Nuevas Multas y Sanciones',
      excerpt: 'Actualización sobre las nuevas infracciones de tránsito y cómo defenderse legalmente.',
      content: 'La Ley Orgánica de Transporte Terrestre ha sido actualizada con nuevas sanciones...',
      category: 'derecho-transito',
      author: 'Abg. Wilson Ipiales',
      date: '2024-08-12',
      readTime: '10 min',
      views: 1560,
      likes: 112,
      featured: false,
      image: '/api/placeholder/600/400',
      tags: ['tránsito', 'multas', 'sanciones']
    },
    {
      id: 5,
      title: 'Mediación Familiar: Alternativa al Juicio de Divorcio',
      excerpt: 'Beneficios de la mediación familiar como método alternativo de resolución de conflictos.',
      content: 'La mediación familiar se presenta como una alternativa efectiva y menos costosa...',
      category: 'derecho-familia',
      author: 'Abg. Wilson Ipiales',
      date: '2024-08-10',
      readTime: '7 min',
      views: 720,
      likes: 45,
      featured: false,
      image: '/api/placeholder/600/400',
      tags: ['mediación', 'familia', 'divorcio']
    },
    {
      id: 6,
      title: 'Protección de Datos Personales en Ecuador',
      excerpt: 'Marco legal para la protección de datos personales y obligaciones empresariales.',
      content: 'La Ley Orgánica de Protección de Datos Personales establece un marco regulatorio...',
      category: 'derecho-digital',
      author: 'Abg. Wilson Ipiales',
      date: '2024-08-08',
      readTime: '9 min',
      views: 980,
      likes: 78,
      featured: true,
      image: '/api/placeholder/600/400',
      tags: ['datos personales', 'privacidad', 'GDPR']
    }
  ];

  const categories = [
    { id: 'all', name: 'Todos', count: blogPosts.length },
    { id: 'derecho-penal', name: 'Derecho Penal', count: 1 },
    { id: 'derecho-comercial', name: 'Derecho Comercial', count: 1 },
    { id: 'derecho-civil', name: 'Derecho Civil', count: 1 },
    { id: 'derecho-transito', name: 'Derecho de Tránsito', count: 1 },
    { id: 'derecho-familia', name: 'Derecho de Familia', count: 1 },
    { id: 'derecho-digital', name: 'Derecho Digital', count: 1 }
  ];

  useEffect(() => {
    const featured = blogPosts.find(post => post.featured);
    setFeaturedPost(featured || blogPosts[0]);
  }, []);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <Helmet>
        <title>Blog Legal Profesional | Abogado Wilson Ipiales</title>
        <meta name="description" content="Blog especializado en temas legales, análisis jurídico y actualidad del derecho ecuatoriano. Artículos profesionales y consejos legales." />
        <meta name="keywords" content="blog legal, derecho Ecuador, análisis jurídico, consejos legales, legislación" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Blog Legal
              <span className="block text-blue-300">Profesional</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Análisis jurídico, actualidad legal y consejos profesionales para mantenerte informado
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar artículos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl overflow-hidden shadow-2xl"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="p-8 lg:p-12 text-white">
                  <div className="flex items-center mb-4">
                    <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                      DESTACADO
                    </span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-blue-100 mb-6 text-lg">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-6 mb-6 text-blue-100">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2" />
                      {new Date(featuredPost.date).toLocaleDateString('es-ES')}
                    </div>
                    <div className="flex items-center">
                      <FaClock className="mr-2" />
                      {featuredPost.readTime}
                    </div>
                    <div className="flex items-center">
                      <FaEye className="mr-2" />
                      {featuredPost.views}
                    </div>
                  </div>
                  <Link
                    to={`/blog/${featuredPost.id}`}
                    className="inline-flex items-center bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                  >
                    Leer Artículo
                    <FaArrowRight className="ml-2" />
                  </Link>
                </div>
                <div className="relative h-64 lg:h-full">
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {categories.find(cat => cat.id === post.category)?.name}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <FaUser className="mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-1" />
                      {new Date(post.date).toLocaleDateString('es-ES')}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <FaClock className="mr-1" />
                        {post.readTime}
                      </div>
                      <div className="flex items-center">
                        <FaEye className="mr-1" />
                        {post.views}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="flex items-center text-gray-500 hover:text-red-500 transition-colors">
                        <FaHeart className="mr-1" />
                        {post.likes}
                      </button>
                      <button className="text-gray-500 hover:text-blue-500 transition-colors">
                        <FaShare />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="inline-flex items-center bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                      >
                        <FaTag className="mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                  >
                    Leer más
                    <FaArrowRight className="ml-2" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <p className="text-gray-500 text-lg">
                No se encontraron artículos que coincidan con tu búsqueda.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Mantente Actualizado
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Recibe los últimos artículos legales y análisis jurídicos directamente en tu correo
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-colors duration-200">
                Suscribirse
              </button>
            </div>
            
            <p className="text-sm text-blue-200 mt-4">
              No spam. Solo contenido legal de calidad.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProfessionalBlog;
