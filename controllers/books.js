const books = require("../models/books.js");

module.exports.indexRoute = async (req, res, next) => {
  const allBooks = await books.find({});
  res.render("books/index.ejs", { allBooks });
};
module.exports.renderCreate = async (req, res) => {
  res.render("books/create.ejs");
};

module.exports.createRoute = async (req, res) => {
  const newBook = new books(req.body.book);
  await newBook.save();
  res.redirect("/books");
};

module.exports.showRoute = async (req, res) => {
  let { id } = req.params;
  const book = await books.findById(id);
  if (!book) {
    req.flash("error", "Book not found");
    res.redirect("/books");
  }
  res.render("books/show.ejs", { book });
};

module.exports.editRoute = async (req, res, next) => {
  let { id } = req.params;
  const book = await books.findById(id);
  if (!book) {
    req.flash("error", "Book not exists");
    res.redirect("/books");
  }
  res.render("books/edit.ejs", { book });
};

module.exports.updateRoute = async (req, res, next) => {
  let { id } = req.params;
  let reqBook = await books.findByIdAndUpdate(id, { ...req.body.book });
  await reqBook.save();
  req.flash("success", "Book Updated");
  res.redirect(`/books/${id}`);
};

module.exports.deleteRoute = async (req, res) => {
  let { id } = req.params;
  await books.findByIdAndDelete(id);
  req.flash("success", "Book Deleted");
  res.redirect("/books");
};
