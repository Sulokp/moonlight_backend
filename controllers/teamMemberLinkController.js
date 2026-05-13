const db = require("../config/db");

// GET links by member
const getLinksByMember = (req, res) => {
    const { memberId } = req.params;

    const sql = `
        SELECT * FROM team_member_links
        WHERE member_id = ?
        ORDER BY id DESC
    `;

    db.query(sql, [memberId], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            data: result
        });
    });
};

// ADD link
const addLink = (req, res) => {
    const { member_id, platform, url } = req.body;

    // Step 1: check if already exists
    const checkSql = `
        SELECT * FROM team_member_links
        WHERE member_id = ? AND platform = ?
    `;

    db.query(checkSql, [member_id, platform], (err, result) => {
        if (err) return res.status(500).json(err);

        // If already exists → block insert
        if (result.length > 0) {
            return res.status(400).json({
                message: "This platform already exists for this member"
            });
        }

        // Step 2: insert if not exists
        const insertSql = `
            INSERT INTO team_member_links
            (member_id, platform, url)
            VALUES (?, ?, ?)
        `;

        db.query(insertSql, [member_id, platform, url], (err2) => {
            if (err2) return res.status(500).json(err2);

            res.json({
                message: "Link added successfully"
            });
        });
    });
};

// DELETE link
const deleteLink = (req, res) => {
    const { id } = req.params;

    // Step 1: check if link exists
    const checkSql = `
        SELECT * FROM team_member_links
        WHERE id = ?
    `;

    db.query(checkSql, [id], (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.length === 0) {
            return res.status(404).json({
                message: "Link not found"
            });
        }

        // Step 2: delete safely
        const deleteSql = `
            DELETE FROM team_member_links
            WHERE id = ?
        `;

        db.query(deleteSql, [id], (err2) => {
            if (err2) return res.status(500).json(err2);

            res.json({
                message: "Link deleted successfully",
                deleted: result[0]
            });
        });
    });
};

module.exports = {
    getLinksByMember,
    addLink,
    deleteLink
};