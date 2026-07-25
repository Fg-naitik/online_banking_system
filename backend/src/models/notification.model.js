const { pool } = require("../config/db");

const getNotifications = async (userId) => {
  const [rows] = await pool.execute(
    `SELECT
      notification_id,
      title,
      message,
      is_read,
      created_at
     FROM notifications
     WHERE user_id = ?
     ORDER BY created_at DESC`,
    [userId]
  );

  return rows;
};

const createNotification = async (
  userId,
  title,
  message
) => {
  const [result] = await pool.execute(
    `INSERT INTO notifications
    (
      user_id,
      title,
      message
    )
    VALUES (?, ?, ?)`,
    [userId, title, message]
  );

  return result.insertId;
};

module.exports = {
  getNotifications,
  createNotification,
};