const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    vehicleNumber: {
      type: String,
      required: true,
      unique: true,
    },

    driverName: {
      type: String,
      required: true,
    },

    vehicleType: {
      type: String,
      enum: ["Truck", "Van", "Car"],
      default: "Truck",
    },

    fuelType: {
      type: String,
      enum: ["Diesel", "Petrol", "Electric"],
      default: "Diesel",
    },

    capacity: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive", "Maintenance"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);