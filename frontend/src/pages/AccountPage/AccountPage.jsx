import { useState } from 'react';
import './AccountPage.css';
import '../../styles/global.css';
import Sidebar from "../../components/sidebar/sidebar";

const SearchIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="4.5" stroke="#94a3b8" strokeWidth="1.3"/><path d="M9.5 9.5l2.5 2.5" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round"/></svg>;
const BellIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5a4.5 4.5 0 014.5 4.5v2.5l1.5 2H2L3.5 8.5V6A4.5 4.5 0 018 1.5z" stroke="#64748b" strokeWidth="1.3" strokeLinejoin="round"/><path d="M6.5 12.5a1.5 1.5 0 003 0" stroke="#64748b" strokeWidth="1.3" strokeLinecap="round"/></svg>;
const CopyIcon = () => <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="4" y="4" width="8" height="8" rx="1.3" stroke="#94a3b8" strokeWidth="1.2"/><path d="M1 9V1h8" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round"/></svg>;
const EyeIcon = () => <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M1 6s2-3.5 5-3.5S11 6 11 6s-2 3.5-5 3.5S1 6 1 6z" stroke="rgba(255,255,255,0.8)" strokeWidth="1.1"/><circle cx="6" cy="6" r="1.5" stroke="rgba(255,255,255,0.8)" strokeWidth="1.1"/></svg>;
const ArrowRIcon = () => <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6.5 3l3 3-3 3" stroke="#29b6f6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const InfoIcon = () => <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5.5" stroke="#64748b" strokeWidth="1.1"/><path d="M6.5 6v3.2M6.5 4v.2" stroke="#64748b" strokeWidth="1.1" strokeLinecap="round"/></svg>;
const CheckMark = () => <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2 4-4" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const CardIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="3" width="12" height="8.5" rx="1.3" stroke="#64748b" strokeWidth="1.2"/><path d="M1 6h12" stroke="#64748b" strokeWidth="1.2"/></svg>;
const BankIcon = () => <svg width="80" height="80" viewBox="0 0 80 80" fill="none"><path d="M8 32h64M14 32V68M66 32V68M4 68h72M40 8L4 32h72L40 8z" stroke="#e2e8f0" strokeWidth="3.5" strokeLinejoin="round"/><rect x="26" y="44" width="11" height="24" stroke="#e2e8f0" strokeWidth="2.5"/><rect x="43" y="44" width="11" height="24" stroke="#e2e8f0" strokeWidth="2.5"/></svg>;

const accountDetails = [
  { label: 'ACCOUNT NUMBER', value: '4092 8823 1029 4452' },
  { label: 'ROUTING NUMBER', value: '121000358' },
  { label: 'IBAN', value: 'GB29 NOVA 4000 0123 4567 89' },
  { label: 'SWIFT / BIC', value: 'NOVAG82L' },
];

const securityControls = [
  {
    key: 'freeze', label: 'Freeze Account',
    icon: <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="1.5" y="5.5" width="10" height="6.5" rx="1.2" stroke="#64748b" strokeWidth="1.1"/><path d="M4 5.5V4a2.5 2.5 0 015 0v1.5" stroke="#64748b" strokeWidth="1.1" strokeLinecap="round"/></svg>
  },
  {
    key: 'nfc', label: 'NFC Payments',
    icon: <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1L1.5 3.5v3.5c0 3 2.2 5 5 6 2.8-1 5-3 5-6V3.5L6.5 1z" stroke="#64748b" strokeWidth="1.1" strokeLinejoin="round"/></svg>
  },
  {
    key: 'online', label: 'Online Transactions',
    icon: <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 9l3-3 2.5 2.5L11 4" stroke="#64748b" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/></svg>
  },
];

export default function AccountPage() {
  const [checks, setChecks] = useState({ freeze: false, nfc: true, online: true });
  const [copied, setCopied] = useState('');

  const toggleCheck = (key) => setChecks(prev => ({ ...prev, [key]: !prev[key] }));

  const handleCopy = (value, label) => {
    navigator.clipboard.writeText(value).catch(() => {});
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="ac-layout">
      <Sidebar active="dashboard" />

      <div className="ac-main">

        {/* ── TOPBAR ── */}
        <div className="ac-topbar">
          <div className="ac-srch">
            <SearchIcon />
            <input type="text" placeholder="Search transactions or ask AI..." />
          </div>
          <div className="ac-tb-r">
            <button className="ac-bell">
              <BellIcon />
              <span className="ac-bdot"></span>
            </button>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, display: 'block' }}>Alex Johnson</span>
              <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block' }}>Premium Member</span>
            </div>
            <div className="ac-av">A<span className="ac-avd"></span></div>
          </div>
        </div>

        {/* ── CONTENT GRID ── */}
        <div className="ac-content">

          {/* ── LEFT COLUMN ── */}
          <div>

            {/* Account Info Card */}
            <div className="ac-info-card">
              <div>
                <div className="ac-acct-row">
                  <CardIcon />
                  <span className="ac-acct-label">Personal Account • 8823</span>
                  <span className="ac-checking-tag">Checking</span>
                </div>
                <div className="ac-balance-lbl">Available Balance</div>
                <div className="ac-balance-val">
                  $12,450.75 <span className="ac-currency-tag">USD</span>
                </div>
                <div className="ac-cta-btns">
                  <button className="btn-add-money">Add Money</button>
                  <button className="btn-send-money">Send Money</button>
                </div>
              </div>
              <div className="ac-bank-icon"><BankIcon /></div>
            </div>

            {/* Account Details Grid */}
            <div className="ac-details-grid">
              {accountDetails.map(d => (
                <div key={d.label} className="ac-detail-box">
                  <div className="ac-detail-lbl">{d.label}</div>
                  <div className="ac-detail-val">
                    <span>{d.value}</span>
                    <button
                      className="ac-copy-btn"
                      onClick={() => handleCopy(d.value, d.label)}
                      title="Copy"
                    >
                      {copied === d.label
                        ? <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2.5 6.5l3 3 5-6" stroke="#10b981" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        : <CopyIcon />
                      }
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Linked Cards Header */}
            <div className="ac-cards-hdr">
              <div>
                <h3>Linked Cards</h3>
                <p>Manage your virtual and physical spending tools</p>
              </div>
              <button className="btn-add-card">+ Add New Card</button>
            </div>

            {/* Cards Row */}
            <div className="ac-cards-row">
              {/* Visa Titanium */}
              <div className="ac-virtual-card ac-vc-visa">
                <div className="ac-vc-deco"></div>
                <div className="ac-vc-deco2"></div>
                <div className="ac-vc-network">Visa</div>
                <button className="ac-vc-eye"><EyeIcon /></button>
                <div className="ac-vc-body">
                  <div className="ac-vc-chip"></div>
                  <div className="ac-vc-number">•••• •••• •••• 8842</div>
                  <div className="ac-vc-footer">
                    <div>
                      <div className="ac-vc-holder-lbl">NOVABANK TITANIUM</div>
                      <div className="ac-vc-holder">ALEX JOHNSON</div>
                    </div>
                    <div className="ac-vc-expiry">08/27</div>
                  </div>
                </div>
              </div>

              {/* Mastercard Virtual */}
              <div className="ac-virtual-card ac-vc-mc">
                <div className="ac-vc-deco"></div>
                <div className="ac-vc-deco2"></div>
                <div className="ac-vc-network">Mastercard</div>
                <button className="ac-vc-eye"><EyeIcon /></button>
                <div className="ac-vc-body">
                  <div className="ac-vc-chip"></div>
                  <div className="ac-vc-number">•••• •••• •••• 1029</div>
                  <div className="ac-vc-footer">
                    <div>
                      <div className="ac-vc-holder-lbl">NOVABANK VIRTUAL</div>
                      <div className="ac-vc-holder">ALEX JOHNSON</div>
                    </div>
                    <div className="ac-vc-expiry">12/28</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Upgrade Banner */}
            <div className="ac-upgrade-banner">
              <div>
                <div className="ac-upgrade-title">Upgrade to Elite Plus</div>
                <div className="ac-upgrade-sub">
                  Get 5% cashback on all travel bookings and priority AI investment advisory.
                </div>
              </div>
              <button className="btn-upgrade-now">Upgrade Now</button>
            </div>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div className="ac-right-panel">

            {/* AI Financial Insights */}
            <div className="ac-ai-card">
              <div className="ac-ai-lbl">✦ AI Financial Insights</div>
              <div className="ac-ai-inner">
                <div className="ac-ai-score-col">
                  <div className="ac-ai-pct">88%</div>
                  <div className="ac-ai-sub">Health Score</div>
                  <div className="ac-ai-desc">Excellent liquidity this month</div>
                </div>
                <svg width="58" height="58" viewBox="0 0 58 58">
                  <circle cx="29" cy="29" r="24" fill="none" stroke="#f1f5f9" strokeWidth="5"/>
                  <circle cx="29" cy="29" r="24" fill="none" stroke="#10b981" strokeWidth="5"
                    strokeDasharray={`${2 * Math.PI * 24 * 0.88} ${2 * Math.PI * 24}`}
                    strokeLinecap="round" transform="rotate(-90 29 29)"/>
                  <text x="29" y="33" textAnchor="middle" fontSize="12" fontWeight="800" fill="#0f172a">88%</text>
                </svg>
              </div>
              <div className="ac-ai-quote">
                "Your spending on subscriptions is 15% lower than last month. Consider moving the $45 saved to your Dream Vacation vault."
              </div>
              <button className="ac-ai-link">View full report <ArrowRIcon /></button>
            </div>

            {/* Quick Action Buttons */}
            <div className="ac-quick-grid">
              <div className="ac-quick-btn">
                <div className="ac-quick-ico">📥</div>
                <div className="ac-quick-lbl">Statements</div>
              </div>
              <div className="ac-quick-btn">
                <div className="ac-quick-ico">🛡️</div>
                <div className="ac-quick-lbl">Limits</div>
              </div>
            </div>

            {/* Security Quick Controls */}
            <div className="ac-sec-card">
              <div className="ac-sec-title">Security Quick-Controls</div>
              {securityControls.map(item => (
                <div key={item.key} className="ac-sec-row">
                  <span className="ac-sec-label">
                    {item.icon} {item.label}
                  </span>
                  <div
                    className={`ac-checkbox${checks[item.key] ? ' checked' : ''}`}
                    onClick={() => toggleCheck(item.key)}
                  >
                    {checks[item.key] && <CheckMark />}
                  </div>
                </div>
              ))}
              <button className="ac-view-sec">
                View all security settings <ArrowRIcon />
              </button>
              <div className="ac-sec-note">
                <InfoIcon />
                Your virtual cards are protected by dynamic CVV. Each online transaction requires mobile app verification.
              </div>
            </div>

          </div>
        </div>

        {/* ── FOOTER ── */}
        <div className="ac-footer" style={{ marginLeft: 0 }}>
          <span>© 2024 NovaBank AI. Secure Banking for Gen Z.</span>
          <div className="ac-ftl">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact Support</a>
          </div>
        </div>
      </div>
    </div>
  );
}