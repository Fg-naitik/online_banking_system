const express = require("express");
const router = express.Router();

const authenticateUser = require("../middlewares/auth.middleware");

const {
  getBeneficiaryList,
  addBeneficiary,
} = require("../controllers/beneficiary.controller");

router.get("/", authenticateUser, getBeneficiaryList);

router.post("/", authenticateUser, addBeneficiary);

module.exports = router;