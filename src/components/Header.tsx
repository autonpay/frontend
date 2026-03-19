import React from 'react';
import { Search, Bell, Settings, HelpCircle, Plus } from 'lucide-react';
import { Button } from './Button';
import './Header.css';

export const Header: React.FC = () => {
  return (
    <header className="auton-header">
      <div className="header-search">
        <Search size={18} className="search-icon" />
        <input 
          type="text" 
          placeholder="Search agents, transactions..." 
          className="search-input"
        />
      </div>

      <div className="header-actions">
        <Button size="sm" variant="primary"><Plus size={16} /> Add Funds</Button>
        
        <div className="icon-actions">
          <button className="icon-btn">
            <Bell size={18} />
            <span className="notification-dot"></span>
          </button>
          <button className="icon-btn"><Settings size={18} /></button>
          <button className="icon-btn"><HelpCircle size={18} /></button>
        </div>

        <div className="user-profile">
          <div className="avatar">
            <img src="https://ui-avatars.com/api/?name=Auton+Dev&background=2962ff&color=fff" alt="User Avatar" />
          </div>
          <div className="user-info">
            <span className="user-name">Auton Dev</span>
            <span className="user-role">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};
