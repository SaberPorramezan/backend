const expressAsyncHandler = require("express-async-handler");
const ProductController = require("../http/controllers/product.controller");

const router = require("express").Router();

router.get("/list", expressAsyncHandler(ProductController.getListOfProducts));
router.get("/:id", expressAsyncHandler(ProductController.getProductById));
router.get(
  "/list/search",
  expressAsyncHandler(ProductController.searchProducts)
);

module.exports = {
  productRoutes: router,
};
