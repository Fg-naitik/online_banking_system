import "./TopBar.css";

export default function TopBar({
  user,
  notificationCount = 0,
  onProfile,
  onLogout,
}) {
  const userName = user?.first_name || "Guest";
  const userRole = user?.email || "Premium Member";
  const initial = user?.first_name
    ? user.first_name.charAt(0).toUpperCase()
    : "A";

  return (
    <header className="topbar">
      {/* Search */}
      <div className="topbar-search">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle
            cx="6"
            cy="6"
            r="4.5"
            stroke="#94a3b8"
            strokeWidth="1.3"
          />
          <path
            d="M9.5 9.5l2.5 2.5"
            stroke="#94a3b8"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>

        <input
          type="text"
          placeholder="Search transactions or ask AI..."
        />
      </div>

      {/* Right Side */}
      <div className="topbar-right">

        {/* Notification */}
        <button className="topbar-bell">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M9 2a5 5 0 00-5 5v3l-1.5 2h13L14 10V7a5 5 0 00-5-5z"
              stroke="#64748b"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            <path
              d="M7 14a2 2 0 004 0"
              stroke="#64748b"
              strokeWidth="1.4"
            />
          </svg>

          {notificationCount > 0 && (
            <span className="bell-dot">
              {notificationCount}
            </span>
          )}
        </button>

        {/* User */}
        <div
          className="topbar-user"
          onClick={onProfile}
        >
          <div className="topbar-user-info">
            <span className="topbar-user-name">
              {userName}
            </span>

            <span className="topbar-user-role">
              {userRole}
            </span>
          </div>

          <div className="topbar-avatar">
            {initial}
            <span className="avatar-status"></span>
          </div>
        </div>
      </div>
    </header>
  );
}