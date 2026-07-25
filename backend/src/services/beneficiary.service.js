const {
  getBeneficiaries,
  addBeneficiary,
} = require("../models/beneficiary.model");

const getAllBeneficiaries = async (userId) => {
  return {
    success: true,
    beneficiaries: await getBeneficiaries(userId),
  };
};

const createBeneficiary = async (userId, beneficiaryData) => {
  const id = await addBeneficiary(userId, beneficiaryData);

  return {
    success: true,
    message: "Beneficiary added successfully",
    beneficiaryId: id,
  };
};

module.exports = {
  getAllBeneficiaries,
  createBeneficiary,
};