import { useState } from 'react';
import './AnalyticsPage.css';
import '../../styles/global.css';
import Sidebar from "../../components/sidebar/sidebar";

const SearchIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="4.5" stroke="#94a3b8" strokeWidth="1.3"/><path d="M9.5 9.5l2.5 2.5" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round"/></svg>;
const BellIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5a4.5 4.5 0 014.5 4.5v2.5l1.5 2H2L3.5 8.5V6A4.5 4.5 0 018 1.5z" stroke="#64748b" strokeWidth="1.3" strokeLinejoin="round"/><path d="M6.5 12.5a1.5 1.5 0 003 0" stroke="#64748b" strokeWidth="1.3" strokeLinecap="round"/></svg>;
const AIStarIcon = () => <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1l1.2 3.3H10l-2.6 1.9 1 3.1L6 7.5l-2.4 1.8 1-3.1L2 4.3h2.8L6 1z" stroke="#0288d1" strokeWidth="1" strokeLinejoin="round" fill="rgba(2,136,209,0.2)"/></svg>;
const ArrowR = () => <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6.5 3l3 3-3 3" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const CalIcon = () => <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1" y="2" width="10" height="9" rx="1.1" stroke="#475569" strokeWidth="1.1"/><path d="M4 1v2M8 1v2M1 5h10" stroke="#475569" strokeWidth="1.1" strokeLinecap="round"/></svg>;
const TargetIcon = () => <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.5" stroke="#10b981" strokeWidth="1.3"/><circle cx="9" cy="9" r="4.5" stroke="#10b981" strokeWidth="1.3"/><circle cx="9" cy="9" r="1.5" fill="#10b981"/></svg>;

const months = ['Jan','Feb','Mar','Apr','May','Jun'];
const incomeH = [78,94,86,105,98,110];
const expenseH = [45,52,42,58,64,52];

const donutData = [
  { name:'Dining', pct:32, color:'#ef4444' },
  { name:'Shopping', pct:24, color:'#29b6f6' },
  { name:'Transport', pct:18, color:'#10b981' },
  { name:'Utilities', pct:14, color:'#f59e0b' },
  { name:'Others', pct:12, color:'#8b5cf6' },
];

// Build donut SVG
const DONUT_R = 52, DONUT_CX = 64, DONUT_CY = 64, SW = 18;
const circumference = 2 * Math.PI * DONUT_R;
let offset = 0;
const donutSlices = donutData.map(d => {
  const dashLen = (d.pct / 100) * circumference;
  const slice = { ...d, dashLen, offset, dashOffset: circumference - dashLen };
  offset += dashLen;
  return slice;
});

// Heatmap data (June 2024)
const heatDays = [
  null, null, null, null, null, 1, 2,
  3, 4, 5, 6, 7, 8, 9,
  10, 11, 12, 13, 14, 15, 16,
  17, 18, 19, 20, 21, 22, 23,
  24, 25, 26, 27, 28, 29, 30,
  null, null, null, null, null, null, null,
];
const heatLevels = [0,0,1,0,2,3,4,2,1,0,3,4,2,1,0,2,3,4,3,1,0,2,4,2,1,3,2,1,0,0,1,2,3,2,4,0,0,0,0,0,0,0];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('Monthly');

  return (
    <div className="an-layout">
      <Sidebar active="analytics" />

      <div className="an-main">
        {/* Topbar */}
        <div className="an-topbar">
          <div className="an-srch">
            <SearchIcon />
            <input type="text" placeholder="Search transactions or ask AI..." />
          </div>
          <div className="an-tb-r">
            <button className="an-bell"><BellIcon /><span className="an-bdot"></span></button>
            <div style={{textAlign:'right'}}>
              <span style={{fontSize:'13px',fontWeight:600,display:'block'}}>Alex Rivera</span>
              <span style={{fontSize:'11px',color:'#94a3b8',display:'block'}}>Premium Member</span>
            </div>
            <div className="an-av">A<span className="an-avd"></span></div>
          </div>
        </div>

        <div className="an-content">
          {/* Page Header */}
          <div className="an-header">
            <div>
              <h1>Expense Analytics</h1>
              <p>Deep dive into your financial habits with AI insights.</p>
            </div>
            <div className="an-score-pill">
              <div>
                <div style={{fontSize:'11px',fontWeight:700,color:'#94a3b8',letterSpacing:'.06em',marginBottom:'2px'}}>FINANCIAL SCORE</div>
                <div style={{display:'flex',alignItems:'baseline',gap:'6px'}}>
                  <span className="an-score-num">82</span>
                  <span style={{fontSize:'14px',fontWeight:600,color:'#10b981'}}>Excellent</span>
                </div>
                <div style={{fontSize:'11px',color:'#94a3b8',marginTop:'2px'}}>+5 pts from last month</div>
              </div>
              <svg width="52" height="52" viewBox="0 0 52 52">
                <circle cx="26" cy="26" r="22" fill="none" stroke="#f1f5f9" strokeWidth="5"/>
                <circle cx="26" cy="26" r="22" fill="none" stroke="#10b981" strokeWidth="5"
                  strokeDasharray={`${2*Math.PI*22*0.82} ${2*Math.PI*22}`}
                  strokeLinecap="round" transform="rotate(-90 26 26)"/>
                <text x="26" y="30" textAnchor="middle" fontSize="13" fontWeight="800" fill="#0f172a">82</text>
              </svg>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="an-stats">
            <div className="an-stat">
              <div className="an-stat-label">Total Spending</div>
              <div className="an-stat-value">$4,285.50</div>
              <span className="an-stat-badge badge-down">↓ 12%</span>
            </div>
            <div className="an-stat">
              <div className="an-stat-label">Average Daily</div>
              <div className="an-stat-value">$142.85</div>
              <span className="an-stat-badge badge-up">↑ 4%</span>
            </div>
            <div className="an-stat">
              <div className="an-stat-label">Top Category</div>
              <div className="an-stat-value" style={{fontSize:'16px'}}>Dining</div>
              <span className="an-stat-badge" style={{background:'#fef2f2',color:'#ef4444'}}>32% of total</span>
            </div>
            <div className="an-stat">
              <div className="an-stat-label">Savings Goal</div>
              <div className="an-stat-value">$1,200.00</div>
              <div className="an-stat-goal">
                <div className="an-stat-goal-bar">
                  <div className="an-stat-goal-fill" style={{width:'68%'}}></div>
                </div>
                <TargetIcon />
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="an-charts-row">
            {/* Cash Flow Bar Chart */}
            <div className="an-chart-card">
              <div className="an-chart-header">
                <div>
                  <h3>Cash Flow Trends</h3>
                  <p>Monthly income vs expense analysis</p>
                </div>
                <div className="an-period-toggle">
                  {['Weekly','Monthly'].map(p => (
                    <button key={p} className={`an-period-btn${period===p?' active':''}`} onClick={()=>setPeriod(p)}>{p}</button>
                  ))}
                </div>
              </div>
              {/* Y-axis labels */}
              <div style={{display:'flex',alignItems:'flex-start',gap:'8px'}}>
                <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',height:'180px',paddingBottom:'4px',flexShrink:0}}>
                  {[6300,4725,3150,1575,0].map(v=>(
                    <span key={v} style={{fontSize:'10px',color:'#94a3b8',fontWeight:500}}>{v.toLocaleString()}</span>
                  ))}
                </div>
                <div style={{flex:1}}>
                  <div className="an-grouped-bars">
                    {months.map((m,i)=>(
                      <div key={m} className="an-bar-group">
                        <div className="an-bar income" style={{height:`${incomeH[i]}px`,width:'20px'}}></div>
                        <div className="an-bar expense" style={{height:`${expenseH[i]}px`,width:'20px'}}></div>
                      </div>
                    ))}
                  </div>
                  <div className="an-chart-labels">
                    {months.map(m=><span key={m} className="an-chart-label">{m}</span>)}
                  </div>
                </div>
              </div>
              <div className="an-chart-legend">
                <div className="an-legend-item"><div className="an-legend-dot" style={{background:'#29b6f6'}}></div>Income</div>
                <div className="an-legend-item"><div className="an-legend-dot" style={{background:'#ef4444',opacity:.75}}></div>Expenses</div>
              </div>
            </div>

            {/* Donut Chart */}
            <div className="an-donut-card">
              <h3>Spending Breakdown</h3>
              <p>Distribution across top categories</p>
              <div className="an-donut-wrap">
                <svg width="128" height="128" viewBox="0 0 128 128">
                  {donutSlices.map((s,i) => (
                    <circle key={i} cx={DONUT_CX} cy={DONUT_CY} r={DONUT_R}
                      fill="none" stroke={s.color} strokeWidth={SW}
                      strokeDasharray={`${s.dashLen} ${circumference-s.dashLen}`}
                      strokeDashoffset={-s.offset}
                      transform={`rotate(-90 ${DONUT_CX} ${DONUT_CY})`}
                    />
                  ))}
                </svg>
              </div>
              <div className="an-donut-legend">
                {donutData.map(d=>(
                  <div key={d.name} className="an-donut-legend-item">
                    <div className="an-donut-dot" style={{background:d.color}}></div>
                    <span className="an-donut-name">{d.name}</span>
                    <span className="an-donut-pct">{d.pct}%</span>
                  </div>
                ))}
              </div>
              <div style={{display:'flex',gap:'4px',marginTop:'12px'}}>
                {donutData.map(d=><div key={d.name} style={{height:'4px',background:d.color,borderRadius:'2px',flex:d.pct}}></div>)}
              </div>
            </div>
          </div>

          {/* Heatmap + AI Insight */}
          <div className="an-bottom-row">
            {/* Spending Heatmap */}
            <div className="an-heatmap-card">
              <div className="an-hm-header">
                <h3><CalIcon /> Spending Heatmap</h3>
                <span className="an-hm-month">June 2024</span>
              </div>
              <div className="an-hm-grid-head">
                {['M','T','W','T','F','S','S'].map((d,i)=>(
                  <div key={i} className="an-hm-day-label">{d}</div>
                ))}
              </div>
              <div className="an-hm-grid">
                {heatDays.map((day, i) => (
                  <div key={i} className={`an-hm-cell ${day ? `hm-${heatLevels[i]}` : 'hm-0'}`} style={{opacity: day ? 1 : 0}}>
                    {day || ''}
                  </div>
                ))}
              </div>
              <div className="an-hm-legend">
                <span>Less Active</span>
                <div className="an-hm-legend-dots">
                  {['hm-0','hm-1','hm-2','hm-3'].map(c=>(
                    <div key={c} className={`an-hm-legend-dot ${c}`}></div>
                  ))}
                </div>
                <span>High Activity</span>
              </div>
            </div>

            {/* Nova AI Insight */}
            <div className="an-ai-card">
              <div className="an-ai-label"><AIStarIcon /> Nova AI Insight</div>
              <div className="an-ai-title">Nova AI Insight</div>
              <p className="an-ai-text">
                "Hey Alex! Your <strong>Food & Dining</strong> expenses are up by 22% this week. You could save roughly <strong>$140/month</strong> by switching to meal-prepping 2 extra days a week."
              </p>
              <button className="an-ai-cta">Create a Savings Pod <ArrowR /></button>
              <div className="an-ai-deco">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <path d="M40 5l8 22h23l-18.5 13.5 7.5 22L40 49l-20 13.5 7.5-22L9 27h23L40 5z" stroke="#29b6f6" strokeWidth="3" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Subscription Audit + Tax Optimizer */}
          <div className="an-mini-row">
            <div className="an-mini-card">
              <div className="an-mini-icon green">🔍</div>
              <div className="an-mini-info">
                <div className="an-mini-title">Subscription Audit</div>
                <p className="an-mini-text">We found 3 unused subscriptions costing you <strong>$45.99/mo</strong>.</p>
              </div>
            </div>
            <div className="an-mini-card">
              <div className="an-mini-icon purple">💡</div>
              <div className="an-mini-info">
                <div className="an-mini-title">Tax Optimizer</div>
                <p className="an-mini-text">Your recent charitable donation of <strong>$150</strong> is tax deductible!</p>
              </div>
            </div>
          </div>

          {/* Savings Progress */}
          <div className="an-savings-card">
            <div className="an-savings-header">
              <div>
                <h3>Savings Progress</h3>
                <p>You're currently on track to hit your "Japan Trip" goal by December.</p>
              </div>
            </div>
            <div className="an-savings-main">
              <div className="an-savings-amounts">
                <div className="an-savings-item">
                  <div className="an-savings-item-label">SAVED THIS MONTH</div>
                  <div className="an-savings-item-value green">$850.00</div>
                </div>
                <div className="an-savings-item">
                  <div className="an-savings-item-label">REMAINING GOAL</div>
                  <div className="an-savings-item-value">$1,400.00</div>
                </div>
                <div className="an-savings-bar">
                  <div className="an-savings-fill" style={{width:'38%',background:'#10b981'}}></div>
                </div>
                <button className="an-savings-goal-btn">Adjust Goal</button>
              </div>
              {/* Velocity Chart */}
              <div>
                <div style={{fontSize:'11px',fontWeight:700,color:'#94a3b8',letterSpacing:'.06em',marginBottom:'10px'}}>SAVINGS VELOCITY</div>
                <svg width="100%" height="90" viewBox="0 0 260 90" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="velGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <path d="M0 70 C40 65 60 55 90 45 S150 30 180 25 S230 15 260 10" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M0 70 C40 65 60 55 90 45 S150 30 180 25 S230 15 260 10 L260 90 L0 90 Z" fill="url(#velGrad)"/>
                </svg>
              </div>
            </div>
          </div>

        </div>

        <div className="an-footer" style={{marginLeft:0}}>
          <span>© 2024 NovaBank AI. Secure Banking for Gen Z.</span>
          <div className="an-ftl">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact Support</a>
          </div>
        </div>
      </div>
    </div>
  );
}