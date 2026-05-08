const express = require("express");
const app = express();
require("dotenv").config();

require("./config/db");

app.use(express.json());

// Routes
app.use("/api/admin", require("./routes/adminRoutes"));

const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Moonlight Backend Running");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});