const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapasync.js");
const {
  indexRoute,
  showRoute,
  editRoute,
  updateRoute,
  renderCreate,
  createRoute,
  deleteRoute,
} = require("../controllers/books.js");
const { validateBook } = require("../middleware.js");
router.get("/new", renderCreate);
router
  .route("/")
  .get(wrapAsync(indexRoute))
  .post(validateBook, wrapAsync(createRoute));
router
  .route("/:id")
  .get(wrapAsync(showRoute))
  .put(validateBook, wrapAsync(updateRoute))
router.delete("/:id/delete",wrapAsync(deleteRoute));
router.route("/:id/edit").get(wrapAsync(editRoute));
module.exports = router;
