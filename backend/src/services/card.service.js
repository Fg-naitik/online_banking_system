const { getCardsByUserId } = require("../models/card.model");

const getCards = async (userId) => {
  const cards = await getCardsByUserId(userId);

  return cards;
};

module.exports = {
  getCards,
};