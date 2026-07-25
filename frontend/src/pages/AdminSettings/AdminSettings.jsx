import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminSettings.css";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";

const AdminSettings = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // TODO: Call backend API here
    alert("Password Changed Successfully");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="admin-settings-page">
      <AdminSidebar />

      <div className="settings-container">

        <h1>Settings</h1>

        <div className="profile-card">
          <h2>Admin Profile</h2>

          <p><strong>Name:</strong> Admin</p>
          <p><strong>Email:</strong> admin@apnabank.com</p>
          <p><strong>Role:</strong> Administrator</p>
        </div>

        <div className="password-card">

          <h2>Change Password</h2>

          <form onSubmit={handleChangePassword}>

            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={form.currentPassword}
              onChange={handleChange}
            />

            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={form.newPassword}
              onChange={handleChange}
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
            />

            <button type="submit">
              Change Password
            </button>

          </form>

        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default AdminSettings;