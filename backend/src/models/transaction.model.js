const { pool } = require("../config/db");

const getTransactions = async (userId) => {
  const [rows] = await pool.execute(
    `SELECT
        t.transaction_id,
        t.transaction_type,
        t.amount,
        t.balance_after,
        t.description,
        t.transaction_date
     FROM transactions t
     INNER JOIN accounts a
     ON t.account_id = a.account_id
     WHERE a.user_id = ?
     ORDER BY t.transaction_date DESC`,
    [userId]
  );

  return rows;
};

module.exports = {
  getTransactions,
};