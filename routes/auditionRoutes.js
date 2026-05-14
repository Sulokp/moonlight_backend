const express = require("express");
const router = express.Router();

const upload = require("../config/multer");

const {
    createAudition,
    getAuditions,
    updateStatus,
    deleteAudition
} = require("../controllers/auditionController");


// CREATE AUDITION (with poster upload)
router.post(
    "/",
    upload.single("audition_poster"),
    createAudition
);


// GET ALL AUDITIONS
router.get("/", getAuditions);


// UPDATE STATUS
router.patch("/:id/status", updateStatus);


// DELETE AUDITION
router.delete("/:id", deleteAudition);


module.exports = router;