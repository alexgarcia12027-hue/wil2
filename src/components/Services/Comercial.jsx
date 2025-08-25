import React from 'react';
import { FaBuilding, FaChartLine, FaHandshake, FaLock, FaGlobe, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarCheck } from 'react-icons/fa';

const Comercial = () => {
  const servicios = [
    {
      titulo: "Constitución de Empresas",
      descripcion: "Formación legal de sociedades anónimas, limitadas y más",
      precio: "$300 - $800",
      icono: <FaBuilding className="text-blue-500" />
    },
    {
      titulo: "Contratos Comerciales",
      descripcion: "Elaboración y revisión de contratos empresariales",
      precio: "$200 - $600",
      icono: <FaHandshake className="text-green-500" />
    },
    {
      titulo: "Propiedad Intelectual",
      descripcion: "Registro de marcas, patentes y derechos de autor",
      precio: "$400 - $1,000",
      icono: <FaLock className="text-purple-500" />
    },
    {
      titulo: "Comercio Internacional",
      descripcion: "Asesoría en importación, exportación y normativas",
      precio: "$350 - $750",
      icono: <FaGlobe className="text-orange-500" />
    },
    {
      titulo: "Fusiones y Adquisiciones",
      descripcion: "Asesoría en procesos de M&A y restructuración empresarial",
      precio: "$1,000 - $3,000",
      icono: <FaChartLine className="text-red-500" />
    },
    {
      titulo: "Cumplimiento Normativo",
      descripcion: "Compliance empresarial y normativas sectoriales",
      precio: "$500 - $1,200",
      icono: <FaBuilding className="text-indigo-500" />
    }
  ];

  const beneficios = [
    "Conocimiento especializado en derecho societario",
    "Experiencia en todas las jurisdicciones comerciales",
    "Asesoría en cumplimiento normativo",
    "Representación en cámaras de comercio",
    "Trámites registrales y notariales",
    "Seguimiento post-constitución empresarial"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <FaBuilding className="text-6xl mx-auto mb-6 opacity-90" />
          <h1 className="text-5xl font-bold mb-4">Derecho Comercial</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Asesoría integral para empresas, emprendedores y comerciantes en todas las áreas del derecho mercantil ecuatoriano.
          </p>
        </div>
      </div>

      {/* Servicios */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
            Servicios de Derecho Comercial
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Protegemos y potenciamos su negocio con asesoría legal especializada
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicios.map((servicio, index) => (
              <div key={index} 
                   className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-4">
                    {servicio.icono}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {servicio.titulo}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  {servicio.descripcion}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">
                    {servicio.precio}
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Consultar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-800">
                Especialistas en Derecho Empresarial
              </h2>
              <p className="text-gray-600 mb-8">
                Con amplia experiencia en el sector empresarial, brindamos asesoría integral 
                para el crecimiento y protección legal de su negocio.
              </p>
              <ul className="space-y-4">
                {beneficios.map((beneficio, index) => (
                  <li key={index} className="flex items-center">
                    <FaBuilding className="text-blue-600 mr-3" />
                    <span className="text-gray-700">{beneficio}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">
                Consulta Empresarial
              </h3>
              <p className="text-gray-600 mb-6">
                Evaluamos las necesidades legales de su empresa y diseñamos estrategias personalizadas.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaPhone className="text-blue-600 mr-3" />
                  <span>+593 99 123 4567</span>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-blue-600 mr-3" />
                  <span>comercial@abogadowilson.com</span>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-blue-600 mr-3" />
                  <span>Juan José Flores 4-73, Ibarra</span>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors mt-6 flex items-center justify-center">
                <FaCalendarCheck className="mr-2" />
                Agendar Consulta
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Impulse su Negocio con Asesoría Legal Especializada
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Proteja y haga crecer su empresa con nuestro respaldo legal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Consulta Gratuita
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Contactar Ahora
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Comercial;
