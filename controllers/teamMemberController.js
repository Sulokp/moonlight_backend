const db = require("../config/db");

// GET all members
const getMembers = (req, res) => {
    const sql = `
        SELECT 
            team_members.*,
            team_categories.name AS category_name
        FROM team_members
        LEFT JOIN team_categories
        ON team_members.category_id = team_categories.id
        ORDER BY team_members.id DESC
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

// ADD member
const addMember = (req, res) => {
    const {
        category_id,
        name,
        description
    } = req.body;

    const image = req.file
        ? `/uploads/team/${req.file.filename}`
        : null;

    const sql = `
        INSERT INTO team_members
        (
            category_id,
            name,
            image,
            description
        )
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            category_id,
            name,
            image,
            description
        ],
        (err) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Team member added successfully"
            });
        }
    );
};
const updateMember = (req, res) => {
    const { id } = req.params;
    const {
        category_id,
        name,
        description
    } = req.body;

    const image = req.file
        ? `/uploads/team/${req.file.filename}`
        : null;

    const sql = `
        UPDATE team_members
        SET
            category_id = ?,
            name = ?,
            image = COALESCE(?, image),
            description = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            category_id,
            name,
            image,
            description,
            id
        ],
        (err) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Team member updated successfully"
            });
        }
    );
};

// DELETE member
const deleteMember = (req, res) => {
    const { id } = req.params;

    const sql = `
        DELETE FROM team_members
        WHERE id = ?
    `;

    db.query(sql, [id], (err) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Member deleted successfully"
        });
    });
};

module.exports = {
    getMembers,
    addMember,
    updateMember,
    deleteMember
};