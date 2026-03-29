import React from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { 
  User as UserIcon, 
  Mail, 
  Building2, 
  Shield, 
  Calendar,
  Camera,
  LogOut
} from 'lucide-react';
import './Profile.css';

export const Profile: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="header-titles">
          <h1>Account Settings</h1>
          <span className="subtitle">Manage your personal information and organization profile.</span>
        </div>
      </div>

      <div className="profile-layout">
        <div className="profile-main">
          
          <Card className="profile-hero-card">
            <div className="profile-hero-content">
              <div className="avatar-wrapper">
                <img 
                  src={`https://ui-avatars.com/api/?name=${user?.name?.replace(' ', '+') || 'Auton+Dev'}&background=2962ff&color=fff&size=128`} 
                  alt="User Avatar" 
                  className="profile-avatar"
                />
                <button className="avatar-edit-btn">
                  <Camera size={16} />
                </button>
              </div>
              <div className="hero-info">
                <h2>{user?.name || 'Auton Developer'}</h2>
                <div className="role-badge">
                  <Shield size={14} />
                  <span>{user?.role || 'Administrator'}</span>
                </div>
                <p className="member-since">
                  <Calendar size={14} />
                  Member since October 2026
                </p>
              </div>
            </div>
          </Card>

          <Card className="profile-details-section">
            <div className="section-header">
               <h3>Personal Information</h3>
               <Button variant="outline" size="sm">Edit Details</Button>
            </div>
            
            <div className="details-grid">
              <div className="detail-item">
                <div className="detail-label">
                  <UserIcon size={16} />
                  <span>Full Name</span>
                </div>
                <div className="detail-value">{user?.name || 'Not set'}</div>
              </div>

              <div className="detail-item">
                <div className="detail-label">
                  <Mail size={16} />
                  <span>Email Address</span>
                </div>
                <div className="detail-value">{user?.email || 'Not set'}</div>
              </div>

              <div className="detail-item">
                <div className="detail-label">
                  <Building2 size={16} />
                  <span>Organization</span>
                </div>
                <div className="detail-value">{user?.organizationName || 'Auton Cloud'}</div>
              </div>

              <div className="detail-item">
                <div className="detail-label">
                  <Shield size={16} />
                  <span>Account Role</span>
                </div>
                <div className="detail-value">{user?.role || 'Admin'}</div>
              </div>
            </div>
          </Card>

          <Card className="profile-details-section danger-zone">
            <div className="section-header">
               <h3 className="text-danger">Danger Zone</h3>
            </div>
            <p className="danger-desc">Once you delete your account, there is no going back. Please be certain.</p>
            <div className="danger-actions">
              <Button variant="outline" className="logout-mobile" onClick={logout}>
                <LogOut size={16} /> Sign Out
              </Button>
              <Button variant="secondary" className="delete-account-btn">Delete Account</Button>
            </div>
          </Card>
        </div>

        <div className="profile-sidebar">
          <Card className="organization-widget">
            <div className="org-icon-bg">
              <Building2 size={24} />
            </div>
            <div className="org-info">
               <h4>{user?.organizationName || 'Auton Cloud'}</h4>
               <span className="org-id">ID: {user?.organizationId || 'org_88291a'}</span>
            </div>
            <div className="org-stats">
               <div className="org-stat">
                 <span className="stat-num">12</span>
                 <span className="stat-title">Agents</span>
               </div>
               <div className="org-stat">
                 <span className="stat-num">4</span>
                 <span className="stat-title">Members</span>
               </div>
            </div>
            <Button variant="outline" fullWidth>Manage Organization</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
