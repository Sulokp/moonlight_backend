const db = require("./config/db");
const bcrypt = require("bcrypt");

const seedAdmin = async () => {
    const email = "admin@gmail.com";
    const password = "123456";

    // Check if admin already exists
    db.query("SELECT * FROM admins WHERE email = ?", [email], async (err, result) => {
        if (err) {
            console.log("Error:", err);
            return;
        }

        if (result.length > 0) {
            console.log("⚠️ Admin already exists");
            process.exit();
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
            "INSERT INTO admins (name, email, password) VALUES (?, ?, ?)",
            ["Admin", email, hashedPassword],
            (err2) => {
                if (err2) {
                    console.log("Insert Error:", err2);
                } else {
                    console.log("✅ Admin seeded successfully");
                }
                process.exit();
            }
        );
    });
};

seedAdmin();