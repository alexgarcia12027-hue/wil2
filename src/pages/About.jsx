import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaBalanceScale, FaGavel, FaUniversity, FaBriefcase, FaAward, FaHandshake } from 'react-icons/fa';

const About = () => {
  return (
    <>
      <Helmet>
        <title>Sobre Wilson Ipiales | Abogado Profesional</title>
        <meta name="description" content="Conozca a Wilson Alexander Ipiales Guerrón, abogado profesional con amplia experiencia en derecho penal, civil, tránsito y más. Formación, trayectoria y valores profesionales." />
      </Helmet>

      {/* Hero Section */}
      <motion.section 
        className="relative bg-blue-900 text-white py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <motion.h1 
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Wilson Alexander Ipiales Guerrón
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl mb-8 text-blue-100"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Abogado comprometido con la excelencia y la justicia
              </motion.p>
              
              <motion.div
                className="text-base md:text-lg max-w-2xl"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <p>Con más de 15 años de experiencia, ofrezco asesoría legal integral enfocada en resultados y comprometida con los intereses de mis clientes. Mi formación académica sólida y mi vasta experiencia garantizan un servicio legal de primer nivel.</p>
              </motion.div>
            </div>
            
            <motion.div 
              className="md:w-5/12"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <img src="/images/abogado-wilson-portrait.jpg" alt="Wilson Alexander Ipiales Guerrón" className="w-full h-auto" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Formación y Experiencia */}
      <motion.section 
        className="py-16 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl font-bold text-gray-900 mb-8 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            Formación y Trayectoria Profesional
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
                <FaUniversity className="mr-3 text-blue-700" /> Formación Académica
              </h3>
              
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h4 className="font-bold text-gray-900">Doctor en Jurisprudencia</h4>
                  <p className="text-gray-600">Universidad Central del Ecuador | 2008</p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h4 className="font-bold text-gray-900">Maestría en Derecho Penal</h4>
                  <p className="text-gray-600">Universidad San Francisco de Quito | 2011</p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h4 className="font-bold text-gray-900">Especialista en Derecho Procesal</h4>
                  <p className="text-gray-600">Universidad Andina Simón Bolívar | 2013</p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h4 className="font-bold text-gray-900">Certificaciones Adicionales</h4>
                  <ul className="text-gray-600 list-disc ml-5">
                    <li>Diplomado en Derecho Constitucional</li>
                    <li>Certificación en Mediación y Arbitraje</li>
                    <li>Especialización en Derecho de Tránsito</li>
                  </ul>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
                <FaBriefcase className="mr-3 text-blue-700" /> Experiencia Profesional
              </h3>
              
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h4 className="font-bold text-gray-900">Fundador y Director</h4>
                  <p className="text-gray-700">Bufete Jurídico Ipiales & Asociados | 2015 - Presente</p>
                  <p className="text-gray-600">Dirección estratégica de casos complejos en derecho penal, civil y administrativo.</p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h4 className="font-bold text-gray-900">Asesor Jurídico Senior</h4>
                  <p className="text-gray-700">Ministerio de Justicia | 2012 - 2015</p>
                  <p className="text-gray-600">Consultoría legal especializada en políticas públicas y reformas legales.</p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h4 className="font-bold text-gray-900">Abogado Asociado</h4>
                  <p className="text-gray-700">Pérez & Martínez Abogados | 2008 - 2012</p>
                  <p className="text-gray-600">Manejo de litigios complejos en materia civil y mercantil.</p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h4 className="font-bold text-gray-900">Conferencias y Docencia</h4>
                  <p className="text-gray-600">Profesor invitado en diversas universidades y ponente en conferencias nacionales e internacionales sobre derecho penal y constitucional.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Áreas de Especialización */}
      <motion.section 
        className="py-16 bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl font-bold text-gray-900 mb-12 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            Áreas de Especialización
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              whileHover={{ y: -5 }}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaGavel className="text-3xl text-blue-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Derecho Penal</h3>
              <p className="text-gray-600 text-center">Defensa en todo tipo de delitos con estrategias personalizadas y enfoque en resultados favorables para el cliente.</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              whileHover={{ y: -5 }}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaBalanceScale className="text-3xl text-blue-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Derecho Civil</h3>
              <p className="text-gray-600 text-center">Representación en asuntos de propiedad, contratos, sucesiones y obligaciones con atención meticulosa a los detalles.</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              whileHover={{ y: -5 }}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaHandshake className="text-3xl text-blue-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Derecho Comercial</h3>
              <p className="text-gray-600 text-center">Asesoría a empresas y emprendedores en formación, contratos comerciales, propiedad intelectual y disputas mercantiles.</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              whileHover={{ y: -5 }}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaAward className="text-3xl text-blue-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Derecho de Tránsito</h3>
              <p className="text-gray-600 text-center">Manejo especializado de infracciones, accidentes e impugnaciones con altas tasas de éxito y resolución expedita.</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              whileHover={{ y: -5 }}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.5 }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaBriefcase className="text-3xl text-blue-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Derecho Laboral</h3>
              <p className="text-gray-600 text-center">Protección de derechos laborales, negociación de contratos y resolución de conflictos entre empleadores y trabajadores.</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              whileHover={{ y: -5 }}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.7, duration: 0.5 }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaUniversity className="text-3xl text-blue-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Derecho Administrativo</h3>
              <p className="text-gray-600 text-center">Representación ante entidades públicas, trámites administrativos y reclamaciones contra el Estado.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Filosofía y Valores */}
      <motion.section 
        className="py-16 bg-blue-800 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl font-bold mb-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.9, duration: 0.5 }}
          >
            Mi Filosofía Profesional
          </motion.h2>
          
          <motion.div
            className="text-xl leading-relaxed mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.0, duration: 0.5 }}
          >
            <p>"Creo firmemente que cada persona merece una defensa legal de calidad, sin importar su condición socioeconómica. Mi compromiso es ofrecer un servicio legal ético, transparente y eficiente, poniendo siempre las necesidades del cliente en primer lugar."</p>
          </motion.div>
          
          <motion.div
            className="grid md:grid-cols-3 gap-6 mt-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.1, duration: 0.5 }}
          >
            <div className="bg-blue-700 p-6 rounded-lg">
              <h3 className="font-bold text-xl mb-3">Excelencia</h3>
              <p>Compromiso inquebrantable con la calidad y el rigor profesional en cada caso que asumo.</p>
            </div>
            
            <div className="bg-blue-700 p-6 rounded-lg">
              <h3 className="font-bold text-xl mb-3">Integridad</h3>
              <p>Ejercicio ético de la profesión con total transparencia y honestidad hacia mis clientes.</p>
            </div>
            
            <div className="bg-blue-700 p-6 rounded-lg">
              <h3 className="font-bold text-xl mb-3">Empatía</h3>
              <p>Comprensión profunda de las necesidades y preocupaciones de cada cliente como si fueran propias.</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Llamado a la acción */}
      <motion.section 
        className="py-16 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl font-bold text-gray-900 mb-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.3, duration: 0.5 }}
          >
            ¿Necesita asesoría legal profesional?
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 mb-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.4, duration: 0.5 }}
          >
            Estoy listo para ayudarle a resolver sus problemas legales con un enfoque personalizado y eficiente.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a 
              href="/contact" 
              className="px-8 py-4 bg-blue-700 text-white font-bold rounded-lg shadow-lg hover:bg-blue-800 transition-colors duration-300"
            >
              Agendar Consulta
            </a>
            
            <a 
              href="/services" 
              className="px-8 py-4 bg-white text-blue-700 font-bold rounded-lg shadow-lg border-2 border-blue-700 hover:bg-blue-50 transition-colors duration-300"
            >
              Ver Servicios
            </a>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default About;
