const {
  fetchDashboardStats,
  approveLoanService,
  rejectLoanService,
  fetchAllUsers,
  fetchAllLoans,
} = require("../services/admin.service");
const getDashboard = async (req, res, next) => {
  try {

    const dashboardData = await fetchDashboardStats();

    res.status(200).json({
      success: true,

      stats: dashboardData.stats,

      recentUsers: dashboardData.recentUsers,

      recentTransactions: dashboardData.recentTransactions,

      pendingLoans: dashboardData.pendingLoans,

    });

  } catch (error) {
    next(error);
  }
};
const approveLoan = async (req, res, next) => {

  try {

    await approveLoanService(req.params.id);

    res.json({
      success: true,
      message: "Loan Approved Successfully",
    });

  } catch (error) {

    next(error);

  }

};

const rejectLoan = async (req, res, next) => {

  try {

    await rejectLoanService(req.params.id);

    res.json({
      success: true,
      message: "Loan Rejected Successfully",
    });

  } catch (error) {

    next(error);

  }

};

const getAllUsers = async (req, res, next) => {

  try {

    const users = await fetchAllUsers();

    res.status(200).json({
      success: true,
      users,
    });

  } catch (error) {

    next(error);

  }

};



const getAllLoans = async (req, res) => {
  try {
    const loans = await fetchAllLoans();

    res.status(200).json({
      success: true,
      loans,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch loans",
    });
  }
};

module.exports = {
  getDashboard,
  approveLoan,
  rejectLoan,
  getAllUsers,
  getAllLoans,
};