const {
  applyLoan,
  getLoans,
  getLoanById,
} = require("../models/loan.model");

const createLoan = async (userId, loanData) => {

  const {
    account_id,
    loan_type,
    amount,
    interest_rate,
    tenure_months,
    emi_amount,
    pan,
    aadhaar,
  } = loanData;

  if (
    !account_id ||
    !loan_type ||
    !amount ||
    !interest_rate ||
    !tenure_months ||
    !emi_amount
  ) {
    throw new Error("Please fill all required fields.");
  }

  // Optional validation
  if (!pan || !aadhaar) {
    throw new Error("Please upload PAN and Aadhaar documents.");
  }

  const loanId = await applyLoan(userId, loanData);

  return {
    success: true,
    message: "Loan applied successfully.",
    loanId,
  };
};

const getLoanHistory = async (userId) => {

  const loans = await getLoans(userId);

  return {
    success: true,
    loans,
  };

};
const getLoanDetails = async (userId, loanId) => {
  const loan = await getLoanById(userId, loanId);

  if (!loan) {
    throw new Error("Loan not found.");
  }

  return {
    success: true,
    loan,
  };
};

module.exports = {
  createLoan,
  getLoanHistory,
  getLoanDetails,
};