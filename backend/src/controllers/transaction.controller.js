const {
  getTransactionHistory,
} = require("../services/transaction.service");

const getTransactions = async (req, res, next) => {
  try {
    const result = await getTransactionHistory(
      req.user.userId
    );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTransactions,
};