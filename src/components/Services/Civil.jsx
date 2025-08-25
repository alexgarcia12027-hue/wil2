import React from 'react';
import { FaHome, FaFileContract, FaHandshake, FaShieldAlt, FaGavel, FaUsers,
         FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarCheck, FaDollarSign } from 'react-icons/fa';

const Civil = () => {
  const servicios = [
    {
      titulo: "Contratos Civiles",
      descripcion: "Elaboración y revisión de contratos de compraventa, arrendamiento y servicios.",
      precio: "$150 - $400",
      icono: <FaFileContract className="text-blue-500" />
    },
    {
      titulo: "Bienes Raíces",
      descripcion: "Transferencia de propiedades, hipotecas y derechos reales.",
      precio: "$300 - $800",
      icono: <FaHome className="text-green-500" />
    },
    {
      titulo: "Responsabilidad Civil",
      descripcion: "Demandas por daños y perjuicios, indemnizaciones.",
      precio: "$400 - $1,000",
      icono: <FaShieldAlt className="text-red-500" />
    },
    {
      titulo: "Sucesiones",
      descripcion: "Trámites hereditarios, testamentos y particiones.",
      precio: "$500 - $1,200",
      icono: <FaUsers className="text-purple-500" />
    },
    {
      titulo: "Mediación Civil",
      descripcion: "Resolución alternativa de conflictos civiles.",
      precio: "$200 - $500",
      icono: <FaHandshake className="text-orange-500" />
    },
    {
      titulo: "Cobro de Deudas",
      descripcion: "Recuperación judicial y extrajudicial de acreencias.",
      precio: "$250 - $600",
      icono: <FaDollarSign className="text-indigo-500" />
    }
  ];

  const beneficios = [
    "Conocimiento profundo del Código Civil ecuatoriano",
    "Experiencia en todas las jurisdicciones",
    "Asesoría preventiva para evitar conflictos",
    "Representación en mediación y arbitraje",
    "Trámites registrales especializados",
    "Seguimiento personalizado de cada caso"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-700 to-blue-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <FaGavel className="text-6xl mx-auto mb-6 opacity-90" />
          <h1 className="text-5xl font-bold mb-4">Derecho Civil</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Protegemos sus derechos patrimoniales y personales con asesoría legal especializada 
            en todas las áreas del derecho civil ecuatoriano.
          </p>
        </div>
      </div>

      {/* Servicios */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
            Servicios de Derecho Civil
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Brindamos asesoría integral en todas las materias del derecho civil con experiencia y profesionalismo
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
                Experiencia en Derecho Civil
              </h2>
              <p className="text-gray-600 mb-8">
                Con más de 15 años de experiencia en litigios civiles, garantizamos 
                la protección efectiva de sus derechos e intereses patrimoniales.
              </p>
              <ul className="space-y-4">
                {beneficios.map((beneficio, index) => (
                  <li key={index} className="flex items-center">
                    <FaGavel className="text-blue-600 mr-3" />
                    <span className="text-gray-700">{beneficio}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-gray-100 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">
                Consulta Gratuita
              </h3>
              <p className="text-gray-600 mb-6">
                Evaluamos su caso civil sin costo y le proporcionamos las mejores opciones legales.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaPhone className="text-blue-600 mr-3" />
                  <span>+593 99 123 4567</span>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-blue-600 mr-3" />
                  <span>civil@abogadowilson.com</span>
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

      {/* Áreas Especializadas */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Áreas de Especialización
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                titulo: "Derecho de Obligaciones", 
                descripcion: "Contratos, cumplimiento y responsabilidad contractual",
                icono: <FaFileContract className="text-4xl text-blue-600 mb-4" />
              },
              { 
                titulo: "Derechos Reales", 
                descripcion: "Propiedad, usufructo, servidumbres y garantías reales",
                icono: <FaHome className="text-4xl text-green-600 mb-4" />
              },
              { 
                titulo: "Derecho Sucesorio", 
                descripcion: "Herencias, legados, testamentos y sucesiones intestadas",
                icono: <FaUsers className="text-4xl text-purple-600 mb-4" />
              }
            ].map((area, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
                {area.icono}
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{area.titulo}</h3>
                <p className="text-gray-600">{area.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso Legal */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Nuestro Proceso Legal
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { numero: "01", titulo: "Consulta", descripcion: "Evaluación inicial gratuita" },
              { numero: "02", titulo: "Análisis", descripcion: "Estudio detallado del caso" },
              { numero: "03", titulo: "Estrategia", descripcion: "Plan legal personalizado" },
              { numero: "04", titulo: "Ejecución", descripcion: "Representación y seguimiento" }
            ].map((paso, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
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
      <section className="py-20 bg-gradient-to-r from-gray-700 to-blue-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Proteja sus Derechos Civiles
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            No deje sus derechos al azar. Contáctenos para una asesoría legal especializada.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Consulta Gratuita
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-800 transition-colors">
              Llamar Ahora
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Civil;
