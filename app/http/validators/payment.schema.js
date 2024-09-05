const Joi = require("../../../configs/joi.config");
const {
  MongoIDPattern,
  PAYMENT_METHODS,
} = require("../../../configs/constants");
const messages = require("../../../configs/messages");

const createPaymentSchema = Joi.object({
  orderId: Joi.string()
    .pattern(MongoIDPattern)
    .required()
    .messages(messages.joi.string("Order ID")),
  paymentMethod: Joi.string()
    .valid(PAYMENT_METHODS.CREDIT_CARD, PAYMENT_METHODS.PAYPAL)
    .required()
    .messages({
      ...messages.joi.string("Payment method"),
      ...messages.joi.anyOnly("Payment method", [
        PAYMENT_METHODS.CREDIT_CARD,
        PAYMENT_METHODS.PAYPAL,
      ]),
    }),
  creditCard: Joi.string()
    .pattern(MongoIDPattern)
    .when("paymentMethod", {
      is: PAYMENT_METHODS.CREDIT_CARD,
      then: Joi.required(),
      otherwise: Joi.forbidden().messages(
        messages.joi.forbidden("Credit card")
      ),
    })
    .messages(messages.joi.string("Credit card")),
});

module.exports = {
  createPaymentSchema,
};
