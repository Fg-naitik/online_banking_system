const express = require("express");
const router = express.Router();

const authenticateUser = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

const {
  applyLoan,
  getLoans,
  getLoanById,
} = require("../controllers/loan.controller");

router.post(
  "/",
  authenticateUser,
  upload.fields([
    { name: "pan", maxCount: 1 },
    { name: "aadhaar", maxCount: 1 },
  ]),
  applyLoan
);

router.get("/", authenticateUser, getLoans);
router.get("/:id", authenticateUser, getLoanById);

module.exports = router;