const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
{
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle",
        required: true
    },

    latitude: {
        type: Number,
        required: true
    },

    longitude: {
        type: Number,
        required: true
    },

    speed: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Location", locationSchema);