import React, { useState } from 'react';
import { FaCheck, FaCrown, FaStar, FaUsers, FaRocket } from 'react-icons/fa';
import { subscriptionPlans } from '../../data/servicesData';

const SubscriptionPlans = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const getPlanIcon = (planId) => {
    switch (planId) {
      case 'normal':
        return <FaUsers className="text-4xl text-blue-500" />;
      case 'intermedio':
        return <FaStar className="text-4xl text-green-500" />;
      case 'premium':
        return <FaCrown className="text-4xl text-purple-500" />;
      default:
        return <FaRocket className="text-4xl text-gray-500" />;
    }
  };

  const getPlanPrice = (plan) => {
    const price = billingCycle === 'yearly' ? plan.price * 10 : plan.price; // 2 months free on yearly
    return price;
  };

  const getPlanColorClasses = (planId, isPopular) => {
    const baseClasses = "relative bg-white rounded-2xl shadow-xl transition-all duration-300 hover:scale-105";
    
    if (isPopular) {
      return `${baseClasses} border-4 border-green-500 transform scale-105`;
    }
    
    switch (planId) {
      case 'normal':
        return `${baseClasses} border-2 border-blue-200 hover:border-blue-400`;
      case 'premium':
        return `${baseClasses} border-2 border-purple-200 hover:border-purple-400`;
      default:
        return `${baseClasses} border-2 border-gray-200 hover:border-gray-400`;
    }
  };

  const handleSubscribe = (planId) => {
    // Integrate with payment system
    console.log(`Subscribing to ${planId} plan`);
    // Add payment integration here
  };

  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Planes de Suscripción
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Elija el plan que mejor se adapte a sus necesidades legales y obtenga acceso a nuestros servicios de consultoría y asesoría continua.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center mt-8">
            <span className={`text-sm ${billingCycle === 'monthly' ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
              Mensual
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="mx-3 relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-blue-600 transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${billingCycle === 'yearly' ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
              Anual
            </span>
            {billingCycle === 'yearly' && (
              <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                2 meses gratis
              </span>
            )}
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {subscriptionPlans.map((plan) => (
            <div key={plan.id} className={getPlanColorClasses(plan.id, plan.popular)}>
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Más Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                {/* Plan Icon & Name */}
                <div className="text-center mb-6">
                  <div className="flex justify-center mb-4">
                    {getPlanIcon(plan.id)}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                </div>

                {/* Price */}
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-gray-900">
                    ${getPlanPrice(plan).toFixed(2)}
                  </div>
                  <div className="text-gray-500">
                    /{billingCycle === 'yearly' ? 'año' : plan.duration}
                  </div>
                  {billingCycle === 'yearly' && (
                    <div className="text-sm text-green-600 mt-1">
                      Ahorra ${(plan.price * 2).toFixed(2)} al año
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => handleSubscribe(plan.id)}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                    plan.popular
                      ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}
                >
                  Comenzar Ahora
                </button>

                {/* Additional Info */}
                <p className="text-center text-sm text-gray-500 mt-4">
                  Sin compromiso. Cancela cuando quieras.
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Listo para recibir asesoría legal de calidad?
          </h3>
          <p className="text-gray-600 mb-6">
            Únase a nuestros clientes satisfechos y permítanos ayudarle con sus necesidades legales. Primera consulta totalmente gratuita.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">+250</div>
              <div className="text-gray-600">Casos Ganados</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">+500</div>
              <div className="text-gray-600">Clientes Satisfechos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">15+</div>
              <div className="text-gray-600">Años de Experiencia</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600">100%</div>
              <div className="text-gray-600">Compromiso</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
