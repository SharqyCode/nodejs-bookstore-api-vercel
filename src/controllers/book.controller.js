const services = require("../services/book.service")

const getAllBooks = async (req, res) => {
    const data = await services.queryAllBooks()
    res.send(data);
}
const getBookById = async (req, res) => {
    const queryId = req.params.id
    const data = await services.queryBookById(queryId)
    res.send(data);
}
const addBook = async (req, res) => {
    const newBookData = req.body
    const newBook = await services.queryAddBook(newBookData)
    res.send(newBook)
}
function updateBook(req, res) { res.send("Update Book") }
function deleteBook(req, res) { res.send("Delete Book") }

module.exports = { getAllBooks, getBookById, addBook, updateBook, deleteBook }