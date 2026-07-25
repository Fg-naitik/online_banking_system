const {
  createLoan,
  getLoanHistory,
  getLoanDetails,
} = require("../services/loan.service");

const applyLoan = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const {
      account_id,
      loan_type,
      amount,
      interest_rate,
      tenure_months,
      emi_amount,
    } = req.body;

    const pan = req.files?.pan?.[0]?.filename || null;
    const aadhaar = req.files?.aadhaar?.[0]?.filename || null;

    const result = await createLoan(userId, {
      account_id,
      loan_type,
      amount,
      interest_rate,
      tenure_months,
      emi_amount,
      pan,
      aadhaar,
    });

    res.status(201).json(result);

  } catch (error) {
    next(error);
  }
};

const getLoans = async (req, res, next) => {
  try {
    const result = await getLoanHistory(req.user.userId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
const getLoanById = async (req, res, next) => {
  try {
    const loanId = req.params.id;

    const result = await getLoanDetails(
      req.user.userId,
      loanId
    );

    res.status(200).json(result);

  } catch (error) {
    next(error);
  }
};

module.exports = {
  applyLoan,
  getLoans,
  getLoanById,
};