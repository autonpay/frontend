import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/Button';
import { useRegister } from '../../hooks/useAuth';
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
  TerminalSquare,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import './Auth.css';

export const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    organizationName: '',
    organizationEmail: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { mutateAsync: register, isPending: loading } = useRegister();
  
  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const SLIDES_COUNT = 5;

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

  // Password Validation Logic
  const passwordCriteria = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
  };
  const isPasswordValid = Object.values(passwordCriteria).every(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPasswordValid) return;

    const payload = {
       ...formData,
       organizationEmail: formData.organizationEmail || undefined
    };

    try {
      const response = await register(payload);
      if (response.success) {
        login(response.data.token, response.data.user);
        navigate('/');
      }
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
             <h2>Create Account</h2>
             <p>Set up your Auton Terminal organization</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
             <div className="form-group">
               <label>Work Email</label>
               <input 
                 name="email"
                 type="email" 
                 placeholder="admin@autonpay.com" 
                 value={formData.email}
                 onChange={handleChange}
                 required 
               />
             </div>

             <div className="form-group">
               <label>Organization Name</label>
               <input 
                 name="organizationName"
                 type="text" 
                 placeholder="Acme Corp" 
                 value={formData.organizationName}
                 onChange={handleChange}
                 required 
               />
             </div>

             <div className="form-group">
               <label>Organization Email (Optional)</label>
               <input 
                 name="organizationEmail"
                 type="email" 
                 placeholder="billing@acme.com" 
                 value={formData.organizationEmail}
                 onChange={handleChange}
               />
             </div>
             
             <div className="form-group">
               <label>Password</label>
               <div className="password-input-wrapper">
                 <input 
                   name="password"
                   type={showPassword ? "text" : "password"}
                   placeholder="Create a strong password" 
                   value={formData.password}
                   onChange={handleChange}
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

               {/* Password Guidance Overlay */}
               <div className="password-guidance">
                 <div className={`criteria ${passwordCriteria.length ? 'met' : ''}`}>
                    {passwordCriteria.length ? <CheckCircle2 size={14}/> : <XCircle size={14}/>} 8+ characters
                 </div>
                 <div className={`criteria ${passwordCriteria.uppercase && passwordCriteria.lowercase ? 'met' : ''}`}>
                    {passwordCriteria.uppercase && passwordCriteria.lowercase ? <CheckCircle2 size={14}/> : <XCircle size={14}/>} Case sensitive
                 </div>
                 <div className={`criteria ${passwordCriteria.number ? 'met' : ''}`}>
                    {passwordCriteria.number ? <CheckCircle2 size={14}/> : <XCircle size={14}/>} Includes number
                 </div>
               </div>
             </div>


             <Button 
               variant="primary" 
               fullWidth 
               size="lg" 
               className="login-btn" 
               disabled={loading || !formData.email || !formData.organizationName || !isPasswordValid}
             >
               {loading ? 'Creating Account...' : <><Lock size={18} /> Initialize Organization</>}
             </Button>

             <div className="register-prompt">
               Already have an account? <Link to="/login">Sign In</Link>
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
