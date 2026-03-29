import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api/client';

export interface Transaction {
  id: string;
  date: string;
  agent_id: string;
  merchant: string;
  source: 'virtual_card' | 'onchain';
  amount: number;
  currency: string;
  status: 'settled' | 'pending' | 'rejected';
  triggered_rules?: string[];
}

/**
 * Transaction Ledger Hooks via TanStack Query
 */

export const useTransactions = (filters?: Record<string, string>) => {
  return useQuery({
    queryKey: ['transactions', filters],
    queryFn: () => apiClient.get<{ success: boolean; data: Transaction[] }>('/transactions', filters),
  });
};

export const useTransactionDetails = (txId: string) => {
  return useQuery({
    queryKey: ['transactions', txId],
    queryFn: () => apiClient.get<{ success: boolean; data: Transaction }>(`/transactions/${txId}`),
    enabled: !!txId,
  });
};
