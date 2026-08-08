/**
 * Live location simulator for FleetDash demo.
 *
 * Run this WHILE the backend server (server.js) is running and the
 * frontend is open on the Live Map page. It repeatedly posts small
 * location changes for each existing vehicle so the map shows
 * vehicles actually moving in real time, instead of sitting static.
 *
 * Requires: run `node seed.js` first so vehicles exist.
 *
 * Usage:
 *   cd backend
 *   node simulate.js
 *
 * Press Ctrl+C to stop.
 */

require("dotenv").config();
const mongoose = require("mongoose");
const Vehicle = require("./src/models/vehicleModel");

const API_BASE = `http://localhost:${process.env.PORT || 5000}/api`;

// Starting points roughly around Bangalore/Mysore/Chennai so markers
// land somewhere sensible on the map.
const startPoints = [
    { latitude: 12.9716, longitude: 77.5946 },
    { latitude: 12.2958, longitude: 76.6394 },
    { latitude: 13.0827, longitude: 80.2707 },
    { latitude: 12.9141, longitude: 74.8560 },
];

const state = new Map();

const jitter = () => (Math.random() - 0.5) * 0.01; // small step per tick

const tick = async (vehicles) => {
    for (let i = 0; i < vehicles.length; i++) {
        const vehicle = vehicles[i];

        if (!state.has(vehicle._id.toString())) {
            const base = startPoints[i % startPoints.length];
            state.set(vehicle._id.toString(), { ...base });
        }

        const pos = state.get(vehicle._id.toString());

        // Roll a state so idle/running/speeding all show up during a demo,
        // instead of every vehicle sitting in the same speed band forever.
        const roll = Math.random();
        let speed;

        if (roll < 0.2) {
            // Idle / parked — don't drift position either.
            speed = 0;
        } else if (roll < 0.9) {
            // Normal running speed.
            speed = Math.round(15 + Math.random() * 55); // ~15-70 km/h
            pos.latitude += jitter();
            pos.longitude += jitter();
        } else {
            // Occasional speeding burst.
            speed = Math.round(80 + Math.random() * 30); // ~80-110 km/h
            pos.latitude += jitter();
            pos.longitude += jitter();
        }

        try {
            const res = await fetch(`${API_BASE}/location`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    vehicle: vehicle._id,
                    latitude: pos.latitude,
                    longitude: pos.longitude,
                    speed,
                }),
            });

            if (!res.ok) {
                const body = await res.text();
                console.error(`POST /location failed for ${vehicle.vehicleNumber}:`, body);
            }
        } catch (error) {
            console.error(`Could not reach backend for ${vehicle.vehicleNumber}:`, error.message);
        }
    }
};

const run = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    const vehicles = await Vehicle.find();

    if (vehicles.length === 0) {
        console.log("No vehicles found — run `node seed.js` first.");
        process.exit(1);
    }

    console.log(`Simulating live locations for ${vehicles.length} vehicle(s). Ctrl+C to stop.`);

    await tick(vehicles);
    setInterval(() => tick(vehicles), 4000);
};

run();
