import React, { useState, useEffect } from 'react';
import { FaCreditCard, FaPaypal, FaUniversity, FaMoneyBillWave, FaLock, FaCheck, FaSpinner } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-hot-toast';

const CheckoutSystem = ({ onCheckoutComplete, onClose }) => {
  const { items, total, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Ibarra',
    state: 'Imbabura',
    country: 'Ecuador',
    zipCode: ''
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    // PayPal
    paypalEmail: '',
    // Bank Transfer
    bankAccount: '',
    bankName: '',
    // Cash
    cashAmount: total
  });

  const paymentMethods = [
    {
      id: 'card',
      name: 'Tarjeta de Crédito/Débito',
      icon: <FaCreditCard />,
      description: 'Visa, Mastercard, American Express'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: <FaPaypal />,
      description: 'Pago seguro con PayPal'
    },
    {
      id: 'bank',
      name: 'Transferencia Bancaria',
      icon: <FaUniversity />,
      description: 'Transferencia directa a cuenta bancaria'
    },
    {
      id: 'cash',
      name: 'Pago en Efectivo',
      icon: <FaMoneyBillWave />,
      description: 'Pago en oficina o contra entrega'
    }
  ];

  const steps = [
    { id: 1, name: 'Información de Envío', icon: '📦' },
    { id: 2, name: 'Método de Pago', icon: '💳' },
    { id: 3, name: 'Confirmación', icon: '✅' }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const validateStep1 = () => {
    const required = ['firstName', 'lastName', 'email', 'phone'];
    return required.every(field => shippingInfo[field].trim() !== '');
  };

  const validateStep2 = () => {
    switch (paymentMethod) {
      case 'card':
        return paymentInfo.cardNumber && paymentInfo.expiryDate && paymentInfo.cvv && paymentInfo.cardName;
      case 'paypal':
        return paymentInfo.paypalEmail;
      case 'bank':
        return paymentInfo.bankAccount && paymentInfo.bankName;
      case 'cash':
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }
    if (currentStep === 2 && !validateStep2()) {
      toast.error('Por favor completa la información de pago');
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const processPayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const orderData = {
        id: `ORDER-${Date.now()}`,
        items,
        total,
        shippingInfo,
        paymentMethod,
        paymentInfo: paymentMethod === 'card' ? {
          ...paymentInfo,
          cardNumber: `****-****-****-${paymentInfo.cardNumber.slice(-4)}`
        } : paymentInfo,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };

      // Store order in localStorage (replace with real API)
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      existingOrders.push(orderData);
      localStorage.setItem('orders', JSON.stringify(existingOrders));

      // Clear cart
      clearCart();
      
      toast.success('¡Pago procesado exitosamente!');
      
      if (onCheckoutComplete) {
        onCheckoutComplete(orderData);
      }
      
      setCurrentStep(4); // Success step
      
    } catch (error) {
      toast.error('Error al procesar el pago');
      console.error('Payment error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Step 1: Shipping Information
  const renderShippingStep = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Información de Contacto</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Nombre *"
          value={shippingInfo.firstName}
          onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          placeholder="Apellido *"
          value={shippingInfo.lastName}
          onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="email"
          placeholder="Correo electrónico *"
          value={shippingInfo.email}
          onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="tel"
          placeholder="Teléfono *"
          value={shippingInfo.phone}
          onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <input
        type="text"
        placeholder="Dirección"
        value={shippingInfo.address}
        onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="grid grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Ciudad"
          value={shippingInfo.city}
          onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Provincia"
          value={shippingInfo.state}
          onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Código Postal"
          value={shippingInfo.zipCode}
          onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );

  // Step 2: Payment Method
  const renderPaymentStep = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold mb-4">Método de Pago</h3>
      
      {/* Payment Method Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paymentMethods.map(method => (
          <button
            key={method.id}
            onClick={() => setPaymentMethod(method.id)}
            className={`p-4 border rounded-lg text-left transition-colors ${
              paymentMethod === method.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="flex items-center mb-2">
              <span className="text-xl mr-3">{method.icon}</span>
              <span className="font-medium">{method.name}</span>
            </div>
            <p className="text-sm text-gray-600">{method.description}</p>
          </button>
        ))}
      </div>

      {/* Payment Details Form */}
      <div className="mt-6">
        {paymentMethod === 'card' && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Número de tarjeta"
              value={paymentInfo.cardNumber}
              onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={19}
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="MM/YY"
                value={paymentInfo.expiryDate}
                onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={5}
              />
              <input
                type="text"
                placeholder="CVV"
                value={paymentInfo.cvv}
                onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={4}
              />
            </div>
            <input
              type="text"
              placeholder="Nombre en la tarjeta"
              value={paymentInfo.cardName}
              onChange={(e) => setPaymentInfo({...paymentInfo, cardName: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {paymentMethod === 'paypal' && (
          <div>
            <input
              type="email"
              placeholder="Email de PayPal"
              value={paymentInfo.paypalEmail}
              onChange={(e) => setPaymentInfo({...paymentInfo, paypalEmail: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-gray-600 mt-2">
              Serás redirigido a PayPal para completar el pago
            </p>
          </div>
        )}

        {paymentMethod === 'bank' && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Número de cuenta bancaria"
              value={paymentInfo.bankAccount}
              onChange={(e) => setPaymentInfo({...paymentInfo, bankAccount: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Nombre del banco"
              value={paymentInfo.bankName}
              onChange={(e) => setPaymentInfo({...paymentInfo, bankName: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Datos bancarios:</strong><br/>
                Banco: Banco Pichincha<br/>
                Cuenta: 1234567890<br/>
                Beneficiario: Wilson Alexander Ipiales Guerron<br/>
                Cédula: 1003456789
              </p>
            </div>
          </div>
        )}

        {paymentMethod === 'cash' && (
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-green-800">
              <strong>Pago en efectivo:</strong><br/>
              Puede realizar el pago en nuestra oficina o al momento de la entrega.<br/>
              <strong>Dirección:</strong> Juan José Flores 4-73 y Vicente Rocafuerte, Ibarra, Ecuador<br/>
              <strong>Horarios:</strong> Lunes a Viernes 8:00 AM - 6:00 PM
            </p>
          </div>
        )}
      </div>
    </div>
  );

  // Step 3: Confirmation
  const renderConfirmationStep = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold mb-4">Confirmar Pedido</h3>
      
      {/* Order Summary */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium mb-3">Resumen del pedido:</h4>
        {items.map(item => (
          <div key={`${item.id}-${item.type}`} className="flex justify-between py-2">
            <span>{item.title} {item.quantity && `x${item.quantity}`}</span>
            <span>{formatPrice(item.price * (item.quantity || 1))}</span>
          </div>
        ))}
        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total:</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      {/* Shipping Info */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Información de envío:</h4>
        <p>{shippingInfo.firstName} {shippingInfo.lastName}</p>
        <p>{shippingInfo.email}</p>
        <p>{shippingInfo.phone}</p>
        {shippingInfo.address && <p>{shippingInfo.address}</p>}
        <p>{shippingInfo.city}, {shippingInfo.state}</p>
      </div>

      {/* Payment Method */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Método de pago:</h4>
        <p>{paymentMethods.find(m => m.id === paymentMethod)?.name}</p>
      </div>

      <div className="flex items-center text-sm text-gray-600">
        <FaLock className="mr-2" />
        <span>Pago seguro protegido con encriptación SSL</span>
      </div>
    </div>
  );

  // Success Step
  const renderSuccessStep = () => (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <FaCheck className="text-green-600 text-2xl" />
      </div>
      <h3 className="text-2xl font-bold text-green-600">¡Pago Exitoso!</h3>
      <p className="text-gray-600">
        Tu pedido ha sido procesado correctamente. Recibirás un email de confirmación en breve.
      </p>
      <div className="flex gap-4 justify-center">
        <button
          onClick={onClose}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Continuar Comprando
        </button>
        <button
          onClick={() => window.location.href = '/dashboard'}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Ver Mis Pedidos
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              currentStep >= step.id
                ? 'bg-blue-600 border-blue-600 text-white'
                : 'border-gray-300 text-gray-500'
            }`}>
              {currentStep > step.id ? <FaCheck /> : step.icon}
            </div>
            <span className={`ml-2 text-sm font-medium ${
              currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
            }`}>
              {step.name}
            </span>
            {index < steps.length - 1 && (
              <div className={`w-12 h-1 mx-4 ${
                currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        {currentStep === 1 && renderShippingStep()}
        {currentStep === 2 && renderPaymentStep()}
        {currentStep === 3 && renderConfirmationStep()}
        {currentStep === 4 && renderSuccessStep()}

        {/* Navigation Buttons */}
        {currentStep < 4 && (
          <div className="flex justify-between mt-8">
            <button
              onClick={currentStep === 1 ? onClose : handlePrevious}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              {currentStep === 1 ? 'Cancelar' : 'Anterior'}
            </button>

            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Siguiente
              </button>
            ) : (
              <button
                onClick={processPayment}
                disabled={isProcessing}
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 flex items-center"
              >
                {isProcessing ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <FaLock className="mr-2" />
                    Confirmar Pago
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutSystem;
