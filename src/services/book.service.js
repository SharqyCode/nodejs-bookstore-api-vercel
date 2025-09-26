const Books = require("../models/book.model")

const queryAllBooks = async () => {
    try {
        const books = await Books.find()
        if (books.length === 0) {
            throw new Error("No books in DB");
        }
        return books
    } catch (err) {
        return `Couldn't fetch Data: ${err}`
    }
}
const queryBookById = async (id) => {
    try {
        const book = await Books.findById(id)
        if (!book) {
            throw new Error("Book not found");
        }
        return book
    } catch (err) {
        return `Couldn't fetch Data: ${err}`
    }

}

const queryAddBook = async (bookData) => {
    const {
        title,
        description,
        publishedYear,
        genre,
        author,
        coverImage
    } = bookData
    // Prevent duplicate entries
    try {
        const duplicates = await Books.find({ title: title })
        console.log(duplicates);
        if (duplicates.length > 0) {
            throw new Error("Book already in DB");
        }
        const newBook = new Books(bookData)
        await newBook.save()
        return { msg: "Book added Successfully", data: newBook }
    } catch (err) {
        return `Couldn't add book: ${err}`
    }
}
const queryUpdateBook = async () => {

}
const queryDeleteBook = async () => {

}


const services = {
    queryAllBooks,
    queryBookById,
    queryAddBook,
    queryUpdateBook,
    queryDeleteBook,
}

module.exports = services