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
const updateBook = async (req, res) => {
    console.log("controller:", req.body, req.params.id);
    const bookData = req.body;
    const bookId = req.params.id;
    const modBook = await services.queryUpdateBook(bookId, bookData)
    res.send(modBook)
}

const deleteBook = async (req, res) => {
    const bookId = req.params.id;
    console.log(bookId);
    const delBook = await services.queryDeleteBook(bookId)
    res.send(delBook)
}

module.exports = { getAllBooks, getBookById, addBook, updateBook, deleteBook }