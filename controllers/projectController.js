const db = require("../config/db");


// Generate slug from title
const generateSlug = (title) => {
    return title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "");
};


// GET all projects
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
            return res.status(500).json(err);
        }

        res.json({
            message: "Projects fetched successfully",
            data: result
        });
    });
};


// CREATE project
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

    // Generate slug automatically
    const slug = generateSlug(title);

    // Poster upload
    const poster = req.file
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

    db.query(
        sql,
        [
            category_id,
            title,
            slug,
            poster,
            description,
            duration,
            seasons || null,
            episodes || null,
            release_year || null,
            status,
            featured || false
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Project created successfully",
                insertedId: result.insertId
            });
        }
    );
};

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

    // regenerate slug if title changes
    const slug = generateSlug(title);

    // new poster if uploaded
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

    db.query(
        sql,
        [
            category_id,
            title,
            slug,
            poster,
            description,
            duration,
            seasons || null,
            episodes || null,
            release_year || null,
            status,
            featured || false,
            id
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Project updated successfully"
            });
        }
    );
};

// DELETE project
const deleteProject = (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM projects
        WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Project deleted successfully"
        });
    });
};

module.exports = {
    getProjects,
    createProject,
    deleteProject,
    updateProject
};