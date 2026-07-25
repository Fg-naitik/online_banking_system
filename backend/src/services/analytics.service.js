const {
  getAnalyticsData,
} = require("../models/analytics.model");

const analytics = async (userId) => {
  return await getAnalyticsData(userId);
};

module.exports = {
  analytics,
};