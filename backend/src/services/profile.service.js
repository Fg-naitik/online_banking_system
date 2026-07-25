const {
  getProfile,
  saveProfile,
} = require("../models/profile.model");

const getUserProfile = async (userId) => {
  return await getProfile(userId);
};

const updateUserProfile = async (userId, profileData) => {
  await saveProfile(userId, profileData);

  return {
    success: true,
    message: "Profile updated successfully",
  };
};

module.exports = {
  getUserProfile,
  updateUserProfile,
};