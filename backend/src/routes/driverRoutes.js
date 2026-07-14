const express = require("express");
const router = express.Router();

const {
    createDriver,
    getAllDrivers,
    getDriverById,
    updateDriver,
    deleteDriver
} = require("../controllers/driverController");
router.post("/", createDriver);
router.get("/", getAllDrivers);
router.get("/:id", getDriverById);
router.put("/:id", updateDriver);
router.delete("/:id", deleteDriver);
module.exports = router;