import "./sidebar.css";
import { Link, useNavigate } from "react-router-dom";

const LogoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M2 11L7 3l5 8"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.5 7.5h5"
      stroke="#fff"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const icons = {
  dashboard: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <rect x="1" y="1" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.3"/>
      <rect x="8" y="1" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.3"/>
      <rect x="1" y="8" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.3"/>
      <rect x="8" y="8" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.3"/>
    </svg>
  ),

  transactions: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M7.5 4v4l2.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),

  transfers: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path
        d="M2 5h11M10 2l3 3-3 3M13 10H2M5 7l-3 3 3 3"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  analytics: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path
        d="M1 11l4-4 3 2 4-5 2 1.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  loans: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <rect x="1" y="3" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M1 6h13" stroke="currentColor" strokeWidth="1.3"/>
    </svg>
  ),

  security: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path
        d="M7.5 1L2 3.2V7c0 3.2 2.4 5.5 5.5 6.3C10.6 12.5 13 10.2 13 7V3.2L7.5 1z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  ),

  ai: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path
        d="M13 7.5a5.5 5.5 0 01-5.5 5.5A5.5 5.5 0 012 7.5 5.5 5.5 0 017.5 2"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M10 1l1.2 3H14l-2.5 1.8 1.2 3.2L10 7.2 7.3 9l1.2-3.2L6 4h2.8L10 1z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  ),

  settings: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <circle cx="7.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.3"/>
      <path
        d="M7.5 1v1.5M7.5 12.5V14M1 7.5h1.5M12.5 7.5H14M3 3l1 1M11 11l1 1M3 12l1-1M11 4l1-1"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  ),

  logout: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path
        d="M6 13H3a1 1 0 01-1-1V3a1 1 0 011-1h3M10 10l3-2.5L10 5M14 7.5H6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard" },
  { id: "transactions", label: "Transactions", icon: "transactions" },
  { id: "transfers", label: "Transfers", icon: "transfers" },
  { id: "analytics", label: "Analytics", icon: "analytics" },
  { id: "loans", label: "Loans", icon: "loans" },
  { id: "security", label: "Security", icon: "security" },
  { id: "ai-assistant", label: "AI Assistant", icon: "ai" },
];

export default function Sidebar({ active = "dashboard" }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <LogoIcon />
        </div>
        APNA Bank
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={`/${item.id}`}
            className={`sidebar-link ${
              active === item.id ? "active" : ""
            }`}
          >
            {icons[item.icon]}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <Link
          to="/settings"
          className={`sidebar-link ${
            active === "settings" ? "active" : ""
          }`}
        >
          {icons.settings}
          <span>Settings</span>
        </Link>

        <div
          className="sidebar-link logout"
          onClick={handleLogout}
          style={{ cursor: "pointer" }}
        >
          {icons.logout}
          <span>Logout</span>
        </div>
      </div>
    </aside>
  );
}