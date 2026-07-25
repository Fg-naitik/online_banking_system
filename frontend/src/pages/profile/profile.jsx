import { useState, useEffect } from "react";
import api from "../../services/api";
import './profile.css';
import '../../styles/global.css';
//import Sidebar from "../../components/sidebar/sidebar";

const Check = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <circle cx="6.5" cy="6.5" r="5.5" stroke="#10b981" strokeWidth="1.2"/>
    <path d="M4 6.5l1.8 1.8L9.5 4.5" stroke="#10b981" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CamIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <rect x="1" y="4" width="11" height="7.5" rx="1.5" stroke="#29b6f6" strokeWidth="1.2"/>
    <circle cx="6.5" cy="7.5" r="2" stroke="#29b6f6" strokeWidth="1.2"/>
    <path d="M4.5 4l1-1.5h2l1 1.5" stroke="#29b6f6" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const MailI = () => <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="1" y="3" width="11" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.2"/><path d="M1.5 3.5l5 3.5 5-3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
const PhoneI = () => <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M3 1.5h2l1 2.5-1.3 1c.5 1.2 1.4 2.1 2.6 2.6l1-1.3 2.5 1V9c0 1-.8 1.5-1.7 1.4-3.6-.6-6.5-3.4-7.1-7-.1-.9.4-1.7 1-1.9z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg>;

const UserI = () => <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="4.5" r="2" stroke="currentColor" strokeWidth="1.1"/><path d="M2 11c0-2.3 2-4.2 4.5-4.2S11 8.7 11 11" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>;
const CalI = () => <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="1" y="2" width="11" height="9.5" rx="1.2" stroke="currentColor" strokeWidth="1.1"/><path d="M4 1v2.4M9 1v2.4M1 5.2h11" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>;
const GlobeI = () => <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.1"/><path d="M1 6.5h11M6.5 1c1.8 1.7 1.8 9.3 0 11M6.5 1c-1.8 1.7-1.8 9.3 0 11" stroke="currentColor" strokeWidth="1.1"/></svg>;
const DeviceI = () => <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="3" y="1" width="7" height="11" rx="1.2" stroke="currentColor" strokeWidth="1.1"/><path d="M6 10.3h1" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>;

const ShareI = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1L2 3v3.5c0 3 2.1 5 5 6 2.9-1 5-3 5-6V3L7 1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg>;
const BoltI = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7.5 1L3 8h3.5L6 13l4.5-7H7l1.5-5z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/></svg>;

export default function ProfilePage() {
  const [aiToggle, setAiToggle] = useState(true);
  const [mktToggle, setMktToggle] = useState(false);
  const [profile, setProfile] = useState({});
  useEffect(() => {
  fetchProfile();
}, []);
const fetchProfile = async () => {
  try {

    const res = await api.get("/profile");

    setProfile(res.data.profile);

  } catch (error) {

    console.error(error);

  }
};

  return (
    <div className="profile-layout">
      

      <div className="profile-main">
        <div className="profile-content">

          <div className="pf-breadcrumb">DASHBOARD &nbsp;›&nbsp; ACCOUNT PROFILE</div>
          <div className="pf-header">
            <h1>Your Profile</h1>
            <div className="pf-header-actions">
              <button className="btn-manage-cards">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="3" width="12" height="8" rx="1.3" stroke="#475569" strokeWidth="1.2"/><path d="M1 5.5h12" stroke="#475569" strokeWidth="1.2"/></svg>
                Manage Cards
              </button>
              <button className="btn-logout-red">Logout</button>
            </div>
          </div>

          {/* Hero Banner */}
          <div className="pf-banner">
            <div className="pf-avatar-wrap">
              <div className="pf-avatar">{profile?.profile_image ? (
                    <img
                        src={profile.profile_image}
                        alt="profile"
                    />
                ) : (
                    profile?.first_name?.charAt(0)
                )}</div>
              <div className="pf-avatar-cam"><CamIcon /></div>
            </div>
            <div className="pf-banner-info">
              <div className="pf-name-row">
                <h2>{profile?.first_name} {profile?.last_name}</h2>
                <span className="pf-verified-badge"><Check /> APNA Bank Premium</span>
              </div>
              <div className="pf-contact-row">
                <span><MailI /> {profile?.email}</span>
                <span><PhoneI /> {profile?.phone}</span>
              </div>
              <div className="pf-banner-buttons">
                <button className="btn-edit-profile">Edit Profile</button>
                <button className="btn-public-profile">View Public Profile</button>
              </div>
            </div>
            <div className="pf-banner-deco">
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none"><path d="M30 5L10 28h15l-5 17 20-23H25l5-17z" stroke="#29b6f6" strokeWidth="2" strokeLinejoin="round"/></svg>
            </div>
          </div>

          {/* Three Cards Row */}
          <div className="pf-cards-row">

            <div className="pf-info-card">
              <div className="pf-card-top">
                <div className="pf-card-title"><Check /> Identity Verification</div>
                <span className="pf-level-badge">Level 2</span>
              </div>
              <div className="pf-card-sub">KYC Level 2: Advanced Banking Access</div>
              <div className="pf-kyc-bar"><div className="pf-kyc-fill"></div></div>
              <div className="pf-checklist">
                <div className="pf-check-item"><Check /> Government ID Verified</div>
                <div className="pf-check-item"><Check /> Biometric Face Match Active</div>
                <div className="pf-check-item"><Check /> Proof of Address Confirmed</div>
              </div>
            </div>

            <div className="pf-info-card">
              <div className="pf-card-top">
                <div className="pf-card-title">🎓 Gen Z Premium Benefits</div>
              </div>
              <div className="pf-card-sub">Your active membership since Oct 2023</div>
              <div className="pf-benefit-grid">
                <div className="pf-benefit"><div className="pf-benefit-icon">💱</div>Zero Forex Fees</div>
                <div className="pf-benefit"><div className="pf-benefit-icon">🤖</div>AI Wealth Coach</div>
                <div className="pf-benefit"><div className="pf-benefit-icon">💰</div>1% Crypto Cashback</div>
                <div className="pf-benefit"><div className="pf-benefit-icon">⭐</div>Priority Support</div>
              </div>
              <a href="#" className="pf-upgrade-link">Upgrade to Founder Tier →</a>
            </div>

            <div className="pf-info-card">
              <div className="pf-card-top">
                <div className="pf-card-title"><BoltI /> Financial Health</div>
              </div>
              <div className="pf-card-sub">Generated by Nova AI Coach</div>
              <div className="pf-score-circle">
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="32" fill="none" stroke="#f1f5f9" strokeWidth="7"/>
                  <circle cx="40" cy="40" r="32" fill="none" stroke="#29b6f6" strokeWidth="7"
                    strokeDasharray={`${2*Math.PI*32*0.82} ${2*Math.PI*32}`}
                    strokeLinecap="round" transform="rotate(-90 40 40)"/>
                  <text x="40" y="46" textAnchor="middle" fontSize="22" fontWeight="800" fill="#0f172a">82</text>
                </svg>
              </div>
              <div className="pf-score-text">Excellent Score!</div>
            </div>
          </div>

          {/* Personal Details + Security */}
          <div className="pf-detail-row">
            <div className="pf-detail-card">
              <h3>Personal Details</h3>
              <div className="pf-detail-list">
                <div className="pf-detail-item">
                  <span className="pf-detail-label"><UserI /> Full Name</span>
                  <span className="pf-detail-value">Alex Thompson</span>
                </div>
                <div className="pf-detail-item">
                  <span className="pf-detail-label"><CalI /> Date of Birth</span>
                  <span className="pf-detail-value">Jan 12, 1999</span>
                </div>
                <div className="pf-detail-item">
                  <span className="pf-detail-label"><GlobeI /> Nationality</span>
                  <span className="pf-detail-value">United Kingdom</span>
                </div>
                <div className="pf-detail-item">
                  <span className="pf-detail-label"><DeviceI /> Primary Device</span>
                  <span className="pf-detail-value">iPhone 15 Pro</span>
                </div>
              </div>
            </div>

            <div className="pf-detail-card">
              <h3>Security Summary</h3>
              <div className="pf-detail-list">
                <div className="pf-sec-item">
                  <div className="pf-sec-left">
                    <span className="pf-sec-title">Two-Factor Auth</span>
                    <span className="pf-sec-sub">Active via Authenticator App</span>
                  </div>
                  <span className="pf-sec-status status-enabled">ENABLED</span>
                </div>
                <div className="pf-sec-item">
                  <div className="pf-sec-left">
                    <span className="pf-sec-title">Biometric Login</span>
                    <span className="pf-sec-sub">Touch ID / Face ID</span>
                  </div>
                  <span className="pf-sec-status status-partial">PARTIAL</span>
                </div>
                <div className="pf-sec-item">
                  <div className="pf-sec-left">
                    <span className="pf-sec-title">Password Last Changed</span>
                    <span className="pf-sec-sub">42 days ago</span>
                  </div>
                  <span className="pf-sec-status status-update">UPDATE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Account Preferences */}
          <div className="pf-prefs-card">
            <h3>Account Preferences</h3>
            <p>Manage how NovaBank AI interacts with your data and devices.</p>

            <div className="pf-pref-row">
              <div className="pf-pref-left">
                <ShareI />
                <div>
                  <div className="pf-pref-title">Privacy & Data Sharing</div>
                  <div className="pf-pref-sub">Control third-party app access and data usage</div>
                </div>
              </div>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 6l3 3 3-3" stroke="#94a3b8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>

            <div className="pf-pref-row">
              <div>
                <div className="pf-pref-title">Personalized AI Insights</div>
              </div>
              <button className={`toggle${aiToggle ? ' on' : ''}`} onClick={() => setAiToggle(!aiToggle)}></button>
            </div>

            <div className="pf-pref-row">
              <div>
                <div className="pf-pref-title">Marketing Communications</div>
              </div>
              <button className={`toggle${mktToggle ? ' on' : ''}`} onClick={() => setMktToggle(!mktToggle)}></button>
            </div>

            <button className="pf-data-portability-btn">Manage Data Portability</button>

            <div className="pf-pref-row" style={{marginTop:'4px'}}>
              <div className="pf-pref-left">
                <BoltI />
                <div>
                  <div className="pf-pref-title">Smart Notifications</div>
                  <div className="pf-pref-sub">Set alerts for spending, budgets, and security</div>
                </div>
              </div>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 6l3 3 3-3" stroke="#94a3b8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>

          {/* Data Management */}
          <div className="pf-data-mgmt">
            <div className="pf-dm-text">
              <h4>Data Management</h4>
              <p>Download all your transaction history and personal data or close your account.</p>
            </div>
            <div className="pf-dm-actions">
              <button className="btn-export">Export My Data</button>
              <button className="btn-close-acc">Close Account</button>
            </div>
          </div>

        </div>

        <div className="pf-footer" style={{marginLeft:0}}>
          <span>© 2024 NovaBank AI. Secure Banking for Gen Z.</span>
          <div className="pf-footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact Support</a>
          </div>
        </div>
      </div>

      <button className="pf-ai-fab">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2l1.6 4.4H16l-3.5 2.6 1.4 4.4L10 10.8l-3.9 2.6 1.4-4.4L4 6.4h4.4L10 2z" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round" fill="rgba(255,255,255,0.25)"/>
        </svg>
      </button>
    </div>
  );
}