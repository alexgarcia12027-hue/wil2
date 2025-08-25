import React, { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import GlassCard from '../3D/GlassCard';
import LottieAnimation, { ProfessionalAnimations } from '../3D/LottieAnimation';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';

const TokenManager = () => {
  const { 
    user, 
    credits, 
    tokens, 
    purchaseCredits, 
    purchaseTokens,
    loading 
  } = useUser();

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState([]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const tokenPackages = [
    {
      id: 'basic',
      name: 'Paquete Básico',
      tokens: 10,
      credits: 5,
      price: 25,
      description: 'Ideal para consultas ocasionales',
      features: ['10 Tokens', '5 Créditos', 'Consultas básicas', 'Soporte por email'],
      popular: false
    },
    {
      id: 'professional',
      name: 'Paquete Profesional',
      tokens: 25,
      credits: 15,
      price: 50,
      originalPrice: 65,
      description: 'Perfecto para uso regular',
      features: ['25 Tokens', '15 Créditos', 'Consultas avanzadas', 'Soporte prioritario', 'Documentos legales'],
      popular: true
    },
    {
      id: 'premium',
      name: 'Paquete Premium',
      tokens: 50,
      credits: 30,
      price: 90,
      originalPrice: 120,
      description: 'Para usuarios intensivos',
      features: ['50 Tokens', '30 Créditos', 'Consultas ilimitadas', 'Soporte 24/7', 'Documentos premium', 'Asesoría personalizada'],
      popular: false
    },
    {
      id: 'enterprise',
      name: 'Paquete Empresarial',
      tokens: 100,
      credits: 60,
      price: 150,
      originalPrice: 200,
      description: 'Para empresas y despachos',
      features: ['100 Tokens', '60 Créditos', 'Consultas empresariales', 'Soporte dedicado', 'API Access', 'Reportes avanzados'],
      popular: false
    }
  ];

  const servicesCosts = [
    { name: 'Consulta IA Básica', cost: '1 Token', description: 'Respuestas automáticas a preguntas legales' },
    { name: 'Consulta IA Avanzada', cost: '2 Tokens', description: 'Análisis detallado con referencias legales' },
    { name: 'Revisión de Documento', cost: '3 Tokens', description: 'Análisis completo de contratos y documentos' },
    { name: 'Consulta Personal', cost: '1 Crédito', description: 'Videollamada con el abogado (30 min)' },
    { name: 'Consulta Presencial', cost: '2 Créditos', description: 'Cita en oficina (1 hora)' },
    { name: 'Representación Legal', cost: '5 Créditos', description: 'Representación en procesos legales' }
  ];

  useEffect(() => {
    loadTransactionHistory();
  }, []);

  const loadTransactionHistory = async () => {
    // Mock transaction history - replace with actual API call
    const mockHistory = [
      {
        id: 1,
        type: 'purchase',
        description: 'Compra Paquete Profesional',
        amount: 25,
        tokens: 25,
        credits: 15,
        date: new Date(Date.now() - 86400000),
        status: 'completed'
      },
      {
        id: 2,
        type: 'usage',
        description: 'Consulta IA Avanzada',
        amount: -2,
        tokens: -2,
        credits: 0,
        date: new Date(Date.now() - 43200000),
        status: 'completed'
      }
    ];
    setTransactionHistory(mockHistory);
  };

  const handlePurchase = async (data) => {
    if (!selectedPackage) return;

    try {
      if (data.purchaseType === 'tokens') {
        await purchaseTokens(selectedPackage.tokens, paymentMethod);
      } else {
        await purchaseCredits(selectedPackage.credits, paymentMethod);
      }
      
      setShowPurchaseModal(false);
      setSelectedPackage(null);
      reset();
      loadTransactionHistory();
    } catch (error) {
      console.error('Error purchasing package:', error);
    }
  };

  const PackageCard = ({ pkg }) => (
    <GlassCard 
      className={`p-6 relative ${pkg.popular ? 'ring-2 ring-yellow-400' : ''}`}
      glowColor={pkg.popular ? '#f59e0b' : '#667eea'}
      enableTilt={true}
      enableGlow={pkg.popular}
    >
      {pkg.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-bold">
            MÁS POPULAR
          </span>
        </div>
      )}

      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
        <p className="text-gray-300 text-sm mb-4">{pkg.description}</p>
        
        <div className="mb-4">
          {pkg.originalPrice && (
            <span className="text-gray-400 text-lg line-through mr-2">
              ${pkg.originalPrice}
            </span>
          )}
          <span className="text-3xl font-bold text-white">${pkg.price}</span>
        </div>

        {pkg.originalPrice && (
          <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs inline-block mb-4">
            Ahorra ${pkg.originalPrice - pkg.price}
          </div>
        )}
      </div>

      <div className="space-y-2 mb-6">
        {pkg.features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2">
            <LottieAnimation
              animationData={ProfessionalAnimations.success}
              width={16}
              height={16}
              className="text-green-400"
            />
            <span className="text-gray-300 text-sm">{feature}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          setSelectedPackage(pkg);
          setShowPurchaseModal(true);
        }}
        className={`w-full btn-3d px-4 py-3 rounded-lg font-semibold ${
          pkg.popular 
            ? 'glass-primary text-white' 
            : 'glass border border-white/30 text-white'
        }`}
      >
        Comprar Paquete
      </button>
    </GlassCard>
  );

  const PurchaseModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <GlassCard className="w-full max-w-md mx-4 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">
            Comprar {selectedPackage?.name}
          </h3>
          <button
            onClick={() => setShowPurchaseModal(false)}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(handlePurchase)} className="space-y-4">
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300">Tokens:</span>
              <span className="text-white font-semibold">{selectedPackage?.tokens}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300">Créditos:</span>
              <span className="text-white font-semibold">{selectedPackage?.credits}</span>
            </div>
            <div className="border-t border-white/10 pt-2">
              <div className="flex justify-between items-center">
                <span className="text-white font-semibold">Total:</span>
                <span className="text-xl font-bold text-white">${selectedPackage?.price}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tipo de Compra
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  {...register('purchaseType')}
                  type="radio"
                  value="both"
                  defaultChecked
                  className="text-blue-500"
                />
                <span className="text-white">Tokens + Créditos (Paquete Completo)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  {...register('purchaseType')}
                  type="radio"
                  value="tokens"
                  className="text-blue-500"
                />
                <span className="text-white">Solo Tokens</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  {...register('purchaseType')}
                  type="radio"
                  value="credits"
                  className="text-blue-500"
                />
                <span className="text-white">Solo Créditos</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Método de Pago
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
            >
              <option value="card">💳 Tarjeta de Crédito</option>
              <option value="paypal">🅿️ PayPal</option>
              <option value="crypto">₿ Criptomonedas</option>
              <option value="bank">🏦 Transferencia Bancaria</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-3d glass-primary px-4 py-2 rounded-lg text-white font-medium flex items-center justify-center gap-2"
            >
              {loading ? (
                <LottieAnimation
                  animationData={ProfessionalAnimations.loading}
                  width={20}
                  height={20}
                  autoplay={true}
                />
              ) : (
                <LottieAnimation
                  animationData={ProfessionalAnimations.success}
                  width={20}
                  height={20}
                  trigger="hover"
                />
              )}
              {loading ? 'Procesando...' : 'Confirmar Compra'}
            </button>
            <button
              type="button"
              onClick={() => setShowPurchaseModal(false)}
              className="btn-3d glass px-4 py-2 rounded-lg text-white border border-white/30"
            >
              Cancelar
            </button>
          </div>
        </form>
      </GlassCard>
    </div>
  );

  return (
    <div className="token-manager space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Gestión de Tokens y Créditos</h2>
        <p className="text-gray-300">
          Administra tus tokens para consultas IA y créditos para servicios personalizados
        </p>
      </div>

      {/* Current Balance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="p-6 text-center" glowColor="#667eea">
          <LottieAnimation
            animationData={ProfessionalAnimations.star}
            width={50}
            height={50}
            className="mx-auto mb-3"
          />
          <h3 className="text-2xl font-bold text-white mb-1">{tokens}</h3>
          <p className="text-gray-300">Tokens Disponibles</p>
          <p className="text-xs text-gray-400 mt-2">Para consultas IA y análisis automáticos</p>
        </GlassCard>

        <GlassCard className="p-6 text-center" glowColor="#10b981">
          <LottieAnimation
            animationData={ProfessionalAnimations.heart}
            width={50}
            height={50}
            className="mx-auto mb-3"
          />
          <h3 className="text-2xl font-bold text-white mb-1">{credits}</h3>
          <p className="text-gray-300">Créditos Disponibles</p>
          <p className="text-xs text-gray-400 mt-2">Para consultas personalizadas y servicios</p>
        </GlassCard>
      </div>

      {/* Service Costs */}
      <GlassCard className="p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Costos de Servicios</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {servicesCosts.map((service, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <div>
                <h4 className="text-white font-medium">{service.name}</h4>
                <p className="text-gray-400 text-sm">{service.description}</p>
              </div>
              <span className="text-yellow-400 font-semibold">{service.cost}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Token Packages */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-6 text-center">Paquetes Disponibles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tokenPackages.map(pkg => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <GlassCard className="p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Historial de Transacciones</h3>
        
        {transactionHistory.length === 0 ? (
          <div className="text-center py-8">
            <LottieAnimation
              animationData={ProfessionalAnimations.info}
              width={60}
              height={60}
              className="mx-auto mb-4"
            />
            <p className="text-gray-300">No hay transacciones aún</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactionHistory.map(transaction => (
              <div key={transaction.id} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <div>
                  <h4 className="text-white font-medium">{transaction.description}</h4>
                  <p className="text-gray-400 text-sm">
                    {transaction.date.toLocaleDateString()} - {transaction.date.toLocaleTimeString()}
                  </p>
                </div>
                <div className="text-right">
                  <div className={`font-semibold ${
                    transaction.type === 'purchase' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {transaction.type === 'purchase' ? '+' : ''}{transaction.tokens} Tokens
                  </div>
                  {transaction.credits !== 0 && (
                    <div className={`text-sm ${
                      transaction.type === 'purchase' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {transaction.type === 'purchase' ? '+' : ''}{transaction.credits} Créditos
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </GlassCard>

      {showPurchaseModal && <PurchaseModal />}
    </div>
  );
};

export default TokenManager;
