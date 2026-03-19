import React from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { 
  Key, 
  Radio, 
  Copy, 
  EyeOff, 
  Plus, 
  Trash2,
  PlugZap,
  CheckCircle2
} from 'lucide-react';
import './Settings.css';

const webhooksData = [
  {
    id: 'wh_09a1',
    url: 'https://api.mycompany.com/webhooks/auton',
    events: ['transaction.created', 'transaction.settled', 'rule.violation'],
    status: 'active',
    lastPing: '2 mins ago'
  },
  {
    id: 'wh_b7f2',
    url: 'https://slack-alerts.mycompany.com/auton',
    events: ['rule.violation', 'agent.limit_reached'],
    status: 'active',
    lastPing: '1 hour ago'
  }
];

export const Settings: React.FC = () => {
  return (
    <div className="settings-container">
      <div className="settings-header">
        <div className="header-titles">
          <h1>Developer Settings</h1>
          <span className="subtitle">Manage API credentials, configure webhooks, and setup integrations.</span>
        </div>
      </div>

      <div className="settings-layout">
        <div className="settings-main">
          
          <Card className="settings-section" noPadding>
            <div className="section-title-bar">
              <div className="title-left">
                <Key size={20} className="section-icon" />
                <h3>API Keys</h3>
              </div>
              <Button variant="outline" size="sm"><Plus size={14}/> Generate Key</Button>
            </div>
            
            <div className="api-keys-list">
              <div className="api-key-row">
                <div className="key-info">
                  <span className="key-name">Production Main Key</span>
                  <span className="key-date">Created Oct 1, 2026</span>
                </div>
                <div className="key-secret">
                  <code>sk_live_51M*************************29x</code>
                  <Button variant="ghost" size="sm" className="icon-btn" title="Reveal">
                    <EyeOff size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" className="icon-btn" title="Copy">
                    <Copy size={16} />
                  </Button>
                </div>
                <Button variant="ghost" size="sm" className="delete-btn">
                  <Trash2 size={16} />
                </Button>
              </div>

              <div className="api-key-row">
                <div className="key-info">
                  <span className="key-name">Development Key</span>
                  <span className="key-date">Created Sep 15, 2026</span>
                </div>
                <div className="key-secret">
                  <code>sk_test_48B*************************11c</code>
                  <Button variant="ghost" size="sm" className="icon-btn" title="Reveal">
                    <EyeOff size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" className="icon-btn" title="Copy">
                    <Copy size={16} />
                  </Button>
                </div>
                <Button variant="ghost" size="sm" className="delete-btn">
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          </Card>

          <Card className="settings-section" noPadding>
            <div className="section-title-bar">
              <div className="title-left">
                <Radio size={20} className="section-icon" />
                <h3>Webhook Endpoints</h3>
              </div>
              <Button variant="primary" size="sm"><Plus size={14}/> Add Endpoint</Button>
            </div>
            
            <div className="webhooks-list">
              {webhooksData.map(wh => (
                <div key={wh.id} className="webhook-row">
                  <div className="webhook-header">
                    <div className="url-group">
                      <span className="url-method">POST</span>
                      <span className="url-path">{wh.url}</span>
                    </div>
                    <Badge variant={wh.status === 'active' ? 'success' : 'neutral'}>
                      {wh.status === 'active' ? 'Receiving' : 'Failing'}
                    </Badge>
                  </div>
                  
                  <div className="webhook-events">
                    {wh.events.map((ev, i) => (
                      <span key={i} className="event-pill">{ev}</span>
                    ))}
                  </div>

                  <div className="webhook-footer">
                    <div className="last-ping">
                      <CheckCircle2 size={14} className="success-icon" /> Last ping: {wh.lastPing}
                    </div>
                    <div className="webhook-actions">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" className="delete-btn"><Trash2 size={14} /></Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="settings-sidebar">
          <Card className="integration-card">
            <div className="icon-wrapper">
              <PlugZap size={24} />
            </div>
            <h3>Quickstart Guide</h3>
            <p>Ready to start programming your money? Integrate the Auton SDK in 3 minutes.</p>
            
            <div className="steps-list">
              <div className="step-item">
                <div className="step-num">1</div>
                <div className="step-text">Generate a secure API key</div>
              </div>
              <div className="step-item">
                <div className="step-num">2</div>
                <div className="step-text">Install the SDK <code>npm i @auton/sdk</code></div>
              </div>
              <div className="step-item">
                <div className="step-num">3</div>
                <div className="step-text">Initiate an agent spend request</div>
              </div>
            </div>

            <Button variant="outline" fullWidth className="mt-4">Read Documentation</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
