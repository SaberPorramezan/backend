const { StatusCodes: HttpStatus } = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const Controller = require("./controller");
const ProductService = require("../../services/product.service");

class ProductController extends Controller {
  getListOfProducts = asyncHandler(async (req, res) => {
    const query = req.query;

    const products = await ProductService.getListOfProducts(query);

    this.sendSuccessResponse(res, HttpStatus.OK, products);
  });
  getProductById = asyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await ProductService.getProductById(productId);

    this.sendSuccessResponse(res, HttpStatus.OK, { product });
  });
  searchProducts = asyncHandler(async (req, res) => {
    const productName = req.query.q;
    const products = await ProductService.searchProducts(productName);

    this.sendSuccessResponse(res, HttpStatus.OK, { products });
  });
}

module.exports = new ProductController();
