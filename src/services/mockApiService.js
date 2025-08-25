// Mock API service for localhost development
// This provides mock data and responses for all API endpoints

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data storage
let mockData = {
  users: [
    {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan@example.com',
      role: 'client',
      credits: 5,
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      name: 'Admin Wilson',
      email: 'admin@abogadowilson.com',
      role: 'admin',
      credits: 999,
      createdAt: new Date().toISOString()
    }
  ],
  courses: [
    {
      id: 1,
      title: 'Derecho Civil Básico',
      description: 'Curso introductorio de derecho civil',
      price: 99.99,
      duration: '4 semanas',
      lessons: [
        { id: 1, title: 'Introducción al Derecho Civil', duration: '30 min', completed: false },
        { id: 2, title: 'Contratos y Obligaciones', duration: '45 min', completed: false }
      ]
    }
  ],
  blogs: [
    {
      id: 1,
      title: 'Nuevas Reformas Legales 2024',
      content: 'Contenido del artículo...',
      category: 'Noticias',
      author: 'Abogado Wilson',
      publishedAt: new Date().toISOString()
    }
  ],
  payments: [],
  consultations: [],
  appointments: [],
  affiliates: [],
  apiLogs: [],
  contactMessages: []
};

// Mock API service
export const mockApiService = {
  // Authentication
  async login(credentials) {
    await delay(1000);
    const user = mockData.users.find(u => u.email === credentials.email);
    if (user) {
      return {
        success: true,
        data: {
          user,
          token: 'mock-jwt-token-' + Date.now()
        }
      };
    }
    throw new Error('Credenciales inválidas');
  },

  async register(userData) {
    await delay(1000);
    const newUser = {
      id: mockData.users.length + 1,
      ...userData,
      role: 'client',
      credits: 3,
      createdAt: new Date().toISOString()
    };
    mockData.users.push(newUser);
    return {
      success: true,
      data: {
        user: newUser,
        token: 'mock-jwt-token-' + Date.now()
      }
    };
  },

  // Data operations
  async getAll(endpoint) {
    await delay(500);
    const collection = endpoint.split('?')[0];
    return {
      success: true,
      data: mockData[collection] || []
    };
  },

  async getById(endpoint, id) {
    await delay(300);
    const collection = endpoint;
    const item = mockData[collection]?.find(item => item.id === parseInt(id));
    return {
      success: true,
      data: item || null
    };
  },

  async create(endpoint, data) {
    await delay(800);
    const collection = endpoint;
    if (!mockData[collection]) {
      mockData[collection] = [];
    }
    
    const newItem = {
      id: mockData[collection].length + 1,
      ...data,
      createdAt: new Date().toISOString()
    };
    
    mockData[collection].push(newItem);
    return {
      success: true,
      data: newItem
    };
  },

  async update(endpoint, id, data) {
    await delay(600);
    const collection = endpoint;
    const index = mockData[collection]?.findIndex(item => item.id === parseInt(id));
    if (index !== -1) {
      mockData[collection][index] = {
        ...mockData[collection][index],
        ...data,
        updatedAt: new Date().toISOString()
      };
      return {
        success: true,
        data: mockData[collection][index]
      };
    }
    throw new Error('Item no encontrado');
  },

  async delete(endpoint, id) {
    await delay(400);
    const collection = endpoint;
    const index = mockData[collection]?.findIndex(item => item.id === parseInt(id));
    if (index !== -1) {
      const deleted = mockData[collection].splice(index, 1)[0];
      return {
        success: true,
        data: deleted
      };
    }
    throw new Error('Item no encontrado');
  }
};

// Mock external API service
export const mockExternalApiService = {
  async geminiChat(message, context = {}) {
    await delay(2000);
    return {
      status: 'success',
      data: {
        response: `Esta es una respuesta simulada de IA para: "${message}". En un entorno real, esto sería procesado por Google Gemini.`,
        confidence: 0.95,
        tokens_used: 150
      }
    };
  },

  async mcpRequest(endpoint, data = {}) {
    await delay(1000);
    return {
      status: 'success',
      data: {
        result: 'MCP request simulado exitoso',
        endpoint,
        processedData: data
      }
    };
  },

  async apiFastRequest(service, params = {}) {
    await delay(800);
    return {
      status: 'success',
      data: {
        service,
        result: 'APIFast request simulado',
        params
      }
    };
  },

  async verifyApiStatus(apiId) {
    await delay(500);
    const statuses = ['healthy', 'warning', 'error'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
      status: 'success',
      data: {
        apiId,
        status: randomStatus,
        responseTime: Math.floor(Math.random() * 2000) + 100,
        lastCheck: new Date().toISOString()
      }
    };
  },

  async sendWhatsAppMessage(to, message, type = 'text') {
    await delay(1500);
    return {
      status: 'success',
      data: {
        messageId: 'mock-msg-' + Date.now(),
        to,
        message,
        type,
        sent: true
      }
    };
  },

  async processPayment(paymentData) {
    await delay(3000);
    const success = Math.random() > 0.1; // 90% success rate
    
    if (success) {
      return {
        status: 'success',
        data: {
          transactionId: 'mock-tx-' + Date.now(),
          amount: paymentData.amount,
          currency: paymentData.currency || 'USD',
          status: 'completed',
          processedAt: new Date().toISOString()
        }
      };
    } else {
      throw new Error('Pago rechazado - Simulación de error');
    }
  }
};

// Mock analytics service
export const mockAnalyticsService = {
  async trackEvent(event, properties = {}) {
    await delay(200);
    console.log('📊 Analytics Event:', event, properties);
    return {
      success: true,
      eventId: 'mock-event-' + Date.now()
    };
  },

  async getDashboardMetrics(dateRange = '30d') {
    await delay(1000);
    return {
      success: true,
      data: {
        totalUsers: 1250,
        totalRevenue: 45600,
        totalCourses: 25,
        totalConsultations: 340,
        monthlyGrowth: 12.5,
        conversionRate: 3.2
      }
    };
  },

  async getUserActivity(userId, limit = 50) {
    await delay(800);
    return {
      success: true,
      data: Array.from({ length: Math.min(limit, 20) }, (_, i) => ({
        id: i + 1,
        userId,
        action: ['login', 'course_view', 'payment', 'consultation'][Math.floor(Math.random() * 4)],
        timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        details: { page: '/dashboard', duration: Math.floor(Math.random() * 300) }
      }))
    };
  }
};

// Mock notification service
export const mockNotificationService = {
  async sendEmail(to, subject, content, template = null) {
    await delay(1000);
    return {
      success: true,
      data: {
        messageId: 'mock-email-' + Date.now(),
        to,
        subject,
        sent: true
      }
    };
  },

  async sendSMS(to, message) {
    await delay(800);
    return {
      success: true,
      data: {
        messageId: 'mock-sms-' + Date.now(),
        to,
        message,
        sent: true
      }
    };
  },

  async createNotification(userId, title, message, type = 'info') {
    await delay(300);
    const notification = {
      id: Date.now(),
      userId,
      title,
      message,
      type,
      read: false,
      createdAt: new Date().toISOString()
    };
    
    if (!mockData.notifications) {
      mockData.notifications = [];
    }
    mockData.notifications.push(notification);
    
    return {
      success: true,
      data: notification
    };
  }
};

export default {
  ...mockApiService,
  external: mockExternalApiService,
  analytics: mockAnalyticsService,
  notifications: mockNotificationService
};
