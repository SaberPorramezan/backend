const expressAsyncHandler = require("express-async-handler");
const CategoryController = require("../http/controllers/category.controller");

const router = require("express").Router();

router.get(
  "/list",
  expressAsyncHandler(CategoryController.getListOfCategories)
);
router.get("/:id", expressAsyncHandler(CategoryController.getCategoryById));

module.exports = {
  categoryRoutes: router,
};
