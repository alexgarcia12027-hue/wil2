import React, { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import GlassCard from '../3D/GlassCard';
import LottieAnimation, { ProfessionalAnimations } from '../3D/LottieAnimation';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const referralSchema = yup.object({
  email: yup.string().email('Email inválido').required('El email es requerido'),
  name: yup.string().required('El nombre es requerido').min(2, 'Mínimo 2 caracteres')
});

const ReferralSystem = () => {
  const { 
    user, 
    referrals, 
    referralEarnings, 
    addReferral 
  } = useUser();
  
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [referralStats, setReferralStats] = useState({
    totalReferrals: 0,
    activeReferrals: 0,
    totalEarnings: 0,
    pendingEarnings: 0
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(referralSchema)
  });

  useEffect(() => {
    calculateStats();
  }, [referrals]);

  const calculateStats = () => {
    const stats = {
      totalReferrals: referrals.length,
      activeReferrals: referrals.filter(r => r.status === 'active').length,
      totalEarnings: referrals.reduce((sum, r) => sum + (r.earnings || 0), 0),
      pendingEarnings: referrals.reduce((sum, r) => sum + (r.pendingEarnings || 0), 0)
    };
    setReferralStats(stats);
  };

  const onSubmit = async (data) => {
    try {
      await addReferral(data.email, data.name);
      reset();
      setShowInviteModal(false);
    } catch (error) {
      console.error('Error adding referral:', error);
    }
  };

  const copyReferralLink = () => {
    const referralLink = `${window.location.origin}/register?ref=${user?.referralCode}`;
    navigator.clipboard.writeText(referralLink);
    toast.success('Enlace copiado al portapapeles');
  };

  const shareOnSocial = (platform) => {
    const referralLink = `${window.location.origin}/register?ref=${user?.referralCode}`;
    const message = encodeURIComponent('¡Únete a los servicios legales profesionales del Abogado Wilson! Obtén consultas gratuitas con mi enlace de referido.');
    
    const urls = {
      whatsapp: `https://wa.me/?text=${message} ${referralLink}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${referralLink}`,
      twitter: `https://twitter.com/intent/tweet?text=${message}&url=${referralLink}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${referralLink}`
    };

    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  const ReferralCard = ({ referral }) => (
    <GlassCard className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            {referral.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 className="text-white font-medium">{referral.name}</h4>
            <p className="text-gray-300 text-sm">{referral.email}</p>
            <p className="text-gray-400 text-xs">
              Referido el {new Date(referral.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            referral.status === 'active' 
              ? 'bg-green-500/20 text-green-400'
              : referral.status === 'pending'
              ? 'bg-yellow-500/20 text-yellow-400'
              : 'bg-gray-500/20 text-gray-400'
          }`}>
            {referral.status === 'active' ? 'Activo' : 
             referral.status === 'pending' ? 'Pendiente' : 'Inactivo'}
          </div>
          {referral.earnings > 0 && (
            <p className="text-green-400 font-semibold mt-1">
              +${referral.earnings}
            </p>
          )}
        </div>
      </div>
    </GlassCard>
  );

  const InviteModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <GlassCard className="w-full max-w-md mx-4 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">Invitar Amigo</h3>
          <button
            onClick={() => setShowInviteModal(false)}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Nombre *
            </label>
            <input
              {...register('name')}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
              placeholder="Nombre del amigo"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email *
            </label>
            <input
              {...register('email')}
              type="email"
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
              placeholder="email@ejemplo.com"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 btn-3d glass-primary px-4 py-2 rounded-lg text-white font-medium"
            >
              Enviar Invitación
            </button>
            <button
              type="button"
              onClick={() => setShowInviteModal(false)}
              className="flex-1 btn-3d glass px-4 py-2 rounded-lg text-white border border-white/30"
            >
              Cancelar
            </button>
          </div>
        </form>
      </GlassCard>
    </div>
  );

  return (
    <div className="referral-system space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Sistema de Referidos</h2>
        <p className="text-gray-300">
          Invita amigos y gana recompensas por cada referido exitoso
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="p-4 text-center" glowColor="#667eea">
          <LottieAnimation
            animationData={ProfessionalAnimations.success}
            width={40}
            height={40}
            className="mx-auto mb-2"
          />
          <h3 className="text-2xl font-bold text-white">{referralStats.totalReferrals}</h3>
          <p className="text-gray-300 text-sm">Total Referidos</p>
        </GlassCard>

        <GlassCard className="p-4 text-center" glowColor="#10b981">
          <LottieAnimation
            animationData={ProfessionalAnimations.heart}
            width={40}
            height={40}
            className="mx-auto mb-2"
          />
          <h3 className="text-2xl font-bold text-white">{referralStats.activeReferrals}</h3>
          <p className="text-gray-300 text-sm">Referidos Activos</p>
        </GlassCard>

        <GlassCard className="p-4 text-center" glowColor="#f59e0b">
          <LottieAnimation
            animationData={ProfessionalAnimations.star}
            width={40}
            height={40}
            className="mx-auto mb-2"
          />
          <h3 className="text-2xl font-bold text-white">${referralStats.totalEarnings}</h3>
          <p className="text-gray-300 text-sm">Ganancias Totales</p>
        </GlassCard>

        <GlassCard className="p-4 text-center" glowColor="#8b5cf6">
          <LottieAnimation
            animationData={ProfessionalAnimations.info}
            width={40}
            height={40}
            className="mx-auto mb-2"
          />
          <h3 className="text-2xl font-bold text-white">${referralStats.pendingEarnings}</h3>
          <p className="text-gray-300 text-sm">Ganancias Pendientes</p>
        </GlassCard>
      </div>

      {/* Referral Link Section */}
      <GlassCard className="p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Tu Enlace de Referido</h3>
        
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            value={`${window.location.origin}/register?ref=${user?.referralCode || 'ABC123'}`}
            readOnly
            className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
          />
          <button
            onClick={copyReferralLink}
            className="btn-3d glass-primary px-4 py-2 rounded-lg text-white flex items-center gap-2"
          >
            <LottieAnimation
              animationData={ProfessionalAnimations.success}
              width={16}
              height={16}
              trigger="hover"
            />
            Copiar
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => shareOnSocial('whatsapp')}
            className="btn-3d glass px-4 py-2 rounded-lg text-white border border-green-500/30 hover:bg-green-500/20"
          >
            📱 WhatsApp
          </button>
          <button
            onClick={() => shareOnSocial('facebook')}
            className="btn-3d glass px-4 py-2 rounded-lg text-white border border-blue-500/30 hover:bg-blue-500/20"
          >
            📘 Facebook
          </button>
          <button
            onClick={() => shareOnSocial('twitter')}
            className="btn-3d glass px-4 py-2 rounded-lg text-white border border-blue-400/30 hover:bg-blue-400/20"
          >
            🐦 Twitter
          </button>
          <button
            onClick={() => shareOnSocial('linkedin')}
            className="btn-3d glass px-4 py-2 rounded-lg text-white border border-blue-600/30 hover:bg-blue-600/20"
          >
            💼 LinkedIn
          </button>
        </div>
      </GlassCard>

      {/* Actions */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowInviteModal(true)}
          className="btn-3d glass-primary px-8 py-3 rounded-lg text-white font-semibold text-lg flex items-center gap-2"
        >
          <LottieAnimation
            animationData={ProfessionalAnimations.arrow}
            width={24}
            height={24}
            trigger="hover"
          />
          Invitar Amigo
        </button>
      </div>

      {/* Referrals List */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Mis Referidos</h3>
        
        {referrals.length === 0 ? (
          <GlassCard className="p-8 text-center">
            <LottieAnimation
              animationData={ProfessionalAnimations.info}
              width={60}
              height={60}
              className="mx-auto mb-4"
            />
            <p className="text-white text-lg mb-2">Aún no tienes referidos</p>
            <p className="text-gray-300 text-sm">
              Invita a tus amigos y comienza a ganar recompensas
            </p>
          </GlassCard>
        ) : (
          <div className="space-y-3">
            {referrals.map(referral => (
              <ReferralCard key={referral.id} referral={referral} />
            ))}
          </div>
        )}
      </div>

      {/* How it Works */}
      <GlassCard className="p-6">
        <h3 className="text-xl font-semibold text-white mb-4">¿Cómo Funciona?</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-2">
              1
            </div>
            <h4 className="text-white font-medium mb-1">Invita</h4>
            <p className="text-gray-300 text-sm">
              Comparte tu enlace de referido con amigos y familiares
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-2">
              2
            </div>
            <h4 className="text-white font-medium mb-1">Se Registran</h4>
            <p className="text-gray-300 text-sm">
              Tus amigos se registran usando tu enlace de referido
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-2">
              3
            </div>
            <h4 className="text-white font-medium mb-1">Ganas</h4>
            <p className="text-gray-300 text-sm">
              Recibes créditos y comisiones por cada referido exitoso
            </p>
          </div>
        </div>
      </GlassCard>

      {showInviteModal && <InviteModal />}
    </div>
  );
};

export default ReferralSystem;
