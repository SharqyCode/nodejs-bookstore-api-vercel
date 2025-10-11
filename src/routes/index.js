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
    <h2>=== Book Store API ===</h2>
    <p>
    <strong>--- Books ---</strong><br>
    GET /api/books → get all books<br>
    GET /api/books/{id} → get book by ID<br>
    POST /api/books/addBook → add book to DB<br>
    PATCH /api/books/update/{id} → edit book & save to DB<br>
    DELETE /api/books/delete/{id} → delete book from DB<br><br>

    <strong>--- Authors ---</strong><br>
    GET /api/authors → get all authors<br>
    GET /api/authors/{id} → get author by ID<br>
    POST /api/authors/ → add author to DB<br>
    PUT /api/authors/{id} → edit author & save to DB<br>
    DELETE /api/authors/{id} → delete author from DB<br><br>

    <strong>--- Users ---</strong><br>
    POST /api/u/register → add user to DB<br>
    POST /api/u/login → login with saved credentials<br>
    GET /api/u/me → visit user profile (must send JWT in header)
    </p>
  `);
});

module.exports = router;
