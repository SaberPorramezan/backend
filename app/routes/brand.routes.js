const expressAsyncHandler = require("express-async-handler");
const BrandController = require("../http/controllers/brand.controller");

const router = require("express").Router();

router.get("/list", expressAsyncHandler(BrandController.getListOfBrands));
router.get("/:id", expressAsyncHandler(BrandController.getBrandById));

module.exports = {
  brandRoutes: router,
};
