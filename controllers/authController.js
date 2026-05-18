const crypto = require("crypto");
const bcrypt = require("bcrypt");
const db = require("../config/db");
const { sendResetEmail } = require("../services/emailService");


// ==============================
// 1️⃣ FORGOT PASSWORD
// ==============================
const forgotPassword = (req, res) => {

    const { email } = req.body;

    const sql = "SELECT * FROM admins WHERE email = ?";

    db.query(sql, [email], async (err, result) => {

        if (err) return res.status(500).json(err);

        if (result.length === 0) {
            return res.status(404).json({
                message: "Admin not found"
            });
        }

        // Generate secure token
        const token = crypto.randomBytes(32).toString("hex");

        // Token expiry (15 minutes)
        const expiry = new Date(Date.now() + 15 * 60 * 1000);

        const updateSql = `
            UPDATE admins
            SET reset_token = ?, reset_token_expiry = ?
            WHERE email = ?
        `;

        db.query(updateSql, [token, expiry, email], async (err2) => {

            if (err2) return res.status(500).json(err2);

            try {
                await sendResetEmail(email, token);

                res.json({
                    message: "Reset link sent to email"
                });

            } catch (mailErr) {
                res.status(500).json({
                    message: "Failed to send email",
                    error: mailErr
                });
            }
        });
    });
};


// ==============================
// 2️⃣ VERIFY TOKEN (OPTIONAL)
// ==============================
const verifyToken = (req, res) => {

    const { token } = req.body;

    const sql = `
        SELECT * FROM admins
        WHERE reset_token = ?
        AND reset_token_expiry > NOW()
    `;

    db.query(sql, [token], (err, result) => {

        if (err) return res.status(500).json(err);

        if (result.length === 0) {
            return res.status(400).json({
                message: "Invalid or expired token"
            });
        }

        res.json({
            message: "Token valid"
        });
    });
};


// ==============================
// 3️⃣ RESET PASSWORD
// ==============================
const resetPassword = (req, res) => {

    const { token, newPassword } = req.body;

    const sql = `
        SELECT * FROM admins
        WHERE reset_token = ?
        AND reset_token_expiry > NOW()
    `;

    db.query(sql, [token], async (err, result) => {

        if (err) return res.status(500).json(err);

        if (result.length === 0) {
            return res.status(400).json({
                message: "Invalid or expired token"
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const updateSql = `
            UPDATE admins
            SET password = ?,
                reset_token = NULL,
                reset_token_expiry = NULL
            WHERE reset_token = ?
        `;

        db.query(updateSql, [hashedPassword, token], (err2) => {

            if (err2) return res.status(500).json(err2);

            res.json({
                message: "Password reset successful"
            });
        });
    });
};


// ==============================
// EXPORT
// ==============================
module.exports = {
    forgotPassword,
    verifyToken,
    resetPassword
};