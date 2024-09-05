const createHttpError = require("http-errors");
const { AddressModel } = require("../models/address.model");
const messages = require("../../configs/messages");

class AddressService {
  static async addAddress(userId, addressData) {
    const { isPrimary } = addressData;

    if (isPrimary) await this.clearPrimaryAddress(userId);

    const addressExists = await this.isAddressDuplicate(userId, addressData);
    if (addressExists)
      throw createHttpError.Conflict(messages.errors.address.duplicateAddress);

    const address = await AddressModel.create({
      ...addressData,
      user: userId,
    });

    return address;
  }
  static async updateAddress(userId, addressId, addressData) {
    const { isPrimary } = addressData;

    const address = await AddressModel.findOne({
      _id: addressId,
      user: userId,
    });
    if (!address)
      throw createHttpError.Forbidden(
        messages.errors.address.addressNotFoundOrUnauthorized
      );

    if (isPrimary) await this.clearPrimaryAddress(userId);

    Object.assign(address, addressData);
    await address.save();

    return address;
  }

  // Utility methods
  static async isAddressOwnedByUser(userId, addressId) {
    const addressExists = await AddressModel.exists({
      _id: addressId,
      user: userId,
    });

    if (!addressExists)
      throw createHttpError.Forbidden(
        messages.errors.address.addressNotFoundOrUnauthorized
      );

    return addressExists;
  }
  static async isAddressDuplicate(userId, addressData) {
    const existingAddress = await AddressModel.findOne({
      user: userId,
      street: addressData.street,
      city: addressData.city,
      region: addressData.region,
      postalCode: addressData.postalCode,
    });

    return !!existingAddress;
  }
  static async clearPrimaryAddress(userId) {
    await AddressModel.updateMany(
      { user: userId, isPrimary: true },
      { isPrimary: false }
    );
  }
}

module.exports = AddressService;
