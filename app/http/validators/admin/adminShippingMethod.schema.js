const Joi = require("../../../../configs/joi.config");
const messages = require("../../../../configs/messages");

const addShippingMethodSchema = Joi.object({
  title: Joi.string()
    .required()
    .min(1)
    .max(255)
    .messages(messages.joi.string("Title")),
  cost: Joi.number()
    .min(0.01)
    .precision(2)
    .required()
    .messages(messages.joi.number("Cost")),
  estimatedDelivery: Joi.string()
    .required()
    .min(1)
    .max(255)
    .messages(messages.joi.string("Estimated delivery")),
});

module.exports = {
  addShippingMethodSchema,
};
