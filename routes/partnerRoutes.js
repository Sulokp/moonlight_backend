const express = require("express");

const router = express.Router();

const {
    getPartners,
    createPartner,
    updatePartner,
    deletePartner
} = require("../controllers/partnerController");

const authMiddleware = require("../middleware/authMiddleware");

const upload = require("../config/multer");



// PUBLIC
router.get("/", getPartners);


// ADMIN
router.post(
    "/",
    authMiddleware,
    upload.single("logo"),
    createPartner
);

router.put(
    "/:id",
    authMiddleware,
    upload.single("logo"),
    updatePartner
);

router.delete(
    "/:id",
    authMiddleware,
    deletePartner
);


module.exports = router;