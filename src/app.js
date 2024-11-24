require("dotenv").config();
const express = require("express");

const sequelize = require("./database/db");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
app.use(express.json());
app.use("/books", bookRoutes);

module.exports = app;

// Synchronize database and start server on port 3000
const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  console.log("Database Synchronized");
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
