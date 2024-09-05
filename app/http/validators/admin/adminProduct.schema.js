const Joi = require("../../../../configs/joi.config");
const {
  MongoIDPattern,
  HexCodePattern,
  IconPattern,
  ImagePattern,
  VideoPattern,
} = require("../../../../configs/constants");
const messages = require("../../../../configs/messages");

const addProductSchema = Joi.object({
  // General and primary fields
  title: Joi.string()
    .min(1)
    .max(255)
    .required()
    .messages(messages.joi.string("Title")),
  description: Joi.string()
    .min(1)
    .max(2000)
    .required()
    .messages(messages.joi.string("Description")),
  category: Joi.string()
    .pattern(MongoIDPattern)
    .required()
    .messages(messages.joi.string("Category")),
  brand: Joi.string()
    .pattern(MongoIDPattern)
    .required()
    .messages(messages.joi.string("Brand")),
  tags: Joi.array()
    .items(
      Joi.string().min(1).max(100).messages(messages.joi.string("Each tag"))
    )
    .max(15)
    .allow(null)
    .optional()
    .messages(messages.joi.array("Tags")),

  // Pricing and inventory fields
  price: Joi.number()
    .min(0.01)
    .precision(2)
    .required()
    .messages(messages.joi.number("Price")),
  discount: Joi.object({
    percentage: Joi.number()
      .integer()
      .min(1)
      .max(100)
      .required()
      .messages(messages.joi.number("Discount percentage")),
    startDate: Joi.string()
      .isoDate()
      .required()
      .messages(messages.joi.string("Discount start date")),
    endDate: Joi.string()
      .isoDate()
      .custom((value, helpers) => {
        const now = new Date();
        const date = new Date(value);
        if (date < now)
          return helpers.message("Discount end date cannot be in the past");
        return value;
      })
      .required()
      .messages(messages.joi.string("Discount end date")),
  })
    .allow(null)
    .optional()
    .messages(messages.joi.object("Discount")),
  quantity: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages(messages.joi.number("Quantity")),
  maxQuantityPerUser: Joi.number()
    .integer()
    .min(1)
    .optional()
    .messages(messages.joi.number("Max quantity perUser")),

  // Product-specific attributes
  dimensions: Joi.object({
    width: Joi.number()
      .optional()
      .allow(null)
      .messages(messages.joi.number("Width")),
    height: Joi.number()
      .optional()
      .allow(null)
      .messages(messages.joi.number("Height")),
    depth: Joi.number()
      .optional()
      .allow(null)
      .messages(messages.joi.number("Depth")),
    weight: Joi.number()
      .optional()
      .allow(null)
      .messages(messages.joi.number("Weight")),
  })
    .optional()
    .allow(null)
    .messages(messages.joi.object("Dimensions")),
  materials: Joi.array()
    .items(
      Joi.string()
        .min(1)
        .max(100)
        .messages(messages.joi.string("Each material"))
    )
    .max(10)
    .allow(null)
    .optional()
    .messages(messages.joi.array("Materials")),
  sizes: Joi.array()
    .items(
      Joi.string().min(1).max(50).messages(messages.joi.string("Each size"))
    )
    .max(10)
    .allow(null)
    .optional()
    .messages(messages.joi.array("Sizes")),
  colors: Joi.array()
    .items(
      Joi.object({
        name: Joi.string()
          .min(1)
          .max(100)
          .required()
          .messages(messages.joi.string("Color name")),
        hex: Joi.string()
          .pattern(HexCodePattern)
          .required()
          .messages(messages.joi.string("Hex color code")),
      }).messages(messages.joi.object("Each color"))
    )
    .max(15)
    .allow(null)
    .optional()
    .messages(messages.joi.array("Colors")),
  specifications: Joi.array()
    .items(
      Joi.object({
        title: Joi.string()
          .min(1)
          .max(255)
          .required()
          .messages(messages.joi.string("Specification title")),
        values: Joi.array()
          .items(
            Joi.string()
              .min(1)
              .max(100)
              .messages(messages.joi.string("Each specification value"))
          )
          .min(1)
          .max(10)
          .required()
          .messages(messages.joi.array("Specification values")),
      }).messages(messages.joi.object("Each specification"))
    )
    .min(1)
    .max(30)
    .required()
    .messages(messages.joi.array("Specifications")),

  // Warranty and origin fields
  warranty: Joi.object({
    period: Joi.string()
      .optional()
      .allow(null)
      .messages(messages.joi.string("Warranty period")),
    provider: Joi.string()
      .optional()
      .allow(null)
      .messages(messages.joi.string("Warranty provider")),
  })
    .allow(null)
    .optional()
    .messages(messages.joi.object("Warranty")),
  manufacturerCountry: Joi.string()
    .min(1)
    .max(100)
    .allow(null)
    .optional()
    .messages(messages.joi.string("Manufacturer Country")),
  expirationDate: Joi.string()
    .isoDate()
    .allow(null)
    .optional()
    .messages(messages.joi.string("Expiration date")),
  serialNumber: Joi.string()
    .min(1)
    .max(255)
    .allow(null)
    .optional()
    .messages(messages.joi.string("Serial number")),

  // Media and image fields
  images: Joi.object({
    main: Joi.object({
      url: Joi.string()
        .uri({
          scheme: ["http", "https"],
          allowRelative: false,
        })
        .pattern(ImagePattern)
        .required()
        .messages(messages.joi.string("Main Image URL")),
    })
      .required()
      .messages(messages.joi.object("Main Image")),
    list: Joi.array()
      .items(
        Joi.object({
          url: Joi.string()
            .uri({
              scheme: ["http", "https"],
              allowRelative: false,
            })
            .pattern(ImagePattern)
            .required()
            .messages(messages.joi.string("List Image URL")),
        }).required()
      )
      .min(1)
      .max(10)
      .messages(messages.joi.array("List Images")),
  })
    .required()
    .messages(messages.joi.object("Images")),
  videos: Joi.array()
    .items(
      Joi.object({
        title: Joi.string()
          .min(1)
          .max(255)
          .required()
          .messages(messages.joi.string("Video title")),
        url: Joi.string()
          .uri({
            scheme: ["http", "https"],
            allowRelative: false,
          })
          .pattern(VideoPattern)
          .required()
          .messages(messages.joi.string("Video URL")),
        cover: Joi.string()
          .uri({
            scheme: ["http", "https"],
            allowRelative: false,
          })
          .pattern(ImagePattern)
          .allow("")
          .optional()
          .messages(messages.joi.string("Cover URL")),
      }).messages(messages.joi.object("Each video"))
    )
    .max(10)
    .allow(null)
    .optional()
    .messages(messages.joi.array("Videos")),

  // Badge and label fields
  badges: Joi.array()
    .items(
      Joi.object({
        title: Joi.string()
          .min(1)
          .max(100)
          .required()
          .messages(messages.joi.string("Badge title")),
        icon: Joi.string()
          .min(1)
          .max(100)
          .pattern(IconPattern)
          .required()
          .messages(messages.joi.string("Badge icon")),
      }).messages(messages.joi.object("Each badge"))
    )
    .max(15)
    .allow(null)
    .optional()
    .messages(messages.joi.array("Badges")),

  // Other fields
  breadcrumb: Joi.array()
    .items(
      Joi.object({
        title: Joi.string()
          .min(3)
          .max(100)
          .required()
          .messages(messages.joi.string("Breadcrumb title")),
        url: Joi.object({
          uri: Joi.string()
            .uri({
              relativeOnly: true,
            })
            .required()
            .messages(messages.joi.string("Breadcrumb URI")),
        })
          .required()
          .messages(messages.joi.object("Breadcrumb URL")),
      }).messages(messages.joi.object("Each breadcrumb"))
    )
    .min(1)
    .required()
    .messages(messages.joi.array("Breadcrumb")),
});

module.exports = {
  addProductSchema,
};
