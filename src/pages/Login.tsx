import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { Network, Eye, EyeOff, BarChart3, ShieldCheck, Lock } from 'lucide-react';
import './Login.css';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const SLIDES_COUNT = 3;
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES_COUNT);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    // Swipe left (next)
    if (diff > 50) setCurrentSlide((p) => Math.min(p + 1, SLIDES_COUNT - 1)); 
    // Swipe right (prev)
    if (diff < -50) setCurrentSlide((p) => Math.max(p - 1, 0)); 
    
    setTouchStart(null);
  };

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
               {loading ? 'Authenticating...' : <><Lock size={18} /> Sign In</>}
             </Button>

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

      {/* RIGHT PANE: Brand Showcase Carousel */}
      <div 
        className="login-right"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="brand-showcase-wrapper">
          <div className="carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            
            {/* SLIDE 1: Ledgers & Transactions */}
            <div className="carousel-slide">
              <div className="showcase-visuals">
                <div className="mock-panel panel-1">
                  <div className="panel-header">Active Agents</div>
                  <div className="panel-ring">
                     <div className="ring-inner">
                       <span className="ring-val">92%</span>
                     </div>
                     <div className="ring-text">4,812 <span className="muted">/ pool</span></div>
                  </div>
                </div>
                <div className="mock-panel panel-2">
                  <div className="panel-header">Global Ledgers</div>
                  <div className="panel-number">$2.4M <span className="muted-arrow">↗</span></div>
                  <div className="panel-bars">
                    <div className="bar" style={{height: '40%'}}></div>
                    <div className="bar" style={{height: '60%'}}></div>
                    <div className="bar highlight" style={{height: '100%'}}></div>
                  </div>
                </div>
              </div>
              <div className="showcase-content">
                <h2>AI Spending Orchestration</h2>
                <p>Monitor real-time virtual Marqeta cards and on-chain settlements securely across all your autonomous agents worldwide.</p>
              </div>
            </div>

            {/* SLIDE 2: Spending Guardrails */}
            <div className="carousel-slide">
              <div className="showcase-visuals">
                 <div className="mock-panel panel-center">
                    <div className="panel-header" style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                       <ShieldCheck size={16} color="#10b981"/> Active Guardrail
                    </div>
                    <h3 style={{margin: '8px 0', fontSize: '20px'}}>Strict Velocity Limit</h3>
                    <div style={{color: '#94a3b8', fontSize: '13px', marginBottom: '16px'}}>Automatically blocks high-frequency duplicate API behaviors.</div>
                    <div style={{display: 'inline-block', padding: '6px 10px', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', borderRadius: '4px', fontSize: '12px', fontWeight: 600}}>Enforcing constraints system-wide...</div>
                 </div>
              </div>
              <div className="showcase-content">
                <h2>Programmable Guardrails</h2>
                <p>Enforce strict velocity limits, geofences, and SaaS merchant whitelists directly encoded into your spend orchestration engine.</p>
              </div>
            </div>

            {/* SLIDE 3: Health & Developers */}
            <div className="carousel-slide">
              <div className="showcase-visuals">
                <div className="mock-panel panel-3">
                  <div className="panel-header">X402 Network Status</div>
                  <div className="panel-row">
                    <ShieldCheck size={20} color="#10b981" />
                    <span>All settlement nodes operational</span>
                  </div>
                  <div className="panel-row">
                    <BarChart3 size={20} color="#3b82f6" />
                    <span>Avg Protocol Latency: 12ms</span>
                  </div>
                  <div className="panel-row">
                    <Network size={20} color="#ff6d00" />
                    <span>72 active Webhook listeners</span>
                  </div>
                </div>
              </div>
              <div className="showcase-content">
                <h2>Enterprise API Integrations</h2>
                <p>Register highly available webhooks to silently monitor the X402 payment network and route custom spending events seamlessly.</p>
              </div>
            </div>

          </div>

          {/* Persistent Dot Navigation */}
          <div className="carousel-dots">
            {[0, 1, 2].map((idx) => (
              <button 
                key={idx} 
                className={`dot ${currentSlide === idx ? 'active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
                type="button"
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
