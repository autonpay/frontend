import React from 'react';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { useTransactions } from '../../hooks/useTransactions';
import { 
  ArrowUpRight, 
  Search, 
  Filter, 
  Download, 
  FileText,
  Link,
  CreditCard
} from 'lucide-react';
import './Transactions.css';

export const Transactions: React.FC = () => {
  const { data: txQuery, isLoading } = useTransactions();
  const transactions = txQuery?.data || [];

  return (
    <div className="transactions-container">
      <div className="transactions-header">
        <div className="header-titles">
          <h1>Financial Ledger</h1>
          <span className="subtitle">Track AI spending, verify smart-contract settlements, and monitor virtual card usage.</span>
        </div>
        <div className="header-actions">
           <Button variant="outline" size="sm"><Download size={16} /> Export CSV</Button>
        </div>
      </div>

      <Card className="transactions-card" noPadding>
        <div className="transactions-toolbar">
          <div className="toolbar-search">
            <Search size={16} className="search-icon" />
            <input type="text" placeholder="Search by TxID, Merchant, or Agent..." />
          </div>
          <div className="toolbar-filters">
            <Button variant="secondary" size="sm"><Filter size={14}/> Status</Button>
            <Button variant="secondary" size="sm"><Filter size={14}/> Source</Button>
            <Button variant="secondary" size="sm"><Filter size={14}/> Time Span</Button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="auton-table table-hover">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Date</th>
                <th>Destination / Merchant</th>
                <th>Source</th>
                <th>Amount</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {isLoading && transactions.length === 0 && (
                <tr>
                   <td colSpan={7} className="loading-row">Syncing transactions from ledger...</td>
                </tr>
              )}
              {transactions.map(tx => (
                <tr key={tx.id}>
                  <td className="tx-id">
                    <FileText size={14} className="icon-muted" />
                    {tx.id.substring(0, 8)}...
                  </td>
                  <td className="tx-date">{new Date(tx.date).toLocaleDateString()}</td>
                  <td className="tx-merchant">
                    <span className="merchant-name">{tx.merchant}</span>
                  </td>
                  <td>
                    {tx.source === 'onchain' ? (
                      <span className="source-badge onchain"><Link size={12}/> X402 Base</span>
                    ) : (
                      <span className="source-badge card"><CreditCard size={12}/> Marqeta Card</span>
                    )}
                  </td>
                  <td className="tx-amount">
                    ${tx.amount.toFixed(2)} <span className="currency">{tx.currency}</span>
                  </td>
                  <td>
                    <Badge 
                      variant={
                        tx.status === 'settled' ? 'success' : 
                        tx.status === 'pending' ? 'warning' : 'danger'
                      }
                    >
                      {tx.status}
                    </Badge>
                  </td>
                  <td className="tx-actions">
                    <Button variant="ghost" size="sm"><ArrowUpRight size={16} /></Button>
                  </td>
                </tr>
              ))}
              {transactions.length === 0 && !isLoading && (
                <tr>
                   <td colSpan={7} className="empty-row">No transactions found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="transactions-footer">
          <span className="results-count">Showing {transactions.length} transactions</span>
          <div className="pagination">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
