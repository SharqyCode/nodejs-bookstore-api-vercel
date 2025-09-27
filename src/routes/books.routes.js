const { getAllBooks, getBookById, addBook, updateBook, deleteBook } = require("../controllers/book.controller")
const express = require("express")
const { validateId, AddBookMiddleWare, updateBookMiddleWare } = require("../middlewares/validate.middleware")
const { validateAddBook, validateUpdateBook } = require("../validators/book.validator")
const bookRouter = express.Router()

bookRouter.param("id", validateId)

bookRouter.get("/", getAllBooks)
bookRouter.get("/:id", getBookById)
bookRouter.post("/addBook", AddBookMiddleWare(validateAddBook), addBook)
bookRouter.patch("/update/:id", updateBookMiddleWare(validateUpdateBook), updateBook)
bookRouter.delete("/delete/:id", deleteBook)


module.exports = bookRouter