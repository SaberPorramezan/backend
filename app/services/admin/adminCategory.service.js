const { CategoryModel } = require("../../models/category.model");
const CategoryService = require("../category.service");
const { generateSlug } = require("../../../utils/slugify.util");

class AdminCategoryService extends CategoryService {
  static async addCategory(categoryData) {
    const { title } = categoryData;

    await this.isCategoryExistsByTitle(title);

    categoryData.slug = generateSlug(title);
    const category = await CategoryModel.create(categoryData);

    return category;
  }
  static async updateCategory(categoryId, categoryData) {
    const { title } = categoryData;

    await this.isCategoryExistsById(categoryId);
    if (title) {
      await this.isCategoryExistsByTitle(title);
      categoryData.slug = generateSlug(title);
    }

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      categoryId,
      {
        $set: categoryData,
      },
      { new: true }
    );

    return updatedCategory;
  }
  static async removeCategory(categoryId) {
    await this.isCategoryExistsById(categoryId);
    await CategoryModel.deleteMany({
      $or: [{ _id: categoryId }, { parentId: categoryId }],
    });
  }
}

module.exports = AdminCategoryService;
