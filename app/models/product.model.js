const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const ProductSchema = new mongoose.Schema(
  {
    // General and primary fields
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, required: true },
    description: { type: String, required: true, trim: true },
    category: { type: ObjectId, ref: "Category", required: true },
    brand: { type: ObjectId, ref: "Brand", required: true },
    tags: { type: [String], default: [] },

    // Pricing and inventory fields
    price: { type: Number, required: true },
    discount: {
      type: {
        percentage: { type: Number, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
      },
      default: null,
      _id: false,
    },
    offPrice: { type: Number, default: 0 },
    quantity: { type: Number, required: true },
    maxQuantityPerUser: { type: Number, default: 1 },
    purchasedCount: { type: Number, default: 0 },

    // Product-specific attributes
    dimensions: {
      width: { type: String, default: null },
      height: { type: String, default: null },
      depth: { type: String, default: null },
      weight: { type: String, default: null },
      _id: false,
    },
    materials: { type: [String], default: [], _id: false },
    sizes: { type: [String], default: [], _id: false },
    colors: {
      type: [
        {
          name: { type: String, required: true },
          hex: { type: String, required: true },
          _id: false,
        },
      ],
      default: [],
      _id: false,
    },
    specifications: {
      type: [
        {
          title: {
            type: String,
            required: true,
          },
          values: {
            type: [String],
            required: true,
          },
          _id: false,
        },
      ],
      default: [],
      _id: false,
    },

    // Warranty and origin fields
    warranty: {
      period: { type: String, default: null },
      provider: { type: String, default: null },
      _id: false,
    },
    manufacturerCountry: { type: String, default: null },
    expirationDate: { type: Date, default: null },
    serialNumber: { type: String, default: null },

    // Media and image fields
    images: {
      main: {
        url: { type: String, required: true },
      },
      list: [
        {
          url: { type: String, required: true },
          _id: false,
        },
      ],
    },
    videos: {
      type: [
        {
          title: { type: String, required: true },
          url: { type: String, required: true },
          cover: { type: String, default: "" },
          _id: false,
        },
      ],
      default: [],
      _id: false,
    },

    // Review and rating fields
    rating: {
      rate: { type: Number, required: true, default: 0 },
      count: { type: Number, required: true, default: 0 },
    },
    reviewsCount: { type: Number, default: 0 },

    // Badge and label fields
    badges: {
      type: [
        {
          title: { type: String, required: true },
          icon: { type: String, required: true },
          _id: false,
        },
      ],
      default: [],
      _id: false,
    },

    // Other fields
    breadcrumb: {
      type: [
        {
          title: { type: String, required: true },
          url: {
            uri: { type: String, required: true },
            _id: false,
          },
          _id: false,
        },
      ],
      required: true,
      _id: false,
    },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

// Indexes
ProductSchema.index({ title: "text" });
ProductSchema.index({ category: 1, brand: 1 });
ProductSchema.index({ price: 1 });

module.exports = {
  ProductModel: mongoose.model("Product", ProductSchema),
};
