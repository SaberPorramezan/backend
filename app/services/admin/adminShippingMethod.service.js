const { ShippingMethodModel } = require("../../models/shippingMethod.model");
const shippingMethodService = require("../shippingMethod.service");

class AdminShippingMethodService extends shippingMethodService {
  static async addShippingMethod(shippingMethodData) {
    const { title } = shippingMethodData;

    await this.isShippingMethodExistsByTitle(title);
    const shippingMethod = await ShippingMethodModel.create(shippingMethodData);

    return shippingMethod;
  }
}

module.exports = AdminShippingMethodService;
