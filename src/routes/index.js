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
        ---Books---  
        GET /api/books --> get all books
        GET /api/books/{id} --> get book by ID
        POST /api/books/addBook --> add book to DB
        PATCH /api/books/update/{id} --> edit book & save to DB
        DELETE /api/books/delete/{id} --> delete book from DB
        

        ---Authors---  
        GET /api/authors --> get all authors
        GET /api/authors/{id} --> get author by ID
        POST /api/authors/ --> add author to DB
        PUT /api/authors/{id} --> edit author & save to DB
        DELETE /api/authors/{id} --> delete author from DB
        
        
        ---Users---
        POST /api/u/register --> add user to DB
        POST /api/u/login --> login with saved credentials
        GET /api/u/me --> visit user profile (must send JWT in request header)

        `)
})

module.exports = router;
