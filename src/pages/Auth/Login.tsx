import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/Button';
import { useLogin } from '../../hooks/useAuth';
import { 
  Network, 
  Eye, 
  EyeOff, 
  BarChart3, 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  ArrowRightLeft, 
  RefreshCcw, 
  Globe, 
  TerminalSquare 
} from 'lucide-react';
import './Auth.css';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { mutateAsync: loginUser, isPending: loading } = useLogin();
  
  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const SLIDES_COUNT = 5;
  
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
    
    if (diff > 50) setCurrentSlide((p) => Math.min(p + 1, SLIDES_COUNT - 1)); 
    if (diff < -50) setCurrentSlide((p) => Math.max(p - 1, 0)); 
    
    setTouchStart(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      if (response.success) {
        login(response.data.token, response.data.user);
        const from = (location.state as any)?.from?.pathname || '/';
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.error('Login failed:', err);
      // Errors are handled globally by TanStack Query + Sonner
    }
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
             <h2>Auton Terminal</h2>
             <p>Enter your administrative credentials to continue.</p>
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
               <div className="password-input-wrapper">
                 <input 
                   type={showPassword ? "text" : "password"}
                   placeholder="Enter your security key" 
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
                 <span>Remember me on this trusted device</span>
               </label>
               <a href="#" className="forgot-password">Forgot key?</a>
             </div>

             <Button 
               variant="primary" 
               fullWidth 
               size="lg" 
               className="login-btn" 
               disabled={loading || !email || !password}
             >
               {loading ? 'Authenticating...' : <><Lock size={18} /> Secure Sign In</>}
             </Button>

             <div className="register-prompt">
               Don't have an operating account? <Link to="/register">Register</Link>
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
            
            <div className="carousel-slide">
              <div className="showcase-visuals">
                <div className="mock-panel mock-card-visual">
                  <div className="card-chip"></div>
                  <div className="card-network"><Network size={16}/> Auton</div>
                  <div className="card-number">•••• •••• •••• 4281</div>
                  <div className="card-name">Engineering Dept</div>
                </div>
                <div className="mock-panel panel-balance">
                  <div className="panel-header">Available Limit</div>
                  <div className="panel-number">$12,450.00</div>
                </div>
              </div>
              <div className="showcase-content">
                <h2>Corporate Spend Control</h2>
                <p>Issue virtual and physical cards instantly. Set granular controls on where, when, and how much your team can spend.</p>
              </div>
            </div>

            <div className="carousel-slide">
              <div className="showcase-visuals">
                 <div className="mock-panel panel-center">
                    <div className="panel-header" style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                       <ShieldCheck size={16} color="#4338ca"/> Policy Engine
                    </div>
                    <h3 style={{margin: '12px 0 8px', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                       <ArrowRightLeft size={20} color="#ff6d00"/> Decline &gt; $500 Weekly
                    </h3>
                    <div style={{color: '#94a3b8', fontSize: '13px', marginBottom: '16px'}}>
                      Prevents transactions dynamically at the point of sale.
                    </div>
                    <div className="badge-chip">Active Enforcement</div>
                 </div>
              </div>
              <div className="showcase-content">
                <h2>Advanced Authorization</h2>
                <p>Build custom approval workflows and programmable velocity limits. Stop fraudulent or out-of-policy transactions before they settle.</p>
              </div>
            </div>

            <div className="carousel-slide">
              <div className="showcase-visuals">
                <div className="mock-panel sync-panel">
                  <div className="sync-item">
                    <div className="sync-icon"><CreditCard size={18}/></div>
                    <div className="sync-info">
                       <span className="sync-title">Cloudflare Inc</span>
                       <span className="sync-sub">$120.00 • Software</span>
                    </div>
                  </div>
                  <div className="sync-arrows">
                    <RefreshCcw size={20} color="#10b981" />
                  </div>
                  <div className="sync-item erp">
                    <div className="sync-icon erp-icon"><BarChart3 size={18}/></div>
                    <div className="sync-info">
                       <span className="sync-title">NetSuite ERP</span>
                       <span className="sync-sub">Ledger Code 6420 synced</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="showcase-content">
                <h2>Automated Reconciliation</h2>
                <p>Close your books in real-time. Automatically sync enriched transaction data, receipts, and accounting codes directly to your ERP.</p>
              </div>
            </div>

            <div className="carousel-slide">
              <div className="showcase-visuals">
                <div className="mock-panel fx-panel">
                  <div className="panel-header">Cross-Border Payout</div>
                  <div className="fx-row">
                    <div className="fx-currency">USD</div>
                    <div className="fx-amount">$5,000.00</div>
                  </div>
                  <div className="fx-divider">
                     <span>1 USD = 0.92 EUR</span>
                  </div>
                  <div className="fx-row highlight-row">
                    <div className="fx-currency">EUR</div>
                    <div className="fx-amount">€4,600.00</div>
                  </div>
                  <div className="fx-status"><Globe size={14} /> Settling via local rails</div>
                </div>
              </div>
              <div className="showcase-content">
                <h2>Global Payouts Platform</h2>
                <p>Settle funds across borders securely. Support for over 130 currencies with transparent FX rates and instant local clearing.</p>
              </div>
            </div>

            <div className="carousel-slide">
              <div className="showcase-visuals">
                 <div className="mock-panel code-panel">
                    <div className="panel-header" style={{marginBottom: '12px'}}><TerminalSquare size={16}/> transaction.settled</div>
                    <pre className="code-block">
{`{
  "event": "transaction.cleared",
  "data": {
    "amount": 12500,
    "merchant": "AWS AMZN.COM",
    "card_id": "c_29aB7z",
    "user": "eng_prod_01"
  }
}`}
                    </pre>
                 </div>
              </div>
              <div className="showcase-content">
                <h2>Developer-First Infrastructure</h2>
                <p>Integrate deeply into your software architecture. Flexible webhooks, robust REST APIs, and enterprise-grade 99.99% uptime reliability.</p>
              </div>
            </div>

          </div>

          <div className="carousel-dots">
            {[0, 1, 2, 3, 4].map((idx) => (
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
