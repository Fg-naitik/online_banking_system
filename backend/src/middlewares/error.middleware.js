const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  let statusCode = err.statusCode || 500;

  if (
    err.message === "Invalid Transaction PIN" ||
    err.message === "Transaction PIN not set" ||
    err.message === "Insufficient balance" ||
    err.message === "Receiver account not found" ||
    err.message === "Sender account not found"
  ) {
    statusCode = 400;
  }

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorMiddleware;