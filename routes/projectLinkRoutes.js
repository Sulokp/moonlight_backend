const express = require("express");

const router = express.Router();

const {
    getProjectLinks,
    createProjectLink,
    deleteProjectLink
} = require("../controllers/projectLinkController");

const authMiddleware = require("../middleware/authMiddleware");


// GET links for a project
router.get("/:project_id", getProjectLinks);


// CREATE link
router.post("/", authMiddleware, createProjectLink);


// DELETE link
router.delete("/:id", authMiddleware, deleteProjectLink);


module.exports = router;