import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Settings, Plus, LogOut, User, DollarSign, ChevronDown } from 'lucide-react';
import { Button } from './Button';
import { useAuth } from '../context/AuthContext';
import './Header.css';

export const Header: React.FC = () => {
  const { logout, user } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleNavigate = (path: string) => {
    navigate(path);
    setDropdownOpen(false);
  };

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
          <button className="icon-btn" onClick={logout} title="Secure Log Out"><LogOut size={18} color="#ef4444" /></button>
        </div>

        <div className="user-profile-container" ref={dropdownRef}>
          <div className={`user-profile ${dropdownOpen ? 'active' : ''}`} onClick={toggleDropdown}>
            <div className="avatar">
              <img src={`https://ui-avatars.com/api/?name=${user?.name?.replace(' ', '+') || 'Auton+Dev'}&background=2962ff&color=fff`} alt="User Avatar" />
            </div>
            <div className="user-info">
              <span className="user-name">{user?.name || 'Auton Dev'}</span>
              <span className="user-role">{user?.organizationName || 'Admin'}</span>
            </div>
            <ChevronDown size={14} className={`dropdown-arrow ${dropdownOpen ? 'rotated' : ''}`} />
          </div>

          {dropdownOpen && (
            <div className="profile-dropdown">
              <div className="dropdown-header">
                 <span className="user-full-name">{user?.name}</span>
                 <span className="user-email">{user?.email}</span>
              </div>
              <div className="dropdown-divider"></div>
              <button onClick={() => handleNavigate('/profile')} className="dropdown-item">
                <User size={16} /> My Profile
              </button>
              <button onClick={() => handleNavigate('/settings')} className="dropdown-item">
                <Settings size={16} /> Dev Settings
              </button>
              <button className="dropdown-item">
                <DollarSign size={16} /> Billing
              </button>
              <div className="dropdown-divider"></div>
              <button onClick={logout} className="dropdown-item logout-item">
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
