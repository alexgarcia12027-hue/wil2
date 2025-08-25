import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

const Newsletter3D = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 2000);
  };

  if (isSubscribed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto p-8 text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-4"
        >
          <FaCheckCircle className="text-6xl text-green-500" />
        </motion.div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          ¡Suscripción Exitosa!
        </h3>
        <p className="text-gray-600">
          Gracias por suscribirte a nuestro newsletter. Recibirás las últimas actualizaciones legales.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="relative max-w-2xl mx-auto p-8">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            left: mousePosition.x * 0.02,
            top: mousePosition.y * 0.02,
            transform: 'translate(-50%, -50%)'
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20"
        style={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)'
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            animate={{ 
              rotateY: [0, 10, 0, -10, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-block mb-4"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl">
              <FaEnvelope className="text-3xl text-white" />
            </div>
          </motion.div>

          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Newsletter Legal
          </h2>
          <p className="text-gray-600 text-lg">
            Mantente informado con las últimas actualizaciones legales y noticias jurídicas
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu correo electrónico"
              className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
              required
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <FaEnvelope className="text-gray-400" />
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-4 px-8 text-lg font-semibold text-white rounded-2xl transition-all duration-300 disabled:opacity-50"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
            }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Suscribiendo...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <FaPaperPlane />
                <span>Suscribirse</span>
              </div>
            )}
          </motion.button>
        </form>

        {/* Benefits */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          {[
            { icon: '📰', text: 'Noticias Legales' },
            { icon: '⚖️', text: 'Actualizaciones Jurídicas' },
            { icon: '🔒', text: 'Información Confidencial' }
          ].map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="p-4 rounded-xl bg-white/50 backdrop-blur-sm"
            >
              <div className="text-2xl mb-2">{benefit.icon}</div>
              <p className="text-sm text-gray-600 font-medium">{benefit.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Privacy Note */}
        <p className="text-xs text-gray-500 text-center mt-6">
          Respetamos tu privacidad. Puedes darte de baja en cualquier momento.
        </p>
      </motion.div>
    </div>
  );
};

export default Newsletter3D;
