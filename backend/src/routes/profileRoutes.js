const express = require("express");

const router = express.Router();

const {
    getProfile,
    updateProfile,
    changePassword
} = require("../controllers/profileController");

const { protect } = require("../middleware/authMiddleware");

router.route("/")
    .get(protect, getProfile)
    .put(protect, updateProfile);

router.put("/password", protect, changePassword);

module.exports = router;