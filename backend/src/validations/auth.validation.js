const { body } = require("express-validator");

const registerValidation = [
  body("firstName").notEmpty(),
  body("lastName").notEmpty(),
  body("email").isEmail(),
  body("phone").notEmpty(),
  body("password").isLength({ min: 8 }),
];

const loginValidation = [
  body("email").isEmail(),
  body("password").notEmpty(),
];

module.exports = {
  registerValidation,
  loginValidation,
};