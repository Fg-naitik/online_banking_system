const {
  getDashboardStats,
} = require("../models/admin.model");

const fetchDashboardStats = async () => {
  return await getDashboardStats();
};

module.exports = {
  fetchDashboardStats,
};