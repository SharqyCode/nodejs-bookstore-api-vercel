const { validate: uuidValidate } = require('uuid')
const { validateAddBook, validateUpdateBook } = require('../validators/book.validator')
const Ajv = require("ajv")
const ajv = new Ajv()
function validateId(req, res, next, id) {
    if (uuidValidate(id))
        next()
    else
        res.status(400).json({ status: "BAD REQUEST", message: "Couldn't execute query: Invalid ID" })
}

function AddBookMiddleWare(schema) {
    return (req, res, next) => {

        console.log(validateAddBook);
        if (ajv.validate(validateAddBook, req.body)) {
            next()
        }
        else {
            res.status(400).json({ status: "BAD REQUEST", message: "Couldn't add book: invalid book data" })
        }
    }
}

function updateBookMiddleWare(schema) {
    return (req, res, next) => {
        if (ajv.validate(validateUpdateBook, req.body))
            next()
        else {
            res.status(400).json({
                status: "BAD REQUEST", message: "Couldn't update book: invalid book data"
            })
        }
    }
}

module.exports = { validateId, AddBookMiddleWare, updateBookMiddleWare }