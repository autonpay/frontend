import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../api/client';

export interface Agent {
  id: string;
  name: string;
  status: 'active' | 'suspended';
  created_at: string;
  balance?: string;
  limit?: string;
  metadata?: Record<string, any>;
}

export interface AgentBalance {
  current: string;
  allocated: string;
}

/**
 * Agent Management Hooks via TanStack Query
 */

export const useAgents = () => {
  return useQuery({
    queryKey: ['agents'],
    queryFn: () => apiClient.get<{ success: boolean; data: Agent[] }>('/agents'),
  });
};

export const useAgentBalance = (id: string) => {
  return useQuery({
    queryKey: ['agents', id, 'balance'],
    queryFn: () => apiClient.get<{ success: boolean; data: AgentBalance }>(`/agents/${id}/balance`),
    enabled: !!id,
  });
};

export interface CreateAgentPayload {
  name: string;
  metadata?: Record<string, any>;
}

export const useCreateAgent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAgentPayload) => 
      apiClient.post<{ success: boolean; data: Agent }>('/agents', data),
    meta: {
      successMessage: 'Autonomous agent initialized successfully.',
      errorMessage: 'Failed to create agent. Check account balance.'
    },
    onSuccess: () => {
      // Invalidate and refetch agents list immediately
      queryClient.invalidateQueries({ queryKey: ['agents'] });
    },
  });
};
