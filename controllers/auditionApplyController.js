const { sendAuditionEmail } = require("../services/emailService");

const applyAudition = async (req, res) => {

    try {
        const {
            name,
            email,
            phone,
            location,
            description
        } = req.body;

        const frontImage = req.files?.front_image?.[0];
        const sideImage = req.files?.side_image?.[0];
        const cv = req.files?.cv?.[0];

        // Build attachments array
        const attachments = [];

        if (frontImage) {
            attachments.push({
                filename: frontImage.originalname,
                path: frontImage.path
            });
        }

        if (sideImage) {
            attachments.push({
                filename: sideImage.originalname,
                path: sideImage.path
            });
        }

        if (cv) {
            attachments.push({
                filename: cv.originalname,
                path: cv.path
            });
        }

        await sendAuditionEmail({
            name,
            email,
            phone,
            location,
            description,
            attachments
        });

        res.json({
            message: "Application submitted successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: "Failed to submit application",
            error: err.message
        });
    }
};

module.exports = {
    applyAudition
};