const express = require("express");

const router = express.Router();

const authenticateUser = require("../middlewares/auth.middleware");

const {
  getAllCards,
} = require("../controllers/card.controller");

router.get("/", authenticateUser, getAllCards);

module.exports = router;