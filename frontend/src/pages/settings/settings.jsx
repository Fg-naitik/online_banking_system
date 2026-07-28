import { useState } from 'react';
import '../../styles/global.css';
import Sidebar from "../../components/sidebar/sidebar";

const Toggle = ({ on, onChange }) => (
  <button
    onClick={onChange}
    style={{
      position:'relative', width:'38px', height:'21px', borderRadius:'11px',
      background: on ? '#29b6f6' : '#e2e8f0', border:'none', cursor:'pointer', flexShrink:0, transition:'background .2s'
    }}
  >
    <span style={{
      position:'absolute', top:'2px', left: on ? '19px' : '2px',
      width:'17px', height:'17px', background:'#fff', borderRadius:'50%',
      transition:'left .2s', boxShadow:'0 1px 2px rgba(0,0,0,.15)', display:'block'
    }}/>
  </button>
);

export default function SettingsPage() {
  const [theme, setTheme] = useState('light');
  const [autoTransition, setAutoTransition] = useState(false);
  const [push, setPush] = useState(true);
  const [email, setEmail] = useState(false);
  const [sms, setSms] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [stealth, setStealth] = useState(false);
  const [biometric, setBiometric] = useState(true);
  const [globalPay, setGlobalPay] = useState(true);
  const [dataShare, setDataShare] = useState(false);

  const styles = {
    layout: { display:'flex', minHeight:'100vh', background:'#f8fafc', fontFamily:'-apple-system,BlinkMacSystemFont,Inter,sans-serif' },
    main: { marginLeft:'192px', flex:1, display:'flex', flexDirection:'column' },
    tb: { height:'56px', background:'#fff', borderBottom:'1px solid #e2e8f0', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 28px', position:'sticky', top:0, zIndex:40 },
    srch: { display:'flex', alignItems:'center', gap:'8px', background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:'8px', padding:'8px 14px', minWidth:'260px' },
    content: { padding:'24px 28px 40px', flex:1, display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px', alignItems:'start' },
    pageHdr: { gridColumn:'1/-1', marginBottom:'4px' },
    bc: { fontSize:'11px', fontWeight:700, color:'#94a3b8', letterSpacing:'.04em', marginBottom:'6px', textTransform:'uppercase' },
    h1: { fontSize:'22px', fontWeight:800, color:'#0f172a', letterSpacing:'-.01em' },
    sub: { fontSize:'13px', color:'#64748b', marginTop:'3px' },
    card: { background:'#fff', borderRadius:'12px', border:'1px solid #f1f5f9', boxShadow:'0 1px 3px rgba(0,0,0,.05)', padding:'20px', marginBottom:'18px' },
    cardTitle: { fontSize:'14px', fontWeight:700, color:'#0f172a', marginBottom:'4px', display:'flex', alignItems:'center', gap:'8px' },
    cardSub: { fontSize:'12px', color:'#94a3b8', marginBottom:'18px' },
    themeGrid: { display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'10px', marginBottom:'16px' },
    themeBtn: (active) => ({
      display:'flex', flexDirection:'column', alignItems:'center', gap:'6px',
      padding:'12px 8px', borderRadius:'9px', cursor:'pointer',
      border: active ? '2px solid #29b6f6' : '1.5px solid #e2e8f0',
      background: active ? '#e1f5fe' : '#f8fafc', transition:'all .15s'
    }),
    themIcon: { fontSize:'18px' },
    themLabel: (active) => ({ fontSize:'12px', fontWeight:600, color: active ? '#0288d1' : '#475569' }),
    prefRow: { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'13px 0', borderBottom:'1px solid #f8fafc' },
    prefLeft: { display:'flex', alignItems:'center', gap:'10px' },
    prefIcon: { width:'32px', height:'32px', borderRadius:'8px', background:'#f1f5f9', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'15px', flexShrink:0 },
    prefTitle: { fontSize:'13px', fontWeight:600, color:'#0f172a' },
    prefSub: { fontSize:'11.5px', color:'#94a3b8', marginTop:'1px' },
    userCard: { display:'flex', alignItems:'center', gap:'14px', padding:'14px 0', marginBottom:'4px' },
    userAvatar: { width:'52px', height:'52px', borderRadius:'50%', background:'#29b6f6', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px', fontWeight:700, color:'#fff', flexShrink:0 },
    userName: { fontSize:'14.5px', fontWeight:700, color:'#0f172a' },
    userTier: { fontSize:'12px', color:'#29b6f6', fontWeight:600, marginTop:'2px' },
    actionBtn: (danger) => ({
      width:'100%', background:danger?'none':'#fff', border:`1px solid ${danger?'#fecaca':'#e2e8f0'}`,
      borderRadius:'8px', padding:'10px', fontSize:'12.5px', fontWeight:600,
      color:danger?'#ef4444':'#475569', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'space-between',
      marginBottom:'8px'
    }),
    bottomBtns: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginTop:'12px' },
    btn: (primary) => ({
      padding:'11px', borderRadius:'8px', fontSize:'13px', fontWeight:600, cursor:'pointer',
      background: primary ? '#29b6f6' : '#fff',
      color: primary ? '#fff' : '#475569',
      border: primary ? 'none' : '1px solid #e2e8f0'
    }),
    langRow: { display:'flex', gap:'12px', padding:'16px', background:'#fff', borderRadius:'12px', border:'1px solid #f1f5f9', boxShadow:'0 1px 3px rgba(0,0,0,.04)' },
    langItem: { flex:1, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 14px', background:'#f8fafc', borderRadius:'8px' },
    langLabel: { fontSize:'12px', color:'#94a3b8', marginBottom:'2px' },
    langVal: { fontSize:'13px', fontWeight:600, color:'#0f172a' },
    langChange: { fontSize:'12px', color:'#29b6f6', fontWeight:600, background:'none', border:'none', cursor:'pointer' },
    footer: { padding:'14px 28px', fontSize:'11px', color:'#94a3b8', borderTop:'1px solid #f1f5f9', background:'#fff', display:'flex', alignItems:'center', justifyContent:'space-between' },
  };

  const notifItems = [
    { icon:'📱', title:'Push Notifications', sub:'Real-time alerts for transactions, transfers, and security updates directly on your device.', state:push, set:setPush },
    { icon:'📧', title:'Email Statements', sub:'Receive weekly summaries and monthly PDF statements of your financial health.', state:email, set:setEmail },
    { icon:'💬', title:'Transaction SMS', sub:'Get text messages for every debit or credit over $50.00 for added security.', state:sms, set:setSms },
    { icon:'⚡', title:'Marketing & News', sub:"Be the first to know about new features, investment tips, and loan offers tailored for you.", state:marketing, set:setMarketing },
  ];

  const privacyItems = [
    { icon:'👁️', title:'Stealth Mode', sub:'Hide your account balance on the dashboard and blur transaction amounts when viewed in public.', state:stealth, set:setStealth },
    { icon:'🔑', title:'Biometric Authentication', sub:'Require Face ID or Touch ID every time you open the app or authorize a transfer.', state:biometric, set:setBiometric },
    { icon:'🌐', title:'Global Payments', sub:'Allow your cards to be used for international online purchases.', state:globalPay, set:setGlobalPay },
    { icon:'📊', title:'Data Sharing', sub:'Allow NovaBank AI to share anonymized spending data with partners to improve your financial score.', state:dataShare, set:setDataShare },
  ];

  return (
    <div style={styles.layout}>
      <Sidebar active="settings" />
      <div style={styles.main}>
       

        <div style={styles.content}>
          {/* Page Header */}
          <div style={styles.pageHdr}>
            <div style={styles.bc}>DASHBOARD › SETTINGS</div>
            <h1 style={styles.h1}>Account Preferences</h1>
            <p style={styles.sub}>Manage how your NovaBank account looks, sounds, and keeps you secure.</p>
          </div>

          {/* LEFT COLUMN */}
          <div>
            {/* Appearance */}
            <div style={styles.card}>
              <div style={styles.cardTitle}>☀️ Appearance</div>
              <div style={styles.cardSub}>Choose your preferred interface style.</div>
              <div style={styles.themeGrid}>
                {[{key:'light',icon:'☀️',label:'Light'},{key:'dark',icon:'🌙',label:'Dark'},{key:'system',icon:'🖥️',label:'System'}].map(t => (
                  <button key={t.key} style={styles.themeBtn(theme===t.key)} onClick={()=>setTheme(t.key)}>
                    <span style={styles.themIcon}>{t.icon}</span>
                    <span style={styles.themLabel(theme===t.key)}>{t.label}</span>
                  </button>
                ))}
              </div>
              <div style={styles.prefRow}>
                <div>
                  <div style={styles.prefTitle}>Automatic Transition</div>
                  <div style={{fontSize:'11.5px',color:'#94a3b8',marginTop:'1px'}}>Follow sunrise/sunset schedule</div>
                </div>
                <Toggle on={autoTransition} onChange={()=>setAutoTransition(!autoTransition)}/>
              </div>
            </div>

            {/* Profile Card */}
            <div style={styles.card}>
              <div style={styles.userCard}>
                <div style={styles.userAvatar}>A</div>
                <div>
                  <div style={styles.userName}>Alex Johnson</div>
                  <div style={styles.userTier}>Tier 1 · Premium</div>
                </div>
              </div>
              <button style={styles.actionBtn(false)}>
                <span>View Detailed Profile</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 3l3 3-3 3" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round"/></svg>
              </button>
              <button style={styles.actionBtn(true)}>
                <span>Deactivate Account</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1.5" y="5" width="9" height="6" rx="1.1" stroke="#ef4444" strokeWidth="1.1"/><path d="M3.5 5V3.5a2.5 2.5 0 015 0V5" stroke="#ef4444" strokeWidth="1.1" strokeLinecap="round"/></svg>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div>
            {/* Notifications */}
            <div style={styles.card}>
              <div style={styles.cardTitle}>🔔 Notifications</div>
              <div style={styles.cardSub}>Control when and how you want to be alerted about account activity.</div>
              {notifItems.map(item => (
                <div key={item.title} style={styles.prefRow}>
                  <div style={styles.prefLeft}>
                    <div style={styles.prefIcon}>{item.icon}</div>
                    <div>
                      <div style={styles.prefTitle}>{item.title}</div>
                      <div style={styles.prefSub}>{item.sub}</div>
                    </div>
                  </div>
                  <Toggle on={item.state} onChange={()=>item.set(!item.state)}/>
                </div>
              ))}
              <div style={{fontSize:'11px',color:'#94a3b8',textAlign:'center',marginTop:'12px'}}>Standard carrier rates may apply for SMS notifications.</div>
            </div>

            {/* Privacy & Security */}
            <div style={styles.card}>
              <div style={styles.cardTitle}>🛡️ Privacy & Security</div>
              <div style={styles.cardSub}>Maintain your digital safety with advanced privacy features.</div>
              {privacyItems.map(item => (
                <div key={item.title} style={styles.prefRow}>
                  <div style={styles.prefLeft}>
                    <div style={styles.prefIcon}>{item.icon}</div>
                    <div>
                      <div style={styles.prefTitle}>{item.title}</div>
                      <div style={styles.prefSub}>{item.sub}</div>
                    </div>
                  </div>
                  <Toggle on={item.state} onChange={()=>item.set(!item.state)}/>
                </div>
              ))}
              <div style={styles.bottomBtns}>
                <button style={styles.btn(false)}>Go to Security Center</button>
                <button style={styles.btn(true)}>Save Changes</button>
              </div>
            </div>
          </div>

          {/* Language / Timezone full width */}
          <div style={{...styles.langRow, gridColumn:'1/-1'}}>
            <div style={styles.langItem}>
              <div>
                <div style={styles.langLabel}>Language</div>
                <div style={styles.langVal}>English (US)</div>
              </div>
              <button style={styles.langChange}>Change</button>
            </div>
            <div style={styles.langItem}>
              <div>
                <div style={styles.langLabel}>Time Zone</div>
                <div style={styles.langVal}>GMT -05:00 (EST)</div>
              </div>
              <button style={styles.langChange}>Change</button>
            </div>
          </div>
        </div>

        <div style={{...styles.footer, marginLeft:0}}>
          <span>© 2024 NovaBank AI. Secure Banking for Gen Z.</span>
          <div style={{display:'flex',gap:'18px'}}>
            {['Privacy','Terms','Contact Support'].map(l=><a key={l} href="#" style={{fontSize:'11px',color:'#94a3b8',textDecoration:'none'}}>{l}</a>)}
          </div>
        </div>
      </div>
    </div>
  );
}