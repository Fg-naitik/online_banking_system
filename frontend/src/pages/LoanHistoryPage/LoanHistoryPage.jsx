import { useEffect, useState } from "react";
import "./LoanHistoryPage.css";
import "../../styles/global.css";
import Sidebar from "../../components/sidebar/sidebar";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function LoanHistoryPage() {
  const [loans, setLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      setLoading(true);

      const res = await api.get("/loans");

      setLoans(res.data.loans);
      setFilteredLoans(res.data.loans);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const data = loans.filter((loan) => {
      return (
        loan.loan_type
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||

        String(loan.loan_id)
          .includes(search)
      );
    });

    setFilteredLoans(data);
  }, [search, loans]);

  const badgeClass = (status) => {
    switch (status) {
      case "Approved":
        return "approved";

      case "Rejected":
        return "rejected";

      default:
        return "pending";
    }
  };

  return (
    <div className="loan-history-layout">

      <Sidebar active="loans" />

      <div className="loan-history-main">

        <div className="loan-history-header">

          <div>

            <h1>Loan History</h1>

            <p>
              View all your loan applications and their current status.
            </p>

          </div>

          <input
            type="text"
            placeholder="Search Loan ID or Loan Type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="loan-search"
          />

        </div>

        <div className="loan-history-card">

          {loading ? (

            <div className="loading">
              Loading Loan History...
            </div>

          ) : filteredLoans.length === 0 ? (

            <div className="empty">

              <h3>No Loan Applications Found</h3>

              <p>
                You haven't applied for any loans yet.
              </p>

            </div>

          ) : (

            <table className="loan-table">

              <thead>

                <tr>

                  <th>Loan ID</th>

                  <th>Loan Type</th>

                  <th>Amount</th>

                  <th>Interest</th>

                  <th>EMI</th>

                  <th>Status</th>

                  <th>Applied On</th>

                  <th>Action</th>

                </tr>

              </thead>

              <tbody>
                {filteredLoans.map((loan) => (
  <tr key={loan.loan_id}>

    <td>#{loan.loan_id}</td>

    <td>{loan.loan_type}</td>

    <td>
      ₹
      {Number(loan.amount).toLocaleString("en-IN")}
    </td>

    <td>
      {loan.interest_rate}%
    </td>

    <td>
      ₹
      {Number(loan.emi_amount).toLocaleString("en-IN")}
    </td>

    <td>

      <span
        className={`status-badge ${badgeClass(
          loan.status
        )}`}
      >
        {loan.status}
      </span>

    </td>

    <td>
      {new Date(
        loan.created_at
      ).toLocaleDateString()}
    </td>

    <td>

      <button
  className="view-btn"
  onClick={() => navigate(`/loans/${loan.loan_id}`)}
>
  View
</button>

    </td>

  </tr>
))}
              </tbody>

            </table>

          )}

        </div>

      </div>

    </div>
  );
}