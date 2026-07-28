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

         
          


        </div>

        <div className="pf-footer" style={{marginLeft:0}}>
          <span>© apna bank.</span>
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