const express = require("express");
const router = express.Router();

const {
    createAlert,
    getAlerts
} = require("../controllers/alertController");

// Routes
router.route("/")
    .post(createAlert)
    .get(getAlerts);

module.exports = router;