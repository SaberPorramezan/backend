const { StatusCodes: HttpStatus } = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const Controller = require("./controller");
const ShippingMethodService = require("../../services/shippingMethod.service");

class ShippingMethodController extends Controller {
  getListOfShippingMethods = asyncHandler(async (req, res) => {
    const shippingMethods =
      await ShippingMethodService.getListOfShippingMethods();

    this.sendSuccessResponse(res, HttpStatus.OK, { shippingMethods });
  });
  getShippingMethodById = asyncHandler(async (req, res) => {
    const shippingMethodId = req.params.id;

    const shippingMethod = await ShippingMethodService.getShippingMethodById(
      shippingMethodId
    );

    this.sendSuccessResponse(res, HttpStatus.OK, { shippingMethod });
  });
}

module.exports = new ShippingMethodController();
