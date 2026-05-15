const db = require("../config/db");

// GET all social links
const getSocialLinks = (req, res) => {
    const sql = "SELECT * FROM social_links ORDER BY id DESC";

    db.query(sql, (err, result) => {
        if (err) return res.status(500).json(err);

        res.json({
            data: result
        });
    });
};

// ADD social link
const addSocialLink = (req, res) => {
    const { platform, url } = req.body;

    const sql = `
        INSERT INTO social_links (platform, url)
        VALUES (?, ?)
    `;

    db.query(sql, [platform, url], (err) => {
        if (err) return res.status(500).json(err);

        res.json({ message: "Social link added" });
    });
};

// DELETE social link
const deleteSocialLink = (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM social_links WHERE id = ?";

    db.query(sql, [id], (err) => {
        if (err) return res.status(500).json(err);

        res.json({ message: "Social link deleted" });
    });
};

module.exports = {
    getSocialLinks,
    addSocialLink,
    deleteSocialLink
};  