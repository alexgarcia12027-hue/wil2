import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaFileAlt, FaCalendarAlt, FaUserAlt } from 'react-icons/fa';
import AnimatedButton3D from './AnimatedButton3D';
import Card3D from './Card3D';

const ProcessSearch3D = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      setResults([
        {
          id: 1,
          caseNumber: 'CV-2023-0015',
          title: 'Divorcio Contencioso',
          client: 'María Rodríguez',
          date: '15/03/2023',
          status: 'En Proceso'
        },
        {
          id: 2,
          caseNumber: 'PN-2023-0089',
          title: 'Lesiones Culposas',
          client: 'Juan Pérez',
          date: '22/02/2023',
          status: 'Finalizado'
        },
        {
          id: 3,
          caseNumber: 'CM-2023-0142',
          title: 'Contrato Comercial',
          client: 'Suárez & Asociados',
          date: '10/01/2023',
          status: 'En Revisión'
        }
      ]);
      setIsSearching(false);
    }, 1500);
  };

  const statusColors = {
    'En Proceso': 'bg-blue-100 text-blue-800',
    'Finalizado': 'bg-green-100 text-green-800',
    'En Revisión': 'bg-yellow-100 text-yellow-800'
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">Búsqueda de Procesos</h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Encuentre información detallada sobre sus casos legales de forma rápida y segura
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Search Form */}
          <div className="lg:col-span-1">
            <Card3D glassEffect={true} borderColor="blue">
              <h3 className="text-xl font-bold text-secondary-900 mb-4">Buscar Proceso</h3>
              <form onSubmit={handleSearch}>
                <div className="mb-4">
                  <label htmlFor="search" className="block text-sm font-medium text-secondary-700 mb-1">
                    Número de Caso o Nombre del Cliente
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSearch className="text-secondary-400" />
                    </div>
                    <input
                      type="text"
                      id="search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ingrese número de caso o nombre"
                    />
                  </div>
                </div>
                
                <AnimatedButton3D 
                  type="submit" 
                  variant="primary" 
                  size="large" 
                  className="w-full"
                  disabled={isSearching}
                >
                  {isSearching ? 'Buscando...' : 'Buscar Proceso'}
                </AnimatedButton3D>
              </form>
              
              <div className="mt-6 pt-6 border-t border-secondary-200">
                <h4 className="font-medium text-secondary-900 mb-3">Información Importante</h4>
                <ul className="space-y-2 text-sm text-secondary-600">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                      <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                    </span>
                    <span>Los resultados se muestran de forma segura y confidencial</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                      <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                    </span>
                    <span>Actualizamos la información en tiempo real</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                      <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                    </span>
                    <span>Soporte disponible 24/7</span>
                  </li>
                </ul>
              </div>
            </Card3D>
          </div>
          
          {/* Results */}
          <div className="lg:col-span-2">
            <Card3D glassEffect={true} borderColor="blue">
              <h3 className="text-xl font-bold text-secondary-900 mb-4">Resultados de Búsqueda</h3>
              
              {isSearching ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <FaSearch className="mx-auto text-3xl text-blue-500 mb-4" />
                    </motion.div>
                    <p className="text-secondary-600">Buscando procesos...</p>
                  </div>
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-4">
                  {results.map((result) => (
                    <motion.div
                      key={result.id}
                      className="border border-secondary-200 rounded-lg p-4 hover:bg-blue-50 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ 
                        x: 5,
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                      }}
                      style={{
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      {/* Efecto de brillo que sigue el mouse */}
                      <div 
                        className="absolute inset-0 opacity-5 pointer-events-none rounded-lg"
                        style={{
                          background: `radial-gradient(100px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.3), transparent 40%)`,
                        }}
                      />
                      
                      <div className="relative z-10">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-secondary-900">{result.title}</h4>
                            <p className="text-sm text-secondary-600">{result.caseNumber}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[result.status]}`}>
                            {result.status}
                          </span>
                        </div>
                        
                        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center text-secondary-600">
                            <FaUserAlt className="mr-2 text-secondary-400" />
                            {result.client}
                          </div>
                          <div className="flex items-center text-secondary-600">
                            <FaCalendarAlt className="mr-2 text-secondary-400" />
                            {result.date}
                          </div>
                        </div>
                        
                        <div className="mt-3 flex space-x-2">
                          <AnimatedButton3D 
                            variant="outline" 
                            size="small"
                            onClick={() => console.log('Ver detalles', result.id)}
                          >
                            <FaFileAlt className="mr-1" />
                            Ver Detalles
                          </AnimatedButton3D>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FaSearch className="mx-auto text-4xl text-secondary-300 mb-4" />
                  <h4 className="text-lg font-medium text-secondary-900 mb-2">No hay resultados</h4>
                  <p className="text-secondary-600">
                    Ingrese un número de caso o nombre de cliente para buscar procesos
                  </p>
                </div>
              )}
            </Card3D>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSearch3D;