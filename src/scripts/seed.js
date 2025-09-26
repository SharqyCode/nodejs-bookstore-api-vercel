// src/scripts/seed.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Author = require("../models/author.model");
const Book = require("../models/book.model");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

dotenv.config();

async function seed() {
    try {
        await mongoose.connect(process.env.ATLAS_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connected to MongoDB...");

        // clear old data
        await Promise.all([Author.deleteMany({}), Book.deleteMany({}), User.deleteMany({})]);

        const authors = await Author.insertMany([
            { name: "George Orwell", bio: "English novelist and critic" },
            { name: "J.K. Rowling", bio: "British author, Harry Potter series" },
        ]);

        const books = await Book.insertMany([
            {
                bookId: "dd05e806-1a52-467b-a26d-2e1338378e61",
                title: "1984",
                author: authors[0]._id,
                publishedYear: 1949,
                genre: "Dystopian",
            },
            {
                bookId: "c5074a6f-4c58-4ec9-b0f9-3ae890b9743b",
                title: "Harry Potter and the Philosopher's Stone",
                author: authors[1]._id,
                publishedYear: 1997,
                genre: "Fantasy",
            },
        ]);

        const passwordHash = await bcrypt.hash("password123", 10);
        await User.create({
            username: "testuser",
            email: "test@example.com",
            password: passwordHash,
        });

        console.log("✅ Database seeded with authors, books, and user");
        process.exit(0);
    } catch (err) {
        console.error("❌ Error seeding database:", err);
        process.exit(1);
    }
}

seed();
