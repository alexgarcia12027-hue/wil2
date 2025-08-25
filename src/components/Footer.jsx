import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Abogado Wilson</h3>
            <p className="text-gray-300 mb-4">
              Servicios legales profesionales con más de 15 años de experiencia en Ecuador.
            </p>
            <div className="flex space-x-4">
              <FaFacebook className="text-xl hover:text-blue-500 cursor-pointer transition-colors" />
              <FaTwitter className="text-xl hover:text-blue-400 cursor-pointer transition-colors" />
              <FaLinkedin className="text-xl hover:text-blue-600 cursor-pointer transition-colors" />
              <FaInstagram className="text-xl hover:text-pink-500 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Servicios</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/servicios/civil" className="hover:text-white transition-colors">Derecho Civil</a></li>
              <li><a href="/servicios/penal" className="hover:text-white transition-colors">Derecho Penal</a></li>
              <li><a href="/servicios/laboral" className="hover:text-white transition-colors">Derecho Laboral</a></li>
              <li><a href="/servicios/familia" className="hover:text-white transition-colors">Derecho de Familia</a></li>
              <li><a href="/servicios/comercial" className="hover:text-white transition-colors">Derecho Comercial</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/about" className="hover:text-white transition-colors">Acerca de</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contacto</a></li>
              <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a></li>
              <li><a href="/admin" className="hover:text-white transition-colors">Admin</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-3 text-blue-500" />
                <span>Juan José Flores 4-73, Ibarra, Ecuador</span>
              </div>
              <div className="flex items-center">
                <FaPhone className="mr-3 text-blue-500" />
                <span>+593 99 123 4567</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-3 text-blue-500" />
                <span>contacto@abogadowilson.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Abogado Wilson. Todos los derechos reservados.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Política de Privacidad
            </a>
            <a href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Términos de Servicio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
