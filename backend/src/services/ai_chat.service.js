const {
  saveChat,
  getChatHistory,
} = require("../models/ai_chat.model");

const sendMessage = async (userId, message) => {
  // Temporary AI response
  const response = `AI Response: ${message}`;

  const chatId = await saveChat(
    userId,
    message,
    response
  );

  return {
    success: true,
    chatId,
    message,
    response,
  };
};

const getHistory = async (userId) => {
  const chats = await getChatHistory(userId);

  return {
    success: true,
    chats,
  };
};

module.exports = {
  sendMessage,
  getHistory,
};