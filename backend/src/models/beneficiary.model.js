const { pool } = require("../config/db");

const getBeneficiaries = async (userId) => {
  const [rows] = await pool.execute(
    `SELECT
        beneficiary_id,
        account_holder_name,
        account_number,
        bank_name,
        ifsc_code,
        account_type,
        nickname
     FROM beneficiaries
     WHERE user_id = ?
     ORDER BY beneficiary_id DESC`,
    [userId]
  );

  return rows;
};

const addBeneficiary = async (userId, beneficiaryData) => {
  const {
    account_holder_name,
    account_number,
    bank_name,
    ifsc_code,
    account_type,
    nickname,
  } = beneficiaryData;

  const [result] = await pool.execute(
    `INSERT INTO beneficiaries
    (
      user_id,
      account_holder_name,
      account_number,
      bank_name,
      ifsc_code,
      account_type,
      nickname
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      userId,
      account_holder_name,
      account_number,
      bank_name,
      ifsc_code,
      account_type,
      nickname,
    ]
  );

  return result.insertId;
};

module.exports = {
  getBeneficiaries,
  addBeneficiary,
};