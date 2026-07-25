import { useState } from 'react';
import './Security.css';
import '../../styles/global.css';
import Sidebar from '../../components/sidebar/sidebar';
import { useNavigate } from "react-router-dom";
import { useEffect} from "react";
import api from "../../services/api";


/* ── Icons ── */
const SearchIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="4.5" stroke="#94a3b8" strokeWidth="1.3"/><path d="M9.5 9.5l2.5 2.5" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round"/></svg>;
const BellIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5a4.5 4.5 0 014.5 4.5v2.5l1.5 2H2L3.5 8.5V6A4.5 4.5 0 018 1.5z" stroke="#64748b" strokeWidth="1.3" strokeLinejoin="round"/><path d="M6.5 12.5a1.5 1.5 0 003 0" stroke="#64748b" strokeWidth="1.3" strokeLinecap="round"/></svg>;
const RefreshIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M12 7A5 5 0 112 7" stroke="#475569" strokeWidth="1.4" strokeLinecap="round"/><path d="M12 3v4h-4" stroke="#475569" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const FreezeIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12M3 3l8 8M11 3l-8 8" stroke="#ef4444" strokeWidth="1.3" strokeLinecap="round"/></svg>;
const ShieldIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1L2 3.5V8c0 3.5 2.5 6 6 7.5 3.5-1.5 6-4 6-7.5V3.5L8 1z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>;
const LockIcon = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="2" y="6.5" width="11" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M4.5 6.5V4.5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>;
const FingerIcon = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M7.5 1a6.5 6.5 0 016.5 6.5c0 1.8-.5 3.5-1.3 4.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M1 7.5A6.5 6.5 0 017.5 1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M7.5 4.5a3 3 0 013 3c0 2-.5 3.5-1.3 4.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M4.5 7.5a3 3 0 013-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M7.5 7.5a1 1 0 011 1c0 2.5-.5 4.5-1.3 6.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>;
const DeviceIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="1" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M6 11h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
const DesktopIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1.5" width="12" height="8" rx="1.3" stroke="currentColor" strokeWidth="1.2"/><path d="M5 12.5h4M7 9.5v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
const AlertIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1L1 12h12L7 1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/><path d="M7 5v3.5M7 10v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
const CheckCircle = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#10b981" strokeWidth="1.3"/><path d="M4.5 7l2 2 3.5-3.5" stroke="#10b981" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const XCircle = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#ef4444" strokeWidth="1.3"/><path d="M4.5 9.5l5-5M9.5 9.5l-5-5" stroke="#ef4444" strokeWidth="1.3" strokeLinecap="round"/></svg>;
const ArrowR = () => <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const GeoIcon = () => <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="5" r="2.5" stroke="#29b6f6" strokeWidth="1.2"/><path d="M6 1C3.8 1 2 2.8 2 5c0 3 4 7 4 7s4-4 4-7c0-2.2-1.8-4-4-4z" stroke="#29b6f6" strokeWidth="1.2" strokeLinejoin="round"/></svg>;
const SimIcon = () => <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="2" y="1" width="8" height="10" rx="1.2" stroke="#10b981" strokeWidth="1.1"/><path d="M4 4h4M4 6.5h4M4 9h2" stroke="#10b981" strokeWidth="1.1" strokeLinecap="round"/></svg>;
const TxLimitIcon = () => <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="#29b6f6" strokeWidth="1.1"/><path d="M6 3.5v3l2 1.5" stroke="#29b6f6" strokeWidth="1.1" strokeLinecap="round"/></svg>;

const Toggle = ({ on, onChange }) => (
  <button onClick={onChange} style={{
    position:'relative', width:'40px', height:'22px', borderRadius:'11px',
    background: on ? '#29b6f6' : '#e2e8f0', border:'none', cursor:'pointer',
    flexShrink:0, transition:'background .2s'
  }}>
    <span style={{
      position:'absolute', top:'3px',
      left: on ? '21px' : '3px',
      width:'16px', height:'16px', background:'#fff', borderRadius:'50%',
      transition:'left .2s', boxShadow:'0 1px 3px rgba(0,0,0,.2)', display:'block'
    }}/>
  </button>
);

const loginHistory = [
  { date:'Oct 24, 2023, 10:45 AM', device:'iPhone 15 Pro', location:'New York, USA', ip:'192.168.1.1', status:'Success' },
  { date:'Oct 23, 2023, 08:12 PM', device:'MacBook Pro 14*', location:'New York, USA', ip:'192.168.1.45', status:'Success' },
  { date:'Oct 22, 2023, 11:30 PM', device:'Chrome on Windows', location:'Unknown', ip:'103.24.55.12', status:'Failed' },
  { date:'Oct 21, 2023, 09:20 AM', device:'iPhone 15 Pro', location:'New York, USA', ip:'192.168.1.1', status:'Success' },
  { date:'Oct 20, 2023, 04:55 PM', device:'MacBook Pro 14*', location:'New York, USA', ip:'192.168.1.45', status:'Success' },
];

const devices = [
  { name:'iPhone 15 Pro', type:'mobile', location:'New York, USA', time:'Just now', current:true },
  { name:'MacBook Pro 14 (Chrome)', type:'desktop', location:'New York, USA', time:'2 hours ago', current:false },
  { name:'iPad Air (App)', type:'mobile', location:'London, UK', time:'2 days ago', current:false },
  { name:'Windows PC (Edge)', type:'desktop', location:'New York, USA', time:'Oct 20, 2023', current:false },
];

export default function SecurityPage() {
  const [pwToggle, setPwToggle] = useState(true);
  const [tfaToggle, setTfaToggle] = useState(true);
  const [bioToggle, setBioToggle] = useState(true);
  const [realtimeAlerts, setRealtimeAlerts] = useState(true);
  const [hasPin, setHasPin] = useState(false);
  const [loadingPin, setLoadingPin] = useState(true);
  
  const navigate = useNavigate();
  useEffect(() => {
    const getPinStatus = async () => {
        try {
            const res = await api.get("/transfer/pin-status");
            setHasPin(res.data.hasPin);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingPin(false);
        }
    };

    getPinStatus();
}, []);

  return (
    <div className="sec-layout">
      <Sidebar active="security" />

      <div className="sec-main">
        {/* ── TOPBAR ── */}
        <div className="sec-topbar">
          <div className="sec-srch">
            <SearchIcon />
            <input type="text" placeholder="Search transactions or ask AI..." />
          </div>
          <div className="sec-tb-r">
            <button className="sec-bell"><BellIcon /><span className="sec-bdot"></span></button>
            <div style={{ textAlign:'right' }}>
              <span style={{ fontSize:'13px', fontWeight:600, display:'block' }}>Alex Rivera</span>
              <span style={{ fontSize:'11px', color:'#94a3b8', display:'block' }}>Premium Member</span>
            </div>
            <div className="sec-av">A<span className="sec-avd"></span></div>
          </div>
        </div>

        <div className="sec-content">

          {/* ── PAGE HEADER ── */}
          <div className="sec-page-header">
            <div>
              <h1>Security Center</h1>
              <p>Manage your account protection and monitor activity.</p>
            </div>
            
          </div>

          <div className="sec-grid">

            {/* ── LEFT COLUMN ── */}
            <div>

              {/* Authentication Methods */}
              <div className="sec-card">
                <h3>Authentication Methods</h3>
                <p>Secure how you access your APNA Bank account.</p>

                {/* Change Password */}
                <div className="sec-auth-row">
                  <div className="sec-auth-icon"><LockIcon /></div>
                  <div className="sec-auth-info">
                    <div className="sec-auth-title">Change Password</div>
                  </div>
                  <div className="sec-auth-right">

                        {loadingPin ? (

                            <span>Loading...</span>

                        ) : hasPin ? (

                            <>
                                <span
    className={`sec-strength-badge ${
        hasPin ? "active" : "setup"
    }`}
>
    {hasPin ? "Active" : "Not Set"}
</span>

                                {hasPin ? (
                                    
                                <button
                                    className="btn-set-pin"
                                    onClick={() => navigate("/security/change-pin")}
                                >
                                    Change PIN
                                </button>
                            ) : (
                                <button
                                    className="btn-set-pin"
                                    onClick={() => navigate("/security/set-pin")}
                                >
                                    Create PIN
                                </button>
                            )}
                            </>

                        ) : (

                            <>
                                <span className="sec-strength-badge setup">
                                    Not Set
                                </span>

                                <button
                                    className="btn-set-pin"
                                    onClick={() => navigate("/security/set-pin")}
                                >
                                    Create PIN
                                </button>
                            </>

                        )}

                    </div>
                </div>

                {/* 2FA */}
               
              </div>

              {/* Active Devices */}
              


              <div className="sec-auth-row">
                <div className="sec-auth-icon">
                    <LockIcon />
                </div>

                <div className="sec-auth-info">
                    <div className="sec-auth-title">Transaction PIN</div>
                    <div className="sec-auth-sub">
                    Secure every money transfer with a 4-digit Transaction PIN.
                    </div>
                </div>

                <div className="sec-auth-right">

                        <span
                            className={`sec-strength-badge ${
                                hasPin ? "active" : "setup"
                            }`}
                        >
                            {hasPin ? "Active" : "Not Set"}
                        </span>

                        {hasPin ? (
                            <button
                                className="btn-set-pin"
                                onClick={() => navigate("/security/change-pin")}
                            >
                                Change PIN
                            </button>
                        ) : (
                            <button
                                className="btn-set-pin"
                                onClick={() => navigate("/security/set-pin")}
                            >
                                Create PIN
                            </button>
                        )}

                    </div>
                </div>

              

            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className="sec-help-card">

    <div className="sec-help-icon">
        🛡
    </div>

    <div className="sec-help-title">
        Security Tips
    </div>

    <p className="sec-help-text">
        • Never share your Transaction PIN.<br/>
        • Never share OTP with anyone.<br/>
        • Always log out on shared devices.<br/>
        • Change your password regularly.
    </p>

</div>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div className="sec-footer" style={{ marginLeft:0 }}>
          <span>© 2024 NovaBank AI. Secure Banking for Gen Z.</span>
          <div className="sec-ftl">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact Support</a>
          </div>
        </div>
      </div>
    </div>
  );
}