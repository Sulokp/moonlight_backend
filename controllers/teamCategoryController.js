const db = require("../config/db");

// GET all categories
const getCategories = (req, res) => {
    const sql = `
        SELECT * FROM team_categories
        ORDER BY id DESC
    `;

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            data: result
        });
    });
};

// ADD category
const addCategory = (req, res) => {
    const { name } = req.body;

    const sql = `
        INSERT INTO team_categories (name)
        VALUES (?)
    `;

    db.query(sql, [name], (err) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Category added successfully"
        });
    });
};

// DELETE category
const deleteCategory = (req, res) => {
    const { id } = req.params;

    const sql = `
        DELETE FROM team_categories
        WHERE id = ?
    `;

    db.query(sql, [id], (err) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Category deleted successfully"
        });
    });
};

module.exports = {
    getCategories,
    addCategory,
    deleteCategory
};