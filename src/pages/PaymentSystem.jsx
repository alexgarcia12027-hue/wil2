import React from 'react';
import PaymentSystemComponent from '../components/Payment/PaymentSystem';

const PaymentSystem = () => {
  return (
    <div className="min-h-screen pt-16 bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <PaymentSystemComponent 
          amount={99.99}
          productName="Consulta Legal Profesional"
          onPaymentComplete={(data) => {
            console.log('Pago completado:', data);
            // Redirigir o mostrar confirmación
          }}
        />
      </div>
    </div>
  );
};

export default PaymentSystem;
