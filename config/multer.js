const multer = require("multer");
const path = require("path");
const fs = require("fs");

const folderMap = {
    logo: "uploads/logos/",
    image: "uploads/team/",
    poster: "uploads/projects/",
    media: "uploads/media/",
    audition_poster: "uploads/auditions/"
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        // Default upload folder
        let uploadPath = "uploads/misc/";

        // Match fieldname with folder
        if (folderMap[file.fieldname]) {
            uploadPath = folderMap[file.fieldname];
        }

        // Create folder automatically
        fs.mkdirSync(uploadPath, { recursive: true });

        cb(null, uploadPath);
    },

    filename: (req, file, cb) => {
        cb(
            null,
            Date.now() + path.extname(file.originalname)
        );
    }
});

const fileFilter = (req, file, cb) => {

    // Allow images + videos
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype.startsWith("video/")
    ) {
        cb(null, true);
    } else {
        cb(new Error("Only image/video files allowed"), false);
    }
};

const upload = multer({
    storage,
    fileFilter
});

module.exports = upload;