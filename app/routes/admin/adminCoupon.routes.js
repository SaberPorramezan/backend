const expressAsyncHandler = require("express-async-handler");
const {
  createCouponSchema,
} = require("../../http/validators/admin/adminCoupon.schema");
const validate = require("../../http/middlewares/validation.middleware");
const AdminCouponController = require("../../http/controllers/admin/adminCoupon.controller");

const router = require("express").Router();

router.post(
  "/create",
  validate(createCouponSchema),
  expressAsyncHandler(AdminCouponController.createCoupon)
);

module.exports = {
  adminCouponRoutes: router,
};
