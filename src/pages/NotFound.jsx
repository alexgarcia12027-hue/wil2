import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <FaExclamationTriangle className="text-6xl text-yellow-500 mx-auto mb-4" />
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Página No Encontrada
            </h2>
            <p className="text-gray-600 mb-8">
              Lo sentimos, la página que buscas no existe o ha sido movida.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              to="/"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <FaHome className="mr-2" />
              Ir al Inicio
            </Link>
            
            <div className="block">
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center text-gray-600 hover:text-gray-800 px-6 py-3 font-semibold transition-colors"
              >
                <FaArrowLeft className="mr-2" />
                Volver Atrás
              </button>
            </div>
          </div>

          <div className="mt-12 text-sm text-gray-500">
            <p>¿Necesitas ayuda? <Link to="/contact" className="text-blue-600 hover:underline">Contáctanos</Link></p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
