import React, { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import { useEcommerce } from '../../contexts/EcommerceContext';
import GlassCard from '../3D/GlassCard';
import LottieAnimation, { ProfessionalAnimations } from '../3D/LottieAnimation';
import AppointmentCalendar from '../Calendar/AppointmentCalendar';
import ProductCatalog from '../Ecommerce/ProductCatalog';
import ShoppingCart from '../Ecommerce/ShoppingCart';
import BlogManager from '../Blog/BlogManager';
import ReferralSystem from '../Referrals/ReferralSystem';
import TokenManager from '../TokenSystem/TokenManager';
import PWAInstaller from '../PWA/PWAInstaller';

const ComprehensiveDashboard = ({ userRole = 'client' }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showCart, setShowCart] = useState(false);
  
  const { 
    user, 
    credits, 
    tokens, 
    consultations, 
    appointments, 
    purchases, 
    referrals,
    notifications,
    unreadNotifications
  } = useUser();
  
  const { cartItemsCount } = useEcommerce();

  const dashboardTabs = {
    client: [
      { id: 'overview', name: 'Resumen', icon: ProfessionalAnimations.info },
      { id: 'appointments', name: 'Citas', icon: ProfessionalAnimations.star },
      { id: 'consultations', name: 'Consultas', icon: ProfessionalAnimations.success },
      { id: 'tokens', name: 'Tokens', icon: ProfessionalAnimations.heart },
      { id: 'products', name: 'Productos', icon: ProfessionalAnimations.arrow },
      { id: 'referrals', name: 'Referidos', icon: ProfessionalAnimations.success },
      { id: 'profile', name: 'Perfil', icon: ProfessionalAnimations.info }
    ],
    admin: [
      { id: 'overview', name: 'Panel Admin', icon: ProfessionalAnimations.star },
      { id: 'users', name: 'Usuarios', icon: ProfessionalAnimations.success },
      { id: 'blog', name: 'Blog', icon: ProfessionalAnimations.info },
      { id: 'products', name: 'Productos', icon: ProfessionalAnimations.arrow },
      { id: 'appointments', name: 'Citas', icon: ProfessionalAnimations.star },
      { id: 'analytics', name: 'Analíticas', icon: ProfessionalAnimations.heart }
    ]
  };

  const currentTabs = dashboardTabs[userRole] || dashboardTabs.client;

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="p-4 text-center" glowColor="#667eea">
          <LottieAnimation
            animationData={ProfessionalAnimations.star}
            width={40}
            height={40}
            className="mx-auto mb-2"
          />
          <h3 className="text-2xl font-bold text-white">{tokens}</h3>
          <p className="text-gray-300 text-sm">Tokens</p>
        </GlassCard>

        <GlassCard className="p-4 text-center" glowColor="#10b981">
          <LottieAnimation
            animationData={ProfessionalAnimations.heart}
            width={40}
            height={40}
            className="mx-auto mb-2"
          />
          <h3 className="text-2xl font-bold text-white">{credits}</h3>
          <p className="text-gray-300 text-sm">Créditos</p>
        </GlassCard>

        <GlassCard className="p-4 text-center" glowColor="#f59e0b">
          <LottieAnimation
            animationData={ProfessionalAnimations.success}
            width={40}
            height={40}
            className="mx-auto mb-2"
          />
          <h3 className="text-2xl font-bold text-white">{consultations.length}</h3>
          <p className="text-gray-300 text-sm">Consultas</p>
        </GlassCard>

        <GlassCard className="p-4 text-center" glowColor="#8b5cf6">
          <LottieAnimation
            animationData={ProfessionalAnimations.info}
            width={40}
            height={40}
            className="mx-auto mb-2"
          />
          <h3 className="text-2xl font-bold text-white">{appointments.length}</h3>
          <p className="text-gray-300 text-sm">Citas</p>
        </GlassCard>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Actividad Reciente</h3>
          <div className="space-y-3">
            {consultations.slice(0, 5).map((consultation, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                <LottieAnimation
                  animationData={ProfessionalAnimations.success}
                  width={20}
                  height={20}
                />
                <div className="flex-1">
                  <p className="text-white text-sm">{consultation.title}</p>
                  <p className="text-gray-400 text-xs">{consultation.date}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Próximas Citas</h3>
          <div className="space-y-3">
            {appointments.slice(0, 5).map((appointment, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                <LottieAnimation
                  animationData={ProfessionalAnimations.star}
                  width={20}
                  height={20}
                />
                <div className="flex-1">
                  <p className="text-white text-sm">{appointment.title}</p>
                  <p className="text-gray-400 text-xs">{appointment.date}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Quick Actions */}
      <GlassCard className="p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setActiveTab('consultations')}
            className="btn-3d glass-primary p-4 rounded-lg text-white flex items-center gap-3"
          >
            <LottieAnimation
              animationData={ProfessionalAnimations.success}
              width={24}
              height={24}
              trigger="hover"
            />
            Nueva Consulta
          </button>
          
          <button
            onClick={() => setActiveTab('appointments')}
            className="btn-3d glass p-4 rounded-lg text-white border border-white/30 flex items-center gap-3"
          >
            <LottieAnimation
              animationData={ProfessionalAnimations.star}
              width={24}
              height={24}
              trigger="hover"
            />
            Agendar Cita
          </button>
          
          <button
            onClick={() => setActiveTab('tokens')}
            className="btn-3d glass p-4 rounded-lg text-white border border-white/30 flex items-center gap-3"
          >
            <LottieAnimation
              animationData={ProfessionalAnimations.heart}
              width={24}
              height={24}
              trigger="hover"
            />
            Comprar Tokens
          </button>
        </div>
      </GlassCard>
    </div>
  );

  const AppointmentsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Gestión de Citas</h2>
        <button className="btn-3d glass-primary px-4 py-2 rounded-lg text-white">
          Nueva Cita
        </button>
      </div>
      <AppointmentCalendar editable={true} height="600px" />
    </div>
  );

  const ConsultationsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Consultas IA</h2>
        <button className="btn-3d glass-primary px-4 py-2 rounded-lg text-white">
          Nueva Consulta
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {consultations.map((consultation, index) => (
          <GlassCard key={index} className="p-4">
            <h3 className="text-white font-semibold mb-2">{consultation.title}</h3>
            <p className="text-gray-300 text-sm mb-3">{consultation.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">{consultation.date}</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                consultation.status === 'completed' 
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {consultation.status}
              </span>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );

  const TokensTab = () => <TokenManager />;

  const ProductsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Productos y Servicios</h2>
        <button
          onClick={() => setShowCart(true)}
          className="btn-3d glass-primary px-4 py-2 rounded-lg text-white flex items-center gap-2"
        >
          🛒 Carrito ({cartItemsCount})
        </button>
      </div>
      <ProductCatalog />
    </div>
  );

  const ReferralsTab = () => <ReferralSystem />;

  const BlogTab = () => <BlogManager isAdmin={userRole === 'admin'} />;

  const ProfileTab = () => (
    <div className="space-y-6">
      <GlassCard className="p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Mi Perfil</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Nombre Completo
              </label>
              <input
                type="text"
                defaultValue={user?.name || ''}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                defaultValue={user?.email || ''}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                defaultValue={user?.phone || ''}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Dirección
              </label>
              <textarea
                rows={3}
                defaultValue={user?.address || ''}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Preferencias de Notificación
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-white text-sm">Email</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-white text-sm">SMS</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-white text-sm">Push Notifications</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 mt-6">
          <button className="btn-3d glass-primary px-6 py-2 rounded-lg text-white">
            Guardar Cambios
          </button>
          <button className="btn-3d glass px-6 py-2 rounded-lg text-white border border-white/30">
            Cancelar
          </button>
        </div>
      </GlassCard>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewTab />;
      case 'appointments': return <AppointmentsTab />;
      case 'consultations': return <ConsultationsTab />;
      case 'tokens': return <TokensTab />;
      case 'products': return <ProductsTab />;
      case 'referrals': return <ReferralsTab />;
      case 'blog': return <BlogTab />;
      case 'profile': return <ProfileTab />;
      default: return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen p-4">
          <GlassCard className="p-4 mb-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-xl font-bold">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <h3 className="text-white font-semibold">{user?.name || 'Usuario'}</h3>
              <p className="text-gray-300 text-sm">{user?.email || 'usuario@ejemplo.com'}</p>
              {unreadNotifications > 0 && (
                <div className="mt-2">
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                    {unreadNotifications} notificaciones
                  </span>
                </div>
              )}
            </div>
          </GlassCard>

          <nav className="space-y-2">
            {currentTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-white/20 text-white border border-white/30'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <LottieAnimation
                  animationData={tab.icon}
                  width={20}
                  height={20}
                  trigger={activeTab === tab.id ? 'load' : 'hover'}
                />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {renderTabContent()}
        </div>
      </div>

      {/* Shopping Cart Modal */}
      {showCart && (
        <ShoppingCart isModal={true} onClose={() => setShowCart(false)} />
      )}

      {/* PWA Installer */}
      <PWAInstaller />
    </div>
  );
};

export default ComprehensiveDashboard;
