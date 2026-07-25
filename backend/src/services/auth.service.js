const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const {
  findUserByEmail,
  createUser,
} = require("../models/auth.model");

const registerUser = async (userData) => {
  const existingUser = await findUserByEmail(userData.email);

  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  userData.password = hashedPassword;

  const userId = await createUser(userData);

  return {
    success: true,
    message: "User registered successfully",
    userId,
  };
};

const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password_);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken({
  userId: user.user_id,
  email: user.email,
  role: user.role,
});

  return {
    success: true,
    message: "Login successful",
    token,
    user: {
  id: user.user_id,
  firstName: user.first_name,
  lastName: user.last_name,
  email: user.email,
  phone: user.phone,
  role: user.role,
},
  };
};


const getCurrentUser = async (userId) => {
  const { pool } = require("../config/db");

  const [rows] = await pool.execute(
    `SELECT
      user_id,
      first_name,
      last_name,
      email,
      phone,
      created_at
    FROM users
    WHERE user_id = ?`,
    [userId]
  );

  return rows[0];
};
module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
};