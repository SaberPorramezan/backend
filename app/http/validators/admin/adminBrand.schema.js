const Joi = require("../../../../configs/joi.config");
const { ImagePattern } = require("../../../../configs/constants");
const messages = require("../../../../configs/messages");

const addBrandSchema = Joi.object({
  title: Joi.string()
    .min(1)
    .max(255)
    .required()
    .messages(messages.joi.string("Title")),
  description: Joi.string()
    .min(0)
    .max(2000)
    .allow("")
    .optional()
    .messages(messages.joi.string("Description")),
  image: Joi.string()
    .uri()
    .pattern(ImagePattern)
    .required()
    .messages(messages.joi.string("Image URL")),
});
const updateBrandSchema = Joi.object({
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
  image: Joi.string()
    .uri()
    .pattern(ImagePattern)
    .optional()
    .messages(messages.joi.string("Image URL")),
});

module.exports = {
  addBrandSchema,
  updateBrandSchema,
};
