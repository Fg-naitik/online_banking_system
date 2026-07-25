const {
  getTransactions,
} = require("../models/transaction.model");

const getTransactionHistory = async (userId) => {
  const transactions = await getTransactions(userId);
  

  return {
    success: true,
    transactions,
  };
};

module.exports = {
  getTransactionHistory,
};