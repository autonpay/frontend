import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { Network, Eye, EyeOff, BarChart3, ShieldCheck } from 'lucide-react';
import './Login.css';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      login('mock_jwt_token_123', { 
        id: 'usr_live_9x81', 
        email, 
        name: 'Admin Persona' 
      });
      
      const from = (location.state as any)?.from?.pathname || '/';
      navigate(from, { replace: true });
    }, 850);
  };

  return (
    <div className="login-split-container">
      
      {/* LEFT PANE: Form */}
      <div className="login-left">
        <div className="login-form-wrapper">
          <div className="login-header">
             <div className="brand-logo">
               <Network size={24} className="logo-icon" />
             </div>
             <h2>Welcome Back to Auton</h2>
             <p>Enter your admin credentials to continue.</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
             <div className="form-group">
               <label>Email</label>
               <input 
                 type="email" 
                 placeholder="Enter your email address" 
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 autoComplete="email"
                 required 
               />
             </div>
             
             <div className="form-group">
               <label>Password</label>
               <div className="password-input-wrapper">
                 <input 
                   type={showPassword ? "text" : "password"}
                   placeholder="Enter your password" 
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   autoComplete="current-password"
                   required 
                 />
                 <button 
                   type="button" 
                   className="toggle-password"
                   onClick={() => setShowPassword(!showPassword)}
                 >
                   {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                 </button>
               </div>
             </div>

             <div className="form-options">
               <label className="remember-me">
                 <input type="checkbox" />
                 <span>Remember me</span>
               </label>
               <a href="#" className="forgot-password">Forgot password</a>
             </div>

             <Button 
               variant="primary" 
               fullWidth 
               size="lg" 
               className="login-btn" 
               disabled={loading || !email || !password}
             >
               {loading ? 'Authenticating...' : 'Sign In'}
             </Button>

             <div className="sso-divider">
               <span>Or login with</span>
             </div>

             <div className="sso-buttons">
               <button type="button" className="sso-btn">
                 <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                   <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                   <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                   <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                   <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                 </svg>
                 Google
               </button>
               <button type="button" className="sso-btn">
                 <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                   <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z" fill="#000000"/>
                 </svg>
                 SSO
               </button>
             </div>

             <div className="register-prompt">
               Don't have an account? <a href="#">Register</a>
             </div>
          </form>

          <div className="login-footer-links">
            <span className="copyright">© 2026 Auton Inc. All rights reserved.</span>
            <div className="policy-links">
              <a href="#">Privacy Policy</a>
              <span className="dot">•</span>
              <a href="#">Terms & Condition</a>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANE: Brand Showcase */}
      <div className="login-right">
        <div className="brand-showcase">
          <div className="showcase-visuals">
            {/* Abstract CSS representations of dashboard panels */}
            <div className="mock-panel panel-1">
              <div className="panel-header">Sales Targets</div>
              <div className="panel-ring">
                 <div className="ring-inner">
                   <span className="ring-val">80%</span>
                 </div>
                 <div className="ring-text">3,415 <span className="muted">/ 4,000</span></div>
              </div>
            </div>

            <div className="mock-panel panel-2">
              <div className="panel-header">Closed Won by Type</div>
              <div className="panel-number">$11,680 <span className="muted-arrow">↗</span></div>
              <div className="panel-bars">
                <div className="bar" style={{height: '40%'}}></div>
                <div className="bar" style={{height: '60%'}}></div>
                <div className="bar" style={{height: '30%'}}></div>
                <div className="bar" style={{height: '80%'}}></div>
                <div className="bar highlight" style={{height: '100%'}}></div>
              </div>
            </div>

            <div className="mock-panel panel-3">
              <div className="panel-header">System Health</div>
              <div className="panel-row">
                <ShieldCheck size={20} color="#10b981" />
                <span>All layers operational</span>
              </div>
              <div className="panel-row">
                <BarChart3 size={20} color="#3b82f6" />
                <span>Settlement latency: 12ms</span>
              </div>
            </div>
          </div>

          <div className="showcase-content">
            <h2>Transform Data into Cool Insights</h2>
            <p>Make informed decisions with Auton's powerful analytics tools. Harness the power of robust agent spending data to drive your business forward.</p>
            
            <div className="carousel-dots">
              <div className="dot active"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
