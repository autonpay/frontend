import axios, { AxiosError } from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/v1';

export class ApiError extends Error {
  public status: number;
  public data: any;

  constructor(status: number, message: string, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

// Create the axios instance
const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Inject the auth token
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('auton_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Response interceptor: Unwrap and handle global errors
instance.interceptors.response.use(
  (response) => {
    // We return the actual JSON data back to hooks
    return response.data;
  },
  (error: AxiosError) => {
    if (error.response) {
      const { status, data }: { status: number, data: any } = error.response;
      
      // Auto-logout user if token expires
      if (status === 401) {
        localStorage.removeItem('auton_token');
        localStorage.removeItem('auton_user');
        window.location.href = '/login';
      }

      const errorMessage = data?.error || data?.message || error.message;
      return Promise.reject(new ApiError(status, errorMessage, data));
    }
    
    return Promise.reject(new ApiError(500, error.message));
  }
);

// Unified API Client definition
export const apiClient = {
  get: async <T>(endpoint: string, params?: Record<string, any>): Promise<T> => {
    const response = await instance.get<T>(endpoint, { params });
    return response as unknown as T;
  },

  post: async <T>(endpoint: string, body?: any): Promise<T> => {
    const response = await instance.post<T>(endpoint, body);
    return response as unknown as T;
  },

  put: async <T>(endpoint: string, body?: any): Promise<T> => {
    const response = await instance.put<T>(endpoint, body);
    return response as unknown as T;
  },

  delete: async <T>(endpoint: string): Promise<T> => {
    const response = await instance.delete<T>(endpoint);
    return response as unknown as T;
  }
};
