import React, { Fragment, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { FaWhatsapp, FaPhone, FaUser, FaCalendarAlt, FaNewspaper, FaGavel, FaHome, FaEnvelope, FaBook, FaShoppingCart, FaGraduationCap, FaUsers, FaCog } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './Navigation/Navigation';

const navigation = [
  { name: 'Inicio', href: '/', icon: <FaHome className="mr-1" /> },
  { name: 'Servicios', href: '/services', icon: <FaGavel className="mr-1" /> },
  { name: 'Tienda', href: '/shop', icon: <FaShoppingCart className="mr-1" /> },
  { name: 'Cursos', href: '/courses', icon: <FaGraduationCap className="mr-1" /> },
  { name: 'E-Books', href: '/ebooks', icon: <FaBook className="mr-1" /> },
  { name: 'Blog', href: '/blog', icon: <FaNewspaper className="mr-1" /> },
  { name: 'Foro', href: '/forum', icon: <FaUsers className="mr-1" /> },
  { name: 'Contacto', href: '/contact', icon: <FaEnvelope className="mr-1" /> },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const location = useLocation();
  const [cartItems, setCartItems] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white shadow-lg'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Abrir menú principal</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="/abogado.png"
                    alt="Abg. Wilson Ipiales"
                  />
                  <span className="ml-2 text-lg font-bold text-blue-800">Abg. Wilson Ipiales</span>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <motion.div
                        key={item.name}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          to={item.href}
                          className={classNames(
                            location.pathname === item.href 
                              ? 'bg-blue-700 text-white shadow-lg' 
                              : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md',
                            'rounded-md px-3 py-2 text-sm font-medium flex items-center transition-all duration-200'
                          )}
                        >
                          {item.icon}
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="flex items-center space-x-2">
                  {/* Carrito de compras */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Link
                      to="/cart"
                      className="relative p-2 text-gray-700 hover:text-blue-700 transition-colors"
                    >
                      <FaShoppingCart className="h-6 w-6" />
                      {cartItems > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                        >
                          {cartItems}
                        </motion.span>
                      )}
                    </Link>
                  </motion.div>

                  <motion.a
                    href="https://wa.me/593988835269?text=Hola%20Abg.%20Wilson,%20me%20gustaría%20consultar%20sobre%20sus%20servicios%20legales."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 text-white hover:bg-green-700 rounded-md px-3 py-2 text-sm font-medium flex items-center transition-all duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaWhatsapp className="mr-1" />
                    WhatsApp
                  </motion.a>
                  
                  <motion.a
                    href="tel:+593988835269"
                    className="bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-md px-3 py-2 text-sm font-medium flex items-center transition-all duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaPhone className="mr-1" />
                    Llamar
                  </motion.a>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/consultation"
                      className="bg-blue-600 text-white hover:bg-blue-700 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200"
                    >
                      Consulta Gratis
                    </Link>
                  </motion.div>
                </div>

                {/* Perfil */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Abrir menú de usuario</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="/usuario.svg"
                        alt="Usuario"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/dashboard"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 flex items-center')}
                          >
                            <FaUser className="mr-2" />
                            Mi Dashboard
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/appointments"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 flex items-center')}
                          >
                            <FaCalendarAlt className="mr-2" />
                            Mis Citas
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/admin"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 flex items-center')}
                          >
                            <FaCog className="mr-2" />
                            Admin Panel
                          </Link>
                        )}
                      </Menu.Item>
                      <hr className="my-1" />
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/login"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Iniciar Sesión
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    item.current ? 'bg-blue-700 text-white' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700',
                    'block rounded-md px-3 py-2 text-base font-medium flex items-center'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
    </motion.header>
  );
}