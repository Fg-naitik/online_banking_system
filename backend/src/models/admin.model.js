const { pool } = require("../config/db");

const getDashboardStats = async () => {
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
    "SELECT COUNT(*) AS appliedLoans FROM loans WHERE status = 'Applied'"
  );

  const [[approvedLoans]] = await pool.execute(
    "SELECT COUNT(*) AS approvedLoans FROM loans WHERE status = 'Approved'"
  );

  const [[activeLoans]] = await pool.execute(
    "SELECT COUNT(*) AS activeLoans FROM loans WHERE status = 'Active'"
  );

  const [[rejectedLoans]] = await pool.execute(
    "SELECT COUNT(*) AS rejectedLoans FROM loans WHERE status = 'Rejected'"
  );

  const [[balance]] = await pool.execute(
    "SELECT IFNULL(SUM(balance), 0) AS totalBalance FROM accounts"
  );

  return {
    totalUsers: users.totalUsers,
    totalAccounts: accounts.totalAccounts,
    totalTransactions: transactions.totalTransactions,
    totalLoans: loans.totalLoans,
    appliedLoans: appliedLoans.appliedLoans,
    approvedLoans: approvedLoans.approvedLoans,
    activeLoans: activeLoans.activeLoans,
    rejectedLoans: rejectedLoans.rejectedLoans,
    totalBalance: balance.totalBalance,
  };
};

module.exports = {
  getDashboardStats,
};