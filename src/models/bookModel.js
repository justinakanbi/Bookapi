const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Book = sequelize.define("Book", {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genre: {
    type: DataTypes.ENUM("Comedy", "Romance", "Tragedy", "Horror"),
    allowNull: false
  }
});

module.exports = Book;
