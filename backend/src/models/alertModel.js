const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    },

    type: {
        type: String,
        enum: ["Info", "Warning", "Critical"],
        default: "Info"
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Alert", alertSchema);