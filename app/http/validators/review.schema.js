const Joi = require("../../../configs/joi.config");
const { MongoIDPattern } = require("../../../configs/constants");
const messages = require("../../../configs/messages");

const addReviewSchema = Joi.object({
  productId: Joi.string()
    .pattern(MongoIDPattern)
    .required()
    .messages(messages.joi.string("Product ID")),
  title: Joi.string()
    .min(1)
    .max(255)
    .required()
    .messages(messages.joi.string("Title")),
  rating: Joi.number()
    .min(1)
    .max(5)
    .precision(1)
    .required()
    .messages(messages.joi.number("Rating")),
  review: Joi.string()
    .min(1)
    .max(2000)
    .allow("")
    .optional()
    .messages(messages.joi.string("Review")),
});

module.exports = {
  addReviewSchema,
};
