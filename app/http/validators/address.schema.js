const Joi = require("../../../configs/joi.config");
const { PhoneNumberPattern } = require("../../../configs/constants");
const messages = require("../../../configs/messages");

const addAddressSchema = Joi.object({
  fullName: Joi.string()
    .min(1)
    .max(255)
    .required()
    .messages(messages.joi.string("Full name")),
  phoneNumber: Joi.string()
    .pattern(PhoneNumberPattern)
    .required()
    .messages(messages.joi.string("Phone number")),
  street: Joi.string()
    .min(1)
    .max(255)
    .required()
    .messages(messages.joi.string("Street")),
  city: Joi.string()
    .min(1)
    .max(100)
    .required()
    .messages(messages.joi.string("City")),
  region: Joi.string()
    .min(1)
    .max(100)
    .required()
    .messages(messages.joi.string("Region")),
  postalCode: Joi.string()
    .min(1)
    .max(20)
    .required()
    .messages(messages.joi.string("Postal code")),
  isPrimary: Joi.boolean()
    .required()
    .messages(messages.joi.boolean("Is primary")),
  isRecipient: Joi.boolean()
    .optional()
    .messages(messages.joi.boolean("Is Recipient")),
  recipientName: Joi.when("isRecipient", {
    is: false,
    then: Joi.string()
      .min(1)
      .max(255)
      .required()
      .messages(messages.joi.string("Recipient name")),
  }),
  recipientPhone: Joi.when("isRecipient", {
    is: false,
    then: Joi.string()
      .pattern(PhoneNumberPattern)
      .required()
      .messages(messages.joi.string("Recipient phone number")),
  }),
});
const updateAddressSchema = Joi.object({
  fullName: Joi.string()
    .min(1)
    .max(255)
    .optional()
    .messages(messages.joi.string("Full name")),
  phoneNumber: Joi.string()
    .pattern(PhoneNumberPattern)
    .optional()
    .messages(messages.joi.string("Phone number")),
  street: Joi.string()
    .min(1)
    .max(255)
    .optional()
    .messages(messages.joi.string("Street")),
  city: Joi.string()
    .min(1)
    .max(100)
    .optional()
    .messages(messages.joi.string("City")),
  region: Joi.string()
    .min(1)
    .max(100)
    .optional()
    .messages(messages.joi.string("Region")),
  postalCode: Joi.string()
    .min(1)
    .max(20)
    .optional()
    .messages(messages.joi.string("Postal code")),
  isPrimary: Joi.boolean()
    .optional()
    .messages(messages.joi.boolean("Is primary")),
  isRecipient: Joi.boolean()
    .optional()
    .messages(messages.joi.boolean("Is Recipient")),
  recipientName: Joi.when("isRecipient", {
    is: false,
    then: Joi.string()
      .min(1)
      .max(255)
      .required()
      .messages(messages.joi.string("Recipient name")),
  }),
  recipientPhone: Joi.when("isRecipient", {
    is: false,
    then: Joi.string()
      .pattern(PhoneNumberPattern)
      .required()
      .messages(messages.joi.string("Recipient phone number")),
  }),
});

module.exports = { addAddressSchema, updateAddressSchema };
