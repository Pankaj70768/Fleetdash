/**
 * Demo data seeder for FleetDash.
 *
 * Clears and repopulates: Users, Vehicles, Drivers, Trips, Alerts,
 * Reports, and initial Locations, so the app looks alive for a review
 * instead of showing empty tables.
 *
 * WARNING: This deletes existing data in these collections. Only run
 * it against a dev/demo database.
 *
 * Usage:
 *   cd backend
 *   node seed.js
 */

require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./src/models/userModel");
const Vehicle = require("./src/models/vehicleModel");
const Driver = require("./src/models/driverModel");
const Trip = require("./src/models/tripModel");
const Alert = require("./src/models/alertModel");
const Report = require("./src/models/reportModel");
const Location = require("./src/models/locationModel");

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        await Promise.all([
            User.deleteMany({}),
            Vehicle.deleteMany({}),
            Driver.deleteMany({}),
            Trip.deleteMany({}),
            Alert.deleteMany({}),
            Report.deleteMany({}),
            Location.deleteMany({}),
        ]);
        console.log("Cleared existing data");

        // --- Admin user for login during the demo ---
        const hashedPassword = await bcrypt.hash("Demo@1234", 10);
        await User.create({
            name: "Admin User",
            email: "admin@fleetdash.com",
            password: hashedPassword,
            role: "Admin",
        });
        console.log("Login -> admin@fleetdash.com / Demo@1234");

        // --- Drivers ---
        const drivers = await Driver.insertMany([
            { driverName: "Rahul Sharma", phoneNumber: "9876543210", licenseNumber: "KA0123456789", experience: 5, status: "Available" },
            { driverName: "Priya Nair", phoneNumber: "9876543211", licenseNumber: "KA0123456790", experience: 3, status: "Available" },
            { driverName: "John Mathew", phoneNumber: "9876543212", licenseNumber: "KA0123456791", experience: 8, status: "On Trip" },
            { driverName: "Fatima Khan", phoneNumber: "9876543213", licenseNumber: "KA0123456792", experience: 2, status: "Leave" },
        ]);

        // --- Vehicles ---
        const vehicles = await Vehicle.insertMany([
            { vehicleNumber: "KA05AB1234", driverName: "Rahul Sharma", vehicleType: "Truck", fuelType: "Diesel", capacity: 8000, status: "Active" },
            { vehicleNumber: "KA05CD5678", driverName: "Priya Nair", vehicleType: "Van", fuelType: "Petrol", capacity: 1500, status: "Active" },
            { vehicleNumber: "KA05EF9012", driverName: "John Mathew", vehicleType: "Truck", fuelType: "Diesel", capacity: 10000, status: "On Trip" },
            { vehicleNumber: "KA05GH3456", driverName: "Fatima Khan", vehicleType: "Car", fuelType: "Electric", capacity: 500, status: "Maintenance" },
        ]);

        // --- Trips (one active, one completed) ---
        await Trip.insertMany([
            {
                vehicle: vehicles[2]._id,
                driver: drivers[2]._id,
                source: "Bangalore",
                destination: "Chennai",
                tripDate: new Date(),
                status: "In Progress",
            },
            {
                vehicle: vehicles[0]._id,
                driver: drivers[0]._id,
                source: "Mysore",
                destination: "Bangalore",
                tripDate: new Date(Date.now() - 86400000),
                status: "Completed",
            },
        ]);

        // --- Alerts ---
        await Alert.insertMany([
            { title: "Speed Limit Exceeded", message: "KA05EF9012 crossed 100 km/h on NH44.", type: "Warning" },
            { title: "Maintenance Due", message: "KA05GH3456 is due for scheduled maintenance.", type: "Critical" },
            { title: "Trip Started", message: "Trip from Bangalore to Chennai has started.", type: "Info" },
        ]);

        // --- Reports ---
        await Report.insertMany([
            { reportName: "Weekly Trip Summary", reportType: "Trip", description: "Summary of trips completed this week." },
            { reportName: "Vehicle Utilization", reportType: "Vehicle", description: "Fleet utilization across all active vehicles." },
        ]);

        // --- Initial locations so Live Map isn't empty on first load ---
        // (roughly Bangalore area coordinates)
        await Location.insertMany([
            { vehicle: vehicles[0]._id, latitude: 12.9716, longitude: 77.5946, speed: 42 },
            { vehicle: vehicles[1]._id, latitude: 12.2958, longitude: 76.6394, speed: 0 },
            { vehicle: vehicles[2]._id, latitude: 13.0827, longitude: 80.2707, speed: 68 },
        ]);

        console.log("Seed complete.");
        console.log(`  ${drivers.length} drivers, ${vehicles.length} vehicles, 2 trips, 3 alerts, 2 reports, 3 locations`);

        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
};

run();
