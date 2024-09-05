const expressAsyncHandler = require("express-async-handler");
const WishlistController = require("../http/controllers/wishlist.controller");

const router = require("express").Router();

router.post("/add", expressAsyncHandler(WishlistController.addToWishlist));
router.delete(
  "/remove/:id",
  expressAsyncHandler(WishlistController.removeFromWishlist)
);

module.exports = {
  wishlistRoutes: router,
};
