const { pool } = require("../config/db");

const getDashboardData = async (userId) => {

  // User Information
  const [users] = await pool.execute(
    `SELECT
      first_name,
      last_name,
      email
     FROM users
     WHERE user_id = ?`,
    [userId]
  );

  // Account Information
  const [accounts] = await pool.execute(
    `SELECT
      account_number,
      account_type,
      balance,
      currency,
      status
     FROM accounts
     WHERE user_id = ?`,
    [userId]
  );

  // Recent Transactions
  const [transactions] = await pool.execute(
    `SELECT
      transaction_type,
      amount,
      description,
      transaction_date
     FROM transactions
     WHERE account_id IN (
       SELECT account_id
       FROM accounts
       WHERE user_id = ?
     )
     ORDER BY transaction_date DESC
     LIMIT 5`,
    [userId]
  );

  // Notifications Count
  const [notifications] = await pool.execute(
    `SELECT
      COUNT(*) AS totalNotifications
     FROM notifications
     WHERE user_id = ?
     AND is_read = FALSE`,
    [userId]
  );
  const [income] = await pool.execute(
  `SELECT COALESCE(SUM(amount), 0) AS monthlyIncome
   FROM transactions
   WHERE account_id IN (
      SELECT account_id
      FROM accounts
      WHERE user_id = ?
   )
   AND description = 'Money Received'`,
  [userId]
);
const [expense] = await pool.execute(
  `SELECT COALESCE(SUM(amount), 0) AS monthlyExpense
   FROM transactions
   WHERE account_id IN (
      SELECT account_id
      FROM accounts
      WHERE user_id = ?
   )
   AND description = 'Money Sent'`,
  [userId]
);
const balance = Number(accounts[0]?.balance || 0);
const monthlyIncome = Number(income[0].monthlyIncome);
const monthlyExpense = Number(expense[0].monthlyExpense);

const savingGoal =
  monthlyIncome > 0
    ? Math.round(((monthlyIncome - monthlyExpense) / monthlyIncome) * 100)
    : 0;
    const activity = transactions.slice(0, 5).map((tx) => ({
  title: tx.description,
  amount: tx.amount,
  type: tx.transaction_type,
  date: tx.transaction_date,
}));
const [loan] = await pool.execute(
  `SELECT
      loan_type,
      amount,
      outstanding_balance,
      emi_amount,
      next_due_date,
      status
   FROM loans
   WHERE user_id = ?
   LIMIT 1`,
  [userId]
);
return {
  user: users[0],
  accounts,
  transactions,
  notifications: notifications[0],

  summary: {
    totalBalance: balance,
    monthlyIncome,
    monthlyExpense,
    savingGoal,
  },

  insights: {
    financialHealth:
      monthlyIncome > 0
        ? Math.min(
            100,
            Math.round(
              ((monthlyIncome - monthlyExpense) /
                monthlyIncome) *
                100
            )
          )
        : 0,

    recommendedSaving: Math.round(
      monthlyIncome * 0.20
    ),

    monthlySpent: monthlyExpense,
  },
  activity,
  loan: loan[0] || null,
};
};
module.exports = {
  getDashboardData,
};