import React, { useState } from 'react';
import { FaCreditCard, FaPaypal, FaUniversity, FaMoneyBillWave, FaLock, FaCheckCircle } from 'react-icons/fa';

const PaymentSystem = () => {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);

  const paymentMethods = [
    {
      id: 'card',
      name: 'Tarjeta de Crédito/Débito',
      icon: <FaCreditCard className="text-2xl" />,
      description: 'Visa, Mastercard, American Express'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: <FaPaypal className="text-2xl" />,
      description: 'Pago seguro con PayPal'
    },
    {
      id: 'bank',
      name: 'Transferencia Bancaria',
      icon: <FaUniversity className="text-2xl" />,
      description: 'Transferencia directa'
    },
    {
      id: 'cash',
      name: 'Efectivo',
      icon: <FaMoneyBillWave className="text-2xl" />,
      description: 'Pago en oficina'
    }
  ];

  const handlePayment = async () => {
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setCompleted(true);
    }, 3000);
  };

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md mx-auto">
          <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">¡Pago Exitoso!</h2>
          <p className="text-gray-600 mb-6">
            Su pago ha sido procesado correctamente. Recibirá un email de confirmación.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Sistema de Pagos
          </h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Payment Methods */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Métodos de Pago
              </h2>
              
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      selectedMethod === method.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`${selectedMethod === method.id ? 'text-blue-600' : 'text-gray-600'} mr-4`}>
                        {method.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{method.name}</h3>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        selectedMethod === method.id
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Detalles de Pago
              </h2>

              {selectedMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número de Tarjeta
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fecha de Vencimiento
                      </label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre del Titular
                    </label>
                    <input
                      type="text"
                      placeholder="Juan Pérez"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {selectedMethod === 'paypal' && (
                <div className="text-center py-8">
                  <FaPaypal className="text-6xl text-blue-600 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    Será redirigido a PayPal para completar el pago de forma segura.
                  </p>
                </div>
              )}

              {selectedMethod === 'bank' && (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Datos Bancarios</h3>
                    <p className="text-sm text-gray-600">
                      <strong>Banco:</strong> Banco Pichincha<br/>
                      <strong>Cuenta:</strong> 1234567890<br/>
                      <strong>Titular:</strong> Abogado Wilson García
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número de Referencia
                    </label>
                    <input
                      type="text"
                      placeholder="Ingrese el número de referencia"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {selectedMethod === 'cash' && (
                <div className="text-center py-8">
                  <FaMoneyBillWave className="text-6xl text-green-600 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    Puede realizar el pago en efectivo en nuestra oficina ubicada en:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <strong>Dirección:</strong> Juan José Flores 4-73, Ibarra<br/>
                      <strong>Horario:</strong> Lunes a Viernes 8:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              )}

              {/* Security Info */}
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center">
                  <FaLock className="text-green-600 mr-2" />
                  <span className="text-sm text-green-800">
                    Pagos seguros con encriptación SSL
                  </span>
                </div>
              </div>

              {/* Payment Button */}
              <button
                onClick={handlePayment}
                disabled={processing}
                className={`w-full mt-6 py-3 rounded-lg font-semibold transition-colors ${
                  processing
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {processing ? 'Procesando...' : `Pagar con ${paymentMethods.find(m => m.id === selectedMethod)?.name}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSystem;
