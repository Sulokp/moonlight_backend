const db = require("../config/db");


// GET ALL NEWS/BLOGS
const getNewsBlogs = (req, res) => {

    const sql = `
        SELECT *
        FROM news_blogs
        ORDER BY id DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "News/Blogs fetched successfully",
            data: result
        });
    });
};


// CREATE NEWS/BLOG
const createNewsBlog = (req, res) => {

    const {
        title,
        description,
        news_link
    } = req.body;

    const news_poster = req.file
        ? `/uploads/news/${req.file.filename}`
        : null;

    const sql = `
        INSERT INTO news_blogs (
            news_poster,
            title,
            description,
            news_link
        )
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            news_poster,
            title,
            description,
            news_link
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "News/Blog created successfully",
                insertedId: result.insertId
            });
        }
    );
};


// UPDATE NEWS/BLOG
const updateNewsBlog = (req, res) => {

    const { id } = req.params;

    const {
        title,
        description,
        news_link
    } = req.body;

    let sql = `
        UPDATE news_blogs
        SET
            title = ?,
            description = ?,
            news_link = ?
    `;

    const values = [
        title,
        description,
        news_link
    ];

    // If new image uploaded
    if (req.file) {

        sql += `,
            news_poster = ?
        `;

        values.push(
            `/uploads/news/${req.file.filename}`
        );
    }

    sql += ` WHERE id = ?`;

    values.push(id);

    db.query(sql, values, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "News/Blog updated successfully"
        });
    });
};


// DELETE NEWS/BLOG
const deleteNewsBlog = (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM news_blogs
        WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "News/Blog deleted successfully"
        });
    });
};


module.exports = {
    getNewsBlogs,
    createNewsBlog,
    updateNewsBlog,
    deleteNewsBlog
};