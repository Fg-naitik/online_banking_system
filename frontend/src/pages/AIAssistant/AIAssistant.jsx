import { useState, useRef, useEffect } from 'react';
import "./AIAssistant.css";
import '../../styles/global.css';
import Sidebar from "../../components/sidebar/sidebar";

/* ── Icons ── */
const SearchIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="4.5" stroke="#94a3b8" strokeWidth="1.3"/><path d="M9.5 9.5l2.5 2.5" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round"/></svg>;
const BellIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5a4.5 4.5 0 014.5 4.5v2.5l1.5 2H2L3.5 8.5V6A4.5 4.5 0 018 1.5z" stroke="#64748b" strokeWidth="1.3" strokeLinejoin="round"/><path d="M6.5 12.5a1.5 1.5 0 003 0" stroke="#64748b" strokeWidth="1.3" strokeLinecap="round"/></svg>;
const LockIcon = () => <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1.5" y="5" width="9" height="6.5" rx="1.2" stroke="#94a3b8" strokeWidth="1.1"/><path d="M3.5 5V3.5a2.5 2.5 0 015 0V5" stroke="#94a3b8" strokeWidth="1.1" strokeLinecap="round"/></svg>;
const NovaStarIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1l1.6 4.4H14l-3.5 2.6 1.4 4.4L8 9.8l-3.9 2.6 1.4-4.4L2 5.4h4.4L8 1z" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" fill="rgba(255,255,255,0.35)"/></svg>;
const UserAvatarIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5.5" r="3" stroke="#29b6f6" strokeWidth="1.3"/><path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#29b6f6" strokeWidth="1.3" strokeLinecap="round"/></svg>;
const PlusIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v10M2 7h10" stroke="#64748b" strokeWidth="1.4" strokeLinecap="round"/></svg>;
const AttachIcon = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M12.5 7.5l-5.5 5.5a4 4 0 01-5.7-5.6l6-6a2.5 2.5 0 013.5 3.5L4.8 10.9a1 1 0 01-1.4-1.4L9 3.9" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const SendIcon = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M13 7.5H2M9 3.5l4 4-4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ArrowIcon = () => <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>;

const CoffeeIcon = () => <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 3h7v6a3.5 3.5 0 01-7 0V3z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/><path d="M9 4.5h1a2 2 0 010 4H9" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/><path d="M4.5 1.5v1.5M6.5 1v1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
const BoltIcon = () => <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M7 1L3 7.5h3.5L6 12l4-5.5H6.5L7 1z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/></svg>;
const TrendIcon = () => <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 9l3-3 2.5 2L11 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const WalletIcon = () => <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="1" y="3" width="11" height="8.5" rx="1.3" stroke="currentColor" strokeWidth="1.2"/><path d="M1 5.5h11" stroke="currentColor" strokeWidth="1.2"/><circle cx="9.5" cy="8" r="0.8" fill="currentColor"/></svg>;

const suggestions = [
  { icon: <CoffeeIcon />, label: 'Coffee spend this month' },
  { icon: <BoltIcon />, label: 'Savings for Bali trip' },
  { icon: <TrendIcon />, label: 'Investment suggestions' },
  { icon: <WalletIcon />, label: 'Budget for next month' },
];

// bar chart data for the dining bubble
const diningData = [
  { day: 'Mon', h: 38 },
  { day: 'Tue', h: 22 },
  { day: 'Wed', h: 46 },
  { day: 'Thu', h: 32 },
  { day: 'Fri', h: 62 },
  { day: 'Sat', h: 80 },
  { day: 'Sun', h: 52 },
];

const initialMessages = [
  {
    id: 1,
    from: 'nova',
    time: '09:41 AM',
    text: "Hi Alex! I've noticed you spent 15% more on dining this week. Would you like a breakdown of where that went, or shall we look at your savings for the Bali trip?",
  },
  {
    id: 2,
    from: 'user',
    time: '09:42 AM',
    text: "Let's see the dining breakdown for this week.",
  },
  {
    id: 3,
    from: 'nova',
    time: '09:42 AM',
    text: "Sure thing! Here's your weekly dining spend by category. You've been quite the regular at 'The Daily Roast' lately!",
    chart: true,
  },
];

export default function AIAssistantPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [inputVal, setInputVal] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputVal.trim()) return;
    const newMsg = { id: Date.now(), from: 'user', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), text: inputVal };
    setMessages(prev => [...prev, newMsg]);
    setInputVal('');

    // simulate Nova reply
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        from: 'nova',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: "Great question! Let me analyze that for you and find the best recommendations based on your spending patterns.",
      }]);
    }, 900);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const handleSuggestion = (label) => {
    setInputVal(label);
  };

  return (
    <div className="ai-layout">
      <Sidebar active="ai" />

      <div className="ai-main">
        {/* Topbar */}
        <div className="ai-topbar">
          <div className="ai-srch">
            <SearchIcon />
            <input type="text" placeholder="Search transactions or ask AI..." />
          </div>
          <div className="ai-tb-r">
            <button className="ai-bell">
              <BellIcon />
              <span className="ai-bdot"></span>
            </button>
            <div className="ai-ui">
              <span className="ai-un">Alex Johnson</span>
              <span className="ai-ur">Premium Member</span>
            </div>
            <div className="ai-av">
              A<span className="ai-avdot"></span>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="ai-content">

          {/* ── CHAT COLUMN ── */}
          <div className="ai-chat-col">

            {/* Date + encryption */}
            <div className="ai-chat-meta">
              <div className="ai-chat-date">Yesterday, 14th June</div>
              <div className="ai-chat-enc">
                <LockIcon /> End-to-end encrypted with NovaBank Security
              </div>
            </div>

            {/* Messages */}
            <div className="ai-messages">
              {messages.map(msg => (
                <div key={msg.id} className={`ai-msg-row${msg.from === 'user' ? ' user-row' : ''}`}>
                  <div className={`ai-msg-avatar${msg.from === 'nova' ? ' nova' : ' user'}`}>
                    {msg.from === 'nova' ? <NovaStarIcon /> : <UserAvatarIcon />}
                  </div>
                  <div>
                    <div className={`ai-bubble${msg.from === 'nova' ? ' nova-bubble' : ' user-bubble'}`}>
                      {msg.text}
                      {msg.chart && (
                        <div className="ai-chart-container">
                          <div className="ai-chart-bars">
                            {diningData.map(d => (
                              <div key={d.day} className="ai-chart-col">
                                <div className="ai-chart-bar" style={{ height: `${d.h}px` }}></div>
                                <span className="ai-chart-label">{d.day}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="ai-bubble-time">{msg.time}</div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            <div className="ai-suggestions">
              {suggestions.map(s => (
                <button
                  key={s.label}
                  className="ai-suggestion-pill"
                  onClick={() => handleSuggestion(s.label)}
                >
                  {s.icon} {s.label}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="ai-input-bar">
              <button className="ai-input-plus"><PlusIcon /></button>
              <div className="ai-input-wrap">
                <input
                  type="text"
                  placeholder="Ask Nova anything about your finances..."
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  onKeyDown={handleKey}
                />
                <button className="ai-attach-btn"><AttachIcon /></button>
                <button className="ai-send-btn" onClick={handleSend}><SendIcon /></button>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="ai-disclaimer">
              Nova can occasionally provide inaccurate data. Always verify critical banking information.
            </div>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div className="ai-right-panel">

            {/* Financial Health Score */}
            <div className="ai-score-card">
              <div className="ai-score-label">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1l1.2 3.3H10l-2.6 1.9 1 3.1L6 7.5l-2.4 1.8 1-3.1L2 4.3h2.8L6 1z" stroke="#29b6f6" strokeWidth="1" strokeLinejoin="round" fill="rgba(41,182,246,0.2)"/></svg>
                Financial Health Score
              </div>

              <div className="ai-score-ring">
                <div className="ai-score-wrap">
                  <svg width="100" height="100" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="8"/>
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#29b6f6" strokeWidth="8"
                      strokeDasharray={`${2 * Math.PI * 40 * 0.78} ${2 * Math.PI * 40}`}
                      strokeLinecap="round" transform="rotate(-90 50 50)"/>
                  </svg>
                  <div className="ai-score-inner">
                    <span className="ai-score-num">78</span>
                    <span className="ai-score-sub">GOOD</span>
                  </div>
                </div>
              </div>

              <p className="ai-score-note">
                Your score is <span className="highlight">Good</span>. Save 5% more this month to reach <span className="highlight">Excellent</span>.
              </p>
            </div>

            {/* Smart Insights */}
            <div className="ai-insights-card">
              <div className="ai-insights-title">Smart Insights</div>

              <div className="ai-insight-item">
                <div className="ai-insight-dot green"></div>
                <div className="ai-insight-info">
                  <div className="ai-insight-name">Savings Goal</div>
                  <div className="ai-insight-sub">Bali Trip: 84% reached</div>
                </div>
                <span className="ai-insight-arrow"><ArrowIcon /></span>
              </div>

              <div className="ai-insight-item">
                <div className="ai-insight-dot red"></div>
                <div className="ai-insight-info">
                  <div className="ai-insight-name">Bill Reminder</div>
                  <div className="ai-insight-sub">Rent due in 2 days: $1,200</div>
                </div>
                <span className="ai-insight-arrow"><ArrowIcon /></span>
              </div>
            </div>

            {/* Pro Tip */}
            <div className="ai-pro-tip-card">
              <div className="ai-pro-tip-label">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1l1.2 3.3H10l-2.6 1.9 1 3.1L6 7.5l-2.4 1.8 1-3.1L2 4.3h2.8L6 1z" stroke="#29b6f6" strokeWidth="1" strokeLinejoin="round" fill="rgba(41,182,246,0.2)"/></svg>
                PRO TIP
              </div>
              <p className="ai-pro-tip-text">
                You could save <strong>$45/mo</strong> by switching your premium streaming subscriptions to the family plan.
              </p>
              <button className="ai-apply-btn">
                Apply Suggestion <ArrowIcon />
              </button>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="ai-footer" style={{ marginLeft: 0 }}>
          <span>© 2024 NovaBank AI. Secure Banking for Gen Z.</span>
          <div className="ai-ftl">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact Support</a>
          </div>
        </div>
      </div>
    </div>
  );
}
