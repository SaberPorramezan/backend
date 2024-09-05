const mongoose = require("mongoose");
const createHttpError = require("http-errors");
const { ProductModel } = require("../models/product.model");
const { ReviewModel } = require("../models/review.model");
const { paginate } = require("../../utils/pagination.util");
const { getListOfProductsQuery, sortQuery } = require("../../utils/query.util");
const { REVIEW_STATUS } = require("../../configs/constants");
const messages = require("../../configs/messages");

class ProductService {
  static async getListOfProducts(query) {
    const { sort, page = 1, limit = 10 } = query;

    const dbQuery = await getListOfProductsQuery(query);

    const sorted = sortQuery(sort);

    const productsQuery = ProductModel.find(dbQuery)
      .populate([
        {
          path: "category",
          model: "Category",
          select: {
            title: 1,
          },
        },
        {
          path: "brand",
          model: "Brand",
          select: {
            title: 1,
          },
        },
      ])
      .select(
        "title slug images price discount offPrice quantity colors rating category brand"
      )
      .sort(sorted);

    const products = await paginate(productsQuery, { page, limit });
    const count = await ProductModel.countDocuments(dbQuery);

    return {
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      count,
    };
  }
  static async getProductById(productId) {
    if (!mongoose.Types.ObjectId.isValid(productId))
      throw createHttpError.BadRequest(messages.errors.general.invalidId);

    await this.isProductExistsById(productId);
    const product = await ProductModel.findById(productId)
      .populate([
        {
          path: "category",
          model: "Category",
          select: {
            title: 1,
          },
        },
        {
          path: "brand",
          model: "Brand",
          select: {
            title: 1,
          },
        },
      ])
      .select("-__v");

    const reviews = await ReviewModel.find({
      product: productId,
      status: REVIEW_STATUS.APPROVED,
    })
      .populate([
        {
          path: "user",
          model: "User",
          select: {
            fullName: 1,
            avatarUrl: 1,
            biography: 1,
          },
        },
      ])
      .select("-product -status -__v  -reactions.likes -reactions.dislikes");

    const productWithReviews = {
      ...product.toObject(),
      reviews,
    };

    return productWithReviews;
  }
  static async searchProducts(productName) {
    const products = await ProductModel.find({
      title: { $regex: new RegExp(productName), $options: "is" },
      isActive: true,
    })
      .populate([
        {
          path: "category",
          model: "Category",
          select: {
            title: 1,
          },
        },
        {
          path: "brand",
          model: "Brand",
          select: {
            title: 1,
          },
        },
      ])
      .select(
        "title slug images price discount offPrice quantity colors rating category brand"
      );

    return products;
  }

  // Utility Methods
  static async findProductById(productId) {
    const product = await ProductModel.findById(productId);
    if (!product)
      throw createHttpError.NotFound(messages.errors.product.productNotFound);

    return product;
  }
  static async isProductExistsById(productId) {
    const isProductExists = await ProductModel.exists({ _id: productId });
    if (!isProductExists)
      throw createHttpError.NotFound(messages.errors.product.productNotFound);

    return isProductExists;
  }
  static async isProductExistsByTitle(title) {
    const isProductExists = await ProductModel.exists({ title });
    if (isProductExists)
      throw createHttpError.Conflict(messages.errors.product.productExists);

    return isProductExists;
  }
  static async checkProductAvailability(productId, quantity) {
    const product = await this.findProductById(productId);

    if (!product.isActive)
      throw createHttpError.BadRequest(
        messages.errors.product.productNotActive
      );

    if (product.quantity < quantity + product.purchasedCount)
      throw createHttpError.BadRequest(
        messages.errors.product.invalidProductQuantity
      );

    if (quantity > product.maxQuantityPerUser)
      throw createHttpError.BadRequest(
        messages.errors.product.invalidProductQuantity
      );

    return product;
  }
  static calculateProductOffPrice(product) {
    const currentDate = new Date();

    if (
      product.discount &&
      product.discount.startDate <= currentDate &&
      product.discount.endDate >= currentDate
    ) {
      product.offPrice = Number(
        (product.price * (1 - product.discount.percentage / 100)).toFixed(2)
      );
    } else {
      product.offPrice = product.price;
    }
  }
  static async updateProductRating(productId) {
    const reviews = await ReviewModel.find({
      product: productId,
      status: REVIEW_STATUS.APPROVED,
    });

    const ratingCount = reviews.length;
    const ratingSum = reviews.reduce((sum, review) => sum + review.rating, 0);
    const rate = ratingCount > 0 ? ratingSum / ratingCount : 0;

    await ProductModel.findByIdAndUpdate(productId, {
      "rating.rate": rate,
      "rating.count": ratingCount,
      reviewsCount: ratingCount,
    });
  }
}

module.exports = ProductService;
