const { Ajv } = require("ajv");
const ajv = new Ajv({ coerceTypes: true, allErrors: true })

const addBookSchema = {
    type: "object",
    properties: {
        title: { type: "string" },
        description: { type: "string" },
        publishedYear: { type: "integer" },
        genre: {
            type: "string",
        },
        author: {
            type: "string",
        },
        coverImage: {
            type: "string", // URL or path if uploading with multer
        },
    },
    required: ["title", "author"],
    additionalProperties: false
}

const validateAddBook = ajv.compile(addBookSchema);


const updateBookSchema = {
    type: "object",
    properties: {
        title: { type: "string" },
        description: { type: "string" },
        publishedYear: { type: "integer" },
        genre: {
            type: "string",
        },
        author: {
            type: "string",
        },
        coverImage: {
            type: "string", // URL or path if uploading with multer
        },
    },
    additionalProperties: false
}

const validateUpdateBook = ajv.compile(updateBookSchema);


module.exports = { validateAddBook, validateUpdateBook }