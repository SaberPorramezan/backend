const createHttpError = require("http-errors");
const { PaymentModel } = require("../models/payment.model");
const OrderService = require("./order.service");
const CreditCardService = require("./creditCard.service");
const { PAYMENT_STATUS, PAYMENT_METHODS } = require("../../configs/constants");
const {
  generateRandomString,
  generateRandomNumber,
} = require("../../utils/utils");
const messages = require("../../configs/messages");

class PaymentService {
  static async createPayment(userId, paymentDetails) {
    const { orderId, paymentMethod, creditCard } = paymentDetails;

    const order = await OrderService.findOrderById(orderId);
    await this.checkExistingSuccessfulPayment(orderId);

    if (creditCard)
      await CreditCardService.isCreditCardOwnedByUser(userId, creditCard);

    const payment = new PaymentModel({
      user: userId,
      order: order._id,
      amount: order.finalPrice,
      paymentMethod,
      creditCardId: creditCard,
      transactionId: `TXN${generateRandomNumber(10)}`,
      description: `Payment for order ${order.orderId}`,
    });

    const processPayment = await this.processPayment(payment, paymentMethod);

    if (processPayment.status !== PAYMENT_STATUS.SUCCESS)
      throw createHttpError.PaymentRequired(
        messages.errors.payment.paymentFailed
      );

    return processPayment;
  }

  // Utility methods
  static async processPayment(payment, paymentMethod) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (paymentMethod === PAYMENT_METHODS.PAYPAL) {
      await this.fakePayPalPayment(payment);
    } else if (paymentMethod === PAYMENT_METHODS.CREDIT_CARD) {
      await this.fakeCreditCardPayment(payment);
    }

    await OrderService.updateOrderStatus(payment);

    await payment.save();

    return payment;
  }
  static async fakePayPalPayment(payment) {
    const isSuccess = Math.random() > 0.5;

    payment.paypalTransactionId = `PAYID-${generateRandomString(24)}`;
    payment.payerId = generateRandomString(20);

    if (isSuccess) {
      payment.status = PAYMENT_STATUS.SUCCESS;
      payment.isPaid = true;
    } else {
      payment.status = PAYMENT_STATUS.FAILED;
    }
  }
  static async fakeCreditCardPayment(payment) {
    const isSuccess = Math.random() > 0.5;

    if (isSuccess) {
      payment.status = PAYMENT_STATUS.SUCCESS;
      payment.isPaid = true;
    } else {
      payment.status = PAYMENT_STATUS.FAILED;
    }
  }
  static async findPaymentById(paymentId) {
    const payment = await PaymentModel.findById(paymentId);
    if (!payment)
      throw createHttpError.NotFound(messages.errors.payment.paymentNotFound);

    return payment;
  }
  static async checkExistingSuccessfulPayment(orderId) {
    const existingPayment = await PaymentModel.findOne({
      order: orderId,
      status: PAYMENT_STATUS.SUCCESS,
    });

    if (existingPayment)
      throw createHttpError.BadRequest(
        messages.errors.payment.paymentAlreadyProcessed
      );
  }
}

module.exports = PaymentService;
