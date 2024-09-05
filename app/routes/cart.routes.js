const expressAsyncHandler = require("express-async-handler");
const CartController = require("../http/controllers/cart.controller");
const {
  addCartItemSchema,
  updateCartItemSchema,
} = require("../http/validators/cart.schema");
const validate = require("../http/middlewares/validation.middleware");

const router = require("express").Router();

router.post(
  "/add",
  validate(addCartItemSchema),
  expressAsyncHandler(CartController.addToCart)
);
router.patch(
  "/update",
  validate(updateCartItemSchema),
  expressAsyncHandler(CartController.updateCartItem)
);
router.patch("/coupon", expressAsyncHandler(CartController.applyCouponToCart));
router.delete(
  "/remove/:id",
  expressAsyncHandler(CartController.removeFromCart)
);
router.delete("/clear", expressAsyncHandler(CartController.clearCart));

module.exports = {
  cartRoutes: router,
};
