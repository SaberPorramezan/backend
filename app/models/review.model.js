const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const { REVIEW_STATUS } = require("../../configs/constants");

const ReviewReactionSchema = new mongoose.Schema(
  {
    likes: [{ type: ObjectId, ref: "User" }],
    dislikes: [{ type: ObjectId, ref: "User" }],
    likeCount: { type: Number, default: 0 },
    dislikeCount: { type: Number, default: 0 },
  },
  { _id: false }
);

const ReviewSchema = new mongoose.Schema(
  {
    product: { type: ObjectId, ref: "Product", required: true },
    user: { type: ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    rating: { type: Number, default: 0 },
    review: { type: String, trim: true, default: "" },
    status: {
      type: String,
      required: true,
      default: REVIEW_STATUS.WAITING_APPROVAL,
      enum: Object.values(REVIEW_STATUS),
    },
    reactions: { type: ReviewReactionSchema, default: () => ({}) },
  },
  {
    timestamps: true,
  }
);

// Indexes
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

module.exports = {
  ReviewModel: mongoose.model("Review", ReviewSchema),
};
