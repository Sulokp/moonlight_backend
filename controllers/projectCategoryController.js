const db = require("../config/db");


// GET all categories
const getProjectCategories = (req, res) => {

    const sql = `
        SELECT *
        FROM project_categories
        ORDER BY id DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Project categories fetched successfully",
            data: result
        });
    });
};


// CREATE category
const createProjectCategory = (req, res) => {

    const { name } = req.body;

    const sql = `
        INSERT INTO project_categories (name)
        VALUES (?)
    `;

    db.query(sql, [name], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Project category created successfully",
            insertedId: result.insertId
        });
    });
};


// DELETE category
const deleteProjectCategory = (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM project_categories
        WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Project category deleted successfully"
        });
    });
};


module.exports = {
    getProjectCategories,
    createProjectCategory,
    deleteProjectCategory
};