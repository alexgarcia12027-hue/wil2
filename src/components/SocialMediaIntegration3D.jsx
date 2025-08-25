import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaWhatsapp,
  FaShareAlt
} from 'react-icons/fa';

const SocialMediaIntegration3D = ({ variant = 'default' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const socialLinks = [
    { 
      icon: <FaFacebookF />, 
      url: 'https://facebook.com', 
      label: 'Facebook',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    { 
      icon: <FaTwitter />, 
      url: 'https://twitter.com', 
      label: 'Twitter',
      color: 'bg-blue-400 hover:bg-blue-500'
    },
    { 
      icon: <FaInstagram />, 
      url: 'https://instagram.com', 
      label: 'Instagram',
      color: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
    },
    { 
      icon: <FaLinkedinIn />, 
      url: 'https://linkedin.com', 
      label: 'LinkedIn',
      color: 'bg-blue-700 hover:bg-blue-800'
    },
    { 
      icon: <FaWhatsapp />, 
      url: 'https://wa.me/593988835269', 
      label: 'WhatsApp',
      color: 'bg-green-500 hover:bg-green-600'
    }
  ];

  if (variant === 'floating') {
    return (
      <motion.div
        className="fixed right-4 bottom-4 z-40"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        whileHover={{ scale: 1.05 }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="flex flex-col space-y-2">
          <motion.button
            className="bg-white rounded-full p-3 shadow-lg border border-gray-200 text-gray-600 hover:text-blue-600"
            whileHover={{ 
              y: -3,
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 5px 10px -5px rgba(0, 0, 0, 0.1)'
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsHovered(!isHovered)}
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            <FaShareAlt />
          </motion.button>
          
          {isHovered && (
            <motion.div
              className="flex flex-col space-y-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-full p-3 shadow-lg text-white flex items-center justify-center ${social.color}`}
                  whileHover={{ 
                    y: -3,
                    scale: 1.1,
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 5px 10px -5px rgba(0, 0, 0, 0.1)'
                  }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-secondary-900 mb-4">Síguenos en Redes Sociales</h3>
      <div className="flex flex-wrap justify-center gap-4">
        {socialLinks.map((social, index) => (
          <motion.a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-full p-3 shadow-md text-white flex items-center justify-center ${social.color} w-12 h-12`}
            whileHover={{ 
              y: -5,
              scale: 1.1,
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 5px 10px -5px rgba(0, 0, 0, 0.1)'
            }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Efecto de brillo que sigue el mouse */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none rounded-full"
              style={{
                background: `radial-gradient(30px circle at ${mousePosition.x % 30}px ${mousePosition.y % 30}px, rgba(255,255,255,0.6), transparent 40%)`,
              }}
            />
            
            <span className="relative z-10">
              {social.icon}
            </span>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default SocialMediaIntegration3D;