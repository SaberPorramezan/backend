const { StatusCodes: HttpStatus } = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const Controller = require("./controller");
const AddressService = require("../../services/address.service");
const messages = require("../../../configs/messages");

class AddressController extends Controller {
  addAddress = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const addressData = req.body;

    const address = await AddressService.addAddress(userId, addressData);

    this.sendSuccessResponse(res, HttpStatus.CREATED, {
      address,
      message: messages.success.address.addressAdded,
    });
  });
  updateAddress = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const addressId = req.params.id;
    const addressData = req.body;

    const address = await AddressService.updateAddress(
      userId,
      addressId,
      addressData
    );

    this.sendSuccessResponse(res, HttpStatus.OK, {
      address,
      message: messages.success.address.addressUpdated,
    });
  });
}

module.exports = new AddressController();
