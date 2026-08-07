const Vehicle = require("../models/vehicleModel");
const Driver = require("../models/driverModel");
const Trip = require("../models/tripModel");

const getDashboardData = async (req, res) => {

    try {

        const totalVehicles = await Vehicle.countDocuments();

        const activeVehicles = await Vehicle.countDocuments({
            status: "Active"
        });

        const maintenanceVehicles = await Vehicle.countDocuments({
            status: "Maintenance"
        });

        const totalDrivers = await Driver.countDocuments();

        const availableDrivers = await Driver.countDocuments({
            status: "Available"
        });

        const driversOnTrip = await Driver.countDocuments({
            status: "On Trip"
        });

        const totalTrips = await Trip.countDocuments();

const activeTrips = await Trip.countDocuments({
    status: "In Progress"
});

const completedTrips = await Trip.countDocuments({
    status: "Completed"
});

        res.status(200).json({

            success: true,

            dashboard: {

                totalVehicles,

                activeVehicles,

                maintenanceVehicles,

                totalDrivers,

                availableDrivers,

                driversOnTrip,
                totalTrips,
activeTrips,
completedTrips

            }

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: "Failed to fetch dashboard data.",

            error: error.message


        });

    }

};

module.exports = {

    getDashboardData

};