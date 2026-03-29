import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../api/client';

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
 * Hook to retrieve all active and disabled spend logic gates via TanStack Query.
 */
export const useRules = () => {
  return useQuery({
    queryKey: ['rules'],
    queryFn: () => apiClient.get<{ success: boolean; data: Rule[] }>('/rules'),
    meta: { errorMessage: 'Failed to fetch business rules.' }
  });
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRulePayload) => 
      apiClient.post<{ success: boolean; data: Rule }>('/rules', data),
    meta: {
      successMessage: 'Business rule deployed to engine.',
      errorMessage: 'Rule validation failed.'
    },
    onSuccess: () => {
      // Refresh the rules list instantly
      queryClient.invalidateQueries({ queryKey: ['rules'] });
    },
  });
};
