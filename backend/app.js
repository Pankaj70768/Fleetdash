const express = require("express");
const app = express();
const vehicleRoutes = require("./src/routes/vehicleRoutes");
const driverRoutes = require("./src/routes/driverRoutes");
const authRoutes = require("./src/routes/authRoutes");
const dashboardRoutes = require("./src/routes/dashboardRoutes");
// Middleware
app.use(express.json());
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
// Home Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "FleetDash Backend API Running 🚀"
    });
});

module.exports = app;