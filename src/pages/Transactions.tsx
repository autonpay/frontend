import React from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Filter, Download, ArrowUpRight, Search, FileText, CreditCard, Link } from 'lucide-react';
import './Transactions.css';

const transactionsData = [
  {
    id: 'tx_98f21a',
    date: 'Oct 24, 2026',
    agent: 'Cloud Infrastructure',
    merchant: 'AWS Web Services',
    amount: 1450.00,
    currency: 'USDC',
    source: 'onchain',
    status: 'settled',
    rule: 'AWS Whitelist'
  },
  {
    id: 'tx_77b49c',
    date: 'Oct 24, 2026',
    agent: 'Marketing Ad Spender',
    merchant: 'X Ads',
    amount: 45.00,
    currency: 'USD',
    source: 'virtual_card',
    status: 'settled',
    rule: 'Daily Limit'
  },
  {
    id: 'tx_44v99k',
    date: 'Oct 23, 2026',
    agent: 'OpenAI API Sync',
    merchant: 'OpenAI',
    amount: 512.40,
    currency: 'USD',
    source: 'virtual_card',
    status: 'pending',
    rule: 'Velocity Check'
  },
  {
    id: 'tx_21z88m',
    date: 'Oct 23, 2026',
    agent: 'Design Subscriptions',
    merchant: 'Midjourney',
    amount: 60.00,
    currency: 'USDC',
    source: 'onchain',
    status: 'rejected',
    rule: 'Insufficient Balance'
  },
  {
    id: 'tx_99q11b',
    date: 'Oct 22, 2026',
    agent: 'Freelancer Payments',
    merchant: '0x8f...39aB',
    amount: 2500.00,
    currency: 'USDC',
    source: 'onchain',
    status: 'settled',
    rule: 'Approval Over $500'
  }
];

export const Transactions: React.FC = () => {
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
                <th>Initiated By</th>
                <th>Destination / Merchant</th>
                <th>Source</th>
                <th>Amount</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {transactionsData.map(tx => (
                <tr key={tx.id}>
                  <td className="tx-id">
                    <FileText size={14} className="icon-muted" />
                    {tx.id}
                  </td>
                  <td className="tx-date">{tx.date}</td>
                  <td className="tx-agent">{tx.agent}</td>
                  <td className="tx-merchant">
                    <span className="merchant-name">{tx.merchant}</span>
                    <span className="tx-rule" title="Triggered Rule">↳ {tx.rule}</span>
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
            </tbody>
          </table>
        </div>
        
        <div className="transactions-footer">
          <span className="results-count">Showing 5 of 142 transactions</span>
          <div className="pagination">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
