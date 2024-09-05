const { StatusCodes: HttpStatus } = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const Controller = require("../controller");
const AdminProductService = require("../../../services/admin/adminProduct.service");
const messages = require("../../../../configs/messages");

class AdminProductController extends Controller {
  addProduct = asyncHandler(async (req, res) => {
    const productData = req.body;

    const product = await AdminProductService.addProduct(productData);

    this.sendSuccessResponse(res, HttpStatus.CREATED, {
      product,
      message: messages.success.product.productAdded,
    });
  });
}

module.exports = new AdminProductController();
