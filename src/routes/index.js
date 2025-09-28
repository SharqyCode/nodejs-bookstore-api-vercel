const express = require("express");
const userRouter = require("./user.routes");
const bookRouter = require("./books.routes");
const authorRouter = require("./authors.routes");

const router = express.Router();

router.use("/api/books", bookRouter);
router.use("/api/authors", authorRouter);
router.use("/u", userRouter);
router.use("/", (req,res)=>{
    res.send("WELCOME")
})

module.exports = router;
