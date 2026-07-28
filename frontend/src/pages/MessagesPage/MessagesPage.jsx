
import './MessagesPage.css';
import '../../styles/global.css';
import { Link } from "react-router-dom";
import Sidebar from "../../components/sidebar/sidebar";
import { useEffect, useState } from "react";
import { getNotifications } from "../../api/notificationApi";

const SearchIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="4.5" stroke="#94a3b8" strokeWidth="1.3"/><path d="M9.5 9.5l2.5 2.5" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round"/></svg>;
const BellIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5a4.5 4.5 0 014.5 4.5v2.5l1.5 2H2L3.5 8.5V6A4.5 4.5 0 018 1.5z" stroke="#64748b" strokeWidth="1.3" strokeLinejoin="round"/><path d="M6.5 12.5a1.5 1.5 0 003 0" stroke="#64748b" strokeWidth="1.3" strokeLinecap="round"/></svg>;
const CheckIcon = () => <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5.5" stroke="#64748b" strokeWidth="1.2"/><path d="M4 6.5l2 2 3.5-3.5" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const SettingsIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="2" stroke="#64748b" strokeWidth="1.2"/><path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round"/></svg>;
const AIStarIcon = () => <svg width="17" height="17" viewBox="0 0 17 17" fill="none"><path d="M8.5 1l1.8 5H15l-4 2.9 1.6 5-4.1-2.9L4.4 13.9 6 8.9 2 6h4.7L8.5 1z" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" fill="rgba(255,255,255,0.3)"/></svg>;
const ArrowR = () => <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const TrashIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 3.5h10M5.5 3.5V2.5h3v1M5 3.5l.5 8h3l.5-8" stroke="#64748b" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>;



const filterTabs = ['All', 'Security', 'Offers', 'History', 'System'];

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState("All");

const [messages, setMessages] = useState([]);

const visible = messages;

useEffect(() => {
  loadNotifications();
}, []);

const loadNotifications = async () => {
  try {
    const res = await getNotifications();

    console.log("Notifications Response:", res);

    setMessages(res.notifications || []);
  } catch (err) {
    console.log(err);
  }
};
  return (
    <div className="mc-layout">
      <Sidebar active="security" />

      <div className="mc-main">

        
        <div className="mc-content">

          {/* ── PAGE HEADER ── */}
          <div className="mc-page-header">
            <div className="mc-title-group">
              <h1>Message Center</h1>
              <span className="mc-new-pill">2 New</span>
            </div>
            <div className="mc-header-actions">
              <button className="mc-mark-all">
                <CheckIcon /> · Mark all as read
              </button>
              <button className="mc-settings-icon-btn"><SettingsIcon /></button>
            </div>
          </div>

          {/* ── AI SUMMARY BANNER ── */}
          <div className="mc-ai-banner">
            <div className="mc-ai-left">
              <div className="mc-ai-icon"><AIStarIcon /></div>
              <div>
                <div className="mc-ai-title-row">
                  <span className="mc-ai-title">AI Summary</span>
                  <span className="mc-ai-beta">Beta</span>
                </div>
                <div className="mc-ai-text">
                  Jordan, you have 2 critical security alerts and 1 new personalized saving offer.
                  Your AI assistant recommends reviewing the recent login from New York immediately.
                </div>
              </div>
            </div>
            <button className="mc-ask-ai-btn">Ask AI Assistant <ArrowR /></button>
          </div>

          {/* ── FILTER TABS ── */}
          <div className="mc-tabs">
            {filterTabs.map(tab => (
              <button
                key={tab}
                className={`mc-tab${activeTab === tab ? ' active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* ── SEARCH + DELETE ROW ── */}
          <div className="mc-search-row">
            <div className="mc-msg-search">
              <SearchIcon />
              <input type="text" placeholder="Search messages..." />
            </div>
            <button className="mc-del-btn"><TrashIcon /></button>
          </div>

          {/* ── MESSAGES ── */}
          {visible.map((msg) => (
  <div key={msg.notification_id} className="mc-msg-card">
    <div className="mc-msg-row">

      {/* Notification Icon */}
      <div className="mc-msg-icon">
        🔔
      </div>

      <div className="mc-msg-body">

        <div className="mc-msg-title-row">

          <span className="mc-msg-title">
            {msg.title}
          </span>

          {!msg.is_read && (
            <div className="mc-unread-dot"></div>
          )}

          <span className="mc-msg-time">
            {new Date(msg.created_at).toLocaleString()}
          </span>

        </div>

        <div className="mc-msg-text">
          {msg.message}
        </div>

      </div>

    </div>
  </div>
))}

<div className="mc-footer-note">
  Showing {visible.length} notifications.
</div>
        </div>

        {/* ── PAGE FOOTER ── */}
        <div className="mc-page-footer" style={{ marginLeft: 0 }}>
          <span>© 2024 NovaBank AI. Secure Banking for Gen Z.</span>
          <div className="mc-page-footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact Support</a>
          </div>
        </div>
      </div>
    </div>
  );
}