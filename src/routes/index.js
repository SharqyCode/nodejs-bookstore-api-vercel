const express = require("express");
const userRouter = require("./user.routes");
const bookRouter = require("./books.routes");
const authorRouter = require("./authors.routes");

const router = express.Router();

router.use("/api/books", bookRouter);
router.use("/api/authors", authorRouter);
router.use("/api/u", userRouter);
router.use("/", (req, res) => {
    res.send(`
    <html>
      <head>
        <title>Book Store API</title>
        <style>
          body {
            font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #0d1117;
            color: #c9d1d9;
            padding: 40px;
            line-height: 1.6;
          }
          h1 {
            color: #58a6ff;
          }
          h2 {
            color: #79c0ff;
            margin-top: 30px;
            border-bottom: 1px solid #30363d;
            padding-bottom: 5px;
          }
          code {
            background: #161b22;
            color: #ffa657;
            padding: 2px 6px;
            border-radius: 4px;
          }
          .route-group {
            margin-bottom: 25px;
          }
          .route {
            margin-left: 15px;
          }
          .method {
            font-weight: bold;
            color: #7ee787;
          }
        </style>
      </head>
      <body>
        <h1>📚 Book Store API</h1>
        <p>Welcome to the Book Store API — your RESTful backend for managing books, authors, and users.</p>

        <div class="route-group">
          <h2>Books</h2>
          <div class="route"><span class="method">GET</span> <code>/api/books</code> → Get all books</div>
          <div class="route"><span class="method">GET</span> <code>/api/books/{id}</code> → Get book by ID</div>
          <div class="route"><span class="method">POST</span> <code>/api/books/addBook</code> → Add book to DB</div>
          <div class="route"><span class="method">PATCH</span> <code>/api/books/update/{id}</code> → Edit book & save to DB</div>
          <div class="route"><span class="method">DELETE</span> <code>/api/books/delete/{id}</code> → Delete book from DB</div>
        </div>

        <div class="route-group">
          <h2>Authors</h2>
          <div class="route"><span class="method">GET</span> <code>/api/authors</code> → Get all authors</div>
          <div class="route"><span class="method">GET</span> <code>/api/authors/{id}</code> → Get author by ID</div>
          <div class="route"><span class="method">POST</span> <code>/api/authors</code> → Add author to DB</div>
          <div class="route"><span class="method">PUT</span> <code>/api/authors/{id}</code> → Edit author & save to DB</div>
          <div class="route"><span class="method">DELETE</span> <code>/api/authors/{id}</code> → Delete author from DB</div>
        </div>

        <div class="route-group">
          <h2>Users</h2>
          <div class="route"><span class="method">POST</span> <code>/api/u/register</code> → Register new user</div>
          <div class="route"><span class="method">POST</span> <code>/api/u/login</code> → Login with credentials</div>
          <div class="route"><span class="method">GET</span> <code>/api/u/me</code> → View profile (requires JWT)</div>
        </div>

        <p style="margin-top:40px; color:#8b949e;">
          Built with ❤️ using <strong>Node.js</strong>, <strong>Express</strong>, and <strong>MongoDB</strong>.
        </p>
      </body>
    </html>
  `);
});


module.exports = router;
