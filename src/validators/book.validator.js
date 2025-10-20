const { Ajv } = require("ajv");
const { default: mongoose } = require("mongoose");
const ajv = new Ajv()

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
    required: ["title"],
    additionalProperties: false
}

const validateAddBook = ajv.compile(addBookSchema).schema;


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

const validateUpdateBook = ajv.compile(updateBookSchema).schema;


module.exports = { validateAddBook, validateUpdateBook }