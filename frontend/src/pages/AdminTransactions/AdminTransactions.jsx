import React, { useEffect, useState } from "react";
import "./AdminTransactions.css";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";

import {
  FaSearch,
  FaMoneyCheckAlt,
  FaArrowDown,
  FaArrowUp,
  FaExchangeAlt
} from "react-icons/fa";

import { getAllTransactions } from "../../api/adminApi";

const AdminTransactions = () => {

  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    loadTransactions();
  }, []);

  useEffect(() => {
    filterTransactions();
  }, [transactions, search, filter]);

  const loadTransactions = async () => {
    try {
      const res = await getAllTransactions();
      setTransactions(res.transactions || []);
    } catch (err) {
      console.log(err);
    }
  };

  const filterTransactions = () => {

    let data = [...transactions];

    if (filter !== "All") {
      data = data.filter(
        item => item.type.toLowerCase() === filter.toLowerCase()
      );
    }

    if (search !== "") {
      data = data.filter(
        item =>
          item.fullName.toLowerCase().includes(search.toLowerCase()) ||
          item.accountNumber.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredTransactions(data);

  };

  const totalTransactions = transactions.length;

  const totalCredit = transactions.filter(
    t => t.type === "Credit"
  ).length;

  const totalDebit = transactions.filter(
    t => t.type === "Debit"
  ).length;

  const totalTransfer = transactions.filter(
    t => t.type === "Transfer"
  ).length;

  return (

    <div className="admin-transactions">

      <AdminSidebar />

      <div className="transaction-container">

        <div className="transaction-header">

          <div>

            <h1>Transactions</h1>

            <p>
              Monitor every transaction in Apna Bank.
            </p>

          </div>

        </div>

        <div className="transaction-toolbar">

          <div className="transaction-search">

            <FaSearch />

            <input
              placeholder="Search customer..."
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
            />

          </div>

          <select
            value={filter}
            onChange={(e)=>setFilter(e.target.value)}
          >

            <option>All</option>
            <option>Credit</option>
            <option>Debit</option>
            <option>Transfer</option>

          </select>

        </div>

        <div className="transaction-stats">

          <div className="transaction-card">

            <FaMoneyCheckAlt />

            <div>

              <span>Total</span>

              <h2>{totalTransactions}</h2>

            </div>

          </div>

          <div className="transaction-card credit">

            <FaArrowDown />

            <div>

              <span>Credit</span>

              <h2>{totalCredit}</h2>

            </div>

          </div>

          <div className="transaction-card debit">

            <FaArrowUp />

            <div>

              <span>Debit</span>

              <h2>{totalDebit}</h2>

            </div>

          </div>

          <div className="transaction-card transfer">

            <FaExchangeAlt />

            <div>

              <span>Transfer</span>

              <h2>{totalTransfer}</h2>

            </div>

          </div>

        </div>

        <div className="transaction-table">

          <table>

            <thead>

              <tr>

                <th>User</th>
                <th>Account</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>

              </tr>

            </thead>

            <tbody>
  {filteredTransactions.length === 0 ? (
    <tr>
      <td colSpan="6" className="no-data">
        No Transactions Found
      </td>
    </tr>
  ) : (
    filteredTransactions.map((transaction) => (
      <tr key={transaction.transactionId}>
        <td>
          <div className="user-info">
            <h4>{transaction.fullName}</h4>
            <span>{transaction.email}</span>
          </div>
        </td>

        <td>{transaction.accountNumber}</td>

        <td>
          <span
            className={`transaction-type ${transaction.type.toLowerCase()}`}
          >
            {transaction.type}
          </span>
        </td>

        <td>
          ₹{Number(transaction.amount).toLocaleString()}
        </td>

        <td>
          {new Date(transaction.createdAt).toLocaleDateString()}
        </td>

        <td>
          <span
            className={`transaction-status ${transaction.status.toLowerCase()}`}
          >
            {transaction.status}
          </span>
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

export default AdminTransactions;