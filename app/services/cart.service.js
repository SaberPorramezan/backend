const createHttpError = require("http-errors");
const mongoose = require("mongoose");
const { CartModel } = require("../models/cart.model");
const ProductService = require("../services/product.service");
const CouponService = require("./coupon.service");
const { roundNumber } = require("../../utils/utils");
const messages = require("../../configs/messages");

class CartService {
  static async addToCart(userId, cartData) {
    const { productId, selectedColor } = cartData;

    const cart = await this.findUserCart(userId);
    let cartItem = this.findCartItem(cart, productId);

    const currentQuantity = cartItem ? cartItem.quantity : 0;
    const newQuantity = currentQuantity + 1;

    await ProductService.checkProductAvailability(productId, newQuantity);

    if (cartItem) {
      cartItem.quantity = newQuantity;
    } else {
      cartItem = { product: productId, quantity: 1, selectedColor };
      cart.items.push(cartItem);
    }

    await cart.save();
  }
  static async updateCartItem(userId, productId, quantity) {
    await ProductService.checkProductAvailability(productId, quantity);

    const cart = await this.findUserCart(userId);
    const cartItem = this.findCartItem(cart, productId);
    if (!cartItem)
      throw createHttpError.NotFound(messages.errors.cart.productNotInCart);

    cartItem.quantity = quantity;
    await cart.save();
  }
  static async applyCouponToCart(userId, couponCode) {
    const cart = await this.findUserCart(userId);
    if (cart.items.length === 0)
      throw createHttpError.NotFound(messages.errors.cart.cartAlreadyEmpty);

    const totalPrice = this.calculateCartTotalPrice(cart);

    const { couponDetails } = await CouponService.processCoupon(
      couponCode,
      totalPrice
    );
    cart.coupon = couponDetails._id;

    await cart.save();
  }
  static async removeFromCart(userId, productId) {
    if (!mongoose.Types.ObjectId.isValid(productId))
      throw createHttpError.BadRequest(messages.errors.general.invalidId);

    const cart = await this.findUserCart(userId);
    const cartItem = this.findCartItem(cart, productId);
    if (!cartItem)
      throw createHttpError.NotFound(messages.errors.cart.productNotInCart);

    cart.items = cart.items.filter((item) => !item.product.equals(productId));
    await cart.save();
  }
  static async clearCart(userId) {
    const cart = await this.findUserCart(userId);
    if (cart.items.length === 0 && !cart.coupon)
      throw createHttpError.BadRequest(messages.errors.cart.cartAlreadyEmpty);

    cart.items = [];
    cart.coupon = null;
    await cart.save();
  }

  // Utility methods
  static async findUserCart(userId) {
    let cart = await CartModel.findOne({ user: userId }).populate(
      "items.product"
    );
    if (!cart) cart = new CartModel({ user: userId });

    return cart;
  }
  static findCartItem(cart, productId) {
    return cart.items.find((item) => item.product.equals(productId));
  }
  static calculateCartTotalPrice(cart) {
    return cart.items.reduce(
      (totalPrice, { product: { price }, quantity }) =>
        totalPrice + price * quantity,
      0
    );
  }
  static calculateCartTotalDiscount(cart) {
    return cart.items.reduce(
      (totalDiscount, { product: { price, discount, offPrice }, quantity }) => {
        const offAmount = discount ? price - offPrice : 0;
        return totalDiscount + offAmount * quantity;
      },
      0
    );
  }
  static async calculateCartTotals(cart) {
    const { coupon } = cart;

    const totalPrice = this.calculateCartTotalPrice(cart);
    let totalDiscount = this.calculateCartTotalDiscount(cart);
    let finalPrice = totalPrice - totalDiscount;

    if (coupon) {
      const { couponDiscount } = await CouponService.processCoupon(
        coupon,
        finalPrice
      );

      totalDiscount += couponDiscount;
      finalPrice -= couponDiscount;
    }

    return {
      totalPrice: roundNumber(totalPrice),
      totalDiscount: roundNumber(totalDiscount),
      finalPrice: roundNumber(finalPrice),
    };
  }
}

module.exports = CartService;
