import React from 'react';
import { FaCar, FaMotorcycle, FaTruck, FaExclamationTriangle, FaFileAlt, FaShieldAlt,
         FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarCheck, FaDollarSign } from 'react-icons/fa';

const Transito = () => {
  const servicios = [
    {
      titulo: "Multas de Tránsito",
      descripcion: "Impugnación de multas, recursos de revisión y anulación de sanciones.",
      precio: "$50 - $200",
      icono: <FaExclamationTriangle className="text-yellow-500" />
    },
    {
      titulo: "Accidentes de Tránsito",
      descripcion: "Asesoría legal en accidentes, responsabilidad civil y seguros.",
      precio: "$200 - $800",
      icono: <FaCar className="text-red-500" />
    },
    {
      titulo: "Licencias de Conducir",
      descripcion: "Recuperación de licencias, apelaciones y trámites de renovación.",
      precio: "$100 - $300",
      icono: <FaFileAlt className="text-blue-500" />
    },
    {
      titulo: "Decomiso de Vehículos",
      descripcion: "Recuperación de vehículos decomisados y trámites administrativos.",
      precio: "$300 - $600",
      icono: <FaTruck className="text-orange-500" />
    },
    {
      titulo: "Infracciones Graves",
      descripcion: "Defensa en infracciones que implican suspensión de licencia.",
      precio: "$150 - $400",
      icono: <FaShieldAlt className="text-purple-500" />
    },
    {
      titulo: "Revisión Técnica",
      descripcion: "Asesoría en problemas con revisión técnica vehicular.",
      precio: "$80 - $150",
      icono: <FaMotorcycle className="text-green-500" />
    }
  ];

  const beneficios = [
    "Conocimiento especializado en Ley de Tránsito",
    "Experiencia en ANT y organismos de control",
    "Agilidad en trámites administrativos",
    "Defensa efectiva ante multas injustas",
    "Asesoría en seguros vehiculares",
    "Seguimiento completo hasta la resolución"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <FaCar className="text-6xl mx-auto mb-6 opacity-90" />
          <h1 className="text-5xl font-bold mb-4">Derecho de Tránsito</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Defendemos sus derechos como conductor con asesoría especializada en 
            infracciones, multas y accidentes de tránsito en Ecuador.
          </p>
        </div>
      </div>

      {/* Servicios */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
            Servicios de Tránsito
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Protegemos sus derechos como conductor con asesoría legal especializada
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
                  <span className="text-2xl font-bold text-yellow-600">
                    {servicio.precio}
                  </span>
                  <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
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
                Expertos en Derecho de Tránsito
              </h2>
              <p className="text-gray-600 mb-8">
                Con amplia experiencia en la defensa de conductores, conocemos los procedimientos 
                de la ANT y organismos de control vehicular.
              </p>
              <ul className="space-y-4">
                {beneficios.map((beneficio, index) => (
                  <li key={index} className="flex items-center">
                    <FaCar className="text-yellow-600 mr-3" />
                    <span className="text-gray-700">{beneficio}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">
                Consulta Especializada
              </h3>
              <p className="text-gray-600 mb-6">
                Evaluamos su caso de tránsito y le brindamos las mejores opciones legales.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaPhone className="text-yellow-600 mr-3" />
                  <span>+593 99 123 4567</span>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-yellow-600 mr-3" />
                  <span>transito@abogadowilson.com</span>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-yellow-600 mr-3" />
                  <span>Juan José Flores 4-73, Ibarra</span>
                </div>
              </div>
              <button className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 transition-colors mt-6 flex items-center justify-center">
                <FaCalendarCheck className="mr-2" />
                Agendar Consulta
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Infracciones Comunes */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Infracciones Más Comunes
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                titulo: "Exceso de Velocidad", 
                descripcion: "Defensa ante multas por velocidad y radares",
                icono: <FaCar className="text-4xl text-red-600 mb-4" />
              },
              { 
                titulo: "Estacionamiento", 
                descripcion: "Impugnación de multas por mal estacionamiento",
                icono: <FaTruck className="text-4xl text-blue-600 mb-4" />
              },
              { 
                titulo: "Documentación", 
                descripcion: "Infracciones por falta de documentos vehiculares",
                icono: <FaFileAlt className="text-4xl text-green-600 mb-4" />
              }
            ].map((infraccion, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
                {infraccion.icono}
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{infraccion.titulo}</h3>
                <p className="text-gray-600">{infraccion.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Nuestro Proceso de Defensa
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { numero: "01", titulo: "Revisión", descripcion: "Análisis detallado de la infracción" },
              { numero: "02", titulo: "Estrategia", descripcion: "Plan de defensa personalizado" },
              { numero: "03", titulo: "Recurso", descripcion: "Presentación de impugnación" },
              { numero: "04", titulo: "Seguimiento", descripcion: "Monitoreo hasta resolución final" }
            ].map((paso, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-yellow-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {paso.numero}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{paso.titulo}</h3>
                <p className="text-gray-600">{paso.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Defienda sus Derechos como Conductor
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            No pague multas injustas. Contáctenos para una defensa efectiva.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-yellow-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Consulta Gratuita
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-yellow-600 transition-colors">
              Impugnar Multa
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Transito;
