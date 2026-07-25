const {
  getAllBeneficiaries,
  createBeneficiary,
} = require("../services/beneficiary.service");

const getBeneficiaryList = async (req, res, next) => {
  try {
    const result = await getAllBeneficiaries(req.user.userId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const addBeneficiary = async (req, res, next) => {
  try {
    const result = await createBeneficiary(
      req.user.userId,
      req.body
    );

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBeneficiaryList,
  addBeneficiary,
};