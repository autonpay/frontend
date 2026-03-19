import React from 'react';
import './Badge.css';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'neutral',
  className = ''
}) => {
  return (
    <span className={`auton-badge badge-${variant} ${className}`}>
      {children}
    </span>
  );
};
