import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { 
  Plus, 
  Shield, 
  Clock, 
  Zap, 
  GlobeLock, 
  MoreVertical,
  TerminalSquare
} from 'lucide-react';
import './Rules.css';

const rulesData = [
  {
    id: 'rule_vel_01',
    name: 'Strict Velocity Limit',
    description: 'Reject more than 10 transactions within a 60 second window.',
    type: 'velocity_check',
    scope: 'Global',
    status: 'enabled',
    icon: <Zap size={20} />
  },
  {
    id: 'rule_mch_05',
    name: 'SaaS Whitelist',
    description: 'Only authorize payments to AWS, GCP, Vercel, and OpenAI.',
    type: 'merchant_whitelist',
    scope: '2 Agents Target',
    status: 'enabled',
    icon: <Shield size={20} />
  },
  {
    id: 'rule_geo_02',
    name: 'Geo-Block High Risk',
    description: 'Reject any virtual card authorization from non-US/EU locations.',
    type: 'geo_fence',
    scope: 'Global',
    status: 'enabled',
    icon: <GlobeLock size={20} />
  },
  {
    id: 'rule_tim_09',
    name: 'Weekend Sentry',
    description: 'Deny all net-new subscription authorizations over $50 on weekends.',
    type: 'time_block',
    scope: 'Marketing Ad Spender',
    status: 'disabled',
    icon: <Clock size={20} />
  },
  {
    id: 'rule_amt_12',
    name: 'Manager Approval Lock',
    description: 'Suspend transaction and trigger Webhook pending approval if amount > $500.',
    type: 'amount_ceiling',
    scope: 'Global',
    status: 'enabled',
    icon: <TerminalSquare size={20} />
  }
];

export const Rules: React.FC = () => {
  // Simple local state just for toggle demonstration
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    rulesData.reduce((acc, rule) => ({...acc, [rule.id]: rule.status === 'enabled'}), {})
  );

  const toggleRule = (id: string) => {
    setToggles(prev => ({...prev, [id]: !prev[id]}));
  };

  return (
    <div className="rules-container">
      <div className="rules-header">
        <div className="header-titles">
          <h1>Programmable Rules Engine</h1>
          <span className="subtitle">Configure strict business logic and deterministic guardrails for AI spending authorizations.</span>
        </div>
        <div className="header-actions">
           <Button variant="primary" size="md"><Plus size={16} /> Deploy New Rule</Button>
        </div>
      </div>

      <div className="rules-layout">
        <div className="rules-list">
          {rulesData.map(rule => {
            const isEnabled = toggles[rule.id];
            
            return (
              <Card key={rule.id} className={`rule-item-card ${!isEnabled ? 'disabled-card' : ''}`}>
                <div className="rule-item-header">
                  <div className="rule-title-group">
                    <div className="rule-icon-bg">
                      {rule.icon}
                    </div>
                    <div>
                      <h3>{rule.name}</h3>
                      <p className="rule-desc">{rule.description}</p>
                    </div>
                  </div>
                  
                  <div className="rule-toggles">
                    <button 
                      className={`switch ${isEnabled ? 'on' : 'off'}`}
                      onClick={() => toggleRule(rule.id)}
                    >
                      <div className="switch-handle" />
                    </button>
                    <Button variant="ghost" size="sm" className="more-btn">
                      <MoreVertical size={16} />
                    </Button>
                  </div>
                </div>
                
                <div className="rule-item-footer">
                  <div className="rule-meta">
                    <span className="meta-label">Type:</span> 
                    <span className="meta-value">{rule.type}</span>
                  </div>
                  <div className="rule-meta">
                    <span className="meta-label">Scope:</span> 
                    <Badge variant={rule.scope === 'Global' ? 'info' : 'neutral'}>{rule.scope}</Badge>
                  </div>
                  <div className="rule-meta">
                    <span className="meta-label">ID:</span> 
                    <span className="meta-code">{rule.id}</span>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        <div className="rules-sidebar">
          <Card variant="default" className="docs-widget">
            <TerminalSquare size={24} className="docs-icon" />
            <h3>Programmable SDK</h3>
            <p>You can dynamically inject rules into Auton using the strict Type-Safe API.</p>
            <div className="code-block">
              <pre>
{`await auton.rules.create({
  type: 'velocity_check',
  max_txns: 10,
  window_ms: 60000,
  action: 'reject'
});`}
              </pre>
            </div>
            <Button variant="outline" fullWidth>Read Documentation</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
