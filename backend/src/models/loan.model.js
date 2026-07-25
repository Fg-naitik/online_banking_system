const { pool } = require("../config/db");

const applyLoan = async (userId, loanData) => {
  const {
  account_id,
  loan_type,
  amount,
  interest_rate,
  tenure_months,
  emi_amount,
  pan,
  aadhaar,
} = loanData;

  const [result] = await pool.execute(
    `INSERT INTO loans (
    user_id,
    account_id,
    loan_type,
    amount,
    interest_rate,
    tenure_months,
    emi_amount,
    pan_document,
    aadhaar_document
)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
    userId,
    account_id,
    loan_type,
    amount,
    interest_rate,
    tenure_months,
    emi_amount,
    pan,
    aadhaar
]
  );

  return result.insertId;
};

const getLoans = async (userId) => {
  const [rows] = await pool.execute(
    `SELECT *
     FROM loans
     WHERE user_id = ?
     ORDER BY created_at DESC`,
    [userId]
  );

  return rows;
};
const getLoanById = async (userId, loanId) => {
  const [rows] = await pool.execute(
    `
    SELECT
      l.*,
      a.account_number
    FROM loans l
    LEFT JOIN accounts a
      ON l.account_id = a.id
    WHERE l.user_id = ?
      AND l.loan_id = ?
    LIMIT 1
    `,
    [userId, loanId]
  );

  return rows[0];
};

module.exports = {
  applyLoan,
  getLoans,
  getLoanById,
};