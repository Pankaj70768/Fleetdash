const express = require("express");

const {
    createLocation,
    getLocations
} = require("../controllers/locationController");

const router = express.Router();

router.post("/", createLocation);
router.get("/", getLocations);

module.exports = router;