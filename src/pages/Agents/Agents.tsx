import React from 'react';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { useAgents } from '../../hooks/useAgents';
import { 
  Plus, 
  MoreVertical, 
  Target, 
  ShieldCheck,
  Bot
} from 'lucide-react';
import './Agents.css';

export const Agents: React.FC = () => {
  const { data: agentsQuery, isLoading } = useAgents();
  const agents = agentsQuery?.data || [];

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
        {isLoading && agents.length === 0 && <div className="loading-state">Syncing agents from ledger...</div>}
        {agents.map(agent => (
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
                <span className="metric-val">{agent.balance || '$0.00'}</span>
              </div>
              <div className="metric">
                <span className="metric-label">Limit</span>
                <span className="metric-val">{agent.limit || 'No Limit'}</span>
              </div>
            </div>

            <div className="agent-rules">
              <div className="rules-title">
                <ShieldCheck size={14} /> Active Rules
              </div>
              <div className="rules-badges">
                {agent.metadata?.rules?.map((rule: string, idx: number) => (
                  <span key={idx} className="rule-pill">{rule}</span>
                )) || <span className="no-rules">No rules active</span>}
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
        {agents.length === 0 && !isLoading && (
          <div className="empty-state">No agents found. Create one to get started.</div>
        )}
      </div>
    </div>
  );
};
