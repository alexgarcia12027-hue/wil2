import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGavel, FaLock, FaUsers, FaBookOpen, FaPhone, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Servicios Jurídicos Profesionales
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Expertos en derecho penal, civil, comercial y más. 
              Protegemos tus derechos con experiencia y dedicación.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Consulta Gratuita
              </Link>
              <Link
                to="/services"
                className="border-2 border-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Ver Servicios
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ofrecemos asesoría legal especializada en múltiples áreas del derecho
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaGavel className="text-4xl text-red-500" />,
                title: "Derecho Penal",
                description: "Defensa en casos penales con experiencia comprobada"
              },
              {
                icon: <FaLock className="text-4xl text-blue-500" />,
                title: "Derecho Civil",
                description: "Contratos, familia, sucesiones y más"
              },
              {
                icon: <FaUsers className="text-4xl text-green-500" />,
                title: "Derecho Comercial",
                description: "Asesoría empresarial y comercial"
              },
              {
                icon: <FaBookOpen className="text-4xl text-purple-500" />,
                title: "Consultas IA",
                description: "Consultas rápidas con inteligencia artificial"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-center mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-center">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Necesitas Asesoría Legal?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Contáctanos ahora y recibe una consulta gratuita. 
              Estamos aquí para ayudarte.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+593988835269"
                className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold flex items-center justify-center transition-colors"
              >
                <FaPhone className="mr-2" /> Llamar Ahora
              </a>
              <a
                href="https://wa.me/593988835269"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-semibold flex items-center justify-center transition-colors"
              >
                <FaWhatsapp className="mr-2" /> WhatsApp
              </a>
              <Link
                to="/contact"
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-semibold flex items-center justify-center transition-colors"
              >
                <FaEnvelope className="mr-2" /> Consulta Gratis
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
