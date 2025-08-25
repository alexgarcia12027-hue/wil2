import React, { useState, useEffect } from 'react';
import { FaUsers, FaDollarSign, FaChartLine, FaLink, FaCopy, FaEye, FaDownload, FaCalendarAlt, FaPercent, FaGift } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { dataService, analyticsService } from '../../services/apiService';

const AffiliateSystem = ({ userId }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [affiliateData, setAffiliateData] = useState({
    referralCode: '',
    totalReferrals: 0,
    activeReferrals: 0,
    totalCommissions: 0,
    pendingCommissions: 0,
    paidCommissions: 0,
    conversionRate: 0,
    tier: 'Bronze'
  });
  const [referrals, setReferrals] = useState([]);
  const [commissions, setCommissions] = useState([]);
  const [payouts, setPayouts] = useState([]);
  const [marketingMaterials, setMarketingMaterials] = useState([]);

  const commissionTiers = [
    { name: 'Bronze', minReferrals: 0, rate: 0.10, color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { name: 'Silver', minReferrals: 10, rate: 0.15, color: 'text-gray-600', bgColor: 'bg-gray-50' },
    { name: 'Gold', minReferrals: 25, rate: 0.20, color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
    { name: 'Platinum', minReferrals: 50, rate: 0.25, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { name: 'Diamond', minReferrals: 100, rate: 0.30, color: 'text-blue-600', bgColor: 'bg-blue-50' }
  ];

  useEffect(() => {
    loadAffiliateData();
    loadReferrals();
    loadCommissions();
    loadPayouts();
    loadMarketingMaterials();
  }, [userId]);

  const loadAffiliateData = async () => {
    setLoading(true);
    try {
      const response = await dataService.getById('affiliates', userId);
      if (response.data) {
        setAffiliateData(response.data);
      } else {
        // Create new affiliate account
        await createAffiliateAccount();
      }
    } catch (error) {
      console.error('Error loading affiliate data:', error);
    } finally {
      setLoading(false);
    }
  };

  const createAffiliateAccount = async () => {
    try {
      const newAffiliate = {
        userId,
        referralCode: generateReferralCode(),
        totalReferrals: 0,
        activeReferrals: 0,
        totalCommissions: 0,
        pendingCommissions: 0,
        paidCommissions: 0,
        conversionRate: 0,
        tier: 'Bronze',
        createdAt: new Date().toISOString()
      };

      const response = await dataService.create('affiliates', newAffiliate);
      if (response.data) {
        setAffiliateData(response.data);
        toast.success('¡Cuenta de afiliado creada exitosamente!');
      }
    } catch (error) {
      console.error('Error creating affiliate account:', error);
      toast.error('Error al crear cuenta de afiliado');
    }
  };

  const generateReferralCode = () => {
    return 'REF-' + Math.random().toString(36).substr(2, 8).toUpperCase();
  };

  const loadReferrals = async () => {
    try {
      const response = await dataService.getAll(`referrals/affiliate/${userId}`);
      if (response.data) {
        setReferrals(response.data);
      }
    } catch (error) {
      console.error('Error loading referrals:', error);
    }
  };

  const loadCommissions = async () => {
    try {
      const response = await dataService.getAll(`commissions/affiliate/${userId}`);
      if (response.data) {
        setCommissions(response.data);
      }
    } catch (error) {
      console.error('Error loading commissions:', error);
    }
  };

  const loadPayouts = async () => {
    try {
      const response = await dataService.getAll(`payouts/affiliate/${userId}`);
      if (response.data) {
        setPayouts(response.data);
      }
    } catch (error) {
      console.error('Error loading payouts:', error);
    }
  };

  const loadMarketingMaterials = async () => {
    try {
      const response = await dataService.getAll('marketing-materials');
      if (response.data) {
        setMarketingMaterials(response.data);
      }
    } catch (error) {
      console.error('Error loading marketing materials:', error);
    }
  };

  const copyReferralLink = () => {
    const referralLink = `${window.location.origin}/register?ref=${affiliateData.referralCode}`;
    navigator.clipboard.writeText(referralLink);
    toast.success('Enlace copiado al portapapeles');
  };

  const requestPayout = async () => {
    if (affiliateData.pendingCommissions < 50) {
      toast.error('Mínimo $50 para solicitar pago');
      return;
    }

    try {
      const payoutRequest = {
        affiliateId: userId,
        amount: affiliateData.pendingCommissions,
        status: 'pending',
        requestedAt: new Date().toISOString()
      };

      await dataService.create('payout-requests', payoutRequest);
      toast.success('Solicitud de pago enviada');
      
      await analyticsService.trackEvent('payout_requested', {
        affiliateId: userId,
        amount: affiliateData.pendingCommissions,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Error requesting payout:', error);
      toast.error('Error al solicitar pago');
    }
  };

  const getCurrentTier = () => {
    return commissionTiers.find(tier => 
      affiliateData.totalReferrals >= tier.minReferrals
    ) || commissionTiers[0];
  };

  const getNextTier = () => {
    const currentTier = getCurrentTier();
    const currentIndex = commissionTiers.findIndex(tier => tier.name === currentTier.name);
    return commissionTiers[currentIndex + 1] || null;
  };

  const DashboardTab = () => {
    const currentTier = getCurrentTier();
    const nextTier = getNextTier();

    return (
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Referidos</p>
                <p className="text-3xl font-bold text-blue-600">{affiliateData.totalReferrals}</p>
              </div>
              <FaUsers className="text-blue-600 text-2xl" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Comisiones Totales</p>
                <p className="text-3xl font-bold text-green-600">${affiliateData.totalCommissions}</p>
              </div>
              <FaDollarSign className="text-green-600 text-2xl" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pendientes</p>
                <p className="text-3xl font-bold text-yellow-600">${affiliateData.pendingCommissions}</p>
              </div>
              <FaCalendarAlt className="text-yellow-600 text-2xl" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tasa Conversión</p>
                <p className="text-3xl font-bold text-purple-600">{affiliateData.conversionRate}%</p>
              </div>
              <FaChartLine className="text-purple-600 text-2xl" />
            </div>
          </div>
        </div>

        {/* Tier Status */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold mb-4">Estado del Nivel</h3>
          <div className="flex items-center justify-between mb-4">
            <div className={`px-4 py-2 rounded-full ${currentTier.bgColor}`}>
              <span className={`font-bold ${currentTier.color}`}>{currentTier.name}</span>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Comisión actual</p>
              <p className="text-xl font-bold text-green-600">{(currentTier.rate * 100)}%</p>
            </div>
          </div>
          
          {nextTier && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Progreso al siguiente nivel ({nextTier.name})</span>
                <span className="text-sm text-gray-600">
                  {affiliateData.totalReferrals}/{nextTier.minReferrals}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((affiliateData.totalReferrals / nextTier.minReferrals) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {nextTier.minReferrals - affiliateData.totalReferrals} referidos más para {(nextTier.rate * 100)}% de comisión
              </p>
            </div>
          )}
        </div>

        {/* Referral Link */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold mb-4">Tu Enlace de Referido</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={`${window.location.origin}/register?ref=${affiliateData.referralCode}`}
              readOnly
              className="flex-1 p-3 border border-gray-300 rounded-lg bg-gray-50"
            />
            <button
              onClick={copyReferralLink}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <FaCopy /> Copiar
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Comparte este enlace y gana {(currentTier.rate * 100)}% de comisión por cada venta
          </p>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold mb-4">Acciones Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={requestPayout}
              disabled={affiliateData.pendingCommissions < 50}
              className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaDollarSign className="mx-auto mb-2 text-xl" />
              <p className="font-medium">Solicitar Pago</p>
              <p className="text-sm opacity-90">Mínimo $50</p>
            </button>
            
            <button
              onClick={() => setActiveTab('materials')}
              className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <FaGift className="mx-auto mb-2 text-xl" />
              <p className="font-medium">Material Marketing</p>
              <p className="text-sm opacity-90">Banners y enlaces</p>
            </button>
            
            <button
              onClick={() => setActiveTab('analytics')}
              className="bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <FaChartLine className="mx-auto mb-2 text-xl" />
              <p className="font-medium">Ver Analíticas</p>
              <p className="text-sm opacity-90">Rendimiento detallado</p>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ReferralsTab = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 border-b">
        <h3 className="text-lg font-bold">Mis Referidos</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha Registro</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Compras</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Comisión Ganada</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {referrals.map(referral => (
              <tr key={referral.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <p className="font-medium text-gray-900">{referral.userName}</p>
                    <p className="text-sm text-gray-500">{referral.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(referral.registeredAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    referral.status === 'active' ? 'bg-green-100 text-green-800' :
                    referral.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {referral.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {referral.totalPurchases}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                  ${referral.commissionEarned}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const CommissionsTab = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 border-b">
        <h3 className="text-lg font-bold">Historial de Comisiones</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Referido</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Venta</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Comisión</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {commissions.map(commission => (
              <tr key={commission.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(commission.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {commission.referralName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {commission.productName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${commission.saleAmount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                  ${commission.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    commission.status === 'paid' ? 'bg-green-100 text-green-800' :
                    commission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {commission.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const MaterialsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold mb-4">Material de Marketing</h3>
        <p className="text-gray-600 mb-6">
          Utiliza estos materiales para promocionar nuestros servicios y maximizar tus comisiones.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketingMaterials.map(material => (
            <div key={material.id} className="border border-gray-200 rounded-lg p-4">
              <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <img 
                  src={material.previewUrl} 
                  alt={material.name}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.target.src = '/images/placeholder-banner.jpg';
                  }}
                />
              </div>
              <h4 className="font-medium mb-2">{material.name}</h4>
              <p className="text-sm text-gray-600 mb-4">{material.description}</p>
              <div className="flex gap-2">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  <FaDownload className="inline mr-2" />
                  Descargar
                </button>
                <button className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors text-sm">
                  <FaEye />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sistema de Afiliados</h1>
        <p className="text-gray-600">Gana dinero refiriendo nuevos clientes</p>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8">
        <nav className="flex space-x-8">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: FaChartLine },
            { id: 'referrals', name: 'Referidos', icon: FaUsers },
            { id: 'commissions', name: 'Comisiones', icon: FaDollarSign },
            { id: 'materials', name: 'Material', icon: FaGift }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-2 px-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'dashboard' && <DashboardTab />}
      {activeTab === 'referrals' && <ReferralsTab />}
      {activeTab === 'commissions' && <CommissionsTab />}
      {activeTab === 'materials' && <MaterialsTab />}
    </div>
  );
};

export default AffiliateSystem;
