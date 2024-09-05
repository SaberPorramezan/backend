const { CategoryModel } = require("../app/models/category.model");
const { BrandModel } = require("../app/models/brand.model");

async function getListOfProductsQuery(query) {
  const { category, brand, discount, minPrice, maxPrice, color } = query;

  // Build category query
  let categoryQuery = {};
  if (category && !category.includes("ALL")) {
    const categories = category.split(",");
    const categoryDocs = await Promise.all(
      categories.map((item) =>
        CategoryModel.findOne({ title: item, isActive: true }).collation({
          locale: "en",
          strength: 2,
        })
      )
    );
    const categoryIds = categoryDocs.filter((doc) => doc).map((doc) => doc._id);
    categoryQuery = { category: { $in: categoryIds } };
  }

  // Build brand query
  let brandQuery = {};
  if (brand) {
    const brands = brand.split(",");
    const brandDocs = await Promise.all(
      brands.map((item) =>
        BrandModel.findOne({ title: item, isActive: true }).collation({
          locale: "en",
          strength: 2,
        })
      )
    );
    const brandIds = brandDocs.filter((doc) => doc).map((doc) => doc._id);
    brandQuery = { brand: { $in: brandIds } };
  }

  // Build discount query
  let discountQuery = {};
  if (discount) {
    discountQuery = { "discount.percentage": { $gt: 0 } };
  }

  // Build price query
  let priceQuery = {};
  if (minPrice || maxPrice) {
    priceQuery = {
      price: {
        ...(minPrice && { $gte: Number(minPrice) }),
        ...(maxPrice && { $lte: Number(maxPrice) }),
      },
    };
  }

  // Build color query
  let colorQuery = {};
  if (color) {
    const colors = color.split(",");
    colorQuery = {
      colors: {
        $elemMatch: { name: { $in: colors } },
      },
    };
  }

  // Combine queries
  const dbQuery = {
    ...categoryQuery,
    ...brandQuery,
    ...discountQuery,
    ...priceQuery,
    ...colorQuery,
    isActive: true,
  };

  return dbQuery;
}
function sortQuery(sort) {
  switch (sort) {
    case "latest":
      return { createdAt: -1 };
    case "earliest":
      return { createdAt: 1 };
    case "popular":
      return { "rating.count": -1, "rating.rate": -1 };
    case "priceAsc":
      return { price: 1 };
    case "priceDesc":
      return { price: -1 };
    case "highestDiscount":
      return { "discount.percentage": -1 };
    default:
      return { createdAt: 1 };
  }
}

module.exports = {
  getListOfProductsQuery,
  sortQuery,
};
