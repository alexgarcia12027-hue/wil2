import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHome, FaGavel, FaShoppingCart, FaGraduationCap, FaNewspaper, FaEnvelope, 
  FaUser, FaSearch, FaMoon, FaSun, FaTrash, FaBars, FaTimes, FaSignInAlt, 
  FaUserPlus, FaPhone, FaWhatsapp, FaBook, FaUsers, FaCalendarAlt, FaCog,
  FaChevronDown, FaBell, FaCreditCard, FaHeart, FaGift, FaComments,
  FaFileAlt, FaVideo, FaPlay, FaMicrophone, FaHeadphones, FaAward,
  FaChartLine, FaUserTie, FaHandshake, FaLightbulb, FaRocket, FaCar
} from 'react-icons/fa';

const ComprehensiveNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [accountOpen, setAccountOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [cart, setCart] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [userRole, setUserRole] = useState('guest');
  
  const location = useLocation();
  const navigate = useNavigate();

  const accountRef = useRef(null);
  const cartRef = useRef(null);

  // Comprehensive navigation structure
  const mainNavigation = [
    { 
      name: 'Inicio', 
      href: '/', 
      icon: <FaHome className="text-blue-600" />,
      description: 'Página principal'
    },
    {
      name: 'Servicios',
      href: '/services',
      icon: <FaGavel className="text-blue-600" />,
      description: 'Servicios legales profesionales',
      submenu: [
        { name: 'Derecho Penal', href: '/services/penal', icon: <FaGavel /> },
        { name: 'Derecho Civil', href: '/services/civil', icon: <FaHandshake /> },
        { name: 'Derecho Comercial', href: '/services/comercial', icon: <FaUserTie /> },
        { name: 'Derecho de Tránsito', href: '/services/transito', icon: <FaCar /> },
        { name: 'Consultas Rápidas', href: '/quick-consultation', icon: <FaLightbulb /> },
        { name: 'Agendar Cita', href: '/appointments', icon: <FaCalendarAlt /> }
      ]
    },
    {
      name: 'Tienda',
      href: '/shop',
      icon: <FaShoppingCart className="text-blue-600" />,
      description: 'Productos y servicios',
      submenu: [
        { name: 'E-Books Legales', href: '/productos', icon: <FaBook /> },
        { name: 'Cursos Online', href: '/productos', icon: <FaGraduationCap /> },
        { name: 'Masterclass', href: '/productos', icon: <FaVideo /> },
        { name: 'Productos Legales', href: '/productos', icon: <FaFileAlt /> },
        { name: 'Planes de Suscripción', href: '/planes', icon: <FaRocket /> },
        { name: 'Consulta Procesos', href: '/consulta-procesos', icon: <FaGavel /> }
      ]
    },
    {
      name: 'Educación',
      href: '/education',
      icon: <FaGraduationCap className="text-blue-600" />,
      description: 'Formación legal',
      submenu: [
        { name: 'Cursos Básicos', href: '/courses/basic', icon: <FaBook /> },
        { name: 'Cursos Avanzados', href: '/courses/advanced', icon: <FaGraduationCap /> },
        { name: 'Webinars', href: '/webinars', icon: <FaVideo /> },
        { name: 'Talleres', href: '/workshops', icon: <FaUsers /> },
        { name: 'Certificaciones', href: '/certifications', icon: <FaAward /> }
      ]
    },
    {
      name: 'Comunidad',
      href: '/community',
      icon: <FaUsers className="text-blue-600" />,
      description: 'Interacción y networking',
      submenu: [
        { name: 'Foro Legal', href: '/forum', icon: <FaComments /> },
        { name: 'Blog', href: '/blog', icon: <FaNewspaper /> },
        { name: 'Testimonios', href: '/testimonials', icon: <FaHeart /> },
        { name: 'Newsletter', href: '/newsletter', icon: <FaEnvelope /> },
        { name: 'Eventos', href: '/events', icon: <FaCalendarAlt /> }
      ]
    },
    { 
      name: 'Contacto', 
      href: '/contact', 
      icon: <FaEnvelope className="text-blue-600" />,
      description: 'Contáctanos'
    }
  ];

  const userMenuItems = {
    guest: [
      { name: 'Iniciar Sesión', href: '/login', icon: <FaSignInAlt /> },
      { name: 'Registrarse', href: '/register', icon: <FaUserPlus /> }
    ],
    client: [
      { name: 'Mi Dashboard', href: '/dashboard', icon: <FaUser /> },
      { name: 'Mis Cursos', href: '/dashboard/courses', icon: <FaGraduationCap /> },
      { name: 'Mis Compras', href: '/dashboard/purchases', icon: <FaShoppingCart /> },
      { name: 'Certificados', href: '/dashboard/certificates', icon: <FaAward /> },
      { name: 'Consultas', href: '/dashboard/consultations', icon: <FaComments /> },
      { name: 'Configuración', href: '/dashboard/settings', icon: <FaCog /> },
      { name: 'Cerrar Sesión', href: '/logout', icon: <FaSignInAlt /> }
    ],
    admin: [
      { name: 'Panel Admin', href: '/admin', icon: <FaChartLine /> },
      { name: 'Gestión Usuarios', href: '/admin/users', icon: <FaUsers /> },
      { name: 'Gestión Contenido', href: '/admin/content', icon: <FaFileAlt /> },
      { name: 'Finanzas', href: '/admin/finances', icon: <FaCreditCard /> },
      { name: 'Configuración', href: '/admin/settings', icon: <FaCog /> },
      { name: 'Cerrar Sesión', href: '/logout', icon: <FaSignInAlt /> }
    ]
  };

  const quickActions = [
    { name: 'Consulta Gratis', href: '/free-consultation', icon: <FaGift />, color: 'bg-yellow-500' },
    { name: 'Llamar', href: 'tel:+593988835269', icon: <FaPhone />, color: 'bg-green-600' },
    { name: 'WhatsApp', href: 'https://wa.me/593988835269', icon: <FaWhatsapp />, color: 'bg-green-500' },
    { name: 'Agendar Cita', href: '/appointments', icon: <FaCalendarAlt />, color: 'bg-blue-600' }
  ];

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole') || 'guest';
    setIsLoggedIn(!!token);
    setUserRole(role);
    
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Load notifications
    const savedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    setNotifications(savedNotifications);
  }, []);

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

  const updatedNavigation = mainNavigation.map(item => ({
    ...item,
    current: location.pathname === item.href || 
             (item.submenu && item.submenu.some(sub => location.pathname === sub.href))
  }));

  const closeAll = () => {
    setIsMobileMenuOpen(false);
    setAccountOpen(false);
    setIsCartOpen(false);
    setActiveDropdown(null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setIsSearchOpen(false);
      setSearchTerm('');
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

  const handleDropdownToggle = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const renderDesktopSubmenu = (submenu, parentName) => (
    <AnimatePresence>
      {activeDropdown === parentName && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
        >
          {submenu.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              onClick={closeAll}
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <span className="mr-3 text-blue-600">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderMobileNav = () => (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div 
          initial={{opacity: 0}} 
          animate={{opacity: 1}} 
          exit={{opacity: 0}} 
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <motion.div 
            initial={{x: "-100%"}} 
            animate={{x: 0}} 
            exit={{x: "-100%"}} 
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute top-0 left-0 h-full w-4/5 max-w-sm bg-white shadow-lg overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Header */}
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <Link to="/" onClick={closeAll} className="flex items-center gap-2">
                <FaGavel className="h-8 w-auto text-white" />
                <div>
                  <span className="text-xl font-bold font-serif block">Abg. Wilson Ipiales</span>
                  <span className="text-xs text-blue-100">Servicios Legales Profesionales</span>
                </div>
              </Link>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex flex-col p-4 space-y-2">
              {updatedNavigation.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.href}
                    onClick={item.submenu ? (e) => e.preventDefault() : closeAll}
                    className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                      item.current ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span className="font-medium">{item.name}</span>
                    </div>
                    {item.submenu && <FaChevronDown className="text-gray-400" />}
                  </Link>
                  
                  {item.submenu && (
                    <div className="ml-6 mt-2 space-y-1">
                      {item.submenu.map((subItem, index) => (
                        <Link
                          key={index}
                          to={subItem.href}
                          onClick={closeAll}
                          className="flex items-center gap-2 p-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
                        >
                          {subItem.icon}
                          <span>{subItem.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile User Menu */}
            <div className="border-t border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                {isLoggedIn ? 'Mi Cuenta' : 'Acceso'}
              </h3>
              <div className="space-y-2">
                {userMenuItems[userRole].map((item, index) => (
                  <Link
                    key={index}
                    to={item.href}
                    onClick={closeAll}
                    className="flex items-center gap-3 p-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Quick Actions */}
            <div className="border-t border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Acciones Rápidas
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => (
                  <a
                    key={index}
                    href={action.href}
                    target={action.href.startsWith('http') ? '_blank' : '_self'}
                    rel={action.href.startsWith('http') ? 'noopener noreferrer' : ''}
                    className={`flex items-center justify-center p-3 text-white rounded-lg text-sm font-medium ${action.color} hover:opacity-90 transition-opacity`}
                  >
                    {action.icon}
                    <span className="ml-1">{action.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <FaGavel className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold text-gray-900">LegalPro</span>
                <div className="text-xs text-gray-500 -mt-1 hidden sm:block">Abg. Wilson Ipiales</div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-1 items-center">
            {updatedNavigation.map((item) => (
              <div key={item.name} className="relative">
                <button
                  onClick={() => item.submenu ? handleDropdownToggle(item.name) : navigate(item.href)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    item.current 
                      ? 'text-blue-600 bg-blue-50 shadow-sm' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <span className="hidden xl:inline">{item.icon}</span>
                  <span>{item.name}</span>
                  {item.submenu && (
                    <FaChevronDown className={`transition-transform duration-200 text-xs ${
                      activeDropdown === item.name ? 'rotate-180' : ''
                    }`} />
                  )}
                </button>
                {item.submenu && renderDesktopSubmenu(item.submenu, item.name)}
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
              {/* Search */}
              <form onSubmit={handleSearch} className="flex items-center">
                <button 
                  type="button" 
                  onClick={() => setIsSearchOpen(!isSearchOpen)} 
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  title="Buscar"
                >
                  <FaSearch className="h-4 w-4 text-gray-600" />
                </button>
                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.div 
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
                        className="w-40 sm:w-48 p-2 ml-2 rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                        autoFocus
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>

              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme} 
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                title="Cambiar tema"
              >
                {theme === "dark" ? 
                  <FaSun className="h-4 w-4 text-yellow-500" /> : 
                  <FaMoon className="h-4 w-4 text-gray-600" />
                }
              </button>

              {/* Notifications */}
              {isLoggedIn && (
                <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <FaBell className="h-4 w-4 text-gray-600" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </button>
              )}
              
              {/* Shopping Cart */}
              <div className="relative" ref={cartRef}>
                <button 
                  onClick={() => setIsCartOpen(prev => !prev)} 
                  className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
                  title="Carrito de compras"
                >
                  <FaShoppingCart className="h-4 w-4 text-gray-600" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 text-xs bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </button>
                
                <AnimatePresence>
                  {isCartOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }} 
                      animate={{ opacity: 1, y: 0, scale: 1 }} 
                      exit={{ opacity: 0, y: 10, scale: 0.95 }} 
                      className="absolute top-full right-0 mt-2 w-80 bg-white shadow-xl rounded-lg border border-gray-200 z-50"
                    >
                      <div className="p-4 border-b border-gray-200">
                        <h3 className="font-semibold text-gray-900">Tu Carrito ({itemCount})</h3>
                      </div>
                      {cart.length > 0 ? (
                        <>
                          <div className="p-4 max-h-64 overflow-y-auto">
                            {cart.map(item => (
                              <div key={item.id} className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
                                <div className="flex-grow">
                                  <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                  <p className="text-xs text-gray-500">${item.price.toFixed(2)} x {item.quantity}</p>
                                </div>
                                <button 
                                  onClick={() => removeFromCart(item.id)} 
                                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                  title="Eliminar"
                                >
                                  <FaTrash className="h-3 w-3"/>
                                </button>
                              </div>
                            ))}
                          </div>
                          <div className="p-4 border-t border-gray-200 bg-gray-50">
                            <div className="flex justify-between items-center mb-3">
                              <span className="font-semibold text-gray-900">Total:</span>
                              <span className="font-bold text-lg text-blue-600">${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="space-y-2">
                              <Link 
                                to="/checkout" 
                                onClick={() => setIsCartOpen(false)}
                                className="w-full block text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                              >
                                Proceder al Pago
                              </Link>
                              <Link 
                                to="/cart" 
                                onClick={() => setIsCartOpen(false)}
                                className="w-full block text-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                              >
                                Ver Carrito
                              </Link>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="p-8 text-center">
                          <FaShoppingCart className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                          <p className="text-gray-500 mb-4">Tu carrito está vacío</p>
                          <Link 
                            to="/shop" 
                            onClick={() => setIsCartOpen(false)}
                            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Explorar Tienda
                          </Link>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Menu */}
              <div className="relative hidden md:block" ref={accountRef}>
                <button 
                  onClick={() => setAccountOpen(!accountOpen)} 
                  className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  title="Mi cuenta"
                >
                  <FaUser className="h-4 w-4 text-gray-600" />
                  {isLoggedIn && <FaChevronDown className="h-3 w-3 text-gray-400" />}
                </button>
                
                <AnimatePresence>
                  {accountOpen && (
                    <motion.div 
                      initial={{opacity:0, y:-5, scale: 0.95}} 
                      animate={{opacity:1, y:0, scale: 1}} 
                      exit={{opacity:0, y:-5, scale: 0.95}} 
                      className="absolute top-full right-0 mt-2 bg-white shadow-xl rounded-lg w-64 py-2 z-50 border border-gray-200"
                    >
                      {userMenuItems[userRole].map((item, index) => (
                        <Link
                          key={index}
                          to={item.href}
                          onClick={() => {
                            setAccountOpen(false);
                            if (item.href === '/logout') {
                              localStorage.removeItem('authToken');
                              localStorage.removeItem('userRole');
                              setIsLoggedIn(false);
                              setUserRole('guest');
                            }
                          }}
                          className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
                            item.href === '/logout' ? 'text-red-600 border-t border-gray-200' : 'text-gray-700'
                          }`}
                        >
                          {item.icon}
                          <span className="font-medium">{item.name}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Quick Actions - Desktop */}
              <div className="hidden xl:flex items-center gap-1 ml-2">
                {quickActions.slice(0, 2).map((action, index) => (
                  <a
                    key={index}
                    href={action.href}
                    target={action.href.startsWith('http') ? '_blank' : '_self'}
                    rel={action.href.startsWith('http') ? 'noopener noreferrer' : ''}
                    className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg text-white ${action.color} hover:opacity-90 transition-opacity`}
                    title={action.name}
                  >
                    {action.icon}
                    <span className="ml-1 hidden 2xl:inline">{action.name}</span>
                  </a>
                ))}
              </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
              title="Menú"
            >
              {isMobileMenuOpen ? 
                <FaTimes className="h-5 w-5 text-gray-600" /> : 
                <FaBars className="h-5 w-5 text-gray-600" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {activeDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setActiveDropdown(null)}
        />
      )}

      {/* Mobile Navigation */}
      {renderMobileNav()}
    </nav>
  );
};

export default ComprehensiveNavbar;
