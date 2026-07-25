const {
  getCards,
} = require("../services/card.service");

const getAllCards = async (req, res, next) => {
  try {
    const cards = await getCards(req.user.userId);

    res.status(200).json({
      success: true,
      cards,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCards,
};