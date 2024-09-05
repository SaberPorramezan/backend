const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const { CARD_TYPES } = require("../../configs/constants");

const CARD_TYPE_VALUES = CARD_TYPES.map((card) => card.type);

const CreditCardSchema = new mongoose.Schema(
  {
    user: { type: ObjectId, ref: "User", required: true },
    cardNumber: { type: String, required: true, trim: true },
    cardHolderName: { type: String, required: true, trim: true },
    cardType: {
      type: String,
      required: true,
      enum: CARD_TYPE_VALUES,
    },
    cardType: { type: String, required: true, trim: true },
    expiryDate: { type: String, required: true, trim: true },
    cvv: { type: String, required: true, trim: true },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

// Indexes
CreditCardSchema.index({ user: 1 });
CreditCardSchema.index({ cardNumber: 1 }, { unique: true });

module.exports = {
  CreditCardModel: mongoose.model("CreditCard", CreditCardSchema),
};
