import React from 'react';
import { FaShip, FaPlane, FaTruck, FaFileInvoiceDollar, FaShieldAlt, FaGlobe,
         FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarCheck, FaBoxes } from 'react-icons/fa';

const Aduanero = () => {
  const servicios = [
    {
      titulo: "Importación de Mercancías",
      descripcion: "Asesoría completa en procesos de importación y clasificación arancelaria.",
      precio: "$300 - $800",
      icono: <FaShip className="text-blue-500" />
    },
    {
      titulo: "Exportación Internacional",
      descripcion: "Trámites de exportación, certificados de origen y documentación.",
      precio: "$250 - $600",
      icono: <FaPlane className="text-green-500" />
    },
    {
      titulo: "Regímenes Especiales",
      descripcion: "Zona franca, maquila, drawback y otros regímenes aduaneros.",
      precio: "$400 - $900",
      icono: <FaBoxes className="text-purple-500" />
    },
    {
      titulo: "Valoración Aduanera",
      descripcion: "Determinación correcta del valor en aduana y base imponible.",
      precio: "$200 - $500",
      icono: <FaFileInvoiceDollar className="text-orange-500" />
    },
    {
      titulo: "Infracciones Aduaneras",
      descripcion: "Defensa en procesos sancionatorios y contravenciones aduaneras.",
      precio: "$500 - $1,200",
      icono: <FaShieldAlt className="text-red-500" />
    },
    {
      titulo: "Comercio Internacional",
      descripcion: "Contratos internacionales, Incoterms y operaciones de comercio exterior.",
      precio: "$350 - $750",
      icono: <FaGlobe className="text-indigo-500" />
    }
  ];

  const beneficios = [
    "Conocimiento actualizado de normativa aduanera",
    "Relación directa con autoridades aduaneras",
    "Optimización de costos en operaciones",
    "Prevención de sanciones y multas",
    "Asesoría en clasificación arancelaria",
    "Gestión integral de comercio exterior"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <FaShip className="text-6xl mx-auto mb-6 opacity-90" />
          <h1 className="text-5xl font-bold mb-4">Derecho Aduanero</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Especialistas en comercio exterior y régimen aduanero ecuatoriano, 
            facilitando sus operaciones de importación y exportación.
          </p>
        </div>
      </div>

      {/* Servicios */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
            Servicios de Derecho Aduanero
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Asesoría especializada en comercio exterior y cumplimiento de la normativa aduanera
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
                  <span className="text-2xl font-bold text-teal-600">
                    {servicio.precio}
                  </span>
                  <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
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
                Expertos en Comercio Exterior
              </h2>
              <p className="text-gray-600 mb-8">
                Con amplia experiencia en operaciones de comercio internacional, 
                garantizamos el cumplimiento normativo y la optimización de sus procesos aduaneros.
              </p>
              <ul className="space-y-4">
                {beneficios.map((beneficio, index) => (
                  <li key={index} className="flex items-center">
                    <FaTruck className="text-teal-600 mr-3" />
                    <span className="text-gray-700">{beneficio}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-teal-100 to-blue-100 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">
                Consulta Especializada
              </h3>
              <p className="text-gray-600 mb-6">
                Evaluamos sus operaciones de comercio exterior y optimizamos sus procesos aduaneros.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaPhone className="text-teal-600 mr-3" />
                  <span>+593 99 123 4567</span>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-teal-600 mr-3" />
                  <span>aduanero@abogadowilson.com</span>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-teal-600 mr-3" />
                  <span>Juan José Flores 4-73, Ibarra</span>
                </div>
              </div>
              <button className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors mt-6 flex items-center justify-center">
                <FaCalendarCheck className="mr-2" />
                Agendar Consulta
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Optimice sus Operaciones de Comercio Exterior
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Evite sanciones y optimice costos con nuestra asesoría especializada en derecho aduanero.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Consulta Gratuita
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-colors">
              Contactar Ahora
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Aduanero;
