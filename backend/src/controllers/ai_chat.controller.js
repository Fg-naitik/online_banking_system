const {
  sendMessage,
  getHistory,
} = require("../services/ai_chat.service");

const sendChat = async (req, res, next) => {
  try {
    const { message } = req.body;

    const result = await sendMessage(
      req.user.userId,
      message
    );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getChats = async (req, res, next) => {
  try {
    const result = await getHistory(req.user.userId);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendChat,
  getChats,
};