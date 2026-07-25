import React from "react";
import "./AdminAccount.css";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import {
  FaUserCircle,
  FaEnvelope,
  FaUserShield,
  FaPhone,
  FaCalendarAlt,
} from "react-icons/fa";

const AdminAccount = () => {
  return (
    <div className="admin-account-page">
      <AdminSidebar />

      <div className="account-container">
        <h1>Admin Account</h1>
        <p className="subtitle">View your administrator profile details.</p>

        <div className="account-card">

          <div className="profile-header">
            <FaUserCircle className="profile-icon" />
            <div>
              <h2>Administrator</h2>
              <span>Apna Bank Admin Panel</span>
            </div>
          </div>

          <div className="account-details">

            <div className="detail-box">
              <FaUserShield />
              <div>
                <label>Role</label>
                <p>Administrator</p>
              </div>
            </div>

            <div className="detail-box">
              <FaEnvelope />
              <div>
                <label>Email</label>
                <p>admin@apnabank.com</p>
              </div>
            </div>

            <div className="detail-box">
              <FaPhone />
              <div>
                <label>Phone</label>
                <p>+91 9876543210</p>
              </div>
            </div>

            <div className="detail-box">
              <FaCalendarAlt />
              <div>
                <label>Joined</label>
                <p>25 July 2026</p>
              </div>
            </div>

          </div>

          <button className="edit-btn">
            Edit Profile
          </button>

        </div>
      </div>
    </div>
  );
};

export default AdminAccount;