const {
  getDashboardStats,
  approveLoan,
  rejectLoan,
  getAllUsers,
  getAllLoans,
} = require("../models/admin.model");
const fetchDashboardStats = async () => {

  const dashboardData = await getDashboardStats();

  return dashboardData;

};
const approveLoanService = async (loanId) => {

  await approveLoan(loanId);

};

const rejectLoanService = async (loanId) => {

  await rejectLoan(loanId);

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