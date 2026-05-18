    const jwt = require("jsonwebtoken");

    const authMiddleware = (req, res, next) => {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Invalid token format" });
        }

        // Format: Bearer token
        const token = authHeader.split(" ")[1] || null;

        if (!token) {
            return res.status(401).json({ message: "Token missing" });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.admin = decoded; 

            next();
        } catch (error) {
            return res.status(401).json({ message: "Token expired or invalid" });    }
    };

    module.exports = authMiddleware;