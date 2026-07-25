const {
  getUserNotifications,
  addNotification,
} = require("../services/notification.service");

const getNotifications = async (req, res, next) => {
  try {
    const result = await getUserNotifications(req.user.userId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const createNotification = async (req, res, next) => {
  try {
    const { title, message } = req.body;

    const result = await addNotification(
      req.user.userId,
      title,
      message
    );

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotifications,
  createNotification,
};