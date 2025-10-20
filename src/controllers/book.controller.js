const services = require("../services/book.service")

const getAllBooks = async (req, res) => {
    const books = await services.queryAllBooks()
    console.log(books, books.status);

    if (books.status === "OK")
        res.status(200).json(books)
    else
        res.status(204).json(books)
}

const getBookById = async (req, res) => {
    const queryId = req.params.id
    const data = await services.queryBookById(queryId)
    if (data.status === "OK")
        res.status(200).json(data)
    else
        res.status(204).json(data)
}

const addBook = async (req, res) => {
    const newBookData = req.body
    const newBook = await services.queryAddBook(newBookData)
    if (newBook.status == "CREATED")
        res.status(201).json(newBook)
    else
        res.status(400).json(newBook)
}

const updateBook = async (req, res) => {
    console.log("controller:", req.body, req.params.id);
    const bookData = req.body;
    const bookId = req.params.id;
    const modBook = await services.queryUpdateBook(bookId, bookData)
    if (modBook.status === "OK")
        res.status(200).json(modBook)
    else
        res.status(400).json(modBook)
}

const deleteBook = async (req, res) => {
    const bookId = req.params.id;
    console.log(bookId);
    const delBook = await services.queryDeleteBook(bookId)
    if (delBook.status === "OK")
        res.status(200).json(delBook)
    else
        res.status(400).json(delBook)
}

module.exports = { getAllBooks, getBookById, addBook, updateBook, deleteBook }