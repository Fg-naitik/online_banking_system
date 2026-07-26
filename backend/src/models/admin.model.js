const { pool } = require("../config/db");

const getDashboardStats = async () => {

  // ================= Dashboard Statistics =================

  const [[users]] = await pool.execute(
    "SELECT COUNT(*) AS totalUsers FROM users"
  );

  const [[accounts]] = await pool.execute(
    "SELECT COUNT(*) AS totalAccounts FROM accounts"
  );

  const [[transactions]] = await pool.execute(
    "SELECT COUNT(*) AS totalTransactions FROM transactions"
  );

  const [[loans]] = await pool.execute(
    "SELECT COUNT(*) AS totalLoans FROM loans"
  );

  const [[appliedLoans]] = await pool.execute(
    "SELECT COUNT(*) AS appliedLoans FROM loans WHERE status='Applied'"
  );

  const [[approvedLoans]] = await pool.execute(
    "SELECT COUNT(*) AS approvedLoans FROM loans WHERE status='Approved'"
  );

  const [[activeLoans]] = await pool.execute(
    "SELECT COUNT(*) AS activeLoans FROM loans WHERE status='Active'"
  );

  const [[rejectedLoans]] = await pool.execute(
    "SELECT COUNT(*) AS rejectedLoans FROM loans WHERE status='Rejected'"
  );

  const [[balance]] = await pool.execute(
    "SELECT IFNULL(SUM(balance),0) AS totalBalance FROM accounts"
  );

  // ================= Recent Users =================

  const [recentUsers] = await pool.execute(`
    SELECT
      user_id,
      CONCAT(first_name,' ',last_name) AS fullName,
      email,
      created_at
    FROM users
    ORDER BY created_at DESC
    LIMIT 5
  `);

  // ================= Recent Transactions =================

  const [recentTransactions] = await pool.execute(`
    SELECT
      t.transaction_id,
      CONCAT(u.first_name,' ',u.last_name) AS customerName,
      t.transaction_type,
      t.amount,
      t.transaction_date
    FROM transactions t
    JOIN accounts a
      ON t.account_id = a.account_id
    JOIN users u
      ON a.user_id = u.user_id
    ORDER BY t.transaction_date DESC
    LIMIT 5
  `);

  // ================= Pending Loans =================

  const [pendingLoans] = await pool.execute(`
    SELECT
      l.loan_id,
      CONCAT(u.first_name,' ',u.last_name) AS customerName,
      l.loan_type,
      l.amount,
      l.status
    FROM loans l
    JOIN users u
      ON l.user_id = u.user_id
    WHERE l.status='Applied'
    ORDER BY l.created_at DESC
    LIMIT 5
  `);

  return {

    stats: {
      totalUsers: users.totalUsers,
      totalAccounts: accounts.totalAccounts,
      totalTransactions: transactions.totalTransactions,
      totalLoans: loans.totalLoans,
      appliedLoans: appliedLoans.appliedLoans,
      approvedLoans: approvedLoans.approvedLoans,
      activeLoans: activeLoans.activeLoans,
      rejectedLoans: rejectedLoans.rejectedLoans,
      totalBalance: balance.totalBalance,
    },

    recentUsers,

    recentTransactions,

    pendingLoans,

  };
};
const approveLoan = async (loanId) => {

  await pool.execute(
    "UPDATE loans SET status='Approved' WHERE loan_id=?",
    [loanId]
  );

};

const rejectLoan = async (loanId) => {

  await pool.execute(
    "UPDATE loans SET status='Rejected' WHERE loan_id=?",
    [loanId]
  );

};
const getAllUsers = async () => {

  const [users] = await pool.execute(`
    SELECT
    u.user_id AS userId,
    CONCAT(u.first_name,' ',u.last_name) AS fullName,
    u.email,
    u.phone,
    a.account_number AS accountNumber,
    a.account_type AS accountType,
    a.balance,
    LOWER(a.status) AS status
FROM users u
LEFT JOIN accounts a
ON u.user_id = a.user_id
ORDER BY u.created_at DESC;
  `);

  return users;
};
  const getAllLoans = async () => {

  const [loans] = await pool.execute(`
    SELECT
      l.loan_id AS loanId,
      CONCAT(u.first_name,' ',u.last_name) AS fullName,
      u.email,
      l.loan_type AS loanType,
      l.amount AS loanAmount,
      l.tenure_months AS duration,
      l.status
    FROM loans l
    JOIN users u
      ON l.user_id = u.user_id
    ORDER BY l.created_at DESC
  `);

  return loans;

};
module.exports = {
  getDashboardStats,
  approveLoan,
  rejectLoan,
  getAllUsers,
  getAllLoans,
};