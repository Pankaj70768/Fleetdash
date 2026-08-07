const express = require("express");
const router = express.Router();

const {
    createDriver,
    getAllDrivers,
    getDriverById,
    updateDriver,
    deleteDriver
} = require("../controllers/driverController");
const { protect } = require("../middleware/authMiddleware");
router.post("/", protect, createDriver);

router.get("/", protect, getAllDrivers);

router.get("/:id", protect, getDriverById);

router.put("/:id", protect, updateDriver);

router.delete("/:id", protect, deleteDriver);
module.exports = router;