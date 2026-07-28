
const {
  getNotifications,
  createNotification,
} = require("../models/notification.model");

const getUserNotifications = async (userId) => {
  const notifications = await getNotifications(userId);

  return {
    success: true,
    notifications,
  };
};

const addNotification = async (
  userId,
  title,
  message
) => {
  const id = await createNotification(
    userId,
    title,
    message
  );

  return {
    success: true,
    message: "Notification created successfully",
    notificationId: id,
  };
};

module.exports = {
  getUserNotifications,
  addNotification,
};