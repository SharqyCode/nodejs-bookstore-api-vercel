const { getAllBooks, getBookById, addBook, updateBook, deleteBook } = require("../controllers/book.controller")
const bookModel = require("../models/book.model")
const express = require("express")
const bookRouter = express.Router()


bookRouter.get("/", getAllBooks)
bookRouter.get("/:id", getBookById)
bookRouter.post("/addBook", addBook)
bookRouter.patch("/update/:id", updateBook)
bookRouter.delete("/delete/:id", deleteBook)


module.exports = bookRouter