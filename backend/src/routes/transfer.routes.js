const express = require("express");
const router = express.Router();

const authenticateUser = require("../middlewares/auth.middleware");

const {
  transfer,
  setTransactionPin,
  changeTransactionPin,
  getTransactionPinStatus,
} = require("../controllers/transfer.controller");
router.post("/", authenticateUser, transfer);

router.post(
  "/set-pin",
  authenticateUser,
  setTransactionPin
);
router.put(
    "/change-pin",
    authenticateUser,
    changeTransactionPin
);
router.get(
  "/pin-status",
  authenticateUser,
  getTransactionPinStatus
);
module.exports = router;