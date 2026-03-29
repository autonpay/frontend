import React, { useState } from 'react';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { 
  Key, 
  Radio, 
  Copy, 
  Plus, 
  Trash2,
  PlugZap,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { useApiKeys, useCreateApiKey, useDeleteApiKey, useChangePassword } from '../../hooks/useAuth';
import { useWebhooks, useDeleteWebhook } from '../../hooks/useWebhooks';
import { toast } from 'sonner';
import './Settings.css';

export const Settings: React.FC = () => {
  const { data: apiKeysData, isLoading: loadingKeys, refetch: refetchKeys } = useApiKeys();
  const { data: webhooksData, isLoading: loadingWebhooks, refetch: refetchWebhooks } = useWebhooks();
  
  const { mutateAsync: createKey, isPending: creatingKey } = useCreateApiKey();
  const { mutateAsync: deleteKey } = useDeleteApiKey();
  const { mutateAsync: deleteWebhook } = useDeleteWebhook();
  const { mutateAsync: changePassword, isPending: changingPassword } = useChangePassword();

  const [passwordForm, setPasswordForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });

  const handleCreateKey = async () => {
    const name = prompt('Enter a name for the new API key:');
    if (!name) return;
    try {
      await createKey({ name });
      refetchKeys();
    } catch (err) {
      // Handled globally
    }
  };

  const handleDeleteKey = async (id: string) => {
    if (!confirm('Are you sure you want to revoke this API key? This action cannot be undone.')) return;
    try {
      await deleteKey(id);
      refetchKeys();
    } catch (err) {
      // Handled globally
    }
  };

  const handleDeleteWebhook = async (id: string) => {
    if (!confirm('Delete this webhook endpoint?')) return;
    try {
      await deleteWebhook({ id });
      refetchWebhooks();
    } catch (err) {
      // Handled globally
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match.');
      return;
    }
    
    try {
      await changePassword({ 
        oldPassword: passwordForm.oldPassword || undefined, 
        newPassword: passwordForm.newPassword 
      });
      setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
      // Success toast handled globally via mutationCache
    } catch (err) {
      // Error toast handled globally via mutationCache
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <div className="header-titles">
          <h1>Settings & Security</h1>
          <span className="subtitle">Manage authentication, API credentials, and webhooks.</span>
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
              <Button variant="outline" size="sm" onClick={handleCreateKey} disabled={creatingKey}>
                <Plus size={14}/> {creatingKey ? 'Generating...' : 'Generate Key'}
              </Button>
            </div>
            
            <div className="api-keys-list">
              {loadingKeys && (
                <div className="empty-state">Loading API keys...</div>
              )}
              {apiKeysData?.data?.map(key => (
                <div key={key.id} className="api-key-row">
                  <div className="key-info">
                    <span className="key-name">{key.name}</span>
                    <span className="key-date">Created {new Date(key.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="key-secret">
                    <code>{key.key_preview}</code>
                    <Button variant="ghost" size="sm" className="icon-btn" title="Copy Key" onClick={() => {
                        navigator.clipboard.writeText(key.key_preview);
                        toast.success('Key copied to clipboard');
                    }}>
                      <Copy size={16} />
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="delete-btn" onClick={() => handleDeleteKey(key.id)}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
              {apiKeysData?.data && apiKeysData.data.length === 0 && !loadingKeys && (
                <div className="empty-state">No API keys generated yet.</div>
              )}
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
              {loadingWebhooks && (
                <div className="empty-state">Loading webhooks...</div>
              )}
              {webhooksData?.data?.map(wh => (
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
                      <CheckCircle2 size={14} className="success-icon" /> Last ping: {wh.last_ping || 'Never'}
                    </div>
                    <div className="webhook-actions">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" className="delete-btn" onClick={() => handleDeleteWebhook(wh.id)}><Trash2 size={14} /></Button>
                    </div>
                  </div>
                </div>
              ))}
              {webhooksData?.data && webhooksData.data.length === 0 && !loadingWebhooks && (
                <div className="empty-state">No webhooks registered.</div>
              )}
            </div>
          </Card>

          <Card className="settings-section">
            <div className="section-title-bar" style={{ padding: 0, marginBottom: '24px' }}>
              <div className="title-left">
                <Lock size={20} className="section-icon" />
                <h3>Security & Password</h3>
              </div>
            </div>

            <form onSubmit={handlePasswordChange} className="settings-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Current Password</label>
                  <input 
                    type="password" 
                    value={passwordForm.oldPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-row dual">
                <div className="form-group">
                  <label>New Password</label>
                  <input 
                    type="password" 
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input 
                    type="password" 
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    required
                  />
                </div>
              </div>

              <Button type="submit" variant="primary" disabled={changingPassword} style={{ marginTop: '16px' }}>
                {changingPassword ? 'Updating...' : 'Update Password'}
              </Button>
            </form>
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

            <Button variant="outline" fullWidth className="mt-4" onClick={() => window.open('https://docs.autonpay.com', '_blank')}>Read Documentation</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
