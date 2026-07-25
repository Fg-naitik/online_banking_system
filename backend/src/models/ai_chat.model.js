const { pool } = require("../config/db");

const saveChat = async (userId, message, response) => {
  const [result] = await pool.execute(
    `INSERT INTO ai_chat
    (
      user_id,
      message,
      response
    )
    VALUES (?, ?, ?)`,
    [userId, message, response]
  );

  return result.insertId;
};

const getChatHistory = async (userId) => {
  const [rows] = await pool.execute(
    `SELECT
      chat_id,
      message,
      response,
      created_at
    FROM ai_chat
    WHERE user_id = ?
    ORDER BY created_at DESC`,
    [userId]
  );

  return rows;
};

module.exports = {
  saveChat,
  getChatHistory,
};