const { BrandModel } = require("../../models/brand.model");
const BrandService = require("../brand.service");
const { generateSlug } = require("../../../utils/slugify.util");

class AdminBrandService extends BrandService {
  static async addBrand(brandData) {
    const { title } = brandData;

    await this.isBrandExistsByTitle(title);

    brandData.slug = generateSlug(title);
    const brand = await BrandModel.create(brandData);

    return brand;
  }
  static async updateBrand(brandId, brandData) {
    const { title } = brandData;

    await this.isBrandExistsById(brandId);
    if (title) {
      await this.isBrandExistsByTitle(title);
      brandData.slug = generateSlug(title);
    }

    const updatedBrand = await BrandModel.findByIdAndUpdate(
      brandId,
      {
        $set: brandData,
      },
      { new: true }
    );

    return updatedBrand;
  }
  static async removeBrand(brandId) {
    await this.isBrandExistsById(brandId);

    await BrandModel.deleteOne({ _id: brandId });
  }
}

module.exports = AdminBrandService;
