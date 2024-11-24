const request = require("supertest");
const app = require("../src/app");
const sequelize = require("../src/database/db");
const Book = require("../src/models/bookModel");

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Reset database
});

afterAll(async () => {
  await sequelize.close(); // Close database connection
});

describe("Book API Tests", () => {
  test("POST /books - Create a book", async () => {
    const book = { title: "Test Book", author: "John Doe", genre: "Comedy" };
    const response = await request(app).post("/books").send(book);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe(book.title);
  });

  test("GET /books - Get all books", async () => {
    const response = await request(app).get("/books");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1); // One book created
  });

  test("GET /books/:id - Get book by ID", async () => {
    const response = await request(app).get("/books/1");
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
  });

  test("PUT /books/:id - Update a book", async () => {
    const updatedBook = { title: "Updated Book", author: "Jane Doe", genre: "Romance" };
    const response = await request(app).put("/books/1").send(updatedBook);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe(updatedBook.title);
  });

  test("DELETE /books/:id - Delete a book", async () => {
    const response = await request(app).delete("/books/1");
    expect(response.status).toBe(200);
    const getResponse = await request(app).get("/books/1");
    expect(getResponse.status).toBe(404);
  });

  test("GET /books/:id - Get non-existent book", async () => {
    const response = await request(app).get("/books/999");
    expect(response.status).toBe(404);
  });
});
