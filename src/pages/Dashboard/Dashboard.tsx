import React, { useState } from 'react';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import { ArrowUpRight, Zap, Target, Lock, PlayCircle, Plus, Settings } from 'lucide-react';
import { useAgents } from '../../hooks/useAgents';
import { CreateAgentModal } from '../Agents/CreateAgentModal';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const performanceData = [
  { name: 'Mon', value: 4000 },
  { name: 'Tue', value: 3000 },
  { name: 'Wed', value: 5000 },
  { name: 'Thu', value: 4500 },
  { name: 'Fri', value: 6000 },
  { name: 'Sat', value: 5500 },
  { name: 'Sun', value: 6810 }
];

export const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { data: agentsQuery, isLoading } = useAgents();
  const agents = agentsQuery?.data || [];

  return (
    <div className="dashboard-container">
      {/* Top Title */}
      <div className="dashboard-header">
        <div className="header-titles">
          <h1>Holdings & Balance</h1>
          <span className="subtitle">Overview of your Auton Agents and Smart Wallets</span>
        </div>
        <div className="header-actions">
           <Button variant="primary" size="sm"><Lock size={14} /> View Audit Logs</Button>
           <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
             <Zap size={14} /> New Agent
           </Button>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Main Left Content */}
        <div className="main-content">
          
          {/* Holdings Cards */}
          <div className="holdings-cards">
            <Card variant="default" className="holding-summary">
              <div className="holding-label">Total Orchestrated Funds</div>
              <div className="holding-value">$6,810.25</div>
              <div className="holding-trend positive">
                <ArrowUpRight size={16} />
                <span>+ $455.4 (+12.4% this week)</span>
              </div>
            </Card>

            <div className="holding-stats">
              <Card variant="transparent" className="stat-card">
                 <div className="stat-label">Total Allocated Limit</div>
                 <div className="stat-val">$2,354.80</div>
              </Card>
              <Card variant="transparent" className="stat-card">
                 <div className="stat-label">Avail. Liquidity (USDC)</div>
                 <div className="stat-val">$4,455.45</div>
              </Card>
              <Card variant="transparent" className="stat-card">
                 <div className="stat-label">Active Agents</div>
                 <div className="stat-val">
                   {isLoading ? <div className="skeleton-box shimmer" style={{ width: '40px', height: '24px' }} /> : agents.length}
                 </div>
              </Card>
              <Card variant="transparent" className="stat-card">
                 <div className="stat-label">Pending Approvals</div>
                 <div className="stat-val">3</div>
              </Card>
            </div>
          </div>

          {/* Chart Section */}
          <Card className="chart-section" noPadding>
            <div className="chart-header">
              <h2>Agent Spending Velocity</h2>
              <div className="chart-filters">
                <Badge variant="info">1W</Badge>
                <Badge variant="neutral">1M</Badge>
                <Badge variant="neutral">3M</Badge>
                <Badge variant="neutral">YTD</Badge>
              </div>
            </div>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-teal)" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="var(--accent-teal)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', color: '#0f172a', fontWeight: 600, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} 
                    itemStyle={{ color: 'var(--accent-teal)' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="var(--accent-teal)" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Agents Table */}
          <div className="agents-table-section">
            <div className="section-header">
              <h2>My Agents</h2>
              <Button variant="primary" size="sm" onClick={() => navigate('/agents')}>View All</Button>
            </div>
            <Card variant="default" className="agents-card" noPadding>
               <div style={{ overflowX: 'auto', width: '100%' }}>
                 <table className="auton-table">
                   <thead>
                     <tr>
                       <th>Agent Name</th>
                       <th>ID</th>
                      <th>Status</th>
                      <th>Limit</th>
                      <th>Balance</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading && agents.length === 0 && (
                      <>
                        {[1, 2, 3].map((i) => (
                          <tr key={i}>
                            <td><div className="skeleton-box shimmer" style={{ width: '100px', height: '16px' }} /></td>
                            <td><div className="skeleton-box shimmer" style={{ width: '120px', height: '12px' }} /></td>
                            <td><div className="skeleton-box shimmer" style={{ width: '60px', height: '18px' }} /></td>
                            <td><div className="skeleton-box shimmer" style={{ width: '80px', height: '16px' }} /></td>
                            <td><div className="skeleton-box shimmer" style={{ width: '80px', height: '16px' }} /></td>
                            <td><div className="skeleton-box shimmer" style={{ width: '70px', height: '24px' }} /></td>
                          </tr>
                        ))}
                      </>
                    )}
                   {agents.map(agent => (
                     <tr key={agent.id}>
                       <td className="agent-name">
                         <Target size={16} className="table-icon" />
                         {agent.name}
                       </td>
                       <td className="agent-id">{agent.id}</td>
                       <td>
                         <Badge variant={agent.status === 'active' ? 'success' : 'neutral'}>
                           {agent.status}
                         </Badge>
                       </td>
                       <td>{agent.limit || 'No Limit'}</td>
                       <td>{agent.balance || '$0.00'}</td>
                       <td>
                         <Button variant="primary" size="sm"><Settings size={14}/> Manage</Button>
                       </td>
                     </tr>
                   ))}
                   {!isLoading && agents.length === 0 && (
                     <tr>
                        <td colSpan={6} style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
                          No agents found.
                        </td>
                     </tr>
                   )}
                  </tbody>
                 </table>
               </div>
            </Card>
          </div>
        </div>

        {/* Right Sidebar Widget */}
        <div className="right-panel">
          <Card variant="glow" className="action-widget">
            <div className="widget-icon-bg"><PlayCircle size={32} /></div>
            <h3>Auton Sandbox</h3>
            <p>Simulate transactions and rule executions in a secure environment.</p>
            <Button variant="primary" fullWidth className="mt-4"><PlayCircle size={16}/> Start Simulator</Button>
          </Card>

          <div className="watchlist-section">
            <div className="section-header">
              <h2>Top Rules Fired</h2>
              <span className="link-text">See logs</span>
            </div>
            <div className="rule-list">
              <div className="rule-item">
                <div className="rule-info">
                  <div className="rule-title">Rate Limiting</div>
                  <div className="rule-desc">Blocked 12 requests &gt; $100</div>
                </div>
                <Badge variant="warning">Triggered</Badge>
              </div>
              <div className="rule-item">
                <div className="rule-info">
                  <div className="rule-title">Merchant Approvals</div>
                  <div className="rule-desc">Approved AWS & Stripe</div>
                </div>
                <Badge variant="success">Active</Badge>
              </div>
              <div className="rule-item">
                <div className="rule-info">
                  <div className="rule-title">Off-chain Virtual Card</div>
                  <div className="rule-desc">Created bridge for Marqeta txn</div>
                </div>
                <Badge variant="info">On</Badge>
              </div>
            </div>
            
            <Button variant="primary" fullWidth className="mt-4 create-rule-btn">
               <Plus size={16} /> Create new rule
            </Button>
          </div>
        </div>
      </div>

      <CreateAgentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};
