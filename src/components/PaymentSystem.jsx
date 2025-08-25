import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCreditCard, FaPaypal, FaLock, FaCheck, FaSpinner } from 'react-icons/fa';

const PaymentSystem = ({ amount, onPaymentSuccess, onPaymentError }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const paymentMethods = [
    { id: 'card', name: 'Tarjeta de Crédito', icon: FaCreditCard, color: 'blue' },
    { id: 'paypal', name: 'PayPal', icon: FaPaypal, color: 'yellow' },
    { id: 'binance', name: 'Binance Pay', icon: FaCreditCard, color: 'orange' },
  ];

  const handleCardInputChange = (field, value) => {
    setCardData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const processPayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock payment success
      if (Math.random() > 0.1) { // 90% success rate
        setPaymentComplete(true);
        setTimeout(() => {
          onPaymentSuccess?.({
            method: paymentMethod,
            amount,
            transactionId: 'TXN_' + Date.now(),
            timestamp: new Date().toISOString()
          });
        }, 1000);
      } else {
        throw new Error('Payment failed');
      }
    } catch (error) {
      onPaymentError?.(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Procesar Pago</h3>
        <p className="text-3xl font-bold text-blue-600">${amount}</p>
      </div>

      {!paymentComplete ? (
        <>
          {/* Payment Method Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Método de Pago
            </label>
            <div className="grid grid-cols-3 gap-3">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <motion.button
                    key={method.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      paymentMethod === method.id
                        ? `border-${method.color}-500 bg-${method.color}-50`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className={`w-6 h-6 mx-auto mb-1 ${
                      paymentMethod === method.id ? `text-${method.color}-600` : 'text-gray-400'
                    }`} />
                    <span className="text-xs font-medium">{method.name}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Payment Form */}
          <AnimatePresence mode="wait">
            {paymentMethod === 'card' && (
              <motion.div
                key="card-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número de Tarjeta
                  </label>
                  <input
                    type="text"
                    value={cardData.number}
                    onChange={(e) => handleCardInputChange('number', formatCardNumber(e.target.value))}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Vencimiento
                    </label>
                    <input
                      type="text"
                      value={cardData.expiry}
                      onChange={(e) => handleCardInputChange('expiry', formatExpiry(e.target.value))}
                      placeholder="MM/YY"
                      maxLength="5"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={cardData.cvv}
                      onChange={(e) => handleCardInputChange('cvv', e.target.value.replace(/\D/g, '').substring(0, 4))}
                      placeholder="123"
                      maxLength="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre del Titular
                  </label>
                  <input
                    type="text"
                    value={cardData.name}
                    onChange={(e) => handleCardInputChange('name', e.target.value)}
                    placeholder="Juan Pérez"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </motion.div>
            )}

            {paymentMethod === 'paypal' && (
              <motion.div
                key="paypal-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center py-8"
              >
                <FaPaypal className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <p className="text-gray-600">Serás redirigido a PayPal para completar el pago</p>
              </motion.div>
            )}

            {paymentMethod === 'binance' && (
              <motion.div
                key="binance-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCreditCard className="w-8 h-8 text-white" />
                </div>
                <p className="text-gray-600">Pago con criptomonedas a través de Binance Pay</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Security Notice */}
          <div className="flex items-center justify-center space-x-2 mt-4 mb-6 text-sm text-gray-500">
            <FaLock className="w-4 h-4" />
            <span>Pago seguro y encriptado</span>
          </div>

          {/* Process Payment Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={processPayment}
            disabled={isProcessing}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isProcessing ? (
              <>
                <FaSpinner className="w-4 h-4 animate-spin" />
                <span>Procesando...</span>
              </>
            ) : (
              <span>Pagar ${amount}</span>
            )}
          </motion.button>
        </>
      ) : (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center py-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <FaCheck className="w-8 h-8 text-white" />
          </motion.div>
          <h3 className="text-xl font-bold text-green-600 mb-2">¡Pago Exitoso!</h3>
          <p className="text-gray-600">Tu pago ha sido procesado correctamente</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PaymentSystem;
