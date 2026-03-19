import { apiClient } from '../api/client';
import { useQuery, useMutation } from './useQuery';

export interface Rule {
  id: string;
  name: string;
  description: string;
  type: 'velocity_check' | 'merchant_whitelist' | 'geo_fence' | 'time_block' | 'amount_ceiling';
  scope: string; /* Global vs Specific Agent IDs */
  status: 'enabled' | 'disabled';
  config: Record<string, any>; // Specific rule parameters
}

/**
 * Hook to retrieve all active and disabled spend logic gates.
 */
export const useRules = () => {
  return useQuery<Rule[]>(() => apiClient.get('/rules'));
};

export interface CreateRulePayload {
  name: string;
  description: string;
  type: string;
  scope: string;
  config: Record<string, any>;
}

/**
 * Hook to inject deterministic business rules into the Auton engine.
 */
export const useCreateRule = () => {
  return useMutation<CreateRulePayload, Rule>((data) => 
    apiClient.post('/rules', data)
  );
};
