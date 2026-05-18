const db = require("../config/db");
const generateSlug = (title) => {
    return title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "");
};

const makeUniqueSlug = (slug) => {
    return `${slug}-${Date.now()}`;
};

// GET ALL PROJECTS
const getProjects = (req, res) => {

    const sql = `
        SELECT
            projects.*,
            project_categories.name AS category_name
        FROM projects
        LEFT JOIN project_categories
        ON projects.category_id = project_categories.id
        ORDER BY projects.id DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            data: result
        });
    });
};


const createProject = (req, res) => {

    const {
        category_id,
        title,
        description,
        duration,
        seasons,
        episodes,
        release_year,
        status,
        featured
    } = req.body;

    // ✅ SAFE VALIDATION
    if (!title || !category_id) {
        return res.status(400).json({
            success: false,
            message: "Title and category are required"
        });
    }

    // ✅ SAFE SLUG
    const slug = title
        ? title.toLowerCase().trim().replace(/\s+/g, "-")
        : "";

    // ✅ SAFE FILE
    const poster = req.file?.filename
        ? `/uploads/projects/${req.file.filename}`
        : null;

    const sql = `
        INSERT INTO projects (
            category_id,
            title,
            slug,
            poster,
            description,
            duration,
            seasons,
            episodes,
            release_year,
            status,
            featured
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        category_id,
        title,
        slug,
        poster,
        description || null,
        duration || null,
        seasons ? Number(seasons) : null,
        episodes ? Number(episodes) : null,
        release_year ? Number(release_year) : null,
        status || "upcoming",
        featured === "true" || featured === true ? 1 : 0
    ], (err, result) => {

        if (err) {
            console.log("MYSQL ERROR:", err); // 🔥 IMPORTANT
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(201).json({
            success: true,
            message: "Project created successfully",
            insertedId: result.insertId
        });
    });
};

// UPDATE PROJECT (FIXED)
const updateProject = (req, res) => {

    const { id } = req.params;

    const {
        category_id,
        title,
        description,
        duration,
        seasons,
        episodes,
        release_year,
        status,
        featured
    } = req.body;

    if (!title) {
        return res.status(400).json({
            success: false,
            message: "Title is required"
        });
    }

    const slug = generateSlug(title);

    const poster = req.file
        ? `/uploads/projects/${req.file.filename}`
        : null;

    const sql = `
        UPDATE projects
        SET
            category_id = ?,
            title = ?,
            slug = ?,
            poster = COALESCE(?, poster),
            description = ?,
            duration = ?,
            seasons = ?,
            episodes = ?,
            release_year = ?,
            status = ?,
            featured = ?
        WHERE id = ?
    `;

    db.query(sql, [
        category_id,
        title,
        slug,
        poster,
        description,
        duration,
        seasons ? Number(seasons) : null,
        episodes ? Number(episodes) : null,
        release_year ? Number(release_year) : null,
        status,
        featured === "true" || featured === true ? 1 : 0,
        id
    ], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            message: "Project updated successfully"
        });
    });
};


// DELETE PROJECT
const deleteProject = (req, res) => {

    const { id } = req.params;

    db.query(
        `DELETE FROM projects WHERE id = ?`,
        [id],
        (err) => {

            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.json({
                success: true,
                message: "Project deleted successfully"
            });
        }
    );
};

module.exports = {
    getProjects,
    createProject,
    updateProject,
    deleteProject
};