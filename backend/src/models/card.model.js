const { pool } = require("../config/db");

const getCardsByUserId = async (userId) => {
  const [rows] = await pool.execute(
    `
    SELECT
      c.card_id,
      c.card_number,
      c.card_type,
      c.holder_name,
      c.expiry_date,
      c.status
    FROM cards c
    INNER JOIN accounts a
      ON c.account_id = a.account_id
    WHERE a.user_id = ?
    `,
    [userId]
  );

  return rows;
};

module.exports = {
  getCardsByUserId,
};