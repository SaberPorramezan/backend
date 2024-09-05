const Joi = require("../../../../configs/joi.config");
const {
  MongoIDPattern,
  COUPON_TYPES,
} = require("../../../../configs/constants");
const messages = require("../../../../configs/messages");

const createCouponSchema = Joi.object({
  code: Joi.string()
    .min(1)
    .max(100)
    .required()
    .messages(messages.joi.string("Code")),
  description: Joi.string()
    .max(2000)
    .allow("")
    .optional()
    .messages(messages.joi.string("Description")),
  couponType: Joi.string()
    .valid(...Object.values(COUPON_TYPES))
    .required()
    .messages({
      ...messages.joi.string("Coupon type"),
      ...messages.joi.anyOnly("Coupon type", Object.values(COUPON_TYPES)),
    }),
  value: Joi.number()
    .min(0.01)
    .precision(2)
    .required()
    .when("couponType", {
      is: COUPON_TYPES.PERCENTAGE,
      then: Joi.number()
        .integer()
        .min(1)
        .max(100)
        .messages(messages.joi.number("Value (percentage)")),
    })
    .messages(messages.joi.number("Value")),
  expirationDate: Joi.string()
    .isoDate()
    .allow(null)
    .custom((value, helpers) => {
      const now = new Date();
      const date = new Date(value);
      if (date < now)
        return helpers.message("Expiration date cannot be in the past");
      return value;
    })
    .optional()
    .messages(messages.joi.string("Expiration date")),
  usageLimit: Joi.number()
    .integer()
    .min(1)
    .optional()
    .messages(messages.joi.number("Usage limit")),
  totalQuantity: Joi.number()
    .min(1)
    .allow(null)
    .optional()
    .messages(messages.joi.number("Total quantity")),
  minimumPurchaseAmount: Joi.number()
    .min(0)
    .precision(2)
    .optional()
    .messages(messages.joi.number("Minimum purchase amount")),
});

module.exports = {
  createCouponSchema,
};
