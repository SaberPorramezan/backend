const mongoose = require("mongoose");
const createHttpError = require("http-errors");
const { CategoryModel } = require("../models/category.model");
const messages = require("../../configs/messages");

class CategoryService {
  static async getListOfCategories() {
    const categories = await CategoryModel.find({});

    return categories;
  }
  static async getCategoryById(categoryId) {
    if (!mongoose.Types.ObjectId.isValid(categoryId))
      throw createHttpError.BadRequest(messages.errors.general.invalidId);

    const category = await this.findCategoryById(categoryId);

    return category;
  }

  // Utility methods
  static async findCategoryById(categoryId) {
    const category = await CategoryModel.findById(categoryId);
    if (!category)
      throw createHttpError.NotFound(messages.errors.category.categoryNotFound);

    return category;
  }
  static async isCategoryExistsById(categoryId) {
    const isCategoryExists = await CategoryModel.exists({ _id: categoryId });
    if (!isCategoryExists)
      throw createHttpError.NotFound(messages.errors.category.categoryNotFound);

    return isCategoryExists;
  }
  static async isCategoryExistsByTitle(title) {
    const isCategoryExists = await CategoryModel.exists({ title });
    if (isCategoryExists)
      throw createHttpError.Conflict(messages.errors.category.categoryExists);

    return isCategoryExists;
  }
}

module.exports = CategoryService;
