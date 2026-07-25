import { useEffect, useRef, useState } from "react";
import "./TransactionPinModal.css";

export default function TransactionPinModal({
  open,
  onClose,
  onVerify,
  loading,
}) {
  const [pin, setPin] = useState(["", "", "", ""]);

  const inputRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];

  useEffect(() => {
    if (open) {
      setPin(["", "", "", ""]);
      setTimeout(() => {
        inputRefs[0].current.focus();
      }, 200);
    }
  }, [open]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;

    setPin(newPin);

    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace") {
      if (!pin[index] && index > 0) {
        inputRefs[index - 1].current.focus();
      }
    }
  };

  const verifyPin = () => {
    onVerify(pin.join(""));
  };

  if (!open) return null;

  return (
    <div className="pin-overlay">

      <div className="pin-modal">

        <button
          className="pin-close"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="pin-lock">
          🔒
        </div>

        <h2>Verify Transaction PIN</h2>

        <p>
          Enter your 4-digit transaction PIN
          to complete this transfer securely.
        </p>

        <div className="pin-inputs">

          {pin.map((digit, index) => (

            <input
              key={index}
              ref={inputRefs[index]}
              maxLength={1}
              value={digit}
              type="password"
              onChange={(e) =>
                handleChange(e.target.value, index)
              }
              onKeyDown={(e) =>
                handleBackspace(e, index)
              }
            />

          ))}

        </div>

        <small>
          🔐 Your PIN is encrypted and secure
        </small>

        <button
          className="verify-btn"
          onClick={verifyPin}
          disabled={loading}
        >
          {loading
            ? "Verifying..."
            : "Verify PIN"}
        </button>

        <button
          className="cancel-btn"
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </button>

        <span className="secure-text">
          Secured by APNA Bank
        </span>

      </div>

    </div>
  );
}