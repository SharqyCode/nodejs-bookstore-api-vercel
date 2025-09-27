const express = require("express");
const router = express.Router();
const {getAllAuthors,getAuthorById,addAuthor,updateAuthor,deleteAuthor} = require("./../controllers/author.controller");

// Get all authors

router.route("/").get(getAllAuthors).post(addAuthor);
router.route("/:id").get(getAuthorById).put(updateAuthor).delete(deleteAuthor);




module.exports = router;