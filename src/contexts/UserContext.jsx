import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { apiService } from '../services/apiService';

const UserContext = createContext();

// User state management
const initialState = {
  user: null,
  profile: null,
  credits: 0,
  tokens: 0,
  referrals: [],
  purchases: [],
  consultations: [],
  appointments: [],
  courses: [],
  ebooks: [],
  subscriptions: [],
  notifications: [],
  preferences: {
    theme: 'light',
    language: 'es',
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    privacy: {
      profileVisible: true,
      showActivity: false
    }
  },
  loading: false,
  error: null
};

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'SET_USER':
      return { 
        ...state, 
        user: action.payload, 
        loading: false, 
        error: null 
      };
    
    case 'SET_PROFILE':
      return { ...state, profile: action.payload };
    
    case 'UPDATE_CREDITS':
      return { ...state, credits: action.payload };
    
    case 'UPDATE_TOKENS':
      return { ...state, tokens: action.payload };
    
    case 'ADD_REFERRAL':
      return { 
        ...state, 
        referrals: [...state.referrals, action.payload] 
      };
    
    case 'SET_REFERRALS':
      return { ...state, referrals: action.payload };
    
    case 'ADD_PURCHASE':
      return { 
        ...state, 
        purchases: [action.payload, ...state.purchases] 
      };
    
    case 'SET_PURCHASES':
      return { ...state, purchases: action.payload };
    
    case 'ADD_CONSULTATION':
      return { 
        ...state, 
        consultations: [action.payload, ...state.consultations] 
      };
    
    case 'SET_CONSULTATIONS':
      return { ...state, consultations: action.payload };
    
    case 'ADD_APPOINTMENT':
      return { 
        ...state, 
        appointments: [action.payload, ...state.appointments] 
      };
    
    case 'SET_APPOINTMENTS':
      return { ...state, appointments: action.payload };
    
    case 'SET_COURSES':
      return { ...state, courses: action.payload };
    
    case 'SET_EBOOKS':
      return { ...state, ebooks: action.payload };
    
    case 'SET_SUBSCRIPTIONS':
      return { ...state, subscriptions: action.payload };
    
    case 'ADD_NOTIFICATION':
      return { 
        ...state, 
        notifications: [action.payload, ...state.notifications] 
      };
    
    case 'SET_NOTIFICATIONS':
      return { ...state, notifications: action.payload };
    
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(notif =>
          notif.id === action.payload ? { ...notif, read: true } : notif
        )
      };
    
    case 'UPDATE_PREFERENCES':
      return { 
        ...state, 
        preferences: { ...state.preferences, ...action.payload } 
      };
    
    case 'LOGOUT':
      return initialState;
    
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Load user data on mount
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const token = localStorage.getItem('authToken');
      if (!token) {
        dispatch({ type: 'SET_LOADING', payload: false });
        return;
      }

      // Load user profile
      const userData = await apiService.getUserProfile();
      dispatch({ type: 'SET_USER', payload: userData });
      dispatch({ type: 'SET_PROFILE', payload: userData.profile });
      dispatch({ type: 'UPDATE_CREDITS', payload: userData.credits || 0 });
      dispatch({ type: 'UPDATE_TOKENS', payload: userData.tokens || 0 });

      // Load user data in parallel
      const [
        referrals,
        purchases,
        consultations,
        appointments,
        courses,
        ebooks,
        subscriptions,
        notifications
      ] = await Promise.all([
        apiService.getUserReferrals().catch(() => []),
        apiService.getPurchaseHistory().catch(() => []),
        apiService.getUserConsultations().catch(() => []),
        apiService.getUserAppointments().catch(() => []),
        apiService.getUserCourses().catch(() => []),
        apiService.getUserEbooks().catch(() => []),
        apiService.getUserSubscriptions().catch(() => []),
        apiService.getUserNotifications().catch(() => [])
      ]);

      dispatch({ type: 'SET_REFERRALS', payload: referrals });
      dispatch({ type: 'SET_PURCHASES', payload: purchases });
      dispatch({ type: 'SET_CONSULTATIONS', payload: consultations });
      dispatch({ type: 'SET_APPOINTMENTS', payload: appointments });
      dispatch({ type: 'SET_COURSES', payload: courses });
      dispatch({ type: 'SET_EBOOKS', payload: ebooks });
      dispatch({ type: 'SET_SUBSCRIPTIONS', payload: subscriptions });
      dispatch({ type: 'SET_NOTIFICATIONS', payload: notifications });

    } catch (error) {
      console.error('Error loading user data:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const updateProfile = async (profileData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const updatedProfile = await apiService.updateUserProfile(profileData);
      dispatch({ type: 'SET_PROFILE', payload: updatedProfile });
      toast.success('Perfil actualizado correctamente');
      return updatedProfile;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      toast.error('Error al actualizar el perfil');
      throw error;
    }
  };

  const purchaseCredits = async (amount, paymentMethod) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const result = await apiService.purchaseCredits(amount, paymentMethod);
      dispatch({ type: 'UPDATE_CREDITS', payload: result.newBalance });
      dispatch({ type: 'ADD_PURCHASE', payload: result.purchase });
      toast.success(`${amount} créditos comprados exitosamente`);
      return result;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      toast.error('Error al comprar créditos');
      throw error;
    }
  };

  const purchaseTokens = async (amount, paymentMethod) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const result = await apiService.purchaseTokens(amount, paymentMethod);
      dispatch({ type: 'UPDATE_TOKENS', payload: result.newBalance });
      dispatch({ type: 'ADD_PURCHASE', payload: result.purchase });
      toast.success(`${amount} tokens comprados exitosamente`);
      return result;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      toast.error('Error al comprar tokens');
      throw error;
    }
  };

  const bookConsultation = async (consultationData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const consultation = await apiService.bookConsultation(consultationData);
      dispatch({ type: 'ADD_CONSULTATION', payload: consultation });
      dispatch({ type: 'UPDATE_CREDITS', payload: state.credits - 1 });
      toast.success('Consulta agendada exitosamente');
      return consultation;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      toast.error('Error al agendar consulta');
      throw error;
    }
  };

  const scheduleAppointment = async (appointmentData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const appointment = await apiService.scheduleAppointment(appointmentData);
      dispatch({ type: 'ADD_APPOINTMENT', payload: appointment });
      toast.success('Cita agendada exitosamente');
      return appointment;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      toast.error('Error al agendar cita');
      throw error;
    }
  };

  const purchaseProduct = async (productId, paymentData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const purchase = await apiService.purchaseProduct(productId, paymentData);
      dispatch({ type: 'ADD_PURCHASE', payload: purchase });
      
      // Update relevant collections based on product type
      if (purchase.product.type === 'course') {
        const courses = await apiService.getUserCourses();
        dispatch({ type: 'SET_COURSES', payload: courses });
      } else if (purchase.product.type === 'ebook') {
        const ebooks = await apiService.getUserEbooks();
        dispatch({ type: 'SET_EBOOKS', payload: ebooks });
      }
      
      toast.success('Producto comprado exitosamente');
      return purchase;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      toast.error('Error al comprar producto');
      throw error;
    }
  };

  const addReferral = async (email) => {
    try {
      const referral = await apiService.addReferral(email);
      dispatch({ type: 'ADD_REFERRAL', payload: referral });
      toast.success('Referido agregado exitosamente');
      return referral;
    } catch (error) {
      toast.error('Error al agregar referido');
      throw error;
    }
  };

  const updatePreferences = async (preferences) => {
    try {
      const updated = await apiService.updateUserPreferences(preferences);
      dispatch({ type: 'UPDATE_PREFERENCES', payload: updated });
      toast.success('Preferencias actualizadas');
      return updated;
    } catch (error) {
      toast.error('Error al actualizar preferencias');
      throw error;
    }
  };

  const markNotificationRead = (notificationId) => {
    dispatch({ type: 'MARK_NOTIFICATION_READ', payload: notificationId });
    apiService.markNotificationRead(notificationId).catch(console.error);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    dispatch({ type: 'LOGOUT' });
    toast.success('Sesión cerrada exitosamente');
  };

  const value = {
    ...state,
    // Actions
    loadUserData,
    updateProfile,
    purchaseCredits,
    purchaseTokens,
    bookConsultation,
    scheduleAppointment,
    purchaseProduct,
    addReferral,
    updatePreferences,
    markNotificationRead,
    logout,
    // Computed values
    unreadNotifications: state.notifications.filter(n => !n.read).length,
    totalSpent: state.purchases.reduce((sum, p) => sum + p.amount, 0),
    referralEarnings: state.referrals.reduce((sum, r) => sum + (r.earnings || 0), 0)
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
