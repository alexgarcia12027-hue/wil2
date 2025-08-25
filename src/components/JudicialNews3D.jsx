import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaNewspaper, FaCalendarAlt, FaClock, FaChevronRight } from 'react-icons/fa';
import AnimatedButton3D from './AnimatedButton3D';
import Card3D from './Card3D';

const JudicialNews3D = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const categories = [
    { id: 'all', name: 'Todas' },
    { id: 'penal', name: 'Derecho Penal' },
    { id: 'civil', name: 'Derecho Civil' },
    { id: 'transito', name: 'Tránsito' },
    { id: 'comercial', name: 'Comercial' }
  ];

  const newsItems = [
    {
      id: 1,
      title: 'Reforma al Código Penal entra en vigor este mes',
      excerpt: 'Las nuevas disposiciones buscan modernizar el sistema penal y proteger mejor los derechos de los ciudadanos.',
      category: 'penal',
      date: '15 Mar 2023',
      readTime: '3 min',
      image: '/images/news1.jpg'
    },
    {
      id: 2,
      title: 'Sentencia histórica en caso de divorcio exprés',
      excerpt: 'La Corte Suprema establece precedentes importantes para la resolución de conflictos familiares.',
      category: 'civil',
      date: '12 Mar 2023',
      readTime: '5 min',
      image: '/images/news2.jpg'
    },
    {
      id: 3,
      title: 'Nuevas regulaciones para conductores profesionales',
      excerpt: 'El Ministerio de Transporte publica lineamientos actualizados para el transporte público y privado.',
      category: 'transito',
      date: '10 Mar 2023',
      readTime: '4 min',
      image: '/images/news3.jpg'
    },
    {
      id: 4,
      title: 'Impacto de la digitalización en el comercio',
      excerpt: 'Especialistas analizan cómo la transformación digital está revolucionando las prácticas comerciales.',
      category: 'comercial',
      date: '08 Mar 2023',
      readTime: '6 min',
      image: '/images/news4.jpg'
    }
  ];

  const filteredNews = selectedCategory === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === selectedCategory);

  return (
    <section className="py-16 bg-gradient-to-br from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center mb-4">
            <FaNewspaper className="text-3xl text-blue-600 mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900">Noticias Judiciales</h2>
          </div>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Mantente actualizado con las últimas novedades del mundo legal y judicial
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <AnimatedButton3D
              key={category.id}
              variant={selectedCategory === category.id ? 'primary' : 'ghost'}
              size="small"
              onClick={() => setSelectedCategory(category.id)}
              className={selectedCategory === category.id ? '' : 'text-gray-600 hover:text-blue-600'}
            >
              {category.name}
            </AnimatedButton3D>
          ))}
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredNews.map((news, index) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              <Card3D glassEffect={true} borderColor="blue" className="h-full">
                {/* Efecto de brillo que sigue el mouse */}
                <div 
                  className="absolute inset-0 opacity-5 pointer-events-none rounded-xl"
                  style={{
                    background: `radial-gradient(150px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.2), transparent 40%)`,
                  }}
                />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-4">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-32" />
                  </div>
                  
                  <div className="flex items-center mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                      {news.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-secondary-900 mb-2 line-clamp-2">
                    {news.title}
                  </h3>
                  
                  <p className="text-secondary-600 text-sm mb-4 flex-grow">
                    {news.excerpt}
                  </p>
                  
                  <div className="flex items-center text-xs text-secondary-500 mb-4">
                    <FaCalendarAlt className="mr-1" />
                    <span className="mr-3">{news.date}</span>
                    <FaClock className="mr-1" />
                    <span>{news.readTime}</span>
                  </div>
                  
                  <AnimatedButton3D 
                    variant="outline" 
                    size="small" 
                    className="mt-auto"
                  >
                    Leer más
                    <FaChevronRight className="ml-2 text-xs" />
                  </AnimatedButton3D>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <AnimatedButton3D variant="primary" size="large">
            Ver Todas las Noticias
          </AnimatedButton3D>
        </motion.div>
      </div>
    </section>
  );
};

export default JudicialNews3D;