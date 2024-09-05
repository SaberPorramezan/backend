const { StatusCodes: HttpStatus } = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const Controller = require("./controller");
const WishlistService = require("../../services/wishlist.service");
const messages = require("../../../configs/messages");

class WishlistController extends Controller {
  addToWishlist = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { productId } = req.body;

    await WishlistService.addToWishlist(productId, userId);

    this.sendSuccessResponse(res, HttpStatus.CREATED, {
      message: messages.success.wishlist.addedToWishlist,
    });
  });
  removeFromWishlist = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const productId = req.params.id;

    await WishlistService.removeFromWishlist(productId, userId);

    this.sendSuccessResponse(res, HttpStatus.CREATED, {
      message: messages.success.wishlist.removedFromWishlist,
    });
  });
}

module.exports = new WishlistController();
