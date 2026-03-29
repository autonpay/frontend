import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../api/client';

export interface User {
  id: string;
  email: string;
  name: string;
  organizationName: string;
  organizationId: string;
  role: string;
}

export interface Organization {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    organization: Organization;
    token: string;
  };
  message: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  organizationName: string;
  organizationEmail?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

/**
 * Authentication & Identity Hooks via TanStack Query
 */

export const useLogin = () => {
  return useMutation({
    mutationFn: (payload: LoginPayload) => apiClient.post<AuthResponse>('/auth/login', payload),
    meta: {
      successMessage: 'Welcome back! Terminal session active.',
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => apiClient.post<AuthResponse>('/auth/register', payload),
    meta: {
      successMessage: 'Organization registered. Bootstrapping workspace...',
    },
  });
};

export const useMe = () => {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => apiClient.get<{ success: boolean; data: User }>('/auth/me'),
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (payload: { oldPassword?: string; newPassword: string }) => 
      apiClient.post<{ success: boolean; message: string }>('/auth/change-password', payload),
    meta: {
      successMessage: 'Security key updated.',
    },
  });
};

export interface ApiKey {
  id: string;
  name: string;
  key_preview: string;
  created_at: string;
  last_used?: string;
}

export const useApiKeys = () => {
  return useQuery({
    queryKey: ['auth', 'api-keys'],
    queryFn: () => apiClient.get<{ success: boolean; data: ApiKey[] }>('/auth/api-keys'),
  });
};

export const useCreateApiKey = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { name: string }) => 
      apiClient.post<{ success: boolean; data: ApiKey }>('/auth/api-keys', payload),
    meta: {
      successMessage: 'Operational API Key generated.',
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'api-keys'] });
    },
  });
};

export const useDeleteApiKey = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiClient.delete<{ success: boolean; message: string }>(`/auth/api-keys/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'api-keys'] });
    },
  });
};
