import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { Network, Lock } from 'lucide-react';
import './Login.css';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate real backend authentication lag
    setTimeout(() => {
      // Create a mock secure session
      login('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', { 
        id: 'usr_live_9x81', 
        email, 
        name: 'Admin Persona' 
      });
      
      // Send user securely back to the page they were trying to access
      const from = (location.state as any)?.from?.pathname || '/';
      navigate(from, { replace: true });
    }, 850);
  };

  return (
    <div className="login-container">
      
      <div className="login-card">
        <div className="login-header">
           <div className="brand-logo">
             <Network size={36} className="logo-icon" />
           </div>
           <h2>Auton Terminal</h2>
           <p>Enter your developer credentials to access the spending orchestration layer.</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
           <div className="form-group">
             <label>Work Email</label>
             <input 
               type="email" 
               placeholder="admin@autonpay.com" 
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               autoComplete="email"
               required 
             />
           </div>
           
           <div className="form-group">
             <label>Access Key</label>
             <input 
               type="password" 
               placeholder="••••••••••••" 
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               autoComplete="current-password"
               required 
             />
           </div>

           <Button 
             variant="primary" 
             fullWidth 
             size="lg" 
             className="login-btn" 
             disabled={loading || !email || !password}
           >
             {loading ? 'Verifying Identity...' : <><Lock size={18} /> Initialize Session</>}
           </Button>
        </form>
      </div>

      <div className="login-footer">
        Secured by the highly-available X402 Settlement Architecture.
      </div>

    </div>
  );
};
