const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const WishlistSchema = new mongoose.Schema(
  {
    user: { type: ObjectId, ref: "User", required: true },
    products: [{ type: ObjectId, ref: "Product", default: [] }],
  },
  {
    timestamps: true,
  }
);

module.exports = {
  WishlistModel: mongoose.model("Wishlist", WishlistSchema),
};
