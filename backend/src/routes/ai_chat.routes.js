const express = require("express");

const router = express.Router();

const authenticateUser = require("../middlewares/auth.middleware");

const {
  sendChat,
  getChats,
} = require("../controllers/ai_chat.controller");

router.post("/", authenticateUser, sendChat);

router.get("/", authenticateUser, getChats);

module.exports = router;