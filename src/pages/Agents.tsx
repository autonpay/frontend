import React from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Bot, Plus, Target, ShieldCheck, MoreVertical } from 'lucide-react';
import './Agents.css';

const agentsData = [
  { 
    id: 'agt_a15f', 
    name: 'OpenAI API Sync', 
    status: 'active', 
    limit: '$500/mo', 
    balance: '$397.76',
    rules: ['OpenAI Only', 'Velocity < 10/min']
  },
  { 
    id: 'agt_b22p', 
    name: 'AWS Compute Builder', 
    status: 'active', 
    limit: '$2,000/mo', 
    balance: '$1,751.84',
    rules: ['AWS Whitelist', 'Approval > $500']
  },
  { 
    id: 'agt_x89l', 
    name: 'Midjourney Design Bot', 
    status: 'paused', 
    limit: '$60/mo', 
    balance: '$0.00',
    rules: ['Subscription Only']
  },
  { 
    id: 'agt_v44c', 
    name: 'Marketing Ad Spender', 
    status: 'active', 
    limit: '$1,500/mo', 
    balance: '$645.70',
    rules: ['Google Ads', 'Meta Ads', 'Max $100/day']
  },
  { 
    id: 'agt_c91z', 
    name: 'Github Copilot Seats', 
    status: 'active', 
    limit: '$200/mo', 
    balance: '$160.00',
    rules: ['GitHub Only']
  },
  { 
    id: 'agt_d33m', 
    name: 'Discord Tip Bot', 
    status: 'active', 
    limit: '$100/mo', 
    balance: '$18.50',
    rules: ['Max $5/txn', 'Crypto Only']
  }
];

export const Agents: React.FC = () => {
  return (
    <div className="agents-container">
      <div className="agents-header">
        <div className="header-titles">
          <h1>AI Agents Directory</h1>
          <span className="subtitle">Manage instantiated agents, their wallets, and spending guardrails.</span>
        </div>
        <div className="header-actions">
           <Button variant="primary" size="md"><Plus size={16} /> Create Agent</Button>
        </div>
      </div>

      <div className="agents-grid">
        {agentsData.map(agent => (
          <Card key={agent.id} className="agent-card">
            <div className="agent-card-header">
              <div className="agent-icon-bg">
                <Bot size={20} className="agent-icon" />
              </div>
              <Button variant="ghost" size="sm" className="more-btn">
                <MoreVertical size={16} />
              </Button>
            </div>
            
            <div className="agent-info">
              <h3>{agent.name}</h3>
              <span className="agent-id">{agent.id}</span>
            </div>

            <div className="agent-metrics">
              <div className="metric">
                <span className="metric-label">Balance</span>
                <span className="metric-val">{agent.balance}</span>
              </div>
              <div className="metric">
                <span className="metric-label">Limit</span>
                <span className="metric-val">{agent.limit}</span>
              </div>
            </div>

            <div className="agent-rules">
              <div className="rules-title">
                <ShieldCheck size={14} /> Active Rules
              </div>
              <div className="rules-badges">
                {agent.rules.map((rule, idx) => (
                  <span key={idx} className="rule-pill">{rule}</span>
                ))}
              </div>
            </div>

            <div className="agent-footer">
              <Badge variant={agent.status === 'active' ? 'success' : 'neutral'}>
                {agent.status}
              </Badge>
              <Button variant="outline" size="sm"><Target size={14}/> Manage</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
