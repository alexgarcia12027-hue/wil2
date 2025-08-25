import React from 'react';
import { Link } from 'react-router-dom';
import { FaFileAlt, FaGavel, FaUsers, FaPhone, FaWhatsapp, FaCalendarAlt, FaShieldAlt, FaHandshake } from 'react-icons/fa';

const Laboral = () => {
  const servicios = [
    {
      titulo: 'Despidos Injustificados',
      descripcion: 'Defensa ante despidos sin causa justa, recuperación de beneficios sociales.',
      precio: '$120 - $300'
    },
    {
      titulo: 'Acoso Laboral',
      descripcion: 'Protección legal contra acoso, mobbing y discriminación en el trabajo.',
      precio: '$150 - $400'
    },
    {
      titulo: 'Liquidaciones',
      descripcion: 'Cálculo y reclamación de liquidaciones, beneficios no pagados.',
      precio: '$80 - $200'
    },
    {
      titulo: 'Contratos de Trabajo',
      descripcion: 'Revisión, redacción y modificación de contratos laborales.',
      precio: '$60 - $150'
    },
    {
      titulo: 'Seguridad Social',
      descripcion: 'Afiliaciones, desafiliaciones, reclamos al IESS.',
      precio: '$50 - $120'
    },
    {
      titulo: 'Accidentes Laborales',
      descripcion: 'Reclamación por accidentes de trabajo, enfermedades profesionales.',
      precio: '$200 - $500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <FaFileAlt className="mx-auto text-6xl mb-6 text-indigo-200" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Derecho Laboral
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-indigo-100">
              Protección integral de sus derechos como trabajador
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/agendar"
                className="inline-flex items-center px-8 py-3 bg-yellow-500 text-indigo-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
              >
                <FaCalendarAlt className="mr-2" />
                Consulta Gratuita
              </Link>
              <a 
                href="https://wa.me/593988835269"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
              >
                <FaWhatsapp className="mr-2" />
                WhatsApp Urgente
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Servicios de Derecho Laboral
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Defendemos sus derechos laborales con experiencia y compromiso. 
            Asesoría especializada en conflictos laborales y seguridad social.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicios.map((servicio, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {servicio.titulo}
              </h3>
              <p className="text-gray-600 mb-4">
                {servicio.descripcion}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-indigo-600">
                  {servicio.precio}
                </span>
                <Link 
                  to="/agendar"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Consultar
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir nuestros servicios?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <FaShieldAlt className="mx-auto text-4xl text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Experiencia Comprobada</h3>
              <p className="text-gray-600">Más de 15 años defendiendo derechos laborales</p>
            </div>
            <div className="text-center">
              <FaHandshake className="mx-auto text-4xl text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Atención Personalizada</h3>
              <p className="text-gray-600">Cada caso recibe atención dedicada y estrategia única</p>
            </div>
            <div className="text-center">
              <FaGavel className="mx-auto text-4xl text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Resultados Efectivos</h3>
              <p className="text-gray-600">Alto porcentaje de casos ganados y acuerdos favorables</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            ¿Problemas Laborales? Actúe Ahora
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            No permita que vulneren sus derechos. Consulta gratuita e inmediata.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+593988835269"
              className="inline-flex items-center px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <FaPhone className="mr-2" />
              Llamar Ahora
            </a>
            <a 
              href="https://wa.me/593988835269"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
            >
              <FaWhatsapp className="mr-2" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Laboral;
