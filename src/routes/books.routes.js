const bookModel = require("../models/book.model")
const express = require("express")
const bookRouter = express.Router()

bookRouter.post("/books", async (req, res) => {
    let books = await bookModel.create({
        title: "abc"
    })
    await books.save()
    res.send("posted")
})

module.exports = bookRouter