const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const bookSchema = new mongoose.Schema(
    {
        bookId: {
            type: String,
            required: true,
            trim: true,
            immutable: true,
            unique: true,
            default: uuidv4
        },
        title: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        description: {
            type: String,
        },
        publishedYear: {
            type: Number,
        },
        genre: {
            type: String,
            default: "Unknown"
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Author",
            required: true,
        },
        coverImage: {
            type: String, // URL or path if uploading with multer
            default: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
