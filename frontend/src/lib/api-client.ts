import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Log API configuration for debugging (only in development)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('[API Client] Base URL:', API_BASE_URL);
}

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable credentials for CORS
});

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage (client-side only)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('mizan_auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      // Log request details in development
      if (process.env.NODE_ENV === 'development') {
        console.log('[API Request]', config.method?.toUpperCase(), config.url, {
          hasToken: !!token,
          baseURL: config.baseURL
        });
      }
    }
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors with retry logic
apiClient.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      console.log('[API Response]', response.config.method?.toUpperCase(), response.config.url, response.status);
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as any;
    
    // Log error details for debugging
    if (typeof window !== 'undefined') {
      console.error('[API Error]', {
        url: error.config?.url,
        method: error.config?.method?.toUpperCase(),
        status: error.response?.status,
        message: error.message,
        baseURL: error.config?.baseURL
      });
    }

    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      // Prevent infinite loop
      if (!originalRequest._retry) {
        originalRequest._retry = true;

        // Clear token and redirect to login
        if (typeof window !== 'undefined') {
          console.warn('[Auth] Unauthorized - clearing token and redirecting to login');
          localStorage.removeItem('mizan_auth_token');
          localStorage.removeItem('mizan_user');
          
          // Only redirect if not already on login page
          if (!window.location.pathname.includes('/login')) {
            window.location.href = '/login';
          }
        }
      }
    }

    // Handle network errors (CORS, connection refused, etc.)
    if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
      console.error('[Network Error] Cannot connect to backend:', API_BASE_URL);
      console.error('[Network Error] Check if NEXT_PUBLIC_API_URL is configured correctly');
    }

    // Handle timeout errors
    if (error.code === 'ECONNABORTED') {
      console.error('[Timeout Error] Request took too long:', error.config?.url);
    }

    return Promise.reject(error);
  }
);

// API Methods
export const api = {
  // Auth
  auth: {
    login: (email: string, password: string) =>
      apiClient.post('/api/auth/login', { email, password }),
    register: (data: any) =>
      apiClient.post('/api/auth/register', data),
    logout: () =>
      apiClient.post('/api/auth/logout'),
    me: () =>
      apiClient.get('/api/auth/me'),
  },

  // Culture Analysis
  culture: {
    analyze: (tenantId: string, data: any) =>
      apiClient.post(`/api/culture/${tenantId}/analyze`, data),
    getReport: (tenantId: string, reportId: string) =>
      apiClient.get(`/api/culture/${tenantId}/reports/${reportId}`),
    getReports: (tenantId: string) =>
      apiClient.get(`/api/culture/${tenantId}/reports`),
  },

  // Structure Analysis
  structure: {
    analyze: (tenantId: string, data: any) =>
      apiClient.post(`/api/structure/${tenantId}/analyze`, data),
    getReport: (tenantId: string, reportId: string) =>
      apiClient.get(`/api/structure/${tenantId}/reports/${reportId}`),
  },

  // Admin
  admin: {
    getClients: () =>
      apiClient.get('/api/admin/clients'),
    getClientDetails: (clientId: string) =>
      apiClient.get(`/api/admin/clients/${clientId}`),
    updateClient: (clientId: string, data: any) =>
      apiClient.put(`/api/admin/clients/${clientId}`, data),
  },

  // SuperAdmin
  superadmin: {
    getAllClients: () =>
      apiClient.get('/api/superadmin/clients'),
    createClient: (data: any) =>
      apiClient.post('/api/superadmin/clients', data),
    getSystemMetrics: () =>
      apiClient.get('/api/superadmin/metrics'),
  },

  // Employees
  employees: {
    getAll: (tenantId: string) =>
      apiClient.get(`/api/admin/${tenantId}/employees`),
    getById: (tenantId: string, employeeId: string) =>
      apiClient.get(`/api/admin/${tenantId}/employees/${employeeId}`),
    create: (tenantId: string, data: any) =>
      apiClient.post(`/api/admin/${tenantId}/employees`, data),
    update: (tenantId: string, employeeId: string, data: any) =>
      apiClient.put(`/api/admin/${tenantId}/employees/${employeeId}`, data),
  },
};

// Helper function to set auth token
export const setAuthToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('mizan_auth_token', token);
  }
};

// Helper function to clear auth token
export const clearAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('mizan_auth_token');
  }
};

// Helper function to get current token
export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('mizan_auth_token');
  }
  return null;
};

export default apiClient;
