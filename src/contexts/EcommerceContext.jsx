import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { apiService } from '../services/apiService';

const EcommerceContext = createContext();

const initialState = {
  cart: [],
  products: [],
  ebooks: [],
  courses: [],
  services: [],
  categories: [],
  wishlist: [],
  recentlyViewed: [],
  searchResults: [],
  filters: {
    category: '',
    priceRange: [0, 1000],
    rating: 0,
    availability: 'all'
  },
  loading: false,
  error: null,
  checkout: {
    step: 1,
    shippingInfo: null,
    paymentMethod: null,
    orderSummary: null
  }
};

const ecommerceReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    
    case 'SET_EBOOKS':
      return { ...state, ebooks: action.payload };
    
    case 'SET_COURSES':
      return { ...state, courses: action.payload };
    
    case 'SET_SERVICES':
      return { ...state, services: action.payload };
    
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => 
        item.id === action.payload.id && item.type === action.payload.type
      );
      
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id && item.type === action.payload.type
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => 
          !(item.id === action.payload.id && item.type === action.payload.type)
        )
      };
    
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id && item.type === action.payload.type
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0)
      };
    
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    
    case 'ADD_TO_WISHLIST':
      if (state.wishlist.some(item => 
        item.id === action.payload.id && item.type === action.payload.type
      )) {
        return state;
      }
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload]
      };
    
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(item =>
          !(item.id === action.payload.id && item.type === action.payload.type)
        )
      };
    
    case 'ADD_TO_RECENTLY_VIEWED':
      const filtered = state.recentlyViewed.filter(item =>
        !(item.id === action.payload.id && item.type === action.payload.type)
      );
      return {
        ...state,
        recentlyViewed: [action.payload, ...filtered].slice(0, 10)
      };
    
    case 'SET_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload };
    
    case 'UPDATE_FILTERS':
      return { 
        ...state, 
        filters: { ...state.filters, ...action.payload } 
      };
    
    case 'SET_CHECKOUT_STEP':
      return {
        ...state,
        checkout: { ...state.checkout, step: action.payload }
      };
    
    case 'SET_SHIPPING_INFO':
      return {
        ...state,
        checkout: { ...state.checkout, shippingInfo: action.payload }
      };
    
    case 'SET_PAYMENT_METHOD':
      return {
        ...state,
        checkout: { ...state.checkout, paymentMethod: action.payload }
      };
    
    case 'SET_ORDER_SUMMARY':
      return {
        ...state,
        checkout: { ...state.checkout, orderSummary: action.payload }
      };
    
    default:
      return state;
  }
};

export const EcommerceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ecommerceReducer, initialState);

  useEffect(() => {
    loadInitialData();
    loadCartFromStorage();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  const loadInitialData = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const [products, ebooks, courses, services, categories] = await Promise.all([
        apiService.getProducts().catch(() => []),
        apiService.getEbooks().catch(() => []),
        apiService.getCourses().catch(() => []),
        apiService.getServices().catch(() => []),
        apiService.getCategories().catch(() => [])
      ]);

      dispatch({ type: 'SET_PRODUCTS', payload: products });
      dispatch({ type: 'SET_EBOOKS', payload: ebooks });
      dispatch({ type: 'SET_COURSES', payload: courses });
      dispatch({ type: 'SET_SERVICES', payload: services });
      dispatch({ type: 'SET_CATEGORIES', payload: categories });
      
    } catch (error) {
      console.error('Error loading ecommerce data:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const loadCartFromStorage = () => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const cart = JSON.parse(savedCart);
        cart.forEach(item => {
          dispatch({ type: 'ADD_TO_CART', payload: item });
        });
      }
    } catch (error) {
      console.error('Error loading cart from storage:', error);
    }
  };

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
    toast.success(`${item.name} agregado al carrito`);
  };

  const removeFromCart = (item) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item });
    toast.success(`${item.name} removido del carrito`);
  };

  const updateCartQuantity = (item, quantity) => {
    if (quantity <= 0) {
      removeFromCart(item);
      return;
    }
    dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { ...item, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast.success('Carrito vaciado');
  };

  const addToWishlist = (item) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: item });
    toast.success(`${item.name} agregado a favoritos`);
  };

  const removeFromWishlist = (item) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: item });
    toast.success(`${item.name} removido de favoritos`);
  };

  const addToRecentlyViewed = (item) => {
    dispatch({ type: 'ADD_TO_RECENTLY_VIEWED', payload: item });
  };

  const searchProducts = async (query, filters = {}) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const results = await apiService.searchProducts(query, filters);
      dispatch({ type: 'SET_SEARCH_RESULTS', payload: results });
      return results;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      toast.error('Error en la búsqueda');
      return [];
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateFilters = (newFilters) => {
    dispatch({ type: 'UPDATE_FILTERS', payload: newFilters });
  };

  const processCheckout = async (orderData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const order = await apiService.createOrder({
        ...orderData,
        items: state.cart,
        total: getCartTotal()
      });
      
      dispatch({ type: 'CLEAR_CART' });
      dispatch({ type: 'SET_CHECKOUT_STEP', payload: 1 });
      
      toast.success('Orden procesada exitosamente');
      return order;
      
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      toast.error('Error al procesar la orden');
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const getCartTotal = () => {
    return state.cart.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const getCartItemsCount = () => {
    return state.cart.reduce((count, item) => count + item.quantity, 0);
  };

  const isInCart = (item) => {
    return state.cart.some(cartItem => 
      cartItem.id === item.id && cartItem.type === item.type
    );
  };

  const isInWishlist = (item) => {
    return state.wishlist.some(wishItem => 
      wishItem.id === item.id && wishItem.type === item.type
    );
  };

  const getProductById = (id, type = 'product') => {
    switch (type) {
      case 'ebook':
        return state.ebooks.find(item => item.id === id);
      case 'course':
        return state.courses.find(item => item.id === id);
      case 'service':
        return state.services.find(item => item.id === id);
      default:
        return state.products.find(item => item.id === id);
    }
  };

  const getFilteredProducts = () => {
    let filtered = [...state.products];
    
    if (state.filters.category) {
      filtered = filtered.filter(product => 
        product.category === state.filters.category
      );
    }
    
    if (state.filters.priceRange) {
      filtered = filtered.filter(product => 
        product.price >= state.filters.priceRange[0] && 
        product.price <= state.filters.priceRange[1]
      );
    }
    
    if (state.filters.rating > 0) {
      filtered = filtered.filter(product => 
        product.rating >= state.filters.rating
      );
    }
    
    if (state.filters.availability !== 'all') {
      filtered = filtered.filter(product => 
        product.availability === state.filters.availability
      );
    }
    
    return filtered;
  };

  const value = {
    ...state,
    // Actions
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    addToRecentlyViewed,
    searchProducts,
    updateFilters,
    processCheckout,
    loadInitialData,
    // Computed values
    cartTotal: getCartTotal(),
    cartItemsCount: getCartItemsCount(),
    filteredProducts: getFilteredProducts(),
    // Utilities
    isInCart,
    isInWishlist,
    getProductById,
    // Checkout actions
    setCheckoutStep: (step) => dispatch({ type: 'SET_CHECKOUT_STEP', payload: step }),
    setShippingInfo: (info) => dispatch({ type: 'SET_SHIPPING_INFO', payload: info }),
    setPaymentMethod: (method) => dispatch({ type: 'SET_PAYMENT_METHOD', payload: method }),
    setOrderSummary: (summary) => dispatch({ type: 'SET_ORDER_SUMMARY', payload: summary })
  };

  return (
    <EcommerceContext.Provider value={value}>
      {children}
    </EcommerceContext.Provider>
  );
};

export const useEcommerce = () => {
  const context = useContext(EcommerceContext);
  if (!context) {
    throw new Error('useEcommerce must be used within an EcommerceProvider');
  }
  return context;
};
