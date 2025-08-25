import React, { useState, createContext, useContext } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaShieldAlt } from 'react-icons/fa';

// Auth Context
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email, password, rememberMe = false) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = {
      id: 1,
      email,
      name: email.split('@')[0],
      role: email.includes('admin') ? 'admin' : 'client',
      avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`,
      permissions: email.includes('admin') ? ['all'] : ['read', 'purchase']
    };

    setUser(mockUser);
    setIsAuthenticated(true);
    
    if (rememberMe) {
      localStorage.setItem('authUser', JSON.stringify(mockUser));
    }
    
    return mockUser;
  };

  const register = async (userData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newUser = {
      id: Date.now(),
      ...userData,
      role: 'client',
      avatar: `https://ui-avatars.com/api/?name=${userData.name}&background=random`,
      permissions: ['read', 'purchase']
    };

    setUser(newUser);
    setIsAuthenticated(true);
    
    return newUser;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authUser');
  };

  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthModal = ({ isOpen, onClose, mode = 'login' }) => {
  const [currentMode, setCurrentMode] = useState(mode);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (currentMode === 'login') {
        await login(formData.email, formData.password, rememberMe);
      } else {
        if (formData.password !== formData.confirmPassword) {
          alert('Las contraseñas no coinciden');
          return;
        }
        await register(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error de autenticación:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const GlassModal = ({ children }) => (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
      isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
    }`}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className={`relative backdrop-blur-lg bg-white/20 border border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 transform transition-all duration-300 ${
        isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-10'
      }`}>
        {children}
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <GlassModal>
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaShieldAlt className="text-white text-2xl" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {currentMode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
        </h2>
        <p className="text-gray-600">
          {currentMode === 'login' 
            ? 'Accede a tu cuenta para continuar' 
            : 'Únete a nuestra plataforma legal'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {currentMode === 'register' && (
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Nombre completo"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full pl-10 pr-4 py-3 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-sm"
            />
          </div>
        )}

        <div className="relative">
          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full pl-10 pr-4 py-3 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-sm"
          />
        </div>

        {currentMode === 'register' && (
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              name="phone"
              placeholder="Teléfono"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-sm"
            />
          </div>
        )}

        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="w-full pl-10 pr-12 py-3 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {currentMode === 'register' && (
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              className="w-full pl-10 pr-4 py-3 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-sm"
            />
          </div>
        )}

        {currentMode === 'login' && (
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2 rounded"
              />
              <span className="text-sm text-gray-600">Recordarme</span>
            </label>
            <button type="button" className="text-sm text-blue-600 hover:text-blue-700">
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
        >
          {loading ? 'Procesando...' : (currentMode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta')}
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300/50"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white/50 text-gray-500">O continúa con</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center px-4 py-2 bg-white/50 border border-white/30 rounded-lg hover:bg-white/70 transition-colors"
          >
            <FaGoogle className="text-red-500 mr-2" />
            Google
          </button>
          <button
            type="button"
            className="flex items-center justify-center px-4 py-2 bg-white/50 border border-white/30 rounded-lg hover:bg-white/70 transition-colors"
          >
            <FaFacebook className="text-blue-600 mr-2" />
            Facebook
          </button>
        </div>

        <div className="text-center mt-6">
          <span className="text-gray-600">
            {currentMode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
          </span>
          <button
            type="button"
            onClick={() => setCurrentMode(currentMode === 'login' ? 'register' : 'login')}
            className="ml-2 text-blue-600 hover:text-blue-700 font-semibold"
          >
            {currentMode === 'login' ? 'Regístrate' : 'Inicia sesión'}
          </button>
        </div>
      </form>
    </GlassModal>
  );
};

export default AuthModal;
