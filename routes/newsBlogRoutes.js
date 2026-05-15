const express = require("express");
const router = express.Router();

const upload = require("../config/multer");

const {
    getNewsBlogs,
    createNewsBlog,
    updateNewsBlog,
    deleteNewsBlog
} = require("../controllers/newsBlogController");


// GET ALL
router.get("/", getNewsBlogs);


// CREATE
router.post(
    "/",
    upload.single("news_poster"),
    createNewsBlog
);


// UPDATE
router.put(
    "/:id",
    upload.single("news_poster"),
    updateNewsBlog
);


// DELETE
router.delete("/:id", deleteNewsBlog);


module.exports = router;