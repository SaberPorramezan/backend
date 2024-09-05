const Joi = require("../../../configs/joi.config");
const { MongoIDPattern } = require("../../../configs/constants");
const messages = require("../../../configs/messages");

const createOrderSchema = Joi.object({
  shippingAddress: Joi.string()
    .pattern(MongoIDPattern)
    .required()
    .messages(messages.joi.string("Shipping address")),
  billingAddress: Joi.string()
    .pattern(MongoIDPattern)
    .required()
    .messages(messages.joi.string("Billing address")),
  shippingMethod: Joi.string()
    .pattern(MongoIDPattern)
    .required()
    .messages(messages.joi.string("Shipping method")),
});

module.exports = {
  createOrderSchema,
};
