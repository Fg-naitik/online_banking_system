const { getDashboardData } = require("../models/dashboard.model");

const dashboard = async (userId) => {
  return await getDashboardData(userId);
};

module.exports = {
  dashboard,
};