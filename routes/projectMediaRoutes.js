const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const controller = require("../controllers/projectMediaController");

router.get("/:project_id", controller.getProjectMedia);

// SINGLE IMAGE UPLOAD
router.post(
    "/",
    upload.single("media"),
    controller.addProjectMedia
);

router.delete("/:id", controller.deleteProjectMedia);

module.exports = router;