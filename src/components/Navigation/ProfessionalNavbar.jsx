import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaGavel, FaShoppingCart, FaGraduationCap, FaNewspaper, FaEnvelope, FaUser, FaSearch, FaMoon, FaSun, FaTrash, FaBars, FaTimes, FaSignInAlt, FaUserPlus, FaPhone, FaWhatsapp } from 'react-icons/fa';

const MotionDiv = motion.div;

const mainNavigation = [
  { name: 'Inicio', href: '/', icon: <FaHome className="text-blue-600" /> },
  { name: 'Servicios', href: '/services', icon: <FaGavel className="text-blue-600" /> },
  { name: 'Tienda', href: '/shop', icon: <FaShoppingCart className="text-blue-600" /> },
  { name: 'Cursos', href: '/courses', icon: <FaGraduationCap className="text-blue-600" /> },
  { name: 'Blog', href: '/blog', icon: <FaNewspaper className="text-blue-600" /> },
  { name: 'Contacto', href: '/contact', icon: <FaEnvelope className="text-blue-600" /> },
];

function ProfessionalNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [accountOpen, setAccountOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [cart, setCart] = useState([]);
  const location = useLocation();

  const accountRef = useRef(null);
  const cartRef = useRef(null);

  const useOutsideAlerter = (ref, setOpen) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [ref, setOpen]);
  };

  useOutsideAlerter(accountRef, setAccountOpen);
  useOutsideAlerter(cartRef, setIsCartOpen);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
    
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const updatedNavigation = mainNavigation.map(item => ({
    ...item,
    current: location.pathname === item.href
  }));

  const closeAll = () => {
    setIsMobileMenuOpen(false);
    setAccountOpen(false);
    setIsCartOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      console.log('Searching for:', searchTerm);
      setIsSearchOpen(false);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const renderMobileNav = () => (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <MotionDiv 
          initial={{opacity: 0}} 
          animate={{opacity: 1}} 
          exit={{opacity: 0}} 
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <MotionDiv 
            initial={{x: "-100%"}} 
            animate={{x: 0}} 
            exit={{x: "-100%"}} 
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute top-0 left-0 h-full w-4/5 max-w-sm bg-white shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-200">
              <Link to="/" onClick={closeAll} className="flex items-center gap-2">
                <FaGavel className="h-8 w-auto text-blue-600" />
                <span className="text-xl font-bold font-serif">Abg. W. Ipiales</span>
              </Link>
            </div>
            <nav className="flex flex-col p-4 gap-4 text-lg">
              {updatedNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={closeAll}
                  className="flex items-center gap-2 py-2 text-gray-700 hover:text-blue-600"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
              
              <div className="border-t border-gray-200 pt-4">
                {isLoggedIn ? (
                  <div className="space-y-4">
                    <Link to="/dashboard" onClick={closeAll} className="flex items-center gap-2 w-full text-left py-2">
                      <FaUser className="h-5 w-5"/> Portal Cliente
                    </Link>
                    <button 
                      onClick={() => {
                        localStorage.removeItem('authToken');
                        setIsLoggedIn(false);
                        closeAll();
                      }} 
                      className="flex items-center gap-2 w-full text-left py-2 text-red-600"
                    >
                      <FaSignInAlt className="h-5 w-5"/> Cerrar Sesión
                    </button>
                  </div>
                ) : (
                  <Link 
                    to="/login" 
                    onClick={closeAll}
                    className="w-full block text-center px-4 py-2 text-base rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Iniciar Sesión
                  </Link>
                )}
              </div>

              {/* Contact buttons for mobile */}
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Contacto Directo</h3>
                <div className="grid grid-cols-2 gap-2">
                  <a 
                    href="tel:+593988835269" 
                    className="flex items-center justify-center p-2 text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    <FaPhone className="mr-1" /> Llamar
                  </a>
                  <a 
                    href="https://wa.me/593988835269" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center p-2 text-xs font-medium rounded-md text-white bg-green-500 hover:bg-green-600"
                  >
                    <FaWhatsapp className="mr-1" /> WhatsApp
                  </a>
                </div>
              </div>
            </nav>
          </MotionDiv>
        </MotionDiv>
      )}
    </AnimatePresence>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 bg-white border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <FaGavel className="h-8 w-auto text-blue-600" />
            <span className="text-xl font-bold font-serif hidden sm:inline text-gray-900">Abg. Wilson Ipiales</span>
          </Link>

          <nav className="hidden md:flex space-x-6 items-center text-sm font-medium">
            {updatedNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors ${
                  item.current ? 'text-blue-600 font-semibold' : ''
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <form onSubmit={handleSearch} className="flex items-center">
              <button 
                type="button" 
                onClick={() => setIsSearchOpen(!isSearchOpen)} 
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <FaSearch className="h-5 w-5" />
              </button>
              <AnimatePresence>
                {isSearchOpen && (
                  <MotionDiv 
                    initial={{width: 0, opacity: 0}} 
                    animate={{width: "auto", opacity: 1}} 
                    exit={{width: 0, opacity: 0}} 
                    className="overflow-hidden"
                  >
                    <input 
                      type="text" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Buscar..." 
                      className="w-40 sm:w-48 p-2 rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </MotionDiv>
                )}
              </AnimatePresence>
            </form>

            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100">
              {theme === "dark" ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5" />}
            </button>
            
            <div className="relative" ref={cartRef}>
              <button 
                onClick={() => setIsCartOpen(prev => !prev)} 
                className="relative p-2 rounded-full hover:bg-gray-100"
              >
                <FaShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
              <AnimatePresence>
                {isCartOpen && (
                  <MotionDiv 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: 10 }} 
                    className="absolute top-full right-0 mt-2 w-80 bg-white shadow-lg rounded-md z-50 ring-1 ring-black ring-opacity-5"
                  >
                    <div className="p-4">
                      <h3 className="font-semibold">Tu Carrito</h3>
                    </div>
                    {cart.length > 0 ? (
                      <>
                        <div className="p-4 border-t border-gray-200 max-h-64 overflow-y-auto">
                          {cart.map(item => (
                            <div key={item.id} className="flex items-center gap-3 py-2">
                              <div className="flex-grow">
                                <p className="text-sm font-medium">{item.name}</p>
                                <p className="text-xs text-gray-500">${item.price.toFixed(2)}</p>
                              </div>
                              <span className="text-sm w-4 text-center">{item.quantity}</span>
                              <button 
                                onClick={() => removeFromCart(item.id)} 
                                className="p-1 text-gray-400 hover:text-red-500"
                              >
                                <FaTrash className="h-4 w-4"/>
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="p-4 border-t border-gray-200">
                          <div className="flex justify-between font-semibold">
                            <span>Subtotal</span>
                            <span>${cartTotal.toFixed(2)}</span>
                          </div>
                          <Link 
                            to="/payment" 
                            onClick={() => setIsCartOpen(false)}
                            className="w-full mt-3 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 block text-center"
                          >
                            Ir a Pagar
                          </Link>
                        </div>
                      </>
                    ) : (
                      <p className="p-4 text-sm text-gray-500 text-center">Tu carrito está vacío.</p>
                    )}
                  </MotionDiv>
                )}
              </AnimatePresence>
            </div>

            {isLoggedIn ? (
              <div className="relative hidden md:block" ref={accountRef}>
                <button 
                  onClick={() => setAccountOpen(!accountOpen)} 
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <FaUser className="h-5 w-5" />
                </button>
                <AnimatePresence>
                  {accountOpen && (
                    <MotionDiv 
                      initial={{opacity:0, y:-5}} 
                      animate={{opacity:1, y:0}} 
                      exit={{opacity:0, y:-5}} 
                      className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-md w-60 p-2 z-50 ring-1 ring-black ring-opacity-5"
                    >
                      <Link 
                        to="/dashboard" 
                        className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md hover:bg-gray-100"
                      >
                        <FaUser className="h-4 w-4"/> Portal Cliente
                      </Link>
                      <div className="border-t border-gray-200 my-1"></div>
                      <button 
                        onClick={() => {
                          localStorage.removeItem('authToken');
                          setIsLoggedIn(false);
                        }} 
                        className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 text-red-600"
                      >
                        <FaSignInAlt className="h-4 w-4"/> Cerrar Sesión
                      </button>
                    </MotionDiv>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link 
                  to="/register" 
                  className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100"
                >
                  <FaUserPlus className="inline mr-1" /> Registrarse
                </Link>
                <Link 
                  to="/login" 
                  className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  <FaSignInAlt className="inline mr-1" /> Iniciar Sesión
                </Link>
              </div>
            )}

            {/* Contact Action Buttons - Hidden on small screens */}
            <div className="hidden lg:flex lg:items-center space-x-1">
              <a 
                href="tel:+593988835269" 
                className="inline-flex items-center p-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
              >
                <FaPhone className="mr-1" /> Llamar
              </a>
              <a 
                href="https://wa.me/593988835269" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center p-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-500 hover:bg-green-600 transition-colors duration-200"
              >
                <FaWhatsapp className="mr-1" /> WhatsApp
              </a>
              <Link 
                to="/contact" 
                className="inline-flex items-center p-1.5 border border-transparent text-xs font-medium rounded-md text-gray-900 bg-yellow-400 hover:bg-yellow-500 transition-colors duration-200"
              >
                <FaEnvelope className="mr-1" /> Consulta Gratis
              </Link>
            </div>

            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className="p-2 rounded-full hover:bg-gray-100"
              >
                {isMobileMenuOpen ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
      {renderMobileNav()}
    </header>
  );
}

export default ProfessionalNavbar;
