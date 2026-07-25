import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../services/api";
import "./SetTransactionPin.css";
import "../../styles/global.css";
import Sidebar from '../../components/sidebar/sidebar';

export default function SetTransactionPin() {
  const navigate = useNavigate();

  const [pin, setPin] = useState(["", "", "", ""]);
  const [confirmPin, setConfirmPin] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const handleChange = (value, index, type) => {
    if (!/^\d?$/.test(value)) return;

    const data = type === "pin" ? [...pin] : [...confirmPin];
    data[index] = value;

    if (type === "pin") {
      setPin(data);
    } else {
      setConfirmPin(data);
    }

    if (value && index < 3) {
      const next = document.getElementById(`${type}-${index + 1}`);
      if (next) next.focus();
    }
  };

  const handleKeyDown = (e, index, type) => {
    if (e.key === "Backspace") {
      const data = type === "pin" ? pin : confirmPin;

      if (!data[index] && index > 0) {
        const prev = document.getElementById(`${type}-${index - 1}`);
        if (prev) prev.focus();
      }
    }
  };

  const savePin = async () => {
    const first = pin.join("");
    const second = confirmPin.join("");

    if (first.length !== 4) {
      return Swal.fire(
        "Invalid PIN",
        "PIN must contain exactly 4 digits.",
        "error"
      );
    }

    if (first !== second) {
      return Swal.fire(
        "Mismatch",
        "PINs do not match.",
        "error"
      );
    }

    try {
      setLoading(true);

      await api.post("/transfer/set-pin", {
        pin: first,
      });

      Swal.fire({
        icon: "success",
        title: "Transaction PIN Created",
        text: "Your transaction PIN has been saved successfully.",
        confirmButtonColor: "#29b6f6",
      });

      navigate("/security");
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Unable to save PIN.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pin-layout">
      <Sidebar active="security" />

      <div className="pin-main">

        <div className="pin-card">

          <div className="pin-lock">
            🔒
          </div>

          <h2>Create Transaction PIN</h2>

          <p>
            This PIN will be required every time you
            transfer money from your account.
          </p>

          <div className="pin-section">

            <label>Create PIN</label>

            <div className="pin-boxes">
              {pin.map((item, index) => (
                <input
                  key={index}
                  id={`pin-${index}`}
                  type="password"
                  maxLength="1"
                  value={item}
                  onChange={(e) =>
                    handleChange(
                      e.target.value,
                      index,
                      "pin"
                    )
                  }
                  onKeyDown={(e) =>
                    handleKeyDown(
                      e,
                      index,
                      "pin"
                    )
                  }
                />
              ))}
            </div>

          </div>

          <div className="pin-section">

            <label>Confirm PIN</label>

            <div className="pin-boxes">
              {confirmPin.map((item, index) => (
                <input
                  key={index}
                  id={`confirmPin-${index}`}
                  type="password"
                  maxLength="1"
                  value={item}
                  onChange={(e) =>
                    handleChange(
                      e.target.value,
                      index,
                      "confirmPin"
                    )
                  }
                  onKeyDown={(e) =>
                    handleKeyDown(
                      e,
                      index,
                      "confirmPin"
                    )
                  }
                />
              ))}
            </div>

          </div>

          <div className="pin-info">

            ✓ PIN must contain exactly 4 digits

            <br />

            ✓ Never share your PIN

          </div>

          <button
            className="save-pin-btn"
            onClick={savePin}
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : "Save Transaction PIN"}
          </button>

        </div>

      </div>
    </div>
  );
}