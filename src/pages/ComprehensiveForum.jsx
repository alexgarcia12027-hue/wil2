import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  FaComments, FaUser, FaCalendarAlt, FaEye, FaHeart, FaReply, 
  FaSearch, FaFilter, FaSort, FaPlus, FaTag, FaThumbtack,
  FaFire, FaCrown, FaAward, FaUsers, FaClock, FaChevronUp,
  FaChevronDown, FaShare, FaBookmark, FaFlag, FaEdit, FaTrash
} from 'react-icons/fa';

const ComprehensiveForum = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [userRole, setUserRole] = useState('guest');

  const categories = [
    { id: 'all', name: 'Todas las Categorías', icon: <FaComments />, count: 156, color: 'bg-blue-500' },
    { id: 'penal', name: 'Derecho Penal', icon: <FaUsers />, count: 45, color: 'bg-red-500' },
    { id: 'civil', name: 'Derecho Civil', icon: <FaUser />, count: 38, color: 'bg-green-500' },
    { id: 'comercial', name: 'Derecho Comercial', icon: <FaAward />, count: 29, color: 'bg-purple-500' },
    { id: 'laboral', name: 'Derecho Laboral', icon: <FaCrown />, count: 22, color: 'bg-yellow-500' },
    { id: 'transito', name: 'Derecho de Tránsito', icon: <FaClock />, count: 18, color: 'bg-indigo-500' },
    { id: 'consultas', name: 'Consultas Generales', icon: <FaComments />, count: 34, color: 'bg-gray-500' }
  ];

  const forumPosts = [
    {
      id: 1,
      title: '¿Cómo proceder en caso de despido injustificado?',
      category: 'laboral',
      author: {
        name: 'María González',
        avatar: '/api/placeholder/40/40',
        role: 'Miembro',
        reputation: 245
      },
      content: 'Me despidieron sin causa justificada después de 3 años trabajando en la empresa. ¿Cuáles son mis derechos y qué pasos debo seguir?',
      createdAt: '2024-08-24T10:30:00Z',
      replies: 12,
      views: 156,
      likes: 8,
      pinned: false,
      solved: false,
      tags: ['despido', 'indemnización', 'derechos laborales'],
      lastActivity: '2024-08-24T15:45:00Z'
    },
    {
      id: 2,
      title: 'Nuevo Código Penal: Cambios importantes que debes conocer',
      category: 'penal',
      author: {
        name: 'Abg. Wilson Ipiales',
        avatar: '/api/placeholder/40/40',
        role: 'Experto',
        reputation: 1250
      },
      content: 'Análisis detallado de las principales modificaciones al Código Penal Ecuatoriano y su impacto en la práctica jurídica.',
      createdAt: '2024-08-23T14:20:00Z',
      replies: 28,
      views: 342,
      likes: 45,
      pinned: true,
      solved: false,
      tags: ['código penal', 'reforma', 'legislación'],
      lastActivity: '2024-08-24T16:20:00Z'
    },
    {
      id: 3,
      title: 'Contrato de arrendamiento: Cláusulas abusivas',
      category: 'civil',
      author: {
        name: 'Carlos Mendoza',
        avatar: '/api/placeholder/40/40',
        role: 'Miembro Premium',
        reputation: 567
      },
      content: '¿Qué cláusulas en un contrato de arrendamiento pueden considerarse abusivas? Mi arrendador incluye términos que me parecen excesivos.',
      createdAt: '2024-08-23T09:15:00Z',
      replies: 15,
      views: 203,
      likes: 12,
      pinned: false,
      solved: true,
      tags: ['arrendamiento', 'contratos', 'cláusulas abusivas'],
      lastActivity: '2024-08-24T11:30:00Z'
    },
    {
      id: 4,
      title: 'Constitución de empresa: Pasos y requisitos 2024',
      category: 'comercial',
      author: {
        name: 'Ana Rodríguez',
        avatar: '/api/placeholder/40/40',
        role: 'Miembro',
        reputation: 189
      },
      content: 'Guía completa para constituir una empresa en Ecuador. Documentos necesarios, costos y tiempos del proceso.',
      createdAt: '2024-08-22T16:45:00Z',
      replies: 22,
      views: 298,
      likes: 31,
      pinned: false,
      solved: false,
      tags: ['constitución', 'empresa', 'trámites'],
      lastActivity: '2024-08-24T14:15:00Z'
    },
    {
      id: 5,
      title: 'Multa de tránsito: ¿Cómo impugnar correctamente?',
      category: 'transito',
      author: {
        name: 'Luis Morales',
        avatar: '/api/placeholder/40/40',
        role: 'Miembro',
        reputation: 123
      },
      content: 'Recibí una multa que considero injusta. ¿Cuál es el procedimiento correcto para impugnarla y qué documentos necesito?',
      createdAt: '2024-08-22T11:20:00Z',
      replies: 8,
      views: 134,
      likes: 6,
      pinned: false,
      solved: true,
      tags: ['multa', 'impugnación', 'tránsito'],
      lastActivity: '2024-08-23T17:40:00Z'
    }
  ];

  const filteredPosts = forumPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'popular': return b.likes - a.likes;
      case 'views': return b.views - a.views;
      case 'replies': return b.replies - a.replies;
      case 'oldest': return new Date(a.createdAt) - new Date(b.createdAt);
      default: // recent
        return new Date(b.lastActivity) - new Date(a.lastActivity);
    }
  });

  const getRoleColor = (role) => {
    switch (role) {
      case 'Experto': return 'text-purple-600 bg-purple-100';
      case 'Miembro Premium': return 'text-yellow-600 bg-yellow-100';
      case 'Moderador': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Hace menos de 1 hora';
    if (diffInHours < 24) return `Hace ${diffInHours} horas`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `Hace ${diffInDays} días`;
    return date.toLocaleDateString('es-ES');
  };

  const PostCard = ({ post }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-gray-900">{post.author.name}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${getRoleColor(post.author.role)}`}>
                  {post.author.role}
                </span>
                {post.author.reputation > 1000 && (
                  <FaCrown className="text-yellow-500 h-4 w-4" title="Usuario Destacado" />
                )}
              </div>
              <div className="text-sm text-gray-500">
                Reputación: {post.author.reputation} • {formatTimeAgo(post.createdAt)}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {post.pinned && (
              <FaThumbtack className="text-red-500 h-4 w-4" title="Fijado" />
            )}
            {post.solved && (
              <FaAward className="text-green-500 h-4 w-4" title="Resuelto" />
            )}
          </div>
        </div>

        {/* Category Badge */}
        <div className="mb-3">
          <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full text-white ${
            categories.find(cat => cat.id === post.category)?.color || 'bg-gray-500'
          }`}>
            {categories.find(cat => cat.id === post.category)?.icon}
            {categories.find(cat => cat.id === post.category)?.name}
          </span>
        </div>

        {/* Title */}
        <Link
          to={`/forum/post/${post.id}`}
          className="block mb-3 hover:text-blue-600 transition-colors"
        >
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {post.title}
          </h3>
        </Link>

        {/* Content Preview */}
        <p className="text-gray-600 mb-4 line-clamp-2">
          {post.content}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
            >
              <FaTag className="h-3 w-3" />
              {tag}
            </span>
          ))}
        </div>

        {/* Stats and Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <FaReply className="h-4 w-4" />
              <span>{post.replies} respuestas</span>
            </div>
            <div className="flex items-center gap-1">
              <FaEye className="h-4 w-4" />
              <span>{post.views} vistas</span>
            </div>
            <div className="flex items-center gap-1">
              <FaHeart className="h-4 w-4" />
              <span>{post.likes} me gusta</span>
            </div>
            <div className="flex items-center gap-1">
              <FaClock className="h-4 w-4" />
              <span>Última actividad: {formatTimeAgo(post.lastActivity)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
              <FaBookmark className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
              <FaShare className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
              <FaFlag className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <Helmet>
        <title>Foro Legal Profesional | Comunidad Jurídica</title>
        <meta name="description" content="Foro legal profesional donde abogados y estudiantes comparten conocimientos, resuelven dudas y discuten temas jurídicos actuales." />
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
              Foro Legal Profesional
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Únete a nuestra comunidad de profesionales del derecho. Comparte conocimientos, resuelve dudas y mantente actualizado.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold">156</div>
                <div className="text-blue-200 text-sm">Discusiones Activas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">1.2k</div>
                <div className="text-blue-200 text-sm">Miembros</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">89%</div>
                <div className="text-blue-200 text-sm">Consultas Resueltas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-blue-200 text-sm">Disponibilidad</div>
              </div>
            </div>

            <Link
              to="/forum/new"
              className="inline-flex items-center bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-6 py-3 rounded-lg transition-colors duration-200"
            >
              <FaPlus className="mr-2" />
              Nueva Discusión
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.icon}
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-6 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar discusiones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <FaSort className="text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="recent">Más Reciente</option>
                  <option value="popular">Más Popular</option>
                  <option value="views">Más Visto</option>
                  <option value="replies">Más Comentado</option>
                  <option value="oldest">Más Antiguo</option>
                </select>
              </div>

              <Link
                to="/forum/new"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <FaPlus />
                Nueva Discusión
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Forum Posts */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <AnimatePresence>
                <div className="space-y-6">
                  {sortedPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </AnimatePresence>

              {sortedPosts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <FaComments className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No se encontraron discusiones
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Intenta cambiar los filtros o términos de búsqueda
                  </p>
                  <Link
                    to="/forum/new"
                    className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FaPlus className="mr-2" />
                    Crear Nueva Discusión
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Top Contributors */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FaAward className="text-yellow-500" />
                    Top Contributors
                  </h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Abg. Wilson Ipiales', reputation: 1250, posts: 45 },
                      { name: 'María González', reputation: 890, posts: 32 },
                      { name: 'Carlos Mendoza', reputation: 567, posts: 28 }
                    ].map((user, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">
                            {user.reputation} puntos • {user.posts} posts
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Forum Rules */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Reglas del Foro
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Mantén un tono respetuoso y profesional</li>
                    <li>• No publiques información confidencial</li>
                    <li>• Usa títulos descriptivos y claros</li>
                    <li>• Busca antes de crear una nueva discusión</li>
                    <li>• Marca como resuelto cuando corresponda</li>
                  </ul>
                </div>

                {/* Quick Links */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Enlaces Rápidos
                  </h3>
                  <div className="space-y-2">
                    <Link to="/forum/guidelines" className="block text-blue-600 hover:text-blue-700 text-sm">
                      Guías del Foro
                    </Link>
                    <Link to="/forum/faq" className="block text-blue-600 hover:text-blue-700 text-sm">
                      Preguntas Frecuentes
                    </Link>
                    <Link to="/contact" className="block text-blue-600 hover:text-blue-700 text-sm">
                      Contactar Moderadores
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComprehensiveForum;
