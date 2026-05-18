const db = require("../config/db");


// GET images for a project
const getProjectMedia = (req, res) => {

    const { project_id } = req.params;

    const sql = `
        SELECT *
        FROM project_media
        WHERE project_id = ?
        ORDER BY id DESC
    `;

    db.query(sql, [project_id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Project images fetched successfully",
            data: result
        });
    });
};


// ADD image (WITH MULTER)
const addProjectMedia = (req, res) => {

    const { project_id, title } = req.body;

    if (!req.file) {
        return res.status(400).json({
            message: "Image file is required"
        });
    }

    // store relative path
    const image_path = req.file.path.replace(/\\/g, "/");

    const sql = `
        INSERT INTO project_media (
            project_id,
            image_path,
            title
        )
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [project_id, image_path, title],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Image uploaded successfully",
                insertedId: result.insertId,
                image_path
            });
        }
    );
};


// DELETE image
const deleteProjectMedia = (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM project_media
        WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Image deleted successfully"
        });
    });
};


module.exports = {
    getProjectMedia,
    addProjectMedia,
    deleteProjectMedia
};