import React from 'react';
import { motion } from 'framer-motion';

const Footer3D = () => {
  return (
    <motion.footer 
      className="bg-gradient-to-r from-primary-900 to-secondary-900 text-white py-12 mt-20"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <motion.h3 
              className="text-2xl font-bold mb-4"
              whileHover={{ scale: 1.05 }}
            >
              Abogado Wilson
            </motion.h3>
            <p className="text-gray-300 mb-4">
              Servicios legales profesionales con más de 10 años de experiencia. 
              Especialistas en derecho civil, comercial y familiar.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
              >
                📧
              </motion.a>
              <motion.a 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.2, rotate: -5 }}
              >
                📱
              </motion.a>
              <motion.a 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
              >
                🌐
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              {['Inicio', 'Servicios', 'Sobre Nosotros', 'Contacto', 'Blog'].map((link, index) => (
                <motion.li key={link}>
                  <motion.a 
                    href="#" 
                    className="text-gray-300 hover:text-white transition-colors"
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {link}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-2 text-gray-300">
              <motion.p 
                className="flex items-center"
                whileHover={{ x: 5 }}
              >
                📍 Calle Principal 123, Ciudad
              </motion.p>
              <motion.p 
                className="flex items-center"
                whileHover={{ x: 5 }}
              >
                📞 +57 300 123 4567
              </motion.p>
              <motion.p 
                className="flex items-center"
                whileHover={{ x: 5 }}
              >
                ✉️ info@abogadowilson.com
              </motion.p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>&copy; 2024 Abogado Wilson. Todos los derechos reservados.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">Términos de Servicio</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer3D;
