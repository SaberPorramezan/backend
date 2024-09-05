const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, unique: true, required: true },
    description: { type: String, trim: true, lowercase: true, default: "" },
    image: { type: String, required: true, trim: true },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

// Indexes
BrandSchema.index({ title: "text", description: "text" });

module.exports = {
  BrandModel: mongoose.model("Brand", BrandSchema),
};
