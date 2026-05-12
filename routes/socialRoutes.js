const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
    getSocialLinks,
    addSocialLink,
    deleteSocialLink
} = require("../controllers/socialController");

// Public (frontend uses this)
router.get("/", getSocialLinks);

// Admin only
router.post("/", authMiddleware, addSocialLink);
router.delete("/:id", authMiddleware, deleteSocialLink);

module.exports = router;