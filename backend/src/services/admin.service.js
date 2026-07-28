const { addNotification } = require("./notification.service");
const {
  getDashboardStats,
  approveLoan,
  rejectLoan,
  getLoanById,
  getAllUsers,
  getAllLoans,
} = require("../models/admin.model");
const fetchDashboardStats = async () => {

  const dashboardData = await getDashboardStats();

  return dashboardData;

};
const approveLoanService = async (loanId) => {
  await approveLoan(loanId);

  const loan = await getLoanById(loanId);

  await addNotification(
    loan.userId,
    "Loan Approved",
    `Congratulations! Your ${loan.loanType} loan application has been approved.`
  );

  return {
    success: true,
    message: "Loan approved successfully",
  };
};

const rejectLoanService = async (loanId) => {
  await rejectLoan(loanId);

  const loan = await getLoanById(loanId);

  await addNotification(
    loan.userId,
    "Loan Rejected",
    `Your ${loan.loanType} loan application has been rejected.`
  );

  return {
    success: true,
    message: "Loan rejected successfully",
  };
};

const fetchAllUsers = async () => {

  return await getAllUsers();

};
const fetchAllLoans = async () => {

  return await getAllLoans();

};
module.exports = {
  fetchDashboardStats,
  approveLoanService,
  rejectLoanService,
  fetchAllUsers,
  fetchAllLoans,
};