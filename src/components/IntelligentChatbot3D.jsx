import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaComments, 
  FaTimes, 
  FaPaperPlane, 
  FaRobot, 
  FaUser 
} from 'react-icons/fa';
import AnimatedButton3D from '../AnimatedButton3D';

const IntelligentChatbot3D = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: '¡Hola! Soy el asistente virtual del Abogado Wilson. ¿En qué puedo ayudarte hoy?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        'Entiendo tu consulta. Te recomiendo agendar una cita con el Abogado Wilson para una evaluación más detallada.',
        'Gracias por tu mensaje. Nuestro equipo legal revisará tu caso y te contactará pronto.',
        'Para brindarte la mejor asesoría, ¿podrías proporcionar más detalles sobre tu situación legal?',
        'Tenemos varios servicios que podrían ayudarte. ¿Te gustaría conocer más sobre alguno en particular?',
        'Tu consulta es importante. ¿Hay algo específico sobre lo que necesites orientación legal?'
      ];

      const botMessage = {
        id: messages.length + 2,
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-full p-4 shadow-xl z-50 flex items-center justify-center"
        whileHover={{ 
          scale: 1.1,
          boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.3), 0 5px 10px -5px rgba(59, 130, 246, 0.2)'
        }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <FaComments className="text-xl" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 border border-gray-200 flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 flex items-center justify-between">
              <div className="flex items-center">
                <FaRobot className="text-xl mr-2" />
                <h3 className="font-bold">Asistente Legal</h3>
              </div>
              <button 
                onClick={toggleChat}
                className="text-white hover:text-blue-200 transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto max-h-96 bg-gray-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    message.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none shadow-sm'
                  }`}>
                    <div className="flex items-start">
                      {message.sender === 'bot' && (
                        <FaRobot className="mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                      )}
                      {message.sender === 'user' && (
                        <FaUser className="mr-2 mt-0.5 text-white flex-shrink-0" />
                      )}
                      <span>{message.text}</span>
                    </div>
                    <div className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  className="flex justify-start mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="bg-white text-gray-800 border border-gray-200 px-4 py-2 rounded-2xl rounded-tl-none shadow-sm">
                    <div className="flex items-center">
                      <FaRobot className="mr-2 text-blue-500" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 border-t border-gray-200 bg-white">
              <div className="flex">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <AnimatedButton3D
                  type="submit"
                  variant="primary"
                  className="rounded-l-none rounded-r-lg"
                  disabled={!inputValue.trim()}
                >
                  <FaPaperPlane />
                </AnimatedButton3D>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Este chatbot proporciona asistencia general. Para casos específicos, consulta con un abogado.
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default IntelligentChatbot3D;