const { ROLES } = require("../../configs/constants");
const { authorize } = require("../http/middlewares/permission.guard");
const { verifyAccessToken } = require("../http/middlewares/auth.middleware");

const { authRoutes } = require("./auth.routes");
const { adminRoutes } = require("./admin");
const { userRoutes } = require("./user.routes");
const { categoryRoutes } = require("./category.routes");
const { brandRoutes } = require("./brand.routes");
const { addressRoutes } = require("./address.routes");
const { creditCardRoutes } = require("./creditCard.routes");
const { productRoutes } = require("./product.routes");
const { reviewRoutes } = require("./review.routes");
const { shippingMethodRoutes } = require("./shippingMethod.routes");
const { cartRoutes } = require("./cart.routes");
const { orderRoutes } = require("./order.routes");
const { paymentRoutes } = require("./payment.routes");
const { wishlistRoutes } = require("./wishlist.routes");

const router = require("express").Router();

router.use("/auth", authRoutes);
router.use("/admin", verifyAccessToken, authorize(ROLES.ADMIN), adminRoutes);
router.use("/user", verifyAccessToken, userRoutes);
router.use("/category", categoryRoutes);
router.use("/brand", brandRoutes);
router.use("/address", verifyAccessToken, addressRoutes);
router.use("/credit-cards", verifyAccessToken, creditCardRoutes);
router.use("/product", productRoutes);
router.use("/review", verifyAccessToken, reviewRoutes);
router.use("/cart", verifyAccessToken, cartRoutes);
router.use("/order", verifyAccessToken, orderRoutes);
router.use("/payment", verifyAccessToken, paymentRoutes);
router.use("/shipping-method", verifyAccessToken, shippingMethodRoutes);
router.use("/wishlist", verifyAccessToken, wishlistRoutes);

module.exports = {
  allRoutes: router,
};
