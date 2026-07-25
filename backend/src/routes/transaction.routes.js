const express = require("express");
const router = express.Router();

const authenticateUser = require("../middlewares/auth.middleware");

const {
  getTransactions,
} = require("../controllers/transaction.controller");

router.get("/", authenticateUser, getTransactions);

module.exports = router;