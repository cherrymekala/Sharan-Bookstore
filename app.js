const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
const path = require("path");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const mongoose = require("mongoose");

const dbUrl ="mongodb+srv://umarfarooq8226:UMlEK3lL6KjBNYs1@cluster0.o3mgwng.mongodb.net/?retryWrites=true&w=majority";
async function main() {
  await mongoose.connect(dbUrl);
}
main();

const booksRouter = require("./routes/books.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});
app.get("/", (req, res) => {
  res.redirect("/books");
});
app.use("/books", booksRouter);

app.use((err, req, res, next) => {
  let { status = 500, message = "Error Occured" } = err;
  console.log(err);
  res.status(status).render("error.ejs", { err });
});
app.listen(4000);
