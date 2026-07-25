const path = require("path");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const healthRoutes = require("./routes/health.routes");
const authRoutes = require("./routes/auth.routes");
const notFoundMiddleware = require("./middlewares/notFound.middleware");
const errorMiddleware = require("./middlewares/error.middleware");
const app = express();
const dashboardRoutes = require("./routes/dashboard.routes");
const profileRoutes = require("./routes/profile.routes");
const transferRoutes = require("./routes/transfer.routes");
const transactionRoutes = require("./routes/transaction.routes");
const beneficiaryRoutes = require("./routes/beneficiary.routes");
const loanRoutes = require("./routes/loan.routes");
const notificationRoutes = require("./routes/notification.routes");
const cardRoutes = require("./routes/card.routes");
const aiChatRoutes = require("./routes/ai_chat.routes");
const analyticsRoutes = require("./routes/analytics.routes");
const adminRoutes = require("./routes/admin.routes");

/* ===========================
   Global Middlewares
=========================== */

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

/* ===========================
   Routes
=========================== */

app.use("/api/health", healthRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/transfer", transferRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/beneficiaries", beneficiaryRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/cards", cardRoutes);
app.use("/api/ai-chat", aiChatRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/admin", adminRoutes);

/* ===========================
   404 Handler
=========================== */

app.use(notFoundMiddleware);
app.use(
  "/uploads",
  express.static(
    path.join(process.cwd(), "uploads")
  )
);

/* ===========================
   Global Error Handler
=========================== */

app.use(errorMiddleware);

module.exports = app;