import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaGavel, 
  FaBalanceScale, 
  FaCar, 
  FaBuilding, 
  FaPassport, 
  FaFileContract,
  FaLock,
  FaUniversity,
  FaSearch,
  FaChartLine
} from 'react-icons/fa';

const Services3D = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredService, setHoveredService] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const services = [
    {
      id: 1,
      title: 'Derecho Penal',
      description: 'Defensa integral en casos penales, delitos contra la propiedad, lesiones y otros delitos.',
      icon: <FaGavel className="text-2xl" />,
      link: '/servicios/penal',
      color: 'from-red-500 to-red-700'
    },
    {
      id: 2,
      title: 'Derecho Civil',
      description: 'Asesoramiento en contratos, responsabilidad civil, divorcios y derecho de familia.',
      icon: <FaBalanceScale className="text-2xl" />,
      link: '/servicios/civil',
      color: 'from-blue-500 to-blue-700'
    },
    {
      id: 3,
      title: 'Derecho de Tránsito',
      description: 'Representación en accidentes de tránsito, infracciones y multas de tránsito.',
      icon: <FaCar className="text-2xl" />,
      link: '/servicios/transito',
      color: 'from-green-500 to-green-700'
    },
    {
      id: 4,
      title: 'Derecho Comercial',
      description: 'Formación de empresas, contratos comerciales, fusiones y adquisiciones.',
      icon: <FaBuilding className="text-2xl" />,
      link: '/servicios/comercial',
      color: 'from-purple-500 to-purple-700'
    },
    {
      id: 5,
      title: 'Derecho Aduanero',
      description: 'Asesoramiento en importaciones, exportaciones y regulaciones aduaneras.',
      icon: <FaPassport className="text-2xl" />,
      link: '/servicios/aduanero',
      color: 'from-yellow-500 to-yellow-700'
    },
    {
      id: 6,
      title: 'Derecho Laboral',
      description: 'Contratos laborales, despidos, seguridad social y relaciones laborales.',
      icon: <FaUniversity className="text-2xl" />,
      link: '/servicios/laboral',
      color: 'from-indigo-500 to-indigo-700'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-secondary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Nuestros Servicios Legales
          </motion.h2>
          <motion.p 
            className="text-lg text-secondary-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Ofrecemos soluciones legales integrales adaptadas a sus necesidades específicas
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Efecto de brillo que sigue el mouse */}
              {hoveredService === service.id && (
                <motion.div 
                  className="absolute inset-0 opacity-20 pointer-events-none rounded-2xl"
                  style={{
                    background: `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.5), transparent 40%)`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.2 }}
                  exit={{ opacity: 0 }}
                />
              )}
              
              <Link 
                to={service.link}
                className="block h-full"
              >
                <div className={`bg-white/80 backdrop-blur-lg border border-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden ${hoveredService === service.id ? 'shadow-xl' : ''}`}
                  style={{
                    transformStyle: 'preserve-3d',
                    boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  {/* Efecto de gradiente en el borde */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`} />
                  
                  <div className="relative z-10">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${service.color} text-white mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-secondary-600 mb-4">
                      {service.description}
                    </p>
                    <div className="flex items-center text-primary-600 font-medium group-hover:translate-x-1 transition-transform">
                      Ver más detalles
                      <FaSearch className="ml-2 text-sm" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA con efecto 3D */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 shadow-xl relative overflow-hidden"
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Efecto de brillo que sigue el mouse */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.3), transparent 40%)`,
              }}
            />
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-2">¿Necesitas Asesoría Legal?</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Nuestro equipo de abogados altamente calificados está listo para ayudarte con tu caso legal.
              </p>
              <Link 
                to="/contacto"
                className="inline-flex items-center bg-white text-primary-700 font-bold py-3 px-6 rounded-lg hover:bg-blue-50 transition-all transform hover:scale-105 hover:shadow-lg"
              >
                <FaChartLine className="mr-2" />
                Solicitar Consulta
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services3D;