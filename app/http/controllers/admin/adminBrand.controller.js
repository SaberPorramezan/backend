const { StatusCodes: HttpStatus } = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const Controller = require("../controller");
const AdminBrandService = require("../../../services/admin/adminBrand.service");
const messages = require("../../../../configs/messages");

class AdminBrandController extends Controller {
  addBrand = asyncHandler(async (req, res) => {
    const brandData = req.body;

    const brand = await AdminBrandService.addBrand(brandData);

    this.sendSuccessResponse(res, HttpStatus.CREATED, {
      brand,
      message: messages.success.brand.brandAdded,
    });
  });
  updateBrand = asyncHandler(async (req, res) => {
    const brandId = req.params.id;
    const brandData = req.body;

    const updatedBrand = await AdminBrandService.updateBrand(
      brandId,
      brandData
    );

    this.sendSuccessResponse(res, HttpStatus.OK, {
      brand: updatedBrand,
      message: messages.success.brand.brandUpdated,
    });
  });
  removeBrand = asyncHandler(async (req, res) => {
    const brandId = req.params.id;

    await AdminBrandService.removeBrand(brandId);

    this.sendSuccessResponse(res, HttpStatus.OK, {
      message: messages.success.brand.brandRemoved,
    });
  });
}

module.exports = new AdminBrandController();
