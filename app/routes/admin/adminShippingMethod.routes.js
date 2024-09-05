const expressAsyncHandler = require("express-async-handler");
const {
  addShippingMethodSchema,
} = require("../../http/validators/admin/adminShippingMethod.schema");
const validate = require("../../http/middlewares/validation.middleware");
const AdminShippingMethodController = require("../../http/controllers/admin/adminShippingMethod.controller");

const router = require("express").Router();

router.post(
  "/add",
  validate(addShippingMethodSchema),
  expressAsyncHandler(AdminShippingMethodController.addShippingMethod)
);

module.exports = {
  adminShippingMethodRoutes: router,
};
