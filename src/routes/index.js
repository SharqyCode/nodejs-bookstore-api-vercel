const express = require("express");
const userRouter = require("./user.routes");
const bookRouter = require("./books.routes");
const authorRouter = require("./authors.routes");

const router = express.Router();

router.use("/books", bookRouter);
router.use("/authors", authorRouter);
router.use("/u", userRouter);
router.use("/", (req,res)=>{
    res.send("WELCOME")
})

module.exports = router;
