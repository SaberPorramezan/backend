const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const { PAYMENT_STATUS, PAYMENT_METHODS } = require("../../configs/constants");

const PaymentSchema = new mongoose.Schema(
  {
    user: { type: ObjectId, ref: "User", required: true },
    order: { type: ObjectId, ref: "Order", required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      default: PAYMENT_STATUS.PENDING,
      enum: Object.values(PAYMENT_STATUS),
    },
    isPaid: { type: Boolean, default: false },
    paymentMethod: {
      type: String,
      required: true,
      enum: Object.values(PAYMENT_METHODS),
    },
    transactionId: { type: String, required: true, unique: true },
    paypalTransactionId: { type: String, default: null },
    payerId: { type: String, default: null },
    creditCardId: { type: ObjectId, ref: "CreditCard", default: null },
    description: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

// Indexes
PaymentSchema.index({ transactionId: 1 }, { unique: true });
PaymentSchema.index({ user: 1 });
PaymentSchema.index({ order: 1 });
PaymentSchema.index({ amount: 1 });

module.exports = {
  PaymentModel: mongoose.model("Payment", PaymentSchema),
};
