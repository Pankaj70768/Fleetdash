const express = require("express");
const app = express();
const vehicleRoutes = require("./src/routes/vehicleRoutes");
const driverRoutes = require("./src/routes/driverRoutes");
const authRoutes = require("./src/routes/authRoutes");
const dashboardRoutes = require("./src/routes/dashboardRoutes");
const tripRoutes = require("./src/routes/tripRoutes");
const profileRoutes = require("./src/routes/profileRoutes");
const alertRoutes = require("./src/routes/alertRoutes");
const reportRoutes = require("./src/routes/reportRoutes");
const locationRoutes = require("./src/routes/locationRoutes");
// Middleware
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
// Home Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "FleetDash Backend API Running 🚀"
    });
});

module.exports = app;