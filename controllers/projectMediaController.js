const db = require("../config/db");


// GET media for a project
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
            message: "Project media fetched successfully",
            data: result
        });
    });
};


// ADD media
const addProjectMedia = (req, res) => {

    const {
        project_id,
        type,
        media_url,
        title
    } = req.body;

    const sql = `
        INSERT INTO project_media (
            project_id,
            type,
            media_url,
            title
        )
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [project_id, type, media_url, title],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Media added successfully",
                insertedId: result.insertId
            });
        }
    );
};


// DELETE media
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
            message: "Media deleted successfully"
        });
    });
};


module.exports = {
    getProjectMedia,
    addProjectMedia,
    deleteProjectMedia
};