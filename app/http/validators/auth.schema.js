const Joi = require("../../../configs/joi.config");
const { PasswordPattern } = require("../../../configs/constants");
const messages = require("../../../configs/messages");

const registerSchema = Joi.object({
  fullName: Joi.string()
    .min(1)
    .max(255)
    .required()
    .messages(messages.joi.string("Full name")),
  email: Joi.string().email().required().messages(messages.joi.string("Email")),
  password: Joi.string()
    .min(8)
    .max(128)
    .pattern(PasswordPattern)
    .required()
    .messages(messages.joi.string("Password")),
});
const loginSchema = Joi.object({
  email: Joi.string().email().required().messages(messages.joi.string("Email")),
  password: Joi.string()
    .min(8)
    .max(128)
    .required()
    .messages(messages.joi.string("Password")),
});

module.exports = {
  registerSchema,
  loginSchema,
};
