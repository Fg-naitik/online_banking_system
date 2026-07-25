const {
  registerUser,
  loginUser,
  getCurrentUser: getCurrentUserService,
} = require("../services/auth.service");

const register = async (req, res, next) => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await loginUser(email, password);

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};



const getCurrentUser = async (req, res, next) => {
  try {
    const user = await getCurrentUserService(req.user.userId);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};

module.exports = {
  register,
  login,
  getCurrentUser,
  logout,
};