const { StatusCodes: HttpStatus } = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const Controller = require("../controller");
const AdminCategoryService = require("../../../services/admin/adminCategory.service");
const messages = require("../../../../configs/messages");

class AdminCategoryController extends Controller {
  addCategory = asyncHandler(async (req, res) => {
    const categoryData = req.body;

    const category = await AdminCategoryService.addCategory(categoryData);

    this.sendSuccessResponse(res, HttpStatus.CREATED, {
      category,
      message: messages.success.category.categoryAdded,
    });
  });
  updateCategory = asyncHandler(async (req, res) => {
    const categoryId = req.params.id;

    const updatedCategory = await AdminCategoryService.updateCategory(
      categoryId,
      req.body
    );
    this.sendSuccessResponse(res, HttpStatus.OK, {
      category: updatedCategory,
      message: messages.success.category.categoryUpdated,
    });
  });
  removeCategory = asyncHandler(async (req, res) => {
    const categoryId = req.params.id;
    await AdminCategoryService.removeCategory(categoryId);

    this.sendSuccessResponse(res, HttpStatus.OK, {
      message: messages.success.category.categoryRemoved,
    });
  });
}

module.exports = new AdminCategoryController();
