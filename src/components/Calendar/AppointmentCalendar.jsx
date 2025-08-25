import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { toast } from 'react-hot-toast';
import { useUser } from '../../contexts/UserContext';
import { apiService } from '../../services/apiService';
import GlassCard from '../3D/GlassCard';
import LottieAnimation, { ProfessionalAnimations } from '../3D/LottieAnimation';

const AppointmentCalendar = ({ 
  editable = false, 
  selectable = true,
  onEventClick,
  onDateSelect,
  height = 'auto'
}) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const { user, scheduleAppointment } = useUser();

  useEffect(() => {
    loadEvents();
    loadAvailableSlots();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const appointments = await apiService.getUserAppointments();
      
      const formattedEvents = appointments.map(appointment => ({
        id: appointment.id,
        title: appointment.title || `Consulta - ${appointment.type}`,
        start: appointment.startDate,
        end: appointment.endDate,
        backgroundColor: getEventColor(appointment.status),
        borderColor: getEventColor(appointment.status),
        extendedProps: {
          ...appointment,
          description: appointment.description,
          status: appointment.status,
          type: appointment.type,
          client: appointment.client,
          lawyer: appointment.lawyer
        }
      }));
      
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error loading events:', error);
      toast.error('Error al cargar las citas');
    } finally {
      setLoading(false);
    }
  };

  const loadAvailableSlots = async () => {
    try {
      const slots = await apiService.getAvailableSlots();
      setAvailableSlots(slots);
    } catch (error) {
      console.error('Error loading available slots:', error);
    }
  };

  const getEventColor = (status) => {
    const colors = {
      'scheduled': '#667eea',
      'confirmed': '#10b981',
      'completed': '#6b7280',
      'cancelled': '#ef4444',
      'rescheduled': '#f59e0b'
    };
    return colors[status] || '#667eea';
  };

  const handleDateSelect = async (selectInfo) => {
    if (!selectable) return;
    
    const selectedDate = selectInfo.start;
    const now = new Date();
    
    if (selectedDate < now) {
      toast.error('No puedes agendar citas en fechas pasadas');
      return;
    }
    
    // Check if the selected time slot is available
    const isAvailable = availableSlots.some(slot => {
      const slotDate = new Date(slot.datetime);
      return Math.abs(slotDate - selectedDate) < 60000; // Within 1 minute
    });
    
    if (!isAvailable) {
      toast.error('Este horario no está disponible');
      return;
    }
    
    if (onDateSelect) {
      onDateSelect(selectInfo);
    } else {
      // Default appointment booking
      setSelectedEvent({
        start: selectInfo.start,
        end: selectInfo.end,
        isNew: true
      });
      setShowModal(true);
    }
  };

  const handleEventClick = (clickInfo) => {
    if (onEventClick) {
      onEventClick(clickInfo);
    } else {
      setSelectedEvent(clickInfo.event);
      setShowModal(true);
    }
  };

  const handleEventDrop = async (dropInfo) => {
    if (!editable) return;
    
    try {
      const event = dropInfo.event;
      await apiService.updateAppointment(event.id, {
        startDate: event.start,
        endDate: event.end
      });
      
      toast.success('Cita reprogramada exitosamente');
      loadEvents();
    } catch (error) {
      console.error('Error updating appointment:', error);
      toast.error('Error al reprogramar la cita');
      dropInfo.revert();
    }
  };

  const handleEventResize = async (resizeInfo) => {
    if (!editable) return;
    
    try {
      const event = resizeInfo.event;
      await apiService.updateAppointment(event.id, {
        startDate: event.start,
        endDate: event.end
      });
      
      toast.success('Duración de cita actualizada');
      loadEvents();
    } catch (error) {
      console.error('Error resizing appointment:', error);
      toast.error('Error al actualizar la duración');
      resizeInfo.revert();
    }
  };

  const AppointmentModal = () => {
    const [formData, setFormData] = useState({
      title: '',
      type: 'consultation',
      description: '',
      duration: 60
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
        const appointmentData = {
          ...formData,
          startDate: selectedEvent.start,
          endDate: new Date(selectedEvent.start.getTime() + formData.duration * 60000),
          status: 'scheduled'
        };
        
        await scheduleAppointment(appointmentData);
        setShowModal(false);
        loadEvents();
      } catch (error) {
        console.error('Error scheduling appointment:', error);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <GlassCard className="w-full max-w-md mx-4 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white">
              {selectedEvent?.isNew ? 'Agendar Cita' : 'Detalles de Cita'}
            </h3>
            <button
              onClick={() => setShowModal(false)}
              className="text-gray-400 hover:text-white"
            >
              <LottieAnimation 
                animationData={ProfessionalAnimations.error}
                width={24}
                height={24}
                trigger="hover"
              />
            </button>
          </div>

          {selectedEvent?.isNew ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Título
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
                  placeholder="Título de la cita"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Tipo
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                >
                  <option value="consultation">Consulta</option>
                  <option value="legal-advice">Asesoría Legal</option>
                  <option value="document-review">Revisión de Documentos</option>
                  <option value="court-hearing">Audiencia</option>
                  <option value="meeting">Reunión</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Duración (minutos)
                </label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                >
                  <option value={30}>30 minutos</option>
                  <option value={60}>1 hora</option>
                  <option value={90}>1.5 horas</option>
                  <option value={120}>2 horas</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Descripción
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
                  rows={3}
                  placeholder="Descripción de la cita"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 btn-3d glass-primary px-4 py-2 rounded-lg text-white font-medium"
                >
                  Agendar
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 btn-3d glass px-4 py-2 rounded-lg text-white font-medium border border-white/30"
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-white">{selectedEvent?.title}</h4>
                <p className="text-sm text-gray-300">
                  {selectedEvent?.start?.toLocaleString()}
                </p>
              </div>
              
              {selectedEvent?.extendedProps?.description && (
                <div>
                  <p className="text-sm text-gray-300">
                    {selectedEvent.extendedProps.description}
                  </p>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-300">Estado:</span>
                <span 
                  className="px-2 py-1 rounded-full text-xs font-medium"
                  style={{ 
                    backgroundColor: getEventColor(selectedEvent?.extendedProps?.status),
                    color: 'white'
                  }}
                >
                  {selectedEvent?.extendedProps?.status}
                </span>
              </div>
            </div>
          )}
        </GlassCard>
      </div>
    );
  };

  if (loading) {
    return (
      <GlassCard className="p-8 text-center">
        <LottieAnimation 
          animationData={ProfessionalAnimations.loading}
          width={60}
          height={60}
          autoplay={true}
          className="mx-auto mb-4"
        />
        <p className="text-white">Cargando calendario...</p>
      </GlassCard>
    );
  }

  return (
    <div className="appointment-calendar">
      <style jsx>{`
        .fc {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 20px;
          backdrop-filter: blur(20px);
        }
        
        .fc-toolbar {
          margin-bottom: 20px;
        }
        
        .fc-toolbar-title {
          color: white;
          font-size: 1.5rem;
          font-weight: 600;
        }
        
        .fc-button {
          background: rgba(102, 126, 234, 0.8) !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          color: white !important;
          border-radius: 8px !important;
          transition: all 0.3s ease !important;
        }
        
        .fc-button:hover {
          background: rgba(102, 126, 234, 1) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }
        
        .fc-button:disabled {
          opacity: 0.5 !important;
        }
        
        .fc-daygrid-day,
        .fc-timegrid-slot {
          border-color: rgba(255, 255, 255, 0.1) !important;
        }
        
        .fc-daygrid-day-number,
        .fc-col-header-cell-cushion,
        .fc-timegrid-slot-label-cushion {
          color: white;
        }
        
        .fc-daygrid-day:hover {
          background: rgba(255, 255, 255, 0.05);
        }
        
        .fc-event {
          border-radius: 6px;
          border: none !important;
          font-size: 0.85rem;
          padding: 2px 6px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .fc-event:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        
        .fc-event-title {
          font-weight: 500;
        }
        
        .fc-today {
          background: rgba(102, 126, 234, 0.1) !important;
        }
        
        .fc-highlight {
          background: rgba(102, 126, 234, 0.2) !important;
        }
      `}</style>
      
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        initialView="dayGridMonth"
        editable={editable}
        selectable={selectable}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        events={events}
        select={handleDateSelect}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        eventResize={handleEventResize}
        height={height}
        locale="es"
        buttonText={{
          today: 'Hoy',
          month: 'Mes',
          week: 'Semana',
          day: 'Día'
        }}
        slotMinTime="08:00:00"
        slotMaxTime="20:00:00"
        businessHours={{
          daysOfWeek: [1, 2, 3, 4, 5],
          startTime: '09:00',
          endTime: '18:00'
        }}
        selectConstraint="businessHours"
        eventConstraint="businessHours"
      />
      
      {showModal && <AppointmentModal />}
    </div>
  );
};

export default AppointmentCalendar;
