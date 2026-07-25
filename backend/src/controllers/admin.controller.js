const {
  fetchDashboardStats,
} = require("../services/admin.service");

const getDashboard = async (req, res, next) => {
  try {
    const stats = await fetchDashboardStats();

    res.status(200).json({
      success: true,
      stats,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboard,
};