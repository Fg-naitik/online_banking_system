const express = require("express");
const router = express.Router();

const authenticateUser = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");

const {
  getDashboard,
} = require("../controllers/admin.controller");

router.get(
  "/dashboard",
  authenticateUser,
  adminMiddleware,
  getDashboard
);

module.exports = router;