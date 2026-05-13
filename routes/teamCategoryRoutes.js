const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getCategories,
    addCategory,
    deleteCategory
} = require("../controllers/teamCategoryController");

// Public
router.get("/", getCategories);

// Admin only
router.post("/", authMiddleware, addCategory);
router.delete("/:id", authMiddleware, deleteCategory);

module.exports = router;