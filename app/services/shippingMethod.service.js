const mongoose = require("mongoose");
const createHttpError = require("http-errors");
const { ShippingMethodModel } = require("../models/shippingMethod.model");
const messages = require("../../configs/messages");

class shippingMethodService {
  static async getListOfShippingMethods() {
    const shippingMethods = await ShippingMethodModel.find({});

    return shippingMethods;
  }
  static async getShippingMethodById(shippingMethodId) {
    if (!mongoose.Types.ObjectId.isValid(shippingMethodId))
      throw createHttpError.BadRequest(messages.errors.general.invalidId);

    const shippingMethod = this.findShippingMethodById(shippingMethodId);
    return shippingMethod;
  }

  // Utility methods
  static async findShippingMethodById(shippingMethodId) {
    const shippingMethod = await ShippingMethodModel.findById(shippingMethodId);
    if (!shippingMethod)
      throw createHttpError.NotFound(
        messages.errors.shippingMethod.shippingMethodNotFound
      );

    return shippingMethod;
  }
  static async isShippingMethodExistsByTitle(title) {
    const isShippingMethodExists = await ShippingMethodModel.exists({ title });
    if (isShippingMethodExists)
      throw createHttpError.Conflict(
        messages.errors.shippingMethod.shippingMethodExists
      );

    return isShippingMethodExists;
  }
}

module.exports = shippingMethodService;
