const Author = require("./../models/author.model");



const queryAllAuthors = async () => {
  try {
    const authors = await Author.find().populate("books");
    if (!authors.length) throw new Error("No authors found");
    return authors;
  } catch (err) {
    return { error: err.message };
  }
};


const queryAuthorById = async (id) => {
  try {
    const author = await Author.findById(id).populate("books");
    if (!author) throw new Error("Author not found");
    return author;
  } catch (err) {
    return { error: err.message };
  }
};

const queryAddAuthor = async (authorData) => {
  try {
    const newAuthor = new Author(authorData);
    await newAuthor.save();
    return { msg: "Author added successfully", data: newAuthor };
  } catch (err) {
    return { error: err.message };
  }
};

const queryUpdateAuthor = async (id, authorData) => {
  try {
    const updatedAuthor = await Author.findByIdAndUpdate(id, authorData, {
      new: true,
    }).populate("books");

    if (!updatedAuthor) throw new Error("Author not found");
    return { msg: "Author updated successfully", data: updatedAuthor };
  } catch (err) {
    return { error: err.message };
  }
};

const queryDeleteAuthor = async (id) => {
  try {
    const deletedAuthor = await Author.findByIdAndDelete(id);
    if (!deletedAuthor) throw new Error("Author not found");
    return { msg: "Author deleted successfully" };
  } catch (err) {
    return { error: err.message };
  }
};

module.exports = {
  queryAllAuthors,
  queryAuthorById,
  queryAddAuthor,
  queryUpdateAuthor,
  queryDeleteAuthor,
};
