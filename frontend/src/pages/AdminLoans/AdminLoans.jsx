import React, { useEffect, useState } from "react";
import "./AdminLoans.css";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import {
  FaSearch,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaFileInvoiceDollar,
  FaEye,
} from "react-icons/fa";

import {
  getAllLoans,
  approveLoan,
  rejectLoan,
} from "../../api/adminApi";

const AdminLoans = () => {
  const [loans, setLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    loadLoans();
  }, []);

  useEffect(() => {
    filterLoans();
  }, [search, statusFilter, loans]);

  const loadLoans = async () => {
  try {
    const res = await getAllLoans();

    console.log(res.loans);   // 👈 Add this

    setLoans(res.loans || []);
  } catch (err) {
    console.log(err);
  }
};
  const handleApprove = async (loanId) => {
  try {
    await approveLoan(loanId);

    alert("Loan Approved Successfully");

    loadLoans();
  } catch (error) {
    console.log(error);
    alert("Failed to approve loan");
  }
};

const handleReject = async (loanId) => {
  try {
    await rejectLoan(loanId);

    alert("Loan Rejected Successfully");

    loadLoans();
  } catch (error) {
    console.log(error);
    alert("Failed to reject loan");
  }
};

  const filterLoans = () => {
    let data = [...loans];

    if (statusFilter !== "All") {
      data = data.filter(
        (loan) => (loan.status || "").toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (search !== "") {
      data = data.filter(
        (loan) =>
          loan.fullName?.toLowerCase().includes(search.toLowerCase()) ||
          loan.loanType?.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredLoans(data);
  };

  const totalLoans = loans.length;
  const pendingLoans = loans.filter(
  (loan) => loan.status === "Applied"
).length;
  const approvedLoans = loans.filter(
    (loan) => loan.status === "Approved"
  ).length;

  const rejectedLoans = loans.filter(
    (loan) => loan.status === "Rejected"
  ).length;

  return (
    <div className="admin-loans-page">

      <AdminSidebar />

      <div className="admin-loans-container">

        {/* Header */}

        <div className="loan-header">

          <div>

            <h1>Loan Management</h1>

            <p>
              Review and manage all loan applications.
            </p>

          </div>

        </div>

        {/* Search */}

        <div className="loan-toolbar">

          <div className="loan-search">

            <FaSearch />

            <input
              type="text"
              placeholder="Search customer or loan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option>All</option>
            <option>Applied</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>

        </div>

        {/* Statistics */}

        <div className="loan-stats">

          <div className="loan-card">

            <FaFileInvoiceDollar />

            <div>

              <span>Total Loans</span>

              <h2>{totalLoans}</h2>

            </div>

          </div>

          <div className="loan-card pending-card">

            <FaClock />

            <div>

              <span>Pending</span>

              <h2>{pendingLoans}</h2>

            </div>

          </div>

          <div className="loan-card approve-card">

            <FaCheckCircle />

            <div>

              <span>Approved</span>

              <h2>{approvedLoans}</h2>

            </div>

          </div>

          <div className="loan-card reject-card">

            <FaTimesCircle />

            <div>

              <span>Rejected</span>

              <h2>{rejectedLoans}</h2>

            </div>

          </div>

        </div>

        {/* Loan Table */}

        <div className="loan-table-card">

          <table>

            <thead>

              <tr>

                <th>Customer</th>

                <th>Loan Type</th>

                <th>Amount</th>

                <th>Duration</th>

                <th>Status</th>

                <th>Action</th>

              </tr>

            </thead>

            <tbody>              {filteredLoans.length === 0 ? (
                <tr>
                  <td colSpan="6" className="no-data">
                    No loan applications found.
                  </td>
                </tr>
              ) : (
                filteredLoans.map((loan) => (
                  <tr key={loan.loanId}>

                    <td>
                      <div className="customer-info">
                        <h4>{loan.fullName}</h4>
                        <span>{loan.email}</span>
                      </div>
                    </td>

                    <td>{loan.loanType}</td>

                    <td>
                      ₹{Number(loan.loanAmount).toLocaleString()}
                    </td>

                    <td>{loan.duration} Months</td>

                    <td>

                      <span
                        className={`loan-status ${(loan.status || "").toLowerCase()}`}
                      >
                        {loan.status || "Applied"}
                      </span>

                    </td>

<td>
  <div className="loan-actions">

    {true && (
      <>
  <button
    className="approve-btn"
    onClick={() => handleApprove(loan.loanId)}
  >
    Approve
  </button>

  <button
    className="reject-btn"
    onClick={() => handleReject(loan.loanId)}
  >
    Reject
  </button>
</>
    )}

    {loan.status === "Approved" && (
      <span className="approved-text">
        Approved
      </span>
    )}

    {loan.status === "Rejected" && (
      <span className="rejected-text">
        Rejected
      </span>
    )}

    {loan.status === "Active" && (
      <span className="active-text">
        Active
      </span>
    )}

  </div>
</td>

                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
};

export default AdminLoans;