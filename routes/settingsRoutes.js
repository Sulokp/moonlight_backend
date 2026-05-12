const express = require("express");
const router = express.Router();

const {
    getSettings,
    updateSettings
} = require("../controllers/settingsController");

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../config/multer");

// Public route
router.get("/", getSettings);

// Protected route with file upload
router.put(
    "/",
    authMiddleware,
    upload.single("logo"),
    updateSettings
);

module.exports = router;