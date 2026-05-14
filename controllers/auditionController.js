const db = require("../config/db");


// CREATE AUDITION
const createAudition = (req, res) => {

    const audition_poster = req.file
        ? `/uploads/auditions/${req.file.filename}`
        : null;

    const status = req.body.status || "open";

    const sql = `
        INSERT INTO auditions (audition_poster, status)
        VALUES (?, ?)
    `;

    db.query(sql, [audition_poster, status], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Audition created successfully",
            insertedId: result.insertId
        });
    });
};


// GET ALL AUDITIONS
const getAuditions = (req, res) => {

    const sql = `
        SELECT * 
        FROM auditions 
        ORDER BY id DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Auditions fetched successfully",
            data: result
        });
    });
};


// UPDATE STATUS
const updateStatus = (req, res) => {

    const { id } = req.params;
    const { status } = req.body;

    const sql = `
        UPDATE auditions
        SET status = ?
        WHERE id = ?
    `;

    db.query(sql, [status, id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Status updated successfully"
        });
    });
};


// DELETE AUDITION
const deleteAudition = (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM auditions
        WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Audition deleted successfully"
        });
    });
};


module.exports = {
    createAudition,
    getAuditions,
    updateStatus,
    deleteAudition
};