const Location = require("../models/locationModel");
const { getIO } = require("../socket/socket");

// Create Vehicle Location
const createLocation = async (req, res) => {
    try {
        let location = await Location.create(req.body);
        location = await location.populate("vehicle");

        try {
            getIO().emit("locationUpdated", location);
        } catch (socketError) {
            console.error("Socket emit failed:", socketError.message);
        }

        res.status(201).json({
            success: true,
            message: "Vehicle location added successfully",
            data: location
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Vehicle Locations
const getLocations = async (req, res) => {
    try {
        const locations = await Location.find().populate("vehicle");

        res.status(200).json({
            success: true,
            count: locations.length,
            data: locations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createLocation,
    getLocations
};