import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../api/client';

export interface Webhook {
  id: string;
  url: string;
  events: string[];
  status: 'active' | 'failing';
  secret_key_preview?: string;
  last_ping?: string;
}

/**
 * Webhook Infrastructure Hooks via TanStack Query
 */

export const useWebhooks = () => {
  return useQuery({
    queryKey: ['webhooks'],
    queryFn: () => apiClient.get<{ success: boolean; data: Webhook[] }>('/webhooks'),
  });
};

export interface RegisterWebhookPayload {
  url: string;
  events: string[];
}

export const useRegisterWebhook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RegisterWebhookPayload) => 
      apiClient.post<{ success: boolean; data: Webhook }>('/webhooks', data),
    meta: {
      successMessage: 'Infrastructure endpoint registered.',
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['webhooks'] });
    },
  });
};

export const useDeleteWebhook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string }) => 
      apiClient.delete<{ success: boolean; message: string }>(`/webhooks/${data.id}`),
    meta: {
      successMessage: 'Endpoint decommissioned.',
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['webhooks'] });
    },
  });
};
