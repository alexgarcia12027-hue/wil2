import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaCheckCircle } from 'react-icons/fa';
import AnimatedButton3D from '../AnimatedButton3D';

const Newsletter3D = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      setEmail('');
      
      // Reset after 5 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Mantente Informado</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Suscríbete a nuestro boletín para recibir actualizaciones legales, consejos y noticias importantes.
          </p>
        </motion.div>

        <motion.div 
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-2xl mx-auto border border-white/20 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Efecto de brillo que sigue el mouse */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none rounded-2xl"
            style={{
              background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.3), transparent 40%)`,
            }}
          />
          
          <div className="relative z-10">
            {isSubscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="py-8"
              >
                <FaCheckCircle className="mx-auto text-5xl text-green-400 mb-4" />
                <h3 className="text-2xl font-bold mb-2">¡Gracias por suscribirte!</h3>
                <p className="text-blue-100">
                  Hemos enviado una confirmación a tu correo electrónico.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Boletín Legal</h3>
                  <p className="text-blue-100 mb-6">
                    Recibe contenido exclusivo sobre derecho penal, civil, comercial y más.
                  </p>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-blue-300" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Tu correo electrónico"
                    className="w-full pl-10 pr-4 py-4 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                    required
                  />
                </div>
                
                <AnimatedButton3D
                  type="submit"
                  variant="secondary"
                  size="large"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Procesando...' : 'Suscribirse Ahora'}
                </AnimatedButton3D>
                
                <p className="text-sm text-blue-200">
                  Al suscribirte, aceptas nuestra política de privacidad y términos de servicio.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter3D;