const express = require("express");
const router = express.Router();

const {
    createVehicle,
    getAllVehicles,
    getVehicleById
} = require("../controllers/vehicleController");

router.post("/", createVehicle);

router.get("/", getAllVehicles);

router.get("/:id", getVehicleById);

module.exports = router;