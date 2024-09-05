const expressAsyncHandler = require("express-async-handler");
const {
  addBrandSchema,
  updateBrandSchema,
} = require("../../http/validators/admin/adminBrand.schema");
const validate = require("../../http/middlewares/validation.middleware");
const AdminBrandController = require("../../http/controllers/admin/adminBrand.controller");

const router = require("express").Router();

router.post(
  "/add",
  validate(addBrandSchema),
  expressAsyncHandler(AdminBrandController.addBrand)
);
router.patch(
  "/update/:id",
  validate(updateBrandSchema),
  expressAsyncHandler(AdminBrandController.updateBrand)
);
router.delete(
  "/remove/:id",
  expressAsyncHandler(AdminBrandController.removeBrand)
);

module.exports = {
  adminBrandRoutes: router,
};
