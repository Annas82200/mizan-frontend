/**
 * Authentication Service
 * Production-ready authentication service following AGENT_CONTEXT_ULTIMATE.md requirements
 */

import { z } from 'zod';

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
        credentials: 'include', // ✅ PRODUCTION: Include httpOnly cookies
        body: JSON.stringify(validatedData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Login failed');
      }

      // ✅ PRODUCTION: Token now stored in httpOnly cookie by backend
      // Only store non-sensitive user info in localStorage
      if (data.user) {
        localStorage.setItem('mizan_user', JSON.stringify(data.user));
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
        credentials: 'include', // ✅ PRODUCTION: Include httpOnly cookies
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

      // ✅ PRODUCTION: Token now stored in httpOnly cookie by backend
      // Only store non-sensitive user info in localStorage
      if (responseData.user) {
        localStorage.setItem('mizan_user', JSON.stringify(responseData.user));
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
   * ✅ PRODUCTION: No longer needed - token is in httpOnly cookie
   * Kept for backward compatibility but does nothing
   */
  initializeAuth() {
    // No-op: Token is now in httpOnly cookie, managed by browser
  }

  /**
   * Logout user
   * ✅ PRODUCTION: Clears httpOnly cookie on backend, clears localStorage
   */
  async logout(): Promise<void> {
    try {
      // Notify backend to clear httpOnly cookie
      await fetch(`${this.apiUrl}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include', // ✅ PRODUCTION: Send cookie to backend
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear user info from localStorage
      localStorage.removeItem('mizan_user');
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
   * ✅ PRODUCTION: Check if user info exists (token is in httpOnly cookie)
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('mizan_user');
  }

  /**
   * Get auth token
   * ✅ PRODUCTION: Token is in httpOnly cookie, not accessible from JavaScript
   * Returns null for backward compatibility
   */
  getToken(): string | null {
    return null; // Token is in httpOnly cookie, not accessible
  }

  /**
   * Verify token validity
   * ✅ PRODUCTION: Token sent automatically via httpOnly cookie
   */
  async verifyToken(): Promise<boolean> {
    try {
      if (!this.isAuthenticated()) return false;

      const response = await fetch(`${this.apiUrl}/api/auth/verify`, {
        method: 'GET',
        credentials: 'include', // ✅ PRODUCTION: Send httpOnly cookie
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
   * ✅ PRODUCTION: Token sent/received automatically via httpOnly cookie
   */
  async refreshToken(): Promise<boolean> {
    try {
      if (!this.isAuthenticated()) return false;

      const response = await fetch(`${this.apiUrl}/api/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // ✅ PRODUCTION: Send/receive httpOnly cookie
      });

      if (!response.ok) {
        console.error('Token refresh failed:', response.status, response.statusText);
        return false;
      }

      const data = await response.json();
      if (data.user) {
        // Update user info in localStorage (token is in httpOnly cookie)
        localStorage.setItem('mizan_user', JSON.stringify(data.user));
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
