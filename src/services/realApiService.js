// Real API Service - Production Ready with MCP Integration
import axios from 'axios';

// Production API Configuration
const API_CONFIG = {
  baseURL: window.location.hostname === 'localhost' 
    ? 'http://localhost:8787/api' 
    : 'https://api.abogadowilson.com/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

// Create axios instance
const api = axios.create(API_CONFIG);

// Request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication Services
export const authService = {
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      const { token, user } = response.data;
      
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return { success: true, data: { token, user } };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error de autenticación' 
      };
    }
  },

  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error en registro' 
      };
    }
  },

  async logout() {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      return { success: true };
    } catch (error) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      return { success: true };
    }
  },

  async refreshToken() {
    try {
      const response = await api.post('/auth/refresh');
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      return { success: true, data: { token } };
    } catch (error) {
      return { success: false, error: 'Token refresh failed' };
    }
  }
};

// User Management Services
export const userService = {
  async getProfile() {
    try {
      const response = await api.get('/users/profile');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  },

  async updateProfile(profileData) {
    try {
      const response = await api.put('/users/profile', profileData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  },

  async getUsers(params = {}) {
    try {
      const response = await api.get('/users', { params });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  }
};

// Course Services
export const courseService = {
  async getCourses() {
    try {
      const response = await api.get('/courses');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  },

  async getCourse(id) {
    try {
      const response = await api.get(`/courses/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  },

  async enrollCourse(courseId) {
    try {
      const response = await api.post(`/courses/${courseId}/enroll`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  },

  async updateProgress(courseId, lessonId, progress) {
    try {
      const response = await api.put(`/courses/${courseId}/lessons/${lessonId}/progress`, {
        progress
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  }
};

// Payment Services
export const paymentService = {
  async createPayment(paymentData) {
    try {
      const response = await api.post('/payments/create', paymentData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  },

  async confirmPayment(paymentId, confirmationData) {
    try {
      const response = await api.post(`/payments/${paymentId}/confirm`, confirmationData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  },

  async getPaymentHistory() {
    try {
      const response = await api.get('/payments/history');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  }
};

// MCP Integration Services
const mcpService = {
  async connectMCP(mcpConfig) {
    try {
      const response = await api.post('/mcp/connect', mcpConfig);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  },

  async executeMCPCommand(command, params) {
    try {
      const response = await api.post('/mcp/execute', { command, params });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  },

  async getMCPStatus() {
    try {
      const response = await api.get('/mcp/status');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  },

  async listMCPResources() {
    try {
      const response = await api.get('/mcp/resources');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  }
};

// AI Integration Services (Gemini)
const aiService = {
  async chatWithAI(message, context = {}) {
    try {
      const response = await api.post('/ai/chat', { message, context });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  },

  async generateLegalDocument(template, data) {
    try {
      const response = await api.post('/ai/generate-document', { template, data });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  },

  async analyzeLegalCase(caseData) {
    try {
      const response = await api.post('/ai/analyze-case', caseData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  }
};

// WhatsApp Integration
export const whatsappService = {
  async sendMessage(phoneNumber, message) {
    try {
      const response = await api.post('/whatsapp/send', { phoneNumber, message });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  },

  async getMessages() {
    try {
      const response = await api.get('/whatsapp/messages');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  }
};

// Consultation Services
export const consultationService = {
  async createConsultation(consultationData) {
    try {
      const response = await api.post('/consultations', consultationData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  },

  async getConsultations() {
    try {
      const response = await api.get('/consultations');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  },

  async updateConsultation(id, updateData) {
    try {
      const response = await api.put(`/consultations/${id}`, updateData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  }
};

// Analytics Services
export const analyticsService = {
  async trackEvent(eventName, properties) {
    try {
      const response = await api.post('/analytics/track', { eventName, properties });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  },

  async getDashboardStats() {
    try {
      const response = await api.get('/analytics/dashboard');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  }
};

// File Upload Services
export const fileService = {
  async uploadFile(file, type = 'document') {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      const response = await api.post('/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  },

  async deleteFile(fileId) {
    try {
      const response = await api.delete(`/files/${fileId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  }
};

// Main Data Service Export
export const dataService = {
  // Authentication
  login: authService.login,
  register: authService.register,
  logout: authService.logout,
  refreshToken: authService.refreshToken,

  // Users
  getProfile: userService.getProfile,
  updateProfile: userService.updateProfile,
  getUsers: userService.getUsers,

  // Courses
  getCourses: courseService.getCourses,
  getCourse: courseService.getCourse,
  enrollCourse: courseService.enrollCourse,
  updateProgress: courseService.updateProgress,

  // Payments
  createPayment: paymentService.createPayment,
  confirmPayment: paymentService.confirmPayment,
  getPaymentHistory: paymentService.getPaymentHistory,

  // Consultations
  createConsultation: consultationService.createConsultation,
  getConsultations: consultationService.getConsultations,
  updateConsultation: consultationService.updateConsultation,

  // File operations
  uploadFile: fileService.uploadFile,
  deleteFile: fileService.deleteFile
};

// External API Services
export const externalApiService = {
  ai: aiService,
  mcp: mcpService,
  whatsapp: whatsappService
};

// Export individual services
export {
  dataService,
  authService,
  consultationService,
  externalApiService,
  aiService,
  mcpService,
  whatsappService
};

// Default export
export default {
  ...dataService,
  external: externalApiService,
  analytics: analyticsService
};
