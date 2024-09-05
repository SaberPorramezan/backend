const Joi = require("../../../configs/joi.config");
const {
  CardExpiryDatePattern,
  CardCvvPattern,
} = require("../../../configs/constants");
const messages = require("../../../configs/messages");

const addCreditCardSchema = Joi.object({
  cardNumber: Joi.string()
    .creditCard()
    .required()
    .messages(messages.joi.string("Card number")),
  expiryDate: Joi.string()
    .pattern(CardExpiryDatePattern)
    .min(5)
    .max(7)
    .required()
    .messages(messages.joi.string("Expiry date")),
  cardHolderName: Joi.string()
    .min(1)
    .max(255)
    .required()
    .messages(messages.joi.string("Card Holder Name")),
  cvv: Joi.string()
    .pattern(CardCvvPattern)
    .min(3)
    .max(4)
    .required()
    .messages(messages.joi.string("CVV")),
});

module.exports = { addCreditCardSchema };
