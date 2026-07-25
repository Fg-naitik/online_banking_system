import { useState } from 'react';
import './register.css';
import '../../styles/global.css';
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

/* ── Icons ── */
const LogoIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path d="M2 12L7.5 3l5.5 9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4.5 8h6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const UserIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="4.5" r="2.5" stroke="#94a3b8" strokeWidth="1.3"/>
    <path d="M2 12c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect x="1" y="3" width="12" height="8" rx="1.5" stroke="#94a3b8" strokeWidth="1.3"/>
    <path d="M1.5 3.5l5.5 4 5.5-4" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect x="2" y="6" width="10" height="7" rx="1.5" stroke="#94a3b8" strokeWidth="1.3"/>
    <path d="M4 6V4.5a3 3 0 016 0V6" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M1 7s2-4 6-4 6 4 6 4-2 4-6 4-6-4-6-4z" stroke="#94a3b8" strokeWidth="1.3"/>
    <circle cx="7" cy="7" r="1.5" stroke="#94a3b8" strokeWidth="1.3"/>
  </svg>
);

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M3 7h8M8 4l3 3-3 3" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path d="M6.5 1L2 2.8V6c0 2.8 2 4.7 4.5 5.5C9 11.7 11 9.8 11 7V2.8L6.5 1z" stroke="#29b6f6" strokeWidth="1.3" strokeLinejoin="round"/>
  </svg>
);

const KycIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 1L3 3v4c0 3.3 2.3 5.7 5 6.5 2.7-.8 5-3.2 5-6.5V3L8 1z" stroke="#64748b" strokeWidth="1.3" strokeLinejoin="round"/>
    <path d="M5.5 8l2 2L11 6" stroke="#64748b" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SavingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 8c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6-6-2.7-6-6z" stroke="#64748b" strokeWidth="1.3"/>
    <path d="M8 5v3l2 1.5" stroke="#64748b" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 14.5l4-2" stroke="#64748b" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

const NoFeeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6" stroke="#64748b" strokeWidth="1.3"/>
    <path d="M5.5 8l2 2L11 5.5" stroke="#64748b" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AIIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 1l1.5 4H13l-3.5 2.5 1.5 4L7 9l-4 2.5 1.5-4L1 5h4.5L7 1z" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" fill="rgba(255,255,255,0.3)"/>
  </svg>
);

const steps = [
  { icon: '👤', label: 'Account', active: true },
  { icon: '🛡️', label: 'Verify', active: false },
  { icon: '✨', label: 'KYC', active: false },
];

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
const handleRegister = async () => {
  if (!formData.firstName.trim()) {
    return alert("First Name is required");
  }

  if (!formData.lastName.trim()) {
    return alert("Last Name is required");
  }

  if (!formData.email.trim()) {
    return alert("Email is required");
  }

  if (!/\S+@\S+\.\S+/.test(formData.email)) {
    return alert("Enter a valid email");
  }

  if (!formData.phone.trim()) {
    return alert("Phone Number is required");
  }

  if (!/^[0-9]{10}$/.test(formData.phone)) {
    return alert("Phone Number must contain 10 digits");
  }

  if (!formData.password.trim()) {
    return alert("Password is required");
  }

  if (formData.password.length < 8) {
    return alert("Password must be at least 8 characters");
  }
  if (formData.password !== formData.confirmPassword) {
  return alert("Passwords do not match");
}
if (!acceptTerms) {
  return alert(
    "Please accept the Terms & Conditions"
  );
}

  try {
    setLoading(true);

    const res = await api.post("/auth/register", formData);

    alert("🎉 Welcome to APNA BANK!\nYour account has been created successfully.");
    setFormData({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

    navigate("/login");

  } catch (err) {
    alert(
      err.response?.data?.message ||
      "Registration Failed"
    );
  } finally {
    setLoading(false);
  }
};

const [loading, setLoading] = useState(false);
const navigate = useNavigate();
const [acceptTerms, setAcceptTerms] = useState(false);

  return (
    <div className="register-page">

      <div className="register-body">

        {/* ── LEFT PANEL ── */}
        <div className="register-left">
          <div className="reg-logo">
            <div className="logo-icon"><LogoIcon /></div>
            APNA Bank
          </div>

          <h2 className="reg-left-title">
            Open Your APNA BANK Account {' '}
            <span className="highlight">Today</span>
          </h2>
          <p className="reg-left-sub">
            Experience secure, fast, and convenient digital banking designed to help you manage your finances anytime, anywhere.
          </p>

          <div className="reg-features">
            <div className="reg-feature-item">
              <div className="feat-icon-wrap"><KycIcon /></div>
              <span>Instant Digital KYC</span>
            </div>
            <div className="reg-feature-item">
              <div className="feat-icon-wrap"><SavingsIcon /></div>
              <span>Smart Savings Pods</span>
            </div>
            <div className="reg-feature-item">
              <div className="feat-icon-wrap"><NoFeeIcon /></div>
              <span> Zero Hidden Charges</span>
            </div>
          </div>

          <div className="ai-tip-card">
            <div className="ai-tip-icon"><AIIcon /></div>
            <div className="ai-tip-content">
              <div className="ai-tip-name">APNA AI Assistant</div>
              <div className="ai-tip-text">
              Our AI assistant will guide you through account setup, financial planning, and smart banking recommendations.
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT CARD ── */}
        <div className="register-card">

          {/* Header */}
          <div className="reg-card-header">
            <div>
              <h2>Create Your Account</h2>
              <p>Join APNA BANK today and experience the future of digital banking.</p>
            </div>
           
          </div>

          {/* Step Indicator */}
          

          {/* Name Row */}
          <div className="form-row">
            <div className="form-group" style={{marginBottom: 0}}>
              <label>First Name</label>
              <div className="input-wrap">
                <span className="input-icon"><UserIcon /></span>
                <input type="text"name="firstName"value={formData.firstName}onChange={handleChange}placeholder="Enter your first name"/>
              </div>
            </div>
            <div className="form-group" style={{marginBottom: 0}}>
              <label>Last Name</label>
              <div className="input-wrap">
                <span className="input-icon"><UserIcon /></span>
                <input type="text"name="lastName"value={formData.lastName}onChange={handleChange}placeholder="Enter your last name"/>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-wrap">
              <span className="input-icon"><MailIcon /></span>
              <input type="email"name="email"value={formData.email}onChange={handleChange}placeholder="Enter your email"/>
            </div>
          </div>

          <div className="form-group">
            <label>Phone Number</label>

            <div className="input-wrap">
              <span className="input-icon">
                📞
              </span>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Create Password</label>
            <div className="input-wrap">
              <span className="input-icon"><LockIcon /></span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password"
              />
              <button className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
                <EyeIcon />
              </button>
            </div>
            <div className="password-strength">
              <span className="pw-strength-label">Password Strength:</span>
              <span className="pw-strength-value">{formData.password.length < 6? "Weak": formData.password.length < 10? "Medium": "Strong"}</span>
            </div>
            <div className="pw-strength-bar">
              <div
                className="pw-strength-fill"
                style={{
                  width:
                    formData.password.length < 6
                      ? "30%"
                      : formData.password.length < 10
                      ? "65%"
                      : "100%",
                  background:
                    formData.password.length < 6
                      ? "#ef4444"
                      : formData.password.length < 10
                      ? "#f59e0b"
                      : "#10b981",
                }}
              ></div>
            </div>
          </div>
          <div className="form-group">
            <label>Confirm Password</label>

            <div className="input-wrap">
              <span className="input-icon">
                <LockIcon />
              </span>

              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
              />
            </div>
          </div>

          {/* Continue */}
         <button className="btn-continue"onClick={handleRegister}disabled={loading || !acceptTerms}>
            {loading ? "Creating Account..." : "Create Account"}
<ArrowRight /> 
          </button>
          <div className="form-group">
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
              />

              I agree to the
              <a href="#"> Terms & Conditions </a>
              and
              <a href="#"> Privacy Policy</a>
            </label>
          </div>

          {/* Login link */}
          <div className="already-row">
            Already have an account?{' '}
            <a href="/login">Login to Dashboard</a>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BADGES ── */}
      <div className="reg-footer-badges">
        {[
          { icon: <ShieldIcon />, label: ' Bank-Grade Encryption' },
          { icon: <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5" stroke="#29b6f6" strokeWidth="1.3"/><path d="M4 6.5l2 2 3.5-3.5" stroke="#29b6f6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>, label: 'RBI Compliant Security' },
          { icon: <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5" stroke="#29b6f6" strokeWidth="1.3"/><path d="M6.5 3.5v3l2 1.5" stroke="#29b6f6" strokeWidth="1.3" strokeLinecap="round"/></svg>, label: 'AI-Powered Banking' },
        ].map(({ icon, label }) => (
          <div key={label} className="reg-footer-badge">
            {icon} {label}
          </div>
        ))}
      </div>

      {/* ── PAGE FOOTER ── */}
      <div className="reg-page-footer">
        © APNA Bank AI. All rights reserved. &nbsp;·&nbsp;
        <a href="#" style={{color:'#94a3b8'}}>Privacy Policy</a> &nbsp;·&nbsp;
        <a href="#" style={{color:'#94a3b8'}}>Terms of Service</a> &nbsp;·&nbsp;
        <a href="#" style={{color:'#94a3b8'}}>Help Center</a>
      </div>

    </div>
  );
}
export default Register;