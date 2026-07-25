const { pool } = require("../config/db");

const findUserByEmail = async (email) => {
  const [rows] = await pool.execute(
    `SELECT
      user_id,
      first_name,
      last_name,
      email,
      phone,
      password_,
      role
FROM users
    WHERE email = ?`,
    [email]
  );

  return rows[0];
};

const createUser = async (userData) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
  } = userData;

  // Insert User
  const [result] = await pool.execute(
    `INSERT INTO users
      (first_name, last_name, email, phone, password_)
      VALUES (?, ?, ?, ?, ?)`,
    [firstName, lastName, email, phone, password]
  );

  const userId = result.insertId;

  // Generate Account Number
  const accountNumber = "APNA" + Date.now().toString().slice(-10);

  // Create Bank Account
  await pool.execute(
    `INSERT INTO accounts
      (
        user_id,
        account_number,
        account_type,
        balance,
        currency,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?)`,
    [
      userId,
      accountNumber,
      "Savings",
      0,
      "INR",
      "Active",
    ]
  );

  return userId;
};

module.exports = {
  findUserByEmail,
  createUser,
};