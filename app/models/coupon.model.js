const mongoose = require("mongoose");
const { COUPON_TYPES } = require("../../configs/constants");

const CouponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true, lowercase: true, default: "" },
    couponType: {
      type: String,
      required: true,
      enum: Object.values(COUPON_TYPES),
    },
    value: { type: Number, required: true },
    expirationDate: { type: Date, default: null },
    usageLimit: { type: Number, default: 1 },
    usageCount: { type: Number, default: 0 },
    totalQuantity: { type: Number, default: null },
    minimumPurchaseAmount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

// Indexes
CouponSchema.index({ code: 1 }, { unique: true });
CouponSchema.index({ expirationDate: 1 });

module.exports = {
  CouponModel: mongoose.model("Coupon", CouponSchema),
};
