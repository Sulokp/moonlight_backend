const express = require("express");

const router = express.Router();

const {
    getProjects,
    createProject,
    updateProject,
    deleteProject
} = require("../controllers/projectController");

const authMiddleware = require("../middleware/authMiddleware");

const upload = require("../config/multer");


// PUBLIC
router.get("/", getProjects);


// ADMIN
router.post(
    "/",
    authMiddleware,
    upload.single("poster"),
    createProject
);
router.put(
    "/:id",
    authMiddleware,
    upload.single("poster"),
    updateProject
);
router.delete(
    "/:id",
    authMiddleware,
    deleteProject
);


module.exports = router;