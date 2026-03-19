import { apiClient } from '../api/client';
import { useQuery, useMutation } from './useQuery';

export interface Webhook {
  id: string;
  url: string;
  events: string[];
  status: 'active' | 'failing';
  secret_key_preview?: string;
  last_ping?: string;
}

/**
 * Hook to fetch registered endpoints from the Developer Settings.
 */
export const useWebhooks = () => {
  return useQuery<Webhook[]>(() => apiClient.get('/webhooks'));
};

export interface RegisterWebhookPayload {
  url: string;
  events: string[];
}

/**
 * Hook to register a new listener URL.
 */
export const useRegisterWebhook = () => {
  return useMutation<RegisterWebhookPayload, Webhook>((data) =>
    apiClient.post('/webhooks', data)
  );
};

export const useDeleteWebhook = () => {
  return useMutation<{ id: string }, { success: boolean }>((data) =>
    apiClient.delete(`/webhooks/${data.id}`)
  );
};
