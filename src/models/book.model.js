const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        bookId: {
            type: String,
            required: true,
            trim: true,
            immutable: true,
            unique: true
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
            type: String,
        },
        genre: {
            type: String,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Author",
            // required: true,
        },
        coverImage: {
            type: String, // URL or path if uploading with multer
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
