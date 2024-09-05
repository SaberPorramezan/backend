const { StatusCodes: HttpStatus } = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const Controller = require("./controller");
const CategoryService = require("../../services/category.service");

class CategoryController extends Controller {
  getListOfCategories = asyncHandler(async (req, res) => {
    const categories = await CategoryService.getListOfCategories();

    this.sendSuccessResponse(res, HttpStatus.OK, { categories });
  });
  getCategoryById = asyncHandler(async (req, res) => {
    const categoryId = req.params.id;
    const category = await CategoryService.getCategoryById(categoryId);

    this.sendSuccessResponse(res, HttpStatus.OK, { category });
  });
}

module.exports = new CategoryController();
