import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarCheck } from 'react-icons/fa';

const ServiceLayout = ({ 
  title, 
  description, 
  icon, 
  color = "blue", 
  children 
}) => {
  const colorClasses = {
    blue: {
      header: "from-blue-600 to-indigo-600",
      accent: "text-blue-600",
      button: "bg-blue-600 hover:bg-blue-700"
    },
    green: {
      header: "from-green-600 to-emerald-600", 
      accent: "text-green-600",
      button: "bg-green-600 hover:bg-green-700"
    },
    purple: {
      header: "from-purple-600 to-violet-600",
      accent: "text-purple-600", 
      button: "bg-purple-600 hover:bg-purple-700"
    },
    red: {
      header: "from-red-600 to-rose-600",
      accent: "text-red-600",
      button: "bg-red-600 hover:bg-red-700"
    }
  };

  const colors = colorClasses[color] || colorClasses.blue;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className={`bg-gradient-to-r ${colors.header} text-white py-20`}>
        <div className="container mx-auto px-6 text-center">
          {icon && <div className="text-6xl mx-auto mb-6 opacity-90">{icon}</div>}
          <h1 className="text-5xl font-bold mb-4">{title}</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            {description}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="py-20">
        {children}
      </div>

      {/* Contact CTA */}
      <section className={`py-20 bg-gradient-to-r ${colors.header} text-white`}>
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            ¿Necesita Asesoría Legal Especializada?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Contáctenos para una consulta personalizada y proteja sus derechos.
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

export default ServiceLayout;
