const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

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

async function handleResponse<T>(response: Response): Promise<T> {
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    if (response.status === 401) {
      // Auto-logout user if token expires natively via localStorage removal
      localStorage.removeItem('auton_token');
      localStorage.removeItem('auton_user');
      window.location.href = '/login';
    }
    
    throw new ApiError(
      response.status,
      data?.error || data?.message || response.statusText,
      data
    );
  }

  return data as T;
}

const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('auton_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const apiClient = {
  get: async <T>(endpoint: string, params?: Record<string, string>): Promise<T> => {
    const url = new URL(`${BASE_URL}${endpoint}`);
    if (params) {
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    }
    
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        ...getAuthHeaders()
      },
    });
    return handleResponse<T>(response);
  },

  post: async <T>(endpoint: string, body?: any): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    return handleResponse<T>(response);
  },

  put: async <T>(endpoint: string, body?: any): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    return handleResponse<T>(response);
  },

  delete: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        ...getAuthHeaders()
      },
    });
    return handleResponse<T>(response);
  }
};
