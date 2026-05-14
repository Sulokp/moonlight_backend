const db = require("../config/db");


// GET links for a project
const getProjectLinks = (req, res) => {

    const { project_id } = req.params;

    const sql = `
        SELECT *
        FROM project_links
        WHERE project_id = ?
        ORDER BY id DESC
    `;

    db.query(sql, [project_id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Project links fetched successfully",
            data: result
        });
    });
};


// CREATE link
const createProjectLink = (req, res) => {

    const { project_id, type, url } = req.body;

    const sql = `
        INSERT INTO project_links (project_id, type, url)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [project_id, type, url], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Project link added successfully",
            insertedId: result.insertId
        });
    });
};


// DELETE link
const deleteProjectLink = (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM project_links
        WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Project link deleted successfully"
        });
    });
};


module.exports = {
    getProjectLinks,
    createProjectLink,
    deleteProjectLink
};