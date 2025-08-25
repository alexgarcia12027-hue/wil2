import React from 'react';
import { Link } from 'react-router-dom';
import { FaGavel, FaHandshake, FaUserTie, FaCar, FaUsers, FaFileAlt, FaPhone, FaWhatsapp, FaCalendarAlt } from 'react-icons/fa';

const Servicios = () => {
  const servicios = [
    {
      id: 'penal',
      titulo: 'Derecho Penal',
      descripcion: 'Defensa integral en procesos penales, investigaciones fiscales y casos criminales.',
      icono: <FaGavel className="text-4xl text-red-600" />,
      precio: 'Desde $150',
      href: '/servicios/penal',
      caracteristicas: [
        'Defensa en investigaciones previas',
        'Representación en juicios orales',
        'Recursos de apelación',
        'Medidas cautelares',
        'Libertad provisional'
      ]
    },
    {
      id: 'civil',
      titulo: 'Derecho Civil',
      descripcion: 'Resolución de conflictos civiles, contratos, herencias y responsabilidad civil.',
      icono: <FaHandshake className="text-4xl text-blue-600" />,
      precio: 'Desde $120',
      href: '/servicios/civil',
      caracteristicas: [
        'Contratos y obligaciones',
        'Sucesiones y herencias',
        'Responsabilidad civil',
        'Derechos reales',
        'Familia y divorcio'
      ]
    },
    {
      id: 'comercial',
      titulo: 'Derecho Comercial',
      descripcion: 'Asesoría empresarial, constitución de sociedades y derecho corporativo.',
      icono: <FaUserTie className="text-4xl text-green-600" />,
      precio: 'Desde $200',
      href: '/servicios/comercial',
      caracteristicas: [
        'Constitución de empresas',
        'Contratos comerciales',
        'Fusiones y adquisiciones',
        'Compliance empresarial',
        'Propiedad intelectual'
      ]
    },
    {
      id: 'transito',
      titulo: 'Derecho de Tránsito',
      descripcion: 'Defensa en infracciones de tránsito, accidentes y delitos de tránsito.',
      icono: <FaCar className="text-4xl text-orange-600" />,
      precio: 'Desde $80',
      href: '/servicios/transito',
      caracteristicas: [
        'Infracciones de tránsito',
        'Accidentes vehiculares',
        'Delitos de tránsito',
        'Licencias de conducir',
        'Seguros vehiculares'
      ]
    },
    {
      id: 'familia',
      titulo: 'Derecho de Familia',
      descripcion: 'Divorcios, alimentos, tenencia de menores y violencia intrafamiliar.',
      icono: <FaUsers className="text-4xl text-purple-600" />,
      precio: 'Desde $100',
      href: '/servicios/familia',
      caracteristicas: [
        'Divorcios consensuados',
        'Pensión alimenticia',
        'Tenencia de menores',
        'Violencia intrafamiliar',
        'Adopciones'
      ]
    },
    {
      id: 'laboral',
      titulo: 'Derecho Laboral',
      descripcion: 'Defensa de derechos laborales, despidos injustificados y acoso laboral.',
      icono: <FaFileAlt className="text-4xl text-indigo-600" />,
      precio: 'Desde $90',
      href: '/servicios/laboral',
      caracteristicas: [
        'Despidos injustificados',
        'Acoso laboral',
        'Liquidaciones',
        'Contratos de trabajo',
        'Seguridad social'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Servicios Legales Profesionales
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-blue-100">
              Abg. Wilson Ipiales - Más de 15 años de experiencia
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/agendar"
                className="inline-flex items-center px-8 py-3 bg-yellow-500 text-blue-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
              >
                <FaCalendarAlt className="mr-2" />
                Agendar Consulta Gratuita
              </Link>
              <a 
                href="https://wa.me/593988835269"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
              >
                <FaWhatsapp className="mr-2" />
                WhatsApp Inmediato
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Nuestras Especialidades
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ofrecemos servicios legales especializados con un enfoque profesional, 
            ético y orientado a resultados para proteger sus derechos e intereses.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicios.map((servicio) => (
            <div 
              key={servicio.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  {servicio.icono}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                  {servicio.titulo}
                </h3>
                <p className="text-gray-600 mb-4 text-center">
                  {servicio.descripcion}
                </p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Incluye:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {servicio.caracteristicas.map((caracteristica, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        {caracteristica}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-blue-600">
                      {servicio.precio}
                    </span>
                    <span className="text-sm text-gray-500">por consulta</span>
                  </div>
                  
                  <div className="space-y-2">
                    <Link 
                      to={servicio.href}
                      className="w-full block text-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Ver Detalles
                    </Link>
                    <Link 
                      to="/agendar"
                      className="w-full block text-center px-4 py-2 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      Agendar Cita
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            ¿Necesita Asesoría Legal Inmediata?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Contacte con nosotros para una consulta gratuita y sin compromiso
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+593988835269"
              className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
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
            <Link 
              to="/contact"
              className="inline-flex items-center px-8 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-colors"
            >
              Formulario de Contacto
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Servicios;
