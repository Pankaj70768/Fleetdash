const express = require("express");
const router = express.Router();

const {
    createReport,
    getReports
} = require("../controllers/reportController");

// Routes
router.route("/")
    .post(createReport)
    .get(getReports);

module.exports = router;