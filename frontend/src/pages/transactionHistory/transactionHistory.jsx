import { useState, useEffect } from "react";
import api from "../../services/api";
import { toast } from "react-hot-toast";
import "./transactionHistory.css";
import '../../styles/global.css';
import Sidebar from "../../components/sidebar/sidebar";

/* ── Icons ── */
const SearchIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="4.5" stroke="#94a3b8" strokeWidth="1.3"/><path d="M9.5 9.5l2.5 2.5" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round"/></svg>;
const CalIcon = () => <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="1" y="2" width="11" height="9.5" rx="1.2" stroke="#475569" strokeWidth="1.1"/><path d="M4 1v2M9 1v2M1 5h11" stroke="#475569" strokeWidth="1.1" strokeLinecap="round"/></svg>;
const ChevDown = () => <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 4l3.5 3.5L9 4" stroke="#475569" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const FilterIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 4h10M4 7h6M6 10h2" stroke="#64748b" strokeWidth="1.3" strokeLinecap="round"/></svg>;
const DownloadIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v8M4 7l3 3 3-3" stroke="#475569" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 12h10" stroke="#475569" strokeWidth="1.3" strokeLinecap="round"/></svg>;
const AIStarIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.4 3.8H12l-3 2.2 1.2 3.8L7 8.6l-3.2 2.2 1.2-3.8L2 4.8h3.6L7 1z" stroke="#fff" strokeWidth="1.1" strokeLinejoin="round" fill="rgba(255,255,255,0.3)"/></svg>;
const ArrowUpIcon = () => <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 8V2M2 5l3-3 3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;



const categories = ['All', 'Food', 'Rent', 'Shopping', 'Entertainment', 'Income', 'Utilities'];

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
const [loading, setLoading] = useState(true);

const [activeCategory, setActiveCategory] = useState("All");
const [activePage, setActivePage] = useState(1);
const [searchTerm, setSearchTerm] = useState("");
const [sortBy, setSortBy] = useState("newest");
const [selectedTransaction, setSelectedTransaction] = useState(null);
const [currentPage, setCurrentPage] = useState(1);
const [dateFilter, setDateFilter] = useState("30");
const transactionsPerPage = 10;

// 👇 fetch function first
const fetchTransactions = async () => {
  try {
    console.log("Fetching...");
    const res = await api.get("/transactions");
    console.log(res.data);
    setTransactions(res.data.transactions);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

// 👇 then useEffect
useEffect(() => {
  fetchTransactions();
}, []);

// 👇 then filtered
const filtered = transactions.filter((tx) => {
  const matchesCategory =
    activeCategory === "All" ||
    tx.transaction_type === activeCategory;

  const matchesSearch =
    tx.transaction_type
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||

    tx.description
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase()) ||

    String(tx.transaction_id)
      .includes(searchTerm);

  return matchesCategory && matchesSearch;
});

const sortedTransactions = [...filtered];

switch (sortBy) {
  case "oldest":
    sortedTransactions.sort(
      (a, b) =>
        new Date(a.transaction_date) -
        new Date(b.transaction_date)
    );
    break;

  case "highest":
    sortedTransactions.sort(
      (a, b) => b.amount - a.amount
    );
    break;

  case "lowest":
    sortedTransactions.sort(
      (a, b) => a.amount - b.amount
    );
    break;

  default:
    sortedTransactions.sort(
      (a, b) =>
        new Date(b.transaction_date) -
        new Date(a.transaction_date)
    );
}
const indexOfLastTransaction = currentPage * transactionsPerPage;
const indexOfFirstTransaction =
  indexOfLastTransaction - transactionsPerPage;

const currentTransactions =
  sortedTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

const totalPages = Math.ceil(
  sortedTransactions.length / transactionsPerPage
);

// 👇 then loading check
if (loading) {
  return (
    <div className="tx-main">
      <h2>Loading Transactions...</h2>
    </div>
  );
}

// 👇 then empty check
if (transactions.length === 0) {
  return (
    <div className="tx-main">
      <div className="tx-empty">

  <div className="tx-empty-icon">
    📄
  </div>

  <h2>No Transactions Yet</h2>

  <p>
    Your recent banking activity will appear here.
  </p>

</div><div className="tx-empty">

  <div className="tx-empty-icon">
    📄
  </div>

  <h2>No Transactions Yet</h2>

  <p>
    Your recent banking activity will appear here.
  </p>

</div>
    </div>
  );
}
const exportCSV = () => {
  const headers = [
    "ID",
    "Type",
    "Amount",
    "Description",
    "Date"
  ];
  const today = new Date();

const dateFilteredTransactions = filteredTransactions.filter((tx) => {

    if(dateFilter==="all") return true;

    const txDate = new Date(tx.transaction_date);

    const diffDays =
      (today - txDate) / (1000*60*60*24);

    return diffDays <= Number(dateFilter);

});

  const rows = sortedTransactions.map((tx) => [
    tx.transaction_id,
    tx.transaction_type,
    tx.amount,
    tx.description,
    tx.transaction_date,
  ]);

  const csv = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csv], {
    type: "text/csv",
  });

  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;
  a.download = "transactions.csv";

  a.click();
};

  return (
    <div className="tx-layout">
      <Sidebar active="transactions" />

      <div className="tx-main">

        {/* TopBar */}
        <div style={{height:'56px',background:'#fff',borderBottom:'1px solid #e2e8f0',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 28px',position:'sticky',top:0,zIndex:40}}>
          <div style={{display:'flex',alignItems:'center',gap:'8px',background:'#f8fafc',border:'1px solid #e2e8f0',borderRadius:'8px',padding:'8px 14px',minWidth:'260px'}}>
            <SearchIcon />
            <input type="text" placeholder="Search transactions or ask AI..." style={{border:'none',background:'none',fontSize:'13px',outline:'none',width:'100%',color:'#0f172a'}}/>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
            <button style={{position:'relative',width:'32px',height:'32px',borderRadius:'8px',background:'none',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:'#64748b'}}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5a4.5 4.5 0 014.5 4.5v2.5l1.5 2H2L3.5 8.5V6A4.5 4.5 0 018 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/><path d="M6.5 12.5a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
              <span style={{position:'absolute',top:'4px',right:'4px',width:'6px',height:'6px',background:'#ef4444',borderRadius:'50%',border:'1.5px solid #fff'}}></span>
            </button>
            <div style={{textAlign:'right'}}>
              <span style={{fontSize:'13px',fontWeight:'600',display:'block'}}>Alex Rivera</span>
              <span style={{fontSize:'11px',color:'#94a3b8',display:'block'}}>Premium Member</span>
            </div>
            <div style={{width:'34px',height:'34px',borderRadius:'50%',background:'#29b6f6',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',fontWeight:'700',color:'#fff',position:'relative',flexShrink:0}}>
              A<span style={{position:'absolute',bottom:'1px',right:'1px',width:'8px',height:'8px',background:'#10b981',borderRadius:'50%',border:'1.5px solid #fff'}}></span>
            </div>
          </div>
        </div>

        <div className="tx-content">

          {/* Page Header */}
          <div className="tx-page-header">
            <div>
              <h1>Transaction History</h1>
              <p>Keep track of your spending and income with AI insights.</p>
            </div>
            <div className="tx-header-actions">
              <button className="btn-export-csv"onClick={exportCSV}>
              Export CSV
              </button>
              
            </div>
          </div>

          {/* Search + Filter Row */}
          <div className="tx-search-bar">
            <div className="tx-search-wrap">
              <SearchIcon />
              <input type="text"placeholder="Search transactions..."value={searchTerm}onChange={(e) => setSearchTerm(e.target.value)}/>
            </div>
            <select
                className="tx-date-filter"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="7">Last 7 Days</option>
                <option value="30">Last 30 Days</option>
                <option value="90">Last 3 Months</option>
                <option value="365">Last 1 Year</option>
                <option value="all">All Time</option>
              </select>
           
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="tx-sort"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Amount</option>
              <option value="lowest">Lowest Amount</option>
            </select>
          </div>

          {/* Category Pills */}
          <div className="tx-categories">
            <span className="tx-cat-label">CATEGORIES:</span>
            {categories.map(cat => (
              <button
                key={cat}
                className={`tx-cat-pill${activeCategory === cat ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Table Card */}
          <div className="tx-table-card">
            <div className="tx-table-head">
              <div className="tx-table-head-left">
                <h3>Recent Records</h3>
                <span className="tx-count-badge">{filtered.length} Transactions</span>
              </div>
              <button className="tx-view-stmts">View Statements</button>
            </div>

            <table className="tx-hist-table">
              <thead>
                <tr>
                  <th>Merchant / Service</th>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {currentTransactions.map((tx) => (
                 <tr key={tx.transaction_id}onClick={() => setSelectedTransaction(tx)}style={{ cursor: "pointer" }}>
                    <td>
                      <div className="tx-merchant">
                        <div className="tx-merchant-icon">
                          {tx.transaction_type === "Deposit" && "💰"}
                          {tx.transaction_type === "Withdrawal" && "💸"}
                          {tx.transaction_type === "Transfer" && "🔄"}
                          {tx.transaction_type === "Payment" && "💳"}
                          {tx.transaction_type === "Interest" && "📈"}
                          {tx.transaction_type === "Fee" && "🏦"}
                        </div>
                        <div>
                          <div className="tx-merchant-name">
                              {tx.transaction_type}
                            </div>

                            <div className="tx-merchant-id">
                              {tx.description || `Transaction #${tx.transaction_id}`}
                            </div>
                          </div>
                      </div>
                    </td>
                    <td><span className="tx-date-cell"><>
                      <div>
                        {new Date(tx.transaction_date).toLocaleDateString("en-IN")}
                      </div>

                      <small style={{ color: "#94a3b8" }}>
                        {new Date(tx.transaction_date).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </small>
                    </></span></td>
                    <td><span className="tx-cat-cell">{tx.transaction_type}</span></td>
                    <td>
                      <span className={`tx-status-cell ${tx.status === 'Completed' ? 'status-completed' : 'status-pending'}`}>
                        Completed
                      </span>
                    </td>
                    <td>
                      <div className={`tx-amount-cell ${tx.transaction_type === "Deposit" ||tx.transaction_type === "Interest"? "tx-amount-positive": "tx-amount-negative"}`}>
                        <span className="arrow-up">{
                              tx.transaction_type === "Deposit"
                                ? "⬆️"
                                : "⬇️"
                            }</span>
                        {tx.transaction_type === "Deposit" ||
                        tx.transaction_type === "Interest"
                          ? `+ ₹${Number(tx.amount).toLocaleString()}`
                          : `- ₹${Number(tx.amount).toLocaleString()}`}
                        <span className="tx-currency-sub">INR</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="tx-pagination">

  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
  >
    Previous
  </button>

  <span>
    Page {currentPage} of {totalPages}
  </span>

  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage(currentPage + 1)}
  >
    Next
  </button>

</div>

            {/* Pagination */}
            <div className="tx-pagination">
              <span className="tx-showing">Showing {filtered.length} of 6 records</span>
              <div className="tx-page-btns">
                <button className="tx-page-btn prev-next disabled">Previous</button>
                <button className={`tx-page-btn${activePage === 1 ? ' active' : ''}`} onClick={() => setActivePage(1)}>1</button>
                <button className={`tx-page-btn${activePage === 2 ? ' active' : ''}`} onClick={() => setActivePage(2)}>2</button>
                <button className="tx-page-btn prev-next">Next</button>
              </div>
            </div>
          </div>
          {selectedTransaction && (
  <div className="tx-modal-overlay">
    <div className="tx-modal">

      <h2>Transaction Details</h2>

      <p><strong>ID:</strong> #{selectedTransaction.transaction_id}</p>

      <p><strong>Type:</strong> {selectedTransaction.transaction_type}</p>

      <p><strong>Amount:</strong> ₹{Number(selectedTransaction.amount).toLocaleString()}</p>

      <p><strong>Description:</strong> {selectedTransaction.description}</p>

      <p><strong>Balance After:</strong> ₹{Number(selectedTransaction.balance_after).toLocaleString()}</p>

      <p>
        <strong>Date:</strong>{" "}
        {new Date(selectedTransaction.transaction_date).toLocaleString()}
      </p>

      <p>
        <strong>Reference:</strong>{" "}
        {selectedTransaction.reference_id || "N/A"}
      </p>

      <button
        className="tx-close-btn"
        onClick={() => setSelectedTransaction(null)}
      >
        Close
      </button>

    </div>
  </div>
)}

          {/* AI Insight Banner */}
          

        </div>

        <div className="tx-footer" style={{marginLeft:0}}>
          <span>© APNA Bank AI. Secure Banking </span>
          <div className="tx-footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact Support</a>
          </div>
        </div>
      </div>
    </div>
    
  );
  
}