import React from 'react';
import { FaHardHat, FaBriefcase, FaHandshake, FaShieldAlt, FaGavel, FaUserTie,
         FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarCheck, FaDollarSign } from 'react-icons/fa';

const Laboral = () => {
  const servicios = [
    {
      titulo: "Despido Injustificado",
      descripcion: "Defensa legal ante despidos sin causa justa y reclamación de indemnizaciones.",
      precio: "$500 - $1,200",
      icono: <FaShieldAlt className="text-red-500" />
    },
    {
      titulo: "Contratos Laborales",
      descripcion: "Elaboración y revisión de contratos de trabajo, acuerdos y finiquitos.",
      precio: "$200 - $500",
      icono: <FaBriefcase className="text-blue-500" />
    },
    {
      titulo: "Riesgos del Trabajo",
      descripcion: "Accidentes laborales, enfermedades profesionales y compensaciones.",
      precio: "$400 - $800",
      icono: <FaHardHat className="text-orange-500" />
    },
    {
      titulo: "Acoso Laboral",
      descripcion: "Denuncias por mobbing, discriminación y hostigamiento en el trabajo.",
      precio: "$300 - $700",
      icono: <FaUserTie className="text-purple-500" />
    },
    {
      titulo: "Liquidación de Haberes",
      descripcion: "Cálculo y reclamación de beneficios sociales, vacaciones y utilidades.",
      precio: "$250 - $600",
      icono: <FaDollarSign className="text-green-500" />
    },
    {
      titulo: "Negociación Colectiva",
      descripcion: "Asesoría en formación de sindicatos y negociaciones colectivas.",
      precio: "$800 - $1,500",
      icono: <FaHandshake className="text-indigo-500" />
    }
  ];

  const beneficios = [
    "Conocimiento especializado en Código de Trabajo",
    "Representación ante Inspectoría del Trabajo",
    "Cálculo preciso de liquidaciones",
    "Mediación laboral especializada",
    "Defensa en juicios laborales",
    "Asesoría preventiva empresarial"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <FaHardHat className="text-6xl mx-auto mb-6 opacity-90" />
          <h1 className="text-5xl font-bold mb-4">Derecho Laboral</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Defendemos sus derechos laborales con experiencia y compromiso, 
            garantizando el cumplimiento de la legislación trabajadora ecuatoriana.
          </p>
        </div>
      </div>

      {/* Servicios */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
            Servicios de Derecho Laboral
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Protegemos sus derechos como trabajador y brindamos asesoría legal especializada a empresas
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
                Experiencia en Derecho Laboral
              </h2>
              <p className="text-gray-600 mb-8">
                Con más de 15 años de experiencia defendiendo los derechos de trabajadores 
                y asesorando empresas, garantizamos el mejor resultado en cada caso laboral.
              </p>
              <ul className="space-y-4">
                {beneficios.map((beneficio, index) => (
                  <li key={index} className="flex items-center">
                    <FaBriefcase className="text-blue-600 mr-3" />
                    <span className="text-gray-700">{beneficio}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">
                Consulta Especializada
              </h3>
              <p className="text-gray-600 mb-6">
                Evaluamos su situación laboral sin costo y le brindamos las mejores opciones legales.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaPhone className="text-blue-600 mr-3" />
                  <span>+593 99 123 4567</span>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-blue-600 mr-3" />
                  <span>laboral@abogadowilson.com</span>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-blue-600 mr-3" />
                  <span>Juan José Flores 4-73, Ibarra</span>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors mt-6 flex items-center justify-center">
                <FaCalendarCheck className="mr-2" />
                Consulta Gratuita
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Resultados que Hablan por Sí Solos
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { numero: "500+", titulo: "Casos Ganados", descripcion: "Despidos injustificados resueltos favorablemente" },
              { numero: "98%", titulo: "Éxito en Mediaciones", descripcion: "Resolución efectiva sin llegar a juicio" },
              { numero: "$2M+", titulo: "Indemnizaciones", descripcion: "Recuperadas para nuestros clientes" },
              { numero: "15+", titulo: "Años de Experiencia", descripcion: "Especializados en derecho laboral" }
            ].map((stat, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.numero}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{stat.titulo}</h3>
                <p className="text-gray-600 text-sm">{stat.descripcion}</p>
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
              { numero: "01", titulo: "Evaluación", descripcion: "Análisis gratuito de su caso laboral" },
              { numero: "02", titulo: "Estrategia", descripcion: "Planificación legal personalizada" },
              { numero: "03", titulo: "Ejecución", descripcion: "Representación y seguimiento activo" },
              { numero: "04", titulo: "Resultado", descripcion: "Resolución favorable garantizada" }
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
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Defienda sus Derechos Laborales
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            No permita que vulneren sus derechos. Contáctenos para una consulta gratuita.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Consulta Gratuita
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Llamar Ahora
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Laboral;
