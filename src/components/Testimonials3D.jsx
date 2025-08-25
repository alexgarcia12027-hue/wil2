import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const Testimonials3D = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "María Rodríguez",
      role: "Cliente Civil",
      content: "El Dr. Wilson demostró un profesionalismo excepcional durante todo mi caso de divorcio. Siempre accesible y claro en sus explicaciones, logró un acuerdo justo en tiempo récord.",
      rating: 5,
      avatar: "MR"
    },
    {
      id: 2,
      name: "Juan Pérez",
      role: "Cliente Penal",
      content: "En un momento muy difícil, el Dr. Ipiales me brindó no solo una defensa legal impecable, sino también la tranquilidad que necesitaba. Su conocimiento del derecho penal es admirable.",
      rating: 5,
      avatar: "JP"
    },
    {
      id: 3,
      name: "Comercial Suárez S.A.",
      role: "Cliente Empresarial",
      content: "Como empresa, valoramos enormemente el enfoque estratégico y la rapidez con que el bufete del Dr. Wilson resolvió nuestro litigio comercial. Una inversión que valió cada centavo.",
      rating: 5,
      avatar: "CS"
    },
    {
      id: 4,
      name: "Ana Martínez",
      role: "Cliente Laboral",
      content: "La asesoría laboral que recibí fue precisa y eficaz. El Dr. Wilson entendió mis preocupaciones y me guió con gran profesionalismo durante todo el proceso.",
      rating: 5,
      avatar: "AM"
    },
    {
      id: 5,
      name: "Carlos Gómez",
      role: "Cliente de Tránsito",
      content: "Después de un accidente complicado, contar con la representación del Dr. Ipiales fue decisivo. Su experiencia y dedicación marcaron la diferencia en el resultado final.",
      rating: 5,
      avatar: "CG"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          variants={itemVariants}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">Testimonios de Clientes</h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            La satisfacción de nuestros clientes es nuestro mejor testimonio
          </p>
        </motion.div>

        {/* Testimonials Carousel with 3D Effects */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className={`relative group ${index === activeIndex ? 'md:col-span-2 md:row-span-2' : ''}`}
                initial="hidden"
                whileInView="visible"
                variants={containerVariants}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Efecto de brillo que sigue el mouse */}
                <div 
                  className="absolute inset-0 opacity-10 pointer-events-none rounded-2xl"
                  style={{
                    background: `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.5), transparent 40%)`,
                  }}
                />
                
                <div className={`bg-white/80 backdrop-blur-lg border border-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden ${index === activeIndex ? 'md:p-8' : ''}`}
                  style={{
                    transformStyle: 'preserve-3d',
                    boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div className="relative z-10">
                    <div className="flex items-center mb-4">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                          {testimonial.avatar}
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-bold text-secondary-900">{testimonial.name}</h4>
                        <p className="text-sm text-secondary-500">{testimonial.role}</p>
                      </div>
                      <div className="ml-auto flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    
                    <div className="relative">
                      <FaQuoteLeft className="text-blue-200 text-3xl absolute -top-2 -left-2" />
                      <p className={`text-secondary-600 italic ${index === activeIndex ? 'text-lg' : ''}`}>
                        {testimonial.content}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-3 w-3 rounded-full transition-all ${index === activeIndex ? 'bg-blue-600 w-6' : 'bg-blue-200'}`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section with 3D Effects */}
        <motion.div 
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true }}
        >
          {[
            { value: "200+", label: "Clientes Satisfechos" },
            { value: "50+", label: "Casos Ganados" },
            { value: "5+", label: "Años de Experiencia" },
            { value: "98%", label: "Satisfacción" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/80 backdrop-blur-lg border border-white rounded-xl p-4 text-center shadow-lg relative overflow-hidden"
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.3 }
              }}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Efecto de brillo que sigue el mouse */}
              <div 
                className="absolute inset-0 opacity-10 pointer-events-none rounded-xl"
                style={{
                  background: `radial-gradient(150px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.4), transparent 40%)`,
                }}
              />
              
              <div className="relative z-10">
                <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                <div className="text-sm text-secondary-500">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials3D;