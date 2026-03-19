import { apiClient } from '../api/client';
import { useQuery } from './useQuery';

export interface Transaction {
  id: string;
  date: string;
  agent_id: string;
  merchant: string;
  source: 'virtual_card' | 'onchain';
  amount: number;
  currency: string;
  status: 'settled' | 'pending' | 'rejected';
  triggered_rules?: string[]; // IDs of rules that fired
}

/**
 * Hook to poll the central transaction ledger.
 * Supports arbitrary optional query filters.
 */
export const useTransactions = (filters?: Record<string, string>) => {
  return useQuery<Transaction[]>(
    () => apiClient.get('/transactions', filters),
    // Refresh query when filters mathematically change
    [filters ? JSON.stringify(filters) : 'no-filters']
  );
};

/**
 * Hook to fetch the deeply nested details of a single transaction settlement.
 */
export const useTransactionDetails = (txId: string) => {
  return useQuery<Transaction>(
    () => apiClient.get(`/transactions/${txId}`),
    [txId]
  );
};
