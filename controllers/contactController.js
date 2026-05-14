const { sendContactEmail } = require("../services/emailService");

const sendContactForm = async (req, res) => {

    try {
        const { name, email, contact_number, subject, message } = req.body;

        if (!name || !email || !contact_number || !subject || !message) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        await sendContactEmail({ name, email, contact_number, subject, message });

        res.json({
            message: "Message sent successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to send message",
            error
        });
    }
};

module.exports = {
    sendContactForm
};