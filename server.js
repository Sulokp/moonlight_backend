const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config();

require("./config/db");
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/settings", require("./routes/settingsRoutes"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/social-links", require("./routes/socialRoutes"));

const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Moonlight Backend Running");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});