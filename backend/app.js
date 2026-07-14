const express = require("express");
const app = express();
const vehicleRoutes = require("./src/routes/vehicleRoutes");
const driverRoutes = require("./src/routes/driverRoutes");
// Middleware
app.use(express.json());
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/drivers", driverRoutes);
// Home Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "FleetDash Backend API Running 🚀"
    });
});

module.exports = app;