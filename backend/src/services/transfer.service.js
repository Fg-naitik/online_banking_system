const {
  getAccountByUserId,
  getAccountByNumber,
  executeTransfer,
  verifyTransactionPin,
  setTransactionPin,
  updateTransactionPin,
  getTransactionPinStatus,
} = require("../models/transfer.model");


const transferMoney = async (userId, transferData) => {
  const {
    accountNumber,
    amount,
    pin,
  } = transferData;

  const sender = await getAccountByUserId(userId);

  if (!sender) {
    throw new Error("Sender account not found");
  }

  const receiver = await getAccountByNumber(accountNumber);

  if (!receiver) {
    throw new Error("Receiver account not found");
  }

  if (sender.account_id === receiver.account_id) {
    throw new Error("You cannot transfer money to your own account");
  }

  if (Number(sender.balance) < Number(amount)) {
    throw new Error("Insufficient balance");
  }

  await verifyTransactionPin(userId, pin);

  await executeTransfer(
    sender,
    receiver,
    Number(amount)
  );

  return {
    success: true,
    message: "Money transferred successfully",
  };
};



const saveTransactionPin = async (userId, pin) => {
  if (!pin) {
    throw new Error("Transaction PIN is required");
  }

  if (!/^\d{4}$/.test(pin)) {
    throw new Error("PIN must be exactly 4 digits");
  }

  await setTransactionPin(userId, pin);

  return {
    success: true,
    message: "Transaction PIN set successfully",
  };
};
const changePin = async (
    userId,
    currentPin,
    newPin
) => {

    if (newPin.length !== 4)
        throw new Error("PIN must be 4 digits.");

    await verifyTransactionPin(userId, currentPin);

await updateTransactionPin(userId, newPin);

return {
  success: true,
  message: "Transaction PIN updated successfully",
};

    await updateTransactionPin(
        userId,
        newPin
    );

    return "Transaction PIN updated successfully.";
};
const getPinStatus = async (userId) => {
  const hasPin = await getTransactionPinStatus(userId);

  return {
    hasPin,
  };
};

module.exports = {
  transferMoney,
  saveTransactionPin,
  changePin,
  getPinStatus,
};