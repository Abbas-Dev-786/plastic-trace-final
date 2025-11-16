const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { globalErrorHandler } = require("./controllers/error.controller");
const AppError = require("./utils/AppError");

const authRoutes = require("./routes/auth.route");
const qrRoutes = require("./routes/qr.route");
const analyticsRoutes = require("./routes/analytics.route");

const app = express();

app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/qr", qrRoutes);
app.use("/api/analytics", analyticsRoutes);

app.use("/{*splat}", (req, res, next) => {
  next(new AppError("This route is not defined", 404));
});

app.use(globalErrorHandler);

module.exports = app;
