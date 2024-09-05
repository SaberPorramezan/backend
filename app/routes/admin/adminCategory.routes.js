const expressAsyncHandler = require("express-async-handler");
const {
  addCategorySchema,
  updateCategorySchema,
} = require("../../http/validators/admin/adminCategory.schema");
const validate = require("../../http/middlewares/validation.middleware");
const AdminCategoryController = require("../../http/controllers/admin/adminCategory.controller");

const router = require("express").Router();

router.post(
  "/add",
  validate(addCategorySchema),
  expressAsyncHandler(AdminCategoryController.addCategory)
);
router.patch(
  "/update/:id",
  validate(updateCategorySchema),
  expressAsyncHandler(AdminCategoryController.updateCategory)
);
router.delete(
  "/remove/:id",
  expressAsyncHandler(AdminCategoryController.removeCategory)
);

module.exports = {
  adminCategoryRoutes: router,
};
