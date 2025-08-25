import React, { useState } from 'react';
import { FaShoppingCart, FaTimes, FaPlus, FaMinus, FaTrash, FaCreditCard } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

const ShoppingCart = () => {
  const {
    items,
    total,
    itemCount,
    isCartVisible,
    setIsCartVisible,
    updateQuantity,
    removeFromCart,
    clearCart,
    checkout
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('paypal');

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const result = await checkout(paymentMethod);
      if (result.success) {
        setIsCartVisible(false);
      }
    } finally {
      setIsCheckingOut(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (!isCartVisible) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsCartVisible(false)} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold flex items-center">
            <FaShoppingCart className="mr-2" />
            Carrito ({itemCount})
          </h2>
          <button
            onClick={() => setIsCartVisible(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <FaTimes />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 max-h-96">
          {items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FaShoppingCart className="mx-auto text-4xl mb-4 text-gray-300" />
              <p>Tu carrito está vacío</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={`${item.id}-${item.type}`} className="flex items-center space-x-3 border-b pb-3">
                  <img
                    src={item.image || '/images/placeholder.jpg'}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.title}</h4>
                    <p className="text-gray-500 text-xs">{item.category}</p>
                    <p className="font-semibold text-blue-600">{formatPrice(item.price)}</p>
                  </div>

                  {/* Quantity Controls */}
                  {item.type !== 'course' && item.type !== 'ebook' && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.type, (item.quantity || 1) - 1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <FaMinus className="text-xs" />
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity || 1}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.type, (item.quantity || 1) + 1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <FaPlus className="text-xs" />
                      </button>
                    </div>
                  )}

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id, item.type)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            {/* Total */}
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total:</span>
              <span className="text-blue-600">{formatPrice(total)}</span>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium mb-2">Método de Pago:</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="paypal">PayPal</option>
                <option value="stripe">Tarjeta de Crédito</option>
                <option value="bank">Transferencia Bancaria</option>
                <option value="cash">Efectivo</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold flex items-center justify-center transition-colors"
              >
                {isCheckingOut ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                ) : (
                  <FaCreditCard className="mr-2" />
                )}
                {isCheckingOut ? 'Procesando...' : 'Pagar Ahora'}
              </button>

              <button
                onClick={clearCart}
                className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Vaciar Carrito
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
