const express = require("express");
const router = express.Router();
const { loginAdmin } = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/login", loginAdmin);
router.get("/profile", authMiddleware, (req, res) => {
    res.json({
        message: "Protected admin data",
        admin: req.admin
    });
});

module.exports = router;