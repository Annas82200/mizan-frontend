import { getAuth } from "@/lib/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

interface RequestOptions extends RequestInit {
  requireAuth?: boolean;
}

class APIClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async getHeaders(requireAuth: boolean = true): Promise<Headers> {
    const headers = new Headers({
      "Content-Type": "application/json",
    });

    if (requireAuth) {
      const auth = getAuth();
      if (auth?.token) {
        headers.set("Authorization", `Bearer ${auth.token}`);
      }
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: response.statusText,
        status: response.status,
      }));
      throw new APIError(error.message || "API request failed", response.status, error);
    }

    // Handle empty responses
    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  }

  async get<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const headers = await this.getHeaders(options.requireAuth);
    
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      method: "GET",
      headers,
    });

    return this.handleResponse<T>(response);
  }

  async post<T = any>(endpoint: string, data?: any, options: RequestOptions = {}): Promise<T> {
    const headers = await this.getHeaders(options.requireAuth);
    
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      method: "POST",
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  async put<T = any>(endpoint: string, data?: any, options: RequestOptions = {}): Promise<T> {
    const headers = await this.getHeaders(options.requireAuth);
    
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      method: "PUT",
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  async patch<T = any>(endpoint: string, data?: any, options: RequestOptions = {}): Promise<T> {
    const headers = await this.getHeaders(options.requireAuth);
    
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      method: "PATCH",
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  async delete<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const headers = await this.getHeaders(options.requireAuth);
    
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      method: "DELETE",
      headers,
    });

    return this.handleResponse<T>(response);
  }

  // File upload support
  async upload<T = any>(
    endpoint: string, 
    file: File, 
    additionalData?: Record<string, any>,
    options: RequestOptions = {}
  ): Promise<T> {
    const formData = new FormData();
    formData.append("file", file);

    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, typeof value === "object" ? JSON.stringify(value) : value);
      });
    }

    const headers = await this.getHeaders(options.requireAuth);
    headers.delete("Content-Type"); // Let browser set it for FormData

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      method: "POST",
      headers,
      body: formData,
    });

    return this.handleResponse<T>(response);
  }

  // WebSocket connection
  createWebSocket(endpoint: string, protocols?: string | string[]): WebSocket {
    const wsURL = this.baseURL.replace(/^http/, "ws");
    return new WebSocket(`${wsURL}${endpoint}`, protocols);
  }
}

export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = "APIError";
  }
}

export const apiClient = new APIClient(API_BASE_URL);
