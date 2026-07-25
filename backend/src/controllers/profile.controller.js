const {
  getUserProfile,
  updateUserProfile,
} = require("../services/profile.service");

const getProfile = async (req, res, next) => {
  try {
    const profile = await getUserProfile(req.user.userId);

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const result = await updateUserProfile(
      req.user.userId,
      req.body
    );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
};