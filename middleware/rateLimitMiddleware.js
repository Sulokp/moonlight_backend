const rateLimit = require("express-rate-limit");

const forgotPasswordLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests
    message: "Too many requests, try again later",
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = {
    forgotPasswordLimiter
};