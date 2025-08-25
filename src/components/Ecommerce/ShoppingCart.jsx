import React, { useState } from 'react';
import { useEcommerce } from '../../contexts/EcommerceContext';
import { useUser } from '../../contexts/UserContext';
import GlassCard from '../3D/GlassCard';
import LottieAnimation, { ProfessionalAnimations } from '../3D/LottieAnimation';
import { toast } from 'react-hot-toast';

const ShoppingCart = ({ isModal = false, onClose }) => {
  const {
    cart,
    cartTotal,
    cartItemsCount,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    processCheckout
  } = useEcommerce();

  const { user, credits, tokens } = useUser();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showCheckout, setShowCheckout] = useState(false);

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(item);
    } else {
      updateCartQuantity(item, newQuantity);
    }
  };

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Debes iniciar sesión para continuar');
      return;
    }

    if (cart.length === 0) {
      toast.error('Tu carrito está vacío');
      return;
    }

    setShowCheckout(true);
  };

  const processOrder = async () => {
    try {
      setIsProcessing(true);
      
      const orderData = {
        items: cart,
        total: cartTotal,
        paymentMethod,
        userId: user.id
      };

      await processCheckout(orderData);
      toast.success('¡Orden procesada exitosamente!');
      
      if (onClose) onClose();
      
    } catch (error) {
      toast.error('Error al procesar la orden');
    } finally {
      setIsProcessing(false);
      setShowCheckout(false);
    }
  };

  const CartItem = ({ item }) => (
    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
        {item.image ? (
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <span className="text-2xl">
            {item.type === 'ebook' ? '📚' : 
             item.type === 'course' ? '🎓' : 
             item.type === 'service' ? '⚖️' : '📦'}
          </span>
        )}
      </div>

      <div className="flex-1">
        <h4 className="text-white font-medium">{item.name}</h4>
        <p className="text-gray-300 text-sm">{item.type}</p>
        <p className="text-white font-semibold">${item.price}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => handleQuantityChange(item, item.quantity - 1)}
          className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
        >
          -
        </button>
        <span className="text-white w-8 text-center">{item.quantity}</span>
        <button
          onClick={() => handleQuantityChange(item, item.quantity + 1)}
          className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
        >
          +
        </button>
      </div>

      <button
        onClick={() => removeFromCart(item)}
        className="text-red-400 hover:text-red-300 p-2"
      >
        <LottieAnimation
          animationData={ProfessionalAnimations.error}
          width={20}
          height={20}
          trigger="hover"
        />
      </button>
    </div>
  );

  const CheckoutModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <GlassCard className="w-full max-w-md mx-4 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">Finalizar Compra</h3>
          <button
            onClick={() => setShowCheckout(false)}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-white font-medium mb-2">Resumen de Orden</h4>
            <div className="bg-white/5 rounded-lg p-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Subtotal:</span>
                <span className="text-white">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Impuestos:</span>
                <span className="text-white">${(cartTotal * 0.1).toFixed(2)}</span>
              </div>
              <div className="border-t border-white/10 mt-2 pt-2">
                <div className="flex justify-between font-semibold">
                  <span className="text-white">Total:</span>
                  <span className="text-white">${(cartTotal * 1.1).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium mb-2">Método de Pago</h4>
            <div className="space-y-2">
              {['card', 'paypal', 'credits', 'tokens'].map(method => (
                <label key={method} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-blue-500"
                  />
                  <span className="text-white">
                    {method === 'card' && '💳 Tarjeta de Crédito'}
                    {method === 'paypal' && '🅿️ PayPal'}
                    {method === 'credits' && `💰 Créditos (${credits} disponibles)`}
                    {method === 'tokens' && `🪙 Tokens (${tokens} disponibles)`}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={processOrder}
              disabled={isProcessing}
              className="flex-1 btn-3d glass-primary px-4 py-2 rounded-lg text-white font-medium flex items-center justify-center gap-2"
            >
              {isProcessing ? (
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
              {isProcessing ? 'Procesando...' : 'Confirmar Compra'}
            </button>
            <button
              onClick={() => setShowCheckout(false)}
              className="btn-3d glass px-4 py-2 rounded-lg text-white border border-white/30"
            >
              Cancelar
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );

  const content = (
    <div className="shopping-cart">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">
          Carrito de Compras ({cartItemsCount})
        </h2>
        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="text-red-400 hover:text-red-300 text-sm"
          >
            Vaciar Carrito
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <GlassCard className="p-8 text-center">
          <LottieAnimation
            animationData={ProfessionalAnimations.info}
            width={60}
            height={60}
            className="mx-auto mb-4"
          />
          <p className="text-white text-lg mb-2">Tu carrito está vacío</p>
          <p className="text-gray-300 text-sm">
            Agrega algunos productos para comenzar tu compra
          </p>
        </GlassCard>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {cart.map(item => (
              <CartItem key={`${item.type}-${item.id}`} item={item} />
            ))}
          </div>

          <GlassCard className="p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-semibold text-white">Total:</span>
              <span className="text-2xl font-bold text-white">
                ${cartTotal.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full btn-3d glass-primary px-6 py-3 rounded-lg text-white font-semibold text-lg flex items-center justify-center gap-2"
            >
              <LottieAnimation
                animationData={ProfessionalAnimations.arrow}
                width={24}
                height={24}
                trigger="hover"
              />
              Proceder al Checkout
            </button>
          </GlassCard>
        </>
      )}

      {showCheckout && <CheckoutModal />}
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Carrito</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          {content}
        </div>
      </div>
    );
  }

  return <GlassCard className="p-6">{content}</GlassCard>;
};

export default ShoppingCart;
