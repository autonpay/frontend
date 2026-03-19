import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import './Layout.css';

export const Layout: React.FC = () => {
  return (
    <div className="auton-app-container">
      <Sidebar />
      <div className="auton-main-wrapper">
        <Header />
        <main className="auton-main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
