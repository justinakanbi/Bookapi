const Book = require("../models/bookModel");

// Controller functions
exports.getAllBooks = async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
};

exports.getBookById = async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
};

exports.createBook = async (req, res) => {
  const { title, author, genre } = req.body;
  const book = await Book.create({ title, author, genre });
  res.json(book);
};

exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, genre } = req.body;
  const book = await Book.findByPk(id);

  if (!book) return res.status(404).json({ message: "Book not found" });

  await book.update({ title, author, genre });
  res.json(book);
};

exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findByPk(id);

  if (!book) return res.status(404).json({ message: "Book not found" });

  await book.destroy();
  res.json({ message: "Book deleted successfully", id });
};
