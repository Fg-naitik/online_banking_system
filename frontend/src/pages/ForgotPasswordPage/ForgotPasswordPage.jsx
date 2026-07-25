import { useState } from 'react';
import './ForgotPasswordPage.css';
import '../../styles/global.css';
import { Link } from "react-router-dom";

const LogoIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path d="M2 12L7.5 3l5.5 9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4.5 8h6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="3.5" width="14" height="9" rx="1.5" stroke="#94a3b8" strokeWidth="1.3"/>
    <path d="M1.5 4l6.5 5 6.5-5" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6.5" stroke="#29b6f6" strokeWidth="1.3"/>
    <path d="M8 7.5v4M8 5.5v.2" stroke="#29b6f6" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M3 7h8M8 4l3 3-3 3" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BackArrow = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path d="M8 2.5L3.5 6.5 8 10.5" stroke="#64748b" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path d="M6.5 1L2 2.8V6c0 2.8 2 4.7 4.5 5.5C9 11.7 11 9.8 11 7V2.8L6.5 1z" stroke="#64748b" strokeWidth="1.2" strokeLinejoin="round"/>
  </svg>
);

const MobileIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <rect x="3" y="1" width="7" height="11" rx="1.3" stroke="#64748b" strokeWidth="1.2"/>
    <path d="M6 10.3h1" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const ChatIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 2h10v8H8.5L6.5 12V10H2V2z" stroke="#29b6f6" strokeWidth="1.2" strokeLinejoin="round"/>
  </svg>
);

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');

  return (
    <div className="fp-layout">

      <div className="fp-body">
        <div className="fp-card">

          {/* Logo */}
          <div className="fp-logo">
            <div className="fp-logo-icon"><LogoIcon /></div>
            NovaBank AI
          </div>

          {/* Title */}
          <div className="fp-title">Recover Access</div>
          <div className="fp-subtitle">Follow the steps to secure your account</div>

          {/* Step bars */}
          <div className="fp-step-bars">
            <div className="fp-bar active"></div>
            <div className="fp-bar inactive"></div>
            <div className="fp-bar inactive"></div>
          </div>

          {/* Email field */}
          <label className="fp-field-label">Account Email or Phone</label>
          <div className="fp-input-wrap">
            <span className="fp-input-icon"><MailIcon /></span>
            <input
              type="email"
              placeholder="e.g. alex@novabank.ai"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          {/* Info box */}
          <div className="fp-info-box">
            <span className="fp-info-icon"><InfoIcon /></span>
            <div className="fp-info-text">
              We'll send a 6-digit secure code to your registered device for verification.
            </div>
          </div>

          {/* Send button */}
          <button className={`btn-send-code${!email.trim() ? ' disabled' : ''}`}>
            Send Reset Code <ArrowRight />
          </button>

          {/* Back */}
          <Link to="/login" className="back-login">← Back to Login</Link>

          {/* Security strip */}
          <div className="fp-sec-strip">
            <div className="fp-sec-item">
              <ShieldIcon /> END-TO-END SECURE
            </div>
            <div className="fp-sec-item">
              <MobileIcon /> GEN Z BANKING
            </div>
          </div>

        </div>
      </div>

      {/* Help */}
      <div className="fp-help">
        Having trouble?&nbsp;
        <a href="#"><ChatIcon /> Contact AI Support</a>
      </div>

      {/* Footer links */}
      <div className="fp-page-footer">
        <a href="#">Privacy Policy</a>
        <div className="fp-footer-sep"></div>
        <a href="#">Terms of Service</a>
        <div className="fp-footer-sep"></div>
        <a href="#">Security Disclosure</a>
      </div>

    </div>
  );
}