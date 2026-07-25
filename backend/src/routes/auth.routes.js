const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getCurrentUser,
  logout,
} = require("../controllers/auth.controller");

const {
  registerValidation,
  loginValidation,
} = require("../validations/auth.validation");

const validateRequest = require("../middlewares/validation.middleware");
const authenticateUser = require("../middlewares/auth.middleware");

router.post(
  "/register",
  registerValidation,
  validateRequest,
  register
);

router.post(
  "/login",
  loginValidation,
  validateRequest,
  login
);

router.get(
  "/me",
  authenticateUser,
  getCurrentUser
);

router.post(
  "/logout",
  authenticateUser,
  logout
);

module.exports = router;