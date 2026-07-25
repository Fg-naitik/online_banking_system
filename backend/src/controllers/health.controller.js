const healthCheck = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Apna Bank AI Backend is running successfully 🚀",
    timestamp: new Date().toISOString(),
  });
};

module.exports = {
  healthCheck,
};