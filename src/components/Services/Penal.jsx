import React from 'react';
import { FaBalanceScale, FaGavel, FaUserShield, FaBook, FaLock, FaBuilding, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarCheck } from 'react-icons/fa';

const Penal = () => {
  const servicios = [
    {
      titulo: "Defensa en Delitos Menores",
      descripcion: "Representación en contravenciones y delitos de poca cuantía",
      precio: "$200 - $500",
      icono: <FaGavel className="text-red-500" />
    },
    {
      titulo: "Defensa en Delitos Graves",
      descripcion: "Representación en delitos que ameritan pena privativa de libertad",
      precio: "$500 - $1,500",
      icono: <FaUserShield className="text-orange-500" />
    },
    {
      titulo: "Asesoría en Flagrancia",
      descripcion: "Asistencia inmediata en casos de detención en flagrante delito",
      precio: "$150 - $300",
      icono: <FaBook className="text-yellow-500" />
    },
    {
      titulo: "Recursos de Apelación",
      descripcion: "Impugnación de sentencias ante instancias superiores",
      precio: "$300 - $800",
      icono: <FaLock className="text-purple-500" />
    },
    {
      titulo: "Defensa Corporativa",
      descripcion: "Representación de empresas en delitos económicos y societarios",
      precio: "$800 - $2,000",
      icono: <FaBuilding className="text-blue-500" />
    },
    {
      titulo: "Medidas Cautelares",
      descripcion: "Gestión de medidas alternativas a la prisión preventiva",
      precio: "$250 - $600",
      icono: <FaBalanceScale className="text-green-500" />
    }
  ];

  const beneficios = [
    "Defensa técnica especializada las 24 horas",
    "Experiencia en todas las jurisdicciones penales",
    "Conocimiento del Código Orgánico Integral Penal",
    "Representación en audiencias y juicios",
    "Asesoría en medidas cautelares",
    "Seguimiento personalizado de cada caso"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <FaGavel className="text-6xl mx-auto mb-6 opacity-90" />
          <h1 className="text-5xl font-bold mb-4">Derecho Penal</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Defensa especializada en todas las materias del derecho penal ecuatoriano, 
            protegiendo su libertad y derechos fundamentales con experiencia comprobada.
          </p>
        </div>
      </div>

      {/* Servicios */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
            Servicios de Defensa Penal
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Protegemos su libertad con defensa técnica especializada y experiencia comprobada
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
                  <span className="text-2xl font-bold text-red-600">
                    {servicio.precio}
                  </span>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
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
                Defensa Penal Especializada
              </h2>
              <p className="text-gray-600 mb-8">
                Con más de 15 años de experiencia en defensa penal, garantizamos 
                la protección efectiva de su libertad y derechos constitucionales.
              </p>
              <ul className="space-y-4">
                {beneficios.map((beneficio, index) => (
                  <li key={index} className="flex items-center">
                    <FaUserShield className="text-red-600 mr-3" />
                    <span className="text-gray-700">{beneficio}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-red-100 to-orange-100 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">
                Emergencia 24/7
              </h3>
              <p className="text-gray-600 mb-6">
                Si se encuentra en situación de flagrancia o detención, contáctenos inmediatamente.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaPhone className="text-red-600 mr-3" />
                  <span>+593 99 123 4567</span>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-red-600 mr-3" />
                  <span>penal@abogadowilson.com</span>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-red-600 mr-3" />
                  <span>Juan José Flores 4-73, Ibarra</span>
                </div>
              </div>
              <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors mt-6 flex items-center justify-center">
                <FaCalendarCheck className="mr-2" />
                Emergencia Penal
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Defienda su Libertad con Expertos
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            No enfrente solo un proceso penal. Contáctenos para una defensa especializada.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Consulta Urgente
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors">
              Llamar Ahora
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Penal;
