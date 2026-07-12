const express = require("express");

const app = express();

// Middleware
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "FleetDash Backend API Running 🚀"
    });
});

module.exports = app;