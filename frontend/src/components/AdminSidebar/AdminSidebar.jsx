import React from "react";
import "./AdminSidebar.css";
import { NavLink } from "react-router-dom";

import {
  FaTachometerAlt,
  FaUsers,
  FaUniversity,
  FaExchangeAlt,
  FaMoneyCheckAlt,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminSidebar = () => {
  const menu = [
    {
      title: "Dashboard",
      path: "/admin/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      title: "Users",
      path: "/admin/users",
      icon: <FaUsers />,
    },
    {
      title: "Accounts",
      path: "/admin/account",
      icon: <FaUniversity />,
    },
    {
      title: "Transactions",
      path: "/admin/transactions",
      icon: <FaExchangeAlt />,
    },
    {
      title: "Loans",
      path: "/admin/loans",
      icon: <FaMoneyCheckAlt />,
    },
    {
      title: "Settings",
      path: "/admin/settings",
      icon: <FaCog />,
    },
  ];

  return (
    <div className="admin-sidebar">
      <div className="sidebar-logo">
        <h2>
          Apna <span>Bank</span>
        </h2>
        <p>Admin Panel</p>
      </div>

      <div className="sidebar-menu">
        {menu.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <span>{item.icon}</span>
            <p>{item.title}</p>
          </NavLink>
        ))}
      </div>

      <div className="sidebar-footer">
        <button className="logout-btn">
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;