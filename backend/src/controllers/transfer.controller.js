const {
  transferMoney,
  saveTransactionPin,
  changePin,
  getPinStatus,
} = require("../services/transfer.service");

const transfer = async (req, res, next) => {
  try {
    const result = await transferMoney(
      req.user.userId,
      req.body
    );

    res.status(200).json(result);

  } catch (error) {
    next(error);
  }
};

const setTransactionPin = async (req, res, next) => {
  try {
    const result = await saveTransactionPin(
      req.user.userId,
      req.body.pin
    );

    res.status(200).json(result);

  } catch (error) {
    next(error);
  }
};
const getTransactionPinStatus = async (req, res, next) => {
  try {
    const result = await getPinStatus(req.user.userId);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
const changeTransactionPin = async (req, res, next) => {
    try {
        const { currentPin, newPin } = req.body;

        const userId = req.user.userId;

        const result = await changePin(
            userId,
            currentPin,
            newPin
        );

        res.json({
            success: true,
            message: result,
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
  transfer,
  setTransactionPin,
  changeTransactionPin,
  getTransactionPinStatus,
};