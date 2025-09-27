const services = require("./../services/author.service");

const getAllAuthors = async (req, res) => {
  const data = await services.queryAllAuthors();
  res.json(data);
};

const getAuthorById = async (req, res) => {
  const data = await services.queryAuthorById(req.params.id);
  res.json(data);
};

const addAuthor = async (req, res) => {
  const data = await services.queryAddAuthor(req.body);
  res.json(data);
};

const updateAuthor = async (req, res) => {
  const data = await services.queryUpdateAuthor(req.params.id, req.body);
  res.json(data);
};

const deleteAuthor = async (req, res) => {
  const data = await services.queryDeleteAuthor(req.params.id);
  res.json(data);
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  addAuthor,
  updateAuthor,
  deleteAuthor,
};
