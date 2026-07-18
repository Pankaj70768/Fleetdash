const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
{
    reportName: {
        type: String,
        required: true
    },

    reportType: {
        type: String,
        enum: ["Trip", "Vehicle", "Driver"],
        required: true
    },

    description: {
        type: String,
        default: ""
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Report", reportSchema);