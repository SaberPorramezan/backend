const { adminCategoryRoutes } = require("./adminCategory.routes");
const { adminBrandRoutes } = require("./adminBrand.routes");
const { adminProductRoutes } = require("./adminProduct.routes");
const { adminReviewRoutes } = require("./adminReview.routes");
const { adminCouponRoutes } = require("./adminCoupon.routes");
const { adminShippingMethodRoutes } = require("./adminShippingMethod.routes");

const router = require("express").Router();

router.use("/category", adminCategoryRoutes);
router.use("/brand", adminBrandRoutes);
router.use("/product", adminProductRoutes);
router.use("/review", adminReviewRoutes);
router.use("/coupon", adminCouponRoutes);
router.use("/shipping-method", adminShippingMethodRoutes);

module.exports = {
  adminRoutes: router,
};
