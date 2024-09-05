const expressAsyncHandler = require("express-async-handler");
const OrderController = require("../http/controllers/order.controller");
const validate = require("../../app/http/middlewares/validation.middleware");
const { createOrderSchema } = require("../http/validators/order.schema");

const router = require("express").Router();

router.post(
  "/create",
  validate(createOrderSchema),
  expressAsyncHandler(OrderController.createOrder)
);

module.exports = {
  orderRoutes: router,
};
