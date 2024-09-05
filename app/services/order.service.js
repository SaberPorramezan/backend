const createHttpError = require("http-errors");
const { OrderModel } = require("../models/order.model");
const CartService = require("./cart.service");
const AddressService = require("./address.service");
const shippingMethodService = require("./shippingMethod.service");
const { ORDER_STATUS, PAYMENT_STATUS } = require("../../configs/constants");
const { generateRandomNumber, roundNumber } = require("../../utils/utils");
const messages = require("../../configs/messages");

class OrderService {
  static async createOrder(userId, orderDetails) {
    const { shippingAddress, billingAddress, shippingMethod } = orderDetails;

    const cart = await CartService.findUserCart(userId);
    if (cart.items.length === 0)
      throw createHttpError.BadRequest(messages.errors.cart.cartAlreadyEmpty);

    let { totalPrice, totalDiscount, finalPrice } =
      await CartService.calculateCartTotals(cart);

    await Promise.all([
      AddressService.isAddressOwnedByUser(userId, orderDetails.shippingAddress),
      AddressService.isAddressOwnedByUser(userId, orderDetails.billingAddress),
    ]);

    const { cost: shippingCost } =
      await shippingMethodService.findShippingMethodById(shippingMethod);
    const finalPriceWithShipping = finalPrice + shippingCost;

    const orderItems = cart.items.map(
      ({
        product: { _id, price, discount, offPrice },
        quantity,
        selectedColor,
      }) => ({
        product: _id,
        quantity,
        price,
        offPrice: discount ? offPrice : 0,
        totalPrice: +(offPrice * quantity).toFixed(2),
        selectedColor,
      })
    );

    const order = new OrderModel({
      orderId: `#${generateRandomNumber(10)}`,
      user: userId,
      items: orderItems,
      totalPrice,
      totalDiscount,
      finalPrice: roundNumber(finalPriceWithShipping),
      coupon: cart?.coupon,
      status: ORDER_STATUS.PENDING,
      paymentStatus: PAYMENT_STATUS.PENDING,
      shippingCost,
      shippingAddress,
      billingAddress: billingAddress || shippingAddress,
      shippingMethod,
    });
    await order.save();

    await CartService.clearCart(userId);

    return order;
  }

  // Utility methods
  static async findOrderById(orderId) {
    const order = await OrderModel.findById(orderId);
    if (!order)
      throw createHttpError.NotFound(messages.errors.order.orderNotFound);

    return order;
  }
  static async updateOrderStatus(statusUpdate) {
    const {
      order: orderId,
      _id: paymentId,
      status,
      isPaid,
      paymentMethod,
    } = statusUpdate;

    const order = await this.findOrderById(orderId);

    order.paymentStatus = status;
    order.isPaid = isPaid;
    order.paymentMethod = paymentMethod;
    order.payment = paymentId;
    await order.save();

    return order;
  }
}

module.exports = OrderService;
