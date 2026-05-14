const express = require("express");
const router = express.Router();

const upload = require("../config/multer");
const { applyAudition } = require("../controllers/auditionApplyController");

router.post(
    "/apply",
    upload.fields([
        { name: "front_image", maxCount: 1 },
        { name: "side_image", maxCount: 1 },
        { name: "cv", maxCount: 1 }
    ]),
    applyAudition
);

module.exports = router;