const { pool } = require("../config/db");

const getProfile = async (userId) => {
  const [rows] = await pool.execute(
    `SELECT
      u.user_id,
      u.first_name,
      u.last_name,
      u.email,
      u.phone,

      p.date_of_birth,
      p.gender,
      p.address,
      p.city,
      p.state,
      p.pincode,
      p.country,
      p.profile_image

    FROM users u
    LEFT JOIN user_profiles p
    ON u.user_id = p.user_id

    WHERE u.user_id = ?`,
    [userId]
  );

  return rows[0];
};
const saveProfile = async (userId, profileData) => {
  const {
    date_of_birth,
    gender,
    address,
    city,
    state,
    pincode,
    country,
  } = profileData;

  const [existing] = await pool.execute(
    `SELECT profile_id
     FROM user_profiles
     WHERE user_id = ?`,
    [userId]
  );

  if (existing.length > 0) {
    await pool.execute(
      `UPDATE user_profiles
       SET
         date_of_birth = ?,
         gender = ?,
         address = ?,
         city = ?,
         state = ?,
         pincode = ?,
         country = ?
       WHERE user_id = ?`,
      [
        date_of_birth,
        gender,
        address,
        city,
        state,
        pincode,
        country,
        userId,
      ]
    );
  } else {
    await pool.execute(
      `INSERT INTO user_profiles
      (
        user_id,
        date_of_birth,
        gender,
        address,
        city,
        state,
        pincode,
        country
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        date_of_birth,
        gender,
        address,
        city,
        state,
        pincode,
        country,
      ]
    );
  }
};
module.exports = {
  getProfile,
  saveProfile,
};