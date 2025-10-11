const express = require("express");
const userRouter = require("./user.routes");
const bookRouter = require("./books.routes");
const authorRouter = require("./authors.routes");

const router = express.Router();

router.use("/api/books", bookRouter);
router.use("/api/authors", authorRouter);
router.use("/api/u", userRouter);
router.use("/", (req, res) => {
    res.send(
        `
        === BOOk Store API ===\n
        \n
        \n
        ---Books--- 
        GET /api/books --> get all books\n
        GET /api/books/{id} --> get book by ID\n
        POST /api/books/addBook --> add book to DB\n
        PATCH /api/books/update/{id} --> edit book & save to DB\n
        DELETE /api/books/delete/{id} --> delete book from DB\n
        \n
        \n
        ---Authors---\n  
        GET /api/authors --> get all authors\n
        GET /api/authors/{id} --> get author by ID\n
        POST /api/authors/ --> add author to DB\n
        PUT /api/authors/{id} --> edit author & save to DB\n
        DELETE /api/authors/{id} --> delete author from DB\n
        \n
        \n
        ---Users---\n
        POST /api/u/register --> add user to DB\n
        POST /api/u/login --> login with saved credentials\n
        GET /api/u/me --> visit user profile (must send JWT in request header)\n

        `)
})

module.exports = router;
