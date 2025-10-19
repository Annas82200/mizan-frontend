/**
 * Authentication Service
 * Production-ready authentication service following AGENT_CONTEXT_ULTIMATE.md requirements
 */

import { z } from 'zod';
import apiClient from '../lib/api-client';

// Validation schemas
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  success: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
    tenantId?: string;
  };
  token?: string;
  message?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  tenantId?: string;
}

class AuthService {
  private readonly apiUrl: string;

  constructor() {
    this.apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  }

  /**
   * Login user with email and password
   * Implements proper error handling as per AGENT_CONTEXT_ULTIMATE.md
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Validate input
      const validatedData = loginSchema.parse(credentials);

      const response = await fetch(`${this.apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Login failed');
      }

      // Store auth token and set it in API client
      if (data.token) {
        localStorage.setItem('mizan_auth_token', data.token);
        localStorage.setItem('mizan_user', JSON.stringify(data.user));
        // Set token in API client for subsequent requests
        apiClient.setToken(data.token);
      }

      return {
        success: true,
        user: data.user,
        token: data.token,
      };
    } catch (error) {
      console.error('Login error:', error);
      
      if (error instanceof z.ZodError) {
        return {
          success: false,
          message: error.errors[0].message,
        };
      }

      if (error instanceof Error) {
        return {
          success: false,
          message: error.message,
        };
      }

      return {
        success: false,
        message: 'An unexpected error occurred during login',
      };
    }
  }

  /**
   * Register new user
   * Implements proper validation and error handling
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      // Validate input
      const validatedData = registerSchema.parse(data);

      const response = await fetch(`${this.apiUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: validatedData.name,
          email: validatedData.email,
          password: validatedData.password,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || responseData.message || 'Registration failed');
      }

      // Store auth token and set it in API client
      if (responseData.token) {
        localStorage.setItem('mizan_auth_token', responseData.token);
        localStorage.setItem('mizan_user', JSON.stringify(responseData.user));
        // Set token in API client for subsequent requests
        apiClient.setToken(responseData.token);
      }

      return {
        success: true,
        user: responseData.user,
        token: responseData.token,
      };
    } catch (error) {
      console.error('Registration error:', error);
      
      if (error instanceof z.ZodError) {
        return {
          success: false,
          message: error.errors[0].message,
        };
      }

      if (error instanceof Error) {
        return {
          success: false,
          message: error.message,
        };
      }

      return {
        success: false,
        message: 'An unexpected error occurred during registration',
      };
    }
  }

  /**
   * Initialize authentication from stored token
   * Should be called on app initialization
   */
  initializeAuth() {
    try {
      const token = localStorage.getItem('mizan_auth_token');
      if (token) {
        apiClient.setToken(token);
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
    }
  }

  /**
   * Logout user
   * Clears authentication data from localStorage
   */
  async logout(): Promise<void> {
    try {
      const token = localStorage.getItem('mizan_auth_token');
      
      if (token) {
        // Notify backend about logout
        await fetch(`${this.apiUrl}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local storage and API client token
      localStorage.removeItem('mizan_auth_token');
      localStorage.removeItem('mizan_user');
      apiClient.setToken(null);
    }
  }

  /**
   * Get current authenticated user
   */
  getCurrentUser(): User | null {
    try {
      const userStr = localStorage.getItem('mizan_user');
      if (!userStr) return null;
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('mizan_auth_token');
  }

  /**
   * Get auth token
   */
  getToken(): string | null {
    return localStorage.getItem('mizan_auth_token');
  }

  /**
   * Verify token validity
   */
  async verifyToken(): Promise<boolean> {
    try {
      const token = this.getToken();
      if (!token) return false;

      const response = await fetch(`${this.apiUrl}/api/auth/verify`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        // Token is invalid, clear auth data
        await this.logout();
        return false;
      }

      return true;
    } catch (error) {
      console.error('Token verification error:', error);
      return false;
    }
  }

  /**
   * Refresh authentication token
   */
  async refreshToken(): Promise<boolean> {
    try {
      const token = this.getToken();
      if (!token) return false;

      const response = await fetch(`${this.apiUrl}/api/auth/refresh`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('Token refresh failed:', response.status, response.statusText);
        return false;
      }

      const data = await response.json();
      if (data.token) {
        localStorage.setItem('mizan_auth_token', data.token);
        localStorage.setItem('mizan_user', JSON.stringify(data.user));
        // Update API client token
        apiClient.setToken(data.token);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Token refresh error:', error);
      return false;
    }
  }
}

// Export singleton instance
const authService = new AuthService();
export default authService;

// Export convenience functions
export const login = (credentials: LoginCredentials) => authService.login(credentials);
export const register = (data: RegisterData) => authService.register(data);
export const logout = () => authService.logout();
export const getCurrentUser = () => authService.getCurrentUser();
export const isAuthenticated = () => authService.isAuthenticated();
export const getToken = () => authService.getToken();
export const verifyToken = () => authService.verifyToken();
export const refreshToken = () => authService.refreshToken();
