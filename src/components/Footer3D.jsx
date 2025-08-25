import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt
} from 'react-icons/fa';
import AnimatedLogo3D from '../AnimatedLogo3D';

const Footer3D = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const footerSections = [
    {
      title: 'Servicios',
      links: [
        { name: 'Derecho Penal', path: '/servicios/penal' },
        { name: 'Derecho Civil', path: '/servicios/civil' },
        { name: 'Derecho de Tránsito', path: '/servicios/transito' },
        { name: 'Derecho Comercial', path: '/servicios/comercial' },
        { name: 'Derecho Aduanero', path: '/servicios/aduanas' }
      ]
    },
    {
      title: 'Enlaces Rápidos',
      links: [
        { name: 'Inicio', path: '/' },
        { name: 'Sobre Nosotros', path: '/sobre-nosotros' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contacto', path: '/contacto' },
        { name: 'Preguntas Frecuentes', path: '/faq' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Política de Privacidad', path: '/politicas-privacidad' },
        { name: 'Términos y Condiciones', path: '/terminos-condiciones' },
        { name: 'Seguridad', path: '/seguridad' }
      ]
    }
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, url: 'https://facebook.com', label: 'Facebook' },
    { icon: <FaTwitter />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <FaInstagram />, url: 'https://instagram.com', label: 'Instagram' },
    { icon: <FaLinkedinIn />, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <FaWhatsapp />, url: 'https://wa.me/593988835269', label: 'WhatsApp' }
  ];

  return (
    <footer className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Efecto de luz que sigue el mouse */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.2), transparent 40%)`,
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Contact Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <AnimatedLogo3D size="medium" />
            </div>
            <p className="text-blue-100 mb-6 max-w-md">
              Ofrecemos asesoría legal profesional con más de 5 años de experiencia, 
              especializados en derecho penal, civil, tránsito, comercial y aduanero.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-blue-300 mt-1 mr-3 flex-shrink-0" />
                <span className="text-blue-100">Ibarra, Ecuador</span>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-blue-300 mr-3" />
                <span className="text-blue-100">+593 98 883 5269</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-blue-300 mr-3" />
                <span className="text-blue-100">info@abogadowilson.com</span>
              </div>
            </div>
            
            {/* Social Media */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Síguenos</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full bg-blue-800 flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                    whileHover={{ 
                      y: -3,
                      scale: 1.1,
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 5px 10px -5px rgba(0, 0, 0, 0.1)'
                    }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4 relative inline-block">
                {section.title}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <motion.li 
                    key={linkIndex}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link 
                      to={link.path} 
                      className="text-blue-100 hover:text-white transition-colors flex items-center"
                    >
                      <span className="mr-2">›</span>
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-blue-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-blue-200 text-sm">
            © {new Date().getFullYear()} Abogado Wilson Ipiales. Todos los derechos reservados.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/politicas-privacidad" className="text-blue-200 hover:text-white text-sm transition-colors">
              Política de Privacidad
            </Link>
            <Link to="/terminos-condiciones" className="text-blue-200 hover:text-white text-sm transition-colors">
              Términos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer3D;