const mongoose = require("mongoose");
const { ROLES } = require("../../configs/constants");

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, trim: true, required: true },
    email: { type: String, required: true, unique: true },
    isVerifiedEmail: { type: Boolean, default: false },
    password: { type: String, required: true },
    phoneNumber: { type: String, unique: true, default: null },
    isVerifiedPhoneNumber: { type: Boolean, default: false },
    role: {
      type: String,
      required: true,
      default: ROLES.CUSTOMER,
      enum: Object.values(ROLES),
    },
    biography: { type: String, default: null },
    avatar: { type: String, default: null },
    dateOfBirth: { type: Date, default: null },
    gender: { type: String, enum: [null, "m", "f"], default: null },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// Virtual field to get avatar URL
UserSchema.virtual("avatarUrl").get(function () {
  if (this.avatar) return `${process.env.SERVER_URL}/${this.avatar}`;
  return null;
});

// Custom toJSON method to exclude sensitive information
UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  obj.avatarUrl = this.avatarUrl;
  delete obj.password;
  delete obj.avatar;
  return obj;
};

// Indexes
UserSchema.index({ email: 1 });
UserSchema.index({ phoneNumber: 1 });
UserSchema.index({ isVerifiedEmail: 1 });

module.exports = {
  UserModel: mongoose.model("User", UserSchema),
};
