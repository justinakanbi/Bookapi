const { Sequelize } = require("sequelize");

// Initialize SQLite database
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./books.sqlite"
});

module.exports = sequelize;
