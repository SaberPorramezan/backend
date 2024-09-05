const { StatusCodes: HttpStatus } = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const Controller = require("./controller");
const BrandService = require("../../services/brand.service");

class BrandController extends Controller {
  getListOfBrands = asyncHandler(async (req, res) => {
    const brands = await BrandService.getListOfBrands();

    this.sendSuccessResponse(res, HttpStatus.OK, { brands });
  });
  getBrandById = asyncHandler(async (req, res) => {
    const brandId = req.params.id;

    const brand = await BrandService.getBrandById(brandId);

    this.sendSuccessResponse(res, HttpStatus.OK, { brand });
  });
}

module.exports = new BrandController();
