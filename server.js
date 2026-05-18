const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config();

require("./config/db");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/settings", require("./routes/settingsRoutes"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/social-links", require("./routes/socialRoutes"));
app.use("/api/team-categories", require("./routes/teamCategoryRoutes"));
app.use("/api/team-members", require("./routes/teamMemberRoutes"));
app.use(
    "/api/team-member-links",
    require("./routes/teamMemberLinkRoutes")
);
app.use(
    "/api/project-categories",
    require("./routes/projectCategoryRoutes")
);
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/project-links", require("./routes/projectLinkRoutes"));
app.use("/api/project-media", require("./routes/projectMediaRoutes"));
app.use("/api/partners", require("./routes/partnerRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/auditions", require("./routes/auditionRoutes"));
app.use("/api/auditions", require("./routes/auditionApplyRoutes"));
app.use("/api/news-blogs", require("./routes/newsBlogRoutes"));

const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Moonlight Backend Running");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});