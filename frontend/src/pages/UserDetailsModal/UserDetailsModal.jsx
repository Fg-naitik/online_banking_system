import React from "react";
import "./UserDetailsModal.css";

const UserDetailsModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">

        <h2>User Details</h2>

        <div className="detail-row">
          <strong>Name:</strong>
          <span>{user.fullName}</span>
        </div>

        <div className="detail-row">
          <strong>Email:</strong>
          <span>{user.email}</span>
        </div>

        <div className="detail-row">
          <strong>Account:</strong>
          <span>{user.accountNumber}</span>
        </div>

        <div className="detail-row">
          <strong>Balance:</strong>
          <span>
            ₹ {Number(user.balance || 0).toLocaleString("en-IN")}
          </span>
        </div>

        <div className="detail-row">
          <strong>Status:</strong>
          <span>{user.status}</span>
        </div>

        <button className="close-btn" onClick={onClose}>
          Close
        </button>

      </div>
    </div>
  );
};

export default UserDetailsModal;