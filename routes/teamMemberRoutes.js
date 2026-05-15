const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../config/multer");

const {
    getMembers,
    addMember,
    updateMember,
    deleteMember
} = require("../controllers/teamMemberController");

// Public
router.get("/", getMembers);

// Admin only
router.post(
    "/",
    authMiddleware,
    upload.single("image"),
    addMember,
);
router.put(
    "/:id",
    authMiddleware,
    upload.single("image"),
    updateMember
);
router.delete("/:id", authMiddleware, deleteMember);

module.exports = router;