const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        bio: {
            type: String,
        },
        birthDate: {
            type: Date,
        },
        books: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book",
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Author", authorSchema);

