const mongoose = require("mongoose");
const createHttpError = require("http-errors");
const { WishlistModel } = require("../models/wishlist.model");
const ProductService = require("../services/product.service");
const messages = require("../../configs/messages");

class WishlistService {
  static async addToWishlist(productId, userId) {
    if (!mongoose.Types.ObjectId.isValid(productId))
      throw createHttpError.BadRequest(messages.errors.general.invalidId);

    await ProductService.isProductExistsById(productId);
    const wishlist = await this.findUserWishlist(userId);
    if (wishlist.products.includes(productId))
      throw createHttpError.Conflict(
        messages.errors.wishlist.productAlreadyInWishlist
      );

    wishlist.products.push(productId);
    await wishlist.save();

    return wishlist;
  }
  static async removeFromWishlist(productId, userId) {
    if (!mongoose.Types.ObjectId.isValid(productId))
      throw createHttpError.BadRequest(messages.errors.general.invalidId);

    const wishlist = await this.findUserWishlist(userId);
    const wishlistItem = wishlist.products.find((product) =>
      product.equals(productId)
    );
    if (!wishlistItem)
      throw createHttpError.NotFound(
        messages.errors.wishlist.productNotFoundInWishlist
      );

    wishlist.products = wishlist.products.filter(
      (product) => !product.equals(productId)
    );
    await wishlist.save();
  }

  // Utility methods
  static async findUserWishlist(userId) {
    let wishlist = await WishlistModel.findOne({ user: userId });
    if (!wishlist) wishlist = new WishlistModel({ user: userId });

    return wishlist;
  }
}

module.exports = WishlistService;
