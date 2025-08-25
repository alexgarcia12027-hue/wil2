import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaGavel, FaBalanceScale, FaCar, FaBuilding, FaShip, FaUserTie, FaMoneyBillWave, FaShoppingCart, FaCalendarAlt, FaPhone, FaWhatsapp, FaEnvelope, FaCheckCircle, FaStar, FaAward, FaClock, FaUsers } from 'react-icons/fa';

const ProfessionalServices = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState([]);

  const services = [
    {
      id: 'penal',
      title: 'Derecho Penal',
      category: 'criminal',
      description: 'Defensa legal especializada en procesos penales con estrategias personalizadas y efectivas.',
      fullDescription: 'Nuestro equipo de abogados penalistas cuenta con amplia experiencia en la defensa de casos complejos, ofreciendo representación legal integral desde la investigación previa hasta el juicio oral.',
      details: [
        'Defensa en delitos contra la propiedad',
        'Defensa en delitos contra las personas',
        'Litigios en delitos económicos y financieros',
        'Representación en audiencias y juicios penales',
        'Medidas alternativas a la prisión preventiva',
        'Recursos de apelación y casación'
      ],
      icon: <FaGavel className="text-4xl mb-4 text-red-600" />,
      color: 'red',
      price: 180,
      tokens: 35,
      duration: '2-6 meses',
      successRate: '92%',
      featured: true
    },
    {
      id: 'civil',
      title: 'Derecho Civil',
      category: 'civil',
      description: 'Asesoría integral en contratos, propiedades, sucesiones y obligaciones civiles.',
      fullDescription: 'Brindamos soluciones legales completas en el ámbito civil, desde la elaboración de contratos hasta la resolución de conflictos familiares y patrimoniales.',
      details: [
        'Elaboración y revisión de contratos',
        'Procesos de divorcios y pensiones alimenticias',
        'Juicios de inquilinato y desalojos',
        'Trámites sucesorios y testamentos',
        'Compraventa de bienes inmuebles',
        'Responsabilidad civil y daños'
      ],
      icon: <FaBalanceScale className="text-4xl mb-4 text-blue-600" />,
      color: 'blue',
      price: 150,
      tokens: 30,
      duration: '1-4 meses',
      successRate: '95%',
      featured: false
    },
    {
      id: 'transito',
      title: 'Derecho de Tránsito',
      category: 'traffic',
      description: 'Especialistas en infracciones y accidentes de tránsito con alta tasa de éxito.',
      fullDescription: 'Defendemos sus derechos en casos de tránsito con un enfoque especializado y conocimiento profundo de la normativa vial ecuatoriana.',
      details: [
        'Impugnación de multas de tránsito',
        'Defensa en accidentes de tránsito',
        'Recuperación de puntos en licencias',
        'Trámites administrativos de tránsito',
        'Asesoría en seguros vehiculares',
        'Peritajes técnicos vehiculares'
      ],
      icon: <FaCar className="text-4xl mb-4 text-green-600" />,
      color: 'green',
      price: 120,
      tokens: 25,
      duration: '15-60 días',
      successRate: '88%',
      featured: true
    },
    {
      id: 'comercial',
      title: 'Derecho Comercial',
      category: 'business',
      description: 'Servicios legales empresariales con visión estratégica de negocios.',
      fullDescription: 'Asesoramos empresas y emprendedores en todos los aspectos legales del mundo empresarial, desde la constitución hasta operaciones complejas.',
      details: [
        'Constitución y estructuración de empresas',
        'Contratos mercantiles y comerciales',
        'Protección de propiedad intelectual',
        'Asesoría para startups y emprendedores',
        'Litigios comerciales y arbitraje',
        'Fusiones y adquisiciones'
      ],
      icon: <FaBuilding className="text-4xl mb-4 text-purple-600" />,
      color: 'purple',
      price: 220,
      tokens: 45,
      duration: '1-8 meses',
      successRate: '94%',
      featured: true
    },
    {
      id: 'aduanas',
      title: 'Derecho Aduanero',
      category: 'customs',
      description: 'Especialistas en normativa aduanera, importaciones y exportaciones.',
      fullDescription: 'Ofrecemos asesoría especializada en comercio exterior y procedimientos aduaneros con amplio conocimiento de la normativa internacional.',
      details: [
        'Asesoría en regímenes aduaneros',
        'Recursos contra sanciones aduaneras',
        'Clasificación arancelaria de mercancías',
        'Trámites de importación y exportación',
        'Defensa en procedimientos administrativos',
        'Consultoría en comercio exterior'
      ],
      icon: <FaShip className="text-4xl mb-4 text-indigo-600" />,
      color: 'indigo',
      price: 250,
      tokens: 50,
      duration: '2-6 meses',
      successRate: '91%',
      featured: false
    },
    {
      id: 'laboral',
      title: 'Derecho Laboral',
      category: 'labor',
      description: 'Defensa de derechos laborales y asesoría empresarial en temas de trabajo.',
      fullDescription: 'Protegemos los derechos de trabajadores y asesoramos a empleadores en el cumplimiento de la normativa laboral ecuatoriana.',
      details: [
        'Despidos injustificados e indemnizaciones',
        'Acoso laboral y discriminación',
        'Negociación de contratos colectivos',
        'Cumplimiento de normativa laboral',
        'Mediación en conflictos laborales',
        'Auditorías laborales empresariales'
      ],
      icon: <FaUserTie className="text-4xl mb-4 text-yellow-600" />,
      color: 'yellow',
      price: 160,
      tokens: 32,
      duration: '1-5 meses',
      successRate: '89%',
      featured: false
    }
  ];

  const categories = [
    { id: 'all', name: 'Todos los Servicios' },
    { id: 'criminal', name: 'Derecho Penal' },
    { id: 'civil', name: 'Derecho Civil' },
    { id: 'traffic', name: 'Tránsito' },
    { id: 'business', name: 'Empresarial' },
    { id: 'customs', name: 'Aduanero' },
    { id: 'labor', name: 'Laboral' }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const addToCart = (service) => {
    const existingItem = cart.find(item => item.id === service.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === service.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...service, quantity: 1 }]);
    }
    
    // Save to localStorage
    const updatedCart = existingItem 
      ? cart.map(item => item.id === service.id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...cart, { ...service, quantity: 1 }];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <Helmet>
        <title>Servicios Legales Profesionales | Abogado Wilson Ipiales</title>
        <meta name="description" content="Servicios legales especializados en derecho penal, civil, comercial, tránsito, aduanero y laboral. Asesoría jurídica profesional con resultados garantizados." />
        <meta name="keywords" content="abogado, servicios legales, derecho penal, derecho civil, derecho comercial, Ecuador" />
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
              Servicios Legales
              <span className="block text-blue-300">Profesionales</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Defendemos sus derechos con excelencia, experiencia y resultados comprobados
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <FaAward className="text-yellow-400 mr-2" />
                <span>+15 años de experiencia</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <FaUsers className="text-green-400 mr-2" />
                <span>+500 casos exitosos</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <FaStar className="text-yellow-400 mr-2" />
                <span>92% tasa de éxito</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 hover:shadow-2xl transition-all duration-300 ${
                  service.featured ? 'border-yellow-400 ring-2 ring-yellow-100' : 'border-blue-500'
                }`}
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {service.featured && (
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-center py-2 font-semibold">
                    ⭐ SERVICIO DESTACADO
                  </div>
                )}
                
                <div className="p-8">
                  <div className="flex justify-center mb-6">
                    {service.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-center text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 text-center mb-6">
                    {service.description}
                  </p>

                  {/* Service Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <FaClock className="text-blue-600 mx-auto mb-1" />
                      <p className="text-xs text-gray-600">Duración</p>
                      <p className="font-semibold text-sm">{service.duration}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <FaCheckCircle className="text-green-600 mx-auto mb-1" />
                      <p className="text-xs text-gray-600">Éxito</p>
                      <p className="font-semibold text-sm">{service.successRate}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <FaMoneyBillWave className="text-yellow-600 mx-auto mb-1" />
                      <p className="text-xs text-gray-600">Tokens</p>
                      <p className="font-semibold text-sm">{service.tokens}</p>
                    </div>
                  </div>

                  {/* Service Details */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Incluye:</h4>
                    <ul className="space-y-2">
                      {service.details.slice(0, 4).map((detail, i) => (
                        <li key={i} className="flex items-start text-sm">
                          <FaCheckCircle className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-gray-600">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing */}
                  <div className="mb-6 text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      ${service.price}
                    </div>
                    <p className="text-gray-600">Honorarios desde</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={() => addToCart(service)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                    >
                      <FaShoppingCart className="mr-2" />
                      Agregar al Carrito
                    </button>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        to={`/services/${service.id}`}
                        className="text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                      >
                        Ver Detalles
                      </Link>
                      <Link
                        to="/contact"
                        className="text-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                      >
                        Consultar
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ¿Por Qué Elegirnos?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nuestro compromiso con la excelencia nos distingue en el campo legal
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaAward className="text-4xl text-blue-600 mb-4" />,
                title: 'Experiencia Probada',
                description: 'Más de 15 años de trayectoria profesional con resultados exitosos'
              },
              {
                icon: <FaUsers className="text-4xl text-green-600 mb-4" />,
                title: 'Atención Personalizada',
                description: 'Cada caso recibe atención directa y estrategias adaptadas'
              },
              {
                icon: <FaClock className="text-4xl text-yellow-600 mb-4" />,
                title: 'Respuesta Rápida',
                description: 'Atención inmediata a consultas urgentes las 24 horas'
              },
              {
                icon: <FaCheckCircle className="text-4xl text-purple-600 mb-4" />,
                title: 'Resultados Garantizados',
                description: 'Alta tasa de éxito en todos nuestros casos'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-200"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.5, delay: 0.2 * index }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              ¿Necesita Asesoría Legal Profesional?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Contáctenos ahora y reciba una consulta gratuita para evaluar su caso
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.a
                href="tel:+593988835269"
                className="inline-flex items-center justify-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-lg transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPhone className="mr-2" />
                Llamar Ahora
              </motion.a>
              
              <motion.a
                href="https://wa.me/593988835269"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg shadow-lg transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaWhatsapp className="mr-2" />
                WhatsApp
              </motion.a>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold rounded-lg shadow-lg transition-colors duration-200"
                >
                  <FaEnvelope className="mr-2" />
                  Consulta Gratuita
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProfessionalServices;
