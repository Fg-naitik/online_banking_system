import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import { FaUsers, FaUniversity, FaExchangeAlt, FaMoneyBillWave, FaFileInvoiceDollar, FaClock, FaCheckCircle, FaTimesCircle, FaSearch, FaBell } from "react-icons/fa";
import { getDashboardStats } from "../../api/adminApi";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAccounts: 0,
    totalTransactions: 0,
    totalBalance: 0,
    totalLoans: 0,
    appliedLoans: 0,
    approvedLoans: 0,
    rejectedLoans: 0,
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await getDashboardStats();
      setStats(res.stats);
    } catch (error) {
      console.log(error);
    }
  };

  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <FaUsers />,
      color: "#3B82F6",
    },
    {
      title: "Accounts",
      value: stats.totalAccounts,
      icon: <FaUniversity />,
      color: "#06B6D4",
    },
    {
      title: "Transactions",
      value: stats.totalTransactions,
      icon: <FaExchangeAlt />,
      color: "#10B981",
    },
    {
      title: "Total Balance",
      value: `₹${Number(stats.totalBalance).toLocaleString()}`,
      icon: <FaMoneyBillWave />,
      color: "#F59E0B",
    },
    {
      title: "Loans",
      value: stats.totalLoans,
      icon: <FaFileInvoiceDollar />,
      color: "#8B5CF6",
    },
    {
      title: "Pending Loans",
      value: stats.appliedLoans,
      icon: <FaClock />,
      color: "#F97316",
    },
    {
      title: "Approved",
      value: stats.approvedLoans,
      icon: <FaCheckCircle />,
      color: "#22C55E",
    },
    {
      title: "Rejected",
      value: stats.rejectedLoans,
      icon: <FaTimesCircle />,
      color: "#EF4444",
    },
  ];

  return (
    <div className="admin-dashboard">
      <AdminSidebar />

      <div className="admin-main">

        {/* ================= HEADER ================= */}

        <div className="dashboard-header">

          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search users, loans, transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="header-right">

            <div className="notification">
              <FaBell />
            </div>

            <div className="admin-profile">
              <img
                src="https://i.pravatar.cc/100"
                alt="admin"
              />

              <div>
                <h4>Admin</h4>
                <span>Apna Bank</span>
              </div>

            </div>

          </div>

        </div>

        {/* ================= WELCOME ================= */}

        <div className="welcome-section">

          <div>

            <h1>
              Welcome Back,
              <span> Admin 👋</span>
            </h1>

            <p>
              Manage customers, accounts, loans and transactions of
              <strong> Apna Bank</strong>.
            </p>

          </div>

        </div>

        {/* ================= STATISTICS ================= */}

        <div className="stats-grid">

          {cards.map((card, index) => (

            <div
              key={index}
              className="stat-card"
            >

              <div
                className="card-icon"
                style={{
                  background: card.color,
                }}
              >
                {card.icon}
              </div>

              <div className="card-content">

                <p>{card.title}</p>

                <h2>{card.value}</h2>

              </div>

            </div>

          ))}

        </div>

        {/* ================= CONTENT START ================= */}

        <div className="dashboard-content">

          {/* Recent Users */}
          <div className="dashboard-card">

            <div className="card-header">

              <h3>Recent Users</h3>

              <button>View All</button>

            </div>

            <table>

              <thead>

                <tr>

                  <th>Name</th>

                  <th>Email</th>

                  <th>Status</th>

                </tr>

              </thead>

              <tbody>

                <tr>

                  <td>John Doe</td>

                  <td>john@gmail.com</td>

                  <td>
                    <span className="active">
                      Active
                    </span>
                  </td>

                </tr>

                <tr>

                  <td>Rahul Sharma</td>

                  <td>rahul@gmail.com</td>

                  <td>
                    <span className="active">
                      Active
                    </span>
                  </td>

                </tr>

                <tr>

                  <td>Priya Singh</td>

                  <td>priya@gmail.com</td>

                  <td>
                    <span className="inactive">
                      Pending
                    </span>
                  </td>

                </tr>

              </tbody>

            </table>

          </div>
                    {/* Pending Loan Requests */}

          <div className="dashboard-card">

            <div className="card-header">

              <h3>Pending Loan Requests</h3>

              <button>View All</button>

            </div>

            <table>

              <thead>

                <tr>

                  <th>Applicant</th>

                  <th>Amount</th>

                  <th>Status</th>

                  <th>Action</th>

                </tr>

              </thead>

              <tbody>

                <tr>

                  <td>Rahul Sharma</td>

                  <td>₹2,50,000</td>

                  <td>
                    <span className="pending">
                      Pending
                    </span>
                  </td>

                  <td>

                    <button className="approve-btn">
                      Approve
                    </button>

                    <button className="reject-btn">
                      Reject
                    </button>

                  </td>

                </tr>

                <tr>

                  <td>Priya Singh</td>

                  <td>₹1,20,000</td>

                  <td>
                    <span className="pending">
                      Pending
                    </span>
                  </td>

                  <td>

                    <button className="approve-btn">
                      Approve
                    </button>

                    <button className="reject-btn">
                      Reject
                    </button>

                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

        {/* ================= SECOND ROW ================= */}

        <div className="dashboard-bottom">

          {/* Recent Transactions */}

          <div className="dashboard-card transaction-card">

            <div className="card-header">

              <h3>Recent Transactions</h3>

              <button>View All</button>

            </div>

            <table>

              <thead>

                <tr>

                  <th>User</th>

                  <th>Type</th>

                  <th>Amount</th>

                  <th>Status</th>

                </tr>

              </thead>

              <tbody>

                <tr>

                  <td>Amit</td>

                  <td>Credit</td>

                  <td>₹5,000</td>

                  <td>
                    <span className="success">
                      Success
                    </span>
                  </td>

                </tr>

                <tr>

                  <td>Rohit</td>

                  <td>Debit</td>

                  <td>₹1,500</td>

                  <td>
                    <span className="success">
                      Success
                    </span>
                  </td>

                </tr>

                <tr>

                  <td>Neha</td>

                  <td>Transfer</td>

                  <td>₹15,000</td>

                  <td>
                    <span className="pending">
                      Pending
                    </span>
                  </td>

                </tr>

              </tbody>

            </table>

          </div>

          {/* Today's Summary */}

          <div className="summary-card">

            <h3>Today's Summary</h3>

            <div className="summary-item">

              <span>New Users</span>

              <h2>12</h2>

            </div>

            <div className="summary-item">

              <span>Transactions</span>

              <h2>164</h2>

            </div>

            <div className="summary-item">

              <span>Loan Requests</span>

              <h2>8</h2>

            </div>

            <div className="summary-item">

              <span>Total Revenue</span>

              <h2>₹5,48,000</h2>

            </div>

            <div className="summary-item">

              <span>Server Status</span>

              <h2 className="online">
                Healthy
              </h2>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default AdminDashboard;