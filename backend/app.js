const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();
const compression = require("compression");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

const errorHandler = require("./src/middleware/errorMiddleware");
const vehicleRoutes = require("./src/routes/vehicleRoutes");
const driverRoutes = require("./src/routes/driverRoutes");
const authRoutes = require("./src/routes/authRoutes");
const dashboardRoutes = require("./src/routes/dashboardRoutes");
const tripRoutes = require("./src/routes/tripRoutes");
const profileRoutes = require("./src/routes/profileRoutes");
const alertRoutes = require("./src/routes/alertRoutes");
const reportRoutes = require("./src/routes/reportRoutes");
const locationRoutes = require("./src/routes/locationRoutes");

// Security Middleware
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());
app.use(cookieParser());

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

// Body Parser / Rate Limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        message: "Too many requests. Please try again later."
    }
});

app.use(limiter);

app.use(express.json());

app.use("/api/vehicles", vehicleRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/location", locationRoutes);

app.use(errorHandler);

app.use((req, res, next) => {
    const error = new Error(`Route Not Found - ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
});

// Home Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "FleetDash Backend API Running 🚀"
    });
});

module.exports = app;