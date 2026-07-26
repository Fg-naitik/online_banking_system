const {
  getDashboard,
  approveLoan,
  rejectLoan,
  getAllUsers,
  getAllLoans,
} = require("../controllers/admin.controller");
const express = require("express");
const router = express.Router();

const authenticateUser = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");



router.get(
  "/dashboard",
  authenticateUser,
  adminMiddleware,
  getDashboard
);
router.patch(
  "/loans/:id/approve",
  authenticateUser,
  adminMiddleware,
  approveLoan
);

router.patch(
  "/loans/:id/reject",
  authenticateUser,
  adminMiddleware,
  rejectLoan
);

router.get(
  "/users",
  authenticateUser,
  adminMiddleware,
  getAllUsers
);

router.get(
  "/loans",
  authenticateUser,
  adminMiddleware,
  getAllLoans
);

module.exports = router;