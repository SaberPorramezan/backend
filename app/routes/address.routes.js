const expressAsyncHandler = require("express-async-handler");
const AddressController = require("../http/controllers/address.controller");
const {
  addAddressSchema,
  updateAddressSchema,
} = require("../http/validators/address.schema");
const validate = require("../http/middlewares/validation.middleware");

const router = require("express").Router();

router.post(
  "/add",
  validate(addAddressSchema),
  expressAsyncHandler(AddressController.addAddress)
);
router.patch(
  "/update/:id",
  validate(updateAddressSchema),
  expressAsyncHandler(AddressController.updateAddress)
);

module.exports = {
  addressRoutes: router,
};
