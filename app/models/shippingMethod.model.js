const mongoose = require("mongoose");

const ShippingMethodSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    cost: { type: Number, required: true },
    estimatedDelivery: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

// Indexes
ShippingMethodSchema.index({ title: 1 });

module.exports = {
  ShippingMethodModel: mongoose.model("ShippingMethod", ShippingMethodSchema),
};
