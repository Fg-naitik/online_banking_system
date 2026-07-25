import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar/sidebar";
import api from "../../services/api";
import "../../styles/global.css";
import "./LoanDetailsPage.css";

export default function LoanDetailsPage() {
  const { id } = useParams();

  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLoan();
  }, []);

  const fetchLoan = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/loans/${id}`);

      setLoan(res.data.loan);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loan-details-loading">
        Loading Loan Details...
      </div>
    );
  }

  if (!loan) {
    return (
      <div className="loan-details-loading">
        Loan Not Found
      </div>
    );
  }

  return (
    <div className="loan-details-layout">

      <Sidebar active="loans" />

      <div className="loan-details-main">

        <div className="details-header">

          <h1>Loan Details</h1>

          <p>
            Complete information about your loan application.
          </p>

        </div>

        <div className="details-card">

          <div className="detail-item">
            <span>Loan ID</span>
            <strong>#{loan.loan_id}</strong>
          </div>

          <div className="detail-item">
            <span>Loan Type</span>
            <strong>{loan.loan_type}</strong>
          </div>

          <div className="detail-item">
            <span>Amount</span>
            <strong>
              ₹{Number(loan.amount).toLocaleString("en-IN")}
            </strong>
          </div>

          <div className="detail-item">
            <span>Interest Rate</span>
            <strong>{loan.interest_rate}%</strong>
          </div>

          <div className="detail-item">
            <span>Tenure</span>
            <strong>{loan.tenure_months} Months</strong>
          </div>

          <div className="detail-item">
            <span>Monthly EMI</span>
            <strong>
              ₹{Number(loan.emi_amount).toLocaleString("en-IN")}
            </strong>
          </div>

          <div className="detail-item">
            <span>Status</span>

            <strong className={`status ${loan.status.toLowerCase()}`}>
              {loan.status}
            </strong>

          </div>

          <div className="detail-item">
            <span>Applied On</span>

            <strong>
              {new Date(loan.created_at).toLocaleDateString()}
            </strong>

          </div>

          <div className="detail-item">
            <span>Account Number</span>

            <strong>
              {loan.account_number}
            </strong>

          </div>

        </div>

        <div className="documents-card">

          <h2>Uploaded Documents</h2>

          <div className="document-buttons">

            <a
              href={`http://localhost:5000/uploads/${loan.pan_document}`}
              target="_blank"
              rel="noreferrer"
              className="doc-btn"
            >
              View PAN Card
            </a>

            <a
              href={`http://localhost:5000/uploads/${loan.aadhaar_document}`}
              target="_blank"
              rel="noreferrer"
              className="doc-btn"
            >
              View Aadhaar
            </a>

          </div>

        </div>

      </div>

    </div>
  );
}