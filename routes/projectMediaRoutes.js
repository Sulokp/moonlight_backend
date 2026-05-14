const express = require("express");

const router = express.Router();

const {
    getProjectMedia,
    addProjectMedia,
    deleteProjectMedia
} = require("../controllers/projectMediaController");

const authMiddleware = require("../middleware/authMiddleware");


// GET media of a project
router.get("/:project_id", getProjectMedia);


// ADD media
router.post("/", authMiddleware, addProjectMedia);


// DELETE media
router.delete("/:id", authMiddleware, deleteProjectMedia);


module.exports = router;