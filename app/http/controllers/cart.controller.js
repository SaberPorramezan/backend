const { StatusCodes: HttpStatus } = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const Controller = require("./controller");
const CartService = require("../../services/cart.service");
const messages = require("../../../configs/messages");

class CartController extends Controller {
  addToCart = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const cartData = req.body;

    await CartService.addToCart(userId, cartData);

    this.sendSuccessResponse(res, HttpStatus.OK, {
      message: messages.success.cart.addedToCart,
    });
  });
  updateCartItem = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    await CartService.updateCartItem(userId, productId, quantity);

    this.sendSuccessResponse(res, HttpStatus.OK, {
      message: messages.success.cart.updatedCartItem,
    });
  });
  applyCouponToCart = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { couponCode } = req.body;

    await CartService.applyCouponToCart(userId, couponCode);

    this.sendSuccessResponse(res, HttpStatus.OK, {
      message: messages.success.cart.couponAppliedToCart,
    });
  });
  removeFromCart = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const productId = req.params.id;

    await CartService.removeFromCart(userId, productId);

    this.sendSuccessResponse(res, HttpStatus.OK, {
      message: messages.success.cart.removedFromCart,
    });
  });
  clearCart = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    await CartService.clearCart(userId);

    this.sendSuccessResponse(res, HttpStatus.OK, {
      message: messages.success.cart.cartCleared,
    });
  });
}

module.exports = new CartController();
