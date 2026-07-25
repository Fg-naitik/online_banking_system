import './Dashboard.css';
import '../../styles/global.css';
//import CreditCard from "../../components/CreditCard/CreditCard";

import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../services/api";
import Sidebar from "../../components/sidebar/sidebar";
import TopBar from "../../components/topbar/topBar";


/* ─── inline SVG icons ─── */
const I = {
  logo: <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1.5 10.5L6.5 2l5 8.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 7h5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  search: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="4.5" stroke="#94a3b8" strokeWidth="1.3"/><path d="M9.5 9.5l2.5 2.5" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  bell: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5a5 5 0 015 5v2.5l1.5 2H1.5L3 9V6.5a5 5 0 015-5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/><path d="M6.5 13a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  dash: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="5" height="5" rx="1.3" stroke="currentColor" strokeWidth="1.2"/><rect x="8" y="1" width="5" height="5" rx="1.3" stroke="currentColor" strokeWidth="1.2"/><rect x="1" y="8" width="5" height="5" rx="1.3" stroke="currentColor" strokeWidth="1.2"/><rect x="8" y="8" width="5" height="5" rx="1.3" stroke="currentColor" strokeWidth="1.2"/></svg>,
  tx: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2"/><path d="M7 4v3.2l2.2 1.3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>,
  transfer: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 4.5l3.5-2.5 3.5 2.5M5.5 2v7M12 9.5L8.5 12 5 9.5M8.5 12V5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  analytics: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 10l3-3 2.5 2L12 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  loans: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="4" width="12" height="8" rx="1.3" stroke="currentColor" strokeWidth="1.2"/><path d="M4.5 4V3A2.5 2.5 0 019.5 3v1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>,
  security: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1L2 3v3.5c0 3 2.1 5 5 6 2.9-1 5-3 5-6V3L7 1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg>,
  ai: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 10h10M2 7h10M2 4h7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>,
  settings: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.2"/><path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M2.6 2.6l1 1M10.4 10.4l1 1M2.6 11.4l1-1M10.4 3.6l1-1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>,
  logout: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5.5 12H3a1 1 0 01-1-1V3a1 1 0 011-1h2.5M9.5 9.5L12 7l-2.5-2.5M5 7h7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  cal: <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1" y="2" width="10" height="9" rx="1.2" stroke="currentColor" strokeWidth="1.1"/><path d="M4 1v2M8 1v2M1 5h10" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>,
  plus: <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 2v8M2 6h8" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  send: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M12 7H2M9 4l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  receive: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M5 4l-3 3 3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  qr: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="5" height="5" rx="0.8" stroke="currentColor" strokeWidth="1.1"/><rect x="8" y="1" width="5" height="5" rx="0.8" stroke="currentColor" strokeWidth="1.1"/><rect x="1" y="8" width="5" height="5" rx="0.8" stroke="currentColor" strokeWidth="1.1"/><path d="M8 8h2M10 8v2M8 10h2M10 10v3M12 10h1" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>,
  bills: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="1" width="10" height="12" rx="1.3" stroke="currentColor" strokeWidth="1.1"/><path d="M5 5h4M5 7.5h4M5 10h2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>,
  ai2: <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M5.5 1l1 2.8H9l-2 1.5.9 2.7L5.5 6.7 3.1 8l.9-2.7L2 3.8h2.5L5.5 1z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/></svg>,
  arrow: <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M6 3l2 2-2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  home: <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 6L6 1l5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 5.5V11h3V8h2v3h3V5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  salary: <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 6l4-3 2.5 2L11 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 8v3M7.5 9.5h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>,
  shield: <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1L2 2.5V5.5c0 2.5 1.8 4.2 4 5 2.2-.8 4-2.5 4-5V2.5L6 1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg>,
  goal: <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2"/><circle cx="6" cy="6" r="2" stroke="currentColor" strokeWidth="1.2"/></svg>,
  cash: <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1" y="3" width="10" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.2"/><circle cx="6" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.2"/></svg>,
  send2: <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1 4.5h7M5 2l2.5 2.5L5 7" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
};

const navItems = [
  { key:'dashboard', label:'Dashboard', icon:I.dash, href:'/dashboard' },
  { key:'transactions', label:'Transactions', icon:I.tx, href:'/transactions' },
  {key: "transfer",  label: "Transfer",  href: "/transfers",icon: I.transfer,},
  { key:'analytics', label:'Analytics', icon:I.analytics, href:'/analytics' },
  { key:'loans', label:'Loans', icon:I.loans, href:'/loans' },
  { key:'security', label:'Security', icon:I.security, href:'/security' },
  { key:'ai', label:'AI Assistant', icon:I.ai, href:'/ai-assistant' },
];


const activities = [
  { ico:I.salary, cls:'ico-green', title:'Salary credited ₹35,000', time:'2 hours ago' },
  { ico:I.shield, cls:'ico-red', title:'Security:New login detected', time:'5 hours ago' },
  { ico:I.goal, cls:'ico-blue', title:"Goal Reached: Savings goal updated", time:'Yesterday' },
  { ico:I.cash, cls:'ico-yellow', title:'Cashback: 12.50 from AMAZON', time:'2 days ago' },
];


export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
  fetchDashboard();
}, []);

const fetchDashboard = async () => {
  try {
    setLoading(true);

    const res = await api.get("/dashboard");
    setDashboardData(res.data.data);

    const tx = await api.get("/transactions");
    setTransactions(tx.data.transactions);

    const analyticsRes = await api.get("/analytics");
    setAnalytics(analyticsRes.data.data);

  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};
  const navigate = useNavigate();
  const handleProfile = () => {
  navigate("/profile");
};
const handleLogout = () => {
  const confirmLogout = window.confirm("Are you sure you want to logout?");

  if (!confirmLogout) return;

  localStorage.removeItem("token");

  navigate("/login");
};

const handleTransfer = () => {
  navigate("/transfers");
};

const handleTransaction = () => {
  navigate("/transactions");
};
const stats = [
  {
    icon: "💳",
    label: "Total Balance",
    value: `₹${dashboardData?.summary?.totalBalance ?? 0}`,
    badge: "+2.5%",
    badgeCls: "badge-up",
  },
  {
    icon: "📈",
    label: "Monthly Income",
    value: `₹${dashboardData?.summary?.monthlyIncome ?? 0}`,
    badge: "+12.4%",
    badgeCls: "badge-up",
  },
  {
    icon: "💸",
    label: "Total Expenses",
    value: `₹${dashboardData?.summary?.monthlyExpense ?? 0}`,
    badge: "-4.1%",
    badgeCls: "badge-down",
    red: true,
  },
  {
    icon: "🎯",
    label: "Savings Goal",
    value: `${dashboardData?.summary?.savingGoal ?? 0}%`,
    badge: "Goal",
    badgeCls: "badge-neutral",
  },
];
const progress =
  dashboardData?.loan?.amount > 0
    ? Math.round(
        ((dashboardData.loan.amount -
          dashboardData.loan.outstanding_balance) /
          dashboardData.loan.amount) *
          100
      )
    : 0;
if (loading) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "20px",
        fontWeight: "600",
      }}
    >
      Loading Dashboard...
    </div>
  );
}



  return (
    <div className="dashboard-layout">
    <Sidebar active="dashboard" />


     

      {/* ── MAIN ── */}
      <div className="dashboard-main">

        {/* TOPBAR */}
        <TopBar
          user={dashboardData?.user}
          notificationCount={dashboardData?.notifications?.totalNotifications}
          onProfile={handleProfile}
          onLogout={handleLogout}
        />

        {/* CONTENT GRID */}
        <div className="dashboard-content">

          {/* ── LEFT COLUMN ── */}
          <div className="dash-left">

            {/* Header */}
            <div className="dash-header">
              <div>
               <h1>Good Morning,{dashboardData?.user?.first_name} 👋Welcome back to APNA Bank</h1>
                <p>Your financial health improved by 8% this month. Keep going toward your savings goals.</p>
              </div>
              <div className="header-actions">
                <button className="date-btn">{I.cal}{new Date().toLocaleDateString("en-US", {month: "short",  day: "numeric",  year: "numeric",})}</button>
                <button className="new-pod-btn"onClick={() => navigate("/transfers")}>{I.plus} Transfer Money</button>
              </div>
            </div>

            {/* Stat Cards */}
            <div className="stat-cards">
              {stats.map((c) => (
                <div key={c.label} className="stat-card">
                  <div className="stat-card-top">
                    <div className="stat-icon">{c.icon}</div>

                    <span className={`stat-badge ${c.badgeCls}`}>
                      {c.badge}
                    </span>
                  </div>

                  <span className="stat-label">{c.label}</span>

                  <div className={`stat-value ${c.red ? "red" : ""}`}>
                    {c.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              {[{icon:I.send, label:'Transfer Money'},{icon:I.receive, label:'Pay Bills'},{icon:I.qr, label:'Scan & Pay'},{icon:I.bills, label:'Apply Loan'}].map(a => (
                <button key={a.label} className="qa">
                  <div className="qa-icon">{a.icon}</div>
                  <span className="qa-label">{a.label}</span>
                </button>
              ))}
            </div>

            {/* Expense Analytics */}
            <div className="section-card">
              <div className="sc-header">
                <div>
                  <h3>Expense Analytics</h3>
                  <p>Spending patterns over last 6 months</p>
                </div>
                <button className="more-btn">···</button>
              </div>
              <div className="bar-chart">
                {analytics.map((item, index) => (
                  <div key={index} className="bar-col">
                    <div
                      className="bar-fill"
                      style={{
                        height: `${Number(item.total) / 5}px`,
                      }}
                    ></div>

                    <span className="bar-month">
                      {item.transaction_type}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="section-card">
              <div className="sc-header">
                <div>
                  <h3>Recent Transactions</h3>
                </div>
                <Link to="/transactions" className="view-all">View All {I.arrow}</Link>
              </div>
              <table className="tx-table">
                <thead>
                  <tr>
                    <th>Entity</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                    {transactions.length > 0 ? (
                      transactions.map((tx, i) => (
                        <tr key={i}>
                          <td>
                            <div className="tx-entity">
                              <div className="tx-logo">💸</div>
                              <div>
                                <div className="tx-name">{tx.description}</div>
                              </div>
                            </div>
                          </td>

                          <td>
                            <span className="tx-cat">
                              {tx.transaction_type}
                            </span>
                          </td>

                          <td>
                            <span className="tx-date-cell">
                              {new Date(tx.transaction_date).toLocaleDateString()}
                            </span>
                          </td>

                          <td>
                            <span
                              className={`tx-amt ${
                                tx.transaction_type === "Deposit"
                                  ? "pos"
                                  : "neg"
                              }`}
                            >
                              ₹{Number(tx.amount).toLocaleString()}
                            </span>
                          </td>

                          <td>
                            <span className="tx-status status-done">
                              Completed
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" style={{ textAlign: "center", padding: "30px" }}>
                          No recent transactions found.
                        </td>
                      </tr>
                    )}
                  </tbody>
              </table>
            </div>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div className="right-panel">

            {/* AI Insights */}
            <div className="ai-card">
              <div className="ai-label">{I.ai2} APNA BANK AI INSIGHTS</div>
              <div className="ai-title">Financial Health Score</div>
              <div className="score-wrap">
                <svg width="88" height="88" viewBox="0 0 88 88">
                  <circle cx="44" cy="44" r="36" fill="none" stroke="#f1f5f9" strokeWidth="8"/>
                  <circle cx="44" cy="44" r="36" fill="none" stroke="#29b6f6" strokeWidth="8"
                    strokeDasharray={`${2*Math.PI*36*0.84} ${2*Math.PI*36}`} strokeLinecap="round"/>
                </svg>
                <div className="score-inner">
                  <span className="score-num">{dashboardData?.insights?.financialHealth ?? 0}</span>
                  <span className="score-sub">EXCELLENT</span>
                </div>
              </div>
             <p>
  Your Financial Health Score is{" "}
  <strong>
    {dashboardData?.insights?.financialHealth ?? 0}%
  </strong>.
</p>

<p>
  Monthly Spending:
  <strong>
    ₹{dashboardData?.insights?.monthlySpent?.toLocaleString() ?? 0}
  </strong>
</p>

<p>
  Recommended Monthly Saving:
  <strong>
    ₹{dashboardData?.insights?.recommendedSaving?.toLocaleString() ?? 0}
  </strong>
</p>
           
            </div>

            {/* EMI Reminders */}
            {dashboardData?.loan ? (
              <>
                {/* EMI Card */}

                <div className="emi-card">

                  <div className="emi-hdr">
                    {I.bills}
                    {dashboardData.loan.loan_type} Loan EMI
                  </div>

                  <div className="emi-row">

                    <div className="emi-ico">
                      {I.home}
                    </div>

                    <div className="emi-info">

                      <div className="emi-name">
                        {dashboardData.loan.loan_type} Loan EMI Due
                      </div>

                      <div className="emi-due">
                        {new Date(
                          dashboardData.loan.next_due_date
                        ).toLocaleDateString()}

                        {" • "}

                        ₹{dashboardData.loan.emi_amount}
                      </div>

                    </div>

                    <button className="pay-btn">
                      Pay Now
                    </button>

                  </div>

                </div>

                {/* Loan Card */}

                <div className="loan-card">

                  <div className="loan-hdr">

                    <div className="loan-type">
                      {dashboardData.loan.loan_type} Loan
                    </div>

                    <span className="loan-emi-tag">
                      Active
                    </span>

                  </div>

                  <div
                    style={{
                      fontSize: "10px",
                      color: "#94a3b8",
                    }}
                  >
                    Outstanding Balance
                  </div>

                  <div className="loan-balance">
                    ₹{Number(
                      dashboardData.loan.outstanding_balance
                    ).toLocaleString()}
                  </div>

                </div>

              </>
            ) : (

              <div className="loan-card">

                <h3>No Active Loan</h3>

                <p
                  style={{
                    marginTop: "10px",
                    color: "#64748b",
                  }}
                >
                  You don't have any active loans.
                </p>

                <button
                  className="view-sched"
                  style={{ marginTop: "20px" }}
                >
                  Apply for Loan
                </button>

              </div>

            )}

            {/* Activity */}
            <div className="activity-card">
              <div className="act-hdr">
                <h4>Activity</h4>
                <button className="clear-btn">Clear All</button>
              </div>

              {dashboardData?.activity?.length > 0 ? (
                dashboardData.activity.map((item, index) => (
                  <div className="activity-row" key={index}>
                    <div className="activity-circle">
                      {item.type === "Deposit"
                        ? "💰"
                        : item.type === "Transfer"
                        ? "💸"
                        : item.type === "Withdrawal"
                        ? "🏧"
                        : "💳"}
                    </div>

                    <div className="activity-details">
                      <div className="activity-title">
                        {item.title}
                        <span className="activity-amount">
                          ₹{Number(item.amount).toLocaleString()}
                        </span>
                      </div>

                      <div className="activity-time">
                        {new Date(item.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    padding: "30px",
                    color: "#94a3b8",
                  }}
                >
                  No recent activity found.
                </div>
              )}
            </div>
            {/* Virtual Card */}
            
              
            

          </div>
        </div>

        {/* FOOTER */}
        <div className="dash-footer" style={{marginLeft:0}}>
          <span>© APNA Bank . Secure Banking .</span>
          <div className="dash-footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact Support</a>
          </div>
        </div>
      </div>
    </div>
  );
}
