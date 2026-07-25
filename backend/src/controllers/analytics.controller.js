const {
  analytics,
} = require("../services/analytics.service");

const getAnalytics = async (req, res, next) => {
  try {
    const data = await analytics(req.user.userId);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAnalytics,
};