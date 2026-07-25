const express = require("express");
const router = express.Router();

console.log("1. notification.routes loaded");

const authenticateUser = require("../middlewares/auth.middleware");
console.log("2. middleware loaded");

const controller = require("../controllers/notification.controller");
console.log(controller);

const {
  getNotifications,
  createNotification,
} = controller;

router.get("/", authenticateUser, getNotifications);
router.post("/", authenticateUser, createNotification);

module.exports = router;