const { validate: uuidValidate } = require('uuid')
const { validateAddBook, validateUpdateBook } = require('../validators/book.validator')
const Ajv = require("ajv")
const ajv = new Ajv()
function validateId(req, res, next, id) {
    if (uuidValidate(id))
        next()
    else
        res.status(400).json({ status: "BAD REQUEST", message: "Couldn't execute query: Invalid ID", errors: schemaValidator.errors, })
}

function AddBookMiddleWare(schemaValidator) {
    return (req, res, next) => {
        const valid = schemaValidator(req.body);

        console.log('AJV validation result:', valid);
        console.log('AJV errors:', schemaValidator.errors);

        if (valid) {
            next();
        } else {
            res.status(400).json({
                status: "BAD REQUEST",
                message: "Couldn't add book: invalid book data",
                errors: schemaValidator.errors,
            });
        }
    };
}


function updateBookMiddleWare(schemaValidator) {
    return (req, res, next) => {
        let valid = schemaValidator(req.body)
        console.log('AJV validation result:', valid);
        console.log('AJV errors:', schemaValidator.errors);
        if (valid)
            next()
        else {
            res.status(400).json({
                status: "BAD REQUEST", message: "Couldn't update book: invalid book data", errors: schemaValidator.errors,
            })
        }
    }
}

module.exports = { validateId, AddBookMiddleWare, updateBookMiddleWare }