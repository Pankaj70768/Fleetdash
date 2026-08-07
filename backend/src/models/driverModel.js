const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
    {
        driverName: {
            type: String,
            required: true,
            trim: true,
        },

        phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
},

        licenseNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true,
},

        experience: {
            type: Number,
            default: 0,
        },

        status: {
            type: String,
            enum: ["Available", "On Trip", "Leave"],
            default: "Available",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Driver", driverSchema);