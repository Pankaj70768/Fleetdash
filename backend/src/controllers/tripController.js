const Trip = require("../models/tripModel");

// Create Trip
const createTrip = async (req, res) => {

    try {

        const trip = await Trip.create(req.body);

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