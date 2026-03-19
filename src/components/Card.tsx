import React from 'react';
import './Card.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'glow' | 'transparent';
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  variant = 'default', 
  noPadding = false, 
  className = '', 
  ...props 
}) => {
  return (
    <div 
      className={`auton-card card-${variant} ${noPadding ? 'no-padding' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
