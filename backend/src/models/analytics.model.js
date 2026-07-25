const { pool } = require("../config/db");

const getAnalyticsData = async (userId) => {
  const [rows] = await pool.execute(
    `
    SELECT
      transaction_type,
      SUM(amount) AS total
    FROM transactions
    WHERE account_id IN (
      SELECT account_id
      FROM accounts
      WHERE user_id = ?
    )
    GROUP BY transaction_type
    `,
    [userId]
  );

  return rows;
};

module.exports = {
  getAnalyticsData,
};