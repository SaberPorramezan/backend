const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const CategorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, unique: true, required: true },
    description: { type: String, trim: true, lowercase: true, default: "" },
    parent: { type: ObjectId, ref: "Category", default: null },
    icon: { type: String, required: true },
    image: { type: String, trim: true, default: null },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

// Indexes
CategorySchema.index({ title: "text" });
CategorySchema.index({ parent: 1 });

module.exports = {
  CategoryModel: mongoose.model("Category", CategorySchema),
};
