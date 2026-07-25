import { useState } from 'react';
import './transfer.css';
import '../../styles/global.css';
import Sidebar from '../../components/sidebar/sidebar';
import api from "../../services/api";
import Swal from "sweetalert2";
import TransactionPinModal from "../../components/TransactionPinModal/TransactionPinModal";


const CardIcon = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="1" y="3" width="13" height="9" rx="1.5" stroke="#0f172a" strokeWidth="1.2"/><path d="M1 6h13" stroke="#0f172a" strokeWidth="1.2"/></svg>;
const PhoneIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="3.5" y="1" width="7" height="12" rx="1.3" stroke="currentColor" strokeWidth="1.2"/><path d="M6 10.5h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
const InfoIcon = () => <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5.5" stroke="#64748b" strokeWidth="1.2"/><path d="M6.5 6v3.2M6.5 4v.2" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round"/></svg>;
const SwapIcon = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2 5l4-3 4 3M6 2v9M13 10l-4 3-4-3M9 13V4" stroke="#0f172a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const AIIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1l1.6 4.4H14l-3.5 2.6 1.4 4.4L8 9.8l-3.9 2.6 1.4-4.4L2 5.4h4.4L8 1z" stroke="#29b6f6" strokeWidth="1.2" strokeLinejoin="round" fill="rgba(41,182,246,0.15)"/></svg>;
const ArrowR = () => <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M5.5 2.5l2.5 2.5-2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const PlusIcon = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 4v12M4 10h12" stroke="#94a3b8" strokeWidth="1.6" strokeLinecap="round"/></svg>;

const recipients = [
  { name: 'Rahul', initial: 'R' },
  { name: 'Priya', initial: 'P' },
  { name: 'Aman', initial: 'A' },
  { name: 'Sneha', initial: 'S' },
  { name: 'Family', initial: 'F' },
];

export default function TransfersPage() {
  const [method, setMethod] = useState("bank");
  const [selected, setSelected] = useState("");
  const [showPinModal, setShowPinModal] = useState(false);

const [transactionLoading, setTransactionLoading] = useState(false);
  



const [accountNumber, setAccountNumber] = useState("");
const [amount, setAmount] = useState("");
const [description, setDescription] = useState("");

const [loading, setLoading] = useState(false);

const handleTransfer = () => {
  if (!accountNumber || !amount) {
    Swal.fire({
      icon: "warning",
      title: "Incomplete Details",
      text: "Please fill all transfer details.",
    });
    return;
  }

  setShowPinModal(true);
};

const verifyTransactionPin = async (pin) => {
  if (loading) return;

  if (pin.length !== 4) {
    Swal.fire({
      icon: "warning",
      title: "Invalid PIN",
      text: "Please enter a valid 4-digit PIN.",
    });
    return;
  }

  try {
    setLoading(true);

    await api.post("/transfer", {
      accountNumber,
      amount: Number(amount),
      description,
      pin,
    });

    setShowPinModal(false);

    await Swal.fire({
      icon: "success",
      title: "Transfer Successful!",
      text: "Your money has been transferred successfully.",
      confirmButtonText: "OK",
    });

    setAccountNumber("");
    setAmount("");
    setDescription("");

  }catch (error) {
  Swal.fire({
    icon: "error",
    title: "Transfer Failed",
    text:
      error.response?.data?.message ||
      "Something went wrong. Please try again.",
  });

  setShowPinModal(false); // Close the PIN modal
}finally {
  setLoading(false);
}
};

console.log("loading:", loading);
  return (
    <div className="transfers-layout">
      <Sidebar active="transfers" />

      <div className="transfers-main">
        <div className="transfers-content">

          
          

          <div className="tr-details-card">
            <div className="tr-details-header">
              <CardIcon />Secure Money Transfer
            </div>

            <div className="tr-amount-section">
              <div className="tr-sending-label">TRANSFER AMOUNT</div>
              <div className="tr-amount-display">
                <span className="tr-currency">₹</span>

                <input
                  type="number"
                  className="tr-amount-input"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <span className="tr-limit-note">
                <InfoIcon />Daily Transfer Limit Remaining:₹2,50,000
              </span>
            </div>

            <div className="tr-method-section">
              <div className="tr-method-label">Choose Method</div>
              <div className="tr-method-toggle">
                <button
                  className={`tr-method-btn${method === 'bank' ? ' active' : ''}`}
                  onClick={() => setMethod('bank')}
                >
                  <CardIcon />Bank Account Transfer
                </button>
                <button
                  className={`tr-method-btn${method === 'upi' ? ' active' : ''}`}
                  onClick={() => setMethod('upi')}
                >
                  <PhoneIcon />UPI Instant Payment
                </button>
              </div>

              <div className="tr-recipient-bank">
                <div style={{width:'100%'}}>
                  <div className="tr-bank-row">
                    <span className="tr-bank-label">Bank Name</span>
                    <span className="tr-bank-value">State Bank of India</span>
                  </div>
                  <div className="tr-bank-row">
                    <span className="tr-bank-label">Account Number</span>
                    <input
                      type="text"
                      className="tr-bank-input"
                      placeholder="Enter Account Number"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="tr-description">
                  <label>Description</label>

                  <textarea
                      placeholder="Purpose of transfer"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                  />
              </div>
            </div>

            <div className="tr-review-section">
              <div className="tr-review-header">
                <span className="tr-review-title"><SwapIcon /> TRANSACTION REVIEW</span>
                <span className="tr-speed-badge">Standard Speed</span>
              </div>
              <div className="tr-review-list">
                <div className="tr-review-row">
                  <span>Transfer Amount </span>
                  <span>₹{amount || 0}</span>
                </div>
                <div className="tr-review-row">
                  <span>Processing Charges</span>
                  <span>₹0.00</span>
                </div>
                <div className="tr-review-row">
                  <span>GST</span>
                  <span>₹0.00</span>
                </div>
                <div className="tr-review-row total">
                  <span>Total Debit Amountt</span>
                  <span className="tr-total-value">₹{amount || 0}</span>
                </div>
              </div>
              <button
  className={`btn-confirm-transfer ${loading ? "loading" : ""}`}
  onClick={handleTransfer}
  disabled={loading}
>
  {loading ? (
    <>
      <span className="spinner"></span>
      Processing Transfer...
    </>
  ) : (
    "Proceed Secure Transfer"
  )}
</button>
            </div>
          </div>
          

          

        </div>

        <div className="tr-footer" style={{marginLeft:0}}>
          <span>© APNA Bank AI. Secure Banking</span>
          <div className="tr-footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact Support</a>
          </div>
        </div>
        <TransactionPinModal
  open={showPinModal}
  loading={loading}
  onClose={() => setShowPinModal(false)}
  onVerify={verifyTransactionPin}
/>
      </div>

      <button className="tr-ai-fab">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2l1.6 4.4H16l-3.5 2.6 1.4 4.4L10 10.8l-3.9 2.6 1.4-4.4L4 6.4h4.4L10 2z" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round" fill="rgba(255,255,255,0.25)"/>
        </svg>
      </button>
    </div>
  );
}