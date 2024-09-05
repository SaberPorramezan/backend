const Joi = require("../../../../configs/joi.config");
const {
  MongoIDPattern,
  IconPattern,
  ImagePattern,
} = require("../../../../configs/constants");
const messages = require("../../../../configs/messages");

const addCategorySchema = Joi.object({
  title: Joi.string()
    .min(1)
    .max(255)
    .required()
    .messages(messages.joi.string("Title")),
  description: Joi.string()
    .min(1)
    .max(2000)
    .allow("")
    .optional()
    .messages(messages.joi.string("Description")),
  parent: Joi.string()
    .pattern(MongoIDPattern)
    .allow(null)
    .optional()
    .messages(messages.joi.string("Parent")),
  icon: Joi.string()
    .min(1)
    .max(100)
    .pattern(IconPattern)
    .required()
    .messages(messages.joi.string("Icon")),
  image: Joi.string()
    .uri()
    .pattern(ImagePattern)
    .allow(null)
    .required()
    .messages(messages.joi.string("Image URL")),
});
const updateCategorySchema = Joi.object({
  title: Joi.string()
    .min(1)
    .max(255)
    .optional()
    .messages(messages.joi.string("Title")),
  description: Joi.string()
    .min(0)
    .max(2000)
    .allow("")
    .optional()
    .messages(messages.joi.string("Description")),
  parent: Joi.string()
    .pattern(MongoIDPattern)
    .allow(null)
    .optional()
    .messages(messages.joi.string("Parent")),
  icon: Joi.string()
    .min(1)
    .max(100)
    .pattern(IconPattern)
    .optional()
    .messages(messages.joi.string("Icon")),
  image: Joi.string()
    .uri()
    .pattern(ImagePattern)
    .allow(null)
    .optional()
    .messages(messages.joi.string("Image URL")),
});

module.exports = {
  addCategorySchema,
  updateCategorySchema,
};
