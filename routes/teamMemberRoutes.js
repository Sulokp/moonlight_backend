const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../config/multer");

const {
    getMembers,
    addMember,
    deleteMember
} = require("../controllers/teamMemberController");

// Public
router.get("/", getMembers);

// Admin only
router.post(
    "/",
    authMiddleware,
    upload.single("image"),
    addMember
);

router.delete("/:id", authMiddleware, deleteMember);

module.exports = router;