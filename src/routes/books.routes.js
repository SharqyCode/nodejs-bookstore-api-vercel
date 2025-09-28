const { getAllBooks, getBookById, addBook, updateBook, deleteBook } = require("../controllers/book.controller")
const express = require("express")
const { validateId, AddBookMiddleWare, updateBookMiddleWare } = require("../middlewares/validate.middleware")
const { validateAddBook, validateUpdateBook } = require("../validators/book.validator")
const router = express.Router()

router.param("id", validateId)

router.get("/", getAllBooks)
router.get("/:id", getBookById)
router.post("/addBook", AddBookMiddleWare(validateAddBook), addBook)
router.patch("/update/:id", updateBookMiddleWare(validateUpdateBook), updateBook)
router.delete("/delete/:id", deleteBook)


module.exports = router
