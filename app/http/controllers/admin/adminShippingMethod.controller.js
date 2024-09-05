const { StatusCodes: HttpStatus } = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const Controller = require("../controller");
const AdminShippingMethodService = require("../../../services/admin/adminShippingMethod.service");
const messages = require("../../../../configs/messages");

class AdminShippingMethodController extends Controller {
  addShippingMethod = asyncHandler(async (req, res) => {
    const shippingMethodData = req.body;

    const shippingMethod = await AdminShippingMethodService.addShippingMethod(
      shippingMethodData
    );

    this.sendSuccessResponse(res, HttpStatus.CREATED, {
      shippingMethod,
      message: messages.success.shippingMethod.shippingMethodAdded,
    });
  });
}

module.exports = new AdminShippingMethodController();
