const expressAsyncHandler = require("express-async-handler");
const ShippingMethodController = require("../http/controllers/shippingMethod.controller");

const router = require("express").Router();

router.get(
  "/list",
  expressAsyncHandler(ShippingMethodController.getListOfShippingMethods)
);
router.get(
  "/:id",
  expressAsyncHandler(ShippingMethodController.getShippingMethodById)
);

module.exports = {
  shippingMethodRoutes: router,
};
