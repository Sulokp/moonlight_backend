const db = require("../config/db");


// GET all partners
const getPartners = (req, res) => {

    const sql = `
        SELECT *
        FROM partners
        ORDER BY id DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Partners fetched successfully",
            data: result
        });
    });
};


// CREATE partner
const createPartner = (req, res) => {

    const {
        name,
        website,
        description,
        type
    } = req.body;

    const logo = req.file
        ? `/uploads/logos/${req.file.filename}`
        : null;

    const sql = `
        INSERT INTO partners (
            name,
            logo,
            website,
            description,
            type
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [name, logo, website, description, type],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Partner created successfully",
                insertedId: result.insertId
            });
        }
    );
};


// UPDATE partner
const updatePartner = (req, res) => {

    const { id } = req.params;

    const {
        name,
        website,
        description,
        type
    } = req.body;

    const logo = req.file
        ? `/uploads/logos/${req.file.filename}`
        : null;

    const sql = `
        UPDATE partners
        SET
            name = ?,
            logo = COALESCE(?, logo),
            website = ?,
            description = ?,
            type = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [name, logo, website, description, type, id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Partner updated successfully"
            });
        }
    );
};


// DELETE partner
const deletePartner = (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM partners
        WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Partner deleted successfully"
        });
    });
};


module.exports = {
    getPartners,
    createPartner,
    updatePartner,
    deletePartner
};