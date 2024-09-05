const mongoose = require("mongoose");
const createHttpError = require("http-errors");
const { BrandModel } = require("../models/brand.model");
const messages = require("../../configs/messages");

class BrandService {
  static async getListOfBrands() {
    const brands = await BrandModel.find({});

    return brands;
  }
  static async getBrandById(brandId) {
    if (!mongoose.Types.ObjectId.isValid(brandId))
      throw createHttpError.BadRequest(messages.errors.general.invalidId);

    const brand = this.findBrandById(brandId);

    return brand;
  }

  // Utility methods
  static async findBrandById(brandId) {
    const brand = await BrandModel.findById(brandId);
    if (!brand)
      throw createHttpError.NotFound(messages.errors.brand.brandNotFound);

    return brand;
  }
  static async isBrandExistsById(brandId) {
    const isBrandExists = await BrandModel.exists({ _id: brandId });
    if (!isBrandExists)
      throw createHttpError.NotFound(messages.errors.brand.brandNotFound);

    return isBrandExists;
  }
  static async isBrandExistsByTitle(title) {
    const isBrandExists = await BrandModel.exists({ title });
    if (isBrandExists)
      throw createHttpError.Conflict(messages.errors.brand.brandExists);

    return isBrandExists;
  }
}

module.exports = BrandService;
