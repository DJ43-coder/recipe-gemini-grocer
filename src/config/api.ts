// API Configuration
// Update this to point to your backend API endpoint
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    ME: '/api/auth/me',
  },
  // Product endpoints
  PRODUCTS: {
    LIST: '/api/products',
    CREATE: '/api/products',
    UPDATE: (id: string) => `/api/products/${id}`,
    DELETE: (id: string) => `/api/products/${id}`,
  },
  // Recipe endpoints
  RECIPES: {
    LIST: '/api/recipes',
    CREATE: '/api/recipes',
    UPDATE: (id: string) => `/api/recipes/${id}`,
    DELETE: (id: string) => `/api/recipes/${id}`,
  },
  // Order endpoints
  ORDERS: {
    LIST: '/api/orders',
    CREATE: '/api/orders',
    DETAIL: (id: string) => `/api/orders/${id}`,
    CART: '/api/orders/cart/items',
  },
  // Admin endpoints
  ADMIN: {
    ORDERS: '/api/admin/orders',
    UPDATE_ORDER_STATUS: (id: string) => `/api/admin/orders/${id}/status`,
  },
} as const;
