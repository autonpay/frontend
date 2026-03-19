import { apiClient } from '../api/client';
import { useQuery, useMutation } from './useQuery';

export interface Agent {
  id: string;
  name: string;
  status: 'active' | 'suspended';
  created_at: string;
  metadata?: Record<string, any>;
}

export interface AgentBalance {
  onchain: number;
  virtual: number;
  currency: string;
}

/**
 * Hook to retrieve all provisioned AI Agents.
 */
export const useAgents = () => {
  return useQuery<Agent[]>(() => apiClient.get('/agents'));
};

/**
 * Hook to fetch the specific balance split (On-chain vs Marqeta Virtual Cards)
 * for a specific agent ID.
 */
export const useAgentBalance = (id: string) => {
  return useQuery<AgentBalance>(() => apiClient.get(`/agents/${id}/balance`), [id]);
};

export interface CreateAgentPayload {
  name: string;
  metadata?: Record<string, any>;
}

/**
 * Hook to provision a new agent securely via the robust X402 settlement backend.
 */
export const useCreateAgent = () => {
  return useMutation<CreateAgentPayload, Agent>((data) => 
    apiClient.post('/agents', data)
  );
};

export interface SpendPayload {
  amount: number;
  currency: string;
  merchant: string;
  metadata?: Record<string, any>;
}

export interface SpendResponse {
  transaction_id: string;
  status: 'pending' | 'settled' | 'rejected';
}

/**
 * Hook allowing an agent to request a deterministic spend authorization.
 */
export const useRequestSpend = (id: string) => {
  return useMutation<SpendPayload, SpendResponse>((data) => 
    apiClient.post(`/agents/${id}/spend`, data)
  );
};
