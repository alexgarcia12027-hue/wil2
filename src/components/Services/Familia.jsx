import React from 'react';
import { FaHeart, FaChild, FaUsers, FaHome, FaGavel, FaHandsHelping, 
         FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarCheck } from 'react-icons/fa';

const Familia = () => {
  const servicios = [
    {
      titulo: "Divorcio y Separación",
      descripcion: "Procesos de divorcio consensual y contencioso con protección de derechos.",
      precio: "$800 - $1,500",
      icono: <FaHeart className="text-red-500" />
    },
    {
      titulo: "Custodia de Menores",
      descripcion: "Establecimiento y modificación de regímenes de custodia y visitas.",
      precio: "$600 - $1,200",
      icono: <FaChild className="text-blue-500" />
    },
    {
      titulo: "Pensión Alimenticia",
      descripcion: "Fijación, aumento y reducción de pensiones alimenticias.",
      precio: "$400 - $800",
      icono: <FaUsers className="text-green-500" />
    },
    {
      titulo: "Adopción",
      descripcion: "Procesos de adopción nacional e internacional con asesoría completa.",
      precio: "$1,000 - $2,000",
      icono: <FaHome className="text-purple-500" />
    },
    {
      titulo: "Violencia Intrafamiliar",
      descripcion: "Medidas de protección y denuncias por violencia doméstica.",
      precio: "$300 - $600",
      icono: <FaGavel className="text-orange-500" />
    },
    {
      titulo: "Unión de Hecho",
      descripcion: "Registro y disolución de uniones de hecho con efectos legales.",
      precio: "$200 - $500",
      icono: <FaHandsHelping className="text-indigo-500" />
    }
  ];

  const beneficios = [
    "Asesoría personalizada y confidencial",
    "Mediación familiar para resolver conflictos",
    "Representación en audiencias",
    "Trámites ante Registro Civil",
    "Seguimiento completo del proceso",
    "Atención especializada en derecho de familia"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <FaHeart className="text-6xl mx-auto mb-6 opacity-90" />
          <h1 className="text-5xl font-bold mb-4">Derecho de Familia</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Protegemos los vínculos familiares con asesoría legal especializada, 
            brindando soluciones humanas y efectivas para cada situación familiar.
          </p>
        </div>
      </div>

      {/* Servicios */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
            Nuestros Servicios de Familia
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Ofrecemos servicios integrales en derecho de familia con enfoque humano y profesional
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
                  <span className="text-2xl font-bold text-pink-600">
                    {servicio.precio}
                  </span>
                  <button className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors">
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
                ¿Por qué elegir nuestros servicios?
              </h2>
              <p className="text-gray-600 mb-8">
                Entendemos que los asuntos familiares requieren sensibilidad, experiencia y 
                un enfoque personalizado. Nuestro equipo se compromete a proteger sus derechos 
                y los de su familia.
              </p>
              <ul className="space-y-4">
                {beneficios.map((beneficio, index) => (
                  <li key={index} className="flex items-center">
                    <FaUsers className="text-pink-600 mr-3" />
                    <span className="text-gray-700">{beneficio}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-pink-100 to-purple-100 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">
                Consulta Gratuita
              </h3>
              <p className="text-gray-600 mb-6">
                Primera consulta sin costo para evaluar su caso y brindarle las mejores opciones legales.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaPhone className="text-pink-600 mr-3" />
                  <span>+593 99 123 4567</span>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-pink-600 mr-3" />
                  <span>familia@abogadowilson.com</span>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-pink-600 mr-3" />
                  <span>Juan José Flores 4-73, Ibarra</span>
                </div>
              </div>
              <button className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-colors mt-6 flex items-center justify-center">
                <FaCalendarCheck className="mr-2" />
                Agendar Consulta
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Nuestro Proceso
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { numero: "01", titulo: "Consulta Inicial", descripcion: "Evaluamos su caso sin costo" },
              { numero: "02", titulo: "Estrategia Legal", descripcion: "Diseñamos el mejor plan de acción" },
              { numero: "03", titulo: "Representación", descripcion: "Lo acompañamos en todo el proceso" },
              { numero: "04", titulo: "Seguimiento", descripcion: "Monitoreo hasta la resolución final" }
            ].map((paso, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-pink-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
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
      <section className="py-20 bg-gradient-to-r from-pink-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Proteja a su Familia con Asesoría Legal Especializada
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            No enfrente solo los desafíos familiares. Contáctenos hoy para una consulta gratuita.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-pink-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Consulta Gratuita
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-pink-600 transition-colors">
              Llamar Ahora
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Familia;
