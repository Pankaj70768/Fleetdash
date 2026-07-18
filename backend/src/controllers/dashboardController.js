const Vehicle = require("../models/vehicleModel");
const Driver = require("../models/driverModel");

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

        res.status(200).json({

            success: true,

            dashboard: {

                totalVehicles,

                activeVehicles,

                maintenanceVehicles,

                totalDrivers,

                availableDrivers,

                driversOnTrip

            }

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

    getDashboardData

};