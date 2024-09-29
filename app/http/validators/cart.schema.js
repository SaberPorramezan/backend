const Joi = require("../../../configs/joi.config");
const {
  MongoIDPattern,
  HexCodePattern,
} = require("../../../configs/constants");
const messages = require("../../../configs/messages");

const addCartItemSchema = Joi.object({
  productId: Joi.string()
    .pattern(MongoIDPattern)
    .required()
    .messages(messages.joi.string("Product ID")),
  selectedColor: Joi.object({
    name: Joi.string()
      .min(1)
      .max(100)
      .required()
      .messages(messages.joi.string("Color name")),
    hex: Joi.string()
      .pattern(HexCodePattern)
      .required()
      .messages(messages.joi.string("Hex color code")),
  })
    .allow(null)
    .optional()
    .messages(messages.joi.object("Selected color")),
});
const updateCartItemSchema = Joi.object({
  productId: Joi.string()
    .pattern(MongoIDPattern)
    .required()
    .messages(messages.joi.string("Product ID")),
  quantity: Joi.number()
    .integer()
    .min(1)
    .max(10000)
    .required()
    .messages(messages.joi.number("Quantity")),
});

module.exports = { addCartItemSchema, updateCartItemSchema };
