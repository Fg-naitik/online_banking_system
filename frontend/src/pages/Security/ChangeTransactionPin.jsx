import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../services/api";
import Sidebar from '../../components/sidebar/sidebar';
import "../../styles/global.css";
import "./ChangeTransactionPin.css";

export default function ChangeTransactionPin() {
  const navigate = useNavigate();

  const [currentPin, setCurrentPin] = useState(["", "", "", ""]);
  const [newPin, setNewPin] = useState(["", "", "", ""]);
  const [confirmPin, setConfirmPin] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const handleChange = (value, index, type) => {
    if (!/^\d?$/.test(value)) return;

    let data;

    if (type === "current") {
      data = [...currentPin];
      data[index] = value;
      setCurrentPin(data);
    } else if (type === "new") {
      data = [...newPin];
      data[index] = value;
      setNewPin(data);
    } else {
      data = [...confirmPin];
      data[index] = value;
      setConfirmPin(data);
    }

    if (value && index < 3) {
      document.getElementById(`${type}-${index + 1}`)?.focus();
    }
  };

  const updatePin = async () => {
    const oldPin = currentPin.join("");
    const pin = newPin.join("");
    const confirm = confirmPin.join("");

    if (oldPin.length !== 4 || pin.length !== 4) {
      return Swal.fire("Error", "PIN must contain exactly 4 digits.", "error");
    }

    if (pin !== confirm) {
      return Swal.fire("Error", "New PINs do not match.", "error");
    }

    try {
      setLoading(true);

      await api.put("/transfer/change-pin", {
        currentPin: oldPin,
        newPin: pin,
      });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Transaction PIN updated successfully.",
      });

      navigate("/security");
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Unable to change PIN.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const renderBoxes = (values, type) => (
    <div className="pin-boxes">
      {values.map((value, index) => (
        <input
          key={index}
          id={`${type}-${index}`}
          type="password"
          maxLength="1"
          value={value}
          onChange={(e) => handleChange(e.target.value, index, type)}
        />
      ))}
    </div>
  );

  return (
    <div className="pin-layout">
      <Sidebar active="security" />

      <div className="pin-main">
        <div className="pin-card">

          <div className="pin-lock">🔒</div>

          <h2>Change Transaction PIN</h2>

          <p>Update your secure 4-digit transaction PIN.</p>

          <div className="pin-section">
            <label>Current PIN</label>
            {renderBoxes(currentPin, "current")}
          </div>

          <div className="pin-section">
            <label>New PIN</label>
            {renderBoxes(newPin, "new")}
          </div>

          <div className="pin-section">
            <label>Confirm New PIN</label>
            {renderBoxes(confirmPin, "confirm")}
          </div>

          <button
            className="save-pin-btn"
            onClick={updatePin}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update PIN"}
          </button>

        </div>
      </div>
    </div>
  );
}