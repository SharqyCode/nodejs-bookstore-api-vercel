const Books = require("../models/book.model")
const { v4: uuidv4 } = require("uuid")

const queryAllBooks = async () => {
    try {
        const books = await Books.find()
        if (books.length === 0) {
            throw new Error("No books in DB");
        }
        return books
    } catch (err) {
        return `Couldn't fetch Data: ${err}\n`
    }
}
const queryBookById = async (id) => {
    try {
        const book = await Books.findOne({ bookId: id })
        if (!book) {
            throw new Error("Book not found");
        }
        return book
    } catch (err) {
        return `Couldn't fetch Data: ${err}\n`
    }

}

const queryAddBook = async (bookData) => {
    const { title } = bookData
    // Prevent duplicate entries
    try {
        const duplicates = await Books.find({ title: title })
        if (duplicates.length > 0) {
            throw new Error("Book already in DB");
        }
        const newBook = new Books(bookData)
        newBook.bookId = uuidv4()
        await newBook.save()
        return { msg: "Book added Successfully", data: newBook }
    } catch (err) {
        return `Couldn't add book: ${err}\n`
    }
}
const queryUpdateBook = async (id, newData) => {
    console.log("Service:", id);
    const oldBook = await queryBookById(id)
    console.log("Service:", oldBook);
    try {
        const modBook = await Books.updateOne(
            { bookId: id },
            { $set: newData }
        );
        if (modBook.acknowledged === false) {
            throw new Error("update error");
        }
        if (modBook.modifiedCount === 0) {
            throw new Error("Book data unchanged");
        }
        if (modBook.matchedCount === 0) {
            throw new Error("Book not found");
        }
        const newBook = await queryBookById(id)
        console.log(`${oldBook} ===> ${newBook}`);
        return `Book updates successfully\n${oldBook}\n=== Updated to ===>\n${newBook}`
    } catch (err) {
        return `Couldn't update book: ${err}\n`
    }

}
const queryDeleteBook = async (id) => {
    try {
        const delBook = await Books.deleteOne({ bookId: id });
        if (delBook.acknowledged != true || delBook.deletedCount == 0)
            throw new Error("Book not found")
        return "Book deleted Successfully"
    }
    catch (err) {
        return `Couldn't delete book: ${err}\n`
    }
}


const services = {
    queryAllBooks,
    queryBookById,
    queryAddBook,
    queryUpdateBook,
    queryDeleteBook,
}

module.exports = services