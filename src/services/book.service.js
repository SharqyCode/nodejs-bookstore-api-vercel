const Books = require("../models/book.model")
const { v4: uuidv4 } = require("uuid")

const queryAllBooks = async () => {
    try {
        const books = await Books.find().populate("author")
        if (books.length === 0) {
            throw new Error("No books in DB");
        }
        return { status: 'OK', data: books }
    } catch (err) {
        return { status: "NO CONTENT", message: `Couldn't fetch Data: ${err}\n` }
    }
}
const queryBookById = async (id) => {
    try {
        const book = await Books.findOne({ bookId: id }).populate("author")
        if (!book) {
            throw new Error("Book not found");
        }
        return { status: 'OK', data: book }
    } catch (err) {
        return { status: 'NO CONTENT', message: `Couldn't fetch Data: ${err}\n` }
    }

}

const queryAddBook = async (bookData) => {
    const { title } = bookData
    try {
        const duplicates = await Books.find({ title: title })
        if (duplicates.length > 0) {
            throw new Error("Book already in DB");
        }
        const newBook = new Books(bookData)
        newBook.bookId = uuidv4()
        await newBook.save()
        return { status: "CREATED", message: "Book added Successfully", data: newBook }
    } catch (err) {
        return { status: 'BAD REQUEST', message: `Couldn't fetch Data: ${err}` }
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
        return { status: "OK", message: "Book updated Successfully", oldData: oldBook, newData: newBook }
    } catch (err) {
        return {
            status: "BAD REQUEST", message: `Couldn't update book: ${err}`
        }
    }

}

const queryDeleteBook = async (id) => {
    try {
        const delBook = await Books.deleteOne({ bookId: id });
        if (delBook.acknowledged != true || delBook.deletedCount == 0)
            throw new Error("Book not found")
        return { status: "OK", message: "Book deleted Successfully" }
    }
    catch (err) {
        return { status: "400", message: `Couldn't delete book: ${err}` }
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