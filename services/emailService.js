const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


// ==============================
// 1️⃣ RESET PASSWORD EMAIL
// ==============================
const sendResetEmail = async (email, token) => {

    const resetLink = `http://localhost:5173/reset-password?token=${token}`;

    await transporter.sendMail({
        from: `"Admin Panel" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Password Reset Request",
        html: `
            <h2>Password Reset Request</h2>
            <p>You requested to reset your password.</p>
            <p>Click the link below:</p>
            <a href="${resetLink}">Reset Password</a>
            <p>This link expires in 15 minutes.</p>
        `
    });
};


// ==============================
// 2️⃣ CONTACT FORM EMAIL
// ==============================
const sendContactEmail = async (data) => {

    const { name, email, contact_number, subject, message } = data;

    await transporter.sendMail({
        from: `"Website Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER, // send to admin
        subject: `New Inquiry: ${subject}`,
        html: `
            <h2>New Contact Message</h2>

            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Contact Number:</strong> ${contact_number}</p>
            <p><strong>Subject:</strong> ${subject}</p>

            <hr/>

            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `
    });
};

// ==============================
// AUDITION APPLICATION EMAIL (WITH FILES)
// ==============================
const sendAuditionEmail = async (data) => {

    const {
        name,
        email,
        phone,
        location,
        description,
        attachments
    } = data;

    await transporter.sendMail({
        from: `"Audition System" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,

        subject: "New Audition Application",

        html: `
            <h2>New Audition Application</h2>

            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Location:</strong> ${location}</p>

            <hr/>

            <p><strong>Description:</strong></p>
            <p>${description}</p>
        `,

        attachments: attachments || []
    });
};

// ==============================
// EXPORT BOTH FUNCTIONS
// ==============================
module.exports = {
    sendResetEmail,
    sendContactEmail,
    sendAuditionEmail
};