const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const AddressSchema = new mongoose.Schema(
  {
    user: { type: ObjectId, ref: "User", required: true },
    fullName: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: true, trim: true },
    street: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    region: { type: String, required: true, trim: true },
    postalCode: { type: String, required: true, trim: true },
    isPrimary: { type: Boolean, default: false },
    isRecipient: { type: Boolean, default: true },
    recipientName: {
      type: String,
      required: function () {
        return !this.isRecipient;
      },
      trim: true,
    },
    recipientPhone: {
      type: String,
      required: function () {
        return !this.isRecipient;
      },
      trim: true,
    },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

// Indexes
AddressSchema.index(
  { user: 1, isPrimary: 1 },
  { unique: true, partialFilterExpression: { isPrimary: true } }
);
AddressSchema.index({ user: 1, phoneNumber: 1 }, { unique: true });

// Pre-save hook to auto-fill recipientName and recipientPhone if isRecipient is true
AddressSchema.pre("save", function (next) {
  if (this.isRecipient) {
    this.recipientName = this.fullName;
    this.recipientPhone = this.phoneNumber;
  }
  next();
});

module.exports = {
  AddressModel: mongoose.model("Address", AddressSchema),
};
