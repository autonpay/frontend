import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Wallet, ArrowRightLeft, Shield, Settings, Activity } from 'lucide-react';
import './Sidebar.css';

export const Sidebar: React.FC = () => {
  const navItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'Agents', path: '/agents', icon: Activity },
    { label: 'Wallet & Balances', path: '/wallet', icon: Wallet },
    { label: 'Transactions', path: '/transactions', icon: ArrowRightLeft },
    { label: 'Rules Engine', path: '/rules', icon: Shield },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="auton-sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon"></div>
        <span className="logo-text">Auton</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink 
              key={item.label} 
              to={item.path} 
              className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="plan-card">
          <div className="plan-title">Pro Plan</div>
          <div className="plan-limits">
            <div className="limit-bar">
              <div className="limit-fill" style={{ width: '65%' }}></div>
            </div>
            <span>$65k / $100k Limit</span>
          </div>
          <button className="upgrade-btn">Upgrade</button>
        </div>
      </div>
    </aside>
  );
};
