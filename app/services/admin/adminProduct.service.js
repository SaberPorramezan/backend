const { ProductModel } = require("../../models/product.model");
const ProductService = require("../product.service");
const CategoryService = require("../category.service");
const BrandService = require("../brand.service");
const { generateSlug } = require("../../../utils/slugify.util");

class AdminProductService extends ProductService {
  static async addProduct(productData) {
    const { title, category, brand } = productData;

    await Promise.all([
      this.isProductExistsByTitle(title),
      CategoryService.isCategoryExistsById(category),
      BrandService.isBrandExistsById(brand),
    ]);

    productData.slug = generateSlug(title);
    const product = await ProductModel.create(productData);
    this.calculateProductOffPrice(product);
    await product.save();

    return product;
  }
}

module.exports = AdminProductService;
