// modules required for routing
import express from "express";
const router = express.Router();
export default router;

// define the book model
import book from "../Models/books";

/* GET books List page. READ */
router.get("/", (req, res, next) => {
  // find all books in the books collection
  book.find((err, books) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("books/index", {
        title: "Books",
        page: "books",
        books: books,
      });
    }
  });
});

//  GET the Book Details page in order to add a new Book
router.get("/add", (req, res, next) => {
  res.render("books/details", {
    title: "Add",
    page: "details",
    books: "",
  });
});

// POST process the Book Details page and create a new Book - CREATE
router.post("/add", (req, res, next) => {
  // instantiate a new book
  let newBook = new book({
    Title: req.body.title,
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre,
  });

  // db.book.insert({book data is here...})
  book.create(newBook, (err) => {
    if (err) {
      console.error(err);
      res.end(err);
    }

    res.redirect("/books");
  });
});

// GET the Book Details page in order to edit an existing Book
router.get("/edit/:id", (req, res, next) => {
  let id = req.params.id;
  // database syntax -> db.book.find({ _id: id });
  book.findById(id, {}, {}, (err, bookItemToEdit) => {
    if (err) {
      return console.error(err);
      res.end(err);
    }
    res.render("books/details", {
      title: "Edit",
      page: "details",
      books: bookItemToEdit,
    });
  });
});

// POST - process the information passed from the details form and update the document
router.post("/edit/:id", (req, res, next) => {
  let id = req.params.id;

  // instantiate a new contacts Item
  let updatedBookItem = new book({
    _id: id,
    Title: req.body.title,
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre,
  });

  // find the contacts item via db.contacts.update({"_id":id}) and then update
  book.updateOne({ _id: id }, updatedBookItem, {}, (err) => {
    if (err) {
      console.error(err);
      res.end(err);
    }

    res.redirect("/books");
  });
});

// GET - process the delete by user id
router.get("/delete/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
});

//module.exports = router;
