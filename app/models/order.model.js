const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const {
  ORDER_STATUS,
  PAYMENT_STATUS,
  PAYMENT_METHODS,
} = require("../../configs/constants");

const OrderItemSchema = new mongoose.Schema({
  product: { type: ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
  offPrice: { type: Number, default: 0 },
  totalPrice: { type: Number, required: true },
  selectedColor: {
    name: { type: String, required: true },
    hex: { type: String, required: true },
  },
  _id: false,
});

const OrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    user: { type: ObjectId, ref: "User", required: true },
    items: [OrderItemSchema],
    totalPrice: { type: Number, required: true },
    totalDiscount: { type: Number, required: true },
    shippingCost: { type: Number, required: true },
    finalPrice: { type: Number, required: true },
    coupon: { type: ObjectId, ref: "Coupon", default: null },
    status: {
      type: String,
      default: ORDER_STATUS.PENDING,
      enum: Object.values(ORDER_STATUS),
      trim: true,
    },
    paymentStatus: {
      type: String,
      default: PAYMENT_STATUS.PENDING,
      enum: Object.values(PAYMENT_STATUS),
    },
    isPaid: { type: Boolean, default: false },
    paymentMethod: {
      type: String,
      default: null,
      enum: [...Object.values(PAYMENT_METHODS), null],
    },
    payment: { type: ObjectId, ref: "Payment", default: null },
    shippingAddress: { type: ObjectId, ref: "Address", required: true },
    billingAddress: { type: ObjectId, ref: "Address", required: true },
    shippingMethod: { type: ObjectId, ref: "ShippingMethod", required: true },
    shippingDate: { type: Date, default: null },
    deliveryDate: { type: Date, default: null },
    returnDate: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

// Indexes
OrderSchema.index({ user: 1 });
OrderSchema.index({ orderCode: 1 }, { unique: true });
OrderSchema.index({ status: 1 });
OrderSchema.index({ paymentStatus: 1 });
OrderSchema.index({ shippingDate: 1 });
OrderSchema.index({ deliveryDate: 1 });
OrderSchema.index({ returnDate: 1 });

module.exports = {
  OrderModel: mongoose.model("Order", OrderSchema),
};
