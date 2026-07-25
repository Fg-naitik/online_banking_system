const { dashboard } = require("../services/dashboard.service");

const getDashboard = async (req, res, next) => {
  try {
    const data = await dashboard(req.user.userId);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboard,
};