const express = require("express");

const router = express.Router();

const {
    getProjectCategories,
    createProjectCategory,
    deleteProjectCategory
} = require("../controllers/projectCategoryController");

const authMiddleware = require("../middleware/authMiddleware");


// PUBLIC
router.get("/", getProjectCategories);


// ADMIN
router.post("/", authMiddleware, createProjectCategory);

router.delete("/:id", authMiddleware, deleteProjectCategory);


module.exports = router;