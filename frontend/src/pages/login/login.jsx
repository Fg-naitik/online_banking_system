import "./login.css";
import '../../styles/global.css';
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaMobileAlt, FaLock, FaFingerprint } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiShieldCheckFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../services/api";
import { toast } from "react-hot-toast";

const LogoIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path d="M2 12L7.5 3l5.5 9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4.5 8h6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const GoogleIcon = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
    <path d="M16.5 8.7c0-.6-.1-1.2-.2-1.7H8.5v3.2h4.5c-.2 1-.8 1.9-1.7 2.4v2h2.7c1.6-1.4 2.5-3.5 2.5-5.9z" fill="#4285F4"/>
    <path d="M8.5 17c2.2 0 4.1-.7 5.5-2l-2.7-2c-.7.5-1.7.8-2.8.8-2.1 0-3.9-1.4-4.6-3.4H1.2v2.1C2.6 15.1 5.4 17 8.5 17z" fill="#34A853"/>
    <path d="M3.9 10.4c-.2-.5-.3-1-.3-1.6s.1-1.1.3-1.6V5.1H1.2C.4 6.5 0 8 0 9.6s.4 3 1.2 4.5l2.7-2.1-.0-.6z" fill="#FBBC04"/>
    <path d="M8.5 3.4c1.2 0 2.3.4 3.1 1.2L14.1 2C12.6.8 10.7 0 8.5 0 5.4 0 2.6 1.9 1.2 4.7l2.7 2.1c.7-2 2.5-3.4 4.6-3.4z" fill="#E94235"/>
  </svg>
);

const GithubIcon = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M8.5 0C3.8 0 0 3.9 0 8.7c0 3.8 2.4 7 5.8 8.2.4.1.6-.2.6-.4v-1.5c-2.4.5-2.9-1.2-2.9-1.2-.4-1-.9-1.3-.9-1.3-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.2 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.9-.2-3.9-.9-3.9-4.2 0-.9.3-1.7.9-2.3-.1-.2-.4-1.1.1-2.2 0 0 .7-.2 2.4.9.7-.2 1.4-.3 2.2-.3.7 0 1.5.1 2.2.3 1.6-1.1 2.4-.9 2.4-.9.5 1.1.2 2 .1 2.2.6.6.9 1.4.9 2.3 0 3.3-2 4-3.9 4.2.3.3.6.8.6 1.7v2.5c0 .2.1.5.6.4C14.6 15.7 17 12.5 17 8.7 17 3.9 13.2 0 8.5 0z" fill="#24292e"/>
  </svg>
);

const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <rect x="1" y="3" width="13" height="9" rx="1.5" stroke="#94a3b8" strokeWidth="1.3"/>
    <path d="M1.5 3.5l6 4.5 6-4.5" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

const LockIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <rect x="2.5" y="6.5" width="10" height="7" rx="1.5" stroke="#94a3b8" strokeWidth="1.3"/>
    <path d="M4.5 6.5V4.5a3 3 0 016 0v2" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

const ArrowRight = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path d="M3 7.5h9M9 4.5l3 3-3 3" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FingerprintIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 1a9 9 0 019 9" stroke="#94a3b8" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M1 10a9 9 0 019-9" stroke="#94a3b8" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M10 5a5 5 0 015 5c0 2.2-.5 4-1.5 5.5" stroke="#94a3b8" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M5 10a5 5 0 015-5" stroke="#94a3b8" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M10 9a1 1 0 011 1c0 2.5-.4 4.5-1.2 6" stroke="#94a3b8" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M9 10a1 1 0 012 0" stroke="#94a3b8" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const response = await api.post("/auth/login", {
      email,
      password,
      
    });
    

    localStorage.setItem("token", response.data.token);

    toast.success("Login Successful!");

    if (response.data.user.role === "admin") {
  navigate("/admin/dashboard");
} else {
  navigate("/dashboard");
}
  } catch (error) {
    toast.error(
        error.response?.data?.message || "Login Failed"
  );
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="login-page">

      {/* ── NAVBAR ── */}
      <nav className="login-nav">
        <div className="nav-logo">
          <div className="logo-icon"><LogoIcon /></div>
          APNA BANK
        </div>
        <div className="nav-right">
          Don't have an account?


          <a href="/register">Create Account →</a>
        </div>
      </nav>

      {/* ── CARD ── */}
      <div className="login-body">
        <div className="login-card">
          <h1>Welcome Back to APNA BANK</h1>
          <p className="login-tagline">Securely access your account and manage your finances anytime, anywhere.</p>
          {/* Email */}
          <div className="form-field">
            <div className="field-input-wrap">
              <span className="field-icon"><MailIcon /></span>
              <input type="email"placeholder="Enter your registered email"value={email}onChange={(e) => setEmail(e.target.value)}/>
            </div>
          </div>

          {/* Password */}
          {/* Password */}
          <div className="form-field">
            <div className="field-input-wrap">
              <span className="field-icon">
                <LockIcon />
              </span>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {/* Checkbox + Forgot */}
          <div className="remember-row">
  <label className="remember-label">
    <input
      type="checkbox"
      checked={rememberMe}
      onChange={(e) => setRememberMe(e.target.checked)}
    />

    Remember Me
  </label>
   <Link to="/forgot-password">
    Forgot Password?
  </Link>


</div>

          {/* Sign In */}
          {/* Sign In */}
        <button type="button"className="btn-signin"onClick={handleLogin}disabled={loading}>
          {loading ? "Signing In..." : "Login to APNA BANK"}
          {!loading && <ArrowRight />}
        </button>
          {/* Biometric */}
            
          
        </div>
      </div>

      {/* ── SECURED NOTE ── */}
      <div className="secured-note">
        Protected by 256-bit SSL Encryption & RBI Compliant Security
      </div>

      {/* ── SECURITY BADGES ── */}
      <div className="login-footer-strip">
        <div className="security-badges">
          <div className="sec-badge">
            <div className="sec-badge-icon">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <rect x="1" y="5" width="11" height="7" rx="1.5" stroke="#29b6f6" strokeWidth="1.3"/>
                <path d="M4 5V3.5a2.5 2.5 0 015 0V5" stroke="#29b6f6" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="sec-badge-text">
              <strong>256-bit Encryption</strong>
              <span>Bank-grade protocols</span>
            </div>
          </div>
          <div className="sec-badge">
            <div className="sec-badge-icon">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M6.5 1L2 2.8V6c0 2.8 2 4.7 4.5 5.5C9 11.7 11 9.8 11 7V2.8L6.5 1z" stroke="#29b6f6" strokeWidth="1.3" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="sec-badge-text">
              <strong>RBI Compliant</strong>
              <span>Member FDIC insured</span>
            </div>
          </div>
          <div className="sec-badge">
            <div className="sec-badge-icon">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <circle cx="6.5" cy="6.5" r="5" stroke="#29b6f6" strokeWidth="1.3"/>
                <path d="M4 6.5l2 2 3.5-3.5" stroke="#29b6f6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="sec-badge-text">
              <strong>Multi-Factor Authentication</strong>
              <span>Apple/Android certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── PAGE FOOTER LINKS ── */}
      <div className="login-page-footer">
        <a href="#">PRIVACY POLICY</a>
        <div className="footer-sep"></div>
        <a href="#">TERMS OF SERVICE</a>
        <div className="footer-sep"></div>
        <a href="#">SECURITY DISCLOSURE</a>
      </div>

    </div>
  );
}