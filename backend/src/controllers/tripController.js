const Trip = require("../models/tripModel");
const Driver = require("../models/driverModel");
const Vehicle = require("../models/vehicleModel");
// Create Trip
const createTrip = async (req, res) => {

    try {

        const driver = await Driver.findById(req.body.driver);

if (!driver) {

    return res.status(404).json({

        success: false,

        message: "Driver not found"

    });

}

if (driver.status !== "Available") {

    return res.status(400).json({

        success: false,

        message: "Driver is not available"

    });

}

const vehicle = await Vehicle.findById(req.body.vehicle);

if (!vehicle) {

    return res.status(404).json({

        success: false,

        message: "Vehicle not found"

    });

}

if (vehicle.status !== "Active") {

    return res.status(400).json({

        success: false,

        message: "Vehicle is not available"

    });

}

const trip = await Trip.create(req.body);
driver.status = "On Trip";
await driver.save();

vehicle.status = "On Trip";
await vehicle.save();

        res.status(201).json({

            success: true,

            data: trip

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
// Get All Trips

const getAllTrips = async (req, res) => {

    try {

        const trips = await Trip.find()
            .populate("vehicle")
            .populate("driver");

        res.status(200).json({

            success: true,

            count: trips.length,

            data: trips

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
// Get Trip By ID

const getTripById = async (req, res) => {

    try {

        const trip = await Trip.findById(req.params.id)
            .populate("vehicle")
            .populate("driver");

        if (!trip) {

            return res.status(404).json({

                success: false,

                message: "Trip not found"

            });

        }

        res.status(200).json({

            success: true,

            data: trip

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
// Update Trip

const updateTrip = async (req, res) => {

    try {

        const trip = await Trip.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new: true,

                runValidators: true

            }

        )
        .populate("vehicle")
        .populate("driver");

        if (!trip) {

            return res.status(404).json({

                success: false,

                message: "Trip not found"

            });

        }

        res.status(200).json({

            success: true,

            data: trip

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
// Delete Trip

const deleteTrip = async (req, res) => {

    try {

        const trip = await Trip.findByIdAndDelete(req.params.id);

        if (!trip) {

            return res.status(404).json({

                success: false,

                message: "Trip not found"

            });

        }

        res.status(200).json({

            success: true,

            message: "Trip deleted successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
module.exports = {

    createTrip,

    getAllTrips,

    getTripById,

    updateTrip,

    deleteTrip

};