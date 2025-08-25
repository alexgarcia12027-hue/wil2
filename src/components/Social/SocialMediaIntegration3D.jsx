import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp, FaShare } from 'react-icons/fa';

const SocialMediaIntegration3D = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeNetwork, setActiveNetwork] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const socialNetworks = [
    {
      name: 'Facebook',
      icon: FaFacebook,
      color: '#1877f2',
      url: 'https://facebook.com/abogadowilson',
      description: 'Síguenos en Facebook'
    },
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      color: '#25d366',
      url: 'https://wa.me/593987654321',
      description: 'Contáctanos por WhatsApp'
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      color: '#0077b5',
      url: 'https://linkedin.com/in/abogadowilson',
      description: 'Conéctate en LinkedIn'
    },
    {
      name: 'Instagram',
      icon: FaInstagram,
      color: '#e4405f',
      url: 'https://instagram.com/abogadowilson',
      description: 'Síguenos en Instagram'
    }
  ];

  const handleShare = async (network) => {
    const url = window.location.href;
    const title = 'Abg. Wilson Alexander Ipiales Guerron - Asesoría Legal Profesional';
    
    if (navigator.share && network.name === 'Share') {
      try {
        await navigator.share({
          title,
          url
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      window.open(network.url, '_blank');
    }
  };

  return (
    <div className="relative">
      {/* Social Media Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6"
      >
        {socialNetworks.map((network, index) => {
          const IconComponent = network.icon;
          return (
            <motion.div
              key={network.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 10,
                z: 20
              }}
              whileTap={{ scale: 0.95 }}
              className="relative group cursor-pointer"
              onClick={() => handleShare(network)}
              onMouseEnter={() => setActiveNetwork(network.name)}
              onMouseLeave={() => setActiveNetwork(null)}
            >
              <div
                className="p-6 rounded-2xl shadow-lg transition-all duration-300 group-hover:shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, ${network.color}15 0%, ${network.color}25 100%)`,
                  border: `1px solid ${network.color}30`,
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="flex flex-col items-center space-y-3">
                  <div
                    className="p-3 rounded-full transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${network.color} 0%, ${network.color}dd 100%)`,
                      boxShadow: `0 4px 20px ${network.color}40`
                    }}
                  >
                    <IconComponent className="text-white text-2xl" />
                  </div>
                  
                  <div className="text-center">
                    <h3 className="font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
                      {network.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {network.description}
                    </p>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  style={{ background: network.color }}
                />
              </div>

              {/* 3D Shadow Effect */}
              <div
                className="absolute inset-0 rounded-2xl -z-10 transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
                style={{
                  background: `linear-gradient(135deg, ${network.color}20 0%, ${network.color}10 100%)`,
                  filter: 'blur(8px)'
                }}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Floating Share Button */}
      <motion.div
        className="fixed bottom-20 right-6 z-40"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleShare({ name: 'Share', url: window.location.href })}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full shadow-lg"
          style={{
            boxShadow: '0 10px 30px rgba(168, 85, 247, 0.4)'
          }}
        >
          <FaShare size={20} />
        </motion.button>
      </motion.div>

      {/* Active Network Indicator */}
      {activeNetwork && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="fixed bottom-32 right-6 bg-white rounded-lg shadow-lg p-2 z-50"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <p className="text-sm font-medium text-gray-800">
            {activeNetwork}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default SocialMediaIntegration3D;
