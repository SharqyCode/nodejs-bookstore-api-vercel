const { validate: uuidValidate } = require('uuid')
const { validateAddBook, validateUpdateBook } = require('../validators/book.validator')

function validateId(req, res, next, id) {
    if (uuidValidate(id))
        next()
    else
        res.send("Couldn't execute query: Invalid ID")
}

function AddBookMiddleWare(schema) {
    return (req, res, next) => {
        if (validateAddBook(schema))
            next()
        else {
            res.send("Couldn't add book: invalid book data")
        }
    }
}

function updateBookMiddleWare(schema) {
    return (req, res, next) => {
        if (validateUpdateBook(schema))
            next()
        else {
            res.send("Couldn't update book: invalid book data")
        }
    }
}

module.exports = { validateId, AddBookMiddleWare, updateBookMiddleWare }