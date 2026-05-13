const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getLinksByMember,
    addLink,
    deleteLink
} = require("../controllers/teamMemberLinkController");

// Public
router.get("/:memberId", getLinksByMember);

// Admin
router.post("/", authMiddleware, addLink);
router.delete("/:id", authMiddleware, deleteLink);

module.exports = router;