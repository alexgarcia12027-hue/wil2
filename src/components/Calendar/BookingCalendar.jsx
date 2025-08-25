import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaClock, FaVideo, FaMapMarkerAlt, FaUser, FaCheck } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const BookingCalendar = ({ serviceType = 'consultation', onBookingComplete }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('presencial');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [clientInfo, setClientInfo] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
    urgency: 'normal'
  });

  const appointmentTypes = [
    { id: 'presencial', name: 'Presencial', icon: <FaMapMarkerAlt />, price: 0 },
    { id: 'virtual', name: 'Virtual', icon: <FaVideo />, price: -10 } // 10% discount for virtual
  ];

  const urgencyLevels = [
    { id: 'normal', name: 'Normal', price: 0 },
    { id: 'urgent', name: 'Urgente', price: 20 },
    { id: 'emergency', name: 'Emergencia', price: 50 }
  ];

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    
    // Previous month's days
    for (let i = startingDay - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({
        date: prevDate,
        isCurrentMonth: false,
        isAvailable: false
      });
    }
    
    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const today = new Date();
      const isAvailable = date >= today && date.getDay() !== 0; // No Sundays
      
      days.push({
        date,
        isCurrentMonth: true,
        isAvailable
      });
    }
    
    // Next month's days to fill the grid
    const remainingSlots = 42 - days.length;
    for (let day = 1; day <= remainingSlots; day++) {
      const nextDate = new Date(year, month + 1, day);
      days.push({
        date: nextDate,
        isCurrentMonth: false,
        isAvailable: false
      });
    }
    
    return days;
  };

  // Load available time slots for selected date
  useEffect(() => {
    if (selectedDate) {
      setIsLoading(true);
      
      // Simulate loading available slots
      setTimeout(() => {
        const occupied = ['09:00', '14:30', '16:00']; // Mock occupied slots
        const available = timeSlots.filter(slot => !occupied.includes(slot));
        setAvailableSlots(available);
        setIsLoading(false);
      }, 500);
    }
  }, [selectedDate]);

  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDateSelect = (date) => {
    if (date.isAvailable) {
      setSelectedDate(date.date.toISOString().split('T')[0]);
      setSelectedTime('');
    }
  };

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime || !clientInfo.name || !clientInfo.email) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate booking API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const booking = {
        id: Date.now(),
        date: selectedDate,
        time: selectedTime,
        type: appointmentType,
        service: serviceType,
        client: clientInfo,
        urgency: clientInfo.urgency,
        status: 'confirmed'
      };

      // Store booking in localStorage (replace with real API)
      const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      existingBookings.push(booking);
      localStorage.setItem('bookings', JSON.stringify(existingBookings));

      toast.success('¡Cita agendada exitosamente!');
      
      if (onBookingComplete) {
        onBookingComplete(booking);
      }

      // Reset form
      setSelectedDate('');
      setSelectedTime('');
      setClientInfo({
        name: '',
        email: '',
        phone: '',
        description: '',
        urgency: 'normal'
      });

    } catch (error) {
      toast.error('Error al agendar la cita');
    } finally {
      setIsLoading(false);
    }
  };

  const getBasePrice = () => {
    const servicePrices = {
      consultation: 60,
      legal_advice: 120,
      document_review: 80,
      court_representation: 500
    };
    return servicePrices[serviceType] || 60;
  };

  const calculateTotalPrice = () => {
    const basePrice = getBasePrice();
    const typeMultiplier = appointmentType === 'virtual' ? 0.9 : 1;
    const urgencyPrice = urgencyLevels.find(u => u.id === clientInfo.urgency)?.price || 0;
    
    return (basePrice * typeMultiplier) + urgencyPrice;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Calendar Section */}
        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <FaCalendarAlt className="mr-2 text-blue-600" />
            Selecciona una fecha
          </h3>

          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
              className="p-2 hover:bg-gray-100 rounded"
            >
              ←
            </button>
            <h4 className="font-semibold">
              {currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
            </h4>
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
              className="p-2 hover:bg-gray-100 rounded"
            >
              →
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-6">
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
              <div key={day} className="p-2 text-center font-medium text-gray-500 text-sm">
                {day}
              </div>
            ))}
            
            {calendarDays.map((day, index) => (
              <button
                key={index}
                onClick={() => handleDateSelect(day)}
                disabled={!day.isAvailable}
                className={`p-2 text-center rounded hover:bg-blue-50 transition-colors ${
                  !day.isCurrentMonth 
                    ? 'text-gray-300' 
                    : day.isAvailable
                      ? selectedDate === day.date.toISOString().split('T')[0]
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-blue-50 text-gray-900'
                      : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                {day.date.getDate()}
              </button>
            ))}
          </div>

          {/* Time Slots */}
          {selectedDate && (
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <FaClock className="mr-2 text-blue-600" />
                Horarios disponibles
              </h4>
              
              {isLoading ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-2">
                  {availableSlots.map(time => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-2 text-sm rounded border transition-colors ${
                        selectedTime === time
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Booking Form */}
        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <FaUser className="mr-2 text-blue-600" />
            Información de la cita
          </h3>

          <div className="space-y-4">
            {/* Appointment Type */}
            <div>
              <label className="block font-medium mb-2">Tipo de consulta:</label>
              <div className="grid grid-cols-2 gap-2">
                {appointmentTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setAppointmentType(type.id)}
                    className={`p-3 rounded-lg border flex items-center justify-center space-x-2 transition-colors ${
                      appointmentType === type.id
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    {type.icon}
                    <span>{type.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Client Information */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nombre completo *"
                value={clientInfo.name}
                onChange={(e) => setClientInfo({...clientInfo, name: e.target.value})}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                placeholder="Correo electrónico *"
                value={clientInfo.email}
                onChange={(e) => setClientInfo({...clientInfo, email: e.target.value})}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <input
              type="tel"
              placeholder="Teléfono"
              value={clientInfo.phone}
              onChange={(e) => setClientInfo({...clientInfo, phone: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Urgency Level */}
            <div>
              <label className="block font-medium mb-2">Nivel de urgencia:</label>
              <select
                value={clientInfo.urgency}
                onChange={(e) => setClientInfo({...clientInfo, urgency: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {urgencyLevels.map(level => (
                  <option key={level.id} value={level.id}>
                    {level.name} {level.price > 0 && `(+$${level.price})`}
                  </option>
                ))}
              </select>
            </div>

            <textarea
              placeholder="Descripción del caso (opcional)"
              value={clientInfo.description}
              onChange={(e) => setClientInfo({...clientInfo, description: e.target.value})}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Booking Summary */}
            {selectedDate && selectedTime && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Resumen de la cita:</h4>
                <div className="space-y-1 text-sm">
                  <p><strong>Fecha:</strong> {formatDate(new Date(selectedDate))}</p>
                  <p><strong>Hora:</strong> {selectedTime}</p>
                  <p><strong>Tipo:</strong> {appointmentTypes.find(t => t.id === appointmentType)?.name}</p>
                  <p><strong>Total:</strong> <span className="text-lg font-bold text-blue-600">${calculateTotalPrice()}</span></p>
                </div>
              </div>
            )}

            {/* Book Button */}
            <button
              onClick={handleBooking}
              disabled={!selectedDate || !selectedTime || isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold flex items-center justify-center transition-colors"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
              ) : (
                <FaCheck className="mr-2" />
              )}
              {isLoading ? 'Agendando...' : 'Agendar Cita'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;
