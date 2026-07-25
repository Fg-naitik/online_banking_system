const { pool } = require("../config/db");
const bcrypt = require("bcrypt");

const getAccountByUserId = async (userId) => {
  const [rows] = await pool.execute(
    `SELECT *
     FROM accounts
     WHERE user_id = ?`,
    [userId]
  );

  return rows[0];
};
const verifyTransactionPin = async (userId, pin) => {
  const [rows] = await pool.execute(
    `SELECT transaction_pin
     FROM users
     WHERE user_id = ?`,
    [userId]
  );

  if (!rows.length) {
    throw new Error("User not found");
  }

  if (!rows[0].transaction_pin) {
    throw new Error("Transaction PIN not set");
  }

  const isMatch = await bcrypt.compare(
    pin,
    rows[0].transaction_pin
  );

  if (!isMatch) {
    throw new Error("Invalid Transaction PIN");
  }

  return true;
};
const getTransactionPinStatus = async (userId) => {
  const [rows] = await pool.execute(
    `SELECT transaction_pin
     FROM users
     WHERE user_id = ?`,
    [userId]
  );

  if (!rows.length) {
    throw new Error("User not found");
  }

  return !!rows[0].transaction_pin;
};

const setTransactionPin = async (userId, pin) => {
  const hashedPin = await bcrypt.hash(pin, 10);

  await pool.execute(
    `UPDATE users
     SET transaction_pin = ?
     WHERE user_id = ?`,
    [hashedPin, userId]
  );

  return true;
};
const updateTransactionPin = async (userId, newPin) => {
  const hashedPin = await bcrypt.hash(newPin, 10);

  await pool.execute(
    `UPDATE users
     SET transaction_pin = ?
     WHERE user_id = ?`,
    [hashedPin, userId]
  );

  return true;
};

const getAccountByNumber = async (accountNumber) => {
  const [rows] = await pool.execute(
    `SELECT *
     FROM accounts
     WHERE account_number = ?`,
    [accountNumber]
  );

  return rows[0];
};

const executeTransfer = async (
  sender,
  receiver,
  amount
) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // Deduct sender balance
    await connection.execute(
      `UPDATE accounts
       SET balance = balance - ?
       WHERE account_id = ?`,
      [amount, sender.account_id]
    );

    // Add receiver balance
    await connection.execute(
      `UPDATE accounts
       SET balance = balance + ?
       WHERE account_id = ?`,
      [amount, receiver.account_id]
    );

    // Sender transaction
    await connection.execute(
      `INSERT INTO transactions
      (
        account_id,
        transaction_type,
        amount,
        balance_after,
        description,
        reference_id
      )
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        sender.account_id,
        "Transfer",
        amount,
        Number(sender.balance) - Number(amount),
        "Money Sent",
        Date.now().toString(),
      ]
    );

    // Receiver transaction
    await connection.execute(
      `INSERT INTO transactions
      (
        account_id,
        transaction_type,
        amount,
        balance_after,
        description,
        reference_id
      )
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        receiver.account_id,
        "Transfer",
        amount,
        Number(receiver.balance) + Number(amount),
        "Money Received",
        Date.now().toString(),
      ]
    );

    // Transfer history
    await connection.execute(
      `INSERT INTO transfers
      (
        from_account_id,
        to_account_id,
        amount,
        transfer_type,
        status,
        description
      )
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        sender.account_id,
        receiver.account_id,
        amount,
        "Internal",
        "Completed",
        "Bank Transfer",
      ]
    );

    await connection.commit();

    return true;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};


module.exports = {
  getAccountByUserId,
  getAccountByNumber,
  executeTransfer,
  verifyTransactionPin,
  setTransactionPin,
  updateTransactionPin,
  getTransactionPinStatus,
};