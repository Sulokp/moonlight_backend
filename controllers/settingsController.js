const db = require("../config/db");

// GET settings (public)
const getSettings = (req, res) => {
    const sql = "SELECT * FROM settings LIMIT 1";

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }

        if (result.length === 0) {
            return res.status(200).json({
                message: "No settings found",
                data: null
            });
        }

        res.json({
            message: "Settings fetched successfully",
            data: result[0]
        });
    });
};
const updateSettings = (req, res) => {
    const {
        about_description,
        google_maps_link,
        contact_email,
        contact_phone
    } = req.body;

    // ✅ file upload handling
    const logo = req.file
        ? `/uploads/logos/${req.file.filename}`
        : null;

    const sql = `
        INSERT INTO settings (id, logo, about_description, google_maps_link, contact_email, contact_phone)
        VALUES (1, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            logo = COALESCE(?, logo),
            about_description = VALUES(about_description),
            google_maps_link = VALUES(google_maps_link),
            contact_email = VALUES(contact_email),
            contact_phone = VALUES(contact_phone)
    `;

    db.query(
        sql,
        [
            logo,
            about_description,
            google_maps_link,
            contact_email,
            contact_phone,
            logo
        ],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Settings saved successfully",
                affected: result.affectedRows
            });
        }
    );
};

module.exports = {
    getSettings,
    updateSettings
};