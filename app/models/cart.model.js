const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const CartItemSchema = new mongoose.Schema({
  product: { type: ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1 },
  selectedColor: {
    name: { type: String, required: true },
    hex: { type: String, required: true },
  },
  _id: false,
});

const CartSchema = new mongoose.Schema(
  {
    user: { type: ObjectId, ref: "User", required: true },
    items: [CartItemSchema],
    coupon: { type: ObjectId, ref: "Coupon", default: null },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

// Indexes
CartSchema.index({ user: 1, isActive: 1 }, { unique: true });

module.exports = {
  CartModel: mongoose.model("Cart", CartSchema),
};
