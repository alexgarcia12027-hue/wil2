import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';

// Layout Components
import ComprehensiveNavbar from './components/Navigation/ComprehensiveNavbar';
import Footer from './components/Footer';
import ScrollEffects from './components/ScrollEffects';
import CursorFollower from './components/3D/CursorFollower';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import ProfessionalServices from './pages/ProfessionalServices';
import ComprehensiveShop from './pages/ComprehensiveShop';
import Courses from './pages/Courses';
import ProfessionalBlog from './pages/ProfessionalBlog';
import ProfessionalDashboard from './pages/ProfessionalDashboard';
import ComprehensiveAdminDashboard from './pages/ComprehensiveAdminDashboard';
import ComprehensiveAdminPanel from './pages/ComprehensiveAdminPanel';
import SimpleWebsiteBuilder from './pages/SimpleWebsiteBuilder';
import ComprehensiveClientDashboard from './pages/ComprehensiveClientDashboard';
import ProfessionalAdminDashboard from './pages/ProfessionalAdminDashboard';
import PaymentSystem from './pages/PaymentSystem';
import NotFound from './pages/NotFound';
import ComprehensiveForum from './pages/ComprehensiveForum';
import ProductsPage from './pages/ProductsPage';

// Services Pages
import Servicios from "./pages/Servicios";
import LaboralPage from "./pages/Laboral";
import Penal from "./components/Services/Penal";
import Civil from "./components/Services/Civil";
import Comercial from "./components/Services/Comercial";
import Transito from "./components/Services/Transito";
import Familia from "./components/Services/Familia";
import Aduanero from './components/Services/Aduanero';
import Laboral from './components/Services/Laboral';
import Seguridad from './components/Seguridad';

// Components
import SubscriptionPlans from './components/Subscription/SubscriptionPlans';
import JudicialSearch from './components/JudicialSearch/JudicialSearch';
import ShoppingCart from './components/Cart/ShoppingCart';
import BookingCalendar from './components/Calendar/BookingCalendar';
import CheckoutSystem from './components/Payment/CheckoutSystem';
import LoadingPage from './components/LoadingPage';

// Auth & Context
import { AuthProvider } from './components/Auth/AuthSystem';
import AuthModal from './components/Auth/AuthSystem';
import { CartProvider } from './context/CartContext';

function App() {
  const [loading, setLoading] = useState(false);
  const [appReady, setAppReady] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login');

  useEffect(() => {
    // Initialize app systems
    const initializeApp = async () => {
      try {
        // Check authentication
        const token = localStorage.getItem('authToken');
        if (token) {
          // Validate token if needed
        }

        // Initialize theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);

        // Load user preferences
        const userPrefs = JSON.parse(localStorage.getItem('userPreferences') || '{}');
        
        // Initialize cart
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        
        // App is ready
        setAppReady(true);
      } catch (error) {
        console.error('App initialization error:', error);
        setAppReady(true); // Continue anyway
      }
    };

    initializeApp();
  }, []);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  if (loading) {
    return <LoadingPage onComplete={handleLoadingComplete} />;
  }

  return (
    <HelmetProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="App min-h-screen bg-gray-50">
              <CursorFollower />
              <ScrollEffects>
                <ComprehensiveNavbar />
                
                <main>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<ProfessionalServices />} />
                    <Route path="/shop" element={<ComprehensiveShop />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/blog" element={<ProfessionalBlog />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/dashboard" element={<ComprehensiveClientDashboard />} />
                    <Route path="/client-dashboard" element={<ComprehensiveClientDashboard />} />
                    <Route path="/admin" element={<ProfessionalAdminDashboard />} />
                    <Route path="/admin-panel" element={<ComprehensiveAdminPanel />} />
                    <Route path="/admin-dashboard" element={<ComprehensiveAdminDashboard />} />
                    <Route path="/forum" element={<ComprehensiveForum />} />
                    <Route path="/payment" element={<PaymentSystem />} />
                    
                    {/* Servicios Routes */}
                    <Route path="/servicios" element={<Servicios />} />
                    <Route path="/servicios/penal" element={<Penal />} />
                    <Route path="/servicios/civil" element={<Civil />} />
                    <Route path="/servicios/comercial" element={<Comercial />} />
                    <Route path="/servicios/transito" element={<Transito />} />
                    <Route path="/servicios/familia" element={<Familia />} />
                    <Route path="/servicios/laboral" element={<LaboralPage />} />
                    <Route path="/servicios/aduanero" element={<Aduanero />} />
                    <Route path="/servicios/seguridad" element={<Seguridad />} />
                    
                    {/* New Routes */}
                    <Route path="/productos" element={<ProductsPage />} />
                    <Route path="/ebooks" element={<ProductsPage />} />
                    <Route path="/planes" element={<SubscriptionPlans />} />
                    <Route path="/consulta-procesos" element={<JudicialSearch />} />
                    <Route path="/suscripciones" element={<SubscriptionPlans />} />
                    <Route path="/agendar" element={<BookingCalendar />} />
                    
                    {/* Admin Tools */}
                    <Route path="/admin/website-builder" element={<SimpleWebsiteBuilder />} />
                    <Route path="/website-builder" element={<SimpleWebsiteBuilder />} />
                    
                    {/* Payment and Cart */}
                    <Route path="/cart" element={<ShoppingCart />} />
                    <Route path="/checkout" element={<CheckoutSystem />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                
                <Footer />
              </ScrollEffects>
              
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#363636',
                    color: '#fff',
                  },
                }}
              />
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
