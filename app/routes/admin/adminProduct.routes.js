const expressAsyncHandler = require("express-async-handler");
const validate = require("../../http/middlewares/validation.middleware");
const {
  addProductSchema,
} = require("../../http/validators/admin/adminProduct.schema");
const AdminProductController = require("../../http/controllers/admin/adminProduct.controller");

const router = require("express").Router();

router.post(
  "/add",
  validate(addProductSchema),
  expressAsyncHandler(AdminProductController.addProduct)
);

module.exports = {
  adminProductRoutes: router,
};
