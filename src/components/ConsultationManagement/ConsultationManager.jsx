import React, { useState } from 'react';
import { 
  FaUserMd, FaCalendarAlt, FaClock, FaVideo, FaMapMarkerAlt, 
  FaPhone, FaComments, FaCheckCircle, FaTimesCircle, 
  FaDollarSign, FaFileAlt, FaUser, FaFilter, FaPlus,
  FaEye, FaEdit, FaEnvelope
} from 'react-icons/fa';

const ConsultationManager = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [showModal, setShowModal] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  
  const [consultations, setConsultations] = useState([
    {
      id: 1,
      clientName: 'María García',
      clientEmail: 'maria@email.com',
      type: 'virtual',
      service: 'Derecho Laboral',
      date: '2024-01-15',
      time: '10:00',
      duration: 60,
      status: 'pending',
      price: 150,
      notes: 'Consulta sobre despido injustificado',
      urgency: 'high'
    },
    {
      id: 2,
      clientName: 'Carlos López',
      clientEmail: 'carlos@email.com',
      type: 'physical',
      service: 'Derecho Civil',
      date: '2024-01-16',
      time: '14:30',
      duration: 90,
      status: 'confirmed',
      price: 200,
      notes: 'Revisión de contrato de compraventa',
      urgency: 'medium'
    },
    {
      id: 3,
      clientName: 'Ana Silva',
      clientEmail: 'ana@email.com',
      type: 'virtual',
      service: 'Derecho Penal',
      date: '2024-01-14',
      time: '16:00',
      duration: 45,
      status: 'completed',
      price: 120,
      notes: 'Asesoría sobre proceso penal',
      urgency: 'low'
    }
  ]);

  const tabs = [
    { id: 'pending', name: 'Pendientes', count: consultations.filter(c => c.status === 'pending').length },
    { id: 'confirmed', name: 'Confirmadas', count: consultations.filter(c => c.status === 'confirmed').length },
    { id: 'completed', name: 'Completadas', count: consultations.filter(c => c.status === 'completed').length },
    { id: 'cancelled', name: 'Canceladas', count: consultations.filter(c => c.status === 'cancelled').length }
  ];

  const GlassCard = ({ children, className = '', hover = false }) => (
    <div className={`
      backdrop-blur-lg bg-white/20 border border-white/20 rounded-2xl shadow-xl
      ${hover ? 'hover:bg-white/30 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1' : ''}
      ${className}
    `}>
      {children}
    </div>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const ConsultationCard = ({ consultation }) => (
    <GlassCard hover className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
            {consultation.clientName.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{consultation.clientName}</h3>
            <p className="text-sm text-gray-600">{consultation.clientEmail}</p>
          </div>
        </div>
        <div className="text-right">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(consultation.status)}`}>
            {consultation.status}
          </span>
          <div className={`text-xs mt-1 ${getUrgencyColor(consultation.urgency)}`}>
            ● {consultation.urgency} prioridad
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FaFileAlt className="text-blue-600" />
          <span>{consultation.service}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          {consultation.type === 'virtual' ? (
            <FaVideo className="text-green-600" />
          ) : (
            <FaMapMarkerAlt className="text-purple-600" />
          )}
          <span>{consultation.type === 'virtual' ? 'Virtual' : 'Presencial'}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FaCalendarAlt className="text-orange-600" />
          <span>{consultation.date} - {consultation.time}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FaClock className="text-indigo-600" />
          <span>{consultation.duration} minutos</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FaDollarSign className="text-green-600" />
          <span className="font-semibold">${consultation.price}</span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-700 bg-white/20 p-3 rounded-lg">
          {consultation.notes}
        </p>
      </div>

      <div className="flex gap-2">
        <button 
          onClick={() => handleView(consultation)}
          className="flex-1 py-2 px-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <FaEye /> Ver
        </button>
        
        {consultation.status === 'pending' && (
          <>
            <button 
              onClick={() => updateStatus(consultation.id, 'confirmed')}
              className="py-2 px-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <FaCheckCircle />
            </button>
            <button 
              onClick={() => updateStatus(consultation.id, 'cancelled')}
              className="py-2 px-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <FaTimesCircle />
            </button>
          </>
        )}
        
        <button 
          onClick={() => contactClient(consultation)}
          className="py-2 px-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <FaEnvelope />
        </button>
      </div>
    </GlassCard>
  );

  const ConsultationModal = () => {
    if (!selectedConsultation) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedConsultation(null)}></div>
        <div className="relative backdrop-blur-lg bg-white/20 border border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Detalles de Consulta</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                <p className="text-lg font-semibold text-gray-800">{selectedConsultation.clientName}</p>
                <p className="text-sm text-gray-600">{selectedConsultation.clientEmail}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Servicio</label>
                <p className="text-gray-800">{selectedConsultation.service}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                <p className="text-gray-800 capitalize">{selectedConsultation.type}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha y Hora</label>
                <p className="text-gray-800">{selectedConsultation.date} - {selectedConsultation.time}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duración</label>
                <p className="text-gray-800">{selectedConsultation.duration} minutos</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                <p className="text-2xl font-bold text-green-600">${selectedConsultation.price}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
            <div className="bg-white/20 p-4 rounded-lg">
              <p className="text-gray-800">{selectedConsultation.notes}</p>
            </div>
          </div>
          
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setSelectedConsultation(null)}
              className="flex-1 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cerrar
            </button>
            
            {selectedConsultation.type === 'virtual' && selectedConsultation.status === 'confirmed' && (
              <button className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                <FaVideo /> Iniciar Videollamada
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const updateStatus = (id, newStatus) => {
    setConsultations(consultations.map(c => 
      c.id === id ? { ...c, status: newStatus } : c
    ));
  };

  const handleView = (consultation) => {
    setSelectedConsultation(consultation);
  };

  const contactClient = (consultation) => {
    // Simulate opening email client
    window.open(`mailto:${consultation.clientEmail}?subject=Consulta Legal - ${consultation.service}`);
  };

  const filteredConsultations = consultations.filter(c => c.status === activeTab);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Gestión de Consultas
        </h2>
        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
          <FaPlus /> Nueva Consulta
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Consultas</p>
              <p className="text-2xl font-bold text-blue-600">{consultations.length}</p>
            </div>
            <FaUserMd className="text-3xl text-blue-600 opacity-80" />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pendientes</p>
              <p className="text-2xl font-bold text-yellow-600">
                {consultations.filter(c => c.status === 'pending').length}
              </p>
            </div>
            <FaClock className="text-3xl text-yellow-600 opacity-80" />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Virtuales Hoy</p>
              <p className="text-2xl font-bold text-green-600">
                {consultations.filter(c => c.type === 'virtual' && c.date === '2024-01-15').length}
              </p>
            </div>
            <FaVideo className="text-3xl text-green-600 opacity-80" />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Ingresos Mes</p>
              <p className="text-2xl font-bold text-purple-600">
                ${consultations.filter(c => c.status === 'completed').reduce((sum, c) => sum + c.price, 0)}
              </p>
            </div>
            <FaDollarSign className="text-3xl text-purple-600 opacity-80" />
          </div>
        </GlassCard>
      </div>

      {/* Tabs */}
      <GlassCard className="p-6">
        <div className="flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-700 shadow-lg transform scale-105'
                  : 'bg-white/50 text-gray-600 hover:bg-white/70'
              }`}
            >
              <span>{tab.name}</span>
              <span className="bg-white/50 px-2 py-1 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Consultations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConsultations.map((consultation) => (
          <ConsultationCard key={consultation.id} consultation={consultation} />
        ))}
      </div>

      {filteredConsultations.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl text-gray-400 mb-4">📅</div>
          <p className="text-xl text-gray-600">No hay consultas {activeTab}</p>
          <p className="text-gray-500 mt-2">Las consultas aparecerán aquí</p>
        </div>
      )}

      {/* Modal */}
      <ConsultationModal />

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ConsultationManager;
